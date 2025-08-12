// Copy from web_separation
// 暂时将这套请求复制过来，后续应改为通用请求

import axios from 'axios'
import Cookies from 'js-cookie'
import queryString from 'query-string'
import { defaultLanguageList } from '../config'
import { getRequest, getTerminalCode, getDeviceLanguage } from './utils'
import LocalCache, { CacheKey } from './LocalCache'
import { createAppRequest } from './appMethod'
import { message } from '../message.ts'
import { isClient, isApp } from '@/utils'
import { isMobile } from '@/utils/device'
import { getCurrentlLocaleConfig, getCurrentLocale } from '@/utils/locale'
import { withCacheInterceptor } from './interceptor-cache'
import { withMd5RequestInterceptor, withMd5ResponseInterceptor } from './interceptor-md5'

const serverUrl = 'https://www.bitget.com'
const env = import.meta.env.VITE_ENV || 'dev'

function goHome() {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Micro]登录态失效，开发环境阻止了首页跳转')
    return
  }
  const locale = getCurrentLocale()
  // 如果当前不是首页 跳到首页
  if (location.href != location.origin + '/' + locale) {
    location.href = '/' + locale
  }
}

function logout() {
  Cookies.remove('bt_rtoken')
  // 清除后端设置的cookie
  return baseRequest.post('/v1/user/public/clearCookie')
}

let instance = axios.create({
  timeout: 20000
})

instance.interceptors.request.use(null, (err) => {
  if (isClient) {
    const { requestMessage } = getCurrentlLocaleConfig()
    message({ message: requestMessage.timeout, type: 'error' })
  }
  return Promise.reject(err)
})

instance.interceptors.response.use(
  (data) => {
    // 请求失败
    if (data.status && data.status == 200 && data.data?.status == 'error') {
      if (isClient) {
        message({ message: data.data.msg, type: 'error' })
      }
      return
    }

    // 登录过期
    if (
      data.status &&
      data.status == 200 &&
      (data.data?.code == '00004' || data.data?.code == '20906' || data.data?.code == '20205')
    ) {
      // 如果是获取信息接口 直接返回 空对象
      if (data.config.url === '/v1/user/overview/userinfo') {
        return { data: {} }
      }
      // 登录超时，请重新登录 20205
      // Token已经过期请重新登录 20906
      if (isClient) {
        const { requestMessage } = getCurrentlLocaleConfig()
        message({ message: requestMessage.expired })
        logout().finally(() => {
          // 如果有限制登录的标识 不做处理
          if (!localStorage.getItem('bg:notlogin:tip') == 1) {
            goHome()
          }
        })
      }
      return
    }

    if (
      data.status &&
      data.status == 200 &&
      (data.data.code == '00006' || data.data.code == '00005')
    ) {
      // 如果是获取信息接口 直接返回 空对象
      if (data.config.url === '/v1/user/overview/userinfo') {
        return { data: {} }
      }
      if (isClient) {
        message({ message: data.data.msg })
        logout().finally(() => {
          goHome()
        })
      }
      return
    }

    return data
  },
  (err) => {
    if (isClient) {
      const response = err.response
      const { requestMessage } = getCurrentlLocaleConfig()

      if (response) {
        const messageText =
          {
            504: requestMessage.notfound,
            404: requestMessage.notfound,
            403: requestMessage.forbidden,
            500: requestMessage.unknow,
            429: ''
          }[response.status] ?? response.status + ':' + requestMessage.unknow
        if (messageText) {
          message({ message: messageText, type: 'error' })
        }
      } else {
        message({ message: err.message, type: 'error' })
      }

      console.error(`axios error: ${err.message}`)
    }

    return Promise.reject(err)
  }
)

if (isClient && !isApp() && !isMobile()) {
  withMd5RequestInterceptor(instance)
  withMd5ResponseInterceptor(instance)
  withCacheInterceptor(instance)
}

