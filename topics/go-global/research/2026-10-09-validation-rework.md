# 选品与验证返工：从机会线索到投入决定

日期：2026-10-09。维护者要求整理第一篇积累并继续优化第二篇。前版d99aa09被指出低于快速入门的完成度，本次按更新后的research/write-chapter流程执行。浏览器TaskSpace 52。

## 写前约定

参照：`quickstart.md`在ff663a8的阅读版本，经验提炼见`editorial-baseline.md`。它是相对基线，不是维护者已批准的最终成稿。

读者起点：会开发、有几个软件方向，尚未决定先投入哪一个。新增能力：从公开工作线索与替代方案中形成候选，比较可触达性、采用负担和交付成本，淘汰方向，选择一次能改变决定的试验。不能再只重述快速入门的访谈与回访。

完成物：有实际公开产品资料支持的候选比较，清楚区分已知/假设/未知；一份从候选到试验的完整推演；可调整假设并观察总工作量变化的互动。不会虚构客户访谈或将假设评分包装为市场数据。

## 决定覆盖与检索计划

| 读者决定 | 要找的证据或推演 | 写前缺口 |
|---|---|---|
| 去哪里发现值得做的任务 | 原作者如何从技能、失败或具体流程收窄产品，中文失败反例 | 寻找Bannerbear原始转向记录，保留V2EX原帖 |
| 怎样读竞争与替代方案 | 实际产品目前解决的任务、输入输出、谁操作 | 核对Toggl报告和AgencyAnalytics客户报告原始页面，不用品牌清单充当比较 |
| 几个方向怎么选 | 在相同开发者约束下比较触达、现有办法、迁移、服务和可验证结果 | 贯穿案例原先直接选定周报，需要公开比较与否定条件 |
| 什么时候值得继续开发 | Buffer与Level的具体信号、误判及后续行动 | 重读过程，保留代价与失败分支，删泛泛结论 |
| 怎样衡量改善 | 输入整理、生成、核对、交付的全程工作量 | 用明确合成数据实现可操作演算，不虚构节省比例或转化 |

查询中英并用，原文通过ego浏览器读取。保留已可用的历史来源，新增来源只服务于上述缺口。

## 视觉与媒体计划

- 开篇原创编辑插画：开发者筛选三份不同工作的真实样稿，帮助读者进入“选择机会”的场景，与第一篇倾听/迁移插画形成连续视觉语言。精确比较用正文与图表承载。
- 原作者转向路径与对照：展示观察怎样改变产品范围，保留关键分歧。
- 已填候选比较：同一开发者前提下逐步排除，不设任意总分。
- 总工作量互动：改变准备、核对和首次设置成本，观察原流程/新流程与多次使用的结果；显示静态基线和重置，键盘可操作。
- 视频按对本章的独特帮助选择；不为媒体数量重复第一篇访谈视频。若无新合适原作者内容，保留有用的图、插画和真正可操作的演算。

## 原文发现与证据范围

- `src-bannerbear-pivot`：Jon Yongfook于2020年1月的转向公告，全文读取。Previewmojo原先只生成Open Graph图片；作者报告频率不足、用户不熟悉或不重视，反复出现其他尺寸需求后扩展用途，并收拢三个产品的精力。reported，厂商创始人推广背景；这是当时的决定，不能用后来成功反证已验证。比第二手收入报道更接近实际选择过程。
- `src-toggl-client-report`：读取官方How to generate a report for a client?全部步骤。客户/项目与日期筛选→下载PDF→交付客户，概览另用Summary report。confirmed仅限文档能力，未账户实测。没有采纳搜索摘要里的套餐范围或日期格式解释。
- `src-agencyanalytics-reporting`：通过首页可见链接进入Automated Reports产品页。读取数据连接、模板、定时发送、专家评论及审核范围；只用于竞争工作覆盖，不采用其省时率、营销客户数、支持时效或计划价格。最初猜测的/client-reporting为404，已改从页面导航定位，不把404记为无此功能。
- `src-level-validation-retrospective`：重读预订、引导试用、两轮名单邀请、客户分组、重新访谈与创始人约束部分。约50人购买49美元预订，实际团队采用少；有少量满意客户；大团队成熟度门槛与小团队较弱切换动力形成两端限制。资金与家庭目标不进入正文数字，保留其小团队自举约束。reported，不把作者的“everyone lies”修辞作为结论。
- Buffer与V2EX原始复盘沿用同日已读并登记的证据（见validation-depth.md）。本轮Buffer侧重价格页与真实付款间还缺了什么，中文复盘侧重既有组织经验不能直接外推需求。Superhuman不再进入本文，避免继续扩到后期反馈分组而冲淡选品主线。

