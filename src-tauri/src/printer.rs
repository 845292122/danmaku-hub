use encoding_rs::GBK;
use serde::Deserialize;
use std::io::Write;
use std::net::{SocketAddr, TcpStream};
use std::time::Duration;

#[derive(Debug, Deserialize)]
pub struct PrinterConfig {
    pub mode: String,        // "serial" | "network"
    pub serial_port: String,
    pub baud_rate: u32,
    pub net_host: String,
    pub net_port: u16,
    pub encoding: String,   // "gbk" | "utf8"
}

#[derive(Debug, Deserialize)]
pub struct PrintOrderData {
    pub product: String,
    pub seq: i64,
    pub user_name: String,
    pub content: String,
    pub match_str: String,
    pub matched_at: i64, // unix ms
}

#[derive(Debug, Deserialize)]
pub struct TemplateField {
    pub id: String,
    pub visible: bool,
    pub align: String, // "left" | "center" | "right"
    pub bold: bool,
}

#[derive(Debug, Deserialize)]
pub struct PrintTemplate {
    pub title: String,
    pub paper_width: u8,
    pub fields: Vec<TemplateField>,
}

// ── Transport ────────────────────────────────────────────────

fn send_serial(port: &str, baud: u32, data: &[u8]) -> Result<(), String> {
    let mut port = serialport::new(port, baud)
        .timeout(Duration::from_secs(5))
        .open()
        .map_err(|e| format!("打开串口失败: {e}"))?;
    port.write_all(data).map_err(|e| format!("写入串口失败: {e}"))
}

fn send_network(host: &str, port: u16, data: &[u8]) -> Result<(), String> {
    let addr: SocketAddr = format!("{host}:{port}")
        .parse()
        .map_err(|_| format!("无效地址: {host}:{port}"))?;
    let mut stream = TcpStream::connect_timeout(&addr, Duration::from_secs(5))
        .map_err(|e| format!("连接打印机失败: {e}"))?;
    stream
        .write_all(data)
        .map_err(|e| format!("发送数据失败: {e}"))
}

fn dispatch(config: &PrinterConfig, data: &[u8]) -> Result<(), String> {
    match config.mode.as_str() {
        "network" => send_network(&config.net_host, config.net_port, data),
        _ => send_serial(&config.serial_port, config.baud_rate, data),
    }
}

// ── Encoding ─────────────────────────────────────────────────

fn encode_text(text: &str, encoding: &str) -> Vec<u8> {
    if encoding == "gbk" {
        let (encoded, _, _) = GBK.encode(text);
        encoded.into_owned()
    } else {
        text.as_bytes().to_vec()
    }
}

// ── Time helper ──────────────────────────────────────────────

fn format_unix_ms(ms: i64) -> String {
    let total_secs = ms / 1000 + 8 * 3600;
    let h = (total_secs / 3600) % 24;
    let m = (total_secs % 3600) / 60;
    let s = total_secs % 60;
    format!("{h:02}:{m:02}:{s:02}")
}

// ── ESC/POS receipt builder ──────────────────────────────────

fn build_receipt(lines: &[(String, String, bool)], encoding: &str) -> Vec<u8> {
    let mut buf: Vec<u8> = Vec::new();

    // ESC @ — initialize
    buf.extend_from_slice(&[0x1B, 0x40]);

    for (align, text, bold) in lines {
        let a: u8 = match align.as_str() {
            "center" => 1,
            "right" => 2,
            _ => 0,
        };
        // ESC a n — set justification
        buf.extend_from_slice(&[0x1B, 0x61, a]);
        if *bold {
            buf.extend_from_slice(&[0x1B, 0x45, 1]); // ESC E 1 — bold on
        }
        buf.extend(encode_text(text, encoding));
        buf.push(b'\n');
        if *bold {
            buf.extend_from_slice(&[0x1B, 0x45, 0]); // ESC E 0 — bold off
        }
    }

    // Feed 3 lines + partial cut
    buf.extend_from_slice(&[b'\n', b'\n', b'\n']);
    buf.extend_from_slice(&[0x1D, 0x56, 0x42, 3]); // GS V 66 3 — partial cut

    buf
}

fn receipt_lines(template: &PrintTemplate, order: Option<&PrintOrderData>) -> Vec<(String, String, bool)> {
    let col = if template.paper_width == 58 { 32usize } else { 42usize };
    let sep = "-".repeat(col);
    let mut lines: Vec<(String, String, bool)> = Vec::new();

    lines.push(("center".to_string(), template.title.clone(), false));
    lines.push(("left".to_string(), sep.clone(), false));

    for field in &template.fields {
        if !field.visible {
            continue;
        }

        if field.id == "separator" {
            lines.push((field.align.clone(), sep.clone(), field.bold));
            continue;
        }

        let text = match field.id.as_str() {
            "product" => match order {
                Some(o) => format!("商品: {}", o.product),
                None => "商品: 测试商品".to_string(),
            },
            "user_name" => match order {
                Some(o) => format!("用户: {}", o.user_name),
                None => "用户: 测试用户".to_string(),
            },
            "content" => match order {
                Some(o) => format!("弹幕: {}", o.content),
                None => "弹幕: 弹幕内容测试".to_string(),
            },
            "match_str" => match order {
                Some(o) => format!("匹配: {}  #{}", o.match_str, o.seq),
                None => "匹配: 测试关键词  #1".to_string(),
            },
            "seq" => match order {
                Some(o) => format!("序号: #{}", o.seq),
                None => "序号: #1".to_string(),
            },
            "time" => match order {
                Some(o) => format!("时间: {}", format_unix_ms(o.matched_at)),
                None => "时间: 12:00:00".to_string(),
            },
            _ => continue,
        };

        lines.push((field.align.clone(), text, field.bold));
    }

    lines
}

// ── Tauri commands ───────────────────────────────────────────

#[tauri::command]
pub fn list_serial_ports() -> Vec<String> {
    serialport::available_ports()
        .unwrap_or_default()
        .into_iter()
        .map(|p| p.port_name)
        .collect()
}

#[tauri::command]
pub fn printer_test(config: PrinterConfig, template: PrintTemplate) -> Result<(), String> {
    let lines = receipt_lines(&template, None);
    let data = build_receipt(&lines, &config.encoding);
    dispatch(&config, &data)
}

#[tauri::command]
pub fn printer_print_order(
    config: PrinterConfig,
    order: PrintOrderData,
    template: PrintTemplate,
) -> Result<(), String> {
    let lines = receipt_lines(&template, Some(&order));
    let data = build_receipt(&lines, &config.encoding);
    dispatch(&config, &data)
}
