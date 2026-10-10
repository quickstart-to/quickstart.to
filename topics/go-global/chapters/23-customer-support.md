---
title: 客服与服务运营：把求助接住，把承诺做完
description: 从跨时区来信走到复现、临时恢复、跟进与结案；用完整英语往来、工单流程、帮助文章和容量演算，安排个人开发者能持续承担的服务。
order: 7
volatility: medium
last_verified: 2026-10-10
slug: customer-support
---

早上打开邮箱，一位用户说导出的图片少了一截，今晚就要交付。你在自己的电脑上试了一次，没发现问题，回了句“请重试”。第二天，对方又发来截图：问题还在，而且已经耽误了工作。

难处往往从这里开始。你不知道该再问什么，也不确定是不是产品缺陷；一边想修，一边还有新邮件进来。回复过的人继续等，没回复的人开始催。客服占去一个晚上，产品却没有变得更好用。

[首次使用](/go-global/first-use)讲过如何让用户走完任务。这一章从任务受阻之后接着走：怎样接住求助、保留上下文、给出有用的下一步，再把一次处理变成以后少出同类问题的改进。

下面另设一组 **S-01–S-06 教学工单**：产品是浏览器截图标注工具，可以在本机打开 PNG，画框、写说明，再导出 PNG；不上传图片，不保存云端历史，不提供团队协作。开发者在中国大陆，用英语异步支持。版本、缺陷、来信和用时都是合成材料，不是已有客户的真实经历，也不与前面周报工具的经营数字合并。

## 亲自回复很有价值，但不能靠一直在线

Plausible 的 Marko Saric 在 2021 年复盘过两人团队的客服工作。常见问题出现后，他们先调整产品、解释和帮助文档；已有的回复材料再针对具体来信修改。遇到一家企业要求整天开会和冗长审查，他没有接下全部要求，而是通过邮件、一次短通话和公共文档回答问题。服务范围因此跟团队能承担的工作连在一起。[^src-plausible-support-scaling]

这段经历容易被读成“两个人也能服务很多用户”，但文章后半段更值得读。作者说，自己几乎每天都看邮箱，休假时很难彻底离开。自托管用户的环境各不相同，最初尝试同样支持，后来发现无法承担，改为明确的社区支持；团队也开始培养另一位开发者接手。这些取舍说明了轻工具、清楚的范围和有人替班为什么重要，不能把文中的用户量换算成你应该接多少单。[^src-plausible-support-scaling]

PostHog 的经历提供了另一个尺度。2024 年的文章描述，工程师轮流承担支持，其他人就能保留完整开发时间。但支持量继续增长后，轮值者连高优先级工单都处理不完，长期改进被挤掉，团队才加入专职支持工程师。亲自接触问题的价值没有消失，原来的分工却已经不够。[^src-posthog-engineers-support]

对本例，我会先用一个固定支持邮箱和一份简单记录，由开发者亲自判断问题。原因是缺陷还不熟悉、量少，转交别人之前也得自己搞清楚。社交平台上的求助可以接住，再经对方同意移到同一条私密会话；不要要求用户在公开评论里贴账单或原始截图。

这个选择有成本：每天要留出查收时间，正在开发时还要记住未完成的承诺。一旦同一天有多人接力、邮件经常漏掉，或来信持续挤掉修复时间，就需要共享队列、替补或专职帮助。换工具的理由应当是这些具体缺口，而不是“做出海都得有在线聊天”。

<h2 id="support-window">把服务窗口写到用户求助之前</h2>

“尽快回复”没有告诉别人今晚能否等到你。对跨时区用户，更有用的是：通过哪里联系，什么时候会有人看，第一次回复会做到哪一步，以及哪些工作不在范围内。

本例拟在周一至周五北京时间 09:30 和 17:00 查收，每周预留 6 小时处理支持、关联修复和文档。查收时点不表示在两次之间一直有人在线；第一次人工回复的目标时间为下一个服务日 17:00 前。若当周休假，就提前显示例外日期和实际下一次回复时间，不能等收到投诉再解释。

