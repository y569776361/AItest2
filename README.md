# AI ChatBot

一个简洁的聊天机器人网页应用，支持图片上传和自定义 API 配置。

![ChatBot Screenshot](./screenshot.png)

## 在线预览

[https://lpujk4dqbkmi2.ok.kimi.link](https://lpujk4dqbkmi2.ok.kimi.link)

## 功能特点

- 💬 文本对话 - 与 AI 助手进行自然语言交流
- 🖼️ 图片上传 - 支持上传图片进行视觉问答
- 🔧 API 配置 - 可自定义 API Key、URL 和模型
- 💾 本地存储 - 配置自动保存到浏览器本地
- 📱 响应式设计 - 适配各种屏幕尺寸
- 🎨 简洁界面 - 清爽的用户体验

## 技术栈

- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide Icons

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/yourusername/chatbot.git
cd chatbot
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 构建生产版本

```bash
npm run build
```

## 使用说明

1. 点击右上角 **设置** 图标配置 API
2. 输入你的 API Key、API URL 和模型名称
3. 在输入框中输入消息，按 Enter 发送
4. 点击 **图片** 图标可上传图片
5. 支持 Shift+Enter 换行

## API 配置示例

默认配置兼容 BytePlus Ark API：

- **API URL**: `https://ark.ap-southeast.bytepluses.com/api/v3/chat/completions`
- **模型**: `seed-1-8-251228`

## 项目结构

```
├── src/
│   ├── components/      # UI 组件
│   │   ├── ChatMessage.tsx    # 消息气泡
│   │   ├── ChatInput.tsx      # 输入框
│   │   └── ApiSettings.tsx    # API 配置弹窗
│   ├── hooks/           # 自定义 Hooks
│   │   ├── useChat.ts         # 聊天逻辑
│   │   └── useImageUpload.ts  # 图片上传
│   ├── types/           # TypeScript 类型
│   │   └── chat.ts
│   ├── App.tsx          # 主应用
│   └── main.tsx         # 入口文件
├── dist/                # 构建输出
└── index.html
```

## 部署到 GitHub Pages

### 1. 修改 vite.config.ts

```ts
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

### 2. 添加 GitHub Actions 工作流

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 20
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### 3. 启用 GitHub Pages

1. 进入仓库 **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
