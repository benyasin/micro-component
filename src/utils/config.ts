import { readonly } from 'vue'

/** 默认法币列表 */
export const defaultCurrencyList = readonly([
  {
    symbol: '$',
    name: 'USD',
    value: 'USDT_USD',
    type: 'USD'
  },
  {
    symbol: '₩',
    name: 'krw',
    value: 'usdt_krw',
    type: 'KRW'
  },
  {
    symbol: 'Ұ',
    name: 'jpy',
    value: 'usdt_jpy',
    type: 'JPY'
  },

  {
    symbol: '₫',
    name: 'vnd',
    value: 'usdt_vnd',
    type: 'VND'
  },
  {
    symbol: '₽',
    name: 'rub',
    value: 'usdt_rub',
    type: 'RUB'
  },
  {
    symbol: '€',
    name: 'EUR',
    value: 'usdt_eur',
    type: 'EUR'
  },
  {
    symbol: '₺',
    name: 'try',
    value: 'usdt_try',
    type: 'TRY'
  },
  {
    symbol: '￥',
    name: 'cny',
    value: 'usdt_cny',
    type: 'CNY'
  },
  {
    symbol: 'NT$',
    name: 'twd',
    value: 'usdt_twd',
    type: 'TWD'
  },

  {
    symbol: 'Rp',
    name: 'IDR',
    value: 'usdt_IDR',
    type: 'IDR'
  },
  {
    symbol: '₱',
    name: 'php',
    value: 'usdt_php',
    type: 'PHP'
  },
  {
    symbol: 'HKD',
    name: 'HKD',
    value: 'usdt_hkd',
    type: 'HKD'
  },
  {
    symbol: '฿',
    name: 'THB',
    value: 'usdt_thb',
    type: 'THB'
  }
])

