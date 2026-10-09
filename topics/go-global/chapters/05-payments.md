---
title: 收款方案全景
description: 区分MoR、Stripe直连与应用商店，按主体、产品、回款和总成本选择第一条收款路线。
order: 5
volatility: high
last_verified: 2026-10-08
---

如果你在中国大陆、尚无海外公司，准备出售 Web 软件，先筛选能接受真实身份、产品和本人收款账户的代收款平台（Merchant of Record，MoR）。Paddle、Creem、Dodo 的公开文档提供了进入申请核对的依据，但不保证个案审核或到账。[^src-paddle-countries][^src-paddle-business-verification][^src-creem-countries][^src-creem-payouts][^src-dodo-merchant-countries][^src-dodo-verification]

选择顺序是：**销售场景 → 主体与产品准入 → 本人回款路径 → 总成本 → 接入方式。** 市场与用户验证见[快速入门](/go-global)；本章负责收款准备，到账条件和对账方法见[提现与结汇](/go-global/payouts)。

> 本章依据截至 **2026-10-08** 核验的官方公开文档，未进行真实开户、收费或到账测试。以下比较用于决定先核对哪条路线；应用商店开户、各地税务和具体账户资格仍需按你的情况确认。

## 三条路线，解决的问题不同

| 路线 | 关键关系与责任 | 适合先研究的场景 |
|---|---|---|
| MoR | 以 Dodo 为例，平台作为转售方处理付款、交易税及拒付（Chargeback）等事务，开发者仍须通过身份和产品审核。[^src-dodo-merchant-acceptance][^src-dodo-verification] | 先在 Web 上卖一件软件，希望由平台承接交易端事务，且产品与回款路径符合政策 |
| Stripe 普通支付处理，加按需配置的工具 | Stripe Tax 文档仍要求识别征税义务、注册、计算收取、申报缴纳，并提供自身及合作方工具协助这些步骤。接入支付或税额计算，不代表这些工作已全部完成。[^src-stripe-tax-how] | 已有符合准入的经营安排，并能明确由谁负责税务、退款、客户支持与财务核对 |
| App Store / Google Play | 商店分发的应用内数字功能受各自支付政策约束；两家均有按地区或类别划分的例外条件。[^src-apple-payment-guidelines][^src-google-play-payments] | 产品的使用、销售和分发主要发生在原生应用内，需先核对商店规则 |

不要仅按品牌分类。Stripe 还有独立的 `Managed Payments` 产品；其资格文档将亚太支持的业务所在地列为澳大利亚、香港、日本和新加坡，未列中国大陆。这个产品的准入条件不能与普通 Stripe 支付混用，也不能因为它属于 Stripe 就默认大陆个人可开通。[^src-stripe-mp-eligibility]

MoR 帮你处理的交易端税费，也不能直接代替对自己所得的判断。例如中国个税规则分别定义所得类别和来源，不能因为境外平台已经处理销售环节就跳过自己的收入确认。[^src-dodo-merchant-acceptance][^src-tax-iit-implementation]

## 第一关：你到底在哪里卖什么

先写出“用户在哪付款、在哪消费、买到什么”。三个例子会导向不同的核对任务：

- **Web 报表工具：** 用户在网站订阅，登录后使用自动化功能。先核对 MoR 的软件类别、订阅与回款条件。
- **为客户定制开发：** 用户买的是你持续投入的人工服务。不能仅因交付一个网站，就把业务填写为自动化 SaaS；Paddle 和 Dodo 的政策对纯人工服务或以人工劳动为主要价值的服务设有限制。[^src-paddle-aup][^src-dodo-merchant-acceptance]
- **手机应用内解锁高级功能：** 先检查商店支付政策和目标店面适用条件，再决定是否以及如何使用网站收款。Apple 和 Google 的政策都不能由一条“网站已经能收费”替代。[^src-apple-payment-guidelines][^src-google-play-payments]

同为软件也未必同样适用：Paddle 的政策涉及软件及游戏，Dodo 的不支持类别包含游戏；生成式 AI 在 Creem、Dodo 文档中另有审核或限制。按真实功能查政策，不要只用“SaaS”“AI工具”两个标签做判断。[^src-paddle-aup][^src-dodo-merchant-acceptance][^src-creem-account-reviews]

## 第二关：把大陆个人候选缩到一家

以下表格区分“为什么列为候选”和“还有什么没有确认”。国家名单只是其中一项证据。

