---
title: 收款与交付：从选择平台到开通服务
description: 以大陆个人出售软件使用权为例，比较准入、回款与费用，完成一份路线决定，并用可复现演练检查付款、重复通知和退款后的权益。
order: 9
volatility: high
last_verified: 2026-10-09
---

把支付链接贴到网站上，只解决了买家从哪里付钱。你还要知道：这家平台是否接受自己的业务和身份，钱将通过什么路径付给本人，以及付款后用户能否顺利使用产品。这三件事如果分开处理，很容易出现按钮已经上线，回款条件或交付逻辑却仍然悬着的情况。

<span id="示例为周报工具准备收款" aria-hidden="true"></span>

这一章承接[定价与订阅](/go-global/pricing)里的教学报价：大陆个人、没有海外公司，出售浏览器中自动生成客户报告的 Web 工具；20 美元购买 30 天使用权，不自动续费，原始 CSV 不上传服务器。下面会替这个例子作一次选择，再把一笔付款接到一份有期限的权益上。真实需求和报价仍待验证；平台规则核对至 2026-10-09，本地交付演练实际执行过，没有进行真实开户、付款或到账。

![报告及导出副本、付款卡与订单、账本与到账记录分为三组，账本中的一行被单独标出核对。](../assets/build-deliver-reconcile-v4.png)

*交付、客户付款和本人到账分别核对。*

## 从交付的东西开始选路线

<span id="三条路线解决的问题不同" aria-hidden="true"></span>
<span id="第一关你到底在哪里卖什么" aria-hidden="true"></span>

先把“我做了一个网站”换成买家的说法：他买的是一段时间的软件使用权，还是你替他完成的一项工作？这会直接改变能申请的平台。Paddle 对纯人工服务、Dodo 对主要价值来自人工劳动的定制服务都有限制；把咨询或代做报告写成 SaaS，并不会使它变成自动化软件。Dodo 对部分预定义、可重复的产品化服务另有审核条件，也不能把“有人参与”一概等同于禁止。[^src-paddle-aup][^src-dodo-merchant-acceptance]

<figure class="pay-media pay-routes" aria-labelledby="pay-routes-title" aria-describedby="pay-routes-caption">
<h3 id="pay-routes-title">买家在哪里使用，买到什么</h3>
<p class="pay-root">从真实购买场景分支</p>
<ul class="pay-branches">
<li><strong>在 Web 上使用自动软件</strong><span class="pay-arrow" aria-hidden="true">↓</span><span>筛选 MoR 候选</span><small>身份、产品、本人回款三项一起核对</small></li>
<li><strong>购买定制开发或人工服务</strong><span class="pay-arrow" aria-hidden="true">↓</span><span>按服务合同重选收款安排</span><small>重新查产品类别，不能沿用软件准入</small></li>
<li><strong>在商店应用内解锁数字功能</strong><span class="pay-arrow" aria-hidden="true">↓</span><span>先核对目标店面的支付规则</span><small>地区、应用类别和外链条件会改变路线</small></li>
</ul>
<figcaption id="pay-routes-caption">图中是筛选顺序。已有符合准入的经营主体时，也可以比较普通支付处理路线；平台名称不是最终决定。</figcaption>
</figure>

我们的例子属于第一条。我会先研究代收款平台（Merchant of Record，MoR）：以 Dodo 的合同角色说明为例，它作为转售方承接付款、交易税和争议处理。这样可以减少开发者需要自己组织的交易端工作，但产品审核、交付和客户服务仍要有人负责。[^src-dodo-merchant-acceptance][^src-dodo-verification]

