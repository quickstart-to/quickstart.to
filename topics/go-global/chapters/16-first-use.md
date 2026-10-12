---
title: 首次使用体验：让陌生人独立完成一件事
description: 从入口、样本和输入准备走到第一份可用输出，展开空态、错误恢复、求助和任务观察；用可操作的报告样本区分完成演示、独立使用与真正用上。
order: 5
volatility: medium
last_verified: 2026-10-11
slug: first-use
---

你在视频通话里演示了一次，几分钟就生成了报告。对方说看起来很方便，你把网址发过去。两天以后没有动静：是没有需要，还是不知道该导出哪张表？文件打不开，还是生成的内容不能交给客户？如果你一直在旁边解释，演示顺利很难回答这些问题。

前面的[市场与适配](/go-global/market-fit)解决“我能服务谁、双方怎样理解同一件事”。这一章把视线移到你离开屏幕之后：一个第一次来的人，能不能带着自己的任务走到结果，遇到问题时还能继续。

仍沿用**虚构的浏览器周报工具**。使用者是负责客户更新、能自行选择辅助工具的英语小型网站设计工作室负责人。CSV 留在本机，不接 AI，不保存云端报告；工具整理记录，项目状态与下一步由负责人判断。我们会做出一条完整的首次使用路径，以及一次可以照着组织的任务观察。它是教学设计，没有真实客户或试用成效。

## 先确定他要完成什么，再决定怎样带路

“注册成功”很容易数，“看完教程”也很容易数，但对这个负责人来说，他来的理由是完成一份客户更新。首页应当先让他看见输入、输出和需要自己补的判断；账号、偏好、工作区是否必须现在配置，要看它们是否影响眼前的任务。

对本例，第一步可以给出下面这段入口文案。它把一个容易误会的承诺说清楚：生成的是待检查的草稿，按下按钮不会替用户联系客户。

<aside class="first-media first-entry" aria-labelledby="first-entry-title">
<p class="first-eyebrow">入口样稿 · 英语试用页</p>
<h3 id="first-entry-title" lang="en">Create a client update from your project records.</h3>
<div lang="en"><p>Turn your task and time records into a draft you can review. Add the project status and next step yourself. Nothing is sent to your client.</p><p>Try a two-row sample, or prepare your own CSV. Your file stays in your browser. Keep your usual reporting method available while you try this version.</p></div>
<div class="first-entry-links"><a href="#first-demo-title">试一份两行样本 ↓</a><a href="#first-input-title">查看自带文件的准备说明</a></div>
<p class="first-caption">两个入口通向同一项任务。已经准备好文件的人，不必先看完一轮介绍。</p>
</aside>

这里选择“样本可先试、自带文件可直达”，因为本例的输出短、操作可逆，也不需要先接入团队系统。Nielsen Norman Group 的空态设计文章展示过类似选择：Loggly 在没有日志时，同时提供接入真实来源和填入演示数据的入口。文章的重点是告诉用户当前为什么空着，并给出可以直接采取的动作。[^src-nng-empty-states]

