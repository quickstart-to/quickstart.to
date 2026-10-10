# Idempotent requests — Stripe API Reference

阅读：2026-10-10。来源：https://docs.stripe.com/api/idempotent_requests

> The idempotency layer compares incoming parameters to those of the original request and errors if they’re not the same

Idempotent requests 段，confirmed；API v1 可在至少 24 小时后清理，执行前验证错误等并非统一保存；正文不承诺所有平台同样行为。

采用范围：相同幂等标识用于恢复重复请求；文档区分 API v1/v2 失败语义，v1 参数比较与保留窗口。仅借鉴契约明确，不将其期限或计费规则移植到教学 API。
