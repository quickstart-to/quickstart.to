---
title: 持续使用与迭代：下一轮到底该改什么
description: 从任务周期和逐人使用记录出发，分清未知、旧办法与人工协助，用有限时间修复真正妨碍交付的问题。
order: 5
volatility: medium
last_verified: 2026-10-09
---

试用结束时，最容易留下的是一张功能清单：有人想换配色，有人要云端历史，有人希望报告能自己写出项目结论。每条听起来都有道理。可你只有两个晚上，先做哪一条？

“被提到最多的”不一定最该做。提出需求的人可能已经在用产品，也可能还没完成第一次导入；他要的功能，可能是在描述一种解决办法，而不是问题本身。把这些声音直接排进开发日程，就失去了最重要的一步：这项改变会帮谁，在什么任务里，少掉哪一段工作？

[冷启动获客](/go-global/launch)关心怎样让第一次接触走向使用；这一章接着看任务再来时发生了什么。我们会把一批记录读完，选出一项有限的修订，并写清楚什么结果会让自己继续或停下来。

## 人没有回来，任务回来了吗

对周报工具，“打开网站”与“用报告完成客户更新”之间，还隔着导入、检查、改写和交付。前者容易计数，后者才接近我们承诺的结果。即使看到下载，也不能知道文件后来是否被放进客户邮件，还是因为不能用而被丢弃。

Amplitude 的留存方法把两个前提放在计算之前：什么动作代表产品的核心价值，以及人通常多久需要完成一次。按周发生的任务，用每天回来的人数评价，就可能把正常的使用节奏误读成流失。[^src-amplitude-usage-interval] 对早期小工具，这不意味着先装一套复杂分析系统；先把任务和观察窗口说清楚，往往更要紧。

沿用本书的教学案例：大陆个人开发者，为使用英语的小型网站设计工作室制作浏览器内的 CSV 周报工具。原文件留在本机，报告交给操作者核对，再由他发给客户。本章另设一批 **8 位已完成首次试用的人，在随后 14 天内观察下一次同类任务**。以下人物、反馈与时间都是合成记录，没有真实招募或回访；14 天只是演示窗口，不是周报产品的通用标准。

<figure class="retention-media" aria-labelledby="retention-records-title">
<p class="retention-kicker">同一批试用者 · 首次完成之后的 14 天</p>
<h3 id="retention-records-title">八条记录，不能只剩一个百分比</h3>
<ol class="retention-records">
<li><b>A</b><div><strong>第 4 天，独立生成并用于客户更新</strong><span>输出可用，希望以后能换配色；本次没有请求开发者帮助。</span></div></li>
<li><b>B</b><div><strong>第 7 天，独立完成，但先改了 12 分钟列名</strong><span>报告仍被用上；额外准备是否抵消整理收益，需要比较完整工作。</span></div></li>
<li><b>C</b><div><strong>第 8 天，在开发者协助后完成并交付</strong><span>开发者花了 22 分钟解释列名对应；C 希望下次能从云端打开旧项目。</span></div></li>
<li><b>D</b><div><strong>第 6 天，导入受阻，最后用了旧模板</strong><span>开发者协助了 12 分钟，仍没在客户期限前做完；问题也在列名对应。</span></div></li>
<li><b>E</b><div><strong>第 9 天，主动选择旧模板</strong><span>客户更需要延期原因和下一步判断。E 希望工具代写解释，目前的字段整理帮助不大。</span></div></li>
<li><b>F</b><div><strong>本轮没有新客户更新任务</strong><span>已回信确认项目暂停；既不能说再次使用，也不能据此认定产品被放弃。</span></div></li>
<li><b>G</b><div><strong>下一次任务在观察窗口之外</strong><span>已确认实际按月交付；“周报工具”的叫法不改变他的工作周期。</span></div></li>
<li><b>H</b><div><strong>尚未回信，任务和结果都不清楚</strong><span>没有足够证据归入前面任意一类，保留待确认。</span></div></li>
</ol>
<figcaption>记录的是下一次同类任务及其结果；同一个人反复打开页面，不增加人数。首次没有完成的试用者应另记在首次使用记录里，不能从整体获客与使用复盘中消失。</figcaption>
</figure>

