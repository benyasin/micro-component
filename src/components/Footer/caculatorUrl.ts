// 加密货币计算器
export const getCaculatorUrl = (): { url: string, prefixTitle: string } => {
  const randomCoinIndex = Math.floor(Math.random() * coinTokenList.length)
  const randomFiatIndex = Math.floor(Math.random() * fiatCodeList.length)

  const { coinName, coinSymbol } = coinTokenList[randomCoinIndex] || {}
  const { symbol } = fiatCodeList[randomFiatIndex] || {}

  const url = `/price/${coinName.toLocaleLowerCase()?.split(' ').join('-')}/${symbol.toLocaleLowerCase()}`
  const prefixTitle = `${coinSymbol}/${symbol}`

  return {
    url,
    prefixTitle
  }
}

const coinTokenList = [
    {
      "coinName": "Maker",
      "coinSymbol": "MKR",
    },
    {
      "coinName": "Render Token",
      "coinSymbol": "RNDR",
    },
    {
      "coinName": "Klaytn",
      "coinSymbol": "KLAY",
    },
    {
      "coinName": "TNC Coin",
      "coinSymbol": "TNC",
    },
    {
      "coinName": "Sui",
      "coinSymbol": "SUI",
    },
    {
      "coinName": "BitTorrent",
      "coinSymbol": "BTTOLD",
    },
    {
      "coinName": "PAX Gold",
      "coinSymbol": "PAXG",
    },
    {
      "coinName": "Gemini Dollar",
      "coinSymbol": "GUSD",
    },
    {
      "coinName": "Casper",
      "coinSymbol": "CSPR",
    },
    {
      "coinName": "Synthetix",
      "coinSymbol": "SNX",
    },
    {
      "coinName": "Zcash",
      "coinSymbol": "ZEC",
    },
    {
      "coinName": "GMX",
      "coinSymbol": "GMX",
    },
    {
      "coinName": "Terra Classic",
      "coinSymbol": "LUNC",
    },
    {
      "coinName": "Optimism",
      "coinSymbol": "OP",
    },
    {
      "coinName": "eCash",
      "coinSymbol": "XEC",
    },
    {
      "coinName": "Injective",
      "coinSymbol": "INJ",
    },
    {
      "coinName": "GateToken",
      "coinSymbol": "GT",
    },
    {
      "coinName": "Tether Gold",
      "coinSymbol": "XAUT",
    },
    {
      "coinName": "Mina",
      "coinSymbol": "MINA",
    },
    {
      "coinName": "IOTA",
      "coinSymbol": "MIOTA",
    },
    {
      "coinName": "Huobi Token",
      "coinSymbol": "HT",
    },
    {
      "coinName": "Dash",
      "coinSymbol": "DASH",
    },
    {
      "coinName": "XDC Network",
      "coinSymbol": "XDC",
    },
    {
      "coinName": "Frax Share",
      "coinSymbol": "FXS",
    },
    {
      "coinName": "Frax",
      "coinSymbol": "FRAX",
    },
    {
      "coinName": "EOS",
      "coinSymbol": "EOS",
    },
    {
      "coinName": "Wrapped BNB",
      "coinSymbol": "WBNB",
    },
    {
      "coinName": "MultiversX",
      "coinSymbol": "EGLD",
    },
    {
      "coinName": "The Sandbox",
      "coinSymbol": "SAND",
    },
    {
      "coinName": "Aave",
      "coinSymbol": "AAVE",
    },
    {
      "coinName": "Theta Network",
      "coinSymbol": "THETA",
    },
    {
      "coinName": "Rocket Pool",
      "coinSymbol": "RPL",
    },
    {
      "coinName": "BitDAO",
      "coinSymbol": "BIT",
    },
    {
      "coinName": "Stacks",
      "coinSymbol": "STX",
    },
    {
      "coinName": "Decentraland",
      "coinSymbol": "MANA",
    },
    {
      "coinName": "Tezos",
      "coinSymbol": "XTZ",
    },
    {
      "coinName": "Flow",
      "coinSymbol": "FLOW",
    },
    {
      "coinName": "Axie Infinity",
      "coinSymbol": "AXS",
    },
    {
      "coinName": "Chiliz",
      "coinSymbol": "CHZ",
    },
    {
      "coinName": "Radix",
      "coinSymbol": "XRD",
    },
    {
      "coinName": "USDD",
      "coinSymbol": "USDD",
    },
    {
      "coinName": "KuCoin Token",
      "coinSymbol": "KCS",
    },
    {
      "coinName": "Conflux",
      "coinSymbol": "CFX",
    },
    {
      "coinName": "Bitcoin SV",
      "coinSymbol": "BSV",
    },
    {
      "coinName": "Pepe",
      "coinSymbol": "PEPE",
      "": ""
    },
    {
      "coinName": "Immutable",
      "coinSymbol": "IMX",
    },
    {
      "coinName": "Bitget Token",
      "coinSymbol": "BGB",
    },
    {
      "coinName": "Curve DAO Token",
      "coinSymbol": "CRV",
    },
    {
      "coinName": "Neo",
      "coinSymbol": "NEO",
    }
  ]