function getHeaders(data) {
  let headers = {}
  let language = getLocale(data.languageType)

  // 主题, 默认暗色 增加ssr 兼容
  if (isClient) {
    headers['appTheme'] = ['white', 'light'].includes(LocalCache.get(CacheKey.GLOBAL_THEME))
      ? 'standard'
      : 'dark'
  }

  headers['Content-Type'] = 'application/json;charset=utf-8'
  headers['locale'] = language
  headers['language'] = language

  // sign 用于加密数据 放到请求头中
  if (data.sign) {
    headers['sign'] = data.sign
  }
  // secretKey 也放到请求头中
  if (data.secretKey) {
    headers['secretKey'] = data.secretKey
  }
  // 登录第二步标识
  if (data.accessToken) {
    headers['u-token'] = data.accessToken
  }
  // msg 服务 标识
  if (data.vToken) {
    headers['v-token'] = data.vToken
  }
  //设备标识
  if (data.terminalCode) {
    headers['terminalCode'] = data.terminalCode
  }
  //终端类型
  if (data.terminaltype) {
    headers['terminaltype'] = data.terminaltype
  }
  // 转盘添加防重token
  if (data.lotteryDrawToken) {
    headers['idempotentToken'] = data.lotteryDrawToken
  }

  //埋点标识 FBID,GAID
  if (isClient) {
    const { _fbp, _fbc, _ga, _ttclid, _clientid, _sessionid } = Cookies.get()

    if (_fbp) {
      headers['FBID'] = _fbp
    }
    if (_fbc) {
      headers['FBCID'] = _fbc
    }
    if (_ga) {
      headers['GAID'] = _ga
    }
    if (_ttclid) {
      headers['TTCLID'] = _ttclid
    }
    if (_clientid) {
      headers['GACLIENTID'] = _clientid
    }
    if (_sessionid) {
      headers['GASESSIONID'] = _sessionid
    }

    // 添加设备语言参数 devicelanguage gclid
    try {
      let devicelanguage = getDeviceLanguage()
      if (devicelanguage) {
        let filterLang = defaultLanguageList.find((item) => item.locale === devicelanguage) || {}
        headers['devicelanguage'] = filterLang.languageKey || 'en_US'
      } else {
        headers['devicelanguage'] = 'en_US'
      }

      let getQuery = getRequest()
      let gclid = getQuery['gclid']
      if (gclid) {
        headers['gclid'] = gclid
      }
    } catch (err) {}

    //防止terminaltype参数被覆盖
    headers['terminaltype'] = headers['terminaltype'] || 1
    headers['terminalCode'] = getTerminalCode()
    headers['pfb'] = queryString.parseUrl(location.href).query?.pfb
    if (env === 'beta') {
      headers['beta'] = 'beta'
    }
  }

  return headers
}

function getLocale(lang) {
  let currentLang = defaultLanguageList.find((item) => item.languageType == lang)
  if (currentLang) {
    return currentLang.languageKey
  } else {
    return 'en_US'
  }
}

export const getInstance = () => {
  async function request(method = 'post', url, data = {}, options) {
    if (!isClient) {
      url = serverUrl + url
    }

    data = data || {}
    // 针对body中含有签名sign字段的值 -》删除
    if (data.sign) {
      data = (({ sign, ...rest }) => rest)(data)
    }

    if (!('languageType' in data)) {
      const { languageType } = getCurrentlLocaleConfig()
      data = Object.assign({}, data, { languageType })
    }

    return instance
      .request({
        url,
        method,
        headers: getHeaders(data),
        params: method === 'get' ? data : {},
        data: method === 'post' ? data : {},
        ...options
      })
      .then((res) => {
        return Promise.resolve(res?.data)
      })
      .catch((e) => {
        return Promise.resolve({
          code: -100000,
          msg: e.message
        })
      })
  }

  return {
    post(url, data, options) {
      if (isApp()) {
        return createAppRequest(url, data)
      }
      return request('post', url, data, options)
    },
    get(url, data, options) {
      return request('get', url, data, options)
    },
    webpost(url, data, options) {
      return request('post', url, data, options)
    },
    webget(url, data, options) {
      return request('get', url, data, options)
    }
  }
}

export const commonInstance = getInstance()
