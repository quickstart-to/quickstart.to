---
title: 名称、素材与代码权利：让发布包里的每一项都有来路
description: 从一次发布前的清点出发，处理产品命名、图片字体、代码依赖、外包与 AI 内容，做出有证据、有取舍、能随版本更新的权利台账。
order: 22
volatility: high
last_verified: 2026-10-10
slug: rights-clearance
---

准备发布的时候，产品往往已经由许多不同来路的东西拼在一起：自己写的代码，网上找到的图标，设计师交来的标志，一份开源字体，还有为了让演示好看而临时放进去的客户截图。

平时它们只是文件。等客户问“我们能把这一包交给自己的供应商继续改吗”，你才发现，“我可以放在网站上”和“客户可以拿走再用”需要分别回答。

本章从这里开始：沿用本地 CSV 周报工具的功能设定，另做一份**教学发布包 R-01 的权利清点**。其中待用素材、委托关系和处理记录都是设定，没有真实采购、商标清查或法律意见。读完会得到一份完整的取舍记录：哪些材料保留，哪些补证据，哪些直接换掉，以及交付方式改变时该重新看哪里。

## 先把使用方式画出来，再去找许可证

一份台账如果只有“名称、链接、许可证”三列，很容易在第一次交付之后失效。网页里的字体会下载到访客的设备；宣传图中的人物可能让人以为他在推荐产品；客户收到源码后，可能打算把它改成自己的产品。材料的来路没有变，接收者和用途却变了。

所以，先给每项材料写一句具体的话。例如：“未修改的 Inter 4.1 字体文件，由我们的服务器随网页提供给访客，用于界面排版。”这比“字体可商用”更容易核对。后面才是许可原文、需要保留的声明、是否允许修改，以及你手中有没有覆盖这些动作的证据。

<figure class="rights-media" aria-labelledby="rights-route-title">
<h3 id="rights-route-title">一项材料，沿着三步进入发布包</h3>
<ol class="rights-chain">
<li><strong>① 找到原件与提供者</strong><span>具体文件、版本、原始地址；谁有权提供它？</span></li>
<li><strong>② 对照这次怎么用</strong><span>展示、修改、下载、交客户；哪些人会收到副本？</span></li>
<li><strong>③ 落实随附条件</strong><span>声明、许可、源码入口或书面授权，放进实际交付物。</span></li>
</ol>
<div class="rights-fork">
<div><strong>证据与用途对得上 → 保留</strong><span>保存版本记录；换用途、换文件或交付对象时返回第 ② 步。</span></div>
<div><strong>有缺口 → 补证据或替换</strong><span>必要材料先问清；不影响任务的装饰可删去。新材料从第 ① 步重查。</span></div>
</div>
<figcaption>这是清点工作的顺序，不是自动判定合法性的规则。公开包里是否真的带上了所需材料，还要在构建完成后检查。</figcaption>
</figure>

不要为了填满台账而收集大量低价值素材。本例的核心是让工作室看懂一份报告，装饰性的团队合影并不帮助完成这个任务。与其花时间追问照片里每一种权利，不如先用自己产品的合成样例说明功能。反过来，若你做的是摄影模板、字体服务或可转售的设计资源，素材就是产品本身；删掉它会改变商品，需要在报价和开发之前把授权谈清。

## 名字值得早查，但“搜不到”还不能结束

Peter Steinberger 在 2026 年介绍 OpenClaw 时，回顾了从 Clawd 到 Moltbot 再到 OpenClaw 的过程。他说，Clawd 是对 Claude 的双关，Anthropic 的法律团队随后请他们重新考虑名称；第二个名字又没有让他满意。第三次命名时，他提到做商标查询、买域名和准备迁移代码。[^src-openclaw-naming] 这是作者报告的一次改名经历，不能据此认定发生过侵权判决，也不能把作者的查询结论当成我们独立完成的清查。

可以借鉴的是工作顺序：名称一旦进入域名、安装命令、邮件、客户文档和社区讨论，改动就会牵连许多入口。早一点做查询，是为了避免在一个尚未站稳的名字上累积这些工作。

