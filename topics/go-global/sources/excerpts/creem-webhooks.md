# Webhooks

- Source: https://docs.creem.io/code/webhooks
- Publisher: Creem
- Accessed: 2026-10-08

> Because the same event can be delivered more than once, your handler should be idempotent.

> Use the TypeScript SDK to verify the signature before processing the event payload.

> Use only for synchronization, we encourage using subscription.paid for activating access.

> The subscription remains active until current_period_end_date, after which it transitions to canceled.

## 2026-10-09 样章复核定位

定位：What is a webhook说明重投与幂等、支持后台手动重发；Network Configuration说明WAF/机器人防护可拦截及应采用签名验证；Webhook Signatures使用原始请求体；checkout.completed用于完成的结账；refund.created用于退款事件。正文的一次订单开通一次30天权限，是本书示例业务规则。
