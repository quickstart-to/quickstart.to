---
title: 团队采购与合同交付：把试用意向变成可承担的合作
description: 从使用者、预算与采购责任出发，比较自助购买、有限试点和定制项目，完成试点范围、合同讨论稿、验收与交接，避免承诺超出交付能力。
order: 15
volatility: high
last_verified: 2026-10-10
slug: team-procurement
---

一位用户试完产品，说想让整个团队都用。你发去报价，对方却开始问：能不能签他们的合同，能不能先开票后付款，数据在哪里，出了问题谁负责？几封邮件之后，原本很轻巧的一单，变成了采购表、安全问卷和一串尚未实现的功能。

这时候，继续演示功能未必能推动事情。你需要弄清楚，对方到底想买一件现成工具、一段有人协助的试用，还是把一项业务交给你负责。三种合作都可能成立，但需要的时间、价格和承诺很不一样。

本章从已经出现的团队意向往下走。我们会把一次合作拆到能讨论的程度：哪些人要参与，试点证明什么，哪些条件齐备才能启动，交付之后怎样验收、收尾或继续采购。把这些事情说清楚，才能判断这项合作是否适合现在的你。

## 使用者愿意推荐，还需要谁点头

Patrick McKenzie 在一篇原始经营分享里，讲过自己独自在日本经营 Appointment Reminder、与一家医院沟通的经历。医院向多家供应商询问需求，其他公司的回复偏向通用产品材料；他逐项解释需求为什么重要，电话中答不清的问题也没有硬答，而是在会后补充书面说明，方便联系人转给内部同事。按他的叙述，这些材料和内部推荐帮助他赢下了订单。[^src-patio-enterprise-sales]

故事的另一半更值得个人开发者看：他估计，这一单在六个月里用了约 25 小时处理文书沟通，还有十余个开头相似、却没有推进到深入电话阶段的机会。他没有公开这单的真实金额，文章里代用的数字不能拿来计算回报。[^src-patio-enterprise-sales]

能借鉴的，是**让对方有材料在内部推进**。一次只让你和使用者兴奋的演示，未必能回答预算负责人、安全审核者和财务各自的问题。把他们需要的东西提前问出来，也能更早发现这单不适合你。

PostHog 的采购指南从买方角度提醒读者：先查公司是否已有类似工具，再明确谁有权批准、试用要解决什么、合同由谁处理。它是一家软件公司的经验分析，不是所有企业的统一流程；其中有用的视角是，客户也在为内部协作付出成本。[^src-posthog-buying-software]

<figure class="team-media team-roles" aria-labelledby="team-roles-title">
<h3 id="team-roles-title">同一份周报，四种需要回答的问题</h3>
<div class="team-role-center"><strong>愿意推进的内部联系人</strong><span>把使用结果和采购问题带到同一张桌上</span></div>
<ul>
<li><strong>实际操作者</strong><span>我能独立做完吗？原来的步骤少了哪些？</span></li>
<li><strong>预算与业务负责人</strong><span>为什么值得买？谁来确认交付达到要求？</span></li>
<li><strong>技术、安全与法务</strong><span>接触哪些数据？系统能做什么？责任怎样约定？</span></li>
<li><strong>采购与应付账款</strong><span>向谁采购？材料、订单号、账单和付款怎样衔接？</span></li>
</ul>
<figcaption>这是角色示意，不是人数要求。小工作室里，同一个人可能负责几项；大型组织也可能把一项拆给多人。联系人愿意转发材料，不代表他可以代所有人批准。</figcaption>
</figure>

第一次谈团队合作，可以从对方最近买过的一件相似工具问起：当时谁试用、谁批准、供应商交了什么材料，最后怎样付款。接着约定本次由谁负责组织试用、谁认定结果、下一次何时一起看结果。比起询问“你们有预算吗”，这更容易得到可行动的答复。

如果对方目前只是收集选项，给公开演示、现成报价和一页能力说明就够了。有人安排实际操作者、愿意提供合适的样本，也能说清后续决策过程，再考虑预留专门交付时间。暂时没有决策人，并不证明需求是假的；只是还不足以让你承诺一个需要投入多天的项目。

