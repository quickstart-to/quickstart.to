---
title: 选品与验证：怎样决定先做哪一个
description: 从发现重复工作、研究现有办法，到比较候选、算清采用成本和设计试验，走完一次有依据的选品取舍。
order: 1
volatility: medium
last_verified: 2026-10-09
---

同样是做一个客户报告工具，可以帮接案者整理工时，也可以帮网站工作室解释项目进度，还可以帮广告团队汇总投放效果。界面上都可能是一张表、几幅图和一个导出按钮，背后的生意却很不一样：你要懂的工作、需要接入的数据、能在哪里找到使用者，以及出错后要负责什么，都变了。

选品难就难在这里。把三个方向各做一版，成本太高；只凭“这个功能我会写”选一个，又容易把真正困难的部分留到上线以后。

[快速入门](/go-global)走过了从找到人到首次使用的全程。这一章把镜头停在开发之前：从几种相近的工作里，选出值得先花时间了解的一种，再算一遍新工具究竟减少了多少工作。选择的理由、放下的方向，以及会让你改主意的证据，都要留得下来。

![三块不同形状的工作样板分别呈现时钟、带批注的进度和分析图形，提示相似的报告背后可能是不同任务。](../assets/compare-work-samples-v3.png)

*先把几种工作的输入和交付物摆在一起。相似的界面，不代表相同的任务。*

## 机会往往藏在一段反复发生的工作里

Jon Yongfook 在 2020 年 1 月宣布产品转向时，写过一个很具体的发现。他此前做的 Previewmojo，主要生成网页被分享时使用的 Open Graph 预览图。技术能够运行，发布时也有关注，但热度过去后，他发现不少用户并不熟悉或重视这个用途；对一些网站来说，这件事也没有频繁到值得专门解决。[^src-bannerbear-pivot]

与此同时，另一类请求反复出现：不需要 Open Graph 图片，能不能生成其他尺寸？他于是把产品转成 Bannerbear，覆盖更多社交图片用途，连同展示方式一起调整；也结束同时维护多个产品的安排，把精力集中下来。[^src-bannerbear-pivot]

图片生成的能力已经在手里，新的线索来自人们打算把图片用到哪里。继续钻研原来的技术用途，和沿着反复出现的请求调整产品，会把后续工作带向不同的地方。

<figure class="vd-media vd-pivot" aria-labelledby="vd-pivot-title" aria-describedby="vd-pivot-caption">
  <h3 id="vd-pivot-title">能力没丢，重新选择它服务的工作</h3>
  <ol class="vd-pivot-flow">
    <li><span class="vd-kicker">原来的判断</span><strong>网页分享需要预览图</strong><p>先围绕 Open Graph 做产品。</p></li>
    <li><span class="vd-kicker">遇到的新信息</span><strong>频率偏低，其他尺寸请求反复出现</strong><p>重新看用途和优先级。</p></li>
    <li><span class="vd-kicker">改变的决定</span><strong>扩展图片用途，集中做一个产品</strong><p>产品范围与展示一起调整。</p></li>
  </ol>
  <figcaption id="vd-pivot-caption">这里展示的是转向时的判断：反复出现的用途请求，改变了产品范围和投入方式。</figcaption>
</figure>

寻找自己的候选时，也可以从一段工作往外追。读产品评论、行业讨论或操作教程，先留意“我每次都得……”后面的动作：反复改格式、在两个系统间搬数据、为不同客户重写相似内容。接着寻找它的上下文：谁做、什么时候做、最后交给谁、现在怎样完成。能回答这些问题的材料，比一张热门产品榜更适合拿来提出假设。

例如，“每周做报告很烦”还不能指向周报生成器。烦的可能是各处收资料，也可能是向客户解释延期；前者需要改善输入，后者需要项目判断。先把公开线索记成“值得继续了解的工作”，不要立刻给它起产品名。一条帖子还值得沿着相关回复、现有工具和不同作者的经历继续追；几篇互相转载的文章并没有增加独立证据。

