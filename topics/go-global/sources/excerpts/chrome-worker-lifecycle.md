# The extension service worker lifecycle

阅读：2026-10-10。来源：https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle

> 请将值保存到存储空间，而不是使用全局变量。

Idle and shutdown / Persist data rather than using global variables，confirmed。阅读官方站中文翻译；不采用版本特定时限作为统一值。

采用范围：Chrome 扩展 Service Worker 应能承受意外终止；关闭后全局变量丢失，应持久化需恢复状态。未将后台常驻或固定存活期限作为承诺。
