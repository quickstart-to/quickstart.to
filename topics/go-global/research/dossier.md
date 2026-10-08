# 调研档案：中国大陆个人开发者出海主线

- 首次调研：2026-10-08（Agent，ego lite 浏览器）
- 范围：`outline.md` 中“快速入门主线”的 4 个待验证问题
- 本文件不发布。结论写入正文前，引用的来源须已在 `sources/sources.yaml` 中。

> 2026-10-08 补充：[第二轮外汇与税务调研](2026-10-08-fx-tax.md)已定位总局原文，核对涉外收入申报要求，并补充所得来源判断。以下平台结论仍为首轮文档调研，不代表开户或到账实测。

> 同日第三轮：[平台审核、测试支付与首次出款](2026-10-08-platform-onboarding.md)补齐KYC/AUP、出款启用及时间条件，并收窄首轮把准入等同于到账的结论。下表与早期费用摘录应连同第三轮阅读。

## 检索计划

| 问题 | 语言 | 一手来源 |
|---|---|---|
| MoR 准入（中国大陆个人） | 英文 | 各平台帮助中心 / 文档中的 supported countries、verification 页面 |
| 出款方式与费用 | 英文 / 中文 | 各平台 payouts 文档；PayPal 中国大陆（C2）费用页 |
| 个人收汇 / 结汇 | 中文 | 国家外汇管理局《个人外汇管理办法实施细则》 |
| 个人所得税 | 中文 | 财政部 税务总局公告 2020 年第 3 号（境外所得） |

候选平台：Paddle、Lemon Squeezy、Polar、Creem、Dodo Payments、Gumroad、Stripe Managed Payments。

## 结论摘要

**存在可申请的候选路径，尚无个案到账实测。** 截至2026-10-08，Paddle、Creem、Dodo的国家及个人账户文档支持列为候选；仍须分别核对产品、KYC、出款审批与本人接收账户。Creem明确中国个人使用支付宝，Paddle列电汇/Payoneer和CNY，Dodo要求按国家确认银行通道。不能推导成“三家均保证中国大陆个人银行直达”。[^src-paddle-countries][^src-paddle-business-verification][^src-paddle-identity-verification][^src-paddle-payout-currency][^src-creem-payouts][^src-dodo-verification][^src-dodo-payouts]

外汇和个税已有一般规则，但个人通过 MoR 销售软件的具体适用仍需确认。第二轮已核对所得来源与类别规则：**不能因付款方在境外，就认定收入属于境外所得**。本轮检索未找到能统一判定该具体场景的官方答复；正文应解释一般规则，并给出向开户行、主管税务机关确认的路径。[src-tax-iit-implementation] [src-tax-foreign-income-2020-3]

## Findings

### Q1 哪些 MoR 接受中国大陆个人卖家

| 平台 | 文档资格与边界 | 依据 | 置信度 |
|---|---|---|---|
| Paddle | 可列为申请候选 | 不支持国家列表中没有中国 [src-paddle-countries]；个人免业务主体认证，但仍须KYC、域名及产品审核 [src-paddle-business-verification] [src-paddle-identity-verification] | confirmed（文档口径，非个案获批） |
| Creem | 可列为申请候选 | 国家列表含China，个人支付宝出款另有同名及限额要求 [src-creem-countries] [src-creem-payouts] | confirmed（文档口径，非个案获批） |
| Dodo Payments | 可列为申请候选 | 中国证件符合国家准入，仍需产品、身份、银行及Monitoring Review [src-dodo-merchant-countries] [src-dodo-verification] | confirmed（文档口径，非个案获批） |
| Lemon Squeezy | 银行列表无中国；PayPal分支待账户确认 | PayPal覆盖表述不能独立证明特定中国账户可接收商户出款 [src-ls-countries] | 银行列表confirmed；完整路径unverified |
| Gumroad | 银行列表无中国；PayPal分支待账户确认 | 无银行出款国家改用PayPal，但个案账户能否接收未验证 [src-gumroad-getting-paid] | 银行列表confirmed；完整路径unverified |
| Polar | 否 | 出款依赖 Stripe Connect Express，国家列表含 Hong Kong 不含中国大陆 [src-polar-countries] | confirmed |
| Stripe Managed Payments | 否 | 亚太支持的业务所在地只有 Australia、Hong Kong、Japan、Singapore [src-stripe-mp-eligibility] | confirmed |

