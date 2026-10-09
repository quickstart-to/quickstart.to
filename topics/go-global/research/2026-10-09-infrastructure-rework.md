# 基础设施：从供应商清单到可验收的用户路径

日期：2026-10-09。写前参照：快速入门、选品与验证、冷启动获客在 `7591851` 的版本，以及 `editorial-baseline.md`。保留连贯论述、案例条件、完整产物、关系图和可操作演算；这些样章仍不是独立读者验收。

## 读者的决定与本章贡献

读者已经有可演示的小型 Web 工具，准备让海外用户尝试。现稿罗列域名、平台、密钥、邮件、备案与备份，没有完成一次系统取舍，也没有展示恢复后的证据。新稿要帮助读者确定当前阶段哪些依赖不可少，识别一次请求在何处失败，并拿到可复现的发布/回退/恢复结果。与获客章区别：不再决定去哪里找人，而是检查来的人能否完成任务，以及故障发生时能恢复什么。

延续浏览器本地处理周报、不上传文件、不保存云端历史的试用基线。账号/邮件/交易等按实际触发的付费服务另画分支，不把所有组件强塞给尚未验证的样稿。真实运行产物来自隔离的合成练习，不能写成海外生产环境或真实客户验收。

## 问题与检索计划

| 决定 | 需要的证据或完成演示 |
|---|---|
| 静态试用、单区托管后端、自管服务器如何取舍 | 小团队的部署/迁移/故障原始复盘，检查推荐项的限制和成本 |
| 页面快是否意味着真实任务快 | CDN、动态请求与数据库位置的实际关系，完整请求路径图及明确的延迟推演 |
| 登录邮件失败时怎样定位 | 发送 API、收件服务器接收、邮箱/用户使用的状态边界，原始故障或服务文档 |
| 回退部署与恢复数据分别解决什么 | 原始事故、兼容性边界、实际执行的本地隔离恢复产物 |
| 域名、密钥和进入国内业务如何处理 | 保留的官方规则重读；区域和服务范围不靠单一标签判断 |

中英文查询：独立开发者部署/故障/备份恢复复盘、邮件魔法链接未收到、出海访问延迟；small SaaS infrastructure postmortem backups restore、single region edge database latency、magic link email delivery incident。按决定寻找原作者和反例，不按来源数量验收。

## 阅读与取舍结果

本轮在 ego lite 的同一研究空间中检索中英文原作者文章，读取下列来源正文。搜索摘要和聚合页没有作为证据。最可能推翻本例选择的条件，是产品已需要持久状态、客户有数据所在地要求，或维护者已有成熟的自管运维能力；正文没有把“静态站”或“托管后端”当作普遍最优。

| 决定 | 实际读取与适用范围 | 写入文章的判断及反证 |
|---|---|---|
| 先减少哪些依赖 | 程小白《开发者的窘境》，2022-08-21 原作者博客迁移复盘，`src-cheng-infrastructure-migration` | 副本、缓存不一致和维护精力影响了迁移；小规模静态内容随仓库管理有依据。此例不是有状态产品或当前地区测速证据。浏览器试用省掉账号、数据库、发信，但失去跨设备历史；共享或权益需求出现才增加状态。 |
| 动态任务放在哪里 | Cloudflare Placement 正文，`src-cloudflare-placement` | 多次串行往返可能超过最初一次用户请求的距离成本。示例实际算出两种选择与相等条件，不采用供应商排名、计划价格或全球延迟保证。托管后端仍需检查限制、导出、备份与账户恢复；自管 VPS 的已有技能可改变选择。 |
| 如何解释邮件失败 | Resend Event Types 全部相关邮件事件及 Google 发件要求，`src-resend-email-events`、`src-gmail-senders` | API 接受、收件服务器接收和用户登录是三段证据。一般与批量发件要求分开，未将 Gmail 规则推广至所有邮箱。示例消息明确为假设；未接真实发件账号。 |
| 有备份为何仍恢复不了 | GitLab 2017 原始事故复盘，`src-gitlab-database-postmortem` | 工具版本不匹配、失败通知未收到、恢复点之后的缺口各自需要验证。历史大系统事故只提供失效链，不能推断小产品的故障率或当前服务可靠性。 |
| 托管备份覆盖什么 | Supabase Database Backups，`src-supabase-backup-scope` | 数据库备份中的对象元数据不能替代 Storage 对象文件；这是对推荐的托管方案的明确限制。排除套餐、价格和无损恢复承诺。 |
| 保留的域名、密钥、国内业务规则 | 重读 `src-cloudflare-registrar`、`src-cloudflare-secrets`、`src-cn-internet-services`、`src-cn-internet-services-draft`、`src-cn-app-filing` | 默认续费不等于实际扣费成功；本地敏感配置不可入库；2024 修订文本与 2026 征求意见稿分开。真实主体、服务范围与网络资源需交给对应部门核对，不能用“海外部署”作统一手续结论。 |

