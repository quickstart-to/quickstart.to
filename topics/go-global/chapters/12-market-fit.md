---
title: 市场与适配：选择一群自己能服务的人
description: 从已有用户和服务能力选择市场切入点，把语言、工作术语、日期格式、交付与支持连成一条完整路径，并实际检查容易出错的输入。
order: 2
volatility: medium
last_verified: 2026-10-09
---

一份客户报告写着 `11/10/2026`。生成器运行正常，文件也导出了，但有人把它读成 11 月 10 日，另一个人理解成 10 月 11 日。若这是下一次交付日期，双方可能直到错过约定才发现问题。W3C 的日期设计指南讨论过这种歧义：仅把页面翻译成另一种语言，并没有替读者解释日期；完整年份、明确的月份或格式说明仍然必要。[^src-w3c-date-formats]

出海产品的适配，经常藏在这种看起来很小的地方。你和用户以为彼此在说同一件事，实际上却在使用不同的工作约定。翻译按钮可以很快，发现这些差别需要接触具体的人和具体的输出。

[选品与验证](/go-global/validate-idea)已经讨论了先调查哪一类工作。这一章继续沿用**虚构的客户报告工具**：大陆个人开发者熟悉网站交付，每周投入两个晚上，能够做英文异步沟通，尚无真实客户或本地合作伙伴。现在要决定先接触怎样的海外使用者，以及做到什么程度才算能让对方独立试用。英语是这个例子的能力条件；客户所在国家仍需从实际接触中确认，不能用它代替一个已经验证的市场。

## 先看已经发生的使用，再决定扩到哪里

Notion 在 2020 年推出首个非英语版本时，选择了韩语。它在发布说明中给出的理由，是韩国已经存在活跃的用户社区：有人写教材、办工作坊、制作视频。团队随后一起翻译了应用、常用模板和帮助中心，并表示先把韩语版本做好，再利用经验增加其他语言。[^src-notion-korean-launch]

这个顺序值得琢磨。用户已经在想办法使用产品，社区也已经承担了一部分解释工作；本地化可以沿着这条已有路径减轻负担。界面、模板和帮助文档又对应了不同障碍：看懂控件、知道可以怎样用、出错以后找到答案。可借鉴的是这套选择依据，不是照抄同一个目的地。

另一位经营者的经历，恰好说明只看宏观指标会漏掉什么。杨杰在 2024 年的复盘中说，团队扩大海外地区后，先按人口、收入等指标制定分区价格，后来又增加本地支付方式与八种语言，却没有得到期望中的转化改善。翻译工作通过 Excel 交给外部公司，短句缺少上下文，核心术语也缺乏校验；这些是他事后指出的问题。[^src-yang-localization-retrospective]

这是一份作者自述，文章没有披露足以独立验证因果关系的数据，不能据此断言翻译就是唯一原因。但它暴露了一个很实际的空缺：价格适合，不代表付款方式适合；语言已翻译，也不代表用户认出了自己要完成的工作。每增加一个地区，都可能多出需要确认的条件。

因此，如果你还没有海外使用者，先不要把国家列表当作优先级。把“我想做日本市场”继续问下去：谁会用，给谁交付，在哪看到产品，什么语言能讨论工作，谁能决定尝试，你如何处理第一次失败？如果已经有人反复使用并主动求助，就沿着他们的障碍研究下一步。两种起点，需要的投入并不相同。

## 把市场切入点写成一组服务条件

对本例，“海外小工作室”仍然太宽。一个能自己试用导出工具的负责人，与一个需要客户安全团队批准的工作室，哪怕都用英语，进入方式也不同。反过来，操作者愿意用英语，并不意味着他的客户也愿意接收英文报告。

在开发之前，可以把首轮候选写成下面三条路径。这里比较的是**本例当前条件下应先调查什么**；没有真实联系人，因此还不能把任何一条称作已进入的市场。

<div class="market-media market-paths" role="group" aria-label="三种市场切入路径与取舍">
<article>
<h3>英语沟通、单人决定、异步完成客户更新</h3>
<p>操作者理解英文界面，能自行尝试辅助工具，客户允许按约定格式接收报告。开发者已有工作经验与沟通能力可以使用，先调查这条路径。</p>
<p>但原有模板可能已经够用；客户输出语言、日期偏好、所在地区与求助期限仍未知。若每次都要你在对方工作时间内陪同，原先的低投入判断就不成立。</p>
<p class="market-choice">先接触符合角色的人，取得一份可公开或脱敏的工作结构，再决定做样稿。</p>
</article>
<article>
<h3>需要日语理解任务、试用和处理问题</h3>
<p>增加日语字符串可以缩小界面障碍，却不能补上本例欠缺的术语审阅和客服能力。现在没有可以验证工作含义的联系人，也没有能持续审校的伙伴，因此暂缓承诺日语版本。</p>
<p>若后来接触到确有重复任务的使用者，并能获得针对真实页面的审阅与支持安排，就重新比较；不能因为本例暂缓，就说这类用户不值得服务。</p>
<p class="market-choice">先补接触与审阅条件，不以一次自动翻译宣布已经支持整个市场。</p>
</article>
<article>
<h3>英语沟通，但要多人审批和系统接入</h3>
<p>界面语言看似没有障碍，实际试用却可能涉及数据接入、采购、团队权限和服务承诺。本例的单文件工具与每周投入不足以承担这一整套交付。</p>
<p>如果有人能够独立完成一项不依赖团队迁移的小任务，可以重新定义试验；若流程本身必须多人参与，就需要新的资源安排。</p>
<p class="market-choice">暂不承诺组织级接入，保留重新收窄任务的可能。</p>
</article>
</div>

