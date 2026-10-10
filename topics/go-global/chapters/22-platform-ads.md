---
title: 分平台投放操作：从一条广告，到一次能解释的试验
description: 展开 Google Search、Meta、Reddit、TikTok 和 LinkedIn 的账户前提、设置、素材与转化核对，用完整试验单和搜索词互动判断该改哪里、何时停投。
order: 8
volatility: high
last_verified: 2026-10-10
---

广告上线以后，最容易得到的是一张不断变化的报表：曝光、点击、注册，还有一个看起来越来越低的单次成效费用。最难回答的反而是，来的人是否需要你的产品，以及这笔钱有没有买到下一次值得继续的理由。

[持续获客](/go-global/growth)讨论了何时选择付费渠道。这一章把它往前推进一步：怎样准备账户，把目标翻成平台设置，让素材和落地页说同一件事，再沿着实际使用找到问题。下面展开 Google Search、Meta、Reddit、TikTok 和 LinkedIn 五种操作路径；本章以网站试用、购买和团队线索为对象，应用安装、商店广告、X 和 Microsoft Ads 的具体操作另有账户与测量要求。

<figure class="ads-media ads-route" aria-labelledby="ads-route-title">
<h2 id="ads-route-title">先找到用户此刻在做什么</h2>
<div class="ads-routes">
<a href="#ads-google"><span class="ads-symbol" aria-hidden="true">⌕</span> <strong>正在寻找办法</strong> <span>Google Search<br>搜索词 → 对应任务页</span> </a>
<a href="#ads-meta"><span class="ads-symbol" aria-hidden="true">▷</span> <strong>刷到一段演示</strong> <span>Meta / TikTok<br>看懂结果 → 愿意尝试</span> </a>
<a href="#ads-reddit"><span class="ads-symbol" aria-hidden="true">↔</span> <strong>正在讨论相关问题</strong> <span>Reddit<br>讨论语境 → 可信的提议</span> </a>
<a href="#ads-linkedin"><span class="ads-symbol" aria-hidden="true">◎</span> <strong>负责一项团队工作</strong> <span>LinkedIn<br>岗位任务 → 合格的下一步</span> </a>
</div>
<figcaption>这是选择起点的图，不是平台效果排名。用户尚未理解任务时，搜索广告也可能没有合适的查询可以承接；一张受众标签表同样不能证明谁愿意购买。</figcaption>
</figure>

## 小额试投为什么常常得不出答案

2024 年，独立游戏 Smoothcade 的作者在 Reddit 分享了一次发布前试验：Facebook、Reddit、X 和 Google 各投入 100 美元，TikTok 另试了 15 美元。游戏面向家庭游玩，作者补充说自己投美国部分地区，发行商另做全球推广。它提供了一个很有价值的观察入口：同一款游戏，在不同地方被看见的方式确实不同。[^src-smoothcade-ad-experiment]

但它不足以告诉你该投哪一家。帖中没有可比较的购买记录；作者称 Reddit 带来最多点击，公开数字却是 Google 830 次、Reddit 484 次。TikTok 的预算与目标也不相同。我们可以借鉴他记录素材和人群的方法，却不能把这张表复制成软件产品的平台排名。一个家庭游戏的预发布点击，也不能替代一个工作工具的独立完成与付费。[^src-smoothcade-ad-experiment]

PostHog 的经验从另一个方向补上了这个问题。这个开发者工具团队建议广告试验要有持续投入，也提醒读者：有人可能先读过文章，后来搜索品牌，再点击广告；最后一个广告标签会让人高估买量的作用。文中每渠道约 500 美元、两周的安排是他们的经验，并非平台最低消费，更不是个人开发者必须凑出的入场费。[^src-posthog-developer-marketing]

因此，第一轮最好只回答一个较小的问题：**某一类任务查询，能否把人带到一页他们看得懂、做得完的产品入口？** 如果想同时判断五个平台、三种人群和四版素材，预算会被拆得很薄，最后很难知道是哪一个环节有问题。

## 开户地区、投放地区和付款身份要分开