费率（基础费率，未含附加费）：

- Paddle：5% + 50¢/笔 [src-paddle-pricing]
- Creem：3.9% + 40¢/笔 [src-creem-pricing]
- Dodo：4% + 40¢/笔，美国以外支付 +1.5%，订阅 +0.5% [src-dodo-pricing]
- Lemon Squeezy：5% + 50¢，美国以外 +1.5%，PayPal 支付 +1.5%，订阅 +0.5% [src-ls-fees]

KYC / 禁售类目：第三轮已核对Paddle、Creem、Dodo的材料、禁售/受限类别和估计审核时间，见补充调研。个人免业务主体认证不等于免KYC，数字商品也不自动获准销售。[^src-paddle-identity-verification][^src-paddle-aup][^src-creem-account-reviews][^src-dodo-verification][^src-dodo-merchant-acceptance]

### Q2 出款到中国大陆个人账户

| 平台 | 渠道 | 费用 / 门槛 | 来源 |
|---|---|---|---|
| Paddle | 电汇（可选 CNY、USD 等币种）或 Payoneer | 每月 1 日结算，15 日前发出，最低门槛 $100；部分国家可能有 $15 SWIFT 费；换成非余额币种最多收 1.5% 汇兑差 | [src-paddle-payout-schedule] [src-paddle-payout-fees] [src-paddle-payout-currency] |
| Creem | 中国个人：同名支付宝；企业：本地银行账户 | 通用出款费7 EUR/USD与1%取高，支付宝具体口径待确认；单笔5万元、年度30万–60万元档位待确认；最低50 USD/EUR，手动申请后按日程出款 | [src-creem-countries] [src-creem-payouts] |
| Dodo | 本人银行账户；具体中国通道/币种需确认 | 默认门槛$100（最低可设$50）；$1000以下出款收$5；非美国商户USD SWIFT出款$25，接收行可能另收费 | [src-dodo-payouts] [src-dodo-pricing] |
| Lemon Squeezy | PayPal美元出款分支；具体中国账户资格未验证 | 美国以外PayPal出款收3%，封顶$30；门槛$50；每月1日、15日结算 | [src-ls-fees] [src-ls-getting-paid] |
| Gumroad | PayPal美元出款分支；具体中国账户资格未验证 | PayPal出款收2% | [src-gumroad-getting-paid] |
| PayPal（中国大陆账户） | 电汇到中国大陆银行 | 每笔提现 35.00 美元 | [src-paypal-c2-consumer-fees] |

### Q3 外汇：个人收汇与结汇

- 个人结汇和境内个人购汇实行年度总额管理，额度为每人每年等值 5 万美元；额度内凭本人有效身份证件在银行办理 [src-safe-individual-fx-rules]。
- 个人经常项目外汇收支分为“经营性”和“非经营性”两类。经营性收支针对**个人对外贸易经营者**和**个体工商户**，要通过外汇结算账户办理，按机构管理 [src-safe-individual-fx-rules]。
- 非经营性结汇超过年度总额时，凭相关证明在银行办理。列出的类别中有“专有权利使用和特许收入：付款证明、协议或合同” [src-safe-individual-fx-rules]。
- **未解决**：没有工商登记的个人通过 MoR 收到软件销售款，银行会把它归为哪一类、超出 5 万美元时要提供什么材料，官方文本没有针对这种场景的表述。需要读者向开户行确认。
- 第二轮已替换为总局原文并核对2026-06-30有效法规目录。原文保留旧条文，末尾注明2016年修改及2023年删除第三十九条，引用时必须连同注释阅读。[src-safe-individual-fx-rules] [src-safe-effective-rules-2026]

### Q4 个人所得税

