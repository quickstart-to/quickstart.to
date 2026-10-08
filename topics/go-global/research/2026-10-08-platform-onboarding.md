# 平台审核、测试支付与首次出款

核验日期：2026-10-08。范围：公开官方文档；不代表已提交个人资料、通过审核或实测跨境到账。

## 查询计划

- Creem：Account Reviews、identity verification、acceptable use、test mode、webhooks、payouts；区分允许收款与允许出款。
- Paddle：domain review、identity verification、acceptable use、sandbox、webhooks、payout requirements；区分个人免业务主体认证与免身份审核。
- Dodo Payments：individual onboarding、website compliance、prohibited products、test/live、payout bank details；核对中国商户准入与实际收款银行的边界。
- 国家外汇管理局：检索2026年《通过银行进行国际收支统计申报业务实施细则》正式发布信息，避免将征求意见稿当作现行规则。

## Questions

1. 中国大陆个人应先准备哪些网站、身份和出款资料？
2. 什么产品不能进入主线，审核预计多久？
3. 如何区分测试成功、真实首单与本人账户到账？
4. 哪些结论可用于正文，哪些仍需向平台或收款机构确认？

## Findings

以下为 `confirmed`：官方页面在核验日确有该表述。它不等于某位申请人必然通过审核，也不等于已实测该申请人的收款银行。来源的标题、发布方、URL、访问日期和短摘录见 `sources.yaml` 中相应条目。

### 1. 先核对产品，再选平台

普通、自有权利的 Web 软件可作为本篇主线；不能把“数字产品”当成统一准入资格。三家政策存在明显差异：

| 平台 | 已确认的边界 | 来源 |
|---|---|---|
| Paddle | 面向软件；纯人工咨询、设计等与软件无关的服务及实物不适用；侵权、未经授权的数据访问等禁止。部分AI人像及VPN类产品属于受限类别，需加强审查。 | [^src-paddle-aup] |
| Creem | 支持软件/SaaS等数字商品；换脸、深度伪造、AI伴侣等禁止；生成式AI、API转售及各类服务属于受限类别，要求额外资料及既有记录。AI图片/视频产品还须接入其 Moderation API。 | [^src-creem-account-reviews] |
| Dodo | 支持SaaS、数字商品等；主要价值来自人工劳动的定制开发、咨询等不接受。游戏、游戏虚拟物品、托管基础设施等也在不支持清单内；生成式AI等另需审核。 | [^src-dodo-merchant-acceptance] |

写作决定：正文先让读者用完整政策检查自己的具体交付物；受限产品停在平台书面确认处，不把它们混入普通软件的快速通道。平台之间不能直接类推，例如 Paddle 支持游戏不代表 Dodo 支持。[^src-paddle-aup][^src-dodo-merchant-acceptance]

### 2. 网站与身份材料

| 平台 | 申请前准备 | 审核口径 |
|---|---|---|
| Paddle | 上线且有HTTPS的网站、清晰产品/价格/交付内容、可找到的条款/退款/隐私页面；提交所有发起结账的域名与子域名。个人仍做KYC，可能需政府证件、地址证明及活体检查。 | 域名人工审核预计5–7工作日；身份人工审核预计1–3工作日，均非保证。个人免的是业务主体认证步骤。[^src-paddle-domain-review][^src-paddle-identity-verification][^src-paddle-business-verification] |
| Creem | 可用产品、可见价格/条款/隐私政策、与网站一致的品牌支持邮箱；真实姓名、产品URL、业务/产品描述、税务居住国。流程依次为业务信息、KYC/KYB、出款账户、团队审核。 | 账户审核通常1–2工作日，高峰可至3日；通过后开启真实收款。本轮公开页面未列中国个人逐种可接受证件清单，不能臆写“只需身份证”或“必须护照”。[^src-creem-account-reviews][^src-creem-payout-accounts] |
| Dodo | 无需登录即可访问的网站，展示价格/周期、条款、隐私、退款/取消方式、支持联系方式；按 Individual 提交产品信息、政府证件与自拍KYC、银行资料。个人银行账户持有人姓名须与KYC一致。 | 多数审核1–3工作日；表单依次解锁。所有必需表单批准才可真实收款；出款还需完成 Monitoring Review。[^src-dodo-verification] |