熟悉这份工作有帮助，但也需要检查经验来自哪里。V2EX 账号 softlight 在 2023 年的页面搭建器复盘中提到，自己把公司里类似技术的价值外推到独立产品，花了很多精力做模板和组件扩展，后来才发现目标用户未必需要这种依赖开发能力的机制。原公司采用的是类似思路，并没有使用这个独立产品。[^src-v2ex-builder-retrospective]

这个区别会改变选品：一家公司能从某项能力中受益，可能因为它还有开发人员、内部流程和维护预算。你准备服务的人是否也有这些条件，需要重新了解。

## 先走一遍现有办法，再寻找空缺

下面沿用全书的**教学案例**：一名熟悉网站交付的大陆个人开发者，希望服务使用英语的小型工作室，每周能拿出两个晚上，按每晚三小时计算；愿意做异步支持，暂时承担不起多平台数据接入和大团队迁移。人群、时间和产品范围都是推演前提，尚无真实客户访谈。

他先列出三个相近方向：工时明细、项目进度更新、营销效果报告。开始比较前，有一件可以实际完成的事：查看已有产品如何完成这些工作。

截至 2026-10-09，Toggl 的官方操作文档给出了一条直接路径：打开详细报告，按客户或项目及日期筛选，下载 PDF，再交给客户；需要更概括的视图时可使用汇总报告。对于已经在这里记录工时的人，“把工时整理给客户看”至少已有原生办法。[^src-toggl-client-report]

项目进度也有现成办法。Asana 的帮助文档说明，使用者可以选择项目状态，填写摘要和下一步，把里程碑等项目记录加入更新，再发布或打印。对于工作已经放在这个系统里的人，另做一个报告生成器，也需要拿出离开原流程的理由。[^src-asana-status-updates]

AgencyAnalytics 的产品页覆盖的工作又有所不同：接入营销数据，组织报告模板，安排发送，再补充专业评论。若要提供相近的交付，就不能只考虑最后那几张图，还要处理前面的数据连接和后面的解释。[^src-agencyanalytics-reporting]

<figure class="vd-media vd-alternatives" aria-labelledby="vd-alternatives-title" aria-describedby="vd-alternatives-caption">
  <h3 id="vd-alternatives-title">同样叫报告，工作从哪里开始？</h3>
  <div class="vd-lanes">
    <div><h4>工时明细 <span>Toggl 文档路径</span></h4><ol><li>已有工时记录</li><li>按客户、项目、日期筛选</li><li>导出 PDF 给客户</li></ol></div>
    <div><h4>项目进度 <span>Asana 文档路径</span></h4><ol><li>已有项目记录</li><li>选择状态，补充摘要与下一步</li><li>发布或打印状态更新</li></ol></div>
    <div><h4>营销效果 <span>AgencyAnalytics 产品描述</span></h4><ol><li>连接营销平台数据</li><li>模板组织＋专业评论</li><li>发送报告给客户</li></ol></div>
  </div>
  <figcaption id="vd-alternatives-caption">三条路径均来自已核对的公开资料。数据已经在哪里、还要补什么，决定了新工具需要替代哪段工作。</figcaption>
</figure>

读这些资料时，最有用的记录不是“竞品功能很多”。需要留下的是一条输入到输出的路线，然后追问：你想帮助的人究竟卡在哪一步？如果现成导出已经够用，再加一个中转工具，就需要说明它为什么值得多做一次操作。如果用户根本没有结构化记录，困难可能发生在报告生成之前。

这些产品并不是一份完整的竞品名单。它们先提醒我们：三种候选都有旧办法，熟悉的 B 也不例外。对没有使用项目系统的人，还可以拿“复制上一封客户邮件，改写本周进展”来比较。若一份稳定模板已经够用，新工具就需要减少实在的返工；仅仅换一种排版，还不足以解释为什么要迁移。