如果只看“又用过”，A、B、C 都能算进去。但 C 依赖帮助，D 也消耗了支持时间，最后却没用上。反过来，F 和 G 的情况是任务还没发生，H 是不知道。把后三人统一写成“不喜欢”，会让你去修一个尚未确认的问题。

下面可以改变“什么算符合结果”，再模拟 H 的回信。两种分母会一直同时保留：整批人回答这段时间实际看到了多少；有任务的人回答在已知机会里发生了什么。后者是诊断视角，**不能用它替换整批记录，再宣布留存提高了**。

<section class="retention-media retention-demo" data-retention-demo aria-labelledby="retention-demo-title">
<p class="retention-kicker">本地合成记录演示 · 无数据上传</p>
<h3 id="retention-demo-title">改变口径，结果会怎样变？</h3>
<fieldset disabled>
<legend>调整判定与补充证据</legend>
<div class="retention-controls">
<label for="retention-criterion">什么结果才计入分子<select id="retention-criterion" data-retention-criterion><option value="used">用进交付，允许协助</option><option value="independent">独立完成并用进交付</option></select></label>
<label for="retention-evidence">模拟 H 后来补充的记录<select id="retention-evidence" data-retention-evidence><option value="unknown">仍然不知道</option><option value="no-task">确认没有下一次任务</option><option value="independent">有任务，独立完成并用上</option><option value="assisted">有任务，协助完成后用上</option><option value="alternative">有任务，采用了旧办法</option></select></label>
</div>
</fieldset>
<div class="retention-metrics">
<div><h4>原来 8 人中的完成情况</h4><strong data-retention-fixed>3 / 8 · 37.5%</strong><p>分母保留整批人；没有证据的结果不计入分子。</p></div>
<div><h4>已确认有任务的人之中</h4><strong data-retention-conditional>3 / 5 · 60%</strong><p>只解释已知任务机会，不代表其他人将来一定使用，也不是总体留存率。</p></div>
</div>
<p data-retention-missing>确认暂无任务 2 人；任务与结果未知 1 人。所有 8 人仍保留在整批记录中。</p>
<ul class="retention-people" aria-label="所有人的当前模拟状态">
<li data-retention-person="A" data-qualified="true"><b>A</b> <span>独立完成并用上</span><em>符合当前口径</em></li>
<li data-retention-person="B" data-qualified="true"><b>B</b> <span>独立完成并用上</span><em>符合当前口径</em></li>
<li data-retention-person="C" data-qualified="true"><b>C</b> <span>协助完成后用上</span><em>符合当前口径</em></li>
<li data-retention-person="D" data-qualified="false"><b>D</b> <span>任务发生，采用旧办法</span><em>未计入分子</em></li>
<li data-retention-person="E" data-qualified="false"><b>E</b> <span>任务发生，采用旧办法</span><em>未计入分子</em></li>
<li data-retention-person="F" data-qualified="false"><b>F</b> <span>确认尚无下一次任务</span><em>未计入分子</em></li>
<li data-retention-person="G" data-qualified="false"><b>G</b> <span>确认尚无下一次任务</span><em>未计入分子</em></li>
<li data-retention-person="H" data-qualified="false"><b>H</b> <span>任务与结果尚不清楚</span><em>未计入分子</em></li>
</ul>
<p class="retention-status" role="status" aria-live="polite" data-retention-status>当前允许开发者协助，符合记录为 A、B、C。切换口径不是改善产品。</p>
<button type="button" data-retention-reset hidden>恢复原始记录</button>
<noscript><p>脚本未启用，可直接阅读原始结果和下方固定算例。</p></noscript>
<details class="retention-static"><summary>查看固定算例与适用边界</summary>
<p>要求独立完成时，只计 A、B：整批为 2 / 8，即 25%；已确认有任务的人之中为 2 / 5，即 40%。若 H 补充“有任务但用了旧办法”，原来的 3 份交付不变，条件分母变成 6，得到 50%。若 H 只是确认没有任务，分子、任务分母都不变，减少的是未知项。</p>
<p>这是一批已完成首次试用者的下一次任务观察，不是分析平台的标准留存曲线，不覆盖首轮未完成者。样本太小，不能据此设定行业达标线或推断稳定需求；没有任何真实用户数据。</p>
</details>
</section>