<div class="support-media support-letter" lang="en" aria-label="英语支持说明样稿">
<h3>Getting help with your annotation</h3>
<p>Email us with the step that failed and what you expected to happen. We check support on Monday–Friday at 09:30 and 17:00 China Standard Time (UTC+8). We aim to send a human reply by 17:00 on the next service day. This is a first-response target, not a promise that a fix will be ready.</p>
<p>We support opening a PNG, adding annotations, and exporting a PNG in the browser. We do not offer cloud recovery, live calls, or custom integrations in this version. Please keep your original image and your usual workflow available for time-sensitive work.</p>
<p>Do not send passwords, payment card details, or confidential screenshots. Start with the error text and a short description; we will ask for a safe sample only if needed. Weekend support is not staffed. Any planned exceptions will be shown here before they begin.</p>
</div>

这里采用固定的 UTC+8，并把具体跟进时间写成带月份和时区的日期。例如，周五 17:10 收到邮件，按这个目标，可能要等到周一 17:00 才有人工回复；两次查收之间也不会自动变成实时服务。自动回执可以确认收到和展示下一次窗口，但不能算作人工看过了问题，更不能算作解决。

如果用户的工作必须在你的夜间持续运行，或团队合同已经约定更短的响应时间，就要先安排值守和替补，再接这类需求。个人轻工具的工作日支持说明不能覆盖已签的合同；相关范围和升级联系人要接到[团队采购](/go-global/team-procurement)。

<h2 id="support-flow-title">先判断影响，再让工单走下去</h2>

来信写着“紧急”，值得认真了解，但排序还要看什么被阻断、影响谁、有没有可用替代。一个无法交付的缺陷、一条功能建议和疑似泄露资料，不应该都进入“有空再看”。下面是本例的处理路线，实际工作还要随新信息重新分级。

<figure class="support-media support-flow" aria-labelledby="support-flow-heading" aria-describedby="support-flow-caption">
<h3 id="support-flow-heading">一封来信，有两条处理路线</h3>
<div class="support-node"><b>收到求助 → 留下编号和负责人</b><span>记下用户任务、受阻步骤、期限，以及下一次由谁行动</span></div>
<div class="support-arrow" aria-hidden="true">↓</div>
<div class="support-node support-decision"><b>是否疑似安全、数据异常，或多人无法完成关键任务？</b><span>先确认已知影响；信息不足时保留“待查”，不急着降级</span></div>
<div class="support-branches">
<div><strong>是 → 切入事件处理</strong><p>限制影响、保留必要证据、安排状态更新；报告义务判断与处置并行。</p><p><a href="/go-global/risk">接风控与恢复流程</a>，普通工单关联同一事件，分别通知受影响的人。</p></div>
<div><strong>未发现 → 按普通问题调查</strong><p>已有信息先查 → 只补问缺的内容 → 用安全样本复现。</p><p>没有复现就保留疑问；任务赶不及时，先给能验证的临时办法或旧流程。</p></div>
</div>
<div class="support-arrow">↓ 两条路线都需要回来确认用户的任务</div>
<div class="support-node"><b>发出结果与下一步 → 等待核对</b><span>技术检查通过 ≠ 对方已经做完；到约定时间仍没结论，也要更新</span></div>
<div class="support-outcomes"><p><b>确认恢复 → 结案</b><br>记录结果，关联缺陷和帮助文章</p><p><b>仍失败 → 回到调查 ↑</b><br>保留已尝试步骤，避免从头重问</p><p><b>未回复 → 未确认</b><br>适度跟进后归档，可原线程重开</p></div>
<figcaption id="support-flow-caption">“等用户”也需要下一次跟进日期；事件处理恢复了服务，仍要核对各个用户是否恢复工作。</figcaption>
</figure>

