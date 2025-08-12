import { Buffer } from 'buffer'
import { message } from '../message'
import { isClient } from '../index'

export const util = {
  getPlatform() {
    var userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.match(/(iphone|ipad|ipod|android|MicroMessenger)/)) {
      return userAgent.match(/(iphone|ipad|ipod|android|MicroMessenger)/)[1]
    }
    return ''
  }
}
function decodeBase64(base64) {
  return Buffer.from(base64, 'base64').toString()
}
function encodeBase64(str) {
  return Buffer.from(str).toString('base64')
}
function isBase64(base64Str) {
  return encodeBase64(decodeBase64(base64Str)) === base64Str
}

export const createAppRequest = (path, params, isTransfomrBase64 = true) => {
  var params = params || {}
  params = Object.assign({}, params)
  let requestId = `${path.replace(/[\/?=-]/g, '')}${Date.now()}${
    isTransfomrBase64 ? '_base64' : ''
  }`

  return new Promise((resolve, reject) => {
    appMethods.request({ requestId, path, params }, (err) => {
      if (process.client) {
        message({ message: err, type: 'error ' })
        // window.BitMessage(err, 'error')
      }
    })
    window[requestId] = (jsonString) => {
      console.log('path===>', path, jsonString)
      try {
        if (typeof jsonString === 'object') {
          resolve(jsonString)
        } else {
          if (isBase64(jsonString)) {
            jsonString = decodeBase64(jsonString)
          }

          //兼容 android setTokenToWeb 会返回 \n 的netinfo 信息
          if (jsonString.indexOf('\n') > -1) {
            console.log('兼容 android setTokenToWeb 会返回 \n 的netinfo 信息')
            let newString = jsonString.replace(/\n/g, '')
            resolve(JSON.parse(newString))
          } else {
            resolve(JSON.parse(jsonString))
          }
        }
      } catch (err) {
        reject(err)
      }
      window[requestId] = null
    }
  })
}

