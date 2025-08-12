# MicroComponent

## 实现方案

https://bglimited.larksuite.com/wiki/H5Mkwx4TKimTMBkzohMuAiObsud

## 如何使用

https://bglimited.larksuite.com/wiki/K0eGwYjAiik06BkmPzaur2IFsdf

## 目录结构

`src` 组件开发目录

`playground` 本地开发 App, dev 时启动

`runtime` 框架基座

`template` NPM 组件生成模版

`scripts` 构建脚本

`locales` 多语言

## 开发

### 常用命令

启动本地开发

```bash
pnpm run dev
```

更新多语言

```bash
pnpm run fetch:locale
```

创建组件

```bash
pnpm run create-component <Name>
```

测试环境部署

在 QA 上搜索 micro-component，在对应环境构建

发布 NPM

**只有在新增组件或者调整构建的时候，才需要修改版本号推送 NPM，日常业务开发只需要在 QA 上构建即可。**

### Whistle 配置

本地开发域名（测试环境）：

http://web-separation.test8.bitget.tools/micro/playground/index.html#/header/

本地开发域名（灰度环境）：

http://micro.bitget.bike/micro/playground/index.html#/Header

```bash
# Micro 本地开发-测试环境
/^http:\/\/web-separation\.test(\d+)\.bitget\.tools\/micro\/(index.html|main.ts)/ http://localhost:5173/micro/playground/$2
/^http:\/\/web-separation\.test(\d+)\.bitget\.tools\/micro\/(.*)/ http://localhost:5173/micro/$2
# Micro 本地开发-灰度
/^http:\/\/micro\.bitget\.bike\/micro\/(index.html|main.ts)/ http://localhost:5173/micro/playground/$1
/^http:\/\/micro\.bitget\.bike\/micro\/(.*)/ http://localhost:5173/micro/$1
/^http:\/\/micro\.bitget\.bike\/v1(.*)/ https://www.bitget.bike/v1$1
# Micro 主站本地开发时micro-runtime.js转发到测试环境
/^https?:\/\/local\.(web-separation|h5-activity)\.test(\d)\.bitget\.tools/micro-runtime(.*)/ http://$1.test$2.bitget.tools/micro-runtime$3
```

### 本地登录

在对应的 test 环境登录后，dev 环境会自动获取登录态（灰度暂时无法模拟登录）

### 修改菜单

左侧菜单在 管理后台 - 菜单管理 进行配置，线上需提需求给产品 Carrina Y 配置。
右侧菜单在 `src/components/Header/useLocalMenu.ts` 里配置，请勿在.vue 文件里写死菜单。

### 开发约定

- 修改了根组件 props 类型需要重启 dev（vite bug）。
- 不用 filter。
- 不用全局变量，确保任何一个变量和函数都可以点击跳转到定义处。
- 不要用 toRefs，toRefs 无法跟踪新增的属性，使用 toRef 或 computed 代替。
- 在 svg 里用 css 变量和 currentColor 就可以同时兼容深色和浅色主题，不要用这种不同主题的图片：user-light.svg、user-dark.svg。
- uno css 尽量使用 tailwind 支持的特性，后期会迁移成 tailwind。

### 性能优化指南

- 不要在移动端初始化时请求非首屏的接口，包括各种 Settings、MenuList 等都不要，延迟到用户操作之后再请求。
- 不要在移动端执行 PC 端特有的逻辑，比如 useTrade、useComponentVisible，通过 isMobile 判断。
- 自适应时需要通过 css media 和 useSize v-if 双重判断，可减少非必要的 dom 数量。
- 避免在循环里使用较长的 tailwind class，会导致 SSR 体积增加，使用 @apply 代替。
- 非 SSR 必要的 dom 需加上 v-if="isClient"，可减少 SSR HTML 体积。
- 大于 5k 的 svg 需通过下面的工具压缩。

### 事件处理

在组件 types.ts 里添加事件类型。

```ts
export type Events = {
  push: (path: string) => any
  themeChange: (theme: 'light' | 'dark') => any
}
```

通过 useEvent 来触发事件，这个 hook 封装了基础事件能力，并且会对泛型进行解析，输出正确类型。

```ts
export const useComponent = defineStore(() => {
  const event = useEvent<Events>()
  return {
    event
  }
})
const { event } = useComponent()
// 触发事件
event.emit('push', 'https://www.bitget.com')
// 监听事件
event.on('push', (url) => {})
```

### props 处理

由于组件是通过 CDN 创建，难以从 defineProp 追踪变化，因此需要通过 useProps 来获取响应式的 props。

```ts
export const useComponent = defineStore(() => {
  const { props: rootProps } = useProps(defaultProps)
  return {
    rootProps
  }
})
const { rootProps } = useComponent()
console.log(rootProps.locale)
```

### 路由跳转方式

由于不同框架的路由跳转方式不同，公共组件里需要对 a 标签的默认行为进行拦截，通过事件暴露给调用方自己处理跳转。
这个做法封装在 Link 组件里，开发时用 Link 代替 a 标签。

```html
<link href="/" target="_blank" />
```

代码里跳转通过事件完成

```ts
const { event } = useComponent()
event.emit('push', href)
```

### defineExpose

每个组件约定暴露 props, updateProps, event 几个属性，以便代理组件进行事件和 props 的转发。

可通过 makeExpose 函数来组装 exposed 对象。

```ts
import { makeExpose } from '@/utils/component'

const useComponent = defineStore(() => {
  const { props, updateProps } = useProps(defaultProps)
  const event = useEvent<Events>()
  return {
    updateProps,
    event
  }
})
const { props, updateProps, event } = useComponent()

defineExpose(
  makeExpose({
    props,
    updateProps,
    event
  })
)
```

## TODO

- ESLint
- 生成组件类型文件
- 公共函数抽离（如 doRequest.js)

## 工具

- SVG 压缩（https://jakearchibald.github.io/svgomg/）
