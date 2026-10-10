# Deal with remote hosted code violations

阅读：2026-10-10。来源：https://developer.chrome.com/docs/extensions/develop/migrate/remote-hosted-code?hl=en

> It does not include data or things like JSON or CSS.

定义、依赖、编译产物审查与受限例外章节，confirmed。没有采用页面列出的规避性误用，也不承诺任意 JSON 功能配置均获准。

采用范围：Manifest V3 的远程托管代码规则涉及浏览器执行的外部 JavaScript/WASM及依赖；数据与代码有别，存在用途受限的特殊 API 情形，不以远端执行代码作为常规更新办法。