- 居民个人来源于境外的所得，应在取得所得的次年 3 月 1 日至 6 月 30 日内申报纳税 [src-tax-foreign-income-2020-3]。
- 该公告列举的境外所得类型包括特许权使用费（许可特许权在中国境外使用）和经营所得（在中国境外从事生产经营），两者的计税方式不同 [src-tax-foreign-income-2020-3]。
- **仍未解决**：MoR 平台向个人支付的软件销售款在具体合同下按哪类所得申报，以及如何认定所得来源。第二轮已核对实施条例第三、六条和上述公告第一条的一般规则；不得把境外付款直接等同于境外所得，也不得无条件套用境外所得申报期间。见第二轮调研的已确认规则与未确认边界。[src-tax-iit-implementation] [src-tax-foreign-income-2020-3]

### Q5 耗时与成本

- 平台基础交易费见Q1；完整成本还包括出款、换汇及银行费，不能用交易费率代替实收额。
- 个人审核：Paddle域名人工审核预计5–7工作日、KYC人工审核预计1–3工作日；Creem通常1–2工作日、高峰可至3日；Dodo多数1–3工作日。均不是个案时限承诺。[^src-paddle-domain-review][^src-paddle-identity-verification][^src-creem-account-reviews][^src-dodo-verification]
- 出款日程与到账分开：Paddle按月结转、15日前发出；Creem达门槛并手动申请后排入1日/15日；Dodo默认半月18日/次月4日发起。余额可用性、节假日及收款机构处理还会影响首笔到账。[^src-paddle-payout-schedule][^src-creem-payouts][^src-dodo-payouts]
- 其他成本（域名、托管等）属于 `infrastructure` 章节，本轮未调研。

## Contradictions

- Creem 定价页的比较表把 Lemon Squeezy 列为 “7% + $0.50”，而 Lemon Squeezy 官方费率页写的是 5% + 50¢ 加附加费。原因是比较表假设“国际订阅 + 高端卡”的场景。**引用费率一律以平台自己的页面为准。**
- Lemon Squeezy 称 PayPal 出款覆盖200+国家/地区，PayPal C2费用页列出中国大陆银行提现费；后者只支持该收费结论，不能据此证明特定个人账户能接收该MoR商户款。完整PayPal中转路径保留未确认，不作为快速入门主线。[^src-ls-countries][^src-paypal-c2-consumer-fees]

## Open questions（下一轮）

1. **第二轮已核对**：《个人外汇管理办法实施细则》总局原文、修改注释及2026-06-30法规目录，见 `2026-10-08-fx-tax.md`。
2. **第二轮已核对一般要求**：2022年银行申报细则第八、十二条；同时记录2026年修订征求意见状态。具体平台路径仍需确认，发布前重查最终文件。
3. **第三轮已补**：三家AUP及网站审核常见问题；具体受限产品须个案确认。
4. **第三轮已补**：Creem、Dodo的审核流程与时间；Creem对具体申请人可接受的证件仍以其KYC流程为准。
5. Paddle 出款到中国大陆银行时，SWIFT 费是否适用，CNY 出款是否有额外限制。
6. Payoneer 中国大陆个人账户的提现规则（Paddle 支持 Payoneer 出款）。
7. **部分完成**：已核对个税所得分类和来源的一般规则；在本轮限定检索范围内仍未找到对“个人通过境外 MoR 销售软件”的统一答复，具体适用保留未确认。

## Recommendation

1. **保留候选主线**，增加产品/身份/出款账户确认步骤：申请MoR → 确认本人收款账户 → 测试 → 真实首单 → 实际到账；不把公开文档称为到账实测。
2. 快速入门不绑定单一平台。给一张“截至某日期”的对比表，并标注每家对中国大陆个人的出款方式。
3. Lemon Squeezy、Gumroad的PayPal中转另行验证；Polar、Stripe Managed Payments的受支持地区资格放到后续章节研究，不能写成“注册海外公司就必然可用”。
4. 外汇和税务区分一般规则与个案适用。第三轮已重查2026年申报细则公开征求意见状态。现有证据可进入带确认点的正文写作；执行时再由申请人的合同、产品及账户材料确定适用。