这组记录现在更适合回答“下一轮查哪里”，还不适合回答“市场已经成立了吗”。即使下一次多一人使用，也应先看他是谁、任务有没有变、得到多少帮助。陌生人和熟人、单人决策与团队审批、按周与按月交付，混在一个数字里，会遮住不同的原因。

对于一次性文件转换，先确认任务做成、输出可用；没有第二次任务，不必强求每周回来。对于团队产品，要分别看操作者完成了什么、同事或客户有没有采用，以及购买者是否愿意继续付费。登录、交付、续费可以相互补充，但不能彼此替代。

## 反馈要分组，不能只留下满意的人

Superhuman 创始人 Rahul Vohra 回顾 2017 年的探索时，先询问已经体验过核心产品的人，再看他们真正重视什么。喜爱产品的人反复提到速度；同样重视速度、却还有障碍的人，帮助团队辨认出移动端、日历等缺口。日历原本并不是团队凭自身习惯会优先处理的功能，这次反馈改变了排序。[^src-superhuman-pmf]

这里有用的不是一条满意度百分比，而是把“谁、得到什么、还缺什么”连起来。已经享受到核心价值的人，能解释该保护什么；想完成同类任务却受阻的人，能指出下一步缺口。原作者随后把强化已有优势和解决障碍同时放进路线图，按成本与影响安排工作。[^src-superhuman-pmf]

但不能把它简化为“只听喜欢你的人”。D 的导入失败不会让他成为满意用户，问题却直接影响产品承诺。若你的样本只剩 A、B，就可能得出“大家都能独立使用”的假结论。研究为什么不用某项能力，也必须了解没用起来的人。Des Traynor 在 Intercom 的反馈文章中正是按待回答的问题区分新用户、熟练用户和未使用者，并提醒：一组相似请求首先是待核查的假设。[^src-intercom-feedback-mistakes]

回到这批记录，C 说要云端旧项目，不必立即翻译成“下一版增加云存储”。追问他最近一次为什么需要旧项目：是想比较历史报告，还是不想再选一次列名？这两个答案需要的产品不同。本例记录只确认了列名摩擦，还没有证明历史存储的需求。E 的自动解释请求也类似：它揭示了人工判断更重要，尚未证明工具拥有足够信息来替他判断。

对出海的小团队，解释反馈还多了一层语言与工作习惯。对方说 report，可能指一张表、一份给客户的说明，或需要同事批准的交付物。请他描述最近一次实际输出，取得允许分享的结构或虚构样例，比让翻译工具润色一个功能名更有用；不需要收集客户原文来理解列名怎样对应。具体文案与支持时区的安排见[市场与适配](/go-global/market-fit)。

## 有时该补的是基本功

flomo 联合创始人少楠在 2025 年的回顾里写到，团队曾积极增加功能；第二年的续费数据与调研却让他们发现，有些付费用户甚至到期都不知道已有会员功能。团队因此转向新用户引导、功能介绍和续费提醒。[^src-flomo-pricing-learning]

这个经历与“先多做几项，再看哪项有人用”的想法不同：如果障碍是没看懂、没找到、没形成使用路径，新功能也可能落进同一个空洞。反过来，如果用户很清楚怎样用，却觉得旧办法更好，再发一封介绍邮件并不能补出价值。原文没有给出这些调整各自带来多少改善，我们也不能把“优化引导”当成保证续费的答案。