## 先决定卖的是工具，还是连工作一起接过来

团队购买并不天然需要定制。几位同事各自使用现成产品，和多人在一个共享空间里处理客户资料，是两件事。集中账单也不等于已经具备共享权限、离职回收和审计能力。

<div class="team-table team-routes">

| 合作方式 | 本次要证明什么 | 你承担什么，何时换路线 |
|---|---|---|
| 现成工具的自助购买 | 操作者能按公开说明独立完成任务 | 标准能力与支持即可；需要多人协调或专门配置时，单靠免费账号可能不够 |
| 有范围的协助试点 | 在约定环境里，几位操作者能否稳定用起来 | 安排样本核对、培训、问题修复和验收；付费与否取决于双方投入及采购条件，不由“企业客户”四个字决定 |
| 定制或实施项目 | 新功能、接入或代办工作能否按约交付 | 先拆工作、依赖与责任，再定里程碑和价格；需要你长期替客户操作，就要按服务业务重新算账 |

</div>

不能把最后一类永远理解为客户“要求太多”。张浩然（SaaS 张大伦）在 2022 年复盘住客云时写到，团队原本坚持订阅软件模式，后来发现有些酒店客户愿意付钱，却希望供应商直接派人把业务做起来。客户原有人员体系里，并没有执行这套工作的人。作者不愿转向代运营，因而错过了一些订单，后来转向另一项业务。[^src-zhang-saas-delivery]

这是国内住宿业的一段经历，不能外推海外客户都需要代运营。它提出的问题却很具体：**客户缺一件工具，还是缺一个做这件事的人？** 如果缺的是人，再完整的功能演示也不会填上岗位空缺。你可以选择提供服务，也可以选择另一类客户；两种选择都比把服务工作悄悄塞进软件订阅里更清楚。

关于试点怎么组织，经验材料的侧重点也不同。Heavybit 在 2020 年整理 Mitch Morando 的建议时，主张用付费试点确认投入意愿，并提前处理长期合同；PostHog 当前的试用手册则把清晰目标、客户投入和商务并行放在重点位置。它们都有销售和支持背景，不能直接变成个人开发者的收费门槛或周期标准。[^src-heavybit-paid-pilot][^src-posthog-running-trials]

这里的建议是：现成产品可以自助验证，就先让它自助验证；确实需要你投入配置、培训和验收，再讨论有限的协助费用。付费会增加采购步骤，未必更快；免费会让你承担时间成本，也未必更容易成交。选择取决于这次究竟要验证什么，以及双方是否愿意投入必要的工作。

## 把一次试点缩到能做完

下面另设一个**教学案例**。一家使用英语的网站设计工作室，希望让两位项目负责人统一生成客户周报，第三位负责人组织试点并确认结果。开发者仍在中国大陆远程服务；不预设客户所在国家，也没有真实客户或签约。产品继续在浏览器本地处理 CSV，不上传报告、不接 AI、不保存云端历史。

改变的是合作形式：这次拟提供三位指定操作者的有限使用权，加一次模板适配、培训和验收，独立报价为 **600 美元、14 个日历日，不自动延长**。它不是前面个人版 20 美元报价的升级承诺，更没有新增团队工作区。真实经营登记、签约与结算身份要按[主体章](/go-global/entity)确认，并取得买方接受；这里不假定已经过审。

工作室原来用共享表格加手工模板。继续原流程几乎不用迁移，也能完成任务；试点的理由只能是尝试减少重复整理、降低漏项，而不是“现在有一个新工具”。若客户现有软件已经能稳定生成同样结果，就先用原方案，不为试点而试点。

