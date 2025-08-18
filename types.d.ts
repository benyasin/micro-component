declare module 'micro-components/vue/*' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<any, any, any>
  export default component
}

declare module 'micro-components/vue2/*' {
  import { VueConstructor } from 'vue'
  const component: VueConstructor
  export default component
}

declare module 'micro-components/react/*' {
  import { ComponentType } from 'react'
  const component: ComponentType<any>
  export default component
}

declare module 'micro-components/server-locales/*' {
  const locales: Record<string, any>
  export default locales
}

declare module 'micro-components/server-locale-modules/*' {
  const localeModules: Record<string, any>
  export default localeModules
}