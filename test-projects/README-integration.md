# Micro Component Test Projects Integration

## 架构概述

本项目现在采用基于 qiankun 的微前端架构，将原本独立的三个测试项目（Vue 3、React、Vue 2）集成到一个统一的主应用中。

### 项目结构

```
test-projects/
├── main-app/          # 主应用（基于 Vue 3 + qiankun）
├── vue3/              # Vue 3 微应用
├── react/             # React 微应用
├── vue2/              # Vue 2 微应用
└── README-integration.md
```

### 端口分配

- **主应用**: http://localhost:8080
- **Vue 3 微应用**: http://localhost:5173
- **React 微应用**: http://localhost:5174
- **Vue 2 微应用**: http://localhost:5175

## 快速开始

### 1. 安装依赖

```bash
# 在项目根目录执行
pnpm run test:install
```

### 2. 启动所有服务

```bash
# 同时启动主应用和所有微应用
pnpm run test:dev
```

### 3. 单独启动服务

```bash
# 只启动主应用
pnpm run test:dev:main

# 只启动 Vue 3 微应用
pnpm run test:dev:vue3

# 只启动 React 微应用
pnpm run test:dev:react

# 只启动 Vue 2 微应用
pnpm run test:dev:vue2
```

### 4. 构建所有项目

```bash
pnpm run test:build
```

## 使用说明

1. 启动服务后，访问 http://localhost:8080
2. 通过左侧边栏的标签页切换不同的技术栈测试环境
3. 每个微应用都可以独立运行和测试 micro-components

## 技术特性

### 主应用特性
- 基于 Vue 3 + Element Plus
- 使用 qiankun 作为微前端框架
- 统一的导航和布局
- 支持微应用的动态加载和卸载

### 微应用特性
- 支持独立运行和作为微应用运行
- 实现了 qiankun 生命周期函数
- 配置了 CORS 支持
- 保持原有的组件测试功能

### 开发体验
- 统一的脚本命令管理
- 支持热更新
- 可以同时启动或单独启动
- 保持了原有的 E2E 测试能力

## 注意事项

1. 确保所有端口（8080, 5173, 5174, 5175）都可用
2. 微应用需要先启动才能在主应用中正常显示
3. 如果遇到跨域问题，检查各微应用的 CORS 配置
4. 主应用会自动检测微应用的可用性

## 故障排除

### 微应用无法加载
1. 检查微应用是否正常启动
2. 确认端口配置是否正确
3. 查看浏览器控制台的错误信息

### 组件无法正常显示
1. 确保已构建最新的 micro-components
2. 检查组件的导入路径是否正确
3. 验证 micro-components 包是否正确安装

### 开发服务器启动失败
1. 检查端口是否被占用
2. 确认依赖是否正确安装
3. 查看终端的错误日志