假如本例收到“图片里出现了别人的内容”，即使只报告了一次，也先按疑似数据异常调查，不能用“我们不上传图片，所以不可能”结束。反过来，要求增加云端历史，若当前根本没有这项能力，就应说明范围，调查其任务是否值得另做，而不是承诺明天修好。

一份工单记录不必很复杂：编号、任务与影响、已知环境、已尝试步骤、当前状态、负责人、下次更新时间、相关缺陷或事件。最容易漏的其实是最后两项。PostHog 的公开手册特意要求说明是谁在等谁、等什么和多久；交班时，未解决工单也必须交给下一位，而不能仍挂在离开的处理者名下。[^src-posthog-support-hero]

<h2 id="support-thread">沿着一封来信，走到能核对的结果</h2>

本组工单中的 **S-01** 是长说明在导出图片中被截断。假设用户今晚要把截图交给同事，预览看起来完整；开发者只用一行文字测试，所以没有复现。继续要求“再试一次”没有增加信息。该补问的是：预览和导出有什么不同、说明有几行，以及能否用空白图重现。

PostHog 手册的另一个原则很实用：自己能查到的环境和记录就自己查；必须请用户做额外工作时，解释为什么需要。[^src-posthog-support-hero] 在本例中，开发者看不到用户本机图片，因此需要安全样本；这并不意味着可以索要整张客户项目截图。先让对方在空白图上输入几句无敏感内容的文字，往往更容易把问题说清楚。

<div class="support-media support-thread" aria-label="S-01 英语往来教学样稿">
<div><p class="support-stamp">10 月 12 日 · 08:40 UTC+8 · 用户来信</p><blockquote lang="en"><p>The preview looks right, but the exported PNG cuts off the bottom of my note. I need to send the image to a colleague today. I tried exporting again and got the same result.</p></blockquote><p class="support-caption">已知：重试无效、导出与预览不同。未知：文字长度、版本与是否所有图片都发生。</p></div>
<div><p class="support-stamp">09:45 · 人工接单与一次补问</p><blockquote lang="en"><p>Thanks for explaining where it fails. I’m sorry the exported image is missing part of your note. I’ll investigate this as S-01.</p><p>Does the note have more than two lines? Please tell me the app version shown in Help. If you can, try the same number of lines on a blank image using dummy text. Please don’t send the original screenshot. This will help me check the layout without seeing your work.</p><p>If the deadline is close, use your usual annotation tool for this image. I’ll update you by 17:00 China Standard Time (UTC+8) on 12 October, even if I don’t have a fix yet.</p></blockquote><p class="support-caption">把用户已说过的重试记下来；第一封信承诺调查更新，不承诺当天修复。</p></div>
<div><p class="support-stamp">11:10 · 用户补充</p><blockquote lang="en"><p>Version 0.8. There are four lines. I tried a blank image with four short lines and the last line is still cut off. The preview shows all four.</p></blockquote></div>
<details class="support-thread-more"><summary>继续看往来：临时完成 → 修复通知 → 用户确认</summary>
<div><p class="support-stamp">16:40 · 复现后给临时办法</p><blockquote lang="en"><p>I reproduced the missing last line with a four-line note in version 0.8. I’ve linked your report to bug B-17.</p><p>A temporary option is to split the note into two separate two-line notes. I checked that both appear in the exported sample. Please reopen your exported PNG and check every line before using it. If that changes the layout too much, keep using your usual tool.</p><p>I haven’t verified a permanent fix yet. I’ll send the next update by 17:00 UTC+8 on 13 October.</p></blockquote><p class="support-caption">临时办法附核对动作；即使绕开成功，B-17 仍未修复。</p></div>
<div><p class="support-stamp">17:20 · 用户确认临时完成</p><blockquote lang="en"><p>Splitting the note worked. I reopened the PNG and checked all four lines. I sent this version to my colleague, but I would prefer one note next time.</p></blockquote></div>
<div><p class="support-stamp">10 月 13 日 · 16:00 · 修复通知</p><blockquote lang="en"><p>Version 0.8.1 now includes the fix for B-17. I checked one-, two-, and four-line samples in preview and export. Before reloading, copy your note text into a local document and keep the original PNG. Unsaved annotations will be lost, and you will need to recreate them. This version does not save editable drafts.</p><p>When convenient, please try a four-line dummy note again and check the exported PNG. If it still cuts off, reply here and I’ll continue from this report.</p></blockquote></div>
<div><p class="support-stamp">10 月 14 日 · 用户确认与结案</p><blockquote lang="en"><p>The four-line test exports correctly in 0.8.1. I also checked my next image and the note is complete.</p></blockquote><p><strong>记录：</strong>S-01 已确认恢复；B-17 在本例验证范围内修复。保留旧版说明及下一封相关来信的入口，不能写成“所有浏览器都不会再出错”。</p></div>
</details>
</div>