<section class="team-media team-brief" aria-labelledby="team-brief-title">
<h3 id="team-brief-title">讨论稿 P-01：两轮周报试点</h3>
<p class="team-caption">所有金额、时间和工作量为教学设定。这里写完整业务范围；尚未完成签约主体、适用规则和正式合同确认。</p>
<dl>
<div><dt>任务与参与者</dt><dd>两位项目负责人各自完成两轮周报，第三位负责人协调并确认验收。客户负责提供可合法使用、符合字段约定的样本及人工核对值，安排实际操作者参加。</dd></div>
<div><dt>交付物</dt><dd>三位指定操作者在试点期的独立使用权；一套字段映射与报告模板；一次 45 分钟英语远程培训及书面操作说明；两轮问题记录、一次复测和最终交接记录。项目判断仍由操作者填写。</dd></div>
<div><dt>环境与数据</dt><dd>客户指定的桌面浏览器及版本须在启动前登记并完成样本检查。报告文件在浏览器本地处理；账号、账单与支持记录另行列出。支持只收合成或经过授权处理的复现样本，不默认接收客户原始表格。</dd></div>
<div><dt>排期与依赖</dt><dd>合同、必要采购批准、首笔款项、合适样本和人员安排齐备后，双方书面确认 Day 1；第 1–3 天核对与培训，第 4 天与第 11 天各做一轮任务，其间处理问题，第 12–14 天复测、验收讨论及交接。客户资料延误就重新确认日期，不默默延长。</dd></div>
<div><dt>三项交付标准</dt><dd>T1：两轮输出的项目、日期与工时和人工核对值一致；T2：两位负责人都能在培训后独立导出，遇错能按说明恢复；T3：必填工时缺失时明确报错，不把缺值当成 0 后生成完整报告。记录版本、输入、输出、操作者和复测结果。</dd></div>
<div><dt>商业观察</dt><dd>另记原流程与新流程的完整用时，包括准备、检查和返工。是否值得继续采购由客户据此判断；本次不保证节省某个百分比，也不以演示速度替代验收。</dd></div>
<div><dt>反馈与补救</dt><dd>拟约定客户收到验收包后 3 个工作日内确认或指出具体差异；因产品问题未通过时，开发者在 5 个工作日内提供一次修复并安排复测，必要时只为复测延长使用权。复测仍未达标，任一方可书面结束本次试点，退回已付 300 美元并免除未付尾款。客户未提供材料或未回复时先记录阻碍、协商排期，不视为自动验收，也不无限延期。工作日及假期按双方列明的服务日历确定。</dd></div>
<div><dt>费用与结束</dt><dd>拟议服务费 600 美元：启动前 300 美元，客户书面确认三项验收后 300 美元，尾款账单发出后 10 个日历日内支付。到期不自动转长期合作。税费、扣缴、跨境支付费用承担及最终应付额须在签署前按真实双方确认。</dd></div>
</dl>
</section>

这个范围仍然有成本。示例为售前与采购沟通留 4 小时，配置与核对 3 小时，培训准备及会议 2 小时，支持 2 小时，复测和交接 3 小时，总共 14 小时。按每小时 25 美元估值，再预留 50 美元直接支出，600 美元还剩 200 美元，未扣实际税费与额外法律支出。多做 8 小时免费定制，就会把这点余量用完；等尾款的时间还会影响现金安排。如果产品无法达到三项标准，按本例提出的退款安排，收入归零而约 400 美元的时间和直接支出仍已投入；临时增加的补救工作还会继续增加成本。接这单之前要能承担这个结果，而不能只看成功交付后的 200 美元。这些是讨论预算，不是市场定价结论。

本例选择有限试点，是因为它能利用现成能力，最多协调三个人，还保留客户原有模板作后备。若新增共享云端历史、单点登录或客户系统接入，14 小时就不再是可信预算。需要重新研究架构、数据和维护工作，另报实施范围；即使对方愿意加钱，也不宜先承诺日期再想办法。

## 采购与交付，两条线一起走

PostHog 的试用手册明确把采购流程、法律要求和价格讨论放在技术验证同时推进，遇到客户没有时间投入时也允许暂停。这个安排值得借鉴：等试用结束才问谁能签字，可能让双方前面的投入都悬在那里。[^src-posthog-running-trials]