export const appMethods = {
  send: function (name, param, errfn) {
    var nav = util.getPlatform()
    var param = param || {}
    var paramstring = ''
    if (typeof param === 'string') {
      var paramstring = param
    } else {
      var paramstring = JSON.stringify(param)
    }
    if (nav == 'android') {
      //安卓系统
      try {
        switch (name) {
          case 'goLogin': // 跳到登录页
          case 'goCapital': //跳到资产页面
          case 'getReward': //跳到推荐返佣
          case 'goShare':
          case 'metaTitle': //设置title
          case 'goRealName': //实名认证
          case 'goBindingPhone': //手机绑定
          case 'navigationPopBack': //跳到首页
          case 'logout':
          case 'bgbDeductionTradefee': // 开启/关闭交易手续费BGB支付优惠
          case 'goForgetFundPwd':
          case 'goSetFundPwd':
          case 'openBrowser':
          case 'goRootController':
          case 'sendTokenToWeb':
          case 'isNewDevice':
          case 'transDomainConfig':
          case 'setPicCompressSize':
          case 'nativeRouter': // 新版跳转  2021.7.30
          case 'goAsset': // 资产现货
          case 'goIndex': // 去首页
          case 'requestAction':
          case 'goNativeShare': // 纯纯 拉起native分享
            window.control[name](paramstring)
            break
        }
      } catch (err) {
        if (errfn) {
          errfn(err)
        } else {
          // HMM({ type: 'info', message: 'Please upgrade the app' })
          if (process.client) {
            message({ message: 'Please upgrade the app' })
            // window.BitMessage('Please upgrade the app')
          }
        }
      }
    } else {
      try {
        switch (name) {
          case 'goLogin':
          case 'goCapital': //跳到资产页面
          case 'getReward': //跳到推荐返佣
          case 'goShare':
          case 'goRealName':
          case 'goBindingPhone':
          case 'navigationPopBack': //跳到首页
          case 'logout':
          case 'bgbDeductionTradefee': // 开启/关闭交易手续费BGB支付优惠
          case 'goForgetFundPwd':
          case 'goSetFundPwd':
          case 'openBrowser':
          case 'goRootController':
          case 'sendTokenToWeb':
          case 'isNewDevice':
          case 'transDomainConfig':
          case 'setPicCompressSize':
          case 'nativeRouter': // 新版跳转  2021.7.30
          case 'showTestView':
          case 'goAsset': // 资产现货
          case 'goIndex': // 去首页
          case 'requestAction':
          case 'goNativeShare': // 纯纯 拉起native分享
            window.webkit?.messageHandlers?.[name]?.postMessage?.(paramstring)
            break
        }
      } catch (err) {
        console.log(err)
        if (errfn) {
          errfn(err)
        } else {
          // HMM({ type: 'info', message: 'Please upgrade the app' })
          if (process.client) {
            message({ message: 'Please upgrade the app' })
            // window.BitMessage('Please upgrade the app')
          }
        }
      }
    }
  },
  bgbTradefee: function (param, errfn) {
    appMethods.send('bgbDeductionTradefee', param, errfn)
  },
  goAssetsOTC: function (param, errfn) {
    appMethods.send('goAsset', '', errfn)
  },
  goHome: function (param, errfn) {
    appMethods.send('navigationPopBack', param, errfn)
  },
  goCapital: function (param, errfn) {
    appMethods.send('goCapital', param, errfn)
  },
  getReward: function (param, errfn) {
    appMethods.send('getReward', param, errfn)
  },
  goShare: function (param, errfn) {
    appMethods.send('goShare', param, errfn)
  },
  metaTitle: function (param, errfn) {
    appMethods.send('metaTitle', param, errfn)
  },
  goRealName: function (param, errfn) {
    appMethods.send('goRealName', param, errfn)
  },
  goBindingPhone: function (param, errfn) {
    appMethods.send('goBindingPhone', param, errfn)
  },
  logout: function (param, errFn) {
    appMethods.send('logout', param, errFn)
  },
  goForgetFundPwd: function (param, errFn) {
    appMethods.send('goForgetFundPwd', param, errFn)
  },
  goSetFundPwd: function (param, errFn) {
    appMethods.send('goSetFundPwd', param, errFn)
  },
  openBrowser: function (param, errFn) {
    appMethods.send('openBrowser', param, errFn)
  },
  goRootController: function (param, errFn) {
    appMethods.send('goRootController', param, errFn)
  },
  // 纯纯拉起native 分享功能
  goNativeShare: function (param, errFn) {
    appMethods.send('goNativeShare', param, errFn)
  },

  // 去首页
  goIndex: function (param, errFn) {
    appMethods.send('goRootController', 'home', errFn)
  },

  // 去币币
  goCoin: function (param, errFn) {
    appMethods.send('goRootController', 'coin', errFn)
  },

  // 去合约
  goContract: function (param, errFn) {
    appMethods.send('goRootController', 'contract', errFn)
  },

  // 去“社区”
  goCommunity: function (param, errFn) {
    appMethods.send('goRootController', 'community', errFn)
  },

  // 去资产
  goAssets: function (param, errFn) {
    appMethods.send('goRootController', 'asset', errFn)
  },

  /***
   * 获取登录信息
   * @return Object
   * { loginName:string,uid:string,appVersion:string,rToken:string  }
   */
  sendTokenToWeb: function (errfn) {
    appMethods.send('sendTokenToWeb', 'sendTokenToWeb', errfn)
  },
  isNewDevice: function (errfn) {
    appMethods.send('isNewDevice', 'isNewDevice', errfn)
  },
  transDomainConfig: function (errfn) {
    appMethods.send('transDomainConfig', 'transDomainConfig', errfn)
  },
  setPicCompressSize: function (param, errfn) {
    appMethods.send('setPicCompressSize', param, errfn)
  },
  request: function (params, errfn) {
    // console.log('requestAction', params)
    appMethods.send('requestAction', params, errfn)
  },
  goLogin: function (param, errfn) {
    param = param || {}
    if (!param.url) {
      param.url = location.origin + location.pathname
    }
    let { closeGuide = false, referralCode = '' } = param
    let queryText = closeGuide ? `?closeGuide=${closeGuide}` : ''
    if (referralCode) {
      queryText += queryText ? `&referralCode=${referralCode}` : `?referralCode=${referralCode}`
    }
    appMethods.send('nativeRouter', `bitget://app.bitget.com/security/login${queryText}`)
  },
  openRegister: function (params = {}) {
    let { closeGuide = false, referralCode = '' } = params
    appMethods.send(
      'nativeRouter',
      `bitget://app.bitget.com/security/regist?closeGuide=${closeGuide}&referralCode=${referralCode}`
    )
  },
  openHome: function () {
    appMethods.send('nativeRouter', 'bitget://app.bitget.com/home/home')
  },
  /**
   * 去交易
   */
  openTrade: function () {
    appMethods.send('nativeRouter', 'bitget://app.bitget.com/home/coin')
  },

  /**
   * 去合约
   */
  openContract: function () {
    appMethods.send('nativeRouter', 'bitget://app.bitget.com/home/contract')
  },
  /**
   * 跟单页面
   */
  openFollow: function () {
    appMethods.send('nativeRouter', 'bitget://app.bitget.com/home/follow')
  },
  /**
   * 策略网格
   */
  openStrategy: function () {
    appMethods.send('nativeRouter', 'bitget://app.bitget.com/strategy/home')
  },

  openAsset: function () {
    appMethods.send('nativeRouter', 'bitget://app.bitget.com/home/asset')
  },
  /**
   * 去kyc
   */
  openKyc: function () {
    appMethods.send('nativeRouter', `bitget://app.bitget.com/kyc/identify`)
  },
  /**
   * 去充值
   */
  openRecharge: function (coinName, coinId) {
    var coinName = coinName || 'USDT'
    var coinId = coinId || 2
    appMethods.send(
      'nativeRouter',
      `bitget://app.bitget.com/coin/recharge?coinName=${coinName}&coinId=${coinId}`
    )
  },
  /**
   *
   * @param {number} isSpeed   isSpeed  自选区:0,极速区:1;
   * @param {number} isBuy isBuy 购买0,出售1
   */
  openOtc: function (isSpeed, isBuy) {
    var isSpeed = isSpeed || 0
    var isBuy = isBuy || 0
    appMethods.send(
      'nativeRouter',
      `bitget://app.bitget.com/otc/trade?isSpeed=${isBuy}&isBuy=${isBuy}`
    )
  },
  /**
   *
   * @param {number} type   type 正向:0,反向1;
   * @param {string} productCode
   */
  openContractByProductCode: function (type, productCode) {
    var type = type || 0
    var productCode = productCode || 'cmt_btcusdt'
    appMethods.send(
      'nativeRouter',
      `bitget://app.bitget.com/home/contract?type=${type}&productCode=${productCode}`
    )
  },
  /**
   * 教程中心
   */
  openTutorial: function () {
    appMethods.send('nativeRouter', 'bitget://app.bitget.com/tutorial/center')
  },
  openSetting: function (param, errfn) {
    param = param || {}
    if (!param.url) {
      param.url = location.origin + location.pathname
    }
    appMethods.send('nativeRouter', 'bitget://app.bitget.com/common/setting')
  },
  /**
   * 去实名
   * 由于当期 APP 不支持直接跳，所以先去个人中心中转一下
   * 由于 iOS 也不支持，先使用老的跳转方式
   */
  openRealName: function (param, errfn) {
    var nav = util.getPlatform()
    if (nav == 'android') {
      appMethods.send('nativeRouter', 'bitget://app.bitget.com/main/PersonalCenterActivity')
    } else {
      // iOS 目前(2021-11-12 添加)只支持 goRealName 方法
      appMethods.send('goRealName', param, errfn)
    }
  },
  // 购买BGN
  openBGBName: function () {
    appMethods.send('nativeRouter', 'bitget://app.bitget.com/home/coin?symbol=BGBUSDT_SPBL')
  },

  /**
   * 测试数据专用弹窗 2021-11-27 iOS 添加，安卓目前没有
   */
  showTestView: function (param, errfn) {
    var nav = util.getPlatform()
    if (nav == 'android') {
    } else {
      appMethods.send('showTestView', param, errfn)
    }
  }
}