实际检索：`site.bannerbear.com blog idea validation Jon Yongfook`、`site.toggl.com track reports clients pdf export`。Bannerbear聚合营收文章、非原作者短视频及Toggl替代厂商文章未采用。AgencyAnalytics无账户访问，首页展示的示例客户数据和宣传指标不进入仓库。

矛盾与建议：有竞争产品不证明没有机会，也不证明任务在新细分人群中成立；厂商页面证明已有能力，体验缺口仍要向使用者核对。Bannerbear显示相邻用途可改变方向，Level显示强兴趣或付款也可能跨不过采用负担。两者不支持“越窄越好”或“扩大功能一定正确”，关键是重复任务、采用条件和开发者资源。

## 退稿审查与修复

### 编辑结果

本次新增能力可具体指向“先走一遍现有办法”“三个候选”“生成很快”三节：读者可以从实际替代路径形成比较，区分暂缓、调查与长期开发，并计算输入和收尾如何改变采用成本。相比快速入门，本章不再重新讲完整获客与留存路线。

| 退稿问题与影响 | 修复与复查位置 | 状态 |
|---|---|---|
| 旧稿直接选工作室，缺少可追溯的候选与淘汰理由 | 实读Toggl/AgencyAnalytics工作路径，三个候选分别列依据、未知与取舍；B的优先来自明确开发者约束，不冒充市场最优 | 已修复推演缺口；仍需真实人群验证 |
| 把有例子当作解释充分，未展示新信息怎样改变决定 | Bannerbear图展示原用途→反复请求→范围调整；Level保留付款、试用、两端采用困难及经营约束，未使用结果替代过程 | 原文支持所述过程，不能推算因果和成功率 |
| 折叠答案被当成互动，无法让读者发现新关系 | 新成本演算允许调整准备、核对、设置和次数；首次39分钟、两次58分钟的变化解释收回设置成本 | 可观察的输入/结果，明确合成数据 |
| 方案看似完整，但投入边界不清，容易把选中候选当作已批准开发 | 明写“批准进一步了解B”；六小时细分为1+3+1+1，明确是确认任务后的下一周，外部等待另计 | 已明确阶段与预算来源 |
| 普通图文说明与反复教学声明打断阅读 | 一次集中交代案例，控件就近标明合成数据，文末集中来源限制；插画说明统一在站点内容说明 | 通读后未发现影响判断的来源混淆，仍待维护者阅读反馈 |

逐段阅读时检查了开篇与参照的差异、案例到候选的过渡、成本模型后的解释和末尾决定。候选比较保留语义化条目而不强压宽表；三条候选本身需要逐项比较，不用表格承载全部正文。移除Superhuman后期问卷方法，减少从选品再次扩张到全生命周期。

### 事实与限制

新增3个原始来源，既有Level重读，Buffer与中文案例使用同日核验记录。公开产品资料只证明页面所述能力，没做登录实测；没有真实工作室访谈或采用结果。完整国家比较、经济可行性与长期运营不在本章示例的证明范围，专题仍为draft。修订交付后等待维护者阅读反馈，不宣称达到独立读者验收。

### 技术与skill验证

