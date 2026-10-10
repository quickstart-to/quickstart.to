# 出海主题：产品、运营与上线边界调研

日期：2026-10-08—2026-10-09。选品章复用10月8日已核验的产品准入资料；其余新增公开来源于10月9日使用ego浏览器读取。没有进行真实开户、消费者交易或对外推广。

## Questions

- 选品：用一手创业方法资料区分用户过去行为、口头兴趣与真实购买证据；产品适配复用已核验MoR政策。
- 定价：核对Creem/Paddle官方订阅、试用、取消与退款文档；分开商业建议、平台行为和消费者法律要求。
- 基础设施：核对Cloudflare域名/密钥、Google邮件发件规则，以及中国官方互联网信息服务备案与APP备案范围；不以“服务器在海外”概括所有义务。
- 获客：查Product Hunt、Reddit、Hacker News、X的官方发布规则和Google搜索指南；不从第三方增长教程推导平台政策。
- 合规：查欧盟GDPR、Cookie与数字服务消费者规则，以及中国个人信息保护法，区分地域适用、角色、法律依据和具体实现。
- 应用商店：查Apple/Google个人账号、费用、身份、测试、销售地区和出款条件；应用内支付规则复用已核验原文。
- 风控：查支付平台拒付/资金限制官方处理路径及OWASP认证建议；不承诺提交材料必解封或以换号规避限制。

英文按官方产品/政策名称检索，中文按法规及监管机构名称检索。每项结论优先读取官方原文，记录短摘录；对高波动来源请求存档，只有确认读取后填写archive。

## Findings

以下30项均为confirmed：确认官方文档的公开表述，不代表具体商户、司法辖区或银行已批准。短摘录分别保存在sources/excerpts，对应URL、标题、发布方和日期在sources.yaml。

- **Subscriptions**：订阅按周期扣款；试用、未付款、有效和期末取消为不同状态；生产应使用webhook同步权益。[^src-creem-subscriptions]
- **Show HN Guidelines**：Show HN须为本人参与且可供尝试的作品；不接收纯落地页；不要请朋友投票或评论。[^src-hn-show]
- **Product Hunt Launch Guide**：鼓励作者自行发布，不要求第三方hunter；不能直接要求投票；发布入口为Submit/New Product。[^src-ph-launch]
- **Refunds and Cancellations**：支持即时或期末取消、客户门户取消以及全额/部分退款；退款、取消、权益更新是分别处理的事项。[^src-creem-refunds-cancellations]
- **Spam**：禁止重复或未经请求的大量互动；社区另有规则且由版主判定，不存在本文可据以宣传的统一推广比例。[^src-reddit-spam]
- **Authenticity**：禁止批量未经请求的回复/私信、重复内容及互刷互动；不得通过新账号绕过封禁。[^src-x-authenticity]
- **搜索引擎优化（SEO）入门指南**：不保证收录或排名；提供独有实用内容、描述性标题/链接、检查抓取与规范网址；站点地图不是排名保证。[^src-google-seo-starter]
- **Trials**：免费试用会验证并保存卡且期满自动按常规价扣款；付费试用取消不自动退试用费；修改试用仅作用于之后新建订阅。[^src-creem-trials]
- **Email sender guidelines**：个人Gmail发件认证要求区分所有/批量发送者；建议SPF、DKIM、DMARC及清晰退订；配置不保证投递。[^src-gmail-senders]
- **Secrets**：敏感API密钥使用secrets而非配置中的明文vars；本地密钥文件不提交Git；环境需分别配置。[^src-cloudflare-secrets]
- **Managing Subscriptions**：升级/降级立即生效，差额处理按update_behavior；改产品价格仅用于新结账，既有订阅不自动变价且迁移不自动通知客户。[^src-creem-subscription-changes]
- **Cloudflare Registrar**：Cloudflare Registrar默认开启域名自动续费；域名购买和续费、DNS及密钥是不同运维事项。[^src-cloudflare-registrar]
- **Data protection under GDPR**：GDPR适用范围、合法处理依据、处理者合同、跨境传输及数据主体权利；删除权存在例外。[^src-eu-gdpr-business]
- **中华人民共和国个人信息保护法**：个人信息处理的地域范围、最小必要、合法依据、告知、委托、跨境、安全及删除义务。[^src-cn-pipl]
- **互联网信息服务管理办法（2024年修订文本）**：境内互联网信息服务的许可与备案区分；不能仅按软件是否收费推定具体许可类别。[^src-cn-internet-services]
- **关于《互联网信息服务管理办法（修订草案征求意见稿）》再次公开征求意见的通知**：2026年7月3日发布的文本明确为修订草案征求意见稿，不能当作已生效规则。[^src-cn-internet-services-draft]
- **工业和信息化部关于开展移动互联网应用程序备案工作的通知**：在中国境内从事互联网信息服务的APP主办者须备案；网站备案不能替代APP信息补充。[^src-cn-app-filing]
- **Online privacy**：严格必要Cookie与需同意的追踪Cookie不同；需要同意时须先取得同意再设置，撤回应同样方便。[^src-eu-cookies]
- **Returns**：欧盟远程消费合同通常有14天撤回期；数字内容和已完全履行服务的例外有明确同意等条件，不能笼统排除SaaS退款。[^src-eu-withdrawal]
- **Become a member**：个人以法定姓名注册并显示为卖家；需双重认证；年费99美元或当地币种；组织验证另有要求。[^src-apple-enrollment]
- **Overview of receiving payments**：收款需有效付费App协议、银行资料、达到地区门槛及适用开票要求；按Apple财务月结算，可能有银行费。[^src-apple-payouts]
- **Get started with Play Console**：注册费25美元一次性；需身份核验，新个人账号有测试及Android设备验证要求。[^src-google-play-enrollment]
- **App testing requirements for new personal developer accounts**：2023年11月13日后创建的个人账号须至少12名测试者连续加入封闭测试14天，满足条件后申请生产权限而非自动上线。[^src-google-play-testing]
- **Supported locations for developer and merchant registration**：官方表China行开发者与商家注册均为支持、默认币种USD；不等于个案银行账户核验通过。[^src-google-play-locations]
- **Authentication Cheat Sheet**：认证防护包括多因素认证及登录限速；需兼顾账户锁定安全与可用性。[^src-owasp-authentication]
- **回应争议**：争议需按个案截止日回应，证据应针对争议原因；正式争议须走争议流程而非额外退款。[^src-stripe-disputes-response]
- **小型个人信息处理者个人信息保护简化措施规定**：2026年9月1日起对境内处理不满10万人个人信息的处理者提供有条件简化措施，不等于免除个人信息保护义务。[^src-cn-small-data-processors]
- **促进和规范数据跨境流动规定**：数据出境机制按数据类别、人数和场景区分，符合条件可豁免三项机制，但仍须依法履行告知等义务。[^src-cn-cross-border-data]
- **Refunds and Chargebacks**：MoR处理拒付不意味着卖家免损失：退款从出款扣除，原交易处理费不退、拒付另有费；过多拒付可能暂停账户。[^src-creem-chargebacks]
- **Consumer rights directive**：欧盟消费者权利指令涵盖售前信息与远程合同撤回；2023/2673修订自2026年6月19日起适用，具体实施需核对成员国。[^src-eu-consumer-rights-directive]

