# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Joy Cart

A modern e-commerce platform built with React and TypeScript.

## 项目结构

```
joycart/
├── public/              # 静态资源
├── src/                 # 源代码
│   ├── api/             # API请求封装
│   ├── components/      # React组件
│   ├── config/          # 配置文件
│   │   └── api.config.ts # API相关配置
│   ├── assets/          # 静态资源
│   └── App.tsx          # 主应用组件
├── .vscode/             # VS Code配置
├── vite.config.ts       # Vite配置
└── .env.development     # 环境配置（需要创建）
```

## 配置

项目使用集中的配置管理方式，主要通过以下文件实现：

1. `src/config/api.config.ts` - API相关配置：
   - 包含API基础URL、路径前缀等
   - 对各模块的API路径进行了分组
   - 提供了便捷的URL生成函数

2. 环境变量 (开发时需要创建以下文件):
   - `.env.development` - 开发环境配置
   - `.env.production` - 生产环境配置

环境变量示例：
```
# API设置
VITE_API_BASE_URL=http://localhost:8082

# 应用设置
VITE_APP_NAME=Joy Cart
VITE_APP_VERSION=1.0.0
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## API调用

使用集中配置的API：

```typescript
import { USER_API, getApiUrl } from '../config/api.config';

// 获取完整API路径
const apiUrl = getApiUrl(USER_API.SEARCH);

// 发起API请求
const res = await fetch(apiUrl);
```
