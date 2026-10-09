# 用户主线插画记录

- 日期：2026-10-09。
- 用途：快速入门开篇，帮助读者理解“先观察海外用户的工作，再修改产品”；相邻正文区分真实来源与教学样例。
- 文件：`../assets/listen-build-learn-v1.png`。
- 模式：内置 image_gen，generate。`build-deliver-reconcile-v1.png` 仅作纸感、墨线和色彩的风格参考，新图是不同构图。
- 画面：开发者远程听取用户对工作表的解释，桌上有报告和修改中的草图。没有付款凭证、收益图表或文化符号；AI场景不能证明真实访谈发生。
- 初审：主体、手部和屏幕内外关系可辨，构图集中在倾听和修改，暖色与既有插画一致；已检查桌面与390px手机视口，图片实际显示358px宽，主体与图注可读，无横向页面溢出。

## 最终提示词

```text
Use case: illustration-story
Asset type: opening editorial illustration for a Chinese developer guide about finding and serving overseas users.
Primary request: Show a developer learning from a remote user's real work and improving a small report tool based on that conversation.
Input images: supplied image is a style reference only. Generate a new distinct composition; do not modify or repeat its three-stage payment narrative.
Scene: over-the-shoulder three-quarter view of a developer at a modest warm desk, looking attentively at a large laptop showing a video conversation. On the screen one remote small-business professional is sharing a plain work sheet and pointing to a confusing part. On the developer's desk are an annotated sample report, a short row of sketch cards with one visibly revised layout, and a pencil held ready to make a correction. The interaction and shared working document are the focal point. Only one developer foreground and one person on screen. Natural respectful listening, no celebration.
Style: sophisticated graphite contours, subtle gouache, warm printed-paper grain, off-white, charcoal and warm gray with restrained terracotta orange. Match the supplied reference's editorial craft.
Composition: wide horizontal 2:1, simple and readable at 390px, one coherent scene, enough breathing space.
Text: no readable letters, numbers, names, brands or logos; abstract marks only on documents and screen. No actual screenshot or invented testimonial.
Avoid: globes, flags, rockets, money symbols, payment screens, receipts, handshakes, fake metrics, glossy 3D, generic corporate vector people, stereotypical cultural props. This is an AI editorial scene, not evidence of a real interview.
```

## 构建与页面验收

原图1774×887，项目副本已保存。Astro输出217,664字节WebP（约213KiB）；新图、既有商业化插画和合规图均能加载解码。快速入门的标题、导航、新主线与手机比较表已在ego中检查。未修改原有插画，也未将旧图继续作为全专题主线。