选品章复用已核验的Paddle AUP、Dodo Merchant Acceptance、Creem Account Reviews；访谈方法、试验门槛与虚构例子是本指南的建议，不声称有统计上的成功保证。[^src-paddle-aup][^src-dodo-merchant-acceptance][^src-creem-account-reviews]

## Contradictions

- Creem的trialing和active状态不直接等于本期钱已收妥；期末取消仍保留本期权益。退款、取消续费、法定撤回及权益变更分别处理。
- Creem修改产品价格不改变旧订阅；升级/降级按当前文档立即改变方案，差额行为另由参数决定。旧的proration-charge参数现已标为deprecated，不能按旧教程写成必然延期扣差额。
- Product Hunt允许请人访问、评论但不能直接索票；Show HN明确不能请朋友投票或评论，不能共用发布模板。Reddit没有本轮可支持的统一推广比例。
- Apple个人卖家展示法定姓名；Google Play国家表分开发者、商家、默认币种，不能由China行推导某银行一定到账。新个人账号封闭测试达标后仍需申请生产权限。
- 互联网信息服务管理办法读取2024年修订转载文本；2026年7月网信办页面明确是再次征求意见，草案中的核准等措辞不能直接写成已生效义务。APP备案范围按境内从事互联网信息服务判断，不能只看开发者国籍。
- PIPL允许多种合法处理依据；小型处理者简化规定已于2026-09-01生效，含有条件简化及出境机制豁免，但不是隐私义务全免。出境还需结合2024规定判断数据类别、人数与用途。
- 欧盟数字内容的撤回例外不等于所有SaaS无退款义务。2023/2673修订适用时间可由委员会页面确认，但EUR-Lex法规与合并文本本轮均重定向到临时不可用公告；未把未读到的具体条款或各成员国落地细则写成已核验。

## Open questions

- 欧盟2026年线上撤回功能的具体适用条件、界面要求及目标成员国实施细节仍需专项核验。正文把它列为面向欧盟消费者上线前的待确认项，不把本章当完整法律意见。
- 各地ICP许可分类、APP分发、敏感信息/未成年人、代表/DPO/影响评估及数据出境安排必须结合实际业务判断。
- 未实测商户注册、银行出款、商店上架、付费转化或邮件送达率。身份、外汇及税务个案确认点沿用既有调研。
- 官方文档可变；会员价格、测试门槛、平台争议政策及2026法规变化应在操作前复核。

## Recommendation

按已同意大纲补齐剩余七章。把操作建议与平台行为、法律要求分开，商业计算明确为虚构且不作税务口径。章节互相链接，同一主题持续更新PR #8；专题继续draft，未做全专题的新一轮事实复核，不能仅因章节齐全升级beta。既有章节核验日期保持不变。

## Archive requests

本轮请求了Creem订阅、取消与退款、Show HN、Product Hunt、Reddit、X和Google SEO页面的Wayback快照。服务返回活动会话限流，并在订阅与Google SEO存档请求期间出现页面无响应；恢复浏览器后未继续批量请求其余来源，以免重复触发限流。

Show HN返回2026-10-05旧快照，Creem取消与退款返回2026-09-16旧快照；这些不是10月9日的新核验存档，且本轮未逐条比对旧版本，故未向新增来源填写archive。Product Hunt限流，Reddit、X请求未取得确认地址，其余新增来源尚未完成存档。所有accessed日期仍来自直接读取官方页面，不能由存档请求替代。后续可在服务恢复后补快照。

## Validation

- `pnpm validate`及`pnpm build`通过：0错误，4条既有未引用来源警告；生产构建生成15页。
- `pnpm check`：0错误、0警告、0提示。
- ego逐章读取七个新章节全文；桌面及390px手机布局检查通过。七章无引用目标缺失、无页面横向溢出，canonical URL保持无语言前缀。
- 构建产物检查：12个章节/变更页中的223个内部链接、240个引用链接均找到目标；未残留原始引用占位符。此次没有新增页面样式或工具代码。
