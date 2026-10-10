---
title: 应用商店：从手机任务到持续发布
description: 判断何时值得做 App，把测试、审核、购买恢复和版本维护连成一条可执行的发布路径。
order: 20
volatility: high
last_verified: 2026-10-09
---

“网页已经能用了，要不要再做一个 App？”先别从上架步骤回答。回到用户完成工作的那一刻：他在电脑前整理资料，还是拿着手机在现场记录？安装一个应用之后，哪一步会变得明显更好？如果只能说“看起来更正式”“商店也许会带来流量”，还不足以承担另一套产品的维护。

WANG Shudao 在 Sticki 的 Android 移植周记里，起初以为接好订阅就可以提交，随后却遇到抠图引擎的速度与稳定性取舍、不同设备上的组件尺寸差异，以及英文链接仍是占位地址的问题。下一周，他记录了等待审核、提交工单后上架的过程，也说发文时还没有下载。这段短期经历说明移植、发布和找到用户各有工作要做；它没有证明工单让审核通过，也不足以评价整个商店的流量。[^src-shudao-sticki-porting][^src-shudao-sticki-launch]

本章先做是否投入手机端的选择，再把候选版本送到测试者手里，最后讨论审核、更新和退出。平台规则核验至 2026-10-09；文中的发布记录与设备演示为教学推演，没有实际注册、提交应用或获得审核结果。

## 先决定是否需要商店分发

贯穿本书的周报工具从电脑上的 CSV 开始，用户需要检查项目判断，再把报告交给客户。在这个设定下，先把 Web 这条路做好：App 并没有解决一个已发现的手机任务，重做一套列表和导出按钮还会增加验证范围。Apple 的最低功能指南也要求应用的功能、内容和界面超出重新包装的网站，不能把套壳视为确定的上架路径。[^src-apple-app-review]

但换成“现场拍下问题照片，当场写说明并交付一页报告”，问题就不同了。下面另设一个教学候选：**为使用英语、需要现场交付照片说明的个人服务者做工具**，不声称已经访谈到这类客户。目标是从手机上的 3 张照片完成一份有顺序、有说明、可导出的报告；先比较现有相册加文档模板、手机 Web 样稿、原生样稿，不能只听到“离线”“拍照”便判定必须原生。

<div class="as-table as-choice-table">

| 候选路径 | 先观察什么 | 本例的投入决定 |
|---|---|---|
| 相册加现有文档模板 | 整理顺序、填说明和交付是否已经足够顺手 | 保留为基准；若能完成任务，就不另造工具 |
| 手机 Web 样稿 | 在目标手机上选图、修改、暂存与导出，实际在哪一步受阻 | 先试同一份材料；不能用电脑浏览器的结果代替 |
| 原生样稿 | 能否解决前两条实际暴露的问题，值得用户安装并继续使用 | 只在观察到明确差距后投入，不先承诺双平台 |

</div>

再加一组明确的推演输入：可邀请的 3 位试用者都使用 iPhone，开发者已有可用的 iPhone 和 Mac；试用材料是合成照片，不含真实客户信息。**此时的决定是先安排对照试用；如果仍有需要原生解决的阻碍，再做一个 iOS 外部测试版本**。Android 暂缓，理由是这轮观察与维护能力集中在 iOS，并非 Android 的市场价值较低。用户设备或任务改变，这个选择也应改变。

这份计划先不收费、不设账号、不做云端历史。它让试用者完整地做完一件事，也让开发者少维护尚未证明有价值的路径。Apple 将测试版本放在 TestFlight，正式提交应是可运行、资料完整的版本。[^src-apple-app-review]

