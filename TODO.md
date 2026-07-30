# TODO — 代码审查报告

> 生成日期：2026-07-30

---

## 高优先级 Bug

### ~~1. 打印流程完全断路~~ ✅ 已修复
- **文件**：`src/pages/live/index.tsx`
- **问题**：`printerPrintOrder` 定义了但从未被调用。弹幕匹配后只写了数据库，没有发送到打印机。

### ~~2. "扣中"计数硬编码~~ ✅ 已修复
- **文件**：`src/pages/live/index.tsx`
- **问题**：`ProductPanel` 中"扣中"统计数字硬编码为 `42`，不是真实计数。

### ~~3. 打印机状态永远显示未连接~~ ✅ 已修复
- **文件**：`src/pages/live/index.tsx`
- **问题**：`printerStatus` 的 setter 被丢弃，`totalPrinted / totalPrintError` 永远是 0，状态栏始终显示"打印 0 / 异常 0"。

### ~~4. 直播列表"重打"按钮无效~~ ✅ 已修复
- **文件**：`src/pages/live/index.tsx`
- **问题**：`TABLE_ITEM_CONTENT` 是普通函数而非组件，没有状态和回调，"重打"按钮点击无任何响应。

### ~~5. 补打按钮不实际打印~~ ✅ 已修复
- **文件**：`src/pages/orders/index.tsx`
- **问题**："补打"和"批量补打"只调用 `updatePrintStatus` 改数据库状态，未调用 `printerPrintOrder`，不会向打印机发送任何指令。

---

## 业务逻辑未实现

### ~~6. "打印规则"面板的 5 个开关全部无效~~ ✅ 已修复（跑单提醒永久 disabled）
- **文件**：`src/pages/live/index.tsx`
- **问题**：`limitEnabled / fastEnabled / antiDupEnabled / vipEnabled / runawayEnabled` 及其对应参数只存在组件本地 state，从未传入匹配引擎，用户配置的所有规则均被静默忽略。

### ~~7. 轮次序号 / 流水序号切换无效~~ ✅ 已修复
- **文件**：`src/pages/live/index.tsx`
- **问题**：`seqMode` 有 UI 切换但从未在业务逻辑中被读取，两种模式行为完全相同。

### ~~8. "自动打印"开关存储但未生效~~ ✅ 已修复
- **文件**：`src/pages/print/index.tsx`、`src/store/printerSettings.ts`
- **问题**：`printerEnabled` 正确持久化，但没有任何调用点在触发打印前读取此标志。

### 9. 数据分析页是空壳
- **文件**：`src/pages/analytics/index.tsx`
- **问题**：页面仅有占位图标和文字"数据分析页面"，无任何图表或数据查询，但导航菜单对用户可见。

### ~~10. 首页是开发 Demo，留在了生产路由~~ ✅ 已修复
- **文件**：`src/pages/home/index.tsx`
- **问题**：`/` 路由渲染的是 Chakra UI 组件展示页（"LiveHunter — TikTok 风格组件库"），应在正式发布前替换或移除。

---

## 中优先级 Bug

### 11. fetchUser 失败会中断整个连接
- **文件**：`src/core/dydanmaku.ts`
- **问题**：`fetchUser` 仅用于获取 cookie，但其失败会被 `await` 直接抛出，导致整个 `connect()` 流程报 `CONNECTING_ERROR`，用户无法进入直播间。应在外层加 try/catch 容错。

### 12. 解析失败后重试同一 URL
- **文件**：`src/core/request.ts`
- **问题**：`getLiveInfo` 在 `parseLiveHtml` 返回 null 时重新请求完全相同的 URL，结果必然相同，重试无意义。

### ~~13. setCookie 使用了 decode 而非 encode~~ ✅ 已随死代码清理消除
- **文件**：`src/utils/cookieUtil.ts`（已删除）
- **问题**：构造 cookie 字符串时调用了 `decodeURIComponent(cookie.value)`，应为 `encodeURIComponent`。含 `=`、`;`、空格等特殊字符的 cookie 值会导致 `URIError` 或 cookie 格式异常。

---

## ~~死代码（可清理）~~ ✅ 全部已清理

| 文件 | 内容 |
|------|------|
| ~~`src/store/modules/auth.ts`~~ | `token: '2313'` → 已清空为 `''` |
| ~~`src/core/matchEngine.ts`~~ | `EnrichedDyMessage` 接口及多余 import → 已删除 |
| ~~`src/core/util.ts`~~ | `parseLiveHtml_old` 函数 → 已删除 |
| ~~`src/utils/debugUtil.ts`~~ | 整个文件 → 已删除 |
| ~~`src/core/relay.ts`~~ | 整个文件 → 已删除 |
| ~~`src/core/replayer.ts`~~ | 整个文件 → 已删除 |
| ~~`src/core/emoji.ts`~~ | 整个文件 → 已删除 |
| ~~多个 utils 文件~~ | `fileUtil.ts`、`idUtil.ts`、`loashUtil.ts`、`typeUtil.ts`、`cookieUtil.ts`、`commonUtil.ts` → 全部已删除 |
| ~~`src/pages/live/index.tsx:143`~~ | `PRINT_STATUS_MAP` 中 `color` 字段 → 已移除 |
