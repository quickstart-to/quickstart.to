# The activeTab permission

阅读：2026-10-10。来源：https://developer.chrome.com/docs/extensions/develop/concepts/activeTab

> 对标签页的访问权限在用户位于相应网页上时有效

正文、What activeTab allows 与示例；confirmed。阅读版本为官方站中文翻译；同来源路径导航并不撤销。

采用范围：用户明确调用后临时获取当前标签主框架来源的访问，跨来源导航或关闭撤销；受限页面不可访问，脚本注入另需 scripting。不是持续全部站点访问。
