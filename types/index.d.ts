interface process {
  server: boolean
  client: boolean
  browser: boolean
}

declare module '*.svg' {
  import { FunctionalComponent, SVGAttributes } from 'vue'
  const src: FunctionalComponent<SVGAttributes>
  export default src
}

interface Window {
  twq: any
  gtag: any
}