<figure class="team-media team-flow" aria-labelledby="team-flow-title">
<h3 id="team-flow-title">从意向到合作，怎样避免走到最后才卡住</h3>
<div class="team-flow-start"><strong>有具体任务，也有人愿意组织评估</strong><span>先确认现成工具能做什么、客户原来怎样做</span></div>
<div class="team-flow-lanes">
<div><h4>使用与交付线</h4><ol><li>操作者、样本、环境与验收标准</li><li>范围和责任确定后，安排有限试点</li><li>逐项记录结果，失败项修复后复测</li></ol></div>
<div><h4>采购与责任线</h4><ol><li>主体、预算路径、数据与安全条件</li><li>确认合同、付款条件及启动批准</li><li>核对验收人、账单和后续采购决定</li></ol></div>
</div>
<div class="team-flow-gate"><strong>汇合：能交付，也能按约合作吗？</strong><span>技术结果、客户验收、正式采购分别留记录</span></div>
<div class="team-flow-outcomes"><div><strong>条件齐备 → 交接或另签后续范围</strong><span>写清期限、支持、费用和责任人</span></div><div><strong>仍有卡点 → 回到对应一条线</strong><span>修复后复测；缺预算就暂停；新增需求重新定范围</span></div></div>
<figcaption>两线可以并行，但本例在必要批准与合同落实前只使用公开演示和合成材料，不开始真实数据接入或有偿实施。试点成功也不会自动产生下一期订单。</figcaption>
</figure>

对大陆个人开发者，先问清买方能否接受你的真实经营和签约身份、需要怎样的供应商登记材料，以及能否沿实际收款路径支付。不要先猜必须成立哪国公司，也不要拿别人的主体或账户补空栏。把买方明确提出的要求带回[身份与主体](/go-global/entity)、[收款](/go-global/payments)和[税务](/go-global/tax)核对。

然后让对方说明报价、采购订单、账单与付款分别由谁处理。采购订单（PO）若是其流程的一部分，记录编号、金额、对应范围、账单接收人和付款条件；本例不把收到一个 PO 编号当成已收到钱，也不凭邮件里一句 “approved” 判断所有合同问题已经解决。Patrick 的经历也区分了采购、产品交付和应付账款这几个步骤。[^src-patio-enterprise-sales]

一次答复可以写成下面这样，附上 P-01 范围讨论稿，让内部联系人转给相关同事。它是一封询问信，还不是开工通知。

<details class="team-media team-letter">
<summary>展开完整英语询问信：请对方确认采购路径</summary>
<div lang="en">
<p><strong>Subject: Confirming the pilot scope and purchasing steps</strong></p>
<p>Thanks for discussing the reporting workflow with us. The attached P-01 draft covers a 14-calendar-day pilot for three named operators, with two reporting cycles and the three acceptance checks listed in the scope.</p>
<p>Before we reserve a start date, could you introduce the people responsible for accepting the deliverables and approving the purchase? Please also confirm the contracting entity, supplier onboarding requirements, whether a purchase order is required, the billing contact, and the proposed payment method.</p>
<p>The proposed service fee is USD 600, split into USD 300 before kickoff and USD 300 after written acceptance, payable within 10 calendar days of the balance invoice. Tax treatment, withholding and transfer fees still need to be agreed before signature. If your purchasing rules require different terms, please let us know before we start.</p>
<p>CSV reports stay in the operator’s browser in this proposed workflow. The pilot does not include shared cloud storage, SSO, custom integrations or round-the-clock support. We can provide a data-flow and capability statement for your review.</p>
<p>Once the scope, contract, required approvals, initial payment, sample inputs and participants are ready, we can agree Day 1 in writing. The pilot will not automatically renew or convert to an annual contract.</p>
</div>
</details>

如果客户只能接受交付后付款，可以协商更小的付费里程碑、降低前期投入，或在预算允许时承担明确的账期风险；不接受也可以结束洽谈。价格降一点不一定能解决付款条件，更不能解决对方不接受供应商身份的问题。

## 合同要把口头答应的事落到实际能力上