这里的网站清单是平台审核要求，不是对隐私、消费者保护等法律义务的完整核定。申请人应按自己的真实业务填写，而不是复制不适用的条款。[^src-paddle-domain-review][^src-creem-account-reviews][^src-dodo-verification]

### 3. 出款要同时满足审核、可用余额、申请与日程

| 平台 | 门槛与日程 | 本人收款账户及尚需确认的地方 |
|---|---|---|
| Paddle | 每月1日按门槛结转，最低门槛100美元（GBP/EUR余额分别为100英镑/欧元），15日前发出；低于门槛结转次月，不能随时提现。 | 电汇或Payoneer；发出后文档预计最多3工作日到账，但须以收款账户记录验收。支持CNY这一币种不能独立证明某家大陆银行可接收该笔软件销售款。[^src-paddle-payout-schedule][^src-paddle-payout-currency] |
| Creem | 最低余额50 USD/EUR，点击 withdraw 后排入下一窗口（1日/15日）；款项可能先等待7–12日风控才成为可用余额，节假日可能顺延。 | 中国个人渠道写明Alipay，须与KYC同名；单笔5万元，年度区间30–60万元。具体档位及支付宝适用费用须确认；不能把上限写成人人固定60万元。[^src-creem-payouts] |
| Dodo | 默认门槛100美元，可设最低50美元；默认半月周期，上半月18日、下半月次月4日发起，周末/联储银行假日顺延。须完成相关审核且合格余额达到门槛。 | 本人同名银行账户；出款路径/币种因国家和账户而异，官方要求绑定前确认。Success表示已发给银行，银行及中转行处理、换汇、收费仍会影响实际到账。[^src-dodo-verification][^src-dodo-payouts] |

费用写作边界：不要用基础交易费直接算“落袋金额”。Paddle 的SWIFT/换汇、Creem 通用出款费与附加功能费、Dodo 小额出款/SWIFT，以及接收行费用应分别核对。Creem 7 USD/EUR与1%取高是文档通用出款口径；当前页面没有把中国支付宝费用单独拆明，正文应列为询问项。[^src-paddle-payout-fees][^src-paddle-payout-currency][^src-creem-payouts][^src-dodo-pricing][^src-dodo-payouts]

### 4. 接入测试与真实首单分开验收

- Paddle sandbox可在未获批域名上测试，不代表真实收款资格已通过。[^src-paddle-domain-review]
- Creem 测试和生产的API密钥、地址、产品、webhook分别配置；上线前要在生产创建产品并登记生产webhook。官方提供成功和拒绝等测试卡。[^src-creem-test-mode]
- Dodo 的产品、密钥和webhook分环境；银行资料、验证资料等跨环境共享。测试不转真钱，但会发真实邮件，因此只使用自己控制的收件地址。不能把整个测试后台都当作无副作用沙盒。[^src-dodo-test-live]
- Creem 可以创建产品并分享支付链接，但生产交付应在服务端接收付款事件。回到成功页不是独立的收款证据。处理webhook前验证签名，并让重复投递只产生一次交付。[^src-creem-quickstart][^src-creem-webhooks]
- Creem 订阅文档建议按 `subscription.paid` 开通；安排期末取消时，订阅在当前周期结束前仍有效。不要把“提出取消”一律实现为立即剥夺剩余已付权益。[^src-creem-webhooks]

拟用于正文的验收清单（编辑建议，不是已执行的测试）：

1. **测试**：成功付款可交付、失败付款不交付、伪造签名被拒绝、重复事件不重复交付；订阅另验续费/取消，退款按公示政策处理。
2. **上线**：核对当前环境、产品、价格/周期、密钥、webhook；保存平台准入和出款启用状态。
3. **首单**：由真实客户为明确交付物付款，保留订单、付款事件和交付证据；不把测试单或零元审核单算作收入。
4. **到账**：保存结算单、平台出款编号与本人账户入账记录，核对金额/币种/日期差异。

### 5. 重查银行申报细则版本

