# 收款路线与回款核对：章节补充调研

核验日期：2026-10-08。通过 ego lite 访问公开官方页面；不进入账户或提交开户、付款资料。

## 检索计划

- Stripe：直接核对 Global availability、Stripe Tax 和 Managed Payments 文档；区分普通支付处理、税务工具、MoR 产品，检查中国大陆与香港的地区表述。
- 应用商店：直接核对 Apple App Review Guidelines 3.1.1 / 3.1.3、Google Play Payments policy；只建立与 Web 收款路线的边界，不展开尚未调研的开户和商店费率。
- 出款：复核既有 Paddle、Creem、Dodo 出款来源与外汇/税务调研，整理资金状态、门槛、周期和对账方法。
- 反证：寻找商店支付规则的地区例外、平台国家准入与银行到账之间的断层，以及涉外申报新旧版本差异。
- 对新增高波动来源请求 Wayback 快照，只登记可确认的存档。

## Questions

1. 无海外公司的大陆个人，如何区分 MoR、Stripe 直连和应用商店路线？
2. 如何估算交易费用，又避免把平台余额误当作可到账金额？
3. 收款、出款、结汇和申报分别在哪一步核对？

## Findings

### 1. Stripe 的地区列表和产品要分别理解

**confirmed**：Stripe Global availability正文开通地区列表包含香港，未列中国大陆；页尾语言/地区选择器另有“中国内地”，不是支付准入列表。正文也将服务地区外的Treasury / 稳定币功能标注为暂不支持支付。原站在本轮显示中文，存档可读英文版本。[^src-stripe-global]

**confirmed**：Stripe Tax文档要求依次识别义务、注册、计算收取、申报缴纳，并说明Stripe和合作伙伴可以辅助注册及自动化申报。不能写成“Stripe完全不处理税务”，也不能把打开税额计算等同于已完成所有步骤。[^src-stripe-tax-how]

**复用同日已核验证据**：Managed Payments是需单独核对的产品；其亚太业务所在地资格列澳大利亚、香港、日本、新加坡。正文不将普通Stripe、Tax、Managed Payments混成一种服务。[^src-stripe-mp-eligibility]

### 2. 应用商店规则存在地区与类别条件

**confirmed**：Apple 3.1.1规定应用内数字功能的IAP原则；3.1.1(a)对美国店面外链与特定地区授权分别表述，3.1.3另列特定类别条件。本轮核对相关完整段落，不只截取IAP原则。[^src-apple-payment-guidelines]

**confirmed**：Google Play政策要求Play分发应用相关数字功能使用Play结算，另列第3、8、9节例外；符合地区条件的替代结算或应用外引导须按适用计划办理。[^src-google-play-payments]

**写作边界**：本轮只建立路线筛选框架，未研究个人开发者商店开户、完整抽成计划、各地区授权申请和大陆账户收款。正文不给统一商店抽成数字，不承诺外链全球可用。

### 3. 费用与回款沿用同日研究，并明确演算假设

平台准入、身份/产品审核、测试和生产区别，复用 `2026-10-08-platform-onboarding.md`；平台国家列表、基础费率见 `dossier.md`。出款门槛、时间、通道及费用使用既有Paddle、Creem、Dodo来源，不从品牌名或币种列表推导特定账户一定可用。[^src-paddle-payout-schedule][^src-creem-payouts][^src-dodo-payouts]

正文基础费率表只按指定交易金额演算，明确排除交易税、附加功能、出款和换汇；Creem出款例子明确假设适用通用费率，不当成中国支付宝报价。对账示例全部为虚构金额，不代表平台费用、税率或个税应税收入。[^src-paddle-pricing][^src-creem-pricing][^src-dodo-pricing][^src-creem-payouts]

外汇与个税部分复用同日 `2026-10-08-fx-tax.md` 已核验原文与PDF条文：5万美元年度总额、1万美元银行涉外凭证限额下免填、T+5工作日，以及所得来源/类别分开判断。具体MoR软件交易的个案分类继续标为未验证，不借用其他税种规则替代。

写作后再次访问三家出款原文，核对门槛、周期、费用与本人账户条件，未发现与本轮采用条款冲突。另以 `site:safe.gov.cn/safe/2026/ 通过银行 国际收支 实施细则` 检索，结果仍指向9月30日征求意见通知；随后打开原站确认“拟修订”及10月30日反馈截止日期。本轮限定检索未找到最终施行文件，不据此宣称未来不会变化。[^src-safe-bop-consultation-2026]

## Contradictions

1. Stripe页面的语言/地区选择器有“中国内地”，但正文支付开通名单没有；以正文服务范围为准。[^src-stripe-global]
2. Stripe Tax提供自动化能力与商户需要履行完整流程并不矛盾；不能写成两个极端。[^src-stripe-tax-how]
3. Apple美国店面和部分地区授权、Google符合地区条件的计划，不是全球统一外链许可。[^src-apple-payment-guidelines][^src-google-play-payments]
4. 平台出款额度与个人外汇年度总额不是同一个规则；收到人民币也不能据此判断无需核对涉外申报或所得处理。[^src-creem-payouts][^src-safe-individual-fx-rules][^src-safe-bop-rules-2022]

## Open questions

- 平台到具体大陆个人银行/支付宝账户的实际通道、收费和额度未实测；Payoneer/PayPal不因在平台文档出现就视为完整通路已验证。
- MoR软件收入的经营性/非经营性外汇分类，以及个税所得类别、来源和办理安排仍需个案确认。
- 商店开发者开户、支付计划和收费应由后续 `app-stores` 章节专项研究。
- Stripe不同经营主体的开户资料和持续成本不在本轮范围内，不给注册公司建议。

## Recommendation

已写成 `payments`、`payouts` 两章，与快速入门互相链接；只给这两篇新正文设置本轮 `last_verified`，不批量刷新其他页面。专题还缺身份、税务等规划章节，继续保持 `draft`。

## Archive attempts

本轮已请求4条新增来源的Wayback保存。初始导航均曾超时，随后在同一浏览器TaskSpace确认跳转和正文内容后才登记：

- Stripe地区：`20261008112923`，读到地区列表和Hong Kong。
- Stripe Tax：`20261008113229`，读到合规步骤正文。
- Apple：`20261008113029`，读到3.1.1正文。
- Google Play：`20261008112943`，读到支付原则及eligible countries/regions相关段落。

完整存档URL见 `sources.yaml`，仓库只保留短摘录。
