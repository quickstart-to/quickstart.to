---
title: 提现与结汇：把平台余额对到本人到账
description: 从出款条件和真实开发者经历出发，用完整双币种算例核对扣费、换汇与到账，处理延迟、补材料和未解释差额。
order: 12
volatility: high
last_verified: 2026-10-09
---

第一笔订单出现时，最容易把后台余额当成已经赚到手的钱。等真正准备提现，才发现还有可用余额、出款审核、处理窗口和接收账户；钱到了，金额又未必和后台相同。每一段都能解释一部分差别，却没有哪一张截图能替整条链作证明。

Yeekal 在 2026 年 2 月的个人复盘里，就补上了早期接入文章没有走完的一步：网站陆续有了余额，第一次直接提到支付宝却因材料审核而失败，后来才改用另一家机构中转。他报告中转后收到了款，但这不是支付宝直达成功，也不能证明同样账户条件对别人适用。原文含推荐链接，具体账户资格及用途填写建议不作为本章路线依据。[^src-yeekal-payout-retrospective]

这个过程提醒我们：**能让客户付款、能申请出款、能让自己的账户接收，是三次不同的确认。** 首次跑通之前，别把未来的可用现金安排在一个尚未验证的通道上。

本章接着[收款与交付](/go-global/payments)，帮助大陆个人把一次回款从平台对到本人账户。平台及法规资料核验至 2026-10-09；文中的美元、人民币明细是合成对账练习，没有真实开户、出款或结汇记录。读完应能整理出一份回款档案，并知道缺哪项证据、下一次该向谁问什么。

## 先画出自己的资金路径

先写清楚五件事：客户用什么币种付、平台用什么币种记余额、经哪种方式出款、由谁的哪个账户接收、最终以什么币种入账。中间增加一个机构，就多了一段需要确认的资格、费用和交易记录，不能把终点相同的两条路当成同一条。

对我们假设的大陆个人周报工具，Creem 文档列出的个人路径是本人支付宝，受益人姓名须与身份验证一致；企业路径另为本地银行账户。添加账户也不等于走完审核，且每家店有独立设置，出款发送至默认账户。[^src-creem-payouts][^src-creem-payout-accounts]

因此，接入前要问的不是笼统的“支持中国吗”，而是“以我的身份销售这项产品，这个同名账户是否接受该类款项、通过哪条通道、以什么币种入账”。保留业务描述、对方答复和对应日期。如果接收方要求的材料无法提供，应先解决这条路能否成立，而不是把收入改称储蓄、赠与或其他与事实不符的用途。

<dl class="po-options">
<div>
<dt>Creem → 本人支付宝</dt>
<dd>

**文档路径**：中国个人使用支付宝；账户姓名与验证身份匹配。[^src-creem-payouts]

</dd>
<dd>

**向接收方确认**：业务材料、实际额度档位、支付宝通道费用、换汇方式及接收步骤。

</dd>
</div>
<div>
<dt>Paddle → 本人接收账户</dt>
<dd>

**文档路径**：提供电汇或 Payoneer；出款币种列表含 CNY。[^src-paddle-payout-schedule][^src-paddle-payout-currency]

</dd>
<dd>

**向接收方确认**：目标账户是否接受该类业务款，实际转账方式、入账币种及费用。

</dd>
</div>
<div>
<dt>Dodo → 本人同名账户</dt>
<dd>

**文档路径**：账户须属于已验证个人或对应实体；可用通道因国家和账户而异。[^src-dodo-payouts]

</dd>
<dd>

**向接收方确认**：该账户能否接收并持有所选币种，是否会被银行换汇，有哪些接收费用。

</dd>
</div>
</dl>

“支持 CNY”解决了平台可选币种的问题，尚未回答某个个人账户能否接收这项收入；“已绑定”也没有回答接收机构会要求什么材料。把这些答案落实到自己的业务，才有一条能执行的资金路径。

## 余额在哪个阶段，决定下一步做什么

下面是查款顺序，名称用来组织证据，不要求各平台后台完全一致。

