# 数据库备份未包含全部文件
- 原文：https://supabase.com/docs/guides/platform/backups
- 发布者：Supabase Docs；阅读：2026-10-09。
- 类型：official documentation；状态：confirmed（范围）。
> Database backups do not include objects you store via the Storage API
- 定位：Types of backups。数据库存储对象元数据；恢复旧备份不会恢复备份后删除的 Storage 对象。
- 采用：提醒按数据库、对象文件、配置、密钥与第三方状态分别核对恢复范围。未采用价格、备份保留期或套餐资格，也未进行账户恢复操作。托管备份仍需验证覆盖与可恢复性。