往来中，英语没有很华丽，但每一封都减少了一个不确定点。给出明确月份和 UTC 偏移，是为了让双方对同一时刻有共同理解；对方另有时区时，再附其当地时间，并核对当天换算，不凭城市印象写固定时差。翻译工具可以帮助润色，发送前仍要对照原意检查时间、否定词、版本和承诺。

实际记录中还应留下复现材料：空白 PNG、四行虚构文字、版本 0.8、预览完整而导出缺末行；修复核对至少包含原失败样本和原来正常的一、两行样本。这里没有开发该图片工具，样例教的是支持记录如何支持后续判断；真实发布必须在对应浏览器和版本中执行检查，不能直接采用故事里的“已修复”。

如果到 10 月 13 日还没找出原因，就在原定时间说明已查什么、尚缺什么、临时办法能否继续用，以及下一次更新时间。若对方已经错过期限，也要承认交付受到影响，再根据真实购买条款处理补救或退款；不要用延期承诺代替已有义务。[收款与交付](/go-global/payments)展开支付事件，[风控](/go-global/risk)区分普通沟通和正式争议，这里不另造一套退款资格。

## 不是每封信都会得到“已解决”

<details class="support-media support-followup"><summary>到了约定时间，仍没有修好时，可以怎样回复？</summary><p>下面替换 10 月 13 日的修复通知；它是一条失败分支，不与上面的顺利修复同时发生。</p><blockquote lang="en"><p>I can still reproduce the missing line. I’ve checked the sample export, but I don’t have a verified fix to release today. The two-note workaround remains available; please check the exported image, or use your usual tool if the layout is unsuitable. I’ll update you again by 17:00 UTC+8 on 14 October. You don’t need to repeat the earlier tests.</p></blockquote><p>发出更新后，工单仍是“处理中”；没有新结论，也能让对方知道下一步由你负责。</p></details>

本周还有另一位用户报告相同截断，编号 S-02。把它关联到 B-17 可以共用修复调查，却仍要向这个人单独确认结果。缺陷只有一个，受影响的人有两个；把第二封标记“重复”后直接关闭，容易漏掉真正等待的人。

另外几类情况也应保留各自的结尾。下表是本例周末时的记录，用时包括该单已经发生的阅读、补问、回复和跟进，不包含后面的公共修复与文档工作。