| 候选 | 已确认的官方表述 | 在你的申请中仍要确认 |
|---|---|---|
| Paddle | 不支持国家名单未列中国；个人免业务主体认证步骤，但仍须身份验证（KYC）；出款方式含电汇、Payoneer，币种含CNY。[^src-paddle-countries][^src-paddle-business-verification][^src-paddle-identity-verification][^src-paddle-payout-schedule][^src-paddle-payout-currency] | 产品与域名审核、实际身份证明要求，以及平台到你本人账户的通道 |
| Creem | 支持国家列有中国；中国个人出款路径明确为同名支付宝；开户还包括KYC/KYB和账户审核。[^src-creem-countries][^src-creem-payouts][^src-creem-payout-accounts] | 本人支付宝适用性、限额档位、实际收费，以及产品是否落入受限类别 |
| Dodo | 个人国家资格依据证件签发国，列表包含中国；需要产品、身份和本人银行账户验证。[^src-dodo-merchant-countries][^src-dodo-verification] | 银行通道与币种、产品审核、出款所需Monitoring Review是否完成。[^src-dodo-payouts][^src-dodo-verification] |

可以把选择写成一句话：“我先申请［平台］，因为［产品政策适用］，拟用［本人账户］回款，仍待确认［具体事项］。”如果最后一项没有答复，先保留待确认状态，不为它投入完整的生产支付集成。

其他平台也要沿同样顺序核对。Lemon Squeezy 与 Gumroad 的银行出款列表未列中国，文档另提 PayPal 路径；这只能作为进一步核对的线索，不能据此保证你的大陆个人 PayPal 账户能完成全程。Polar 的官方支持国家列表未列中国大陆，本章也不把它列入当前主线。[^src-ls-countries][^src-gumroad-getting-paid][^src-polar-countries]

## 第三关：按一笔完整交易比较费用

先统一比较口径。下面的费率与附加项来自2026-10-08核验的官方页面，试算仅使用基础费率，不包含交易税、出款、换汇、银行收费或其他付费功能。[^src-paddle-pricing][^src-creem-pricing][^src-dodo-pricing]

| 平台 | 基础交易费用 | 需要另查的项目 |
|---|---|---|
| Paddle | 5% + 0.50美元 / 每笔结账交易。[^src-paddle-pricing] | 出款通道与换汇费用。[^src-paddle-payout-fees][^src-paddle-payout-currency] |
| Creem | 3.9% + 0.40美元 / 每笔成功交易。[^src-creem-pricing] | 分账、联盟营销、弃购召回等功能费用，以及出款和换汇；官方示例按含交易税的订单总额计平台费。[^src-creem-payouts] |
| Dodo | 4% + 0.40美元 / 每笔交易。[^src-dodo-pricing] | 美国以外的卡及替代支付方式另加1.5%，订阅另加0.5%；出款另有收费条件。[^src-dodo-pricing] |

**基础费率演算，金额单位均为美元：** 假设用于计费的交易金额分别为10、20、100美元，且不触发附加项。每格按“交易金额 × 比例 + 固定费”计算，不是最终到账报价。[^src-paddle-pricing][^src-creem-pricing][^src-dodo-pricing]

| 计费交易金额 | Paddle | Creem | Dodo |
|---:|---:|---:|---:|
| 10.00 | 1.00 | 0.79 | 0.80 |
| 20.00 | 1.50 | 1.18 | 1.20 |
| 100.00 | 5.50 | 4.30 | 4.40 |

以20美元一笔为例，Creem 与 Dodo 的基础交易费只差0.02美元；如果该笔 Dodo 交易同时适用美国以外的卡/APM附加费和订阅附加费，则按公开公式演算为 `20 × (4% + 1.5% + 0.5%) + 0.40 = 1.60美元`。这里的“美国以外”修饰卡和支付方式，不应误读为只按开发者所在地判断。[^src-creem-pricing][^src-dodo-pricing]

固定费也会抬高小额订单的费率占比：按 Paddle 的基础公式，10美元订单的1美元费用占10%，100美元订单的5.5美元费用占5.5%。这是同一公式在不同金额下的结果，不等于应该为了支付费随意改变产品承诺。[^src-paddle-pricing]

实际比较时，为自己的典型订单填上六项：

1. 客户所在市场与预计使用的支付方式。
2. 一次性或订阅，以及实际计费总额。
3. 基础交易费、适用附加费和使用的额外功能。
4. 退款、拒付发生后，所选平台适用的费用与资金处理条款。
5. 每期预计可出款额、门槛与频率。
6. 出款、换汇及接收机构收费。