先从自己实际要服务的市场查起。WIPO 的全球品牌数据库覆盖多个商标集合，但它自己也提醒，仍应考虑查询国家或地区的登记系统。[^src-wipo-brand-database] 若准备在美国使用名称，USPTO 的清查指南还要求留意相同或相关商品服务上的近似标志，并建议查互联网中的普通法使用情况；只看联邦注册结果不够。[^src-uspto-clearance] 这些范围不能原封不动推广成所有地区的同一套程序。

一次有用的初筛应留下：候选拼写和读音、实际产品描述、目标地区、搜索词与变体、查过的数据库和日期、相关近似结果，以及为什么需要继续调查。域名是否可购买可以一起记，但不要让域名搜索代替这一轮工作。企业名称、产品标志和域名各自的核对，接回[身份与主体章](/go-global/entity)。

<details class="rights-media rights-record">
<summary>R-01 的命名记录：先暂停什么，仍能推进什么</summary>
<p><strong>用途：</strong>用于浏览器周报工具、介绍页和后续客户材料；不是准备转售的设计模板。首批用户的具体国家仍未知。</p>
<p><strong>当前结果：</strong>没有已完成清查的候选名称，也没有真实数据库检索记录。因此不填写“无冲突”，不采购昂贵域名或委托整套品牌视觉。内部继续使用 R-01 作为工作代号，功能研究继续；工作代号本身不构成对外使用许可。</p>
<p><strong>下一份材料：</strong>由经营者确定首先服务的地区，列出两个实际候选和近似词，保留查询结果；相关类别或近似程度拿不准时，将结果连同产品说明交给相应地区的商标专业人士。明确清查意见后，再决定名称和申请安排。</p>
<p><strong>改变这个决定的条件：</strong>已有品牌、即将投放或签署客户合同，就不再把名称当作随时可换的占位词，应提前完成相应核对。</p>
</details>

法律查询之外，还要请理解当地语言的人看看这个名字会让人想到什么。Nathan Barry 的 ConvertKit 改名复盘提供了另一类代价：他们曾筛过许多名称，遇到域名和近似商标的障碍，后来选择 Seva；发布后，一些锡克教受众认为这个有宗教意义的词被商业化使用令人不适，也有人持不同看法。团队与客户交流后，决定退回旧名，并重新安排客户、联盟伙伴和宣传材料的沟通。[^src-nathan-seva]

这段经历发生在 2018 年，文章写于 2020 年。它不是商标侵权案例，也不是对该公司今天名称的说明。它提醒我们，花钱买下一个词之后，仍可能发现不愿承担的含义。对面向海外用户的小产品，早期请几位目标语言使用者解释联想、读音和搜索习惯，比只让朋友投票“哪个好听”更有帮助；这一步仍不能替代法律清查。

## 图片、字体和图标：把“允许使用”读到下一句

搜索引擎能找到图片，只说明图片可被发现。你需要回到原始发布页，确认具体材料、许可版本、提供者和当前用途。即使找到了明确许可，也要继续读它没有授予什么。

例如，Unsplash 的普通许可提供了广泛的图片版权使用权限，但服务条款另列出照片中的商标、可识别人物、艺术作品等权利不在这一授权之内；特定用途可能还需取得其他许可。[^src-unsplash-rights] 这不等于每张照片都不能用，而是“来自 Unsplash”无法回答“能否让图中人物出现在我的产品推荐广告里”。具体图片是否属于普通许可或其他产品，也要在下载时确认。

本例因此移除那张来路未核实的团队合影，改用自己的界面和合成记录制作介绍图。代价是页面没有人物照片的气氛，但它更直接解释产品，也不需要让一个陌生人的面孔承担推荐含义。若人物本来就是广告的核心表达，就应采购覆盖该用途的材料及必要授权，而不是给照片裁个边就继续用。

署名同样要依具体许可处理。CC BY 4.0 的第 3 节要求在分享时保留所提供的作者及相关声明、合理可行的材料链接，标明修改，并附许可文本或链接；第 2 节并不授予商标、专利等所有其他权利。[^src-ccby4-rights] 写一句“图片来自网络”补不上这些信息，更不能为本来没有取得的权限补票。标着别的 CC 组合或版本时，重新读那份条款，别把 CC BY 的结论移过去。

