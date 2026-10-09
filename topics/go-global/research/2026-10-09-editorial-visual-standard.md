# 编辑与视觉标准重设

日期：2026-10-09。来源：维护者直接反馈——现稿更像参考资料，尚未成为高质量经验分享；要求提高标准并用imagegen制作相应配图，并明确应广泛研究他人经验与相关文章，不能只看官方材料。此轮不声称完成全书重写、广泛经验调研或事实复核。

## 标准落点

- 仓库AGENTS.md只保留原则与入口；详细要求合并到docs/content-guide.md的写作、引用与编辑验收部分。
- 本主题agent.md约定读者、贯穿案例、各章职责和图文方向，避免把项目规则重复堆在研究记录里。
- 六项编辑验收分别提供证据：读者结果、推理深度、可执行性、事实与经验来源、阅读及视觉、跨章一致性。章节数、来源数和构建通过不能替代这些判断。
- 修正AGENTS与research技能中把博客、论坛一律限定为线索的规则；来源按待支持的主张评价。一手复盘可支持有归属的经验，深度文章可支持分析；官方来源继续核对现行规则。同步写作、事实复核与反馈处理入口，避免后续工作流重新排斥经验材料。

## 实践研究计划

每章先列出会影响读者行动的决定，再同时研究规则与实践。用中文和英文检索独立开发者博客、复盘、详细教程、深度比较及社区讨论；具体平台只是发现入口，不预设其文章可信。阅读原文，记录身份、地区、产品、时间、行动、所报告结果、利益关系与反例，区分复制报道和独立案例。已有84条来源不能证明这一步已完成。

| 决定 | 实践材料应回答的问题 | 如何进入正文 |
|---|---|---|
| 首个产品和首批用户 | 如何发现问题、接触客户、判断需求；哪些验证和发布失败了，为什么 | 比较处境相近的案例，形成可执行的主路线与停止条件 |
| 支付、交付与回款 | 同类身份与产品实际遇到哪些材料补充、集成、退款、冻结或迁移问题 | 将有归属的过程与当前官方规则对照，指出可借鉴步骤和不可推定的准入结果 |
| 定价与持续经营 | 调价、试用、取消及支持负担如何影响结果；哪些成本被漏算 | 解释取舍并完成一份示例报价，保留案例观察周期和规模 |
| 数据与合规安排 | 类似产品如何识别数据、删减收集、处理删除请求与跨境服务 | 用实践说明实施代价，以法规核对义务，完成示例数据流与处理决定 |

研究产物应包含决定与案例对照、冲突、未找到的证据以及对本书读者的判断。不得把经验帖当现行政策，也不得以“非官方”为由排除亲历证据；不得将案例汇编或外链清单充当完成的章节。

## 精修顺序与验收产物

| 顺序 | 工作 | 应交付的具体结果 |
|---|---|---|
| 1 | 快速入门重写为适用范围明确的主路线 | 起步条件、选择依据、完整演示案例、每步完成物、失败后的下一步；实际未验证的回款不得伪装实测 |
| 2 | 合规章按触发条件与上线顺序重写 | 同一示例产品的数据清单、处理决定、完成的政策片段及核验方式；说明新增AI或消费者业务会改变什么 |
| 3 | 补齐两篇样章的解释性视觉 | 相邻正文可解释的图注、精确流程/数据图、必要的真实脱敏操作截图、桌面及手机验收 |
| 4 | 其余章节统一精修 | 完成的报价、发布材料、对账与恢复样例；统一术语、数字、案例身份与跨章链接，删重复警示 |
| 5 | 复核并判断是否达到beta | 逐条事实核对、关键来源定位与摘录、六项编辑验收证据、仍未解决的问题对推荐的影响 |

以上为待完成工作。本轮只完成标准、第一张场景插画及其页面接入；现有正文尚未按新标准验收。

## 第一张插画：开发—交付—核对回款

