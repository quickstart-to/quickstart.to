# 邮件事件的状态边界
- 原文：https://resend.com/docs/webhooks/event-types
- 发布者：Resend；阅读：2026-10-09。
- 类型：official documentation；状态：confirmed（定义）。
> email.sent: Occurs whenever the API request was successful.
- email.sent 后仍会尝试向收件方服务器投递；email.delivered 定义为成功投递到收件方邮件服务器。
- email.delivery_delayed 表示临时问题（例：邮箱满或收件服务器暂时异常）；email.bounced 表示收件方服务器永久拒收。
- 只采用事件定义解释排查顺序。未真实发送邮件、配置账户、测试收件箱，也不把 opened/clicked 当作人已登录的证据。