const fiatCodeList = [
  {
      "id": 2781,
      "name": "United States Dollar",
      "sign": "$",
      "symbol": "USD"
  },
  {
      "id": 2782,
      "name": "Australian Dollar",
      "sign": "$",
      "symbol": "AUD"
  },
  {
      "id": 2783,
      "name": "Brazilian Real",
      "sign": "R$",
      "symbol": "BRL"
  },
  {
      "id": 2784,
      "name": "Canadian Dollar",
      "sign": "$",
      "symbol": "CAD"
  },
  {
      "id": 2785,
      "name": "Swiss Franc",
      "sign": "Fr",
      "symbol": "CHF"
  },
  {
      "id": 2786,
      "name": "Chilean Peso",
      "sign": "$",
      "symbol": "CLP"
  },
  {
      "id": 2787,
      "name": "Chinese Yuan",
      "sign": "¥",
      "symbol": "CNY"
  },
  {
      "id": 2788,
      "name": "Czech Koruna",
      "sign": "Kč",
      "symbol": "CZK"
  },
  {
      "id": 2789,
      "name": "Danish Krone",
      "sign": "kr",
      "symbol": "DKK"
  },
  {
      "id": 2790,
      "name": "Euro",
      "sign": "€",
      "symbol": "EUR"
  },
  {
      "id": 2791,
      "name": "Pound Sterling",
      "sign": "£",
      "symbol": "GBP"
  },
  {
      "id": 2792,
      "name": "Hong Kong Dollar",
      "sign": "$",
      "symbol": "HKD"
  },
  {
      "id": 2793,
      "name": "Hungarian Forint",
      "sign": "Ft",
      "symbol": "HUF"
  },
  {
      "id": 2794,
      "name": "Indonesian Rupiah",
      "sign": "Rp",
      "symbol": "IDR"
  },
  {
      "id": 2795,
      "name": "Israeli New Shekel",
      "sign": "₪",
      "symbol": "ILS"
  },
  {
      "id": 2796,
      "name": "Indian Rupee",
      "sign": "₹",
      "symbol": "INR"
  },
  {
      "id": 2797,
      "name": "Japanese Yen",
      "sign": "¥",
      "symbol": "JPY"
  },
  {
      "id": 2798,
      "name": "South Korean Won",
      "sign": "₩",
      "symbol": "KRW"
  },
  {
      "id": 2799,
      "name": "Mexican Peso",
      "sign": "$",
      "symbol": "MXN"
  },
  {
      "id": 2800,
      "name": "Malaysian Ringgit",
      "sign": "RM",
      "symbol": "MYR"
  },
  {
      "id": 2801,
      "name": "Norwegian Krone",
      "sign": "kr",
      "symbol": "NOK"
  },
  {
      "id": 2802,
      "name": "New Zealand Dollar",
      "sign": "$",
      "symbol": "NZD"
  },
  {
      "id": 2803,
      "name": "Philippine Peso",
      "sign": "₱",
      "symbol": "PHP"
  },
  {
      "id": 2804,
      "name": "Pakistani Rupee",
      "sign": "₨",
      "symbol": "PKR"
  },
  {
      "id": 2805,
      "name": "Polish Złoty",
      "sign": "zł",
      "symbol": "PLN"
  },
  {
      "id": 2806,
      "name": "Russian Ruble",
      "sign": "₽",
      "symbol": "RUB"
  },
  {
      "id": 2807,
      "name": "Swedish Krona",
      "sign": "kr",
      "symbol": "SEK"
  },
  {
      "id": 2808,
      "name": "Singapore Dollar",
      "sign": "S$",
      "symbol": "SGD"
  },
  {
      "id": 2809,
      "name": "Thai Baht",
      "sign": "฿",
      "symbol": "THB"
  },
  {
      "id": 2810,
      "name": "Turkish Lira",
      "sign": "₺",
      "symbol": "TRY"
  },
  {
      "id": 2811,
      "name": "New Taiwan Dollar",
      "sign": "NT$",
      "symbol": "TWD"
  },
  {
      "id": 2812,
      "name": "South African Rand",
      "sign": "R",
      "symbol": "ZAR"
  },
  {
      "id": 2813,
      "name": "United Arab Emirates Dirham",
      "sign": "د.إ",
      "symbol": "AED"
  },
  {
      "id": 2814,
      "name": "Bulgarian Lev",
      "sign": "лв",
      "symbol": "BGN"
  },
  {
      "id": 2815,
      "name": "Croatian Kuna",
      "sign": "kn",
      "symbol": "HRK"
  },
  {
      "id": 2816,
      "name": "Mauritian Rupee",
      "sign": "₨",
      "symbol": "MUR"
  },
  {
      "id": 2817,
      "name": "Romanian Leu",
      "sign": "lei",
      "symbol": "RON"
  },
  {
      "id": 2818,
      "name": "Icelandic Króna",
      "sign": "kr",
      "symbol": "ISK"
  },
  {
      "id": 2819,
      "name": "Nigerian Naira",
      "sign": "₦",
      "symbol": "NGN"
  },
  {
      "id": 2820,
      "name": "Colombian Peso",
      "sign": "$",
      "symbol": "COP"
  }
]