- 两个修改后的SKILL.md均通过skill-creator格式检查。引用路径存在，未改变其他技能、个人配置或新增自动批准流程。
- 以旧稿d99aa09对照新流程：它不能证明相对入门的选品新增能力，缺候选推导；本次记录展示了据此补研究、改正文和验证演算的实际过程。这是本任务中的行为检验，不是独立盲测，也不保证未来自动达标。
- `pnpm build`与`pnpm check`串行通过：15页，0错误，8条未引用研究来源提醒；Astro诊断0错误/警告/提示。
- ego检查1280px、390px与960px；图示与互动宽度为672/358/609px，手机按容器重排，无横向溢出。场景图、转向图、替代路径、候选和互动均查看截图；深色/减少动态设置可读，无新增动画。
- 键盘操作：导入顺畅预设4次合计96（旧120）；1次39（旧30）；2次58（旧60）。准备/核对/设置归零时每次7；最大边界12次864（旧360），多504；日常相同且设置20时多20，设置0时相等。恢复初始为14/12/20/4及152（旧120）。
- 禁用脚本重载：4控件禁用、预设/恢复按钮隐藏、初始演算完整，原生details仍可键盘展开；无iframe。来源列表6个链接，内容维护说明仅1份。
- 最终构建的291个站内页面链接、309个片段链接和41个ARIA引用均有目标，无重复ID；所有已发布章节slug保留。远程预览与CI结果记录在同一专题PR中。

## 原创场景插画

- 文件：`../assets/compare-work-samples-v1.png`；内置image_gen，经imagegen skill生成，2026-10-09，无参考输入、无CLI回退。
- 用途：在章节开篇建立“把不同工作样稿摆在一起比较”的场景。账表、带批注的文件和营销图表用作视觉隐喻；精确候选和证据由后面的原生文字承载。
- 已检查：宽幅纸感和墨线、暖灰绿与陶土橙，三份不同材料，双手与铅笔，没有可读的虚构数字、品牌或实际产品界面。普通原创插画来源由文末统一说明。
- 原始文件保留在Codex生成目录，项目副本走Astro图片优化。原图1672×941、2,677,238字节，交付WebP为182,772字节；桌面显示672×378、手机358×201，已查看两种尺寸的截图。

### 最终生成提示词

```text
Use case: illustration-story. Asset type: original editorial illustration for a Chinese field guide about choosing a software opportunity for overseas users. Primary request: show the quiet, concrete work of comparing candidate jobs before building a product. A continuous wide tabletop scene: a developer's hands arrange three distinct paper work samples from left to right — a small time ledger, a client project update with notes and a paperclip, and a dense multi-channel marketing chart sheet. One hand uses a graphite pencil to examine the middle project-update sheet beside an older marked-up template; the other two remain on the desk, suggesting alternatives weighed, not a guaranteed winner. A modest laptop sits partly out of frame, secondary to the papers; an eraser and closed notebook convey practical work. Style: sophisticated hand-drawn editorial print illustration, crisp expressive ink contours, gentle gouache texture, warm ivory paper, charcoal, muted gray-green and restrained terracotta-orange accents. Composition: landscape roughly 16:9, generous breathing room, clear simple silhouettes that remain legible at mobile width; no panels or infographic boxes. Show work materials and trade-offs, not a celebratory startup or a money scene. No legible text, letters, numbers, logos, flags, maps, currency, rocket, globe, trophy, or fake interface screenshot. This is a scene illustration; exact evidence and decisions appear separately as live page text.
```

## 维护者要求的再次复审（3321d2c）

日期：2026-10-09；范围为第二篇和research/write-chapter的实际约束，参照第一篇及写作基线。先通读当前正文、第一篇与共用规则，再定向补查，而非从上次“已完成”的记录推断质量。本轮继续使用ego，TaskSpace 53；未使用独立评审者。

### 发现、影响与修复