/***
 * 判断是否是app环境
 */
export const isApp = () => {
  if (!isClient) return false
  if (!window) return false
  // 此条件满足安卓app
  if (window.control) return true
  // 此条件满足非安卓app 和 ios safari 浏览器
  if (!window.control && !window.webkit) return false
  // ios 执行下此方法 成功执行证明事app环境
  try {
    window.webkit.messageHandlers.transDomainConfig.postMessage(null)
    return true
  } catch (error) {
    console.log('error===>', error)
  }
  return false
}

/***
 * app内跳转第三方
 */
let appInfo = [
  {
    // 0
    appPackage: 'org.telegram.messenger',
    appName: 'telegram'
  },
  {
    // 1
    appPackage: 'com.facebook.katana',
    appName: 'facebook'
  },
  {
    // 2
    appPackage: 'com.twitter.android',
    appName: 'twitter'
  },
  {
    // 3
    appPackage: 'com.google.android.youtube',
    appName: 'youtube'
  },
  {
    // 4
    appPackage: 'com.sina.weibo',
    appName: 'weibo'
  },
  {
    // 5
    appPackage: 'com.linkedin.android.home',
    appName: 'linkedin'
  },
  {
    // 6
    appPackage: 'com.medium.reader',
    appName: 'medium'
  },
  {
    // 7
    appPackage: 'com.reddit.frontpage',
    appName: 'reddit'
  },
  {
    // 8
    appPackage: 'com.kakao.talk',
    appName: 'kakaotalk'
  },
  {
    // 9
    appPackage: 'kakaotalkblog',
    appName: 'kakaotalkblog'
  },
  {
    // 10
    appPackage: 'com.coingecko.coingeckoapp',
    appName: 'coingecko'
  },
  {
    // 11
    appPackage: 'com.coinmarketcap.android',
    appName: 'CoinMarketCap'
  },
  {
    // 12
    appPackage: 'com.instagram.android',
    appName: 'Instagram'
  },
  {
    // 13
    appPackage: 'jp.naver.line.android',
    appName: 'LINE'
  }
]
export const appRouterGo = (url) => {
  var nav = util.getPlatform()
  if (nav === 'android') {
    let param = {
      appPackage: 'org.telegram.messenger',
      appName: 'telegram',
      appUrl: url
    }
    appMethods.openBrowser(param, function () {
      location.href = url
    })
  } else {
    appMethods.openBrowser(url, function () {
      location.href = url
    })
  }
  return false
}
export const appRouterGoThreeApp = (url, type) => {
  var nav = util.getPlatform()
  if (nav === 'android') {
    let param = {}
    if (type == 1) {
      param = {
        appPackage: 'com.instagram.android',
        appName: 'Instagram',
        appUrl: url
      }
    } else if (type == 2) {
      param = {
        appPackage: 'com.facebook.katana',
        appName: 'facebook',
        appUrl: url
      }
    } else if (type == 3) {
      param = {
        appPackage: 'com.twitter.android',
        appName: 'twitter',
        appUrl: url
      }
    }
    appMethods.openBrowser(param, function () {
      location.href = url
    })
  } else {
    appMethods.openBrowser(url, function () {
      location.href = url
    })
  }
  return false
}
