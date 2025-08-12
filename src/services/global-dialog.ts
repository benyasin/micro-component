import { getInstance } from '@/utils/request/request'
import { DialogConfig } from '@/components/GlobalDialog/types'

const commonInstance = getInstance('')

// 临时方案，后续移到request里
interface Response<T = any> {
  code: string
  msg?: string
  data: T
}

export type DialogConfigListResult = {
  md5Value: string
  platformPops: DialogConfig[]
  actPops: DialogConfig[]
}
export function fetchDialogConfigList(md5Value: string) {
  // return {
  //   code: '200',
  //   data: {
  //     md5Value: '9UXrcobVVcjbdGdB6iBQ7w==',
  //     platformPops: [
  //       {
  //         h5Url: 'http://testimg.bitgetapp.com/multiLang/web/1fe08ec0bcc94a9c3da82ca03eb327a6.png',
  //         id: '268',
  //         jumpUrl: 'https://www.bitget.com/insights/new',
  //         name: '观点web',
  //         sortId: 1,
  //         triggerEndTime: String(Date.now() - 25 * 60 * 60 * 1000),
  //         triggerFrequency: '1',
  //         triggerPage: '',
  //         triggerStartTime: String(Date.now() + 25 * 60 * 60 * 1000),
  //         triggerTiming: '1',
  //         triggerType: '1',
  //         type: '1',
  //         url: 'http://testimg.bitgetapp.com/multiLang/web/1fe08ec0bcc94a9c3da82ca03eb327a6.png'
  //       },
  //       {
  //         h5Url: 'https://img.bitgetimg.com/multiLang/web/71e1c8bd343ded89b116814b8029e17a.png',
  //         id: '269',
  //         jumpUrl: 'https://www.bitget.com/insights/new',
  //         name: '观点web',
  //         sortId: 1,
  //         triggerEndTime: String(Date.now() - 25 * 60 * 60 * 1000),
  //         triggerFrequency: '1',
  //         triggerPage: '/markets',
  //         triggerStartTime: String(Date.now() + 25 * 60 * 60 * 1000),
  //         triggerTiming: '1',
  //         triggerType: '1',
  //         type: '1',
  //         url: 'http://testimg.bitgetapp.com/multiLang/web/1fe08ec0bcc94a9c3da82ca03eb327a6.png'
  //       }
  //     ],
  //     actPops: [
  //       {
  //         h5Url: 'http://testimg.bitgetapp.com/multiLang/web/1fe08ec0bcc94a9c3da82ca03eb327a6.png',
  //         id: '248',
  //         jumpUrl: 'https://www.bitget.com/insights/new',
  //         name: '观点web',
  //         sortId: 1,
  //         triggerEndTime: String(Date.now() - 25 * 60 * 60 * 1000),
  //         triggerFrequency: '1',
  //         triggerPage: '',
  //         triggerPageList: ['/markets', '/support', '/earn/bgb-staking'],
  //         triggerStartTime: String(Date.now() + 25 * 60 * 60 * 1000),
  //         triggerTiming: '1',
  //         triggerType: '1',
  //         type: '1',
  //         url: 'http://testimg.bitgetapp.com/multiLang/web/1fe08ec0bcc94a9c3da82ca03eb327a6.png'
  //       },
  //       {
  //         h5Url: 'https://img.bitgetimg.com/multiLang/web/71e1c8bd343ded89b116814b8029e17a.png',
  //         id: '249',
  //         jumpUrl: 'https://www.bitget.com/insights/new',
  //         name: '观点web',
  //         sortId: 1,
  //         triggerEndTime: String(Date.now() - 25 * 60 * 60 * 1000),
  //         triggerFrequency: '1',
  //         triggerPage: '',
  //         triggerPageList: ['/markets/rank', '/'],
  //         triggerStartTime: String(Date.now() + 25 * 60 * 60 * 1000),
  //         triggerTiming: '1',
  //         triggerType: '1',
  //         type: '1',
  //         url: 'https://img.bitgetimg.com/multiLang/web/71e1c8bd343ded89b116814b8029e17a.png'
  //       }
  //     ]
  //   },
  //   params: []
  // } as Response<DialogConfigListResult>
  return commonInstance.post('/v1/mix/public/pop/getPopList', {
    md5Value,
    terminalType: 1
  }) as Promise<Response<DialogConfigListResult>>
}
