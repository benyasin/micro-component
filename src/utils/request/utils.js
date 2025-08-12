export const getDeviceLanguage = () => {
  var navlang = navigator.userLanguage || window.navigator.language || ''
  let deviceLang = ''
  if (navlang) {
    navlang = navlang.toLocaleLowerCase()
    if (/zh/.test(navlang)) {
      deviceLang = 'zh-CN'
    }
    if (/en/.test(navlang)) {
      deviceLang = 'en'
    }
    if (/ko/.test(navlang)) {
      deviceLang = 'en-GB'
    }
    if (/ja/.test(navlang)) {
      deviceLang = 'ja'
    }
    if (/vi/.test(navlang)) {
      deviceLang = 'vi'
    }
    if (/zh-tw/.test(navlang)) {
      deviceLang = 'zh-TW'
    }
    if (/ru/.test(navlang)) {
      deviceLang = 'ru'
    }
    if (/es/.test(navlang)) {
      deviceLang = 'es'
    }
    if (/tr/.test(navlang)) {
      deviceLang = 'tr'
    }
    if (/fr/.test(navlang)) {
      deviceLang = 'fr'
    }
    if (/de/.test(navlang)) {
      deviceLang = 'de'
    }
    if (/pt/.test(navlang)) {
      deviceLang = 'pt'
    }
    if (/id/.test(navlang)) {
      deviceLang = 'id'
    }
    if (/it/.test(navlang)) {
      deviceLang = 'it'
    }
    if (/th/.test(navlang)) {
      deviceLang = 'th'
    }
    if (/nl/.test(navlang)) {
      deviceLang = 'nl'
    }
    if (/pl/.test(navlang)) {
      deviceLang = 'pl'
    }
    if (/uk/.test(navlang)) {
      deviceLang = 'uk'
    }
    if (/sv/.test(navlang)) {
      deviceLang = 'sv'
    }
  }
  return deviceLang
}

export const getRequest = () => {
  var url = location.search // 获取url中"?"符后的字串
  var theRequest = {}
  if (url.indexOf('?') != -1) {
    var str = url.substr(1)
    let strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return theRequest
}

export const getTerminalCode = () => {
  let terminalCode = localStorage.getItem('bitget:terminalCode')
  if (terminalCode) {
    return terminalCode
  }
}
