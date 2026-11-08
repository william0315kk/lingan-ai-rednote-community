> 2026-11-08工作空间修复：V2继续访问3001/及/mobile，手动与案例统一解析，新增结构化理解卡片；真实Qwen未复测。3000仍原V1，收尾曾误触根构建，已用原源码恢复并重启、浏览器主流程通过；旧标签如遇资源缓存请刷新。完整记录见[工作空间验收](docs/WORKSPACE_UI_VALIDATION.md)。

# 邻感 Lingan V2 · AI × 社区 Demo

保留社区主体、桌面三栏和独立手机入口。当前正式数据 **66篇自制笔记、198评论、56张本地WebP、25篇多图**；并非真实小红书内容。分页、刷新、轮播、图文成果和笔记/评论回溯已完成离线及浏览器验收。

## 当前访问入口

- **V2主站：http://127.0.0.1:3001/**
- **V2手机版：http://127.0.0.1:3001/mobile**
- 3000稳定V1保持运行；3001是最新源码的隔离Demo验收副本，不含.env。两入口共享同一产品数据与逻辑。127.0.0.1仅供本机访问，未部署公网。

## 启动与模式

需要Node22+，当前工程可将`.tools/node/bin`加入PATH。依赖没有变化。端口已有进程时不要重复启动。

```sh
# 仅在3001无运行实例时启动V2 Demo
PORT=3001 npm run dev
```

默认`npm run dev`/`build`/`start`强制Demo，清空进程Key/Base并阻断模型外网，不修改.env.local。**当前保留3000旧生产服务期间，不直接在根目录build覆盖它的.next**；本轮已在无.env的/tmp/lingan-v2-build-final完成隔离构建及生产冒烟。

以下仅为将来获用户授权后的受控Live启动方式，当前没有启动或真实请求：

```sh
# 原有.env.local配置沿用；联网开关只通过进程临时开启
PORT=3002 AI_WEB_SEARCH_ENABLED=true npm run dev:live
```

Live仅服务端调用既有Qwen，先理解、质量通过后才检索/整合。搜索默认关闭，生产仍阻断外网；失败不重试、不静默回退Demo。不得对公网暴露无鉴权的付费开发端点。Demo不伪造外部搜索结果，真实Qwen新版理解/Responses/整合尚未验收。

## 实际检查

TypeScript、ESLint通过；完整离线133/133（0跳过），Provider/诊断59/59、V2 Responses/来源36/36为其中专项子集。完整桌面/手机E2E60/60，最后同步12/12；隔离Build及生产冒烟通过，扫描36客户端包。自动化全部使用Demo/Mock，本轮真实请求0、Token0。

```sh
npm run typecheck
npm run lint
npm test
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3001 npm run test:e2e
```

E2E需显式指向Demo服务，参见playwright.config.ts；不对Live运行。详情、逐文件清单、截图与已知限制见[本轮验收](docs/V2_ACCEPTANCE.md)、[交付说明](docs/DEMO_DELIVERY.md)、[AI准备状态](docs/AI_READINESS.md)。第二次历史502未知、第四次真实理解质量失败仍保留，不能用Mock通过覆盖。

---

## 以下V1说明保留为历史，不用于当前入口与数据数量

# 邻感 · AI × 社区 Demo

社区信息流 → 搜索进入 AI 任务 → 编辑条件 → 检索与整合 → 攻略/清单/对比 → 笔记段落或评论回溯。

**11月9日上午交付：双端高保真交互 Demo，默认启动不消耗模型 Token。** 桌面三栏、402px手机预览、图文攻略/勾选清单/双端对比、精确段落/评论回溯已完成。14篇笔记、作者和评论均为自制数据，配图仅示意。

本轮真实 Qwen 新契约解析上游/本地200、Schema/Zod通过，但语义闸门未通过（现状混入计划、检索词无依据扩展），已停止，没有调用真实证据整合。**Live完整闭环尚未验收，现场请使用明确标记的Demo备用。** 详见[交付说明](docs/DEMO_DELIVERY.md)、[实际调用记录](docs/QWEN_DELIVERY_VALIDATION.md)和[体验验收/文件清单](docs/FINAL_REVIEW.md)。

## 启动

需要 Node.js 22+、npm。依赖已在当前工作区安装；新机器先运行 `npm ci`。

```sh
npm run dev
```

`npm run dev`、`npm run build`、`npm start`均强制Demo，进程中清空Key/Base URL并阻断外网；不修改.env.local。已有3000服务时不要重复启动。生产演示可用：

```sh
npm run build
npm start
```

受控本地Live另开3002（只在用户主动验证时运行，会消耗Token）：

```sh
npm run dev:live
```