本例的 B、C、D 指向同一段输入工作，值得调查；E 指向更深的产品范围问题，也不能被三票对一票掩盖。下一轮最有用的比较，是把修复后的完整工作与旧模板放在一起：是否仍要改列名，生成以后还得补多少解释，总共花多久。只测导入按钮快了几秒，可能漏掉后面更大的工作。

把 B 的教学记录展开：假设旧模板需要 18 分钟整理、10 分钟判断和检查，共 28 分钟；新工具需要 12 分钟改列名、4 分钟生成和核对格式，另有同样的 10 分钟判断，共 26 分钟。虽然输出已被采用，整体只少了 2 分钟。若列名准备能降到 2 分钟，且没有新增检查负担，总时间才可能变成 16 分钟；这是待检验的修复目标，不能提前写成已省下 12 分钟。完整工作成本的比较方法见[选品与验证](/go-global/validate-idea)。

<figure class="retention-media" aria-labelledby="retention-tree-title" aria-describedby="retention-tree-caption">
<h3 id="retention-tree-title">沿着证据，找到下一项工作</h3>
<ol class="retention-tree">
<li><div class="retention-question">下一次同类任务发生了吗？</div><div class="retention-offshoot">没有 → 按任务安排继续观察。<br>不知道 → 保留未知，先补事实。</div><span class="retention-continue">已确认发生 ↓</span></li>
<li><div class="retention-question">输出用进实际交付了吗？</div><div class="retention-offshoot">没有 → 比较旧办法、输入障碍与缺失价值；不能直接归因于语言或功能少。</div><span class="retention-continue">确实用上 ↓</span></li>
<li><div class="retention-question">可以独立完成，整体工作量也值得吗？</div><div class="retention-offshoot">不行 → 找到反复代劳或返工的步骤，决定修复、改为服务，还是停止。</div><span class="retention-continue">有证据支持 ↓</span></li>
</ol>
<div class="retention-destination"><strong>保护已证明有用的部分，再检验购买和长期交付。</strong><br>每次修订后回到同类任务，比较相同口径，保留失败和不再适用的记录。</div>
<figcaption id="retention-tree-caption">这是排查顺序，不是自动判定需求的算法。严重错误应立即处理，不必等到用户走完全部步骤。</figcaption>
</figure>

## 两个晚上的工作，怎样选出来

再给本轮一个明确约束：开发者只能投入 **6 小时**，需要兼顾修订与复查；这是教学预算，不是开发报价。我们比较四个动作。

**先修列名对应。** B 额外准备，C 需要陪同，D 最后放弃，三条记录都指向同一个步骤。可以先增加明确的列名选择和导出前预览，保留旧输入方式，避免把一个小修复扩成全新项目系统。它的弱点是：即便这一步顺了，E 所需的判断仍不存在。若输出本身没有用，导入再顺也不值得继续堆投入。

**暂缓云端历史。** C 的请求可能有道理，但当前证据只解释了重复设置。先观察明确的列名选择是否减少帮助，再调查历史比较的真实需要。云端项目会改变本例原文件留在本机的设计，带来保存、删除和恢复工作；如果确实需要，应重新走[数据处理](/go-global/compliance)与[基础设施](/go-global/infrastructure)的决定，不能把一次请求当成已经承诺的路线。

**不在本轮承诺自动写项目结论。** E 需要的是更复杂的任务，现有 CSV 没有延期原因、客户约定或负责人判断。加一段流畅文字不代表这些信息已存在。可以先比较人工填写结论后是否仍有整理价值；若目标用户普遍只需要这段判断，就应重新考虑产品，而不是把他们继续塞进周报导出路线。

**配色先记下。** A 已经独立用上现有结果，这条请求目前不阻碍交付。若后来证实客户品牌模板是接受报告的必要条件，它就会前移；“看起来像装饰”也不能成为永久拒绝的理由。

开发时间之外，还要看自己能不能长期接住。Intercom 的功能取舍文章专门提醒，容易上线的功能仍可能带来原先没估算的维护和支持。[^src-intercom-feature-support] 这组记录里，C 与 D 已用了开发者 **34 分钟**，D 还没做成；B 的 **12 分钟**则属于用户的额外工作。两种成本都要留下，但不能加在一起冒充同一种工时。