<figure class="po-media" aria-labelledby="po-path-title" aria-describedby="po-path-caption">
<h3 id="po-path-title">先找到钱停在哪一段</h3>
<ol class="po-path">
<li><strong>客户付款</strong><span>订单与交付记录</span> <small>先核对退款、交易税和交易费</small></li>
<li><strong>等待可用</strong><span>待结算、保留款或审核</span> <small>查释放时间与待补材料</small></li>
<li><strong>进入出款</strong><span>可用额、申请和窗口</span> <small>确认本期是否已经排入</small></li>
<li><strong>平台发送</strong><span>金额、币种、编号与目标账户</span> <small>用发送凭证查询转账</small></li>
<li><strong>本人入账</strong><span>接收明细与换汇凭证</span> <small>逐项解释金额和时间差</small></li>
</ol>
<figcaption id="po-path-caption">沿箭头查到最后一项已有证据，再追下一段。只有订单或平台余额时，尚不能跳到“本人入账”。</figcaption>
</figure>

例如，Creem 说明款项可能保留 7–12 日用于风险评估；Dodo 将收款启用与出款启用分开，后者还涉及银行验证、适用的企业验证及 `Monitoring Review`。即使后台能接真实付款，也可能仍没有出款资格。[^src-creem-payouts][^src-dodo-payouts]

再往后看，Dodo 的 `Success` 表示已发送到银行，`Initiated` 和 `In Progress` 尚未发出；Paddle 的 `sent` 说明处也提醒资金仍处于处理末段，并另发出款发票。用平台标签判断下一步，但以本人账户的实际记录确认入账。[^src-dodo-payouts][^src-paddle-payout-schedule]

## 把门槛、申请动作与出款日放在一起看

客户付款日不是预计到账日。你至少需要记下余额何时满足条件、申请何时提交、平台何时发出、本人何时入账。下面三个平台的差别，主要就在中间两项。

<details class="po-details" open>
<summary>Creem：余额可用以后，还要申请并进入窗口</summary>

最低可用余额为 50 USD/EUR；点击 `withdraw` 才加入下一可用的每月 1 日或 15 日窗口，周末或公共假日可能顺延。风险评估期内的金额还不能按累计销售额全部提取。[^src-creem-payouts]

更改账户时尤其别随手取消申请。文档允许在预定出款日之前且处理尚未开始时取消，但取消会跳过当前周期，不能撤销或在同一周期重新申请，即使换了账户也一样。先核对默认账户和页面所列日期，再决定是否取消。[^src-creem-payouts]

</details>

<details class="po-details">
<summary>Paddle：按月处理，不能随时提取余额</summary>

每月 1 日依据余额和门槛进入出款处理，15 日前发送；最低门槛为 100 美元，对应 GBP/EUR 余额则为 100 英镑/欧元。未满足条件的余额结转。官方估计实际发出后还可能需要最多 3 个工作日到达，取决于接收方式；不要把 15 日直接写成自己的到账日。[^src-paddle-payout-schedule]

</details>

<details class="po-details">
<summary>Dodo：出款须启用，再看合并余额和本期日期</summary>

默认最低门槛 100 美元，可设为不低于 50 美元；判断的是 USD、GBP、EUR 钱包折算后的合并余额。默认半月周期，上半月对应当月 18 日发起，下半月对应次月 4 日；周末及美国联储银行假日顺延。日期是发起日，接收时间另取决于银行和通道。[^src-dodo-payouts]

账户曾经可以出款，也可能因待补信息或复核再次暂停。先查验证区的未完成事项。如果只是调整频率，文档称后台只能改向更低频率，之后不能直接改回当前或更高频率；别为了试一试就改掉设置。[^src-dodo-payouts]

</details>

## 用一张表解释到账差额

PostNitro 创始人 Muneeb Awan 在 2024 年复盘里报告过出款被推到下月、上月退款出现在新一期结算等经历。文章在[收款章](/go-global/payments)用于解释迁移选择，在这里更值得留意的是跨期：只拿“本月卖了多少”去对“本月到账多少”，很难看清差别来自哪里。该复盘是作者当时的报告，不是当前平台故障率的证据。[^src-postnitro-payment-migration]

<span id="从一笔教学订单看净额与到账" aria-hidden="true"></span>

