# Secrets

- 来源：https://developers.cloudflare.com/workers/configuration/secrets/
- 发布方：Cloudflare Workers Docs
- 核验日期：2026-10-09
- 结论：敏感API密钥使用secrets而非配置中的明文vars；本地密钥文件不提交Git；环境需分别配置
- 置信度：confirmed（官方公开文档；不是个案审核或实测）

> Do not use vars to store sensitive information in your Worker's Wrangler configuration file. Use secrets instead.