字体有一个容易被误会的地方：用它排出一张图，与把字体文件交给别人，是两件事。以 Inter 4.1 随附的 SIL Open Font License 1.1 为例，许可允许使用、嵌入和再分发，规定随字体副本保留版权声明及许可等条件，同时明确：用这份字体制作的文档不因此必须采用 OFL。[^src-inter-ofl] 下面只改变交付方式，看看需要随包携带什么。

<section class="rights-media rights-demo" data-rights-demo aria-labelledby="rights-demo-title">
<h3 id="rights-demo-title">同一份字体，交出去的东西不同</h3>
<p class="rights-caption">许可阅读示例：未修改的 Inter 4.1，不单独售卖字体。选项是不同交付方案，没有在本页下载或分发该字体。</p>
<form><fieldset disabled>
<legend>接收方会拿到什么？</legend>
<label class="rights-choice" for="rights-web"><input id="rights-web" type="radio" name="delivery" value="web" checked><span>网页及自托管的字体文件</span></label>
<label class="rights-choice" for="rights-raster"><input id="rights-raster" type="radio" name="delivery" value="raster"><span>只有点阵 PNG，没有字体文件</span></label>
<label class="rights-choice" for="rights-bundle"><input id="rights-bundle" type="radio" name="delivery" value="bundle"><span>可编辑模板及字体包</span></label>
<label class="rights-check" for="rights-notice"><input id="rights-notice" type="checkbox" name="notice" aria-describedby="rights-notice-help"><span>安排随字体副本提供版权声明与 OFL 全文</span></label>
<p id="rights-notice-help" data-rights-notice-help class="rights-caption">只讨论未修改的 Inter 4.1，不检查其他素材，也不判断整个产品是否可发布。</p>
<button type="reset">恢复网页交付方案</button>
</fieldset></form>
<div class="rights-result" aria-live="polite" aria-atomic="true">
<p><strong>实际送出的内容：</strong><span data-rights-package>浏览器取得网页及字体文件；访客实际收到了一份字体副本。</span></p>
<p data-rights-result>当前交付安排缺少字体的版权声明及 OFL 全文。先补进发布包，并让接收方能找到；只有内部台账存着许可还不够。</p>
</div>
<noscript><p>交互需要 JavaScript。静态结论：网页提供字体与模板附带字体都会分发字体副本；只交不含字体文件的点阵 PNG，则不由这一步触发随字体副本附带许可的要求。</p></noscript>
</section>

如果你修改字体，还需逐项核对修改、命名和继续分发的条件，不能只看“可商用”三个字。OFL 对保留字体名称有专门规定；具体有没有声明保留名称，要看采用的那一份字体，不能凭项目名猜测。[^src-inter-ofl] 图标、音效、视频片段也按同样的清点顺序走，但采用各自许可，不能拿字体的规则作通用答案。

## 代码依赖要跟着构建产物走

R-01 的另一个候选是从公开仓库复制的一小段代码，仓库里却找不到许可。GitHub 维护的 Choose a License 指南明确提醒：公开仓库可以被查看或按平台规则 fork，并不自动取得通常需要的使用、修改和分享权限；没有许可时，可以询问作者、另行协商或选择替代。[^src-github-no-license]

本例选择不把这段代码带进发布包。它只完成一个简单格式化任务，没有必要为它等待授权；按自己的需求重新实现并核对测试即可。这里的“重新实现”是重新编写解决办法，不是保留原代码结构、换几个变量名。若它承担的是复杂核心能力，则需要比较正式采购、取得授权与独立开发的真实成本，不能把替换写成总是便宜的答案。

对于已经有许可的依赖，先认准**你采用的版本**，再检查它进入了哪个包。下面选两个具体例子帮助读条款，不推荐这些版本用于新产品，也不替代漏洞或兼容性检查。

<div class="rights-table rights-code">

| 阅读对象 | 这份文本解决什么问题 | 应落实到哪里 |
|---|---|---|
| Lodash 4.17.21 的许可文件 | MIT 部分要求在副本或实质性部分中保留版权与许可声明；文件还明确外部依赖可能采用其他许可 | 保存该版本完整声明；检查浏览器包、下载包与第三方声明页实际保留了什么，不只看根目录写着 MIT |
| MPL 2.0 与 Mozilla FAQ | 区分服务端运行和向客户端交付代码；分发压缩后的 MPL JavaScript 时，需要按许可提供相应源码取得方式 | 记录哪些文件受 MPL 约束、是否修改、对应源码版本及访问入口；不要只给客户一个不可编辑的压缩文件 |