对出海产品，还要保留原来的工作用词。搜索可以从 `client progress update`、`timesheet report`、`agency reporting` 这类任务词分别开始，查看出现的是哪种人、哪种交付。它们只是检索入口，不是已经验证的热门关键词。记录使用者、客户所在地区、语言、常用系统和采购方式，比先把英语人群当成一个市场更接近实际选择。

## 三个候选，为什么只优先调查其中一个

在上述开发者条件下，三个方向可以这样比较。先决定把有限的调查时间花在哪里，随后再根据看到的工作判断是否开发。

<div class="vd-media vd-candidates" role="group" aria-label="三个候选的完整比较">
  <article>
    <header><span class="vd-letter">A</span><h3>把工时表变成客户明细</h3><span class="vd-verdict">暂缓</span></header>
    <dl><div><dt>现有办法</dt><dd>Toggl 文档已覆盖筛选和 PDF 交付，原生导出是需要正面比较的替代方案。</dd></div><div><dt>尚缺什么</dt><dd>哪些使用者仍需离开原工具？是合并多来源、改成指定格式，还是别的未满足任务？</dd></div><div><dt>本轮取舍</dt><dd>目前只有“再做一次导出”的想法，也没有额外的工作线索，先暂缓。若找到反复合并不同来源的任务，再重新比较。</dd></div></dl>
  </article>
  <article class="vd-priority">
    <header><span class="vd-letter">B</span><h3>整理网站项目的客户更新</h3><span class="vd-verdict">先调查</span></header>
    <dl><div><dt>现有办法</dt><dd>Asana 已有状态更新；另一个要比较的办法是沿用邮件或文档模板。独立生成器的优势尚不清楚。</dd></div><div><dt>为什么先了解</dt><dd>开发者熟悉网站交付，较容易理解一份更新前后的工作；但还没有联系人，也不知道具体返工发生在哪里。</dd></div><div><dt>本轮取舍</dt><dd>先了解现有输出为何还要重做。若系统或旧模板已够用，就停止这个方向；若确有反复整理，再尝试单人、单份文件的改进。</dd></div></dl>
  </article>
  <article>
    <header><span class="vd-letter">C</span><h3>汇总营销数据并解释效果</h3><span class="vd-verdict">超出本轮范围</span></header>
    <dl><div><dt>现有办法</dt><dd>AgencyAnalytics 展示的是连接数据、组织报告、补充解释和交付的一整套工作。</dd></div><div><dt>要承担什么</dt><dd>若承诺同类完整交付，就要处理数据权限、接口维护和营销解释；这些超过本例当前能力与时间。</dd></div><div><dt>本轮取舍</dt><dd>暂不进入。以后若已有行业伙伴和单一数据源，可以重新定义更窄的任务，不能只删功能就认为范围已收住。</dd></div></dl>
  </article>
</div>

B 值得先了解，靠的是已有经验，而不是更少的竞争。A、B 都需要找出旧办法留下的缺口；C 还要求本例当前欠缺的交付能力。如果你本来就在服务广告客户、熟悉某个数据源，顺序完全可能改变。

接下来要把“使用英语的小型工作室”收窄成一个能辨认的工作角色。本例先找**负责网站交付、亲自整理英文客户更新、能决定尝试一种辅助工具的人**。请他讲最近一份更新怎样完成，同时了解客户在哪个地区、通过邮件还是项目系统接收、由谁审阅。使用相同语言，并不意味着交付格式、沟通时间和购买决定都相同。

对每周只有两个晚上、准备做异步支持的开发者，服务条件也会筛掉候选：如果试用需要客户工作时间内即时陪同，或需要整个团队批准迁移，就要先重新估算投入。能够读英文资料，还得进一步检验能否解释一次导入错误、读懂修改意见。没有联系人时，先沿[冷启动获客](/go-global/launch)建立接触；同为开发者的朋友可以帮忙试界面，却不能替代这个工作角色。