前几笔真实结算出来后，用结算单替换估算值。回款环节的公开费用、计算例子和对账表见[提现与结汇](/go-global/payouts)。

## 什么情况下再研究 Stripe 直连

先检查经营所在地与准入，不要先写支付代码。截至2026-10-08，Stripe 的支付服务开通地区正文列表包含香港，未列中国大陆；页面底部语言/地区选择器中的“中国内地”不是支付开户资格。[^src-stripe-global]

如果你已经有真实、符合所选地区要求的经营安排，或者业务发展需要重新评估主体与收款，可以再做直连路线的尽调。此时要给每一项责任指定执行人，而不只比较交易手续费：

- 谁判断增值税（VAT）/ 销售税（Sales Tax）的义务、办理必要注册并持续复核。
- 谁配置产品税务信息、客户信息和税额计算。
- 谁申报缴纳、保存记录并核对平台数据。
- 谁处理退款、争议和客户支持。

Stripe Tax 将税务流程拆为识别义务、注册、计算收取、申报缴纳，并提供自身及合作方工具。你可以使用这些工具，但仍要确认自己实际开通了哪些服务、覆盖哪些地区、还有哪些步骤未完成。[^src-stripe-tax-how]

本章不把注册海外公司作为支付接入的默认前置动作，也未核验不同主体形式的设立成本、持续申报和税务后果。若确实需要调整经营主体，应把这些事项与支付需求一起评估。

设立步骤与持续维护的核对方法见[身份与主体](/go-global/entity)；个人所得及国内税务的判断顺序见[税务](/go-global/tax)。

## 应用商店路线，先按目标地区核对

对于应用内数字功能，Apple 的3.1.1条款要求使用应用内购买（IAP）；同时3.1.1(a)、3.1.3列有按美国店面、特定地区授权、应用类别等区分的规则。不能将其缩成“全球一律禁止网站外链”，也不能将某个地区的例外照搬到全部店面。[^src-apple-payment-guidelines]

Google Play 的支付政策同样要求，Play分发应用的相关应用内数字功能交易使用Play结算，除非第3、8、9节等适用；符合国家/地区条件的替代结算和应用外引导，须按适用计划、额外条款和要求办理。[^src-google-play-payments]

准备原生应用时，先完成一页核对表：

| 要回答的问题 | 记录内容 |
|---|---|
| 卖什么 | 数字功能、内容、订阅，还是其他交付 |
| 通过哪里分发 | App Store、Google Play及计划上架的国家/地区 |
| 购买入口在哪里 | 应用内结账、外链、已有订阅登录等具体流程 |
| 依据哪条规则 | 条款编号、适用地区、是否需要加入计划或取得授权 |
| 还有什么待查 | 开发者身份与收款资格、所选计划费用、退款与订阅管理要求 |

本章只建立路线边界，没有验证商店个人账号开户、完整费率和大陆账户回款。因此这里不提供统一抽成数字，也不把应用商店描述为已经走通的备用收款渠道。

## 选定后，先做最小闭环

通过路线筛选后，只接一个产品和一种收费方式，测试成功、失败、重复通知和取消后的权益状态。以 Creem 为例，官方提供支付链接；生产交付应由服务端接收并验证 webhook，重复事件要幂等处理，不能只依据成功跳转页发放权益。[^src-creem-quickstart][^src-creem-webhooks]

测试与真实交易也要分开。Creem 的测试和生产密钥、产品及webhook需分别配置；Dodo 的测试不转移真实资金，但测试邮件仍会真实发送。使用自己控制的测试邮箱，不把测试订单写成收入。[^src-creem-test-mode][^src-dodo-test-live]

完成选择后应有四份结果：**所选路线、准入与收款答复、典型订单成本表、支付到交付的测试记录。** 在经营与交付准备完成后再进行真实销售，并用[提现与结汇](/go-global/payouts)核对实际到账。回到[快速入门](/go-global)时，继续检查用户是否完成任务和再次使用。

平台规则的后续变动会记入[专题变更记录](/go-global/changelog)；本页末尾列出本次比较使用的官方来源。

## 示例：为周报工具准备收款

以下承接快速入门的教学产品：CSV在浏览器生成报告，20美元购买30天使用权、不自动续费。案例中的市场需求和报价仍待验证；本节平台资料于2026-10-09重新核对，不代表本章所有平台已再次核验，也没有实际开户或交易。

