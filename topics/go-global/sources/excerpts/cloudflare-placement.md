# Placement
- 原文：https://developers.cloudflare.com/workers/configuration/placement/
- 发布者：Cloudflare Workers Docs；页面更新：2026-04-23；阅读：2026-10-09。
- 类型：official documentation；状态：confirmed（限所述文档表述）。
> The latency from multiple round trips between Sydney and Frankfurt adds up.
- 定位：开篇、Understand placement、Review limitations。默认靠近接收请求位置运行；连接后端时，靠近数据库可能更快。静态资源默认交付位置与代码访问 assets binding 的位置有区别。
- 采用：用一条动态请求中的多次后端往返解释延迟；不复制配置让读者以为已实测最佳地区，不采用可达性、地区准入、套餐和具体毫秒保证。正文演算数值全部合成。