这里也不急着决定卖多少钱。先分清谁使用、谁受益、谁能批准购买，看看他们目前有没有为这份工作花钱或投入人力。没有付费替代品并不自动等于没有价值，有付费竞品也不证明对方愿意买你的版本。价格需要对应明确的交付，后续由[定价章](/go-global/pricing)展开。

## “生成很快”，为什么整件事可能更慢

假设后续谈话确认了独立报告这个任务，还需要检查新工具有没有让它变轻。最容易漏掉的是工具两端：开始前整理输入，结束后核对、补写和发送。用户为结果负责，程序生成得快，并不能让检查自动消失。

下面用一组**合成耗时**推演 B 候选。旧办法每次用 30 分钟；新工具把整理版式压到 2 分钟，但导入准备和核对变多，日常一次变成 33 分钟，第一次还要设置 20 分钟。拖动参数，看看单次速度和多次使用后的总成本怎样变化。

<section class="vd-media vd-cost" data-adoption-demo aria-labelledby="vd-cost-title">
  <p class="vd-kicker">动手比较 · 合成数据，单位：分钟</p>
  <h3 id="vd-cost-title">把准备与收尾也算进去</h3>
  <p class="vd-cost-intro">同一种任务、输出质量相同才适合这样比较。暂不计购买价格、事故损失或开发者支持成本。</p>
  <div class="vd-work-bars" role="img" aria-label="每次旧流程 30 分钟，新流程 33 分钟；初次设置另计 20 分钟" data-cost-chart>
    <div class="vd-bar-row"><strong>旧办法 <span>30</span></strong><div class="vd-bar-track"><i class="vd-prep" style="width:8.3333%"></i><i class="vd-build" style="width:20%"></i><i class="vd-check" style="width:13.3333%"></i><i class="vd-send" style="width:8.3333%"></i></div><small>准备 5 ＋ 整理 12 ＋ 核对 8 ＋ 发送 5</small></div>
    <div class="vd-bar-row"><strong>新工具 <span data-cost-each>33</span></strong><div class="vd-bar-track"><i class="vd-prep" data-cost-segment="prepare" style="width:23.3333%"></i><i class="vd-build" data-cost-segment="build" style="width:3.3333%"></i><i class="vd-check" data-cost-segment="check" style="width:20%"></i><i class="vd-send" data-cost-segment="send" style="width:8.3333%"></i></div><small>准备 <span data-cost-value="prepare">14</span> ＋ 生成 2 ＋ 核对 <span data-cost-value="check">12</span> ＋ 发送 5</small></div>
  </div>
  <div class="vd-cost-controls">
    <label for="vd-prepare"><span>新工具：每次准备输入 <b><span data-cost-value="prepare">14</span> 分钟</b></span><input id="vd-prepare" type="range" min="0" max="30" step="1" value="14" data-cost-input="prepare" disabled></label>
    <label for="vd-check"><span>新工具：每次核对与补写 <b><span data-cost-value="check">12</span> 分钟</b></span><input id="vd-check" type="range" min="0" max="30" step="1" value="12" data-cost-input="check" disabled></label>
    <label for="vd-setup"><span>首次设置 <b><span data-cost-value="setup">20</span> 分钟</b></span><input id="vd-setup" type="range" min="0" max="60" step="1" value="20" data-cost-input="setup" disabled></label>
    <label for="vd-repeat"><span>比较多少次使用 <b><span data-cost-value="repeat">4</span> 次</b></span><input id="vd-repeat" type="range" min="1" max="12" step="1" value="4" data-cost-input="repeat" disabled></label>
  </div>
  <div class="vd-cost-result" role="status" aria-live="polite" aria-atomic="true">
    <p><strong data-cost-total>做 4 次：旧办法 120 分钟，新工具 152 分钟，多花 32 分钟。</strong></p>
    <p data-cost-reason>日常每次已经多花 3 分钟，增加使用次数也无法收回设置成本。下一轮先检查导入准备和核对工作。</p>
  </div>
  <div class="vd-cost-actions"><button type="button" data-cost-preset hidden>试试“导入顺畅”</button><button type="button" data-cost-reset hidden>恢复初始数据</button></div>
  <noscript><p>当前保留完整的初始演算。启用脚本后可调整参数；也可以按“首次设置＋次数×每次工作量”自行比较。</p></noscript>
