import { BaseProps } from '@/types/component'

export interface Props extends BaseProps {}

export type Events = {
  click: (param: string) => void
}