它在服务端读取既有.env.local；仅开发模式开放已配置模型端点的/chat/completions并拒绝重定向，生产Live仍禁止。无自动重试/自动降级。该日常启动命令没有本次临时原子锁的“两次预算”，每次点击可能产生请求；本轮临时验证服务已停止，不会自动续测。Live入口为http://127.0.0.1:3002/及/mobile。质量失败会进入needs_review并阻止执行，不能承诺目前可稳定完成Live闭环。手动返回Demo需打开3000，模式标识保持明确。

两个入口共用同一工程、社区数据与 AI 服务：

- 主站：http://127.0.0.1:3000/ — 按窗口宽度响应式切换；桌面保留三栏。
- 手机版：http://127.0.0.1:3000/mobile — 始终为 App 风格；桌面打开时居中显示最大402px内容宽的手机页面，不必打开开发者工具。

从手机版进入工作空间、成果和笔记会保留 `/mobile` 前缀，例如 `/mobile/workspace`、`/mobile/results/[id]`、`/mobile/notes/[id]`。这是同一产品的展示入口，不是原生 App，也没有独立数据或 API。真实手机访问本机 `127.0.0.1` 不会连接这台开发电脑；本任务未配置局域网或公开部署。
本机最初没有 Node，已准备 `.tools/node` 本地运行时；若终端仍找不到 npm：

```sh
export PATH="$PWD/.tools/node/bin:$PATH"
npm run dev
```

`.tools` 被 Git 忽略，不作为可移植工程的一部分。新机器应自行使用官方 Node 22+，无需复制这个 macOS ARM 运行时。

## 页面与本轮范围

- `/`：综合社区双列信息流、配置化分类、搜索与任务入口；桌面左导航/信息流/编辑灵感三栏。
- `/mobile`：强制手机布局的同一首页，首组笔记后展示通栏AI灵感。
- `/workspace`：自然语言输入、按当前模式理解需求、条件增删/修改/必要程度、提交与错误反馈。
- `/results/[id]`：三种成果视图、条件证据状态、原文与评论、未知/冲突、来源跳转。
- `/notes/[id]`：笔记图文、评论锚点、局部喜欢状态、返回成果。评论为只读，不提供发布。
- `/design-lab`：仅开发模式可用，预览同一 NoteCard/Button/ModeNotice及灵感/精选组件；颜色、圆角、间距调整及 token 复制。生产返回404，不提供模型调用。

成果保存在当前标签页的 sessionStorage；同页刷新/返回可恢复，成果视图和清单勾选同任务保留，关闭标签页或另一个浏览器不保证可用。没有数据库、用户系统或跨设备同步。存储不可用时任务界面报告失败，不假装保存成功。

收藏管理、独立评论观点分析、复杂追问为 P1，尚未开发；真实平台数据、视频实时理解、完整 RAG 与用户系统为 P2。底部仅保留发现和搜索，无独立 AI Tab。

## 真实模型接入位置

服务端 `.env.local` 按 `.env.example` 配置：`AI_PROVIDER=live`、`AI_VENDOR`、`AI_MODEL`、`AI_API_KEY`、`AI_BASE_URL`、`AI_OUTPUT_MODE`、`AI_TIMEOUT_MS`。Registry登记openai/deepseek/qwen/openai-compatible，业务只使用AIProvider。沿用Vercel AI SDK，未增加依赖。当前适配Chat Completions；不保证所有厂商、模型或区域兼容。

- `demo`：始终明确标注的规则演示。
- `auto`：没有AI_API_KEY时显示Demo，有Key则按真实配置执行；配置错误不回退。
- `live`：缺Key/供应商/模型或失败会报错，绝不伪装真实成功。
- 严格Schema使用`json-schema`；仅支持JSON对象时设`json-object`并在本地强制Zod校验。JSON有效不代表来源或事实正确。

统一任务包含原输入、目标、通用任务类型/领域、条件/检索词、必要与偏好、用户成果选择与模型推荐、缺失信息和状态。成果将社区原文与AI整合判断区分，校验引用存在性、归属及原文逐字匹配。无证据时不调用整合模型。

用户已在本地配置密钥，累计四次真实解析尝试；本轮新契约解析结构通过、质量未过，真实整合0次。旧三次记录保留。五类任务的离线SDK/Schema测试不是模型效果测试，完整配置边界见 [AI准备说明](docs/AI_READINESS.md)。
不要将 Key 写入源码、JSON、`NEXT_PUBLIC_*` 或浏览器存储。当前仅供本地演示：没有生产鉴权、分布式限流/预算管理，不能直接将付费端点公开部署。浏览器停止请求不保证取消已开始的上游计费。

## 模块