<figure class="as-media" aria-labelledby="as-route-title">
<h3 id="as-route-title">从一个手机任务走到可发布版本</h3>
<div class="as-entry">让现有工具、手机 Web 样稿与原生样稿完成同一任务</div>
<div class="as-branches">
<div class="as-stop"><p class="as-branch-label">已有方式够用 ↓</p><div class="as-stop-node"><strong>沿用现有方案</strong> <span>停止新增客户端，继续改善实际使用。</span></div></div>
<div><p class="as-branch-label">仍有明确阻碍 ↓</p><ol class="as-route">
<li><strong>缩小原生样稿范围</strong> <span>先覆盖目标设备与一项完整任务。</span></li>
<li><strong>交给测试者完整做一次</strong> <span>保存材料 → 修改 → 导出 → 重新打开。</span><span class="as-return">↶ 失败 → 修复本构建 → 重新测试</span></li>
<li><strong>提交可重现的审核路径</strong> <span>构建、说明、权限和商店资料一致。</span><span class="as-return">↶ 有问题 → 补材料或修构建 → 再提交</span></li>
<li><strong>发布后观察与维护</strong> <span>安装 → 首次完成 → 持续使用与求助。</span><span class="as-return">↶ 严重问题 → 暂停扩散 → 修复并确认安装</span></li>
</ol></div>
</div>
<figcaption>现有方案够用时就结束客户端投入。进入原生支路后，每次返回修复都要保留版本与问题的对应关系。</figcaption>
</figure>

## 个人与组织账号先按真实身份选择

先做任务比较，不必等于先买齐账号。确定需要哪条测试、分发路线后，再核对真实身份、设备、公开信息与持续成本。

<div class="as-table as-account-table">

| 项目 | Apple Developer Program | Google Play Console |
|---|---|---|
| 入门费用 | 每会员年 99 美元；地区价格可能不同，注册时看当地币种。[^src-apple-enrollment] | 一次性 25 美元注册费。[^src-google-play-enrollment] |
| 身份核验 | 使用法定姓名、联系方式，达到当地成年年龄，开启双重认证。[^src-apple-enrollment] | 按账号类型核验，可能要求法定姓名对应的政府证件和支付卡。[^src-google-play-enrollment] |
| 个人身份与组织 | 个人法定姓名显示为卖家；组织需法律实体、签约权限及相应验证资料。[^src-apple-enrollment] | 公开法定姓名、国家与开发者邮箱；变现时公开完整地址，特定地区可能要求更多。[^src-google-play-account-information] |
| 测试准备 | 外部测试首个构建须先通过 TestFlight 审核；之后正式发布仍需提交审核。[^src-apple-testflight] | 新个人账号另有封闭测试与 Android 设备验证要求。[^src-google-play-enrollment][^src-google-play-testing] |

</div>

开发者展示名称可自定义，也不代表法定身份不会公开。[^src-google-play-account-information] 不能接受个人信息公开时，先比较真实组织路线及后续维护成本，见[身份与主体](/go-global/entity)。不要借用身份、账号或材料。注册费只是起点；本例还要留出支持试用者、处理系统变化和重新验证导出的时间。若这些工作无人承担，第一版能提交也不代表这条路线值得启动。

<span id="google-play新个人账号先安排真实测试" aria-hidden="true"></span>

## Google Play 新个人账号先安排真实测试

截至核验日，2023 年 11 月 13 日后创建的个人账号，需要至少 12 名测试者连续加入封闭测试至少 14 天，之后才能申请生产访问权限。申请还要说明测试反馈、产品与发布准备情况；Google 会审查，参与不足等情况可能需要继续测试。人数和天数满足条件，不是自动上线。[^src-google-play-testing]

这会改变前面的计划：如果改做 Android，新个人账号不能把“已有 3 人愿意试用”直接写成可公开发布的排期。先找愿意完成目标任务的人，说明怎样加入、做什么、怎样反馈，以及需保持加入的时间。设备核验与封闭测试也分别完成。不要购买挂名人数替代实际参与。[^src-google-play-testing][^src-google-play-enrollment]

iOS 外部测试则准备测试说明、反馈邮箱和首个待审构建，通过 TestFlight 管理邀请。不要为了让普通用户试用，就把他们加成开发团队成员。测试结束后选定构建，另行送正式审核。[^src-apple-testflight]

无论哪个平台，反馈最好落到“哪台设备、哪个系统、哪个构建、怎样操作、期望和实际差别”。一句“不能用”无法指导修复，“第 3 张照片写好说明后，切回上一张再返回，文字丢了”才可以复现。

## 把测试记录变成审核材料

继续照片报告的教学候选。假设对照试用后确有值得验证的原生差距，现准备一个只处理本地材料的测试构建。下面是完整的**合成缺陷记录**，用于示范怎样做决定，并非已经跑过这些手机测试。