/** 默认语言列表 */
export const defaultLanguageList = readonly([
  {
    locale: 'en',
    languageKey: 'en_US',
    languageName: 'English',
    languageType: 0,
    requestMessage: {
      tip: 'Tip',
      timeout: 'Request timed out!',
      expired: 'Login expired, please log in again',
      loginvalid: 'Please login to visit',
      unknow: 'The system is busy',
      notfound: 'Request error',
      forbidden: 'Request is forbidden'
    }
  },
  {
    locale: 'en-GB',
    languageKey: 'ko_KR',
    languageName: 'English(UK)',
    languageType: 3,
    requestMessage: {
      tip: 'Tip',
      timeout: 'Request timed out!',
      expired: 'Login expired, please log in again',
      loginvalid: 'Please login to visit',
      unknow: 'The system is busy',
      notfound: 'Request error',
      forbidden: 'Request is forbidden'
    }
  },
  {
    locale: 'ja',
    languageKey: 'ja_JP',
    languageName: '日本語',
    languageType: 2,
    requestMessage: {
      tip: '提示',
      timeout: '請求時間が切れました!',
      expired: 'ログイン時間が切れました。もう一度ログインください',
      loginvalid: 'ログインしてからご覧になれます',
      unknow: 'システム渋滞です',
      notfound: '請求エラー',
      forbidden: '請求禁止'
    }
  },
  // 越南
  {
    locale: 'vi',
    languageKey: 'vi_VN',
    languageName: 'Tiếng Việt',
    languageType: 4,
    requestMessage: {
      timeout: 'Yêu cầu đã hết thời gian chờ!',
      expired: 'Đăng nhập hết hạn, vui lòng đăng nhập lại',
      loginvalid: 'Vui lòng đăng nhập để truy cập',
      unknow: 'Hệ thống đang bận',
      notfound: 'Yêu cầu lỗi',
      forbidden: 'Yêu cầu bị cấm'
    }
  },
  // 俄语
  {
    locale: 'ru',
    languageKey: 'ru_RU',
    languageName: 'Русский',
    languageType: 6,
    requestMessage: {
      tip: 'Подсказки',
      timeout: 'Истекло время запроса!',
      expired: 'Срок входа истек, войдите снова',
      loginvalid: 'Пожалуйста, войдите, чтобы посетить',
      unknow: 'Система занята',
      notfound: 'Ошибка запроса',
      forbidden: 'Запрос запрещен'
    }
  },
  // 西班牙
  {
    locale: 'es',
    languageKey: 'es_ES',
    languageName: 'Español',
    languageType: 7,
    requestMessage: {
      tip: 'Sugerencia',
      timeout: '¡Solicitud agotada!',
      expired: 'Inicio de sesión caducado, inicie sesión de nuevo',
      loginvalid: 'Inicie sesión para visitar',
      unknow: 'El sistema está ocupado',
      notfound: 'Error de solicitud',
      forbidden: 'La solicitud está prohibida'
    }
  },
  // 土耳其
  {
    locale: 'tr',
    languageKey: 'tr_TR',
    languageName: 'Türkçe',
    languageType: 8,
    requestMessage: {
      tip: 'İpuçlar',
      timeout: 'İstek zaman aşımına uğradı!',
      expired: 'Giriş süresi doldu, lütfen tekrar giriş yapın',
      loginvalid: 'Ziyaret etmek için lütfen giriş yapın',
      unknow: 'Sistem meşgul',
      notfound: 'Talep hatası',
      forbidden: 'Talep yasaktır'
    }
  },
  // 意大利语
  {
    locale: 'it',
    languageKey: 'it_IT',
    languageName: 'Italiano',
    languageType: 9,
    requestMessage: {
      tip: 'suggerimento',
      timeout: 'Tempo scaduto per la richiesta!',
      expired: 'Accesso scaduto, effettua nuovamente il login',
      loginvalid: 'Effettua il login per accedere',
      unknow: 'Il sistema è occupato',
      notfound: 'errore di richiesta',
      forbidden: 'richiesta vietata'
    }
  },
  // 法语
  {
    locale: 'fr',
    languageKey: 'fr_FR',
    languageName: 'Français',
    languageType: 10,
    requestMessage: {
      tip: 'Astuce',
      timeout: 'La requête a expiré !',
      expired: 'La connexion a expiré, veuillez vous reconnecter',
      loginvalid: 'Veuillez vous connecter pour visiter',
      unknow: 'Le système est occupé',
      notfound: 'Erreur de la requête',
      forbidden: 'La requête est interdite'
    }
  },
  // 德语
  {
    locale: 'de',
    languageKey: 'de_DE',
    languageName: 'Deutsch',
    languageType: 11,
    requestMessage: {
      tip: 'Antippen',
      timeout: 'Anfrage wurde abgebrochen!',
      expired: 'Anmeldung abgelaufen, bitte erneut anmelden',
      loginvalid: 'Für den Besuch bitte anmelden',
      unknow: 'Das System ist ausgelastet',
      notfound: 'Anfragefehler',
      forbidden: 'Anfrage ist verboten'
    }
  },
  {
    locale: 'zh-CN',
    languageKey: 'zh_CN',
    languageName: '简体中文',
    languageType: 1,
    requestMessage: {
      tip: '提示',
      timeout: '请求超时!',
      expired: '登录过期,请重新登录',
      loginvalid: '请登录访问',
      unknow: '系统繁忙',
      notfound: '请求错误',
      forbidden: '请求被禁止'
    }
  },
  {
    locale: 'zh-TW',
    languageKey: 'zh_TW',
    languageName: '繁體中文',
    languageType: 5,
    requestMessage: {
      tip: '提示',
      timeout: '請求超時!',
      expired: '登錄過期,請重新登錄',
      loginvalid: '請登錄訪問',
      unknow: '系統繁忙',
      notfound: '請求錯誤',
      forbidden: '請求被禁止'
    }
  },
  // 葡萄牙
  {
    locale: 'pt',
    languageKey: 'pt_PT',
    languageName: 'Português',
    languageType: 12,
    requestMessage: {
      tip: 'Sugestão',
      timeout: 'Pedido expirou!',
      expired: 'Início de sessão expirou, inicie novamente',
      loginvalid: 'Inicie sessão para visitar',
      unknow: 'O sistema está ocupado',
      notfound: 'Erro de pedido',
      forbidden: 'Pedido proibido'
    }
  },
  // 印尼
  {
    locale: 'id',
    languageKey: 'in_ID',
    languageName: 'Bahasa Indonesia',
    languageType: 13,
    requestMessage: {
      tip: 'Tip',
      timeout: 'Waktu permintaan habis!',
      expired: 'Login kadaluarsa, silakan login lagi',
      loginvalid: 'Silakan login untuk mengunjungi',
      unknow: 'Sistem sedang sibuk',
      notfound: 'Permintaan kesalahan',
      forbidden: 'Permintaan dilarang'
    }
  },
  {
    locale: 'th',
    languageKey: 'th_TH',
    languageName: 'ไทย',
    languageType: 14,
    requestMessage: {
      tip: 'tg Tip',
      timeout: 'tg-Request timed out!',
      expired: 'tg-Login expired, please log in again',
      loginvalid: 'tg-Please login to visit',
      unknow: 'tg-The system is busy',
      notfound: 'tg-Request error',
      forbidden: 'tg-Request is forbidden'
    }
  },
  {
    locale: 'pl',
    languageKey: 'pl_PL',
    languageName: 'Polski',
    languageType: 20,
    requestMessage: {
      tip: 'Porada',
      timeout: 'Żądanie wygasło!',
      expired: 'Login wygasł, proszę zalogować się ponownie',
      loginvalid: 'Proszę się zalogować, aby wejść na stronę',
      unknow: 'System jest obciążony',
      notfound: 'Błąd zapytania',
      forbidden: 'Żądanie jest zabronione'
    }
  },
  {
    locale: 'uk',
    languageKey: 'uk_UA',
    languageName: 'українська',
    languageType: 21,
    requestMessage: {
      tip: 'Порада',
      timeout: 'Час очікування запиту вичерпано!',
      expired: 'Час для входу закінчився, будь ласка, увійдіть ще раз',
      loginvalid: 'Будь ласка, увійдіть, щоб переглянути',
      unknow: 'Система перевантажена',
      notfound: 'Помилка запиту',
      forbidden: 'Заборонений запит'
    }
  },
  {
    locale: 'sv',
    languageKey: 'sv_SE',
    languageName: 'English(US)',
    languageType: 22,
    hidden: true,
    requestMessage: {
      tip: 'Tips',
      timeout: 'Begäran tog för lång tid!',
      expired: 'Inloggningen har gått ut, logga in igen',
      loginvalid: 'Logga in för att besöka',
      unknow: 'Systemet är upptaget',
      notfound: 'Felbegäran',
      forbidden: 'Begäran är ej tillåten'
    }
  },
  // 葡萄牙 (欧语)
  {
    locale: 'pt-PT',
    languageKey: 'pt_EU',
    languageName: 'Português (Portugal)',
    languageType: 24,
    requestMessage: {
      tip: 'Sugestão',
      timeout: 'Pedido expirou!',
      expired: 'Início de sessão expirou, inicie novamente',
      loginvalid: 'Inicie sessão para visitar',
      unknow: 'O sistema está ocupado',
      notfound: 'Erro de pedido',
      forbidden: 'Pedido proibido'
    }
  },
  // 西班牙(欧语)
  {
    locale: 'es-ES',
    languageKey: 'es_IN',
    languageName: 'Español (Internacional)',
    languageType: 23,
    requestMessage: {
      tip: 'Sugerencia',
      timeout: '¡Solicitud agotada!',
      expired: 'Inicio de sesión caducado, inicie sesión de nuevo',
      loginvalid: 'Inicie sesión para visitar',
      unknow: 'El sistema está ocupado',
      notfound: 'Error de solicitud',
      forbidden: 'La solicitud está prohibida'
    }
  },
  {
    locale: 'uz',
    languageKey: 'uz_UZ',
    languageName: "o'zbek",
    languageType: 25,
    requestMessage: {
      tip: 'Maslahat',
      timeout: 'So‘rov muddati tugadi!',
      expired: 'Kirish muddati tugadi, qayta kiring',
      loginvalid: 'Iltimos, tashrif buyurish uchun tizimga kiring',
      unknow: 'Tizim band',
      notfound: "So'rov xatosi",
      forbidden: "So'rov taqiqlangan"
    }
  },
  // 阿拉伯
  {
    locale: 'ar',
    languageKey: 'ar_SA',
    languageName: 'العربية',
    languageType: 39,
    requestMessage: {
      tip: 'جديلة',
      timeout: 'طلب مهلة !',
      expired: 'تسجيل الدخول منتهية الصلاحية ، يرجى تسجيل الدخول مرة أخرى',
      loginvalid: 'يرجى تسجيل الدخول إلى',
      unknow: 'نظام مشغول',
      notfound: 'طلب خطأ',
      forbidden: 'طلب ممنوع'
    }
  },
  // 这个语言将显示KEY，方便调试
  {
    locale: 'bg',
    languageKey: 'bg',
    languageName: 'bg',
    languageType: 0,
    hidden: true,
    requestMessage: {
      tip: 'Tip',
      timeout: 'Request timed out!',
      expired: 'Login expired, please log in again',
      loginvalid: 'Please login to visit',
      unknow: 'The system is busy',
      notfound: 'Request error',
      forbidden: 'Request is forbidden'
    }
  }
])