但样本有一个明显的弱点：它是我们准备好的。列名规整、内容完整，用户也不用想客户到底要看什么。顺利处理样本，只能说明这条演示路径能走通。因此样本之后还要让用户用自己工作中的结构再试一次；不允许分享原始资料时，可以保留列名关系、换成虚构内容。准备和修改花掉的时间，要一起算进[完整工作成本](/go-global/validate-idea#vd-cost-title)。

另外两条路线也有用处。只有一个清楚输入的工具，可以直接开始，不必强塞样本；复杂团队产品若要取得权限、导入历史数据、约定多人职责，第一次由人协助可能更合适。代价是你的时间，以及尚未成立的独立使用能力。对只能做英文异步支持的个人开发者，如果每一位用户都要在另一个时区约通话，首版范围就需要重新收窄。

## 把“还没有”与“做不成”画成不同的路

没有输入时，空白区域可以展示一份输出的样子，并说明怎样开始。有文件却没有记录时，应告诉用户读到了表头、没有可生成的行。处理尚未结束时，说明正在做什么；处理失败时，说明哪一步没有完成。NN/G 特别提醒过把“仍在加载”错误显示为“没有记录”的问题：同样一块空白，会让用户作出完全不同的判断。[^src-nng-empty-states]

对这份周报，首次完成的含义也要明确：输入行对应正确，工时合计可核对，人工状态与下一步已经补上，导出的草稿能重新打开。客户有没有收到或采用，是后续要问的问题，不能从下载按钮推断。

<figure class="first-media first-flow" aria-labelledby="first-flow-title" aria-describedby="first-flow-caption">
<h3 id="first-flow-title">从空白页到一份可以核对的草稿</h3>
<ol>
<li><a href="#first-entry-title"><b>01 · 看懂任务</b><span>确认输入、输出与不会自动发生的动作</span></a></li>
<li><a href="#first-input-title"><b>02 · 准备输入</b><span>用样本开始，或按说明准备自己的文件</span></a><aside><strong>没有记录 →</strong> 说明空在哪里；换样本或回到原工具导出，保留已写的项目说明。</aside></li>
<li><a href="#first-demo-title"><b>03 · 检查并预览</b><span>数据整理与负责人判断在这里合到一起</span></a><aside><strong>有错误 →</strong> 定位行与字段 → 修改 → 回到本步。不能静默丢行后报成功。</aside></li>
<li><a href="#first-output-title"><b>04 · 核对并带走</b><span>逐项对照原记录，打开导出文件，再决定如何交付</span></a></li>
</ol>
<div class="first-flow-exit"><strong>任何一步走不下去：</strong><a href="#first-help-title">带着最小问题说明求助</a>；赶不上交付期限时，先用旧办法。得到帮助后回到受阻的那一步。</div>
<figcaption id="first-flow-caption">恢复路径回到原任务，求助也保留上下文。首次使用不应只有一条从不出错的直线。</figcaption>
</figure>

<h2 id="first-input-title">输入准备，是产品替用户承担了多少工作</h2>

先看一份本章使用的完整样本。`Project North` 的两条记录分别是调研 3 小时、报告草稿 2 小时。负责人另行确认：草稿已准备好供审阅，下一步请客户反馈。这两个判断不藏在工时里。

```csv
project,task,hours
Project North,Research,3
Project North,Draft report,2
```

如果用户的原文件写的是 `Time spent (min)`，把列名改成 `hours` 并不能完成转换。比如同两项任务原来是 180 和 120 分钟，分别除以 60，才能得到样本中的 3 和 2 小时；先确认原单位，再处理数值，最后回算 300 分钟是否仍对应 5 小时。若实际用分号分隔，解析器也要按真实格式处理。市场适配章已经展开了[日期、数字与时区](/go-global/market-fit#market-demo-title)；这里更重要的是在选择文件之前，把产品真正支持的输入写出来。

下面是本例拟采用的首版约定，并非行业通用格式：只处理同一项目的一份 UTF-8、逗号分隔 CSV，首行是 `project,task,hours`；工时用小时、小数点，不接受把 `2h` 或 `1,5` 猜成某个值。文件先在本机副本上整理，不覆盖原件。如果用户每周都要手工改一遍，就应调查列名对应或单位转换是否值得做进产品。不能一面宣称省时间，一面把转换成本留给用户。

<div class="first-media first-spec" lang="en" aria-label="英文输入说明样稿">
<h3>Before you choose a file</h3>
<p>Use one project per CSV. Include a header row with project, task, and hours. Use decimal hours, such as 1.5. Blank hours are not treated as zero.</p>
<p>Work on a copy of your export. Keep your original file. If the columns or units do not match, check the sample before changing anything.</p>
<p>This pilot does not store report history. Download the draft before closing the page. Account and payment records, if used, are handled separately from the CSV.</p>
</div>

这条路线没有把一切准备都自动化，也不适合必须保持原系统格式的团队。在尚未了解输入差异时，说明支持范围比默默猜测更可取；已经反复出现的格式，则不该永远靠一篇帮助文档让用户绕路。后面的任务观察会帮助你判断该增加兼容，还是这项工具根本不值得对方迁移。

## 试一次出错，再看能否接着做完

W3C 的表单指引要求错误能让用户知道哪个字段出了问题、如何修改，并能返回对应位置；提交结果也要清楚可感知。[^src-w3c-form-notifications] 对周报工具，“Invalid input”提供的信息太少。更有用的提示是：第 3 行的工时是 `two`，请输入以小时为单位的数字，例如 `2`；刚才写的项目说明仍然保留。

下面的演示从空态开始。先载入“工时写错的样本”，写一条不同的状态说明，再尝试预览。把 `two` 改成 `2` 后，检查说明是否还在。也可以暂时排除有问题的一行，观察为什么得到 3 小时，却还不能带走一份完整报告。

<section class="first-media first-demo" data-first-demo aria-labelledby="first-demo-title">
<p class="first-eyebrow">本地操作 · 固定的合成记录</p>
<h3 id="first-demo-title">让错误留在原处，把工作继续做完</h3>
<p>只操作下面两行样本，不接收真实文件。刷新页面会清空本次编辑。</p>
<fieldset data-first-presets disabled>
<legend>选择一份输入</legend>
<div class="first-buttons"><button type="button" data-first-preset="good">完整样本</button><button type="button" data-first-preset="bad">工时写错的样本</button><button type="button" data-first-preset="empty">只有表头的文件</button></div>
</fieldset>
<p class="first-status" id="first-state" data-first-state role="status" aria-live="polite">尚未载入样本。选择一份输入，开始制作 Project North 的草稿。</p>
<form data-first-form novalidate hidden>
<fieldset data-first-fields>
<legend>输入记录与负责人判断</legend>
<div data-first-rows>
<div class="first-row"><div><strong>第 2 行 · Research</strong><span>Project North · 工时 3 小时</span></div><b aria-hidden="true">3 h</b></div>
<div class="first-row"><label for="first-hours">第 3 行 · Draft report <span>工时（小时）</span></label><input id="first-hours" name="hours" type="text" inputmode="decimal" maxlength="12" value="2" aria-describedby="first-hours-hint first-hours-error"></div>
<p id="first-hours-hint" class="first-caption">接受 0–1000 的数字，最多两位小数，如 2 或 1.5；这是本演示的输入范围。空白不等于 0。</p>
<p id="first-hours-error" class="first-error"></p>
<label class="first-check"><input type="checkbox" data-first-exclude> 暂时排除第 3 行，只看局部预览</label>
</div>
<div class="first-manual">
<label for="first-project-status">项目状态（由负责人填写）<input id="first-project-status" name="status" type="text" maxlength="180" value="Draft ready for review." aria-describedby="first-status-error"></label><p id="first-status-error" class="first-error"></p>
<label for="first-next">下一步（由负责人填写）<input id="first-next" name="next" type="text" maxlength="180" value="Ask the client for feedback." aria-describedby="first-next-error"></label><p id="first-next-error" class="first-error"></p>
</div>
<button type="submit" class="first-primary">检查并生成预览</button>
</fieldset>
</form>
<div data-first-errors class="first-errors" role="alert"></div>
<div data-first-preview class="first-preview" hidden>
<h4 data-first-preview-label>交付前预览</h4>
<pre data-first-report lang="en"></pre>
<p data-first-preview-note></p>
<button type="button" data-first-download disabled>下载这份示例草稿（TXT）</button>
</div>
<button type="button" data-first-reset hidden>清空编辑，回到起点</button>
<noscript><p>脚本未启用，不能操作样本；下方的固定过程与完整输出仍可阅读。</p></noscript>
<details class="first-static"><summary>不操作也能看懂：错误、排除与修复的三种结果</summary><p>工时为 3 和 two：第 3 行无法解释，停止生成，保留负责人已写的说明。明确排除该行：只得到 Research 的 3 小时，标明缺一行的局部预览，不开放完整导出。将 two 改成 2，并取消排除：两行共 5 小时，状态和下一步不变，得到下方完整草稿。若工时确实为 0，可显式填 0；不能用它代替尚未知道的值。</p><p>只有表头：显示没有任务记录，保留手写说明，可换样本继续。这里重现的是输入检查与恢复过程，不是通用 CSV 解析器；编码、分隔符、复杂引号、大文件和真实文件导入仍需在产品中单独验证。</p></details>
</section>

“排除错误行”值得单独停下来想一想。用户可能只想看看布局，因此允许局部预览有用；但如果系统悄悄略过那一行，报告里的 3 小时看上去同样像一个正确结果。本例让部分结果留在屏幕上，写清缺了什么，修复后再开放完整导出。正式产品若允许导出部分结果，也必须把遗漏带进文件，并让用户确认它能否用于当前任务。

保留工作同样需要边界。这里的编辑只留在当前页面内存，刷新或关闭后消失，因此出口旁要说清楚。若你增加草稿自动保存，保存在哪里、保存多久、共享设备会看到什么，都需要重新安排；这已接到[数据与合规](/go-global/compliance)的决定，不能只加一句“已自动保存”就结束。

<h2 id="first-output-title">让用户能判断结果，而不只是看到“成功”</h2>

恢复正确输入以后，完整草稿应当像下面这样。它保留两行明细，合计能够回算，也清楚区分记录与人工结论。演示中的下载会生成这份文本的当前版本，不会发送邮件或替用户确认交付。

<figure class="first-media first-output" aria-labelledby="first-report-title">
<h3 id="first-report-title">一份已填好的客户更新草稿</h3>
<div lang="en"><p class="first-report-heading">Client update — Project North</p><dl><div><dt>Recorded work</dt><dd>Research: 3 h<br>Draft report: 2 h<br><strong>Total: 5 h</strong></dd></div><div><dt>Project status</dt><dd>Draft ready for review.</dd></div><div><dt>Next step</dt><dd>Ask the client for feedback.</dd></div></dl><p>Draft for review. Not sent to the client.</p></div>
<figcaption>把合计与原记录对照，再读状态和下一步。5 小时不能证明项目进展顺利，也不能证明客户已经批准。</figcaption>
</figure>

在原产品里，还要看下载之后的那一步：文件在目标设备上是否能打开，长项目名和客户语言是否完整，交付格式是否合适。如果客户要的是现有项目系统中的状态更新，那么一份 TXT 即使导出正确，也可能增加一次复制工作。此时应改交付形式或回到旧办法的比较，不能把更多引导当作解法。

对一次性文件工具，做到这份输出可用可能就足够。团队产品还要观察同事接手，周期性工具则要等下一次任务。本书把这些结果分别记录到[持续使用与迭代](/go-global/retention)，不要求每一种产品都让用户天天回来。

<h2 id="first-help-title">帮助出现在卡住的地方，也要有人接得住</h2>

出海的求助可能隔着语言和时区。遇到错误时，让用户到一座空的帮助中心里重新搜索，不一定比一条简短说明更有用。第一版先把最常见的几个问题放在受阻位置：文件还没准备好、某一行不符合格式、结果与原记录不同、下载后打不开。每条说明给出现在能尝试的动作，以及仍失败时该带什么来求助。

PostHog 的邮件引导复盘说明，上下文并不是设置一个标签就自然可靠。早期流程按有没有接入数据决定发送内容，检查却不可靠，用户反映收到错误邮件；后来流程增加到几十封模板，团队又因维护负担简化。2025 年的版本重新围绕数据是否进来、先选了哪个产品来安排帮助。[^src-posthog-onboarding-email]

这个过程对小产品的启发是先弄清卡点，并能维护对应的帮助。还没有可靠使用状态，就不必安排一长串自动提醒。PostHog 作者也写到，越来越多时间花在回复用户邮件上；帮助入口意味着持续接待工作。它没有证明照抄那套流程会改善你的首次使用，更没有替你承担回复。[^src-posthog-onboarding-email]

下面把本例一次求助写完整。错误编号是教学设定，回复时间沿用适配章的一次试用约定；发布产品时应换成实际能兑现的安排。

<aside class="first-media first-help" aria-label="英文错误帮助与求助样稿">
<h3>在错误旁放这一段</h3>
<div lang="en"><p><strong>Row 3: hours must be a number.</strong> Use decimal hours, for example 2 or 1.5. Your project status and next step are still here. Your CSV has not been uploaded.</p><p>If the value looks correct but the error remains, send the error code HOURS_FORMAT, the row number, and a made-up row with the same structure. Please do not send client files or screenshots containing client details.</p><p>For this pilot, questions are handled by email. I will reply by 13 October 2026, 12:00 UTC. If that misses your deadline, use your usual reporting method for this update.</p></div>
<h3>一份足够开始排查的求助</h3>
<div lang="en"><p><strong>Subject:</strong> HOURS_FORMAT when creating a preview</p><p>I selected a CSV and reached the preview step. Row 3 is flagged. A made-up row with the same structure is: Project North,Draft report,two. I expected to enter two hours. My written status is still present. No client file is attached.</p></div>
</aside>

真的排查时，再按问题补问浏览器、系统、版本或是否能用样本复现。先拿最少的信息，避免为了查一个列名就收整张客户表；无法安全提供内容时，也可以只描述操作与错误。回复后记录是哪条说明帮助恢复，并把反复出现的问题修到入口或产品里。

收到这封求助后，如何继续补问、跟进和确认结果，见[客服与服务运营](/go-global/customer-support#support-thread)。

## 让不同的操作方式，都能沿这条路走下去

首次使用不只发生在开发者熟悉的宽屏和鼠标上。英文长标签、小屏、放大文字、键盘操作，都会暴露另一种“我不知道下一步在哪里”。W3C 的入门检查把可见键盘焦点、缩放、语言与表单标签列为基础项目，同时明确这些检查并不全面。[^src-w3c-easy-checks]

这时可以顺着同一个任务检查，而不另做一张脱离产品的清单：不用鼠标能否选择样本、改值、提交并定位错误；标签会不会在输入后消失；放大后错误和按钮是否仍可见；结果变化是否既有文字，也能被辅助技术感知。用拖放上传时仍要留普通选择文件的入口，不能只让鼠标手势通行。错误行的颜色可以辅助定位，但不能成为唯一提示。[^src-w3c-form-notifications]

本章的小演示保留了键盘控件、字段说明、动态反馈和静态过程。它们提供了可参考的做法，真实使用体验还需要进一步观察。GOV.UK 的研究方法提醒，辅助技术使用者通常有自己的熟悉设置，观察时尽量让他们使用自己的设备。[^src-govuk-usability-testing] 找到真实使用者之后，需要补上这种实际任务观察，不能用开发者的一次 Tab 键检查代替。

## 最后留下一份观察，而不是一张漂亮的漏斗

[持续使用章](/go-global/retention#有时该补的是基本功)引用过 flomo 的反思：有些人已经付费，却到期仍不知道已有功能。[^src-flomo-pricing-learning] 这说明引导值得认真做，但不能倒过来把所有流失都解释成引导不好。

Bannerbear 创始人 Jon Yongfook 在 2023 年也曾怀疑注册到付费的比例太低，是否应该重做引导。他检查最近一批注册和项目活动，才发现大量账号没有走出第一步，怀疑存在自动化滥用。做了防滥用处理等调整以后，注册分母明显减少，比例变好；新增付费人数却没有按那个比例成倍增长。[^src-bannerbear-onboarding-diagnosis] 这是作者的自述，包含同时发生的多项改动。可以借鉴的是回到具体记录寻找原因，不能据此断定你的零活动账号也都是机器人。

对于还只有几次试用的工具，先逐个观察比先画漏斗更有解释力。邀请一个实际或可能使用产品的人，给他能理解的任务目标，少提示具体按钮。GOV.UK 的方法指南强调任务不能把答案藏在说明里；完全卡住时可以帮他继续，以便了解后面的路径，但这次帮助应当进入记录。[^src-govuk-usability-testing]

例如，不说“选样本，把 two 改成 2，再按预览”，而说：

> You are preparing a client update for Project North. Use these task records to make a draft you would be comfortable reviewing for your client. The project draft is ready for review, and the next step is to ask for feedback. Please talk through what you are looking for. Nothing will be sent.

操作演练可以给出详细步骤；观察陌生人是否会用时，就换成这段中性目标。参与者应事先知道研究目的、是否记录、可以退出；只在同意的范围内观察。语言理解困难与产品操作困难也要分别记下，不要把流利英语或熟悉你的产品当作入选条件，最后又声称已验证所有目标用户。

下面是**另一组 4 次虚构的首轮观察**，不是前几章试用批次的后续。它们展示同样的“有人来了”，会导向怎样不同的下一步。

<div class="first-observations">
<table><thead><tr><th scope="col">记录</th><th scope="col">看到了什么</th><th scope="col">接下来做什么</th></tr></thead><tbody>
<tr><th scope="row">U1 · 样本会用，自己的表卡住</th><td>样本独立完成；原表工时以分钟记录，经开发者解释转换后完成，协助 4 分钟；未确认客户采用。</td><td>调查目标用户的导出结构。先补明确单位与转换说明，再看是否需要产品内转换；不记为独立完成真实任务。</td></tr>
<tr><th scope="row">U2 · 修好错误，打开了草稿</th><td>自己定位并修复空白工时，生成并打开导出；负责人确认内容可供审阅，尚未交给客户。</td><td>保留可定位、可恢复的路径。到实际交付后再询问是否采用；现在只记录首次独立完成。</td></tr>
<tr><th scope="row">U3 · 操作清楚，输出仍不合用</th><td>能完成，但客户要求直接更新原项目系统；导出文件反而增加复制工作。</td><td>回到交付方式与旧办法比较，暂不加教程；先弄清这是不是值得服务的任务。</td></tr>
<tr><th scope="row">U4 · 打开以后，没有进一步回应</th><td>只知道访问过，任务是否发生、是否尝试、哪里受阻均未知。</td><td>按约定询问一次具体任务近况，保留未知；不能填写“没需求”或“引导失败”。</td></tr>
</tbody></table>
</div>

这份记录导向的下一步很有限，也很具体：保留 U2 能用的恢复方式，先解决 U1 的输入准备，重新核对 U3 的交付要求，给 U4 留下未知。修改以后，再找条件相近的人走一次同样任务，记录用了哪个版本、得到什么帮助。小样本能帮你找到问题，不能证明某项改动单独造成增长。

如果用户已能独立完成，还要不断靠你催促才想起使用，继续读[持续使用与迭代](/go-global/retention)。如果所有人都卡在同一列，先把这一列做好。第一次体验最终留下的，应是一份用户看得懂、检查得了、能带回工作里的结果，以及一次遇到问题还能继续的经历。
