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

本轮重读 `refund.created` 展开的 JSON：退款对象 `status` 为 succeeded，关联 transaction 为 refunded，但嵌套 order 仍可为 paid。因此，示例按付款与退款事实共同计算权限，不能用嵌套 paid 覆盖已完成退款。HMAC-SHA256 校验针对原始请求体；本书下载脚本采用自定义归一化教学协议，未复制或联调该平台完整负载。

2026-10-09 风控章重读全文：Webhook Signatures 用原始请求体与签名校验；开头要求重复事件幂等处理。本轮客服例只采用已验签事件与订单关联、重复安全处理，不将网页跳转作为付款/交付证据；没有据此宣称实际平台联调已执行。

2026-10-10 重读 subscription.paid / past_due / unpaid / expired / scheduled_cancel 与开头重试说明：paid 确认周期付款，active 主要同步；expired 后扣款重试仍可能继续。页面的五次退避是 webhook 投递重试，不是银行卡扣款安排。未读取真实账户负载；S-02 采用自定义已核实事实，不能当官方协议。
