# Aurorάqua🇮🇸🧊

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0+-38bdf8.svg)](https://tailwindcss.com/)

「Aurorάqua」 a web UI template inspired by Apple LiquidGlass Design and Iceland(Ísland) Aurora, featuring a glassmorphism design and soft aurora gradients. By leveraging component-based architecture, reusability, responsive layouts, and single-page routing, you can use this solution to rapidly build custom interfaces. Built with React & Tailwind. Mozilla Public License 2.0, friendly for commercial use.<br />
For Windows Users, please Install the Monaco and PingFang-SC fonts to attain the suspected experience.<br />
⚠️This serves only to showcase my personal UI preferences; most features have not been developed yet, and remains far from complete currently.<br />
Tauri app versions for macOS and Windows are provided in the release.<br />
However, it is recommended to run `npm install` and `npm run dev` in the terminal and access the application via a browser (tested in Firefox).

「Aurorάqua」是受 Apple LiquidGlass 設計風格和冰島極光啟發的 Web UI 模板，採用玻璃擬態設計與柔和的極光漸變效果。遵循元件化、可複用性、響應式佈局、單頁路由，助您快速建立自訂介面。基於 React 和 Tailwind 構建。採用 Mozilla Public License 2.0 協議，支援商業用途。<br />
對於Windows用戶，由於字體並非系統預先安裝，建議安裝Monaco字體和PingFang SC字體以獲得預期體驗。<br />
⚠️目前僅供個人UI喜好展示，大部分功能仍不完善。<br />
Release中提供了MacOS和Windows版本的Tauri App。<br />
但更建議在終端機中執行npm install和npm run dev以使用瀏覽器訪問（測試環境：FireFox）

🔴对于简体中文用户，demo中图片视频素材使用了来自YouTube和BlaueSky等网站的链接，请自觉使用魔法以正常加载资源。

# Components Demos(in /case3):
MeTube(Video Streaming Website, imitate Youtube Layout)
<img width="2772" height="1740" alt="MeTubePage" src="https://github.com/user-attachments/assets/b0fff1b1-b8f5-4be9-834b-b7c2d6812ef1" />
Social Media(imitate BlueSky(https://github.com/bluesky-social/social-app) Layout)
<img width="2168" height="1706" alt="PrysmPage" src="https://github.com/user-attachments/assets/37d257b7-dcd8-4dce-800f-2eeabd22a008" />
<img width="2170" height="1600" alt="PrysmProfile" src="https://github.com/user-attachments/assets/9bf4bd18-102c-46c8-9864-b5c63f2cfbd0" />
<img width="2776" height="1740" alt="PrysmSettings" src="https://github.com/user-attachments/assets/7f30c42b-fae0-4bfd-96cf-519cbe1fba4c" />
Dashboard
<img width="2776" height="1740" alt="Dashboard1" src="https://github.com/user-attachments/assets/3d2c0432-a13a-4efe-a695-4d6b0cf491f8" />

Video Show:

https://github.com/user-attachments/assets/2552c626-2da6-4cd7-a491-7ae48a026ffd

https://github.com/user-attachments/assets/24b60935-ac95-42ff-ac40-a1ff3c75f172

Markdown Viewer & Editor
<img width="2776" height="1740" alt="Markdown" src="https://github.com/user-attachments/assets/6bbe7102-fa60-49c4-b15c-faaac659450a" />
Management Page
<img width="2776" height="1740" alt="Management" src="https://github.com/user-attachments/assets/a118cefd-4027-43a0-9830-500848d5bf10" />
Pop-Out Menu
<img width="2776" height="1740" alt="Menu" src="https://github.com/user-attachments/assets/f016b90d-dc89-4c0f-9f4e-9e928509ebac" />
Mermaid Diagrams Viewer & Editor
<img width="2776" height="1740" alt="Mermaid" src="https://github.com/user-attachments/assets/ed953203-5476-4aa8-b243-9be48aaa2b9e" />
Chat 
<img width="2776" height="1740" alt="ChatShow" src="https://github.com/user-attachments/assets/02fecbba-ae89-4ae1-9f7c-cb1ae09120bc" />
Music Player
<img width="2774" height="1740" alt="MusicPage" src="https://github.com/user-attachments/assets/6ef785d3-48f6-4ce2-acb8-89ac855bb80f" />


# Example1(/case1):
<img width="2774" height="1740" alt="case1" src="https://github.com/user-attachments/assets/4a3944a1-9638-435d-8873-9f9cf7ea668f" />

# Example2(/case2):
<img width="1728" height="1080" alt="rec2020-0002" src="https://github.com/user-attachments/assets/40c8f7ac-8daa-4ad2-9964-572f99c5b286" />

# Init Page(/init):
<img width="2776" height="1740" alt="InitAurora" src="https://github.com/user-attachments/assets/df3f1f62-94cd-4c87-a3cc-c4a67851b4a3" />

# Darkmode Support:
<img width="2776" height="1740" alt="DarkSupport" src="https://github.com/user-attachments/assets/2cf8a471-5d34-4353-86c0-aea4f72a45a5" />



## 📖 Directory Structure · 目錄結構
```
src/
├── components/              # 组件目录
│   ├── case3/              # Case3（多场景Demo）专用组件
│   │   ├── Case3Sidebar.jsx    # Case3主侧边栏，导航到各子页面
│   │   ├── NavBar.jsx          # Case3侧边栏展开/收起导航条
│   │   ├── LiveChat.jsx        # 直播聊天组件，实时消息流展示
│   │   ├── SocialHeader.jsx    # 社交页面顶部标签导航栏
│   │   ├── SocialPost.jsx      # 社交帖子卡片，支持点赞、评论、分享
│   │   ├── SocialProfilePage.jsx # 用户个人资料页面
│   │   ├── SocialRightPanel.jsx  # 社交页面右侧面板，显示动态源和热门话题
│   │   ├── SocialSettingsPage.jsx # 社交设置页面
│   │   ├── SocialSidebar.jsx     # 社交页面左侧导航菜单
│   │   └── subpages/           # Case3子页面
│   │       ├── ChatSubpage.jsx       # 即时通讯界面
│   │       ├── DashboardSubpage.jsx  # 数据仪表盘
│   │       ├── ForumSubpage.jsx      # 论坛界面
│   │       ├── ManagementSubpage.jsx # 数据管理面板
│   │       ├── MarkdownSubpage.jsx   # Markdown 编辑器
│   │       ├── MindmapSubpage.jsx    # 思维导图
│   │       ├── MusicSubpage.jsx      # 音乐播放器
│   │       ├── SocialSubpage.jsx     # 社交媒体主页面
│   │       └── VideoSubpage.jsx      # 视频播放器页面
│   ├── case2/              # Case2专有组件
│   │   ├── Case2Sidebar.jsx    # Case2侧边栏，模型选择与参数配置
│   │   ├── ControlPanel.jsx    # 图像处理控制面板，调节各项参数
│   │   ├── ImageCanvas.jsx     # 图像画布，展示与渲染处理结果
│   │   ├── MetricsChart.jsx    # 性能指标图表，展示模型运行数据
│   │   └── ModelStatusCard.jsx # 模型状态卡片，显示加载进度和运行状态
│   ├── case1/              # Case1专有组件
│   │   ├── Case1Sidebar.jsx    # Case1侧边栏，包含连接设置、显示设置、流信息等面板
│   │   └── NavBar.jsx          # Case1侧边栏展开/收起导航条
│   ├── data/               # 数据展示组件
│   │   ├── ChartLine.jsx       # 折线图表组件
│   │   ├── InfoItem.jsx        # 信息项展示，标签-值形式
│   │   ├── StatCard.jsx        # 统计卡片，展示关键指标
│   │   ├── StatPill.jsx        # 统计药丸，小型数值展示
│   │   └── TableRow.jsx        # 表格行组件
│   ├── form/               # 表单组件
│   │   ├── ControlButton.jsx   # 控制按钮，带有状态切换
│   │   ├── SettingRow.jsx      # 设置行，标签-控件布局
│   │   └── Toggle.jsx          # 开关切换组件
│   ├── layout/             # 通用布局组件
│   │   ├── Toast.jsx           # 消息提示组件，支持不同类型
│   │   └── VideoPlayer.jsx     # 视频播放器组件，支持缩放、旋转、FPS叠加
│   ├── ui/                 # 通用 UI 组件
│   │   ├── ConnectionStatus.jsx # 连接状态指示器
│   │   ├── GlassButton.jsx      # 玻璃态按钮，支持发光效果
│   │   ├── GlassCard.jsx        # 玻璃态卡片容器
│   │   ├── MermaidRenderer.jsx  # Mermaid 图表渲染器
│   │   ├── Modal.jsx            # 模态框组件
│   │   ├── Section.jsx          # 分区容器，带标题和图标
│   │   ├── Slider.jsx           # 滑块组件，玻璃态样式
│   │   ├── Switch.jsx           # 开关组件，玻璃态样式
│   │   ├── TabButton.jsx        # 标签按钮，支持激活状态
│   │   ├── TodoItem.jsx         # 待办事项项
│   │   └── UserAvatar.jsx       # 用户头像组件
│   └── DynamicStyles.jsx   # 动态样式管理
├── pages/                  # 页面入口组件
│   ├── Init.jsx            # 初始化页面，项目介绍与导航入口
│   ├── Case3.jsx           # Case3：多场景Demo
│   ├── Case2.jsx           # Case2
│   ├── Case1.jsx           # Case1
│   ├── Settings.jsx        # 设置页
│   └── About.jsx           # 关于页
├── context/                # React Context
│   └── BackgroundContext.jsx   # 背景样式上下文，管理主题切换
├── hooks/                  # 自定义 Hooks
│   └── useContrastColor.js     # 对比度颜色计算 Hook
├── data/                   # 静态数据
│   └── case3/              # Case3各子页面的模拟数据
│       ├── chat.js             # 聊天数据
│       ├── dashboard.js        # 仪表盘数据
│       ├── forum.js            # 论坛数据
│       ├── management.js       # 管理面板数据
│       ├── music.js            # 音乐播放器数据
│       ├── social.js           # 社交帖子数据
│       └── video.js            # 视频页面数据
├── config/                 # 配置
│   └── backgroundSchemes.js    # 背景配色方案配置
├── __mocks__/              # Mock 文件
│   └── mermaid.js               # Mermaid 模块 Mock
├── __tests__/              # 单元测试
│   └── common-components.test.jsx # 通用组件测试
├── App.jsx                 # 根组件
├── routes.jsx              # 路由配置
├── index.css               # 全局样式，玻璃态效果定义
├── main.jsx                # 入口文件
└── setupTests.js           # 测试配置
```

## 🎨 Visual & Design Features
* **Dynamic Navbar**: Graceful animated Navbar that can show/hide Sidebar.
* **Aurora Background**: Employs a subtle, soft pink-to-purple gradient, crafting a modern yet cozy visual tone.
* **Glassmorphic Layout**: Features floating glass-textured cards accompanied by elegant border highlights and backdrop blur effects, delivering a premium sense of depth and layer.
* **Refined Control Components**: Carefully calibrated UI elements, including sidebars, status badges, grouped setting blocks, sliders, and smooth toggle switches.
* **Minimalist & Stream-Friendly**: Utilizes a spacious, minimalist center layout—perfectly tailored for high-dynamic content such as video streams, canvases, and core data visualizations.

## 🎨 視覺與設計特性 
* **靈動導航條**：帶有流暢動畫效果，用以顯示/隱藏側邊欄。
* **極光漸變背景**：採用細膩、柔和的粉紫調漸變，營造充滿現代感與溫馨氛圍的視覺基調。
* **景深毛玻璃質感**：玻璃材質的懸浮卡片設計，自帶優雅的邊框高光與背景模糊，提供絕佳的空間層次感。
* **精緻的控制組件**：精心調校的側邊欄、狀態標籤、分組設定區塊、滑動條及平滑的切換開關。
* **極簡圖表與串流友善**：中心區域採用大面積留白設計，完美適配視訊串流、畫布、核心資料視覺化等高動態內容的展示。