<div class="support-media support-table">
<table><thead><tr><th>记录与任务</th><th>本周状态</th><th>本例处理用时与下一步</th></tr></thead><tbody>
<tr><td>S-01 · 四行说明被截断</td><td>用户确认恢复，已结案</td><td>25 分钟；关联 B-17 和帮助文章 H-02</td></tr>
<tr><td>S-02 · 同一缺陷，另一人</td><td>已发修复通知，未确认</td><td>15 分钟；下一服务日跟进，不计作恢复成功</td></tr>
<tr><td>S-03 · 不知道怎样导出</td><td>说明入口后，对方确认得到文件</td><td>10 分钟；检查按钮文字是否难发现</td></tr>
<tr><td>S-04 · 想找回已关闭页面的草稿</td><td>无法恢复，已说明当前能力</td><td>10 分钟；承认损失，记录需求，不许诺不存在的云端备份</td></tr>
<tr><td>S-05 · 只说导出没有反应</td><td>信息不足，等待补充</td><td>30 分钟；已尝试公开样本，仍缺出现条件；约定一次跟进</td></tr>
<tr><td>S-06 · 某版本导出空白</td><td>已用样本复现，待修复</td><td>30 分钟；另记 B-18，不套用截断问题的办法；下一服务日更新调查结果</td></tr>
</tbody></table>
</div>

六封工单共花了 120 分钟，只有 S-01 和 S-03 有用户确认的恢复结果。S-04 得到了答复，损失却没有恢复；S-02 发过修复通知，仍没有回音。把它们全部放进“回复率 100%”或“已关闭”里，便看不到服务真正欠着什么。

对没有回信的普通问题，本例在约定时间跟进一次，说明可以沿原邮件继续；之后可归档为“未确认”，保留恢复入口。不要据此宣布用户满意。已知缺陷的调查不会因为一个人不回信就结束。若后来发现安全或数据异常，应立即转入事件流程；下面的普通容量预算也随之停止作为接单依据，不能用“还剩一小时”决定是否继续调查。

S-04 则是另一种失败。用户期待有历史，你没有做；把帮助文章发过去不会挽回已经丢掉的工作。除了清楚说明无法恢复，还要回看产品是否曾暗示“保存成功”，关闭页面前有没有足够提醒。若你的文案造成误解，应改产品和说明，再处理对这个人的补救，而不是把责任全放在“用户没看文档”。

<h2 id="support-help">把重复回复，变成一篇能帮人完成任务的文章</h2>

Plausible 描述过把反复出现的问题改进到产品和文档里的过程，文档入口也放在用户容易找到的地方。[^src-plausible-support-scaling] 这不意味着收到一封信就要写一篇长教程。对 S-01/S-02，真正需要的是一页短说明：如何辨认这个问题、当前能做什么、怎样确认导出完整，以及不符合症状时去哪里。

下面是由这两封工单整理出的 **H-02 完整样稿**。它用用户会描述的症状作标题，保留旧版本的临时办法，又把新版核对放在前面。

<article class="support-media support-help" lang="en" aria-labelledby="support-help-heading">
<p class="support-stamp">Help article H-02 · Sample revision 2 · 14 October 2026</p>
<h3 id="support-help-heading">The bottom of my note is missing in the exported PNG</h3>
<p><strong>Check the symptom.</strong> This article covers a note that is complete in preview but loses its last line in the exported image. In version 0.8, the four-line sample is affected. If the whole image is blank or export never finishes, contact support instead of assuming this is the same issue.</p>
<p><strong>Use the corrected version.</strong> Before reloading, copy your note text into a local document and keep the original PNG. Unsaved annotations will be lost; there is no editable draft to restore. Open Help and check that the version is 0.8.1. Test with a blank image and a four-line dummy note first.</p>
<p><strong>Check the result.</strong> Open the downloaded PNG separately. Compare every line with the preview, including the last line. Repeat this check on the image you intend to use.</p>
<p><strong>If you must finish in version 0.8.</strong> Split the text into two two-line notes and inspect the exported image. If that layout is unsuitable, use your usual annotation tool. Keep the original image; do not overwrite it.</p>
<p><strong>If it still fails.</strong> Reply to your existing support email, or start a new one with the app version, the failing step, and whether a dummy image shows the same problem. Do not attach confidential screenshots. We will continue the investigation; this article does not cover every export failure.</p>
</article>

把它放在导出界面的帮助入口，并在两条工单里关联 H-02。以后遇到同类问题，先核对版本和症状，再决定能否引用。不能只发一句“请读文档”：可以指出相关一步，解释为什么适用，没解决时继续接手。