![开发工具、把报告交付给客户、核对收款与账本的三个连续工作场景。](../assets/build-deliver-reconcile-v1.png)

*交付、客户付款和本人到账分别核对。*

### 先确认拟定收款路线

赫兹（droidHZ）在 2025 年的中文复盘中解释，他没有海外公司和海外银行卡，因此选择了支持支付宝的 Creem，并报告了网站订阅收入。这是一个处境接近本书读者的案例；文章没有完整展示从订单到本人到账的对账证据，所以不能据此宣称这条路线已经由本书实测。文章中的其他平台准入概括，也不直接沿用。[^src-hertz-first-dollar]

截至2026-10-09，Creem 的官方出款说明列出“中国个人 → 支付宝”，要求收款身份与 KYC 一致；开户流程包含业务信息、身份验证、收款账户设置与团队审核。这个组合足以支持“优先核对这条路线”，还不足以支持“每个大陆个人都能通过”。[^src-creem-payouts][^src-creem-payout-accounts]

先准备一封具体的询问信。以下内容沿用示例产品；提交前将描述改成你的真实情况：

> I am an individual based in mainland China. I plan to sell 30-day access to a browser-based CSV reporting tool, with no automatic renewal. The product generates reports automatically; I do not provide custom consulting or AI-generated content. I intend to receive payouts into an Alipay account in my own legal name. Could you confirm whether this product and recipient setup are supported, which documents are required, and the payout fees, currency conversion and limits that would apply to this account?

你要拿到的结果，是**产品类别可以申请、本人账户可用、所需资料和费用口径明确**。如果平台要求补充经营身份、产品材料或账户资料，先按真实情况补齐；若明确不接受，回到本章的候选比较，选择另一条匹配路线。不要先接完三套系统，也不要借身份完成申请。

同时，把产品说明、平台协议、拟定出款方式整理成一页，核对你的经营登记与收入申报安排。向主管机构说明“卖的是自动化软件的限期使用权、通过哪个合同主体结算”，比只问“收到美元要不要交税”更有用。可直接沿[身份与主体](/go-global/entity)及[税务](/go-global/tax)准备材料；支付平台的审核答复不能代替这些判断。


### 将付款接到真实交付

先在 Creem 测试模式创建对应产品，使用测试密钥和测试回调。测试与生产的产品、密钥、API 地址及 webhook 分开配置；上线前需要在生产环境重新核对这些内容。[^src-creem-test-mode]

接入方法从[官方快速开始](https://docs.creem.io/getting-started/quickstart)进入即可。真正需要你补上的，是“哪笔订单为哪个用户开通了什么”。官方示例提供接入起点，并不会替你的产品定义完整的交付和幂等逻辑。生产交付应依赖服务端验证过的付款事件，不能凭成功页 URL 发放权益。[^src-creem-quickstart][^src-creem-webhooks]

本例把一次性交付写成一条明确规则：服务端确认对应订单付款后，为绑定用户开通一次 30 天通行证；重复收到同一订单的事件，不再延长 30 天。订单与用户的绑定应由服务端建立，并检查环境、商品和订单状态。原始请求体验签、事件去重和业务状态更新都通过后，才确认处理完成。Creem 文档明确提醒事件会重投，并提供签名校验方式。[^src-creem-webhooks]

下面是一份**待执行的验收规格**，不是本书已经跑过的支付记录：

| 输入 | 应得到的业务结果 |
|---|---|
| 有效测试付款，订单 `demo-001` 属于用户 A | A 获得一次 30 天使用权；B 没有变化 |
| 再次收到 `demo-001` 的成功事件 | 不重复计收入、不再次延长使用权 |
| 只打开成功页，没有服务端付款确认 | 显示确认中，不发放权益 |
| 请求签名错误，或商品不匹配 | 不改变订单和权益，留下不含密钥的排查记录 |
| 测试卡付款失败 | 不开通权益，保留重新付款入口 |
| 退款完成 | 订单、退款金额和按公示规则处理的权益状态能够对应 |

如果客户付了钱却用不了，先查平台付款状态，再查 webhook 投递状态及本地订单处理结果。Creem 文档特别说明，机器人防护或 WAF 可能拦截服务端回调；排查时针对回调路径调整配置并继续验证签名，修复后可以从平台重发事件。不要用“看到客户截图就手工改成永久会员”掩盖丢失的订单处理。[^src-creem-webhooks]