你在中国大陆经营，想让美国用户看到广告，并不意味着该把广告账户注册成美国主体。先按真实身份核对账户类型、文件、付款资料与可服务地区，再看这个账户能投什么产品、什么市场。

截至 **2026-10-10**，Google 的 China 广告主验证说明分别列出了组织和个人文件，个人部分包括中国政府签发的相应证件；提交信息须与付款资料匹配。这说明存在个人身份的文件路径，不能据此保证具体账户、产品广告或支付方式获批。[^src-ads-google-verification-cn]

TikTok 要更谨慎。此次读取的 Business Center 自助开户地区列表没有中国大陆。它限定的是“不经过 TikTok 代表的自助创建”路径；如果考虑代表或服务商，应先向官方确认本人业务的适用方式、费用和账户控制权，不能借一个外国地址把未知变成已通过。[^src-ads-tiktok-regions]

给自己留一份简短的开户记录就够了：实际经营者和地区、账户及账单主体、目标市场、产品网址、付款方式、待提供文件、官方回复链接。Meta、Reddit 与 LinkedIn 的操作说明也不等于对你的账户作出准入结论；例如 Reddit 的创建流程要求先准备付款方式并审查广告政策，LinkedIn 则明确要求有效付款方式，广告上线前还要审核。[^src-ads-reddit-standard][^src-ads-linkedin-setup]

<figure class="ads-media" aria-labelledby="ads-ready-title">
<h3 id="ads-ready-title">广告发布前，两条准备线要同时走通</h3>
<div class="ads-parallel">
<div><strong>账户与材料</strong> <span>真实身份、付款、市场和产品政策<br>↓<br>素材使用权、实际承诺、联系入口</span> </div>
<div><strong>产品与记录</strong> <span>手机可读、链接可达、任务做得完<br>↓<br>事件含义、重复检查、金额与币种</span> </div>
</div>
<p class="ads-join">两边都具备依据 → 保存设置快照 → 提交审核 → 确认状态与排期后观察</p>
<figcaption>一条线缺证据，就保留草稿。审核通过也不证明落地页好用或广告能赚钱。素材核对可接着读<a href="/go-global/rights-clearance">名称、素材与代码权利</a>。</figcaption>
</figure>

<span id="ads-google"></span>

## Google Search：把一类查询接到一项任务

下面沿用本书的本地 CSV 周报工具，另设 **AD-01 教学试验**：大陆个人开发者，为自己给客户写更新的小型网站设计工作室提供浏览器工具；CSV 不上传，不加 AI 或云端历史。为演示地区设置，假设这一轮只考察美国、使用英语并提供英语异步支持，这不是已验证的市场选择。媒体费最多 60 美元，观察 7 个日历日，另留 6 小时整理材料和记录；开户、税费、汇兑和真实投放均未执行。下面先看修订草稿；后文会回到一份使用宽泛关键词的合成初版记录，解释为什么要收窄。

优先写 Search 草稿，是因为这个例子有一个可提出的查询假设：有人正在找“用 CSV 做客户报告”的办法。它不一定成立，词太窄可能没有量，词太宽又可能吸引股票研究、学生作业或模板下载者。第一轮就是要把这种差别看清楚，而不是预设搜索流量更容易成交。

### 先写广告与首屏，再进入后台

<figure class="ads-media ads-intent" aria-labelledby="ads-intent-title">
<h3 id="ads-intent-title">同一项任务，要在三个地方认得出来</h3>
<ol class="ads-chain">
<li><strong>搜索意图</strong> <span lang="en">client report from CSV</span> <small>要整理自己的客户更新</small> </li>
<li><strong>广告提议</strong> <span lang="en">Turn CSV Into Client Reports</span> <small>说明输入与结果，不承诺虚构效率</small> </li>
<li><strong>页面第一步</strong> <span lang="en">Try a sample report</span> <small>先看样本、字段和输出，再用自己的文件</small> </li>
</ol>
<figcaption>教学文案结构图，不是 Google 后台截图或已获准展示的广告。查询、广告和首屏若各说一件事，增加预算只会让更多人遇到同一处断点。</figcaption>
</figure>

