# 开发者的窘境
- 原文：https://www.chengxiaobai.com/trouble-maker/migrate-to-cloudflare.html
- 作者：程小白；发布：2022-08-21；实际阅读：2026-10-09。
- 类型：attributed experience；状态：reported。
> 只用维护 GitHub 一个仓库就好了
- 定位：切入、目标、图片处理、收尾。作者报告国内云构建网络问题、博客多副本缓存短暂不一致，根据自己的访问统计取消分流，并将不到 90 张图片转为 WebP 随仓库管理。
- 采用：静态博客背景下收拢依赖、构建与发布链的维护取舍。不是动态 SaaS 的性能测试，不采用当时腾讯云、七牛等产品能力限制，也不推导任意用户能访问 GitHub 就能访问其他站点。
