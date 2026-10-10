# Receive Stripe events in your webhook endpoint

URL: https://docs.stripe.com/webhooks
Read: 2026-10-10
Locator: Event ordering · Handle duplicate events · Verify events are sent from Stripe

> Stripe 不保证事件按照生成的顺序发送。

Scope: 事件可能重复且不保证生成顺序；需验签、记录事件 ID 并按业务对象识别重复，本文不涉及准入推荐