给 AD-01 准备的英文素材可以具体到下面这一步。它沿用 20 美元购买 30 天使用权、不自动续费的教学报价；只有真实功能和收费路径已具备时，才能拿去投放。

<div class="ads-copy" lang="en">
<p><strong>Headline candidates</strong> <br>Turn CSV Into Client Reports<br>Preview Before You Export<br>Keep CSV Files in Your Browser</p>
<p><strong>Description</strong> <br>Build a client report from CSV. Check the preview, add your judgment, then export.</p>
<p><strong>Landing page opening</strong> <br>Make a client update from the hours you already recorded. Try the sample first to see the required columns and the report layout. Your CSV stays in this browser; you review the totals and write the project assessment.</p>
<p><strong>Offer and action</strong> <br>Full access: $20 for 30 days. No automatic renewal.<br>Try a sample report · See input requirements</p>
</div>

这里没有“节省 80% 时间”，因为我们没有那份证据。页面也不该先要求陌生人交出真实客户文件，再告诉他产品做什么。样本、字段和错误恢复可以参考[首次使用体验](/go-global/first-use)；试用究竟开放哪些功能，需要与真实权益一致。

### 把试验单翻成系列设置

Google 当前的创建流程依次涉及目标、Search 类型、投放设置、广告组、广告和预算；新账户的引导可能与文档不同。下面给出 AD-01 的选择及理由，字段位置以当前账户为准。[^src-ads-google-search]

1. **系列与出价。** 命名为 `AD01_US_EN_CSV_Search`，先保存草稿。本轮为了检查查询与页面，选择 `Maximize clicks` 的有限探索；这不是购买优化。系列需要配置转化目标；本例将“自带任务完成导出”设为主要观察结果，付款另列次要转化，不创建把两者混在一起的 custom goal。这里仍按点击出价，主要事件的设置不会把 Maximize clicks 变成购买优化。先按后文的事件定义测通，再发布。Google 文档列出的 Search 总预算可用策略包括 `Maximize clicks`。[^src-ads-google-search][^src-ads-google-total-budget][^src-ads-google-goals]
2. **地区、语言与网络。** 教学设置选美国和英语，地区选项用 `Presence`，对应可能位于或经常位于目标地区的人。默认的 `Presence or Interest` 还包括对当地有兴趣的人，且两种定位都不是百分之百准确。为了让这轮更容易解释，暂不纳入搜索合作伙伴与展示网络；这是缩小观察范围的取舍，也可能减少机会。[^src-ads-google-location][^src-ads-google-search]
3. **一个标准广告组。** 先放“从 CSV 整理客户更新”这一类意思相近的候选，例如 `"client report from csv"`、`[csv client report]`。选择词组或完全匹配可以收窄起点，但完全匹配仍可能覆盖相同含义或意图，不能理解成逐字相等。它也可能错失用户真正使用的词；若没有量，先回到查询和表达，不直接扩大到所有 `report`。[^src-ads-google-search][^src-ads-google-match]
4. **素材与目标网址。** 使用上面的素材候选，最终 URL 指向能直接尝试该任务的页面；显示路径不能替代真实落地地址。预览手机裁切、文字和按钮，标明来源的 URL 参数只写渠道/素材编号，不放邮箱、客户名或文件内容。[^src-ads-google-search]
5. **预算与排期。** 在支持该选项的新建 Search 系列里，选 60 美元总预算和 7 天起止日期，不与其他系列共享预算。Google 目前说明总预算不会被超额计费，但没有每日消费上限，可能较快花掉；已有日预算系列不能直接改预算类型。若账户没有该选项，先重新核对适用条件，不用一个看似相等的日预算悄悄替代。[^src-ads-google-total-budget]

<aside class="ads-note" aria-labelledby="ads-budget-title">
<h3 id="ads-budget-title">“每天 10 美元”和“总共 70 美元”不是一回事</h3>
<div class="ads-budget-pair"><div><strong>平均日预算</strong> <span>多数 Google 系列单日可计费至 2 倍；整月通常按 30.4 倍计算。</span> </div><div><strong>系列总预算</strong> <span>控制整个排期的总额；没有每日硬上限，不能用总额 ÷ 天数当保护线。</span> </div></div>
<p>本例选择总预算，是为了限制这一轮可能花掉的媒体费。它不包含对税费、汇兑或全部现金成本的保证；若连总额也承受不了，就先不发布。</p>
</aside>

