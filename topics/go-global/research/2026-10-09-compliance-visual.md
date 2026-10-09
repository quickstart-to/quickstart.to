# 合规样章视觉记录

- 日期：2026-10-09。
- 图片：`../assets/choose-less-data-v1.png`。
- 用途：合规章开篇，表现先筛选需要传出的信息、保留本地工作资料的编辑意象；精确字段与路径另由正文及SVG表达。
- 方式：内置image_gen，generate；既有开篇插画仅作风格参考，非修改对象。原图保留在生成目录，项目引用副本。
- 参考：`../assets/build-deliver-reconcile-v1.png`。
- 边界：AI原创场景插画，不是系统截图、法律认证或真实数据处理记录；不能证明软件零收集。
- 画面检查：双手筛选卡片的动作明确，纸感、墨线和陶土橙与主题一致；没有可读的个人资料、品牌或认证标志。

## 最终生成提示词

```text
Use case: illustration-story
Asset type: editorial illustration for a Chinese practical guide chapter about privacy-conscious design of a small CSV-to-client-report web tool.
Primary request: illustrate the editorial idea "decide what to keep local before sending information away." This is a human working scene, not a technical diagram or proof of compliance.
Input images: the supplied illustration is a style reference only. Create a distinct new composition, not a modification of that image.
Scene and subject: overhead three-quarter view of one developer's hands at a warm desk. A laptop with a simple abstract table and report sits beside a modest folder holding raw working pages. One hand keeps the folder at the desk; the other hand selects a single small plain card from a much larger group of papers to place in a small outgoing tray. Convey deliberate selection and reduction, not secrecy or shredding. Raw sheets and finished report are visually distinct. Laptop stays a secondary anchor, hands and the act of choosing are the main focal point.
Style: match the reference's sophisticated dark graphite contours, subtle gouache, warm printed-paper grain, off-white, charcoal, warm gray, with restrained terracotta orange accents. Calm, thoughtful, editorial and human.
Composition: wide horizontal about 2:1, one clear focal action, generous space, objects recognizable at 390px display width. No panel borders.
Text: no letters, numbers, labels or brands. Only abstract bars/shapes on documents and interface.
Avoid: locks and shields floating in space, judicial gavels, flags, seals, compliance badges, giant clouds, fake receipts, real personal details, bank interfaces, security guarantees, glossy 3D, generic corporate vector people. Do not imply zero data collection or verified legal compliance.
```

## 数据图与页面验收

- `../assets/report-data-boundary-v1.svg` 是可编辑的原生SVG，不是生成式图片。放在字段决定表之前，回答“文件在哪里处理、哪些信息需要离开浏览器”；箭头只表达示例设计，不声称真实服务已完成接入。
- 图中分别画出CSV到报告的本地处理、邮箱进入账号服务、购买信息进入Creem，以及经验证的付款事件用于开通权益。主机、邮件和日志等部署细节由相邻正文要求补齐，不以此简图代替完整供应商记录。
- PNG原图1774×887；构建产物WebP为224,310字节。SVG为640×600、2,803字节，通过XML解析；两图均有alt和解释性图注。
- 在ego桌面和390px手机视口检查插画、图示及相邻正文。手机图片显示宽度358px，加载和解码正常，图中标签可读，页面无横向溢出。生成插画与精确数据图承担不同的说明任务。