这个选择有一个容易被忽略的后果：第一条只确定了**调查入口**，还没有确定销售范围。实际接触时，需要补上操作者和最终客户分别在哪里、使用什么语言、采用什么软件、如何采购，以及何时需要帮助。之后按这些真实条件检查网络、付款与合规；不能因为页面能打开，就默认所有地区都可服务。

记录也不必复杂。一次有效的描述应当像：“负责人用英语操作，客户接收另一种格式的文件；报告在客户周一会议前交付；不允许上传原始文件；可以自行购买辅助工具。”这些条件会直接改变设计。国名仍然要记，但不能把它当作其他信息的替代品。

接触路径见[冷启动获客](/go-global/launch)。找不到这类角色时，先调整接触范围；没有必要先把全部界面做成多语言。反过来，若有可信的本地伙伴和清楚的需求样本，即使你原先更熟悉英语，第二条也可能值得优先。需要改变的是证据和承接能力，而不是把英语写成所有人的默认答案。

## 沿一份真实交付检查语言，不只检查词表

杨杰复盘中的 Excel 翻译问题，值得变成一个具体工作方法：交给翻译或 AI 的材料，至少应包含使用者、页面截图、前后动作、术语解释和不能改变的事实；审阅时要在页面里走一次任务。一个孤立的 `Publish`，无法告诉审阅者按钮究竟是生成预览、保存到本机，还是发送给客户。

对这个不上传 CSV、只在浏览器生成文件的工具，第一版可以形成如下用词约定。它们是**教学文案**，需要让目标角色实际读过；不是已经得到用户认可的表达。

<dl class="market-media market-terms">
<div><dt>落地页任务</dt><dd><p lang="en">Turn a project CSV into a client progress update.</p><p class="market-meaning">说明输入与交付，不能让人以为工具会代写项目判断。</p></dd></div>
<div><dt>生成前按钮</dt><dd><p lang="en">Create preview</p><p class="market-meaning">生成供核对的预览，没有向客户发送。</p></dd></div>
<div><dt>完成按钮</dt><dd><p lang="en">Download report</p><p class="market-meaning">下载文件，由操作者决定怎样交付。</p></dd></div>
<div><dt>日期有歧义</dt><dd><p lang="en">Choose the date format used in your CSV.</p><p class="market-meaning">询问原始记录的格式，不从浏览器语言猜测。</p></dd></div>
<div><dt>错误恢复</dt><dd><p lang="en">Check the date in row 4, then try again. Your CSV has not been uploaded.</p><p class="market-meaning">指向可以修改的位置；最后一句必须与真实数据路径一致。</p></dd></div>
</dl>

产品中不同层的文字，还可能由不同的人负责。Tally 的语言文档就明确区分：设置可以翻译系统默认消息；能够由表单作者编辑的问题标题等内容，仍需作者使用目标语言填写。[^src-tally-form-languages] “选择了语言”不等于整个交付都已经翻译，这一点对报告工具也成立。

<figure class="market-media" aria-labelledby="market-route-title" aria-describedby="market-route-caption">
<h3 id="market-route-title">把一条使用路径一起交给审阅者</h3>
<ol class="market-route">
<li><strong>发现：我能得到什么</strong><span>落地页、示例输出、价格与服务范围必须指向同一份任务。</span></li>
<li><strong>操作：我现在该做什么</strong><span>输入说明、按钮和错误消息，要能让人自行前进或恢复。</span></li>
<li><strong>交付：客户会看到什么</strong><span>单独核对报告语言、日期、单位和字体；操作者的偏好不自动代表客户。</span></li>
<li><strong>求助：失败后由谁接住</strong><span>支持语言、响应时间、需要提供的非敏感信息，以及继续使用旧办法的出口。</span></li>
</ol>
<figcaption id="market-route-caption">审阅者沿箭头完成一次任务。若只拿到按钮词表，就看不到前一屏的承诺和后一屏的结果。</figcaption>
</figure>

