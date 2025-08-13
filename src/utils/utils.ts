import queryString from 'query-string'

/***
 * 数字千分位 国际化处理
 */
export const number2Thousands = (locale, num) => {
  let newNumber = num ? Number(num) || 0 : 0
  return newNumber.toLocaleString('en', { maximumFractionDigits: 16 })
}
/***
 * 判断安卓还是ios
 */
export let isIos = () => {
  const u = navigator.userAgent
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isiOS) {
    return true
  } else {
    return false
  }
}
// Copy from Web_Separation 判断终端访问
export let browser = () => {
  var u = navigator.userAgent
  return {
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone
    iPad: u.indexOf('iPad') > -1, //是否iPad
    safari: /Safari/.test(u) && !/Chrome/.test(u) //是否Safar浏览器
  }
}
/**
 * 金额格式化
 * @param {number} amount 金额
 * @param {boolean} [isRound] 是否四舍五入 默认否
 * @param {string} [splitStr] 是否使用分隔符 默认否
 * @param {number} [digits] 小数位数
 * @param {boolean} [endZero] 末尾是否加0
 * @param {boolean} [isNewAssetsRevision] 资产改版千分符
 * @param { String}  [locale] 语言
 * @returns {string} 格式化后的数字，默认两位小数 formatMoney("12345.675910", 3)
 */
export function formatMoney(
  amount,
  isRound = false,
  splitStr = '',
  digits = null,
  endZero = false,
  isNewAssetsRevision,
  locale
) {
  if (amount === null || amount === '' || isNaN(amount)) {
    return '0'
  } else {
    amount = parseFloat((amount + '').replace(/[^\d\.-]/g, ''))
    if (digits === null) {
      if (amount.toString().indexOf('.') > -1) {
        digits = amount.toString().split('.')[1].length
      } else {
        digits = 0
      }
    }
    if (isRound) {
      amount = amount.toFixed(digits) + ''
    } else {
      amount = amount.toFixed(digits + 1)
      amount = amount.substring(0, amount.toString().length - 1)
    }
    let l = amount.split('.')[0].split('').reverse()
    let r = amount.split('.')[1]
    let t = ''
    if (splitStr) {
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? splitStr : '')
      }
    } else {
      for (let i = 0; i < l.length; i++) {
        t += l[i]
      }
    }
    // 末尾是否加0
    if (endZero) {
      r = '.' + r
    } else {
      r = r > 0 ? '.' + r : ''
    }

    const moneyStr = t.split('').reverse().join('') + r
    if (isNewAssetsRevision) return number2Thousands(locale, moneyStr)
    return moneyStr
  }
}

/** 将科学计数法转化为小数 */
export function toNonExponential(num) {
  var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
  return num.toFixed(Math.max(0, (m[1] || '').length - m[2]))
}

export function isMobile() {
  return document.documentElement.clientWidth < 768
}

/**
 * 阿拉伯语环境需要将百分比涨跌幅由+2.5% 转换成%-2.5
 * @param {boolean} [addZeroPlus] 零的时候添加+号
 * @param {string} [prefixUnit] 前缀单位 默认 %
 * @param {boolean} [hasSymbol] 是否添加 +/-
 * @param {boolean} [addThousandsSeparator] 是否添加千位分隔符
 */
export function convertPercentage(
  percentageStr,
  prefixUnit = '%',
  addZeroPlus = false,
  hasSymbol = true,
  addThousandsSeparator = false
) {
  const percentageNum = parseFloat(percentageStr) // 先转换成数值
  let result = '' // 最终结果
  if (isNaN(percentageNum)) {
    // 如果不是数值，直接返回原字符串
    result = percentageStr
  } else {
    if (percentageNum > 0) {
      const num = addThousandsSeparator ? number2Thousands('ar', percentageNum) : percentageNum
      result = `${hasSymbol ? '+' : ''}${prefixUnit}${num}`
    } else if (percentageNum < 0) {
      const num = addThousandsSeparator
        ? number2Thousands('ar', Math.abs(percentageNum))
        : Math.abs(percentageNum)
      result = `${hasSymbol ? '-' : ''}${prefixUnit}${num}`
    } else {
      result = addZeroPlus ? `${hasSymbol ? '+' : ''}${prefixUnit}0` : `${prefixUnit}0`
    }
  }
  return result
}

/**
 * 获取币单位
 */
export function getCoinUnit(pricedSymbol: string) {
  if (!pricedSymbol) {
    return '$'
  }
  if (pricedSymbol === 'BTC') {
    return '฿'
  }
  if (pricedSymbol === 'ETH') {
    return 'E'
  }
  if (pricedSymbol.indexOf('USDT') > -1) {
    return '₮'
  }
  return '$'
}

/***
 * swap币价格规则
 * @param {string} price 价格
 */