以上日预算规则有适用例外，预算变更和月中开始也会改变计算；应在预算报告中区分展示产生的成本与最终可计费成本。[^src-ads-google-limits][^src-ads-google-total-budget]

发布之前，留下目标、主要事件、出价、地区选项、网络、预算类型、起止时区和最终 URL 的设置记录。后一轮只改有理由改变的部分，才能回头知道花费变化对应了什么。

<span id="ads-meta"></span>

## Meta：先选要发生的动作，再拍素材

在 Facebook 或 Instagram 上，用户往往先看到一个结果，再决定这是否与自己有关。把 Search 的文字搬过来，配一张软件首页，不一定能让人看懂。周报工具更值得演示的是：已有的工时表怎样变成一份可核对、可加判断的客户更新。

Meta 的系列层决定广告目标，广告组层组织受众、版位、预算和排期，广告层设置素材、链接以及代表业务的主页/账户。先沿这三层写清楚，再看是否启用了系列预算等会改变预算分配的选项。[^src-ads-meta-structure]

**目标别选成“先买便宜点击再说”。** 如果这一轮只想检查有人是否愿意打开样本，可以用流量目标，但结论也只到访问；如果已具备可靠的购买测量且要学习购买，就围绕销量目标配置对应动作。Meta 的流量、潜在客户和销量目标分别服务不同结果，选择更靠近购买的名字不会自动补上事件或产品问题。[^src-ads-meta-objectives]

例如，若另开一轮只验证样本入口的 Meta 试验，草稿应写成“流量目标 → 网站 → 样本页”，而不是沿用 AD-01 的 Search 设置。先核对所选目标下的成效目标及可用事件，再选择可服务地区和语言，记录受众限制、可扩展建议与版位；不要假定输入了兴趣就只会触达那一小群人。只准备两个有实质差别的素材，例如一个从“手工拼报告”的麻烦开始，一个先给出完成后的预览。让它们指向同一页面、使用同一报价；这有助于解释观察，但常规自动分配下的两条广告不是随机对照试验。

<figure class="ads-media" aria-labelledby="ads-story-title">
<h3 id="ads-story-title">一段演示，先让人看见任务怎样完成</h3>
<div class="ads-storyboard">
<div><span class="ads-time">0–3 秒 · 设定</span> <div class="ads-frame"><div class="ads-sheet"><span>Project North</span> <span>Design · 3 h</span> <span>Review · 2 h</span> </div></div><strong>从已有记录开始</strong> <p>“Still rebuilding client updates from a spreadsheet?”</p></div>
<div><span class="ads-time">3–8 秒 · 过程</span> <div class="ads-frame"><div class="ads-report"><span>Project North</span> <b>5 h</b><span>Check totals → Add assessment</span> </div></div><strong>展示核对和判断</strong> <p>镜头停在预览，不把自动汇总演成自动判断项目进度。</p></div>
<div><span class="ads-time">8–15 秒 · 下一步</span> <div class="ads-frame"><div class="ads-sample"><span>Sample report</span> <span class="ads-fake-button">Try the sample →</span> </div></div><strong>给出低负担入口</strong> <p>展示样本按钮与输入要求，落地页接着完成同一件事。</p></div>
</div>
<figcaption>可用于筹备 Meta 或 TikTok 素材的教学分镜；时间是创作安排，不是平台规定。图中是合成材料，无真实客户文件，也不是已投放视频。</figcaption>
</figure>

预算尤其值得多看一眼。Meta 当前的说明里，完整一周日预算保持不变、关闭广告组预算共享时，某天可能花到日预算的 175%，周内最多 7 倍；开启共享或周中修改还会有不同计算。不要把“每天 10 美元”写成给自己或客户的每日现金保证。若这是一笔固定试验，检查当前支持的总预算、排期与花费控制，再决定能否承担。[^src-ads-meta-budget]