服务知识库方法 KCS 中的“复用即审查”强调，在使用文章时核对和改进它，让实际需求推动维护。[^src-kcs-reuse-review] 本例可以这样落实：0.8 时第一版记录临时办法；0.8.1 发布后改成第二版，补版本检查和结果核对。下一封“按文章做仍失败”的来信，既重开调查，也标记 H-02 待检查；如果结果只是新版本按钮改名，就连同入口文字一起修。产品修复和文章维护由同一负责人关联，避免其中一边完成、另一边继续误导。

帮助文章的浏览量或工单减少，也不能单独说明它有效。人可能顺利自助，也可能找不到联系方式而放弃。更有用的证据是：同一症状有没有重复出现，照文章走的人卡在哪一步，原本的用户是否完成了任务。数量少时保留这些具体记录，比编一个漂亮的“自助解决率”更诚实。

<h2 id="support-capacity">给回复、修复和休息留出同一本时间账</h2>

六封信花了两小时，不等于每周留两小时就够。S-06 仍待修复，旧单要跟进，H-02 也要维护。少楠在成本分析中提醒，产品功能背后还有持续的业务成本；增加人员同样带来培训和沟通，而研究与反馈有时又值得投入。[^src-shaonan-cost-chain] 这里最该避免的是只统计敲出回复的几分钟。

下面为**下一周**做一次教学预算。先用本周六单的 120 分钟估出每单 20 分钟；预计再来 6 单，新来信需要 120 分钟。

其他工作还要预留：40 分钟旧单跟进（S-02 为 5、S-05 为 10、S-06 为 25 分钟）、60 分钟 B-18 修复调查、30 分钟文档、20 分钟周复盘和 30 分钟缓冲，共 180 分钟。加上新单，总共 300 分钟；每周可用 6 小时，还剩 60 分钟。

已花时间不再算进下一周，未完成事项重新估剩余工作。B-18 的 60 分钟是投入预算，不能保证修好；出现安全或数据事件时先重排处置，这份普通周预算不包含它。

<section class="support-media support-capacity" data-support-capacity aria-labelledby="support-capacity-heading">
<p class="support-stamp">教学预算 · 本地计算，不接收工单或个人资料</p>
<h3 id="support-capacity-heading">这周还能按原来的窗口接住多少求助？</h3>
<form data-support-form>
<fieldset data-support-inputs disabled><legend>改变来信和可用时间</legend>
<label for="support-count">预计新工单数 <select id="support-count" name="count"><option value="0">0 封</option> <option value="6" selected>6 封</option> <option value="12">12 封</option> <option value="18">18 封</option></select></label>
<label for="support-minutes">每单处理用时（含本周往返） <select id="support-minutes" name="minutes"><option value="10">10 分钟</option> <option value="20" selected>20 分钟</option> <option value="35">35 分钟</option></select></label>
<label for="support-hours">整周可用时间 <select id="support-hours" name="hours"><option value="3">3 小时</option> <option value="6" selected>6 小时</option> <option value="10">10 小时</option></select></label>
<label class="support-check"><input type="checkbox" name="defer"> 暂缓 30 分钟帮助文章更新，看看当周能省多少</label>
<button type="reset">恢复本例预算</button>
</fieldset>
</form>
<div class="support-capacity-result" data-support-result role="status" aria-live="polite"><p><strong>需要 300 分钟 / 可用 360 分钟，余下 60 分钟。</strong></p><p>新工单 120 + 旧单 40 + 修复 60 + 文档 30 + 复盘 20 + 缓冲 30 = 300 分钟。缓冲已经包含在总额里，剩余 60 分钟是另留的余量。</p><p>可以按当前假设排期；这不保证所有问题都能解决，也不保证来信均匀分布。</p></div>
<div class="support-budget-chart" aria-label="用时分配，单位分钟：新单 120、旧单 40、修复 60、文档 30、复盘 20、缓冲 30、余量 60。"><p class="support-caption">用时分配 · 各项使用相同刻度，余量或缺口单列</p><div><b>新单</b> <span style="--portion:100%">120 分钟</span></div><div><b>旧单</b> <span style="--portion:33.333%">40 分钟</span></div><div><b>修复</b> <span style="--portion:50%">60 分钟</span></div><div><b>文档</b> <span style="--portion:25%">30 分钟</span></div><div><b>复盘</b> <span style="--portion:16.667%">20 分钟</span></div><div><b>缓冲</b> <span style="--portion:25%">30 分钟</span></div><div><b>余量</b> <span style="--portion:50%">60 分钟</span></div></div>
<noscript><p>脚本未启用，控件不可操作。基线是 300 分钟；来信改为 12 封、每封仍为 20 分钟时，需要 420 分钟，比 6 小时多 60 分钟。即使暂缓文档，也仍差 30 分钟。</p></noscript>
</section>

