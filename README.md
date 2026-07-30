# Danmaku Hub

抖音直播弹幕采集 & 小票打印桌面应用，基于 Tauri 2 + React + TypeScript。

---

## 开发环境准备

### 依赖

| 工具 | 版本要求 | 说明 |
|------|----------|------|
| [Rust](https://rustup.rs/) | stable | Tauri 后端 |
| [Node.js](https://nodejs.org/) | LTS | 前端构建 |
| [pnpm](https://pnpm.io/) | v10+ | 包管理器 |

macOS 额外需要 Xcode Command Line Tools：

```bash
xcode-select --install
```

### 安装依赖

```bash
pnpm install
```

---

## 本地开发

```bash
pnpm tauri-dev
```

启动后会打开 Tauri 桌面窗口，前端热更新，Rust 后端变更后自动重编。

---

## 本地打包

```bash
pnpm tauri-build
```

产物在 `src-tauri/target/release/bundle/` 下：

- **macOS**：`macos/danmaku-hub.app`（可进一步打包为 `.dmg`）
- **Windows**：`nsis/*.exe` 安装包

> 首次运行会下载 Tauri WRY 等依赖，耗时较长，后续增量编译较快。

---

## 发布到 GitHub Releases

项目使用 GitHub Actions 在推送 tag 时自动构建并创建 Release draft。

### 需要提前配置的 Secrets

在仓库的 **Settings → Secrets and variables → Actions** 中添加：

| Secret 名称 | 说明 |
|-------------|------|
| `TAURI_SIGNING_PRIVATE_KEY` | Tauri updater 签名私钥（`tauri signer generate` 生成） |
| `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` | 上述私钥的密码 |

如果暂时不需要自动更新功能，可以在 `src-tauri/tauri.conf.json` 中移除 `plugins.updater` 配置，此时两个 Secret 留空即可（CI 不会报错）。

### 触发发布

打一个以 `v` 开头的 tag，Actions 会自动触发：

```bash
git tag v1.0.0
git push origin v1.0.0
```

Actions 完成后会在 GitHub Releases 页面生成一个 **Draft**，检查无误后手动点击 **Publish release** 正式发布。

### 构建矩阵

| Runner | 产物 |
|--------|------|
| `macos-latest` | macOS arm64（Apple Silicon）安装包 |
| `windows-latest` | Windows x64 NSIS 安装包 |

---

## IDE 推荐

- [VS Code](https://code.visualstudio.com/)
- 插件：[Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)、[rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
