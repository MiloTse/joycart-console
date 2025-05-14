# Joy Cart 多环境配置指南

本文档介绍如何在不同环境（开发、测试、生产）中配置和运行Joy Cart前端应用。

## 环境文件

项目使用Vite的环境变量系统，通过不同的`.env`文件区分环境配置。以下文件应位于项目根目录：

### 1. `.env`（基础配置）

包含所有环境共享的基本配置：

```
# 基础环境变量，所有环境共享
VITE_APP_NAME=Joy Cart
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Modern e-commerce platform
```

### 2. `.env.development`（开发环境）

```
# 开发环境专用变量
VITE_API_BASE_URL=http://localhost:8082
VITE_APP_ENV=development
VITE_APP_NAME=Joy Cart (Dev)
```

### 3. `.env.staging`（测试/预发布环境）

```
# 测试/预发布环境专用变量
VITE_API_BASE_URL=https://api-staging.joycart.com
VITE_APP_ENV=staging
VITE_APP_NAME=Joy Cart (Staging)
```

### 4. `.env.production`（生产环境）

```
# 生产环境专用变量
VITE_API_BASE_URL=https://api.joycart.com
VITE_APP_ENV=production
```

## 使用不同环境的命令

### 本地开发

#### 标准开发模式

直接在本地运行，享受Vite的热重载功能：

```bash
npm run dev
```

这将使用`.env.development`中的配置（如果存在），否则回退到`.env`。

#### Docker开发模式

使用Docker容器运行开发环境，同样支持热重载：

```bash
# 启动Docker开发容器
npm run dev:docker

# 或使用别名
npm run docker:dev
```

查看Docker开发容器日志：

```bash
npm run dev:docker:logs

# 或使用别名
npm run docker:logs
```

停止Docker开发容器：

```bash
npm run dev:docker:stop

# 或使用别名
npm run docker:stop
```

### 构建应用

#### 默认开发环境构建

```bash
npm run build
```

这将使用`.env.development`中的配置进行构建。

#### 测试/预发布环境构建

```bash
npm run build:staging
```

这将使用`.env.staging`中的配置进行构建。

#### 生产环境构建

```bash
npm run build:prod
```

这将使用`.env.production`中的配置进行构建。

### 生产部署

使用Docker构建并运行生产环境容器：

```bash
npm run docker:prod
```

这将创建优化的生产构建并在Docker容器中运行。

## 环境变量配置注意事项

1. **环境变量命名**：所有要在前端代码中访问的环境变量必须以`VITE_`前缀开头
2. **环境变量加载顺序**：
   - 首先加载`.env`文件（基础配置）
   - 然后加载特定模式的配置文件（如`.env.development`）
   - 特定模式的环境变量会覆盖基础配置中的同名变量
3. **访问环境变量**：在代码中通过`import.meta.env.VITE_XXX`访问环境变量

## CI/CD 部署

项目包含GitHub Actions工作流配置，支持自动化部署：

1. 在`.github/workflows/deploy.yml`中配置了基本的构建流程
2. 通过修改该文件，可以支持部署到不同的平台（如Vercel、Cloudflare Pages等）
3. 环境变量可以通过GitHub仓库的Secrets配置

## 自定义环境

如需添加其他环境（如UAT、QA等），可以创建相应的`.env.{环境名}`文件，并在`package.json`中添加构建脚本：

```json
"build:qa": "tsc -b && vite build --mode qa"
```

然后创建`.env.qa`文件配置该环境的变量。 