判断素材时，把点击、页面打开、独立完成和购买分开看。若开头吸引了很多人，进入页面却找不到视频里的结果，先修承诺与交付。若已有完成和购买，却只有极少样本，保留素材并继续观察的理由也应来自可承受的投入，而不是急着宣布一个“赢家”。

<span id="ads-reddit"></span>

## Reddit：选中了社区，也不等于买下了那个版块

Reddit 适合先从讨论中理解措辞：人们怎样描述工作、讨厌哪种解决办法、愿意打开什么示例。自然参与和广告投放是两件事；广告通过审核，也不能拿来推断同一社区允许发推广帖。

创建 Standard campaign 时，系列层设置目标和可选的花费上限，广告组设置人群、排期与出价，广告层放素材和跟踪链接。先选一个与任务有关的人群假设，核对地区、预算和实际可用的定向，再用测试 URL 检查最终广告及页面。[^src-ads-reddit-standard]

这里最容易误解的是 community targeting。当前规则包括订阅或近期接触相关社区的人，广告可能在他们浏览 Reddit 的其他地方出现，并非只展示在所选 subreddit 内；也不是所有社区都可供投放。自动定向还可能拓宽到原本选择之外。[^src-ads-reddit-audience]

对周报例子，素材可以直接展示一小份输入与输出，说明“需要你自己检查合计并写判断”。素材文案可以写成：

> I built a CSV-to-report tool for client updates. Try the sample to see the input columns and output. You check the totals and write the assessment; the tool does not decide project status.

这份教学文案说明了制作者身份与工具边界；不要写成冒充普通用户的推荐。先调查真正谈客户交付的社区，广告后台中不可用就记下来；不要为了凑够受众而加一串只有“创业”或“软件”关系的大社区。

如果小范围几乎没有投放，先看可用人群和预估，决定是否值得换一个假设；扩大兴趣范围会改变试验对象，不是无代价的修复。如果有点击却没有尝试，回头看广告是否吸引了讨论者、围观者或免费模板需求者。平台提供的兴趣/社区统计帮助定位这类差异，仍不能证明点击者的实际岗位与购买意愿。[^src-ads-reddit-audience]

<span id="ads-tiktok"></span>

## TikTok：先核准入与预算，再决定是否值得做视频

对 AD-01，TikTok 暂不进入本轮付费执行：自助开户路径尚未确定，60 美元也不适合硬套一周的广告组试验。当前预算文档要求每日系列预算超过 50 美元、广告组超过 20 美元；广告组总预算最低按排期天数与最低日预算计算。仅 7 天广告组的这项计算就达到 140 美元，已经超过本轮媒体额度。[^src-ads-tiktok-regions][^src-ads-tiktok-budget]

如果你的真实账户、目标市场和预算条件已经具备，再按下面的顺序筹备，而不是先购买一包视频素材：

1. 在系列层先选目标，并区分 `Manual`、`Search` 和 `Smart+`。本节讨论可明确检查设置的 Manual 路线；TikTok 搜索广告是另一条设置路径，不能把视频信息流的观察直接套过去。关联本人可用的 TikTok 账户或获得授权的帖子。[^src-ads-tiktok-setup]
2. 在广告组核对版位、受众、预算/排期及出价和优化动作。流量与后续业务动作分别记录，选择的优化项要与实际能测到的结果一致。[^src-ads-tiktok-adgroup]
3. 用上面的分镜拍一段能看清输入、过程和结果的演示。准备字幕，逐个预览实际版位的裁切与按钮遮挡。真实素材需另核音乐、人物、客户资料及推广用途的权利，不能把网上能播放当作有权投放。
4. 发布前检查手机上的最终页面、样本入口与事件记录。跑起来后分开看播放、访问和使用；很多人看完视频但做不了桌面 CSV 任务，可能是设备与任务不匹配，应先改交付入口或暂缓这条路线。

这也解释了为什么不能为了追求“覆盖所有平台”硬上 TikTok：有些产品一眼能演示，有些需要人在电脑前准备材料。先用已有的自然分发验证演示是否讲清楚，再判断额外买曝光是否值得。

<span id="ads-linkedin"></span>

## LinkedIn：把一条线索接到团队的下一步