把来信改成 12 封，就会超过这周的可用时间。勾掉文档并不能把事情都装回日历：还差 30 分钟，而且旧说明继续存在。这个简化计算也没有预测“更新文档以后能少几封信”，因为我们没有那份证据。再把单均用时改成 35 分钟，可以看到复杂问题稍多时，平均数怎样迅速失去安慰作用。

本例会先暂停下一轮推广，保留已经答应的跟进，把新功能开发时间拿出来处理积压，并在支持入口更新实际窗口；如果连现有承诺也无法兑现，就需要安排可靠替补或与受影响的人重新约定，不能单方面修改说明就当旧承诺不存在。只靠让回复更短，解决不了修复和交接的缺口。

## 什么时候才值得自动化、外包或加人

有几件事适合先交给规则：生成编号、提示缺少版本号、提醒即将到期的跟进、把同一缺陷下的工单找出来。它们减少漏单，但不会替你判断一张图为什么错了。固定回复也只应覆盖已经查清的条件，发送前仍需删掉不适用的步骤。

如果借助 AI 起草英文或查找帮助文章，我会先让它在已核对材料里提出草稿，保留原邮件供人对照。涉及未知原因、退款、账号恢复和安全事件时，不让语气流畅的回复自行变成处置决定；新工具如何接触邮件和附件，也会改变[数据边界](/go-global/compliance)。[AI 专项](/go-global/ai-api-extensions)有独立的草稿检查与成本推演，这里不重复推荐一套聊天机器人。

外包最值得先试的是范围清楚、可按文章复现和核对的一类问题。例如只交接 S-03 这类入口说明，提供已审阅的文章、允许查看的最少记录、升级条件和联系人；前一批逐条复核，再看实际节省了多少时间。若仍由你重新调查每一单，外包可能只是增加了一次转述。不要把管理账号共用密码作为交接办法，也不要把全部原始附件打包给对方。

交接也可以先从“能休一天假”开始：替补在什么时间接手，哪些单已有承诺，哪些动作需要回来问你，自己无权处理时找谁。没有替补时，就坦诚限制服务时段和新用户进入；需要全天候支持的业务，应先改变人员或产品安排。Plausible 开始培养替补、PostHog 增加专职工程支持，都是因为原来的工作方式碰到了真实边界，而不是工具清单里少了一个名字。[^src-plausible-support-scaling][^src-posthog-engineers-support]

周末回看时，值得留下的是几个具体变化：S-01 的工作恢复了，S-02 仍待确认，S-04 揭示了保存预期的落差，S-06 有另一项尚未修复的缺陷；H-02 需要跟版本一起维护，下一周的 6 小时也有明确用途。把这些记录接到[持续使用与迭代](/go-global/retention)和[经营复盘](/go-global/business-review)，才知道支持投入是在改善产品，还是持续替产品承担它没完成的工作。
