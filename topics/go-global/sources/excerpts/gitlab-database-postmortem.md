# GitLab 2017 数据库事故原始复盘
- 原文：https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/
- 发布：GitLab，2017-02-10；事故：2017-01-31；阅读：2026-10-09。
- 类型：attributed experience；状态：reported。
> Unfortunately the process of both finding and using backups failed completely.
- 定位：Database backups using pg_dump、LVM snapshots、Recovering GitLab.com、Data loss impact。
- 采用：主库误删；备份命令的 PostgreSQL 主版本不匹配导致没有可用导出；失败告警邮件因认证问题遭拒，未及时发现；最终用约 6 小时前为测试准备的快照恢复，仍有之后的数据缺口。
- 局限：当时的大型服务事故，不能套用其恢复时长、存储平台限制或影响范围到小产品；不评价当前 GitLab 可用性。正文不复制危险操作命令，不把副本等同于备份。