如果卖的是需要几个人共同评估的工具，表单数量不应直接成为成功标准。你需要知道对方负责什么工作、现在怎样完成、谁参与试点、下一次讨论能否具体到材料。相应的页面应介绍一个有限试点，而不是让团队成员独自购买个人版后再去说服组织；试点范围可参考[团队采购与合同交付](/go-global/team-procurement)。

当前 Campaign Manager 的操作围绕 campaign、ad set 和广告展开。在 ad set 中选择目标、人群、格式、版位和转化；如果开启 Dynamic Group Budget，预算、排期和出价策略会移到系列层。多数广告格式要求账户关联 LinkedIn Page，不应把老教程里的层级名称当成永远不变的路径。[^src-ads-linkedin-setup]

一份可执行的草稿可以从这里开始：目标是获得对有限试点的询问，围绕负责客户交付的岗位建立人群，核对公司条件、地区与预估，而不是把“所有经理”都加进来；素材用一页真实样例解释交付范围，表单或落地页询问团队任务与评估角色，并说明联系用途。表单可以只问三件事：“What do you send to clients today?”、“Who would try the workflow?” 和 “What would make a pilot useful?”，联系说明写清用于跟进这次询问。这里的岗位和问题是候选，须在实际后台核对可用选项，也要能由你的服务能力承接。

接下来保存预算和排期，再核对它究竟设在系列还是 ad set。LinkedIn 当前说明，日预算是平均目标，总预算与排期还有最低要求；持续日预算某天可能到两倍，不能拿“日”字当硬上限。[^src-ads-linkedin-budget]

线索进入后，给每条记录留下“已同意联系 → 问题相符 → 能安排评估 → 有限试点”的实际进展。若表单便宜但岗位与任务普遍不符，改人群或承诺；若问题相符但总要你先做一周免费定制，改试点范围。销售周期、后续工时和未回复都要保留，不能把一个下载资料的邮箱算成一个即将签约的客户。

## 转化追踪：先验证“发生了什么”

Bannerbear 创始人 Jon Yongfook 在 2023 年发现，自己以为很糟的注册转付费率，部分来自大量没有后续活动的异常注册。他加入验证、修改入口，也开始低预算 Google Ads；月末更新报告了 754 次注册、64 位新客户。因为多个变化同时发生，这不是一份能证明广告贡献的对照试验，却提醒我们：先查分母和行为，再决定是改产品还是加预算。[^src-bannerbear-qualified-signups]

AD-01 的记录只需要从四个含义清楚的节点起步：

<div class="ads-table ads-events">

| 记录 | 什么时候算发生 | 不拿什么替代 |
|---|---|---|
| 样本开始 | 用户明确打开并开始操作样本 | 页面自动加载 |
| 自带任务完成 | 自带输入通过校验，用户核对并完成导出 | 点击导出按钮却报错；样本完成 |
| 付款 | 订单系统确认相应订单已支付，金额与币种正确 | 点击付款、打开感谢页或重复回调 |
| 退款 | 订单记录确认退款及范围 | 从广告后台删除一行数据 |

</div>