<div class="as-table as-test-table">

| 任务 | 假设在构建 12 观察到的结果 | 对构建 13 的处理与复测 |
|---|---|---|
| 选 3 张照片，逐张写说明，再改变顺序 | 说明仍按旧序号排列，配错照片 | 以稳定记录标识关联照片与说明；重新排序后逐张核对，再看导出文件 |
| 编辑中切到别的应用，再回来 | 尚未保存的说明消失 | 增加草稿保存和状态提示；分别测试返回、重新打开及存储失败，不能只测一次正常切换 |
| 取消选图，再重新选图 | 留在空白页 | 回到可操作的空状态；取消本次选择不会删除已有草稿 |
| 导出后在另一个阅读器打开 | 文件缺一张图，应用却显示成功 | 以实际文件内容判断完成；失败时保留草稿和重试入口 |

</div>

本例决定：**构建 12 不提交正式审核**。先修照片关联和导出完整性，再复测旧草稿能否被新构建读取。构建 13 只是计划中的修复版本；没有完成实际复测，就不把表里的处理方案写成“已通过”。这比不断增加功能更接近一次负责的发布。

审核者也需要走通同样的工作。Apple 要求完整元数据、可用链接、真机稳定性及必要的登录演示信息；Google 的 App content 则要求准确说明隐私、广告、目标年龄、评级、相关权限和受限访问方式。[^src-apple-app-review][^src-google-play-review-preparation] 下面这段英语可以作为本例的审核说明草稿，待实际构建与路径确认后再使用：

> This app creates a photo report on the device. No account or purchase is required. From the home screen, choose “Try sample report”, reorder the three sample photos, edit a caption, then choose “Export PDF”. The sample report uses bundled demonstration images. User-selected photos and drafts remain on the device. The app has no cloud backup; exported copies are managed by the user. The privacy policy is available from Settings → Privacy.

审核说明应让别人按入口、动作和结果重现这条路径。样例入口必须实际存在；如果换成有账号的产品，就提供可用的专门演示账号、访问说明，并保证审核时相关服务可用。不要写一个审核专用入口来隐藏真实功能。遇到纯元数据问题，Apple 允许修正后重送同一构建；二进制缺陷则要真的修复，回复时写清原问题、修改处与复现路径，可以附截图或说明。[^src-apple-app-review][^src-apple-review-replies]

“不上传照片”也不等于可以忽略隐私。检查构建里是否有分析、崩溃上报或其他第三方代码，以及实际发送了什么。Apple 的隐私申报包括集成方的数据实践；应用提供账号创建时，还要求应用内可删除账号。[^src-apple-app-privacy-details][^src-apple-app-review] 本例没有账号，草稿仍要有删除和导出办法；隐私政策应解释实际数据路径，而非复制别人的云服务条款。具体边界接[合规与边界](/go-global/compliance)。

## 先判断商品和地区，再选择支付入口

照片报告测试版暂不收费，因此无需为了提交而强加购买路径。若后续决定销售导出功能，才进入数字权益的设计：卖什么、在哪些店面卖、用户换设备后怎样恢复、退款后怎样调整权益。这也意味着不能直接复制 Web 章的 MoR 结账按钮。

截至核验日，Apple 的 3.1.1 原则上要求应用内数字功能使用 IAP，并要求可恢复的购买具备恢复机制；3.1.1(a) 明确美国店面可以在不申请该项 entitlement 的情况下提供其他购买方式的按钮或链接，其他特定地区授权及应用类别另有条件。3.1.3(f) 的免费 Web 配套应用还以应用内没有购买、没有站外购买引导等条件为前提。[^src-apple-payment-guidelines] 这些分支不能压成“所有外链都禁止”，也不能泛化成“所有地区都能外链”。

Google Play 的支付政策原则上要求其分发应用的应用内数字交易使用 Play 结算；第 3、8、9 节另列商品例外、符合地区条件的替代结算和外部引导安排，其中相关计划要求注册并接受附加条款。[^src-google-play-payments]