```text
src/app                    Next.js 页面、API薄壳
src/composition            服务端组合入口
src/modules/community      信息流与真实笔记卡片
src/modules/search         搜索入口
src/modules/ai-workspace   展示与任务控制器
src/modules/results        成果壳与独立展示区块
src/modules/note-detail    图文、评论与来源定位
src/modules/favorites      P1模块边界说明，未实现管理
src/modules/retrieval      通用条件匹配、去重、冲突/未知
src/modules/ai-service     编排、独立Prompt、成果/引用校验
src/adapters               数据、Demo/真实模型、平台UI/网络/存储
src/shared                 通用组件、类型、结构化Schema
src/fixtures               自制JSON数据与领域词表
src/devtools/design-lab    开发侧真实组件预览
src/styles                 公共视觉Token与样式
tests                      核心规则与桌面/手机交互测试
```

具体词表、安吉案例、阅读灯案例只在 fixture；核心任务/检索不按安吉分支。当前排序是有限词表/条件权重的规则，不是向量语义搜索。部分满足项会保留，必要条件未知或冲突不能理解为已满足。

## 检查

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run test:production
# 保持 npm run dev 运行，再执行：
npm run test:e2e
```

**费用边界：E2E会多次调用任务接口，必须连接显式Demo测试服务，不能直接对当前live服务运行。首次真实验证仅授权一次解析，后续真实请求需另行确认。**

E2E 使用已安装的本机 Google Chrome，默认 macOS 应用路径；其他环境设置 `PLAYWRIGHT_CHROME_PATH` 为可执行文件。截图写到 `/tmp/lingan-*`，本地报告/轨迹目录已忽略。测试不调用付费模型。

本次实际结果、失败及修复见 [开发日志](DEVELOPMENT_LOG.md)。文档与产品依据见 [产品决策](docs/PRODUCT_DECISIONS.md)、[工程架构](docs/ARCHITECTURE.md)、[素材来源](docs/ASSETS.md)。RedCowork 能力尚未验证，不承诺可直接部署。

## 双端布局与验证边界

页面响应式样式共用命名容器 `lingan`：主站容器随窗口变化，手机版最大430px；手机版现为固定可视高度App壳：顶部与底部导航在滚动内容区之外，只有中间内容自然纵向滚动。桌面显示居中430px圆角预览框，高度随可视区域变化；手机尺寸无预览边框。主站≥1280完整三栏、1024–1279紧凑三栏、900–1023灵感进入信息流、<900 App布局。手机版工作空间为独立单列任务页，底部社区导航收起；成果与笔记保留手机排版和来源返回。

共用 sessionStorage 成果键，同一标签页切换两个入口可读取相同成果；没有新增跨设备或跨标签同步。布局使用 CSS 容器查询，已测试的浏览器、视口与限制以开发日志为准；尚未验证旧浏览器、Safari真机与软键盘。

## 手机视口与真实AI评估准备

/mobile使用VisualViewport配合100dvh，响应可视高度/偏移变化；焦点输入滚入内容区，工作空间提交按钮吸底。实际软键盘、刘海/安全区仍需真机验收，Playwright缩短视口只是模拟。主站/不采用手机预览框。

本轮仍只使用原12篇自制笔记。Vibe Coding、年夜饭和美签无对应社区证据，应为空结果；有收藏的口头描述不代表已导入收藏。旅行和口碑仅有有限自制样本。

选定供应商、精确模型、区域/Workspace端点和费用预算，在服务端配置后重启开发服务，才运行显式付费评估：

```sh
node --import tsx scripts/evaluate-ai.ts --live
```

该脚本只访问本地原API；检测到Demo即报错，不把Demo计为真实测试。报告默认/tmp/lingan-live-evaluation.json，仍需人工质量评审。本轮没有以--live执行；首次验证仅通过/api/tasks/plan单独一次调用。所有服务端Key仅本地/可信Secret配置，不在聊天中粘贴。


## 11月9日交付启动与验收

当前两个入口在同一3000生产Demo服务运行，Provider用进程变量固定为demo，未修改.env.local。若重启，先停止旧服务，避免重复占用端口：

```sh
export PATH="$PWD/.tools/node/bin:$PATH"  # 当前工作区使用本地Node时
AI_PROVIDER=demo npm run build -- --webpack
AI_PROVIDER=demo npm run start
```

开发预览（含Design Lab）使用上方npm run dev；不要同时占用3000。不能把未设置AI_PROVIDER的启动方式当作无费用模式，本地文件可能仍配置live。

交付主流程冒烟（只连接显式Demo服务）：

```sh
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 node node_modules/@playwright/test/cli.js test -g 'community →|mobile entry retains.*390px'
```

完整E2E含仅开发模式的Design Lab，请使用Demo开发服务，不直接对生产服务或live Provider运行。当前不提供公网/局域网部署，手机入口可在当前电脑浏览器直接访问。