</section>

初始结果给出了一条明确的返工线索：继续优化已经只需 2 分钟的生成环节，改善空间很小；需要先看 14 分钟的准备究竟花在哪里。如果每周都得手动改列名、拆单元格，应该尝试兼容现有导出，而不是让使用者适应一份更漂亮的新模板。

点击“导入顺畅”后，准备降到 4 分钟、核对降到 8 分钟，新流程每次 19 分钟。加上首次设置，做四次合计 96 分钟，比旧办法少 24 分钟。这时才有条件继续问：为了这些节省，对方是否愿意学习、购买，是否还有别的风险？这里的分钟数只是演算；真实试用要观察同一任务，把估计和实际计时分开记录。

对开发者，还要补上另一边的账。如果每次你都在背后修输入，用户可能确实省了时间，但你的支持工作没有消失。把一次帮助当作了解任务的机会可以，把它永久从成本里扣掉，就会误判自己能服务多少人。

## 有人愿意付钱，也要看他准备改变什么

Buffer 的早期经历说明，小信号可以支持有限投入。Joel Gascoigne 先用页面收集兴趣，再插入价格选项。那个阶段，即使点击付费方案，最后也只是留下邮箱；他随后才做出可用产品，并在发布后获得实际付款。可借鉴的是每一步暴露了新问题，不能把价格点击写成已经验证购买。[^src-buffer-early-validation]

Level 则把这个问题往前推了一步。Derrick Reimer 在 2019 年的复盘中说，他已经做过访谈、积累名单，还向约 50 人卖出了 49 美元的预订。到了安排入门和团队试用时，却只有一部分人继续；有人付款后未使用，有人看过产品却没有带团队真正尝试。少量客户转为付费使用，而且喜欢产品，但这不足以解释如何让更多团队采用。[^src-level-validation-retrospective]

他又投入数周改进，为现有客户补功能，并分批邀请更多候补者。结果仍没有出现期待中的团队试用。进一步交流揭示出两个方向的困难：小团队觉得现有工具有些烦，却不值得搬走；更大团队的痛感可能更强，但要求产品更成熟。他重新围绕过去的行为访谈，发现不少表示问题很严重的人，并没有尝试改变流程或寻找替代。[^src-level-validation-retrospective]

<figure class="vd-media vd-evidence" aria-labelledby="vd-evidence-caption">
  <div class="vd-case-grid">
    <div class="vd-case"><strong class="vd-case-name">Buffer：还要跨过交付</strong><div class="vd-case-step"><span>看页面、选价格、留邮箱</span><b aria-hidden="true">↓</b><strong>投入可用版本</strong><b aria-hidden="true">↓</b><span>真实使用与付款才随后发生</span></div><p class="vd-case-note">价格兴趣支持尝试，不能代替已完成的交易。</p></div>
    <div class="vd-case"><strong class="vd-case-name">Level：还要跨过采用</strong><div class="vd-case-step"><span>访谈赞同、付费预订</span><b aria-hidden="true">↓</b><strong>邀请团队改变工作方式</strong><b aria-hidden="true">↓</b><span>切换动力与成熟度卡住尝试</span></div><p class="vd-case-note">付款已经发生，团队真正使用仍是另一个问题。</p></div>
  </div>
  <figcaption id="vd-evidence-caption">两个历史过程暴露的是不同缺口。箭头表示后续行动，不是可以套用的转化漏斗或成功率。</figcaption>
</figure>