机器翻译可以帮助起草和查找漏译；关键位置仍要检查它是否改变了动作与承诺。对不熟悉的语言，找能理解任务的人在真实页面里指出问题，比再生成几份措辞更接近验证。没有这个条件，就缩小公开支持范围，保留读者能理解的错误与求助路径。

## 同一份输入，为什么会得到不同的日期

本例把三个问题分开：**输入原本表达什么，输出按什么偏好显示，一个时刻属于哪个时区。** 前两个问题都可能涉及语言，却不是同一个决定。

W3C 建议在可能产生歧义的场合明确月份和四位年份，或说明格式；它也提醒浏览器语言偏好不能直接替代文档上下文。[^src-w3c-date-formats] 因此，本例保留原始字符串，先要求操作者确认日期顺序，再生成供客户检查的预览。若输入无效，就停下来指出问题，不把 2 月的错误日期悄悄挪到 3 月。

下面是一行**合成数据**：截止日期 `11/10/2026`，项目预算 `1234.50 USD`，最近更新时间 `2026-10-09T00:30:00Z`。预算是用于演示显示格式的项目字段，不是产品价格，也不涉及换汇。先确认输入顺序，再分别改变显示偏好和时区，看哪些结果应该变化。

<section class="market-media market-demo" data-market-demo aria-labelledby="market-demo-title">
<p class="market-kicker">本地格式演示 · 不上传数据</p>
<h3 id="market-demo-title">先解释输入，再格式化输出</h3>
<fieldset disabled>
<legend>调整这行合成记录</legend>
<div class="market-controls">
<label for="market-date">源文件日期<input id="market-date" type="text" value="11/10/2026" maxlength="10" data-market-input aria-describedby="market-result"></label>
<label for="market-order">源文件日期顺序<select id="market-order" data-market-order><option value="">尚未确认</option><option value="mdy">月 / 日 / 年</option><option value="dmy">日 / 月 / 年</option><option value="iso">年-月-日</option></select></label>
<label for="market-locale">输出的日期与数字偏好<select id="market-locale" data-market-locale><option value="en-GB">英语（英国格式）</option><option value="en-US">英语（美国格式）</option><option value="de-DE">德语（德国格式）</option></select></label>
<label for="market-zone">最近更新时间的显示时区 <select id="market-zone" data-market-zone><option value="Europe/London">Europe/London</option><option value="America/Los_Angeles">America/Los_Angeles</option><option value="Asia/Tokyo">Asia/Tokyo</option></select></label>
</div>
</fieldset>
<div class="market-report">
<h3>交付预览</h3>
<dl>
<div><dt>确认后的日期值</dt><dd data-market-stored>尚未得到确定的日期</dd></div>
<div><dt>报告中的截止日期</dt><dd data-market-deadline>待确认，不生成截止日期</dd></div>
<div><dt>项目预算（币种固定为 USD）</dt><dd data-market-budget>USD 1,234.50</dd></div>
<div><dt>最近更新时间（同一个时刻）</dt><dd data-market-updated>9 Oct 2026, 01:30 GMT+1</dd></div>
</dl>
</div>
<p id="market-result" class="market-status" role="status" aria-live="polite" data-market-result>先确认源文件的日期顺序。显示语言和时区都不能替你作出这个判断。</p>
<button type="button" data-market-reset hidden>恢复未确认的输入</button>
<details class="market-static"><summary>查看固定算例与演示边界</summary><p>按月 / 日 / 年解释，日期值为 2026-11-10；按日 / 月 / 年解释，则为 2026-10-11。英式显示分别为 10 November 2026 和 11 October 2026。更换显示时区不会改变这两个日历日期。</p><p>同一更新时间在 London 为 10 月 9 日 01:30，在 Los Angeles 为 10 月 8 日 17:30，在 Tokyo 为 10 月 9 日 09:30。原始时刻没有改变。</p><p>本例只支持列出的格式、1900–2100 年的公历日期和固定合成字段，不是完整 CSV 解析器，也没有完成德文界面的翻译。显示偏好不代表客户国籍。</p></details>
<noscript><p>当前未运行脚本，控件不可用；展开上面的固定算例，仍可核对两种解释及其不同结果。</p></noscript>
</section>

浏览器演示使用 `Intl.DateTimeFormat` 分别指定显示偏好与时区；预算使用 `Intl.NumberFormat` 明确指定 `USD`。这些选项在 API 中各自独立，不能把切换德语显示理解成把美元换成欧元。[^src-mdn-datetime-constructor][^src-mdn-numberformat-constructor] 示例将“截止日期”定义为一个日历日期，因此不随时区移动；“最近更新时间”定义为时刻，换时区后可能落在前一天。若你的产品约定的是“某日某地下午五点截止”，就需要同时保存日期、时间和时区，不能直接沿用这里的日期字段。