</div>

上表分别依据 Lodash 的版本许可和 Mozilla 的许可正文、FAQ。[^src-lodash-license][^src-mpl20][^src-mpl-faq] Mozilla 还解释了 MPL 的文件级边界：不含 MPL 代码的新文件，不会仅因与它一起组成较大作品就自动成为 MPL 下的修改文件。[^src-mpl-faq] 因而，判断不应从“用了开源，所以必须公开全部产品”开始，也不能从“这是 SaaS，所以不用处理许可”结束。

<figure class="rights-media" aria-labelledby="rights-delivery-title">
<h3 id="rights-delivery-title">对 MPL 示例，代码到底有没有交出去？</h3>
<ol class="rights-chain">
<li><strong>构建时清点</strong><span>源码、直接与间接依赖、复制的片段、附带字体和图片</span></li>
<li><strong>沿产物拆开看</strong><span>服务器程序 / 浏览器下载 / 客户安装包</span></li>
<li><strong>按接收方验收</strong><span>他收到哪些文件？在哪里取得声明与相应源码？</span></li>
</ol>
<div class="rights-fork">
<div><strong>仅服务器运行 → 这个分发动作未发生</strong> <span>MPL FAQ 区分只提供网络功能与交付软件副本；不要把这一解释推广到其他许可。</span></div>
<div><strong>交付客户端代码 → 核对分发条件</strong><span>压缩不消除许可安排；源码入口应对得上实际交付的版本。</span></div>
</div>
<figcaption>这里特指 MPL FAQ 的第 16、17 问。GPL、AGPL、双重许可、模型权重和专利条款需要按采用版本另查，不能由这张图推定结论。</figcaption>
</figure>

图中的服务端与客户端区别，来自 Mozilla 对分发的解释。[^src-mpl-faq] 验收时，拿一次准备交付的构建，从接收方的入口打开第三方声明，确认能取得版权声明与完整许可。需要提供源码时，再下载对应源码，核对版本和修改记录是否匹配这次构建。如果链接只有开发者能访问，或者指向已经大幅改动的默认分支，就还没有完成这项交付安排。

小项目可以先从锁文件、复制片段和构建目录人工清点。规模增大后，用工具生成依赖清单能减少遗漏，但工具识别出一个许可证名称，并不证明仓库里所有图片、示例和子目录都使用它。拿不准时，把文件路径、版本、修改差异和实际交付方式一起交给熟悉软件许可的人；“我们用了开源，有没有问题”太宽，难以得到能执行的答复。

## 外包、上传与 AI：谁提供，不等于谁能授权

付过设计费，也要看买到了什么。中国现行著作权法第 19 条规定，受委托创作作品的著作权归属由合同约定；没有明确约定或没有订立合同的，归受托人。第 26、27 条分别列出许可使用和权利转让合同的事项。[^src-cn-copyright2020] 这是中国法的具体规定，跨境合作还要结合适用法律与协议判断，不能把一张付款凭证理解成全球范围的全部权利转让。

对 R-01 那份假设已付款、却只有源文件和收据的外包标志，先暂停将它用于公开页面。保留纯文字功能说明，向创作者补问授权；若答复覆盖不了未来使用，再比较补充协议与重新制作的成本。商标清查仍是另一件事，取得设计作品的权限没有替名称作结论。