新增五条来源并各留短摘录；本章另保留六条同日重读来源，共十一条引用。`accessed` 为实际读取日 2026-10-09。`last_verified` 仍是当天，其他页面没有补刷日期。

### 未采用与存档边界

- 检索中出现大量供应商清单、营销汇编和无实际操作记录的泛化文章，未用来推导选择。
- 完整阅读 [Waline / VPS / SQLite 的个人文章](https://fomoxx.com/posts/waline-vps-sqlite/)（发布 2026-07-06，更新 2026-09-30）。可见作者的依赖简化思路，但文中没有可复核的实际恢复结果，其打包运行中 SQLite 的示例不足以作为本章备份方法依据，因此不注册为正文来源，也不复制其命令。
- Cloudflare Placement 的 Wayback 存档已打开并确认正文可读：`https://web.archive.org/web/20261009071543/https://developers.cloudflare.com/workers/configuration/placement/`，已写入 registry。
- Resend 存档尝试返回的 `20261009071519` 页面最终显示 Error loading page / HTTP 500；Supabase 的 `20261009071533` 页面显示客户端 application error。未将它们写成可用 archive。官方原文及短摘录可读不意味着失败的存档已成功。

## 实际演练与交付契约

源文件：`../assets/infrastructure-drill.mjs`；站点静态下载路由：`/go-global/infrastructure-drill.mjs`。唯一数据是新建临时目录内的合成 JSON，没有生产路径参数、账户、密钥或外部请求。脚本使用 Node.js 内置模块，在 `127.0.0.1` 随机端口实际启动 HTTP 服务；切换版本时关闭再启动服务，整个演练仍在一个 Node.js 进程内。

2026-10-09T07:13:00.467Z 在 macOS / Node.js v22.19.0 执行的结果见 `2026-10-09-infrastructure-drill-result.json`。此记录去除了本机临时目录绝对路径；步骤、时间与返回值来自实际执行，没有手填成功结果。

1. 两条记录 3＋2，`v1` 返回 HTTP 200 / 5 小时。
2. 故意出错的 `v2` 健康入口正常，报告 HTTP 200 却只有 3 小时，业务检查失败。
3. 重新启动 `v1`，回到 5 小时，验证此例代码回退且数据格式未变。
4. 停写复制备份，再加入 `r3` 的 1 小时，当前数据成为 6 小时。
5. 仅破坏练习文件，原 `v1` 返回 HTTP 500，说明正确代码无法修好无效数据。
6. 把旧备份复制到隔离目录，`v1` 返回 HTTP 200 / 5 小时；实际比较得到缺少 `r3`。可读检查通过，最新业务完整性检查失败。

脚本退出码为零表示六种预期现象均被实际观察到，包括故意失败的业务检查，不表示最后的数据完整。输出与 `result.json` 保留这一差异。演练结束关闭服务，保留临时目录供检查。文件复制前已停止写入，不是运行中数据库的备份方法；未测云部署、DNS、全球网络、真实邮箱、生产数据恢复或恢复用时。

另在 ego 浏览器点击页面下载链接，保存为本地临时文件，与仓库脚本逐字节一致，再独立执行，六步及缺少 `r3` 的结果一致。静态路由只交付该源文件，不引入远程执行接口。

## 图文与交互

- 两阶段路径图：解释本地试用与有状态版本的依赖变化，明确新增后端不等于上传 CSV。
- 延迟互动：A＝20＋查询次数×远端往返；B＝160＋查询次数×5。查询范围为 1–8 整数，远端往返为 20–250 毫秒整数；两条纯网络假设路径，排除执行、连接和大文件成本。初始、反转、相等结论都可复核。
- 邮件状态图：每阶段需要的证据和失败去向，避免把送达状态等同登录成功。
- 恢复分支图：代码与数据故障走不同检查，最终回到业务任务与完整性；手机两支共享侧边连接线，避免被读成先后步骤。
- 六步结果表：桌面保留对照，窄屏改为有动作、观察和解释的卡片。
- 插画：比较旧副本与新增工作，放在实际恢复演练之前承担直观过渡；不是事故截图或现场证据。没有为凑媒体数量再加视频，步骤图和可运行文件更直接解释本章问题。

### Imagegen 记录

生成方式：内置 image_gen，一次生成，全新不透明背景，未使用参考图或编辑模式。输出原图已检查并复制到 `../assets/recover-the-missing-work-v1.png`，1672×941；网页通过现有 Astro 图片流程交付 WebP。原始生成文件保留在本机生成资源目录，仓库不记录个人绝对路径。

Prompt（完整）：

> Use case: illustration-story. Create a landscape 16:9 editorial illustration for a Chinese field guide chapter about keeping a small web product recoverable. Show one independent software maker at a quiet desk carefully comparing a set of client-report sheets with a slightly older set from an open archive folder. The current stack has one distinctive terracotta-accented sheet that is visibly missing from the archived stack; the extra sheet is laid separately between the two stacks so the missing recent work is the visual focus. A closed laptop and a small reusable software-release box sit quietly to the side, secondary. The maker is comparing the pages with a pencil, calm concentration, not panic or triumph. Medium-wide tabletop scene, hands and paper comparison readable at phone width. Refined editorial ink contours, soft gouache washes and warm paper texture; ivory, charcoal, warm grey, restrained terracotta orange and muted olive. Coherent with a thoughtful practical field guide, not a glossy corporate banner. No legible text, dates, numbers, logos, screenshots, charts, flags, globes, rockets or watermark. This is a conceptual illustration of recovering an older copy and noticing missing recent work, not evidence of an actual customer incident.

## 独立退稿阅读与修复

写后单独通读渲染正文，并参照快速入门、验证及获客章的连贯论述与完整产物，不以新增来源或组件数量作编辑验收。

| 位置与发现 | 对读者的影响 | 修复与再读结果 |
|---|---|---|
| 原章将域名、平台、发信、备份并列为清单，没有完成一次阶段选择 | 读者会在尚无需状态的样稿里堆服务，也拿不出可验证产物 | 用浏览器试用基线划分阶段，讨论静态路线的历史与授权限制、托管范围及 VPS 技能条件；真正新增能力是六步可复现实验和对恢复缺口的解释。 |
| 新稿演练表写“停旧进程”，实际脚本只关闭再启动服务 | 把测试范围夸大成未执行的进程级发布 | 根据脚本与运行记录改为“停止旧服务”；正文只称本地微型 HTTP / 文件演练，没有宣称进程管理或云部署验证。 |
| 开篇“提交表格”与本地不上传案例相邻 | 容易让读者以为当前样稿已上传客户文件 | 改为选择表格并点下生成；两阶段图仍明确文件留在本机。 |
| 邮件图注、示例末句与文末连续重复“未实际发送” | 打断状态解释，让透明说明压过正文 | 图注改为三步关系，假设事件在首次实例与文末保留边界；没有因此暗示真实发件。 |
| 手机恢复图若用连续向下箭头，两个故障分支容易被当成顺序步骤 | 读者可能以为代码回退之后必然覆盖数据 | 用共同起点与侧边分支线连接两个条件，再汇回业务检查；窄屏截图中分支和解释保持可辨。 |

当前全文把“什么该存在”“等待发生在哪里”“消息到了哪一段”“恢复后缺了什么”连接起来；每个媒体回答相邻问题。迁移案例有适用条件和不能外推的范围，推荐的托管路线也有对象文件备份反例；不像原章只列服务名。仍未获得独立读者认可，不将本次自审当成专题升级依据。全球可达、真实发信与生产恢复不在本地练习证据里，文中与最终报告都保留这些缺口，专题继续 `draft`。

## 技术验收

- 本地 ego：1440 px 桌面，390 px 手机，960 px 深色与 reduced-motion。流程、延迟、邮件、演练卡片与恢复分支没有横向溢出；窄屏插画已实际查看。第一次截图在图片解码完成但绘制尚未提交时留白，再观察确认像素交付与实际画面；未为截图时序加入产品 workaround。
- 延迟结果：4/150＝620/180；1/20＝40/165；8/250＝2020/200；4/40＝180/180。空值、0、9、1.5 次查询，以及 19/251 毫秒均显示错误、标记无效输入并保留上一个有效结果；重置恢复 4/150 和正确说明。ArrowUp 从 4 到 5，结果 770/185；原生折叠按 Enter 正常。
- 禁用 JavaScript 并重载后，输入均禁用、重置隐藏，620/180 和 40/165 的静态解释可读；下载链接保留，法律折叠仍可键盘打开并显示三条来源。恢复脚本无需前端 JavaScript 才能下载。
- 本地文章十一条引用均渲染，没有裸 `[^src-...]`。最终构建、锚点检查与远程交付结果在 PR 中补充；这些技术检查不能代表真实海外用户或独立编辑验收。
- 最终 `pnpm build` 通过：15 个 HTML 页面及静态演练脚本；内容零错误、七项既有未引用来源提示，混排空格零缺失。`pnpm check` 零错误、零警告、零提示，`git diff --check` 通过。
- 构建产物检查：614 条站内链接（含 322 条片段链接）、58 处 ARIA ID 引用均可解析，无重复 ID 或裸引用；基础设施旧 19 个 ID 全部保留。下载资源 5,060 字节与源文件一致；新增图在站点交付为 192,982 字节 WebP。