我们实际执行了这个小模型，检查同一字符串的两种解释、无效日期、闰日、显示偏好与时区变化。它证明的是这组输入输出的处理结果，没有证明真实客户偏好。集成到产品后，还应让使用者拿一份自己原有的导出走完流程；文件编码、分隔符、引号、换行和长文本都不在这个小演示的解析范围内。

## 一份最小适配包，可以怎样交出去

现在回到本例的英语异步试用。只发一个网址，仍然把许多理解工作留给对方。更完整的交付是：一段范围说明、一份合成输入、一个已经填好的输出、一个失败后的处理办法。下面是可以一起发送的**英文教学样稿**；没有向任何人发出，也没有真实试用结果。

<aside class="market-media market-copy" aria-labelledby="market-copy-title">
<h3 id="market-copy-title">样稿：先约定输入与输出</h3>
<div lang="en" class="market-example">
<p><strong>Turn a project CSV into a client progress update.</strong></p>
<p>This pilot runs in your browser. The CSV stays on your device. It creates a draft for you to check and download; it does not send anything to your client or decide whether a project is on track.</p>
<p>Start with the sample below. Confirm the date format used in your file, then check the deadline and currency in the preview. Keep your usual reporting method available while trying this version.</p>
</div>
</aside>

```csv
project,next_step,due_date,budget_currency,budget_amount
Demo website,Review homepage draft,2026-11-10,USD,1234.50
```

为完成这份教学输出，再给出一条人工判断：示例负责人已确认主页草稿可供审阅，目前正在等待客户反馈。它不来自 CSV 中的日期或预算。

```text
Client progress update — Demo website
Next step: Review homepage draft
Due date: 10 November 2026
Project budget: USD 1,234.50
Project status: Awaiting client review
```

这份输出把数据整理和人工判断放在了一起，后者仍由负责人确认。客户是否真的需要预算字段，也需要观察；真实任务不需要时就删除，不能因为演示里有，就要求对方多收集一项信息。下载后是否仍需重排格式、补写解释，回到[选品章的完整工作成本](/go-global/validate-idea)一起计算。

让陌生人愿意尝试，还需要能检查的依据。本例的试用页应同时放出样本与完整输出，说明哪些数据留在本机、哪些账号信息仍需处理，并提供真实的开发者联系和问题反馈入口。缺少客户案例时，就把可操作样例讲清楚；不要拿不存在的客户标志、认证或本地办公室填补空位。对方要求的证明若超出目前能力，也会改变前面的市场选择。

支持安排也需要成为试用材料的一部分。不要因为页面用了英语，就让对方误以为随时有英文客服。在一次约定好的试用里，可以明确下一次回复的具体日期、时间和时区，并询问这是否赶得上客户的交付期限。例如：

> For this pilot, please send questions by email. I will reply by 14 October 2026, 12:00 UTC. If that is too late for your client deadline, please keep using your usual workflow. To report an error, send the row number and a made-up example with the same structure; please do not send client files.

这是一次教学试用的回复约定，不是已经提供的服务承诺。若对方只能在你无法覆盖的时间同步操作，可以改约一次演示，或暂缓这一轮。进入正式销售后，还要按真实支持能力与平台要求重定承诺，不能直接把试用文案复制到付费产品。

## 扩语言之前，先追踪哪里仍要你代劳

完成一次试用后，按发生问题的位置修订适配包。若对方在首页就把它理解成自动写项目结论，先改价值说明；若能看懂界面却导入失败，先查真实输入结构；若能导出但客户看不懂，单独检查输出语言与格式；若所有步骤都靠你在线解释，说明独立使用尚未成立。

这些结果不应全部被归为“本地化不够”。现有模板已经够用、任务发生得太少、购买者不同，也可能让产品停住。把没有需要与没看懂分开，再决定是改产品、改表达、调整服务范围，还是停止这个方向。

出现一群任务相近、持续使用且反复遇到同一语言障碍的人时，就有了研究下一种语言的具体理由。届时把界面、示例、错误与支持一起安排，像 Notion 的历史案例那样沿已有使用路径消除障碍；同时保留杨杰复盘中的提醒，检查实际使用结果，而不是用翻译完成数宣布成功。

对这个例子，当前先做英语异步路径的适配样稿，暂不承诺日语支持或组织级接入。下一轮要取得的不是“用户喜欢这个翻译”的泛泛评价，而是一份能够独立完成、交给客户、遇错可恢复的使用记录。[首次使用体验](/go-global/first-use)展开从输入准备到错误恢复的完整路径，[持续使用与迭代](/go-global/retention)接着处理下一次任务的记录怎样改变投入。真实地区和服务条件确定后，再进入[基础设施](/go-global/infrastructure)、[合规](/go-global/compliance)及商业化章节核对相应安排。
