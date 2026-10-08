# 大纲：中国开发者出海（草案）

> 状态：草案。主线已有三轮公开文档调研；外汇 / 税务见 `research/2026-10-08-fx-tax.md`，平台审核与出款见 `research/2026-10-08-platform-onboarding.md`。已具备正文写作证据，实际开户、收款账户适用性及具体所得分类保留为个案确认点。

写作进度（2026-10-08）：快速入门及“收款方案全景”“提现与结汇”“身份与主体”“税务”四章已写成。路线比较的补充调研见 `research/2026-10-08-payments-payouts.md`；主体、注册与税务边界见 `research/2026-10-08-entity-tax.md`。其余规划章节待写，专题仍为草稿。

## 读者

中国大陆个人开发者：一个人、没有海外公司、会写代码，想把软件卖给海外用户。

## 快速入门主线（公开文档调研后修订）

中国大陆个人申请 MoR + 符合平台产品政策的 Web 软件 → 确认本人收款账户可用 → 通过审核并测试交付 → 真实首单 → 本人账户实际到账。公开文档只验证候选路径，不保证个案通过或到账。

调研结论（详见 `research/dossier.md` 及两份补充记录，来源已入 `sources/sources.yaml`）：

1. **MoR 准入**：截至2026-10-08，Paddle、Creem、Dodo的国家/个人申请文档支持把它们列为候选，但身份、产品和出款仍需审批。不要写成无条件可用。其他平台的分支路线另见调研档案。[^src-paddle-countries][^src-paddle-business-verification][^src-paddle-identity-verification][^src-creem-countries][^src-creem-payout-accounts][^src-dodo-merchant-countries][^src-dodo-verification]
2. **出款路径**：Paddle列电汇/Payoneer及CNY币种；Creem中国个人明确走同名支付宝；Dodo列本人银行账户，但具体国家通道与币种须确认。不能仅凭国家准入或支持币种断言某家大陆银行一定可收。[^src-paddle-payout-schedule][^src-paddle-payout-currency][^src-creem-payouts][^src-dodo-payouts]
3. **外汇**：个人结汇年度总额每人每年等值5万美元，不能改写成境外收款上限；本轮未找到针对个人 MoR 软件销售收入的经营性/非经营性分类答复，正文给出向开户行确认的路径。[^src-safe-individual-fx-rules]
4. **个税**：先依据合同和实际业务确认所得类别及来源，不因境外付款就认定为境外所得；只有适用境外所得规定时，才引用次年3月1日至6月30日申报期间。具体 MoR 软件销售场景本轮未找到统一官方答复，需向主管税务机关确认。[^src-tax-iit-implementation][^src-tax-foreign-income-2020-3]
5. **耗时 / 成本**：分列交易费、出款费、换汇/银行费；审核时间只写官方估计。达到可用余额门槛、出款已启用及出款日到达是不同条件，Creem还需手动申请。不得承诺一笔小额销售即可提现。[^src-paddle-payout-schedule][^src-creem-payouts][^src-dodo-verification][^src-dodo-payouts]

写作约束：快速入门不绑定单一平台，用“截至某日期”的简短对比表，选定一家后沿共同流程推进。平台KYC/AUP、出款材料及测试/生产区别已完成公开文档补查；2026年申报细则本轮仍检索到征求意见通知。后续日期发布需再核对规则；具体银行/税务适用以读者个案材料确认。

快速入门的验收点分别记录：

1. **接入测试完成**：测试订单与交付流程通过；不计为真实收入。
2. **真实客户付款完成**：保留真实订单及交付记录；不与出款到账混为一谈。
3. **本人收款账户实际到账**：核对订单、平台结算单与到账记录，分别记录日期和金额；将每个平台的审核条件、出款门槛、周期与费用写清后再引导读者执行。

## 章节规划

| # | slug | 章节 | 内容 |
|---|---|---|---|
| 0 | (quickstart) | 快速入门 | 走通主线：选平台 → 开户 → 接入支付 → 定价 → 上线 → 首单 → 提现 |
| 1 | validate-idea | 选品与验证 | 适合个人开发者的产品形态，怎么在海外社区验证需求 |
| 2 | payments | 收款方案全景 | MoR、Stripe 类直连、应用商店的对比，各自适合什么阶段 |
| 3 | payouts | 提现与结汇 | 美元怎么合规地进到个人账户，外汇额度和常见坑 |
| 4 | entity | 身份与主体 | 什么时候需要海外公司（美国 LLC、香港公司等），怎么注册 |
| 5 | tax | 税务 | 海外销售税 / VAT（MoR 代缴的边界），个人所得在国内的申报 |
| 6 | pricing | 定价与订阅 | 定价策略、订阅、试用、退款 |
| 7 | infrastructure | 基础设施 | 域名、海外云、邮件、备案与否、国内网络环境下的开发 |
| 8 | launch | 冷启动获客 | Product Hunt、Reddit、Hacker News、X、SEO、目录站 |
| 9 | compliance | 合规底线 | 隐私政策、服务条款、GDPR、Cookie 提示 |
| 10 | app-stores | 应用商店路线 | App Store / Google Play 的个人开发者账号和收款（分支路线） |
| 11 | risk | 风控与账户安全 | 账号被封、拒付、资金冻结的预防和处理 |