P-01 解决的是业务范围，正式签署前还要把它放进双方认可的合同安排里。可以用主协议约定基础权利义务，用订单或工作说明书（Statement of Work，SOW）写本次交付；简单合作也可能合并成一份文件。名称不是重点，同一项承诺在报价、订单、附件和邮件里是否一致，才决定你有没有把问题说清。

最容易遗漏的通常是下面几组连接。表中的写法是本例的谈判起点，不是适用于所有国家的合同条款。

<div class="team-table team-contract">

| 要连接的事情 | 本例要说清什么 |
|---|---|
| 功能与验收 | 交付版本、环境、T1–T3、验收人和反馈窗口一起写；未通过项的修复与复测另列。新增功能不悄悄成为原验收条件，也不默认沉默就是通过 |
| 付款与结束 | 首尾款各自触发条件、账单材料和到账核对；若无法在约定补救窗口完成，按双方事先约定的终止及退款办法收尾，不能只写“可随时取消” |
| 既有产品与客户成果 | 列明哪些是已有程序、哪些是客户提供的素材、哪些是本次制作的模板或输出；逐项约定使用、修改、交付和后续维护范围，不把一次配置默认为全部源码转让 |
| 服务与故障 | 服务窗口、联络方式、初次响应与解决问题分别写；可用性承诺若被要求，继续明确测量、排除项与救济，不凭主机服务商的指标替自己的整个产品担保 |
| 责任与争议 | 让审阅者核对责任范围、赔偿、责任限制及其例外、适用法律、争议处理、文件优先顺序；不能凭本例的 600 美元自行推定责任必然止于 600 美元 |

</div>

本例可以承诺的支持，是一个明确的异步窗口。例如：周一至周五 **09:00–12:00 UTC**，列明暂停服务的假期；在两个服务窗口内首次响应，随后给出诊断、临时办法或下一次更新时间。这里的“响应”是确认并开始处理，不等于所有问题两天内解决。客户如果需要周末实时处理关键事故，而你无法轮值，就需要调整服务安排或拒绝该范围。

采购表里的 “Yes / No” 也要按实际状态填写。没有单点登录，就写目前不提供；没有相应审计报告，就不要把云厂商的材料当成自己的报告。可以附上已有措施的证据和待补项，让客户决定能否接受。路线图上的计划应单列，不能写成当前已经交付。

数据责任尤其不能用一句“都在本地”带过：报告没有上传，不代表账号、账单、支持邮件里没有个人信息。先画出实际字段、接收方、处理地区、访问方式与删除安排，再判断各方角色。若 GDPR 适用且构成代表控制者处理个人数据，其第 28 条规定了相应合同内容，包括书面指令、保密、安全、再委托、协助义务、结束后的返还或删除等；涉及第三国传输时还要核对第五章，签一份数据处理协议（DPA）不能自动完成跨境判断。[^src-eurlex-gdpr-processing]

中国《个人信息保护法》第二十一条也规定了委托处理的约定、监督、返还或删除以及转委托条件。具体适用要按真实数据路径判断，不能因为买方是海外企业就跳过。[^src-cn-pipl] 完整数据准备见[合规章](/go-global/compliance)，这里不另造一份万能 DPA。

如果合同审阅需要外部帮助，提交的应是 P-01、双方真实身份与地区、全部合同及附件、数据流、供应商清单、付款路径，以及你无法承担的条款。具体请审阅者回答：当前身份能否承接这项工作；哪些条款与实际能力冲突；责任、数据和争议安排应怎样修改；修改完成前能做哪一步。只问“这个合同安全吗”，很难得到可执行的答案。

## 验收看记录，别让新愿望改写旧约定

假设第一轮试点出现三条记录：完整输入的工时对得上；第二位操作者仍需开发者接手才能导出；工时缺失的行被当成了 0。第一条成功不能抹掉后两条。与其写“整体效果不错，继续优化”，不如明确是操作说明不足、产品缺陷，还是原范围之外的新要求。

<div class="team-table team-records">