帮助早期用户本身有价值，能让你看到真实障碍。问题是把这段帮助隐藏起来，再按全自动产品估算容量。若帮助本来就是付费交付的一部分，可以选择提供服务；届时范围、价格和可服务人数也要按人工工作重算，见[定价与订阅](/go-global/pricing)。

<section class="retention-media retention-decision" aria-labelledby="retention-decision-title">
<p class="retention-kicker">本例已经作出的下一轮决定</p>
<h3 id="retention-decision-title">先减少输入摩擦，再看输出值不值得保留</h3>
<dl>
<dt>这次做什么</dt><dd>先用 1 小时以虚构结构复现 B、C、D 的问题，检查列名修复能否减少完整工作；若只是把准备搬到预览检查，就停下。条件成立再用最多 3 小时制作修订，留 2 小时检查样例、旧路径和说明，来不及同时验收就保留旧版。</dd>
<dt>交出去什么</dt><dd>一份可试用的修订、一份含非标准列名的合成 CSV、对应关系与完整预览，以及说明改了哪一步的英文短消息。这里是开发决定，尚未制作该产品版本，也没有真实发送。</dd>
<dt>下一次观察什么</dt><dd>在各自下一次同类任务中，记录使用版本、是否需要帮助、开发者与用户各花多久、最终用了新输出还是旧模板。A 的已有路径也要复查，不能只看曾失败者；F、G、H 按各自事实继续记录。</dd>
<dt>什么会改变决定</dt><dd>若无需协助且输出仍被使用，就保留修复；若导入已顺但仍回到旧模板，转查输出价值；若仍要逐个代劳，先缩小支持格式或重新界定服务，不继续扩功能。把新观察写回记录后再分配下一轮时间。</dd>
</dl>
</section>

这 6 小时是开发和检查的投入，等待下一次客户任务还需要另留时间。最终比较的是完整交付，不能只用“可以导入了”结束复盘。

## 改完之后，怎样再去问

回访不用把用户变成测试员。对本例的英语异步沟通，可以先发一段说明，让对方知道变化和选择，再问最近一次发生的事情。下面是教学样稿，没有向任何人发送；只有实际做出并检查相应版本后，才能使用其中的已完成表述。

> I’ve added a column-matching preview to the pilot. It is meant to reduce the renaming you had to do before importing. Your CSV still stays in your browser. Please keep your usual template available while trying the change.
>
> When you next prepare a client update, could you tell me which method you used, where you still needed help, and whether the output went into the client update? A made-up example of the column names is enough; please don’t send client files. If the task hasn’t come up yet, that is useful to know too.

记录时把“没回信”“没有任务”“试了但没交付”分开，也把用户原话与自己的解释分开。比如“用了旧模板”是观察；“因为不信任我们”是尚待确认的解释。只有当对方说明具体顾虑，才把它转成要修的承诺、说明或功能。

发布前后的比较也要有可比性。保留原批次，再把后来加入的人另记一批；记下版本和观察窗口，不拿老用户熟悉后的结果与新用户第一次操作直接相比。若同时改了人群、邀请文案与功能，可以报告整体变化，但不能把功劳全部归给这次导入修复。小样本逐条追踪适合找到下一步问题，不足以证明单一改动的因果效果。

本例无需上传原始表格来完成这份观察。记录内部代号、任务是否发生、采用的方法、版本、帮助时间和输出是否使用即可；联系信息与工作记录分开处理，实际收集和保留安排仍按产品的数据决定执行。代号仍可能关联到联系人，不能当作已经匿名化。没有必要为了知道一次任务是否做成，就提前建设一套逐行监控。

下一次复盘时，先打开这些记录，再打开功能清单。值得继续的，不只是“有人提出过”，而是你已经能说明：谁在什么工作中受阻，这次准备怎样处理，以及看到什么结果就应停下或换方向。
