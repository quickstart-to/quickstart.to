# 调研档案：中国大陆个人开发者出海主线

- 首次调研：2026-10-08（Agent，ego lite 浏览器）
- 范围：`outline.md` 中“快速入门主线”的 4 个待验证问题
- 本文件不发布。结论写入正文前，引用的来源须已在 `sources/sources.yaml` 中。

> 2026-10-08 补充：[第二轮外汇与税务调研](2026-10-08-fx-tax.md)已定位总局原文，核对涉外收入申报要求，并补充所得来源判断。以下平台结论仍为首轮文档调研，不代表开户或到账实测。

## 检索计划

| 问题 | 语言 | 一手来源 |
|---|---|---|
| MoR 准入（中国大陆个人） | 英文 | 各平台帮助中心 / 文档中的 supported countries、verification 页面 |
| 出款方式与费用 | 英文 / 中文 | 各平台 payouts 文档；PayPal 中国大陆（C2）费用页 |
| 个人收汇 / 结汇 | 中文 | 国家外汇管理局《个人外汇管理办法实施细则》 |
| 个人所得税 | 中文 | 财政部 税务总局公告 2020 年第 3 号（境外所得） |

候选平台：Paddle、Lemon Squeezy、Polar、Creem、Dodo Payments、Gumroad、Stripe Managed Payments。

## 结论摘要

**主线成立，但需要修正细节。** 截至 2026-10-08，至少 Paddle、Creem、Dodo Payments 三家 MoR 的官方文档显示：可以以个人身份、中国大陆证件接入，并直接出款到中国大陆的银行账户（Creem 的个人出款渠道是支付宝）。Lemon Squeezy、Gumroad 对中国大陆只支持 PayPal 出款，PayPal 提现回国内银行每笔另收 35 美元。Polar、Stripe Managed Payments 不支持中国大陆。

外汇和个税已有一般规则，但个人通过 MoR 销售软件的具体适用仍需确认。第二轮已核对所得来源与类别规则：**不能因付款方在境外，就认定收入属于境外所得**。本轮检索未找到能统一判定该具体场景的官方答复；正文应解释一般规则，并给出向开户行、主管税务机关确认的路径。[src-tax-iit-implementation] [src-tax-foreign-income-2020-3]

## Findings

### Q1 哪些 MoR 接受中国大陆个人卖家

| 平台 | 中国大陆个人可用？ | 依据 | 置信度 |
|---|---|---|---|
| Paddle | 是 | 不支持国家列表中没有中国 [src-paddle-countries]；业务主体认证步骤“对个人或个体经营者（individuals or sole traders）不要求” [src-paddle-business-verification] | confirmed |
| Creem | 是 | 支持的 87 个商户国家里有 China（带 * 号，表示有出款限额） [src-creem-countries] | confirmed |
| Dodo Payments | 是 | 商户准入国家含 China，个人账户按本人证件签发国判定资格 [src-dodo-merchant-countries] | confirmed |
| Lemon Squeezy | 仅 PayPal 出款 | 银行出款国家列表无中国；“PayPal payouts are supported in 200+ countries and regions” [src-ls-countries] | confirmed（中国大陆 PayPal 可收款见 Q2） |
| Gumroad | 仅 PayPal 出款 | 银行出款国家表无中国；无银行出款的国家改用 PayPal [src-gumroad-getting-paid] | confirmed |
| Polar | 否 | 出款依赖 Stripe Connect Express，国家列表含 Hong Kong 不含中国大陆 [src-polar-countries] | confirmed |
| Stripe Managed Payments | 否 | 亚太支持的业务所在地只有 Australia、Hong Kong、Japan、Singapore [src-stripe-mp-eligibility] | confirmed |

费率（基础费率，未含附加费）：

- Paddle：5% + 50¢/笔 [src-paddle-pricing]
- Creem：3.9% + 40¢/笔 [src-creem-pricing]
- Dodo：4% + 40¢/笔，美国以外支付 +1.5%，订阅 +0.5% [src-dodo-pricing]
- Lemon Squeezy：5% + 50¢，美国以外 +1.5%，PayPal 支付 +1.5%，订阅 +0.5% [src-ls-fees]

KYC / 禁售类目：本轮未逐家核对禁售清单（AUP）。已知 Paddle 要求域名审核，人工审核预计 5–7 个工作日，且只能在已获批的域名上发起结账 [src-paddle-domain-review]。

### Q2 出款到中国大陆个人账户