| 记录及核对材料 | 首次检查 · pilot-r1 | 修复后复测 · pilot-r2 |
|---|---|---|
| T1 · 每位操作者的两轮结果 | North 第一轮 3 + 2 = 5 小时；第二轮 4 + 1.5 = 5.5 小时，两位操作者共 4 份完整输入报告与人工值相符 | 固定这组输入重跑，项目、日期与工时仍一致 |
| T2 · 谁实际完成导出 | A 独立完成；B 由开发者接手，不能记为独立完成 | 两人各自按修订说明完成；记录谁操作、使用的说明版本及输出 |
| T3 · 第二行工时留空 | 把缺值算为 0，仍导出一份 3 小时的“完整”报告，未达约定 | 指明第二行缺值并阻止完整导出；补入 2 后才得到 5 小时 |

</div>

这是一组模拟验收材料，版本名也是设定，并非本书运行产品的缺陷记录。实际合作要附上对应样本与输出；只有“已修复”三个字，还不能复查修好了什么。

下面的验收台把技术记录、客户确认和后续采购分开。先填入右列复测结果，再看看另外两项会不会跟着出现。

<section class="team-media team-demo" data-team-demo aria-labelledby="team-demo-title">
<h3 id="team-demo-title">验收台：通过三项检查，就能算成交吗？</h3>
<p class="team-caption">教学记录；不连接真实产品、合同或付款。默认展示第一次检查，技术结果、客户验收与后续采购独立记录。</p>
<form>
<fieldset disabled data-team-fields>
<legend>改变记录，观察下一步</legend>
<label for="team-total">T1 · 两轮输出与人工核对值</label>
<select id="team-total" name="total"><option value="pass" selected>已核对一致</option><option value="fail">有差异，待修复</option><option value="unknown">尚未完成核对</option></select>
<label for="team-independent">T2 · 两位操作者能否独立完成</label>
<select id="team-independent" name="independent"><option value="fail" selected>至少一人需要开发者接手</option><option value="pass">两人都完成独立复测</option><option value="unknown">只有培训，没有复测记录</option></select>
<label for="team-missing">T3 · 必填工时缺失时</label>
<select id="team-missing" name="missing"><option value="fail" selected>被当成 0，仍能完整导出</option><option value="pass">明确报错，修复后才能完整导出</option><option value="unknown">尚未测试异常输入</option></select>
<label class="team-checkbox"><input type="checkbox" name="accepted"> 客户指定验收人已书面确认本次范围</label>
<label for="team-order">后续正式合作的采购状态</label>
<select id="team-order" name="order"><option value="unfunded" selected>预算尚未落实</option><option value="review">预算已有安排，仍在采购审阅</option><option value="ready">订单已签，约定开通条件已满足</option></select>
<div class="team-demo-actions"><button type="button" data-team-retest>填入技术复测通过的示例</button><button type="reset">恢复首次检查</button></div>
</fieldset>
</form>
<div class="team-demo-result" aria-live="polite" aria-atomic="true">
<p><strong data-team-count>技术记录：1 / 3 项通过</strong></p>
<p data-team-technical>T2、T3 未通过。先修复或补齐记录；不要用总体满意代替逐项结果。</p>
<p data-team-acceptance>客户验收：尚未确认。本例的尾款验收条件尚未满足。</p>
<p data-team-commercial>后续采购：预算尚未落实。试点到期按约收尾，不继续无期限免费服务。</p>
</div>
<noscript><p>未启用脚本时，上方保留首次检查结果。即使复测达到 3 / 3，也仍要取得客户确认；后续采购还要另看预算、订单和开通条件。</p></noscript>
</section>

设想修订操作说明、修复缺值处理后，两位负责人在约定环境里独立完成了复测，三项都有记录。这时可以提交验收包：P-01 版本、两轮输入与人工期望值、交付版本、结果文件、问题和复测记录，以及请指定验收人确认的结论。教学推演到这里，只能写“可以申请确认”；实际是否接受，仍要等对方按约回复。

