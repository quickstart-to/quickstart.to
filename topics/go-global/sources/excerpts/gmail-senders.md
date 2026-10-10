# Email sender guidelines

- 来源：https://support.google.com/mail/answer/81126?hl=en
- 发布方：Google Gmail Help
- 核验日期：2026-10-09
- 结论：个人Gmail发件认证要求区分所有/批量发送者；建议SPF、DKIM、DMARC及清晰退订；配置不保证投递
- 置信度：confirmed（官方公开文档；不是个案审核或实测）

> All senders: SPF or DKIM
> Bulk senders: SPF, DKIM, and DMARC

2026-10-10 补核（Ego TaskSpace 114）：本轮重读认证及 unsubscribe 段，区分一般/批量要求与正文退订链接/one-click headers；不以通过认证保证收件箱投递。