如果本例将来收费，我建议先采用目标店面的商店购买路径，把精力放在权益可靠性上；这是减少第一版路径数量的实施取舍，不表示它费用最低。引入站外购买前，再按具体店面、商品和所需计划核算完整成本。尚未选定销售地区，就保留“不能提交收费版本”的状态，不把英语界面当作全球规则相同。

购买测试至少沿着同一份权益继续往后走：新购买、重装后的恢复、换设备、取消续费、到期、退款以及重复事件。恢复的是购买权益，不等于本地草稿已备份；取消续费也需要和当前服务期结束分开。状态判断的详细示例见[定价与订阅](/go-global/pricing)和[收款与交付](/go-global/payments)。

## 更新出问题时，暂停能做什么

第一次公开发布与以后发布更新，应使用不同的安排。Google Play 的 staged rollout 只用于更新，不适用于首次发布；Apple 的 phased release 也是版本更新功能，按 7 天逐步向符合条件、开启自动更新的用户发布。[^src-google-play-staged-rollout][^src-apple-phased-release] 第一版先通过测试缩小未知，不能在计划里写一个并不存在的“首次上架 1%”。

发布更新时，先找能说明用户损失的信号。本例中，“照片说明错位”“导出的文件缺图”“旧草稿打不开”比总下载数重要；一旦确认可能破坏用户工作，先限制扩散并保留原材料，不要为了观察更多样本继续扩大。

Google 明确说明：暂停阶段发布后，已有新版的用户仍保留该版本。Apple 的分阶段比例针对自动更新，任何人仍可手动下载，并不是所有安装量的硬上限；暂停累计最多 30 天。[^src-google-play-staged-rollout][^src-apple-phased-release] 所以，暂停之后仍要定位受影响版本、修复问题并帮助已有用户更新。

<section class="as-media" data-app-release aria-labelledby="as-demo-title">
<p class="as-kicker">本地教学演示 · 20 台合成设备 · 以 Google Play 更新暂停边界为背景</p>
<h3 id="as-demo-title">暂停以后，已有的 4 台会怎样？</h3>
<p>假设 v1.0 正常，v1.1 导出会漏图，目前有 4 台已安装 v1.1。逐台安装只是演示动作，不代表平台的抽样、传播速度或真实用户。</p>
<ol class="as-devices" aria-label="20 台模拟设备的版本">
<li data-app-device data-version="bad">01 · v1.1</li><li data-app-device data-version="bad">02 · v1.1</li><li data-app-device data-version="bad">03 · v1.1</li><li data-app-device data-version="bad">04 · v1.1</li><li data-app-device data-version="old">05 · v1.0</li><li data-app-device data-version="old">06 · v1.0</li><li data-app-device data-version="old">07 · v1.0</li><li data-app-device data-version="old">08 · v1.0</li><li data-app-device data-version="old">09 · v1.0</li><li data-app-device data-version="old">10 · v1.0</li><li data-app-device data-version="old">11 · v1.0</li><li data-app-device data-version="old">12 · v1.0</li><li data-app-device data-version="old">13 · v1.0</li><li data-app-device data-version="old">14 · v1.0</li><li data-app-device data-version="old">15 · v1.0</li><li data-app-device data-version="old">16 · v1.0</li><li data-app-device data-version="old">17 · v1.0</li><li data-app-device data-version="old">18 · v1.0</li><li data-app-device data-version="old">19 · v1.0</li><li data-app-device data-version="old">20 · v1.0</li>
</ol>
<div class="as-actions" data-app-actions hidden>
<button type="button" data-app-install>模拟下一台装上 v1.1</button>
<button type="button" data-app-halt>暂停 v1.1 发布</button>
<button type="button" data-app-fix disabled>模拟受影响设备装好 v1.2 修复版</button>
<button type="button" data-app-reset>重置演示</button>
</div>
<p class="as-result" data-app-result role="status" aria-live="polite">16 台仍是 v1.0；4 台为有缺陷的 v1.1；0 台装好修复版。</p>
<p data-app-explanation>暂停会阻止本例中的下一台收到 v1.1，已有 4 台仍需修复。发布修复包之后，还要等这些设备实际安装。</p>
<noscript><p>静态结果：4 台已安装 → 暂停 → 仍有 4 台存在问题；只有这 4 台实际装好修复版后，受影响设备数才归零。其他 16 台维持原版本。</p></noscript>
</section>

