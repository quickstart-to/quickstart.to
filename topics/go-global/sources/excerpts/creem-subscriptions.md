# Subscriptions

- 来源：https://docs.creem.io/features/subscriptions/introduction
- 发布方：Creem
- 核验日期：2026-10-09
- 结论：订阅按周期扣款；试用、未付款、有效和期末取消为不同状态；生产应使用webhook同步权益
- 置信度：confirmed（官方公开文档；不是个案审核或实测）

> Scheduled Cancel: The subscription is scheduled to cancel at the end of the current billing period but is still active until then.

2026-10-10 重读 Subscription States / Webhook Integration：状态与应用访问同步分别处理，生产建议 webhook。当前周期与已付款事实不能被一条迟到状态覆盖；本书的按账单计算与 72 小时宽限是教学契约，不是平台统一规则。
