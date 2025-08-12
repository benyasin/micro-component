;(function () {
  function BitKeepInvoke() {
    if (!window.__jMessageCallbacks) window.__jMessageCallbacks = {}
    if (!window.__jMessage) window.__jMessage = this.jMessage
    this._init()
  }

  BitKeepInvoke.prototype._init = function () {
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', this.bind(this._initCallback, this), true)
      var timeout = setInterval(
        this.bind(function () {
          if (/loaded|complete/.test(document.readyState)) {
            this._initCallback()
            clearTimeout(timeout)
          }
        }, this),
        100
      )
    } else {
      var src = 'javascript: void(0)'
      if (window.location.protocol == 'https:') {
        src = '//:'
      }
      document.write(
        '<script onreadystatechange="if (this.readyState==\'complete\') {this.parentNode.removeChild(this);window.BitKeepInvoke._initCallback();}" defer="defer" ' +
          'src="' +
          src +
          '"></script>'
      )
    }
    window.onload = this.bind(this._initCallback, this)
  }

  BitKeepInvoke.prototype._initCallback = function () {
    if (this._inited == true) return
    this._inited = true
    setTimeout(
      this.bind(function () {
        if (window.flutter_inappwebview || window.BitKeepJS) {
          this._connectStatus = 'success'
          if (this._onReadyCallback) {
            console.log('BitKeep Connect Success.')
            this._onReadyCallback()
          }
        } else {
          console.log('BitKeep Connect Failure.')
          this._connectStatus = 'failure'
          if (this.onErrorCallback) {
            this.onErrorCallback()
          }
        }
      }, this),
      100
    )
  }

  BitKeepInvoke.prototype.jHost = function (params, callback) {
    if (this._connectStatus != 'success' && callback) return callback('Not Connect')
    if (params.length == 0 && callback) return callback('Lost Params')
    var id = new Date().getTime().toString() + parseInt(Math.random() * 10000)
    var args = [params[0], id]
    for (var i = 1; i < params.length; i++) {
      args.push(params[i])
    }
    window.__jMessageCallbacks[id] = callback
    if (window.flutter_inappwebview && window.flutter_inappwebview.callHandler) {
      window.flutter_inappwebview.callHandler.apply(null, args)
    } else if (window.BitKeepJS) {
      window.BitKeepJS.postMessage(JSON.stringify(args))
    }
  }

  BitKeepInvoke.prototype.jMessage = function () {
    if (arguments.length < 2) {
      return
    }
    var id = arguments[0].toString()
    var args = []
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
      }
    }
    if (window.__jMessageCallbacks[id]) {
      window.__jMessageCallbacks[id].apply(this, args)
    }
  }

  BitKeepInvoke.prototype.bind = function (fun) {
    var _this = arguments[1],
      args = []
    for (var i = 2, il = arguments.length; i < il; i++) {
      args.push(arguments[i])
    }
    return function () {
      var thisArgs = args.concat()
      for (var i = 0, il = arguments.length; i < il; i++) {
        thisArgs.push(arguments[i])
      }
      return fun.apply(_this || this, thisArgs)
    }
  }

  BitKeepInvoke.prototype.onLoadReady = function (callback) {
    if (this._connectStatus == 'success') {
      callback()
    } else {
      this._onReadyCallback = callback
    }
  }

  BitKeepInvoke.prototype.onLoadError = function (callback) {
    if (this._connectStatus == 'failure') {
      callback()
    } else {
      this.onErrorCallback = callback
    }
  }

  // 获取钱包身份
  BitKeepInvoke.prototype.getIdentity = function (callback) {
    this.jHost(['getIdentity'], function (err, data) {
      if (err) {
        if (callback) callback(err)
      } else {
        if (callback) callback(err, data)
      }
    })
  }

  BitKeepInvoke.prototype.scan = function (callback) {
    this.jHost(['scan'], function (err, result) {
      if (callback) callback(err, result)
    })
  }

  // 获取地址
  BitKeepInvoke.prototype.getAddress = function (callback) {
    this.jHost(['getAddress'], function (err, data) {
      if (err) {
        if (callback) callback(err)
      } else {
        data = JSON.parse(data)
        if (callback) callback(err, data)
      }
    })
  }

  BitKeepInvoke.prototype.getHeader = function (callback) {
    this.jHost(['getHeader'], function (err, data) {
      if (err) {
        if (callback) callback(err)
      } else {
        data = JSON.parse(data)
        if (callback) callback(err, data)
      }
    })
  }

  BitKeepInvoke.prototype.appMode = function (callback) {
    this.jHost(['appMode'], function (err, data) {
      if (err) {
        if (callback) callback(err)
      } else {
        if (callback) callback(err, data)
      }
    })
  }

  BitKeepInvoke.prototype.selectCoin = function (chain, callback) {
    this.jHost(['selectCoin', chain ? chain.toLowerCase() : ''], function (err, data) {
      if (err) {
        if (callback) callback(err)
      } else {
        data = JSON.parse(data)
        if (callback) callback(err, data)
      }
    })
  }

  BitKeepInvoke.prototype.getCoins = function (callback) {
    this.jHost(['getCoins'], function (err, data) {
      if (err) {
        if (callback) callback(err)
      } else {
        data = JSON.parse(data)
        if (callback) callback(err, data)
      }
    })
  }

  BitKeepInvoke.prototype.getAddressBooks = function (chain, callback) {
    this.jHost(['getAddressBooks', chain], function (err, data) {
      if (err) {
        if (callback) callback(err)
      } else {
        data = JSON.parse(data)
        if (callback) callback(err, data)
      }
    })
  }

  BitKeepInvoke.prototype.creatChain = function (chain, callback) {
    this.jHost(['creatChain', chain], function (err, data) {
      if (err) {
        if (callback) callback(err)
      } else {
        if (callback) callback(err, data)
      }
    })
  }

  BitKeepInvoke.prototype.checkHaveChain = function (chain, callback) {
    this.jHost(['checkHaveChain', chain], function (err, data) {
      if (err) {
        if (callback) callback(err)
      } else {
        if (callback) callback(err, data)
      }
    })
  }

  BitKeepInvoke.prototype.getAllIdentitys = function (chain, callback) {
    this.jHost(['getAllIdentitys', chain], function (err, data) {
      if (err) {
        if (callback) callback(err)
      } else {
        data = JSON.parse(data)
        if (callback) callback(err, data)
      }
    })
  }

  BitKeepInvoke.prototype.addCoin = function (coin, chain, contract, callback) {
    this.jHost(['addCoin', coin, chain, contract], function (err, result) {
      if (err) {
        if (callback) callback(err)
      } else {
        if (callback) callback(err, result.toString() == 'true')
      }
    })
  }
  BitKeepInvoke.prototype.addNFT = function (coin, chain, contract, callback) {
    this.jHost(['addNFT', coin, chain, contract], function (err, result) {
      if (err) {
        if (callback) callback(err)
      } else {
        if (callback) callback(err, result.toString() == 'true')
      }
    })
  }

  BitKeepInvoke.prototype.walletReceive = function (
    chain,
    address,
    symbol,
    icon,
    canSwitch,
    callback
  ) {
    this.jHost(['walletReceive', chain, address, symbol, icon, canSwitch], function (err, result) {
      if (err) {
        if (callback) callback(err)
      } else {
        if (callback) callback(err, result.toString() == 'true')
      }
    })
  }

  BitKeepInvoke.prototype.toast = function (text) {
    this.jHost(['toast', text])
  }

  BitKeepInvoke.prototype.alert = function (text, callback) {
    this.jHost(['alert', text], function () {
      if (callback) callback()
    })
  }

  BitKeepInvoke.prototype.confirm = function (text, callback) {
    this.jHost(['confirm', text], function (err, result) {
      if (callback) callback(result.toString() == 'true')
    })
  }

  BitKeepInvoke.prototype.safeCenter = function () {
    this.jHost(['safeCenter'])
  }

  BitKeepInvoke.prototype.hideSelectChain = function () {
    this.jHost(['hideSelectChain'])
  }

  BitKeepInvoke.prototype.redPackget = function () {
    this.jHost(['redPackget'])
  }

  BitKeepInvoke.prototype.close = function () {
    this.jHost(['close'])
  }

  BitKeepInvoke.prototype.nativeApp = function (parmase) {
    if (parmase) {
      this.jHost(['nativeApp', 'swapSwap', parmase])
    } else {
      this.jHost(['nativeApp', 'swapSwap'])
    }
  }

  BitKeepInvoke.prototype.callFutures = function (params = '') {
    this.jHost(['callFutures', params])
  }

  BitKeepInvoke.prototype.selecterAddress = function (callback, type) {
    this.jHost(type ? ['selecterAddress', type] : ['selecterAddress'], function (err, data) {
      if (err) {
        if (callback) callback(err)
      } else {
        data = JSON.parse(data)
        if (callback) callback(err, data)
      }
    })
  }

  BitKeepInvoke.prototype.switchWallet = function (callback, chain) {
    this.jHost(chain ? ['switchWallet', chain] : ['switchWallet'], function (err, data) {
      if (err) {
        if (callback) callback(err)
      } else {
        data = JSON.parse(data)
        if (callback) callback(err, data)
      }
    })
  }

  ///getWalletInfo  type钱包类型: 0为助记词, 1为私钥, 2. 观察者钱包, 3. 硬件钱包, 4. MPC钱包
  BitKeepInvoke.prototype.getWalletInfo = function (callback) {
    this.jHost(['getWalletInfo'], function (err, data) {
      if (err) {
        if (callback) callback(err)
      } else {
        if (callback) callback(err, data)
      }
    })
  }

  BitKeepInvoke.prototype.showLoading = function () {
    this.jHost(['showLoading'])
  }

  BitKeepInvoke.prototype.hideLoading = function () {
    this.jHost(['closeLoading'])
  }

  BitKeepInvoke.prototype.openUrl = function (url) {
    this.jHost(['url', url])
  }

  BitKeepInvoke.prototype.url = function (url) {
    this.jHost(['url', url])
  }

  BitKeepInvoke.prototype.openUrl2 = function (url) {
    this.jHost(['openUrl', url])
  }

  BitKeepInvoke.prototype.setTitle = function (title) {
    this.jHost(['setTitle', title])
  }

  // 在右上角显示文本按钮
  BitKeepInvoke.prototype.setTextAction = function (title, callback) {
    this.jHost(['setTextAction', title], function () {
      if (callback) callback()
    })
  }

  // 在右上角显示图片按钮
  BitKeepInvoke.prototype.setIconAction = function (icon, callback) {
    this.jHost(['setIconAction', icon], function () {
      if (callback) callback()
    })
  }

  // 分享文本
  BitKeepInvoke.prototype.shareText = function (text, callback) {
    this.jHost(['shareText', text], function () {
      if (callback) callback()
    })
  }

  // 分享图片
  BitKeepInvoke.prototype.shareImage = function (image, callback) {
    this.jHost(['shareImage', image], function () {
      if (callback) callback()
    })
  }

  // 分享截图
  BitKeepInvoke.prototype.shareScreenshot = function (callback) {
    this.jHost(['shareScreenshot'], function () {
      if (callback) callback()
    })
  }

  // 分享 URL
  BitKeepInvoke.prototype.shareUrl = function (title, description, url, thumbnail, callback) {
    this.jHost(['shareUrl', title, description, url, thumbnail], function () {
      if (callback) callback()
    })
  }
  BitKeepInvoke.prototype.pay = function (chain, params, callback) {
    this.jHost(['pay', chain, JSON.stringify(params)], function (err, result) {
      if (callback) callback(err, result)
    })
  }
  BitKeepInvoke.prototype.saveImageFromBase64 = function (base64, callback) {
    this.jHost(['saveImageFromBase64', base64], function (err, result) {
      if (callback) callback(err, result)
    })
  }

  BitKeepInvoke.prototype.continueGoRisk = function (base64, callback) {
    this.jHost(['continueGoRisk', base64], function (err, result) {
      if (callback) callback(err, result)
    })
  }

  BitKeepInvoke.prototype.switchBrc20Address = function (chain, callback) {
    if (!chain) throw new Error('Missing chain identifier')
    this.jHost(['switchBrc20Address', (chain + '').toLowerCase()], function (err, result) {
      if (callback) callback(err, result)
    })
  }

  window.BitKeepInvoke = new BitKeepInvoke()
})()