/**
 * 涨跌幅时区key
 */
export const ChangeTimezoneLocalstorageKey = 'bitget:change:timezone'

/**
 * 目前仅支持-12-0-+12共25个时区，小数点等特殊时区暂不考虑
 * 数据与getTimezoneOffset对应
 */
export const SupportedChangeTimezone = [
  -720, -660, -600, -540, -480, -420, -360, -300, -240, -180, -120, -60, 0, 60, 120, 180, 240, 300,
  360, 420, 480, 540, 600, 660, 720
]

export const Last24HOption = 'last24h'

/**
 * 获取时区显示
 * getTimezoneOffset -480 => 8
 * @param offset
 */
export function getTimezoneDisplayByOffset(offset) {
  let n = -offset / 60
  return `UTC ${(n > 0 ? '+' : '') + n}, 00:00`
}

/**
 * 转换为后端使用参数
 * getTimezoneOffset -480 => 28800
 * @param offset
 */
export function getTimezonePostParamValue(offset) {
  return -offset * 60
}

export function getLocalChangeTimezone() {
  let temp = localStorage.getItem(ChangeTimezoneLocalstorageKey)
  // 检查一下有没有被修改
  if (SupportedChangeTimezone.some((i) => String(i) === temp) || (temp = Last24HOption)) {
    return temp
  } else {
    return Last24HOption
  }
}