若对方这时提出“最好再加一个 Salesforce 接入”，先问它是否是原任务不可缺的条件。如果之前已经承诺却漏做，它属于缺陷或漏项；如果确实是新范围，就把所需权限、数据、开发与维护、日期及费用另列成变更。客户如果因此不愿继续合作，那也是一个真实的商业决定，不需要靠无限赠送把它掩盖过去。

<aside class="team-media team-change" aria-labelledby="team-change-title">
<h3 id="team-change-title">变更记录 CR-01：自动拉取客户系统数据</h3>
<p><strong>请求：</strong>从客户系统自动取数，取代人工准备 CSV。<strong>与原范围的差异：</strong>新增凭据、接口权限、数据处理及持续兼容工作，原试点没有这些能力。</p>
<p><strong>本次决定：</strong>先完成或关闭 P-01，不把接入列为免费补丁。客户提供目标系统、字段、权限与负责人后，另做可行性评估；尚不承诺价格与日期。若自动接入是必需条件，暂停后续推广。</p>
<p lang="en">The integration changes the agreed data flow and maintenance scope. We can assess it separately once the system, required fields and access owner are confirmed. It is not included in P-01, and we have not committed to a delivery date.</p>
</aside>

失败也需要一种明确的结束方式。产品缺陷按已约定的补救窗口处理并复测；客户没有安排操作者，就记录未完成、重新约期或结束；需求已经改变，就重新定范围。不要把这些原因统一写成“再试两周”，否则下一次结束时仍没有判断依据。

## 最后一份交接，决定合作会不会一直拖着

技术通过、客户确认、尾款应付、尾款到账，是不同记录。后续订购又是另一项决定。交接时把它们分别写出来，就能避免“客户说不错”被记成收入，或“已经付款”被当成所有任务都完成。

<section class="team-media team-handover" aria-labelledby="team-handover-title">
<h3 id="team-handover-title">P-01 收尾样稿：结果有了，长期合作还没有</h3>
<p class="team-caption">以下是前述复测情境的完整交接示例，不代表真实执行。</p>
<ul>
<li><strong>交付：</strong>模板、操作说明、版本与两轮结果归入同一交接目录；报告保留在客户本地，由客户确认已取得文件。开发者不声称可以从云端补回不存在的报告历史。</li>
<li><strong>验收：</strong>T1–T3 复测通过，材料已备齐；指定验收人的书面确认待取得。按本例约定，尚未触发 300 美元尾款的验收条件。</li>
<li><strong>使用与支持：</strong>三位操作者的生成权限及本次支持在约定试点末日结束；客户已导出的报告继续由其持有。如进入 P-01 拟议补救流程，书面记录复测窗口与必要的权限延长；复测仍失败，按约退款并免尾款。</li>
<li><strong>未完成事项：</strong>CR-01 自动接入未报价、未承诺；后续合作预算未落实；不自动开通下一期，也不把待签文件写成订单。</li>
<li><strong>接着做什么：</strong>由内部联系人安排一次验收反馈，明确通过、需补救或有争议的项。若继续合作，另行确定使用期、操作者、支持与费用；若结束，按数据清单处理支持材料及必要业务记录，留下处理结果。</li>
</ul>
</section>

如果验收人迟迟不回复，按合同约定的反馈与争议路径跟进，附上原标准和证据，而不是自行宣布通过。若后续预算没有落实，让试点按约结束也很正常：客户可以回到原模板，你也能把投入和原因记入[经营复盘](/go-global/business-review)。对于个人开发者，知道何时把一个机会放下，和知道怎样把订单谈成一样，是可持续交付的一部分。

## 来源与更新

本章于 **2026-10-10** 阅读所引原始经历、采购实践与法律原文。Patrick 和张浩然的叙述用于理解各自情境中的行动与代价；PostHog 和 Heavybit 的材料提供有立场的实践建议，不构成统一采购规则。合同和数据条文的个案适用仍取决于真实双方、地区与业务。

P-01、CR-01、预算和验收台是独立教学示例，未开展真实试点、签约或交易。
