export interface Currency {
  symbol: string
  name: string
  type?: string
  value: string
  iconUrl?: string
}

export interface Language {
  locale: string
  languageKey: string
  languageType: number
  languageName: string
}

export interface UserInfo {
  userName: string
  aEmail: string
  aUser: number
  aaf: number
  antiPhishingCode: string
  appLanguageChange: number
  beforePwd: string
  channelLanguage: string
  /** 是否子账户 */
  childFlag: boolean
  createdDate: number
  dateOfBirthStr: string
  email: string
  frozen: number
  gEmail: string
  gaf: number
  identityType: number
  invitationCode: string
  logoffStatus: number
  mobile: string
  nickName: string
  notifyFlag: boolean
  parentId: string
  pss: number
  realName: string
  registerAreaId: number
  registerAreaName: string
  registerChannel: string
  registerDate: string
  registerVipNo: string
  showUserVip: number
  strategySupply: boolean
  strategyTrader: boolean
  subAccount: boolean
  swapCrossChainExchange: number
  swapProtocol: number
  /** 是否有子账户 */
  switchFlag: number
  switchFlagV2: number
  tg: number
  uid: string
  updatedDate: number
  userId: string
  userType: number
  vipLevel: number
  vipLevelDesc: string
  vipLevelUrl: string
  virtualAccount: boolean
}