原生应用则要先看分发规则。Apple 的 3.1.1 与 Google Play 的支付政策都对应用内数字功能规定了支付方式，同时保留特定地区、类别或计划的例外。一个能在网页收费的方案，不能直接证明它可以原样放进所有商店应用。[^src-apple-payment-guidelines][^src-google-play-payments] 具体边界放在本章后面的[原生应用分支](#应用商店路线先按目标地区核对)，完整上架路径见[应用商店路线](/go-global/app-stores)。

## 先确认本人能够收款，再决定接哪一家

<span id="第二关把大陆个人候选缩到一家" aria-hidden="true"></span>
<span id="先确认拟定收款路线" aria-hidden="true"></span>

赫兹（droidHZ）在 2025 年 7 月的复盘中，写过一个接近这里的起点：没有海外公司和海外银行卡，因此选择了 Creem 与支付宝。他报告了审核通过和网站订阅收入，也写到了申请前的具体准备——可用的网站、完整的法律页面、支持邮箱，以及不能拿虚假证言充当产品背书。值得借鉴的是这些准备工作；文章没有展示完整的本人到账对账记录，不能据此推算所有申请者的通过率或等待时间。[^src-hertz-first-dollar]

重新核对当前文档后，Creem 的确把中国个人的出款方式写为同名支付宝，开户还包含业务资料、身份验证、出款账户与团队审核。对这个没有海外银行账户的例子，它比只写“支持中国”的名单多回答了一步：至少有一个明确列出的本人接收路径。[^src-creem-countries][^src-creem-payouts][^src-creem-payout-accounts]

这使它成为**优先询问的候选**。不过，候选比较还要把缺口写出来：

<div class="pay-comparison">

| 候选 | 本例为什么考虑它 | 什么会使我改变选择 |
|---|---|---|
| Creem | 中国个人的同名支付宝路径明确，适合先核对本例的接收安排。[^src-creem-payouts] | 本人账户、额度档位或产品未获确认；实际出款及换汇费用不合适。生成式 AI 等受限业务另有审核，不能由普通软件结论外推。[^src-creem-account-reviews] |
| Paddle | 不支持国家名单未列中国；个人不做业务主体认证步骤，但仍做 KYC。出款可选电汇或 Payoneer，支持币种含 CNY。[^src-paddle-countries][^src-paddle-business-verification][^src-paddle-identity-verification][^src-paddle-payout-schedule][^src-paddle-payout-currency] | 需要先找到真实可用的本人接收账户，接受相应周期与费用；真实结账域名也需审核。游戏产品可再研究其政策，但本例没有这个需求。[^src-paddle-domain-review][^src-paddle-aup] |
| Dodo | 国家资格依据个人证件签发国，名单含中国；产品、身份和同名银行账户均要验证。[^src-dodo-merchant-countries][^src-dodo-verification] | 还缺本人银行通道与币种的具体答复；出款另受 Monitoring Review 影响。游戏不在接受范围，不能套用到游戏项目。[^src-dodo-payouts][^src-dodo-merchant-acceptance] |

</div>

对首选也要问得同样细。Creem 文档列出的支付宝单笔上限是 5 万元人民币，年度区间为 30 万至 60 万元；区间不是对你的账户作出的固定承诺。通用本地银行收费表也不能直接当支付宝报价。**支持这一接收方式、你的账户已可用、这笔款能按预计费用到账，是不同层次的确认。**[^src-creem-payouts][^src-creem-countries]

下面这封询问信把本例缺少的条件放在了一起。替换为真实产品后，再连同可访问的演示、报价和政策页面提交；它不是已经取得的审核答复。

> I am an individual based in mainland China. I plan to sell 30-day access to a browser-based CSV reporting tool for USD 20, with no automatic renewal. Reports are generated automatically in the browser; I do not provide custom consulting or AI-generated content. I intend to receive payouts into an Alipay account in my own legal name. Could you confirm whether this product and recipient setup are supported, which documents are required, and the payout fees, currency conversion, limits and any reserve requirements that would apply to this account?

等待答复期间，可以准备测试集成和交付规则；不必并行接完三套生产系统。若产品或接收账户被明确拒绝，带着相同材料检查下一家。若只是缺资料，就补真实资料，不把更换身份或填写另一个地区当解决方法。

<details class="pay-media pay-details">
<summary>为什么没有把更多平台列入第一轮</summary>

Lemon Squeezy 与 Gumroad 的银行出款列表没有列中国大陆，两者文档另提 PayPal 路径。它们只提供了进一步检查的方向，尚不能证明某个大陆个人 PayPal 账户能完成收款、提现与后续核对。Polar 的出款依赖 Stripe Connect Express，其支持列表也未列中国大陆。因此，本例先把有限精力用在上述三家，而不是因为平台少就默认它们一定可用。[^src-ls-countries][^src-gumroad-getting-paid][^src-polar-countries]

</details>

## 一笔 20 美元订单，到底花掉多少

<span id="第三关按一笔完整交易比较费用" aria-hidden="true"></span>

基础费率适合做第一遍估算，前提是比较同一种交易。先假设买家支付的计费总额就是 20 美元，没有额外交易税，也没有启用营销、分账或其他收费功能；出款和换汇暂时单独算。按 2026-10-09 的公开费率，结果如下：

| 这笔交易的条件 | 交易处理费演算 | 本例的费用 |
|---|---|---:|
| Paddle 标准结账 | 20 × 5% + 0.50。[^src-paddle-pricing] | 1.50 美元 |
| Creem 成功交易 | 20 × 3.9% + 0.40。[^src-creem-pricing] | 1.18 美元 |
| Dodo，美国境内卡/钱包、非订阅 | 20 × 4% + 0.40。[^src-dodo-pricing] | 1.20 美元 |
| Dodo，适用非美国卡/APM 附加费、非订阅 | 20 ×（4% + 1.5%）+ 0.40。[^src-dodo-pricing] | 1.50 美元 |

这里有两个容易算错的地方。Dodo 的“非美国”条件针对卡及支付方式，不能仅按开发者住在哪里判断；它的订阅另加 0.5%，而本例卖的是一次性 30 天使用权，所以没有把这一项加进去。ACH/SEPA 借记则采用另一套费率，不能拿上表的卡交易公式覆盖。[^src-dodo-pricing]

固定费用对小额产品尤其明显。同样按 Paddle 公式，10 美元的一笔交易收 1 美元，占 10%；100 美元的一笔收 5.50 美元，占 5.5%。这可以帮助你判断小额多次收费的代价，但不能据此擅自改变买家需要的交付范围。[^src-paddle-pricing]

再往下看一层：**20 美元售价也未必等于 20 美元计费总额。** Creem 的官方示例使用 20 美元商品价，加上 4 美元交易税，买家共付 24 美元；平台费按 24 美元计算，四舍五入约为 1.33 美元，扣除交易税与平台费后为 18.67 美元。这里的 4 美元只是该示例的税额，不能当作所有国家适用的税率，18.67 美元也还不是本人账户到账或净利润。[^src-creem-payouts]

退款会进一步改变这张账。Creem 说明原交易处理费不退，退款从后续出款中扣除；拒付还可能产生每笔 25 USD/EUR 的费用。Dodo 的公开表列出每笔退款 1 美元、拒付 30 美元，部分争议预防服务另收费。平台代为处理流程，仍然需要商家为损失和服务成本留出空间。[^src-creem-chargebacks][^src-dodo-pricing]

因此，这个例子不会为了 Creem 与 Dodo 基础费相差的 0.02 美元立刻选平台。我会先确认本人路径，再把典型买家的支付方式、退款情形和每期出款额算进去。Paddle 的出款与换汇有独立收费条件，Creem 也把出款和换汇另列；到账章节会继续演算这部分。[^src-paddle-payout-fees][^src-paddle-payout-currency][^src-creem-payouts] 得到首批真实结算单后，用它核对估算，比反复比较首页上的最低费率更有用。

## 审核的是你的生意，也包括你怎样对待买家

支付接入前就值得把演示、报价、交付范围、退款方式和支持入口放在一起检查。Creem 的审核要求这些页面可见、产品可用，并明确禁止虚假证言；它还要求及时回应买家，文档写明三工作日内未回应时可能介入退款。Paddle 要审查真实发起结账的域名或子域名，sandbox 的免审条件不能代替上线审核。[^src-creem-account-reviews][^src-paddle-domain-review]

赫兹复盘中的域名支持邮箱与完整政策页面，正好对应这种准备。但照抄别人通过审核的首页，不会解释你的产品实际上怎样交付。[^src-hertz-first-dollar] 对本例，审核材料应能连续回答：买家输入什么，输出在哪里生成，20 美元覆盖哪 30 天，不能完成任务时怎样求助或退款。客服承诺也要和[定价章估算的支持时间](/go-global/pricing)相符。

同时要分清平台审核与自身经营安排。MoR 处理销售环节的税务，不会替你决定自己取得的所得属于哪一类；中国个税实施条例仍按所得来源、类别等作区分。[^src-dodo-merchant-acceptance][^src-tax-iit-implementation] 把产品说明、合同主体与拟定结算方式交给[身份与主体](/go-global/entity)和[税务](/go-global/tax)章节继续核对，不能把“平台允许个人申请”读成已经完成全部登记与申报判断。

## 付款确认之后，服务才能知道该给谁什么

<span id="选定后先做最小闭环" aria-hidden="true"></span>
<span id="将付款接到真实交付" aria-hidden="true"></span>

Creem 的快速开始支持创建产品和分享支付链接，也明确建议生产应用通过服务端 webhook 可靠接收付款事件。教程中的成功页只能说明浏览器走到了那个地址；它不负责证明这笔钱已经支付，更不会替你定义一个账号到底获得什么权益。[^src-creem-quickstart]

本例采用一条容易检查的业务规则：**一笔被确认的订单，为服务端绑定的用户开通一次 30 天使用权；重复事件不延长期限，全额退款后这笔订单不再提供使用权。** 期限从已核实的付款时间计算，不能因为通知迟到而从收到通知当天重新送 30 天。这是本例选择的交付规则，不是平台为所有产品规定的答案。

<figure class="pay-media pay-flow" aria-labelledby="pay-flow-title" aria-describedby="pay-flow-caption">
<h3 id="pay-flow-title">一个事件怎样改变使用权</h3>
<ol class="pay-flow-list">
<li><strong>先建立订单绑定</strong><span>用户、商品、金额、币种和环境由服务端确定</span></li>
<li><strong>接收付款或退款事件</strong><span>按原始请求体验签，再读取事件</span><aside>签名不符 → 拒绝；不修改权益</aside></li>
<li><strong>核对业务对象</strong><span>查订单与预期商品、金额，确认环境和状态</span><aside>未知或矛盾 → 待核对；不猜测归属</aside></li>
<li><strong>一起保存事件和订单变化</strong><span>事件去重，订单也去重；记录独立退款</span><aside>重复投递 → 确认已处理；不重复开通</aside></li>
<li><strong>从订单事实计算权益</strong><span>已付款、未全额退款，并且尚未到期</span></li>
</ol>
<p class="pay-sidepath"><strong>浏览器成功页 → 查询服务端结果。</strong>确认中就保留确认中；刷新这个页面不产生新权益。</p>
<figcaption id="pay-flow-caption">这是本例的处理契约。原始验签与重投依据平台文档；用户绑定、事务保存和按订单计算权益需要产品自己实现。</figcaption>
</figure>

Creem 的 webhook 文档说明事件可能重复投递，并提供基于原始请求体的签名校验。接入时优先用官方 SDK 处理平台协议，再把核实后的事实交给自己的业务逻辑。[^src-creem-webhooks] 订单与用户的绑定不能来自成功页随手传入的用户编号；同一订单即使以不同事件编号重投，也仍然只买过一次。

退款还有一个细节值得停下来检查：Creem 的 `refund.created` 示例中，退款及关联交易已经处于退款状态，嵌套订单仍可能显示 `paid`。如果程序只看到这个单词就重新开通服务，退款后的用户又会获得权限。[^src-creem-webhooks] 把付款与退款分别留下，再共同算出当前状态，比用“最后收到的一个事件覆盖一切”更容易追查。

### 自己换一下事件顺序

下面使用合成订单 `demo-001`，服务端预先将它绑定给用户 A，金额为 20 美元。模型观察时间固定为 2026-10-25；示例付款时间是 10 月 9 日，30 天期限在 11 月 8 日同一时刻结束。按钮代表已经核实、转换好的业务事件，浏览器互动不演示真正的 webhook 验签。

<section class="pay-media pay-replay" data-payment-replay aria-labelledby="pay-replay-title">
<p class="pay-kicker">本地合成示例 · 不连接支付平台</p>
<h3 id="pay-replay-title">重复的付款，不应变成多一次开通</h3>
<fieldset disabled data-pay-controls>
<legend>按不同顺序投递事件</legend>
<div class="pay-buttons">
<button type="button" data-pay-action="paid">收到付款</button>
<button type="button" data-pay-action="retry">重复投递</button>
<button type="button" data-pay-action="refund">全额退款</button>
<button type="button" data-pay-action="late">旧付款重投</button>
</div>
</fieldset>
<dl class="pay-state">
<div><dt>用户 A 当前权益</dt><dd data-pay-access>未开通</dd></div>
<div><dt>用户 B 当前权益</dt><dd>未开通</dd></div>
<div><dt>这笔订单开通过几次</dt><dd><span data-pay-grants>0</span> 次</dd></div>
<div><dt>订单累计退款</dt><dd><span data-pay-refunded>0.00</span> 美元</dd></div>
<div class="pay-expiry"><dt>这笔订单的到期时间（UTC）</dt><dd data-pay-expiry>尚无付款记录</dd></div>
</dl>
<p class="pay-result" data-pay-result role="status" aria-live="polite">只有成功页，没有服务端付款确认，仍未开通。</p>
<button type="button" data-pay-reset hidden>重置，再试另一种顺序</button>
<p class="pay-caption">先点“收到付款 → 重复投递 → 全额退款 → 旧付款重投”，再重置，试试先退款、后付款。全额退款都应保留，旧通知不能把权限重新打开。</p>
<noscript><p>当前未运行脚本，按钮不可用。静态结果：付款后开通 1 次，到期日为 11 月 8 日；重复通知不延期，全额退款后重投旧付款仍不恢复。</p></noscript>
</section>

我们为这一章实际运行了一份独立的本地脚本：原始请求体只多一个空格，原签名就不再通过；同一事件和同一订单分别重投，开通次数保持为 1；保存再读回状态后仍能去重；全额退款先到、付款后到时，连短暂开通都没有发生。脚本还检查了错误商品、环境、金额和未知订单，及旧订单退款不会取消另一笔有效通行证。

<a href="/go-global/payment-delivery-drill.mjs" download="payment-delivery-drill.mjs">下载支付交付演练脚本</a>，保存后使用 Node.js 22 或更新版本运行：

```sh
node payment-delivery-drill.mjs
```

脚本只在本机生成临时合成记录，输出每一步状态与 `passed: true`，不需要账户或密钥，不发起外部请求、邮件或付款。它验证了本例顺序处理时的 HMAC 和权益逻辑，**没有验证真实平台联调、数据库并发事务或生产回调网络**。生产实现仍需把事件收件记录与订单修改放在可保证一致性的持久化事务里；否则两个同时到达的通知，可能都看到“尚未处理”。

<details class="pay-media pay-details">
<summary>这份演练还保留了哪些边界</summary>

- 部分退款按本例规则保留剩余使用期，重复的同一退款不重复累计；金额累计至全额时关闭该订单权益。它不是平台统一的退款权益政策，实际产品应与公示承诺一致。
- 到期时刻已经到达，就没有有效使用权；已经过期的旧付款迟到，只补历史记录，不重新开 30 天。
- 零金额不能一概当作伪造。Creem 审核流程可能进行 100% 折扣的检查购买；演练中有服务端事先批准的零额审核订单，允许相应访问，但不会记成 20 美元收入。任意把普通订单金额改成零仍会被拒绝。[^src-creem-account-reviews]
- 订单绑定在演练开始前已经存在；未知订单不会凭通知里的用户字段自动创建。真实集成需要再查平台订单及本地结账记录，不能把这个前提省略。

</details>

## 真正上线前，再接上平台和故障恢复

本地演练通过后，再用真实账号的测试环境跑一遍创建结账、付款失败、成功通知、退款及重发。Creem 的测试与生产产品、API 地址、密钥和 webhook 分开配置；不要只换一把密钥就认为上线准备完成。Dodo 的测试不转移真实资金，但仍可能向填写的地址发送真实邮件，测试应使用自己控制的邮箱。[^src-creem-test-mode][^src-dodo-test-live]

客户付了钱却没有开通时，按下面顺序定位，避免让他反复付款：

| 查到的证据 | 下一步处理 |
|---|---|
| 平台没有确认付款 | 保留未付款状态，解释当前结果，让买家按实际情况重试 |
| 平台确认付款，投递记录却失败 | 检查回调地址、网络和拦截，再重发事件 |
| 事件已到，签名或订单绑定不符 | 核对环境、原始请求体、商品与本地订单；修复前不猜测开通对象 |
| 事件已经可靠保存，用户仍不能使用 | 查询该订单的退款、期限及权限读取路径，修复应用侧状态 |

Creem 特别提醒 WAF 或机器人防护可能拦住服务端回调，并提供后台重发功能。若需放行，应针对回调路径处理，同时保留签名验证。[^src-creem-webhooks] 每次补处理都应能回到一笔订单和一个原因，而不是凭付款截图把账号改成永久会员。

平台替换也要留出这条追查路径。Muneeb Awan 在 2024 年的 PostNitro 复盘中，报告因费用、结算和订阅处理等问题，从 Lemon Squeezy 转向 Paddle；他的做法是让新客户进入新平台，老客户仍留原平台。于是“换掉支付”之后，两边的旧订单与订阅仍需维护。那篇文章对新平台的观察只有约一周，不能证明后者长期更可靠，却把迁移成本写得很具体。[^src-postnitro-payment-migration]

这也解释了为什么一开始就值得保存平台订单编号、内部用户、商品和退款记录的对应关系。它不仅用于第一次开通，也让客服能找到漏单，让迁移时的旧客户仍能得到原来承诺的服务。

<details class="pay-media pay-details">
<summary>已有经营主体，或准备原生应用时，怎样改走另一条路</summary>

### 什么情况下再研究 Stripe 直连

截至 2026-10-09，Stripe 支付服务开通地区正文列表包含香港，未列中国大陆；页面底部的语言与地区选择器不是开户资格。已有真实、符合支持地区要求的经营安排时，才继续核对这条路线。[^src-stripe-global]

普通支付处理加上 Stripe Tax，也需要明确注册、计算收取、申报缴纳分别由谁完成。Stripe 提供自身及合作方工具，实际开通了哪些服务、覆盖哪些地区，仍须逐项核对。[^src-stripe-tax-how] 本例不为接入一个 SDK 就先注册海外公司；主体的设立与持续维护代价见[身份与主体](/go-global/entity)。

Stripe 的 `Managed Payments` 是另一款产品，有独立审核与资格要求；当前亚太支持业务所在地为澳大利亚、日本、新加坡和香港，不能因为品牌相同，就把它与普通支付准入混用。[^src-stripe-mp-eligibility]

### 应用商店路线，先按目标地区核对

Apple 的 3.1.1 要求相关应用内数字功能使用 IAP；3.1.1(a) 与 3.1.3 又区分美国店面、部分地区授权和应用类别。Google Play 第 3、8、9 节也保留不同例外，符合地区条件的替代结算或外部引导须按相应计划及额外要求办理。[^src-apple-payment-guidelines][^src-google-play-payments]

开始接入前，写清数字商品、上架店面、购买入口和对应条款。例如“在网页已有订阅，只登录使用”和“在应用里放按钮引导购买”，是两个需要分别核对的流程。不要拿某个店面的许可去推断全部地区，也不要用统一抽成数字替代具体计划。开发者账户资格与完整发布过程见[应用商店路线](/go-global/app-stores)。

</details>

这个例子的下一步已经具体了：把产品说明和同名支付宝安排交给 Creem 确认，同时将演练中的订单规则接入自己的测试环境。若审核或费用答复不适合，就用相同条件回到候选表重新比较。获得真实准入答复、完成平台测试与经营准备后，沿[提现与结汇](/go-global/payouts)把平台余额、出款和本人入账对起来，再回到产品里观察买家是否真正完成了工作。