<section class="rights-media rights-letter" aria-labelledby="rights-request-title">
<h3 id="rights-request-title">把用途说完整的一封询问信</h3>
<p class="rights-caption">教学样稿，未向任何人发送。它用于澄清范围，不是一份可直接签署的通用合同。</p>
<div lang="en">
<p><strong>Subject: Confirming rights for the R-01 logo deliverables</strong></p>
<p>Before we publish, we would like to confirm the rights for the logo source file and exported SVG delivered for R-01. Our planned uses are the product website, the browser interface, English marketing pages and customer documentation accessible worldwide.</p>
<p>We need to resize and adapt the layout, and let our hosting and design contractors handle the files for these uses. We do not currently plan to sell the logo files or include them in a customer template library.</p>
<p>Please identify any third-party fonts, icons, stock assets or AI-generated elements, with their applicable terms. Please also confirm which rights you can grant, whether the arrangement is exclusive, its territory and duration, attribution requirements, and whether these uses are covered by our payment.</p>
<p>Please provide the proposed written terms and identify anything that needs an additional license or fee. We will keep the logo out of the public release until the scope is resolved.</p>
</div>
</section>

用户上传的材料也需要这种用途意识。用户为了生成自己的报告提交一张图，与同意你把图拿去做官网案例、训练模型或提供给其他客户，是不同请求。产品设计上应分开确认这些用途，并记录材料来源和必要权限；涉及客户数据、个人信息或跨境处理，再连同实际路径回到[合规章](/go-global/compliance)。不要要求用户作一句无限兜底的保证，然后假定自己可以任意使用。

数据集同样不能只记“公开下载”。确认数据提供者、版本、采集与再利用条件、是否含第三方内容和个人资料。中国著作权法第 15 条还区分了对材料的选择编排与原作品权利：形成汇编作品不意味着可以忽略原作品。[^src-cn-copyright2020] R-01 只需要展示输入格式，所以选择自己编写合成项目行，不引入真实客户截图或爬取的数据集；将来若产品本身依靠数据服务，再单独研究其来源与目标地区规则。

AI 输出则至少分开看三件事：输入能否交给服务，服务条款给了你哪些使用安排，以及结果在目标地区能否获得你希望主张的权利。美国版权局在 2025 年发布的报告说明中，把可保护性与足够的人类表达贡献联系起来，区分创作性安排、修改和仅提供提示词。[^src-usco-ai-copyright] 这是美国范围内的官方解释，不能概括成全球的“AI 图片都有版权”或“都没有版权”。

因此，若用生成图作长期品牌核心，台账还应保存输入来源、服务和版本、生成日期、选用结果及人的修改记录，再核对条款与目标用途。R-01 的介绍图不需要生成一位虚构客户来撑场面；让合成报告本身可读就足够。经营 AI 服务的上游准入、数据和结果评估，继续看 [AI、API 与插件专项](/go-global/ai-api-extensions)。

## R-01 最后留下的是这份决定

把前面的工作收回到同一份记录，结果不必全部是“通过”。有些项目已经有明确处理办法，有些必须等到实际文件和目标市场确定后再继续。下面的许可原文确实读过；设定中的合同、字体二进制、品牌查询和产品发布包没有实际取得，不能填造证据编号或文件哈希。

<div class="rights-table rights-ledger" id="rights-ledger">

| 材料与用途 | 手中证据及缺口 | 本次决定与恢复条件 |
|---|---|---|
| 对外名称，用于网站和客户文档 | 没有确定目标国家，也没有候选清查记录 | 暂缓品牌采购和对外定名；先明确地区，再保存候选及近似结果 |
| 装饰合影，用于介绍页 | 原始照片、人物和其他权利范围均未确认 | 本版删除；改用自有界面与合成报告，不把删除写成对过去使用的免责 |
| Inter 4.1，拟自托管网页字体 | 已读该版本 OFL；尚未取得并核对具体字体文件 | 保留候选；真正采用时记录文件版本和校验值，随副本交付声明与许可后再验包 |
| Lodash 4.17.21，代码许可阅读样例 | 已读该版本许可；并未完成产品需要性、依赖树与安全核对 | 不把旧版本加入产品；实际选择依赖后，按锁定版本清点、留声明并查构建产物 |
| 无许可代码片段，拟作格式化 | 仓库公开，但没有确认的使用许可 | 本版不引入；独立实现所需的小功能，或另选许可明确的实现 |
| 委托标志，拟用于产品与推广 | 教学设定中只有收据和文件，没有明确权利约定 | 暂不公开使用；发送范围询问、解决第三方素材与书面约定后再决定 |
| 演示输入与介绍图 | 计划自行编写合成记录，用自己的界面制作；尚未形成 R-01 实物包 | 保留这个制作方案；交付前核对内容、来源和实际文件，不使用真实客户材料 |