Level 最后的取舍还与创始人想经营什么样的公司有关。他考虑过用咨询推动组织改变、扩大销售投入等办法，但这些与保持小团队、自筹资金并尽快盈利的目标不合。因此，停止这个方向不能被压缩成“需求不存在”；它也意味着在自己的资源和经营目标下，后续路径代价过高。[^src-level-validation-retrospective]

Level 也提醒本例：若改善一份客户更新必须先让整个工作室更换系统，原先“两个晚上能尝试的辅助工具”就已经变了。先重新估算这条路，再决定是否加团队功能。

## 把选择落实到下一段工作

下一场谈话可以从一份旧输出开始：最近一次客户更新从哪些资料整理而来，发送前又改了什么，为什么没有直接使用系统里的更新或上次的模板？请对方按一次实际任务讲解，可用口头描述或虚构样本说明结构。需要真实文件时，再按[合规章](/go-global/compliance)确认权限和处理范围。先看完旧办法，才能知道样稿该改变哪里。

留下一份短记录，把这次调查与之后的开发分开：

<aside class="vd-media vd-brief" aria-labelledby="vd-brief-title">
  <div class="vd-brief-top"><span class="vd-kicker">本例的决定记录</span><h3 id="vd-brief-title">先看一份已经发出的客户更新</h3></div>
  <dl>
    <div><dt>先找谁</dt><dd>亲自整理英文客户更新、能尝试辅助工具的网站交付负责人。先建立接触，不开始做通用周报生成器。</dd></div>
    <div><dt>看什么</dt><dd>一份既有输出及其整理过程，尤其是现有状态更新或旧模板为何仍需返工。若旧办法够用，这次调查可以就此结束。</dd></div>
    <div><dt>何时做样稿</dt><dd>确认具体返工后，下一周用 1 小时整理输入/输出差异、3 小时做最小样稿、1 小时观察试用、1 小时整理结果；等待回复或任务发生不计入这六小时。</dd></div>
    <div><dt>先不增加</dt><dd>云端历史、团队权限、平台集成。若缺少其中一项就无法试用，先重新估算任务范围。</dd></div>
    <div><dt>试用时看</dt><dd>输出能否进入客户交付，导入与核对是否抵消了生成环节的节省，你是否必须持续代劳。</dd></div>
  </dl>
</aside>

<div class="vd-media vd-signals" role="group" aria-label="新的观察会怎样改变这份选择">
  <p class="vd-kicker">出现新证据后，怎样改决定</p>
  <details><summary><span class="vd-signal-number">01</span> <span>现有状态更新或旧模板已经够用</span></summary><div><p>停止当前“生成文件”的试验。若客户直接看共享看板，就沿着看板了解是否还有具体困难；没有发现缺口时，不必要求用户额外制作一份报告。</p></div></details>
  <details><summary><span class="vd-signal-number">02</span> <span>输出有用，但每次都要手动重排输入</span></summary><div><p>保留人群与交付，优先兼容一种实际导出格式。重新观察整段工作；若适配需要持续人工修复，再决定是否改变交付方式或停止。</p></div></details>
  <details><summary><span class="vd-signal-number">03</span> <span>已经用进客户交付，也能独立重复完成</span></summary><div><p>记录这条具体路径，继续了解报价、购买者和支持工作。先扩大到相近任务，避免一次有效就同时增加语言、平台和客户类型。</p></div></details>
</div>

换成你自己的方向时，把候选、现有办法和手头资源换掉，再看是否还能得到同样的选择。保留那些会改变下一步的信息：谁负责这件事、旧办法在哪一步不够用、你能承担怎样的试验。下次拿到一份新样本，就沿着这些前提修订记录。

*历史案例采用作者自述，未独立审计经营结果；Bannerbear 的转向公告也不代表后续结果。产品路径依据截至 2026-10-09 的公开文档，未登录实测。教学比较与耗时演算用于解释方法，不证明市场需求。*