这个演示里的“装好修复版”是一个已经完成安装的假设，现实中发布修复包和用户收到它之间仍有距离。若问题涉及草稿格式，先保留原文件，测试迁移能否失败恢复；不要把清空数据、卸载重装作为默认修复。对外说明受影响版本、临时办法和修复进展，不需要承诺一个还没有把握的恢复时刻。

## 注册支持、商家资格和银行到账分别确认

收费版本还有独立的财务路径。Google 地区表的 `China` 行支持开发者及商家注册，默认币种为 USD；这是地区级信息，不能推出你的身份、支付资料或银行账户已经通过核验。[^src-google-play-locations]

Apple 收款要求有效的 Paid Apps Agreement、银行信息、超过对应地区最低月度付款门槛，以及完成适用的月度开票要求；满足条件后依财务月安排付款，银行及中间机构可能另收费。[^src-apple-payouts] 预算应分开会员费、商店交易成本、收款与汇兑、自己的申报责任；商店处理某项交易税，并不替代开发者全部税务判断。

申请前，把主体和支付资料地区、法定姓名、本人或本主体账户、币种、银行材料与平台付款条件写在同一份确认记录中。尚未核清的银行条件不要填成“支持”。具体查款和申报底稿已在[提现与结汇](/go-global/payouts)及[税务](/go-global/tax)展开，这里不再重复一套账。

<span id="中国境内app服务另核对备案" aria-hidden="true"></span>

## 中国境内 APP 服务另核对备案

工信部通知要求，在中国境内从事互联网信息服务的 APP 主办者履行备案，由网络接入服务提供者或分发平台通过相应系统提交；已有网站备案也需补充 APP 信息。[^src-cn-app-filing] 海外商店审核结果不能替代这项判断，开发者国籍也不能单独回答应用的实际服务范围。

如果本例准备增加中国大陆服务，先整理照片处理是否联网、域名与网络资源、服务和分发地区、主办者住所及实际功能，向住所地通信管理部门和分发平台核对所需办理事项。不要先开放服务，再希望另一地商店的审核结果能覆盖。

## 用四个里程碑验收

把前面的取舍收进一份发布记录，后续每次扩大范围都能看见还缺哪项结果：

<div class="as-table as-milestone-table">

| 里程碑 | 本例留下的决定 | 继续推进前需要的结果 |
|---|---|---|
| 值得投入手机端 | 周报保留 Web；照片报告先与相册加模板、手机 Web 做对照 | 找到不能以可接受代价解决的具体阻碍 |
| 可交给测试者 | 条件满足时先做 iOS；同一份 3 张照片材料，暂不收费、无账号 | 外部测试条件满足，试用者可以独立完成选图到导出 |
| 可公开分发 | 构建 12 暂缓；构建 13 先修关联、草稿和导出问题 | 实际复测、分发地区和商店资料确认，再提交审核 |
| 能持续维护 | 保留本地草稿；导出严重故障时暂停更新并跟进修复 | 确認受影响版本与修复安装；收费时另验权益、财务与到账 |

</div>

最后给维护工作留一个停止条件。Panic 在 2018 年解释停售 Transmit iOS 时，并非说产品没有用：它有喜欢它的用户，却没有足够收入覆盖持续开发。团队同时安排最后一次更新、继续运行同步服务，并给近期购买者提供求助入口。[^src-panic-transmit-ios-retirement] 这是一家已有多款产品团队的历史选择，不是大陆个人必须采用的商业模式；它提醒我们，停止新增销售以后，已经依赖产品的人仍然需要交代。

如果照片报告工具最终停止维护，至少先给用户清楚的导出方法、支持截止安排，以及付费权益、订阅和数据如何处理的说明，再按实际商店规则操作。没有云端历史的产品尤其不能把“重新下载应用”写成“找回全部报告”。有关账号、数据与事件恢复，继续读[风控与账户安全](/go-global/risk)。

如果用户的工作主要发生在网页或另一款软件里，先读 [AI、API 与插件专项](/go-global/ai-api-extensions)，比较插件入口与独立应用；其中 Chrome 的权限和发布安排另行展开，不套用本章的手机应用流程。