</div>

可以<a href="/go-global/rights-ledger.json" download="rights-ledger-r01.json">下载这份已填写的台账 JSON</a>，保留其字段改成自己的记录。它明确区分已阅读的许可、教学设定和待取得的文件，没有真实授权书，也没有自动计算的“合规率”。

这次清点带来的变化很具体：装饰合影和不明片段不再阻碍制作介绍材料；外包标志与命名没有被付款或域名搜索糊弄过去；字体和依赖的条件会跟着实际文件走。**产品功能研究可以继续，对外品牌和包含待核材料的发布包仍待确认。** 如果下一步变成“把可编辑源码和素材包交给客户”，重新从接收方拿到什么查起，不沿用这张表的网页用途结论。

实际发布时，建议为该版本保留一份证据目录：台账、自己获准保存的许可/授权材料、第三方声明、必要源码入口，以及对应的构建编号和文件校验值。校验值帮助确认后来检查的是不是同一个文件，不能证明文件来源合法。公开交付的声明与内部留存的合同也分开放，别把联系人、采购凭证或私人往来一起发布到仓库。

## 收到投诉时，先找回当时到底用了什么

中文开发者西枫里人在 2018 年记过一次字体投诉：客户转来通知，涉及多年前网站图片上的两个字；作者起初删除了文字，后来设计人员又认为实际使用的字体与投诉所指不同。[^src-xifeng-font-claim] 文章没有提供独立核实的裁判结论，不能替任何一方判定对错。值得借鉴的是，连作者自己也需要回头找当时的设计和版本，才能核对通知指向的到底是什么。

这时只保留“最新版已经换掉了”还不够。建议把原通知、被指出的网址、当时的构建、源文件和许可记录保存下来，同时限制争议材料的继续使用；若通知附有平台处理时限或正式程序，立即按对应规则安排响应和专业协助。不要等所有技术替换做完，才去看回复期限。

<figure class="rights-media" aria-labelledby="rights-incident-title">
<h3 id="rights-incident-title">保存证据与限制使用，同时开始</h3>
<div class="rights-closure"><strong>收到具体权利通知</strong><p>确认发送方与所指材料，记录收到时间、处理渠道和已知期限。</p></div>
<div class="rights-fork">
<div><strong>↓ 保存与核对</strong><span>当时版本、原文件、来源和约定；核对对方权利及代理依据，不凭通知标题承认事实。</span></div>
<div><strong>↓ 控制后续使用</strong><span>暂停相关页面、广告或下载；盘点客户手里的旧包，并同步处理回复期限。</span></div>
</div>
<div class="rights-closure"><strong>两路汇合 → 决定补授权、替换或提出异议</strong><p>根据证据处理既有使用与后续交付，记录沟通结果；新版本核对后再恢复。</p></div>
<figcaption>替换解决的是接下来交付什么。既有使用如何处理，应随具体事实和适用规则判断，不能用“已删图”自动结案。</figcaption>
</figure>

若日后发布的版本收到关于标志中某个图形的通知，一份可交给顾问或创作者的材料应这样具体：指出涉及介绍页横幅及下载说明；列出首次出现的构建、当前暂停范围、手中的源文件和收据；注明尚缺原始图形来源及授权范围；请求核对主张的作品、权利人、代理依据和具体争议使用。尚不知道的日期和分发数量继续标为未知，不为显得材料完整而补造。

要注意，删除不自动解决过去的责任。以中国著作权法第 52 条为例，适用时可能承担的民事责任不只有停止侵害，还包括依情况适用的其他责任。[^src-cn-copyright2020] 遇到实质性争议、索赔或程序文件，就把上述证据交给对应地区的专业人士处理；不要让一封模板回信替你作事实承认或法律承诺。

下一次更新产品时，权利清点也跟着更新：新的文件、新的用途、新的接收方，至少有一项改变就回到台账。进入团队采购时，把可交付的源码、素材和使用范围接进[合同与交接说明](/go-global/team-procurement)；决定转让或停止业务时，再沿[经营复盘与退出](/go-global/business-review)核对哪些东西有权移交、哪些还需要另行取得同意。