| 平台 | 渠道 | 费用 / 门槛 | 来源 |
|---|---|---|---|
| Paddle | 电汇（可选 CNY、USD 等币种）或 Payoneer | 每月 1 日结算，15 日前发出，最低门槛 $100；部分国家可能有 $15 SWIFT 费；换成非余额币种最多收 1.5% 汇兑差 | [src-paddle-payout-schedule] [src-paddle-payout-fees] [src-paddle-payout-currency] |
| Creem | 个人：支付宝；企业：本地银行账户 | 出款费为 7 EUR/USD 与 1% 中较高者；支付宝单笔上限 5 万元人民币，每年 30 万–60 万元；出款账户名必须与 KYC 身份一致 | [src-creem-countries] [src-creem-payouts] |
| Dodo | 银行账户 | 默认门槛 $100（最低可设 $50）；$1000 以下的出款收 $5；非美国商户的 USD SWIFT 出款 $25 | [src-dodo-payouts] [src-dodo-pricing] |
| Lemon Squeezy | PayPal（美元） | 美国以外的 PayPal 出款收 3%，封顶 $30；门槛 $50；每月 1 日、15 日结算 | [src-ls-fees] [src-ls-getting-paid] |
| Gumroad | PayPal（美元） | PayPal 出款收 2% | [src-gumroad-getting-paid] |
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

### Q5 耗时与最低成本（初步）

- 平台费用：上述 MoR 均无月费，按笔收费（见 Q1）。
- 审核时间：Paddle 业务主体认证人工审核预计 2–4 个工作日 [src-paddle-business-verification]，域名审核预计 5–7 个工作日 [src-paddle-domain-review]。其余平台本轮未核实。
- 首笔到账：Paddle 按月出款（每月 1 日结算，15 日前发出，到账再需最多 3 个工作日）[src-paddle-payout-schedule]；Creem 每月 1 日、15 日出款 [src-creem-pricing]。
- 其他成本（域名、托管等）属于 `infrastructure` 章节，本轮未调研。

## Contradictions

- Creem 定价页的比较表把 Lemon Squeezy 列为 “7% + $0.50”，而 Lemon Squeezy 官方费率页写的是 5% + 50¢ 加附加费。原因是比较表假设“国际订阅 + 高端卡”的场景。**引用费率一律以平台自己的页面为准。**
- Lemon Squeezy 称 PayPal 出款覆盖 200+ 国家/地区，但能否在中国大陆收款，取决于 PayPal 中国大陆账户本身的规则。PayPal C2 费用页显示中国大陆账户可电汇提现，因此路径成立，代价是每笔 35 美元。

## Open questions（下一轮）

1. **第二轮已核对**：《个人外汇管理办法实施细则》总局原文、修改注释及2026-06-30法规目录，见 `2026-10-08-fx-tax.md`。
2. **第二轮已核对一般要求**：2022年银行申报细则第八、十二条；同时记录2026年修订征求意见状态。具体平台路径仍需确认，发布前重查最终文件。
3. 各 MoR 的禁售类目（AUP）和对“个人开发者 SaaS”的常见拒绝原因。
4. Creem、Dodo 的 KYC 材料清单与审核时长。
5. Paddle 出款到中国大陆银行时，SWIFT 费是否适用，CNY 出款是否有额外限制。
6. Payoneer 中国大陆个人账户的提现规则（Paddle 支持 Payoneer 出款）。
7. **部分完成**：已核对个税所得分类和来源的一般规则；在本轮限定检索范围内仍未找到对“个人通过境外 MoR 销售软件”的统一答复，具体适用保留未确认。

## Recommendation

1. **保留主线**，措辞改为：个人身份 + 支持中国大陆个人出款的 MoR（截至调研日：Paddle、Creem、Dodo Payments）+ Web 产品 → 出款到国内银行账户或支付宝 → 收到第一笔钱。
2. 快速入门不绑定单一平台。给一张“截至某日期”的对比表，并标注每家对中国大陆个人的出款方式。
3. Lemon Squeezy、Gumroad 归入“可用但需要 PayPal 中转”；Polar、Stripe Managed Payments 归入“需要香港或海外主体”，放到 `entity` 章节讨论。
4. 外汇和税务章节区分“已有一般规则”和“本轮未找到具体场景答复”，给出向银行 / 税务机关确认的路径。问题1、2已补证据，问题7保留适用边界；写作前重查2026年申报细则修订进展。