export const formatSwapPrice = (price) => {
  price = String(price)
  if (isNaN(price)) return ''
  if (price == 0) return '0.00'
  // 价格大于等于1U的代币，四舍五入后，显示小数点后2位
  if (price >= 1) {
    return Number(price).toFixed(2)
  } else {
    // 小数点后面是否以0开头,不为0，直接显示4位
    let index = price.indexOf('.')
    if (price[index + 1] != 0) {
      return Number(price).toFixed(4)
    }
    // 计算小数点后连续0的个数
    // 0.01234      -> 1
    // 0.00001234   -> 4
    let zeroLength = 0
    // 保留小数点前面的值
    let preNum = price.split('.')[0]
    // 截取小数点后的值，并且转成array，计算zeroLength的长度
    let zeroPriceArr = price.substring(index + 1).split('')
    for (let i = 0; i < zeroPriceArr.length; i++) {
      if (zeroPriceArr[i] == 0) {
        zeroLength += 1
      } else {
        break
      }
    }
    let fixedNum = zeroLength + 4
    // 四舍五入后的值
    let value = Number(price).toFixed(fixedNum)
    let zeroIdx = value.indexOf('.')
    let nextNum = value.substring(zeroIdx + 1 + zeroLength)
    // 求出转换后是否有进制的情况存在
    // 示例
    // 0.00009999 -> 0.00010000
    let newZeroLength = 0
    // 保留小数点前面的值
    let newPreNum = value.split('.')[0]
    // 截取小数点后的值，并且转成array，计算zeroLength的长度
    let newZeroPriceArr = value.substring(index + 1).split('')
    for (let i = 0; i < newZeroPriceArr.length; i++) {
      if (newZeroPriceArr[i] == 0) {
        newZeroLength += 1
      } else {
        break
      }
    }
    // 示例
    // 0.00001234 -> 0.0{4}1234
    // 0.0001234 -> 0.0001234
    if (zeroLength >= 4 && newZeroLength == zeroLength) {
      return `${preNum}.{${zeroLength}}${nextNum}`
    } else {
      return value
    }
    // 后置除了连续0的数字
    // return Number(price).toFixed(fixedNum)
  }
}

/**
 * 获取业务线businessLine类型：现货spot-1；合约futures-10/11/12；swap-22
 */
export const getBizType = (param: any) => {
  if (typeof param === 'string' || typeof param === 'number') {
    switch (param.toString()?.toLowerCase()) {
      // 现货
      case '1':
        return 'spot'
      // 合约
      case '10':
      case '11':
      case '12':
        return 'futures'
      // megaswap
      case '22':
        return 'swap'
      default:
        return ''
    }
  }

  if (typeof param === 'object' && param.hasOwnProperty('swapTokenId')) {
    return 'swap'
  }
}

/**
 * 判断是否是数字
 * @param {} value
 * @returns
 */
export const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

/**
 * 转换每个位置的数字为0  123,456.789 => 000,000.000
 * @param {*} value
 * @returns
 */
export const resetNumberToZero = (value) => {
  if (value.toString) {
    return value
      .toString()
      .split('')
      .map((item) => {
        return isNumeric(item) ? 0 : item
      })
      .join('')
  }
  return value
}

/**
 * query参数多转一 例如：'123,456' => '123'
 * @param {any} params
 * @returns {string}
 */
export const multipleToSingle = (params) => {
  if (typeof params === 'string') {
    return params.split(',')[0]
  } else if (typeof params === 'number') {
    return params
  } else if (Array.isArray(params)) {
    return params[0] || ''
  }
  return ''
}

// 获取缓存，判断是否过期
export const localStorageGet = (name) => {
  const storage = localStorage.getItem(name)
  const time = new Date().getTime()
  let result = {}
  if (storage) {
    const obj = JSON.parse(storage)
    if (time <= obj.time && time <= obj?.data?.effectiveEndTime) {
      result = obj.data
    } else {
      localStorage.removeItem(name)
    }
  }
  return result
}

export const loadScript = (url, cb, timeout = 10000) => {
  var script = document.createElement('script')
  var head = document.getElementsByTagName('head')[0]
  script.charset = 'UTF-8'
  script.async = true

  script.onerror = function () {
    cb(true)
    // 错误触发了，超时逻辑就不用了
    loaded = true
  }
  var loaded = false
  script.onload = script.onreadystatechange = function () {
    if (
      !loaded &&
      (!script.readyState || 'loaded' === script.readyState || 'complete' === script.readyState)
    ) {
      loaded = true
      setTimeout(function () {
        cb(false)
      }, 0)
    }
  }
  script.src = url
  head.appendChild(script)

  setTimeout(function () {
    if (!loaded) {
      script.onerror = script.onload = null
      script.remove && script.remove()
      cb(true)
    }
  }, timeout || 10000)
}