- 文件：`../assets/build-deliver-reconcile-v1.png`。
- 用途：快速入门开篇场景图，建立从产品功能到客户成果再到回款核对的连贯叙事；准确金额、规则与状态仍在正文和后续可编辑图示中表达。
- 方式：内置`image_gen`，通过`imagegen`技能执行generate；没有使用CLI/API回退，无参考图输入。
- 创作日期：2026-10-09。AI原创编辑插画；不作为真实交易、到账或用户经历的证据。
- 风格：纸感、墨线、暖灰与陶土橙，沿用站点现有视觉；不添加品牌、金额或收益承诺。
- 验收：检查生成图的三个场景、报告的连贯性、无伪造可读数据；页面验收与构建资源大小见本记录下方补充。

### 最终生成提示词

```text
Use case: illustration-story
Asset type: original editorial opening illustration for quickstart.to, a Chinese-language practical field guide for independent software developers selling to overseas customers.
Primary request: depict the concrete progression from building a small software product, to delivering a useful customer report, to reconciling the resulting payment. An honest working process rather than a financial success fantasy.
Scene and subjects: a continuous wide tabletop scene with three clearly separated but visually connected moments: a developer's hands working at a laptop with a simple abstract interface; the resulting neatly composed report pages being handed to a customer's hands; hands matching a small receipt with a modest ledger on the desk. Show the report as the recognizable recurring object. This is an illustrative metaphor, not a real product or payment interface.
Style: sophisticated hand-drawn editorial illustration, confident dark graphite/ink contours, restrained flat shapes, subtle gouache and printed-paper texture, ample breathing room, clean visual hierarchy. Warm off-white paper, charcoal and light warm gray, sparse terracotta-orange accents matching the existing site's #b5410c accent. Calm, practical, human, thoughtful.
Composition: panoramic horizontal approximately 2:1. Medium close view of hands, laptops and paper; meaningful forms legible when displayed at 390px wide. Three readable moments integrated into one illustration, no panel borders. No important content at the edges.
Text: none. No letters, numbers, logos, brand marks or watermarks. Paper and interface details only abstract bars and shapes, no fake legible data.
Avoid: rockets, globes, flags, piles of coins, banknotes, upward stock charts, celebratory wealth imagery, glossy 3D, generic corporate vector people, fake screenshots, approval seals, realistic banking receipts. Do not imply verified revenue or automatic payout.
```

## 后续配图选择

| 读者问题 | 视觉形式 | 事实边界 |
|---|---|---|
| 为什么付款、交付和到账要分开验收 | 当前场景插画建立叙事；精确状态另用可编辑流程图 | 插画不承诺自动到账，不放未经核验的周期或费率 |
| 一份表格会被哪些服务读取、什么时候删除 | 随合规样章制作可编辑数据流及权限图 | 字段、接收方和留存期限与示例设定及引文一一对应 |
| 取消后为什么还能用，退款后为什么还要查续费 | 随定价样章制作订阅时间线 | 按选定平台核验实际状态和事件，不由生成图猜测 |
| 第一次向用户演示什么才算交付 | 在实际做出示例产品后截取脱敏演示，并可补原创情境插画 | 截图只能来自真实运行；推演文案明确标为示例 |

配图由解释任务决定，后续不机械地为每章补一张装饰图。

## 本轮验证

- 原图1774×887，2,983,999字节；Astro构建产物为220,988字节WebP，页面未直接加载原始PNG。
- 首次接入真实内容图片暴露Sharp不可加载的问题；将图片服务所需的`sharp`明确列为项目依赖并更新锁文件，继续使用Astro原生相对图片处理，无复制到public目录或绕过优化的处理。
- `pnpm build`通过，生成15页及优化图片；内容校验0错误、4条原有未引用来源警告。`pnpm check`为0错误、0警告、0提示，`git diff --check`通过。
- ego浏览器检查桌面672×336显示尺寸及390px手机视口（图片358px宽）；图片加载成功、比例正确、无页面横向溢出，图注清楚说明AI场景示意。正文核验日期仍为2026-10-08。
- 本轮验证仅覆盖编辑规则一致性和插画交付，不能用来宣称现有正文已经达到新标准。
- 经验研究规则补充后，research、write-chapter、fact-check、triage-feedback四个技能均通过skill-creator的格式校验；复读规则入口以确认不再把非官方实践材料统一排除。格式校验不能替代未来的实际研究与编辑验收。