单笔订单的交易费演算见[收款与交付](/go-global/payments#一笔-20-美元订单到底花掉多少)。这里改看一期结算：一笔出款可以汇总多笔订单，也可能带入以前的余额。Dodo 的明细还用 `Unattributed Balance` 表示与账目合计的衔接：正数可能带入前期余额，负数可能留给以后出款，不能见到这个名字就当作一笔新费用。[^src-dodo-payouts]

以下是**独立的合成账单**，不是对上一章三笔订单的继续累加，也不是某平台实际收费。假设每个项目都有对应记录，金额均为 USD，保留款在这份从交易总额开始的演算中只扣一次。

| 本期结算记录 | USD |
|---|---:|
| 期初可结算余额：前期未出款 | +40.00 |
| 本期客户支付总额：扣减前 | +500.00 |
| 结算明细中的交易税，非个人所得税 | −30.00 |
| 本期交易费用汇总 | −25.00 |
| 本期记入的退款扣减 | −45.00 |
| 暂未释放的保留款：留到后期 | −100.00 |
| **本期拟出款额** | **340.00** |
| 平台发送前扣除的出款费用 | −7.00 |
| **平台实际发送** | **333.00** |

前半段为 `40 + 500 − 30 − 25 − 45 − 100 = 340`；再减去本例的出款费 7，才是发送凭证上的 333。

这张表的起点很重要。若你拿到的已经是可用余额，就不能再机械扣一遍保留款。Dodo 明确说明，保留款不是费用，已排除在 `Available` 和 `Incoming` 外；释放时再进入余额。实际释放后要在对应期间接上那一笔变化，而不是悄悄改掉上期的金额。[^src-dodo-payouts]

费用也有同样的问题。Paddle 说明适用的电汇费在出款发票生成之前扣除，发票金额就是发送金额。若从那张发票起算，不能再减一次相同电汇费。每次填表前，先给金额注明“扣费前”还是“扣费后”。[^src-paddle-payout-fees]

### 换成了人民币，差额还缺哪张凭证？

沿着示例，平台发出 333.00 USD，接收路径另扣 3.00 USD，剩余 330.00 USD 被兑换。假设银行明细确认使用 7.2000 CNY/USD，兑换结果应为 2376.00 CNY，而入账记录只有 2361.00 CNY。现在还有 **15.00 CNY 未解释**。

这时不能直接把 15 元填成“汇率损失”：我们已经用了该笔实际记录的汇率，差别可能还要查本地收费、金额口径或单据是否对应同一笔。只有接收明细确实另列 15.00 CNY 的费用，才把它计入；若汇率本身未知，连这 15 元的差额也还不能确定。

<section class="po-media" data-payout-demo aria-labelledby="po-demo-title">
<p class="po-kicker">对账练习 · 全部为合成数据</p>
<h3 id="po-demo-title">换一份起始单据，再补一项证据</h3>
<p>同一笔钱从不同位置起算，结果应一致。切换的是示例中已取得的凭证，不是让你调整数字把账凑平。</p>
<fieldset disabled>
<legend>选择核对材料</legend>
<label for="po-start">起始单据 <select id="po-start" data-payout-start><option value="before">费用前 · 340.00 USD</option> <option value="sent">费用后 · 333.00 USD</option></select></label>
<label for="po-evidence">接收明细 <select id="po-evidence" data-payout-evidence><option value="unknown">汇率未取得</option> <option value="rate" selected>仅汇率已确认</option> <option value="complete">汇率与本地费用均确认</option></select></label>
</fieldset>
<div class="po-result" aria-live="polite" aria-atomic="true"><p>入账记录：<strong>2361.00 CNY</strong></p><p data-payout-result>仍有 15.00 CNY 未解释。先取得收费明细，不把差额直接归为汇率损失。</p></div>
<button type="button" data-payout-reset hidden>恢复示例</button>
<ol class="po-reconcile">
<li><span>起点金额</span> <strong data-payout-start-amount>340.00 USD</strong> <small data-payout-platform-fee>减已列明的平台费用 7.00 USD → 发送 333.00 USD</small></li>
<li><span>发送后、兑换前</span> <strong>330.00 USD</strong> <small>333.00 USD − 已列明的接收费用 3.00 USD</small></li>
<li><span>根据已知凭证可解释的入账</span> <strong data-payout-expected>2376.00 CNY</strong> <small data-payout-conversion>330.00 USD × 7.2000；本地收费明细尚未取得</small></li>
</ol>
<noscript><p>当前展示“费用前单据＋已知汇率”的完整结果。关闭脚本时仍可沿上面的算式核对；若凭证再确认本地费用 15.00 CNY，2376.00 − 15.00 = 2361.00 CNY，金额即可对齐。</p></noscript>
</section>

金额对齐以后，还要核对交易编号、结算期间和账户。刚好相同的金额不能证明两张单据属于同一笔。把原订单和退款汇总、结算单、发送凭证、换汇明细及最终入账记录用同一个出款编号关联保存；银行用途说明与补材料往来放在同一份私密档案中。

## 交易费之外，还要算出款与换汇

等你能解释一笔钱，再比较怎样出款更合适。需要的是这条具体路径的完整报价，而不只是平台首页的交易费。

- **Paddle**：出款币种与银行所在国币种不匹配、使用 SWIFT 时，列有 15 USD/EUR/GBP 电汇费；出款币种不同于余额币种时，汇兑差最多 1.5%。后续银行或中转机构还可能收费。不能把 15 美元套到所有 CNY 出款。[^src-paddle-payout-fees][^src-paddle-payout-currency]
- **Creem**：银行转账费用为 7 USD/EUR 与出款金额的 1% 取高，换币种时合作方可能另收费。账户文档将这项费用列在 `Bank Transfer` 下，未为中国个人支付宝单独给出完整最终报价；询问时要明确支付宝路径，不能拿银行费用代填。[^src-creem-payouts][^src-creem-payout-accounts]
- **Dodo**：标准定价下，低于 1000 美元的出款列 5 美元费用，非美国商户的 USD SWIFT 另列 25 美元，非美元结算涉及换汇；接收机构还可能扣费。具体路径是否涉及两项平台费用，应取得对应报价再计算。[^src-dodo-pricing][^src-dodo-payouts]

只为看固定费用的影响，假设一条**确实适用 Creem 上述银行费率**的 USD 路径：四次各提 250 美元，平台出款费合计为 4 × 7 = 28 美元；同样 1000 美元合为一次，费用为 10 美元，相差 18 美元。这个算式不含交易费、汇兑和接收费，也不是支付宝报价。[^src-creem-payouts]

18 美元是否值得等待，要看资金用途。若等最后一笔凑齐会妨碍下周的必要支出，省费就不能成为唯一理由；如果收款路径已经走通、近期也不用这笔钱，才有条件比较较低频率。首次回款的重点是验证真实接收和完整账单，之后再根据金额与用款时间调整。未到账的余额始终单独记录。

## 收汇、结汇与申报，分别确认

一个是款项进入接收路径，一个是外币兑换成人民币，一个是按适用规则报送信息；它们可能在同次业务里衔接，却不是同一个问题。尤其不要用“金额没超过某个数”同时回答账户资格、真实性材料和税务处理。

<span id="年度5万美元不是境外收入上限" aria-hidden="true"></span>

### 年度 5 万美元不是境外收入上限

《个人外汇管理办法实施细则》第二条将个人结汇和境内个人购汇的年度总额分别规定为每人每年等值 5 万美元，同时给出超过年度总额的办理路径。它不是“每年最多从境外赚取或收到 5 万美元”。第八条区分经营性与非经营性外汇收支；第十条针对境内个人非经营性结汇超过总额的材料，不能因为其中出现“特许收入”，就把所有 SaaS 收入自动归进去。[^src-safe-individual-fx-rules]

另外，Creem 当前文档列中国个人支付宝单笔最多 50000 CNY、每年 300000–600000 CNY，具体档位仍需确认。这是该通道限制，不能替代上述外汇规则，也不能假定自己天然适用最高档。[^src-creem-payouts]

准备材料时，可以先写一份真实业务说明，再请接收机构判断。下面沿用周报工具的**询问样稿**，尚未发送；实际使用时要替换为已经成立的业务事实，而不是直接提交教学设定：

> 我是在中国大陆以个人身份提供 Web 工具的开发者，产品在浏览器中将项目 CSV 整理成客户报告。当前拟定的交付为 20 美元购买 30 天使用权，不自动续费，由所选 MoR 按商户协议结算。接收账户拟为本人同名账户。
>
> 我可以提供实际签订的平台协议、产品与交付说明、订单和退款明细、平台结算及出款凭证。请确认：该账户和通道能否接受这一业务款项？应按哪一业务类别办理，需哪些真实性材料？最终币种、换汇机构、全部费用及限额是什么？涉及超年度总额或国际收支申报时，分别由谁通知、如何办理？若当前账户不适用，应使用哪一种与真实经营身份匹配的账户或路径？

对方要求合同，就提供已成立的协议及真实交易资料；自行整理的业务说明应标明是说明，不能把它写成从未签订的双方合同。

### 国际收支申报中的“免填”，有明确范围

本轮对照了外汇局截至 2026 年 6 月 30 日的有效法规目录及 9 月 30 日修订征求意见通知。后者反馈截止 10 月 30 日，属于征求意见，不能当作新细则已经施行。这里仍按汇发〔2022〕22 号附件解释，办理前应查看最终发布及生效安排。[^src-safe-effective-rules-2026][^src-safe-bop-consultation-2026]

该附件第八条针对通过银行进行的申报，允许居民个人单笔等值 1 万美元以下（含）的涉外收付款免填凭证中的**申报信息**；银行仍要报送基础信息，个人仍需配合。需要申报的涉外收入，第十二条规定在解付或结汇日后五个工作日内办理。它不等于免真实性审核，也不替税务规则作判断；支付机构路径应另确认适用方式，不能直接套银行条款。[^src-safe-bop-rules-2022]

### 境外付款不自动决定个税所得来源

《个人所得税法实施条例》第三条按劳务提供地、权利使用地等判断境内所得，不以支付地点单独决定；第六条另分所得类别。本章的现金对账不能替代这两项判断。用同一套真实合同、业务和结算资料继续核对[税务](/go-global/tax)中的类别、计税金额、折算与申报时间，不把本人到账净额直接当作应税收入。[^src-tax-iit-implementation]

## 钱没到，按停留阶段排查

“还没收到”是现象。发给支持人员之前，先把它变成一个可以定位的问题。

<figure class="po-media" aria-labelledby="po-trace-title">
<h3 id="po-trace-title">先分流，再询问</h3>
<div class="po-trace"><p class="po-trace-root">这笔回款尚未核对完成</p><ul><li><strong>还没有发送凭证</strong><span>平台端：余额是否可用 → 出款是否启用 → 申请和窗口是否满足。</span></li><li><strong>已经发送，尚未入账</strong><span>接收端：按当时目标账户查款 → 查待处理、补材料或退回 → 找不到再请平台追踪。</span></li><li><strong>已经入账，但金额不符</strong><span>金额端：确认同一笔 → 分清各币种与扣费前后 → 列出尚缺的收费或换汇凭证。</span></li></ul></div>
<figcaption>先确定证据停在哪一段，可以避免平台和接收机构分别只回答自己那半段。</figcaption>
</figure>

Dodo 对已显示 `Success` 却未收到的款项，建议先确认发送时的账户，再带金额、币种和日期请银行追踪，银行找不到时再联系平台。近期切换账户尤其要查旧账户：已经处理的出款仍会发往更改前的账户。若状态明确为 `Failed`，文档说明出款额与出款费将以对应冲回项目回到余额，要核对冲回记录，再修正原因。[^src-dodo-payouts]

再看另一种结局：这笔 333.00 USD **尚未入账**，假设已经核对发送时的账户，接收机构也按凭证查款但未找到。下面是这一情形的邮件样稿，编号为虚构。实际发送时附上真实发送日期和查询记录，使用官方支持入口，账户和身份材料不要公开发布。

<div class="po-letter" lang="en">
<p><strong>Subject: Trace request for payout DEMO-001 — USD 333.00</strong></p>
<p>The payout record shows USD 333.00 sent to my verified receiving account. I have attached the payout statement with the actual sending date and the destination account’s last four digits.</p>
<p>I checked the account that was active when this payout was processed, including my previous account. My receiving institution could not locate the transfer using the amount, currency and sending date; its case reference is DEMO-BANK-01.</p>
<p>Please confirm the destination and transfer rail, and provide the transfer reference or bank trace document available for this rail. Has the payment been held, returned or sent for additional review? If further documents are required, please specify them and the secure submission channel.</p>
</div>

这份样稿先告诉对方已经查到哪里，再请求发送路径、追踪凭证和下一步。若银行尚未查询，就删掉那段已经查询的陈述，先向银行提交发送凭证；若收到补材料通知，就依据实际通知列明欠缺项目和截止时间，而不是照抄别人遇到的期限。

## 接下来怎么用

先完成自己那一条资金路径的确认，再为首次真实回款建档。档案里应能找出这期订单与扣减如何得到拟出款额，哪份凭证证明发送，哪份记录证明换汇与入账；尚未解释的差额和待回复问题也保留下来。

如果障碍来自个人账户或经营身份，接着读[身份与主体](/go-global/entity)；如果钱已对齐但不知如何确定收入和申报口径，接着读[税务](/go-global/tax)。回款是产品经营的一环，确认这条路能支撑日常服务后，仍要回到用户使用、支持成本和下一轮投入上。
