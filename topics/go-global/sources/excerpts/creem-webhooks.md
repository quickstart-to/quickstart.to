# Webhooks

- Source: https://docs.creem.io/code/webhooks
- Publisher: Creem
- Accessed: 2026-10-08

> Because the same event can be delivered more than once, your handler should be idempotent.

> Use the TypeScript SDK to verify the signature before processing the event payload.

> Use only for synchronization, we encourage using subscription.paid for activating access.

> The subscription remains active until current_period_end_date, after which it transitions to canceled.