要区分样本、自带任务和受助完成，但不必为此把 CSV 内容传出去。给事件设置最少字段，用内部编号连接订单和退款；是否部署第三方标签、回传哪些字段及保留多久，应先画进[数据流](/go-global/compliance#privacy-boundary-title)，不要在“本地处理文件”的承诺下悄悄扩充数据用途。

在平台里还要核对哪些动作被用于优化。Google 的主要转化通常进入 `Conversions`，并在相应标准目标用于出价时参与优化；次要转化通常用于观察，但放进 custom goal 后也会参与出价。不要让浏览、注册、完成和付款同时被当成几次等价的业务成功。[^src-ads-google-goals]

测试时至少走过一次正常完成、一次失败、一次重复打开和一次取消/退款路径，核对事件名称、触发时机、金额、币种与重复情况。Meta 提供测试事件工具来观察接收、参数和去重，但它特别说明：清除测试动态后，相关活动仍会显示在事件管理、广告报告与受众创建结果里。先安排测试数据的识别与排除方式，不能把“测试”两个字理解成天然隔离。[^src-ads-meta-test]

复盘时让平台报表与自家记录并排：同一时区、同一观察截止日，分别保留点击后与浏览后归因、转化窗口及数据延迟的设置。报表对不上，先查口径和漏记；不能把多个平台归因相加当作新增顾客，也不能把暂时没回传理解成没有成交。需要判断广告到底额外带来了多少结果时，另做适合业务的对照，不能从这一轮的小样本自动推出因果。

<span id="ads-queries"></span>

## 动手看一次：否定词也可能删掉好机会

下面是 **AD-01 初版的合成复盘记录**，不是已执行投放。为演示一次具体取舍，设定初版曾将 `weekly report` 这类宽泛词纳入广泛匹配；这与前面修订草稿中的 CSV 窄词不同，不能读成那两个窄词必然会触发下面全部查询。初版设定已花了 48 美元，取得 50 次点击，4 位不同用户独立完成自己的任务，其中 2 位分别购买一次 20 美元 / 30 天使用权。为解释取舍，例子假定这四组记录能与本次查询完整对应；真实归因可能没有这么齐，未知部分应单列。

<section class="ads-media ads-demo" data-ads-demo aria-labelledby="ads-demo-title">
<h3 id="ads-demo-title">在这份历史表里，哪些查询会被排除？</h3>
<p>切换筛选，观察保留下来的任务和购买。这里比较的是已发生的合成记录，不模拟下一轮广告竞价。</p>
<form>
<fieldset disabled>
<legend>试一种否定词安排</legend>
<label><input type="radio" name="query-filter" value="all" checked> 先看全部历史查询</label>
<label><input type="radio" name="query-filter" value="stock"> 加入否定词 stock</label>
<label><input type="radio" name="query-filter" value="free"> 再加入否定词 free</label>
<button type="reset">重置</button>
</fieldset>
</form>
<div class="ads-table ads-query-table">
<table><thead><tr><th scope="col">查询组</th><th scope="col">点击 / 花费</th><th scope="col">完成 / 买家</th><th scope="col">当前筛选</th></tr></thead><tbody>
<tr data-query="core"><th scope="row" lang="en">client report from csv</th><td>20 / $22</td><td>2 / 1</td><td data-query-status>保留</td></tr>
<tr data-query="trial"><th scope="row" lang="en">free trial csv client report</th><td>4 / $4</td><td>2 / 1</td><td data-query-status>保留</td></tr>
<tr data-query="template"><th scope="row" lang="en">free weekly report template</th><td>16 / $12</td><td>0 / 0</td><td data-query-status>保留</td></tr>
<tr data-query="stock"><th scope="row" lang="en">stock market weekly report</th><td>10 / $10</td><td>0 / 0</td><td data-query-status>保留</td></tr>
</tbody></table>
</div>
<div class="ads-result" role="status" aria-live="polite" aria-atomic="true">
<p><strong data-ads-total>保留的历史小计：50 次点击 / 48 美元 / 4 次独立完成 / 2 位买家。</strong> </p>
<p data-ads-explanation>股票报告与产品任务不同；但免费模板和免费试用也不能只看一个 free 就当成同一种需求。</p>
<p data-ads-removed>当前没有排除任何历史记录。</p>
</div>
<p class="ads-caption">这 48 美元已经花出，切换不会退款，也不表示下次能按相同比例节省。这里仅筛选表内明确包含该词的查询，不实现 Google 的完整匹配或预测模型。</p>
<noscript><p>无脚本时可直接比较：排除 stock 后为 40 次点击、38 美元、4 次完成和 2 位买家；再排除 free，只剩 20 次点击、22 美元、2 次完成和 1 位买家。</p></noscript>
</section>

Google 的否定词有自己的广泛、词组和完全匹配规则，而且不自动覆盖所有近似变体；不能把正向词与否定词按同一种语义理解。[^src-ads-google-negative]

在这份表里，股票查询是明确的错位，可以列入否定候选。免费模板查询值得进一步收窄，但 `free trial` 那组恰好有真正完成和购买的人。更好的下一步是分清“要一份模板”和“想先试产品”，改对应词与页面，而不是为了清除低价流量直接封掉 `free`。只有两位买家也不足以证明某组长期赚钱，保留它是继续观察的理由。

## 花到 48 美元以后，AD-01 怎样收尾

再补一条教学记录：两位买家中一位已全额退款，没有其他购买。因此订单口径是 40 美元已支付、20 美元已退款、20 美元退款后收入。仅扣 48 美元媒体费就剩 **−28 美元**，支付、交付和个人时间还没扣；这已经足以拒绝“现在扩大预算”的提议，但不能证明这个渠道永远无效。

把退款关联回自家订单，不能指望广告报表自己解释客户为什么退。若对方要的是模板，而产品要求整理 CSV，下一轮要修入口与期待；若独立完成后仍觉得不值得，回到产品价值和报价。因缺少足够观察而保持未知，也比编出一个“平均获客成本可接受”的结论有用。

<figure class="ads-media" aria-labelledby="ads-recover-title">
<h3 id="ads-recover-title">报表的症状，决定先动哪一处</h3>
<div class="ads-diagnosis">
<div><strong>没有展示</strong> <span>查审核、付款、日期、人群量与出价约束 → 不先改素材。</span> </div>
<div><strong>有点击，页面没打开</strong> <span>查最终链接、加载、手机与地区访问 → 先恢复入口。</span> </div>
<div><strong>能打开，做不完任务</strong> <span>查广告承诺、输入和首次使用 → 不用加预算掩盖断点。</span> </div>
<div><strong>有完成，购买少或退款多</strong> <span>查用途、价值、报价和服务成本 → 决定修正或停投。</span> </div>
</div>
<figcaption>广告被拒或账户受限时，保存具体原因和材料，按官方流程修正或申请复核；反复换账号、隐瞒身份或更换页面绕过审核，不能修复原问题。</figcaption>
</figure>

<details class="ads-record" open>
<summary id="ads-record-title">AD-01：一份已经填完的试验与复盘单</summary>
<ul>
<li><strong>状态：</strong>教学草稿及合成复盘；没有开户、提交广告或真实支出。实际执行前仍须落实本人资格、付款、数据与素材条件。</li>
<li><strong>要回答：</strong>美国英语候选人群中，这类 CSV 客户报告查询是否对应可独立完成的任务；不检验所有市场，也不宣称建立盈利模型。</li>
<li><strong>修订草稿安排：</strong>一个 Search 系列、一个任务广告组、一页样本入口；Maximize clicks；60 USD 系列总预算、7 个日历日、另计 6 小时。发布前记录账户时区及确切起止时刻，上午与晚间检查；检查频率不能保证每日花费封顶。</li>
<li><strong>立即暂停的情形：</strong>页面或付款失效、事件把失败当成功、身份/政策材料不符。到期或额度用尽结束本轮，不自动追加。</li>
<li><strong>初版观察：</strong>宽泛 report 相关词的合成媒体支出 48 USD；50 点击、4 位独立完成、2 位各付 20 USD，其中 1 位全额退款。余下 12 USD 不视为必须花完的钱。</li>
<li><strong>决定：</strong>暂停扩大；核对退款原因，排除明确错位的股票查询，拆开模板与试用意图。先修页面和记录，再写下一轮假设，不同时换人群、报价和全部素材。</li>
<li><strong>仍未知：</strong>真实需求、未来成交与退款、完整成本、因果增量和各平台个案批准。若主要障碍是产品价值，回到用户任务；若没有足够搜索意图，再考虑能演示结果的信息流。</li>
</ul>
</details>

如果让代理执行，把账户控制权、可改预算、素材版本、事件定义、暂停条件与数据导出一并写入交接；要求对方解释实际使用与订单，不能只交一张点击成本表。PostHog 的原始经验也强调，代理并不能替产品团队承担持续指导、反馈和想法。[^src-posthog-developer-marketing]

完整费用继续接到[付费获客账](/go-global/growth#growth-cost-title)和[经营复盘](/go-global/business-review)；如果产品靠广告、赞助或团队合同收入经营，换成相应的贡献与交付记录，别用个人版的两笔订单替它作决定。