本轮在搜索引擎限定 `site:safe.gov.cn/safe/2026` 检索“通过银行进行国际收支”及“实施”，并重新打开总局公告。该页仍为征求意见通知，反馈截止2026-10-30；在本次限定检索范围内未找到2026年正式替代文件。保留第二轮对2022细则的版本说明，不能把“未搜到”扩大为对全库的绝对断言。[^src-safe-bop-consultation-2026][^src-safe-bop-rules-2022]

## Contradictions

1. 首轮档案把国家准入、一般出款工具与大陆银行实际可到账合并为“主线成立”。证据只支持候选路径；大陆个人具体身份/产品/接收账户仍须过审。已收窄档案摘要和大纲措辞。[^src-paddle-identity-verification][^src-creem-payout-accounts][^src-dodo-verification][^src-dodo-payouts]
2. Creem 的通用账户设置介绍银行/钱包，但同一官方文档的中国分项明确“个人：Alipay”；正文采用中国分项。其“7–12日等待”与“15日出款可用8日之前交易”的例子也不能合成固定7日承诺。[^src-creem-payout-accounts][^src-creem-payouts]
3. Creem 快速开始页的“创建产品、分享链接即可收款”必须与账户审核页一起阅读；其示例的成功页也不能替代服务端付款确认。[^src-creem-quickstart][^src-creem-account-reviews][^src-creem-webhooks]
4. Dodo 允许进入live模式，不等于已经获准收款；能收款，不等于出款已启用；出款启用，不等于达到门槛；Success，不等于本人账户已入账。[^src-dodo-test-live][^src-dodo-verification][^src-dodo-payouts]

## Archive log

2026-10-08通过ego请求10条新增来源的Wayback保存。只有确认快照包含对应正文时才写入 `archive`；没有把超时或存档URL本身当作成功。

| 来源 | 结果 |
|---|---|
| Paddle Identity Verification | 确认快照正文可读，时间戳 `20261008095536`，已登记。 |
| Paddle AUP | 确认快照正文可读，时间戳 `20261008095829`，已登记。 |
| Dodo Merchant Acceptance | 确认快照正文可读，时间戳 `20261008095728`，已登记。 |
| Creem Account Reviews / Payout Accounts | 已生成快照地址，但重读仍为Error 500；不登记archive。 |
| Dodo Account Verification | 保存/读取超时，未确认有效快照。 |
| Creem Test Mode / Quickstart / Webhooks；Dodo Test Mode vs Live Mode | 保存导航超时，观察时仍停在save地址；不登记archive。 |

各来源的短摘录均从当天成功访问的官方原页取得；存档失败不冒充原页核验失败，也不冒充存档成功。

## Open questions

以下问题保留为读者执行中的确认点，不再以“继续泛化调研”代替个案答复：

- Creem 对该申请人的实际KYC证件要求、支付宝年度档位、手续费与换汇口径。
- Paddle / Dodo 到该本人大陆银行账户的具体通道、币种、费用、退汇条件和证明材料；Paddle 的CNY支持不构成银行接受承诺。
- 收款机构如何依合同、产品与交付事实归类该笔收入；具体税目、所得来源及申报义务向主管税务机关确认，沿用第二轮边界。
- 未创建真实商户账户，未提交身份资料，未操作真实付款/出款。因此不能宣传“已实测中国个人到账”。

## Recommendation

补充证据已足够支撑一篇带明确个案确认点的快速入门。遵循现有大纲：三家候选平台的日期化小表，加一条共同流程；选择一家后依次完成产品自查、网站材料、开户/出款确认、测试交付、真实首单、本人账户到账。

正文不承诺无需任何主体登记、固定审核通过日或确定到账金额；无海外公司只描述读者起点，不替代国内经营身份的判断。若具体产品或接收账户未获确认，停在相应步骤即可，不能以借名、虚报或拆分交易来完成里程碑。

对应大纲与外汇税务补充已分别随 PR #2、#5 合并。`quickstart.md` 已按上述边界编写，`last_verified` 只代表公开资料核验；未将个案审核、银行入账或税务适用标为已实测。