| 优先级 | 3321d2c中的位置与问题 | 对读者的影响 | 本次处理 |
|---|---|---|---|
| 先修推导 | “先走一遍现有办法”及三候选：A/C列真实原生路径，B仅列自己的教学路径 | 推荐项因研究不足而显得更有空间，容易把贯穿案例当成预设结论；此前确实只推荐调查，未声称已验证，因此不是虚构用户事实 | 补读Asana状态更新；三路均比较已有办法，B同时对照邮件/文档模板。把调查起点改为“为什么旧输出还需返工”，保留没有缺口就结束 |
| 补齐情境 | “三个候选”后主要提醒英语人群不是一个市场，却未让它改变实例的对象与成本 | 海外只成背景，读者还要自行补出谁可参与、自己能否服务 | 将对象写成负责网站交付、亲自准备英文客户更新、能尝试辅助工具的人；实际地区、接收方式、审阅者要了解，异步支持与即时陪同的冲突会改变下一步。未假定已找到这些人 |
| 精简阅读 | 候选对照、B之后的解释、末尾总结和决定记录重复同一取舍；“批准进一步了解”是内部评审语言 | 越读越像验收表，末尾没有增加足够的新动作 | 删除末尾A/B/C复述；结尾记录转成找谁、看什么、确认何种返工后做样稿；压缩旁白与重复限制，重要假设仍就近说明 |
| 修复流程 | write-chapter描述只覆盖写作，反证规则强调失败案例，却未检查推荐项与其他项是否同等受审查 | 有来源、有反例、有审查记录，仍可能放过不对称推导 | 加入现有文章review入口，共用流程补比较对称性、情境对决定的作用及跨图文重复检查。优先级按影响区分，不把审美偏好说成事实错误；不增数量配额，不为review默认整章重写 |

### 补查问题与来源

问题：B的“客户更新”是否也有需要正面比较的现有路径？检索`site:asana.com resources project status report template client`，由结果进入Asana原始帮助文档。搜索摘要只用于发现。沿用上一轮已核验的中文失败、Bannerbear、Buffer、Level实践材料，未因这一处产品能力缺口重做全章调研。

`src-asana-status-updates`：读取How to create a status update、Adding highlights、Print or delete a status update等段落。文档说明状态、摘要、下一步、项目记录、发布与打印，已发布结构可供后续更新复用。仅确认公开功能描述，未登录、未播放视频；套餐、提醒频率、权限规则和营销效果不进入本章。最初提取main只读到导航，改按页面实际正文读取后才登记证据。页面未见可确认的原始发布日期，accessed为本轮实际读取日期。

新的证据不会自动否定B：它否定的是“不必调查原生方案”的比较方式。同样，现有Asana能力不能证明工作室都采用它；邮件模板是需要向参与者核对的另一种替代，不是声称已观察到的客户行为。表格只决定有限调查先后，仍不能推出市场规模或付费需求。

### 对skill修改的行为检查与剩余问题

将新检查反用到3321d2c：原生工具对照必须包括B；只加Asana脚注而不改第三条路径、候选理由与最终调查问题，仍无法修复推导。本轮四处共同修改，故修复的是决定过程，不只是来源计数。对“熟悉工作”的解释保留：它能支持优先了解，不能支持认定产品更优。将海外对象具体化后，若需要即时陪同，六小时异步方案须先重新估算，不能继续原样套用。

这属于同一任务中的回看与修订，不是盲测或独立读者验证。新规则不能保证消除自审偏差。文章仍以小型B2B工作为主，不能据此评估消费产品、国家市场优劣或长周期企业采购；相关范围没有扩张为本章的新承诺。真实人群验证仍缺失，保持draft，不用增加更多装饰图片或成功案例掩盖它。

技术结果：

- 两个skill通过quick_validate，引用的共用流程和基线可读；未新增通用AGENTS规则或改变其他skill。
- `pnpm build`通过（15页、0错误、8条既有未引用来源提醒），`pnpm check`为0错误/警告/提示；最终标题措辞调整后再次构建通过。静态检查291个站内页面链接、310个片段链接、41个ARIA引用全部有效，无重复ID。
- ego查看1280px与390px的三路原生流程图、候选对照、最终行动记录截图，无横向溢出。通读后又修正末尾图题：既然下一步是先看旧输出，就不继续写成“先验证输入能否直接进入交付”。
- 手机键盘打开修订后的第一条反馈；成本演算预设仍为96/120分钟，重置为152/120，未修改其计算代码。新增Asana来源链接正确，集中内容说明仍为1份。本轮未重复之前已完成的全边界/无脚本测试。
- 当前提交的CI与远程预览结果记录在同一专题PR。
