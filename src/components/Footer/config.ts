import type { Config } from './types'
import { isClient } from '@/utils'

export function getConfig(lang: string, formatLocalPath: Function, builderAds: Boolean): Config {
  const buyTokenList = [
    //Crypto Category
    {
      title: 'common_footer.crypto_categories',
      url: formatLocalPath('/price/category'),
      isTarget: true,
      isShow: true,
      type: 'Buy Token',
      content: 'Crypto Category'
    },
    //Calculator
    {
      title: 'common_footer.calculator',
      url: formatLocalPath('/price/calculator'),
      isTarget: true,
      isShow: true,
      type: 'Buy Token',
      content: 'Calculator'
    },
    {
      title: 'common_footer.buy_bitcoin',
      url: formatLocalPath('/how-to-buy/bitcoin'),
      isTarget: true,
      isShow: true,
      type: 'Buy Token',
      content: 'Buy Bitcoin'
    },
    {
      title: 'common_footer.buy_ethereum',
      url: formatLocalPath('/how-to-buy/ethereum'),
      isTarget: true,
      isShow: true,
      type: 'Buy Token',
      content: 'Buy Ethereum'
    },
    {
      title: 'common_footer.buy_dogecoin',
      url: formatLocalPath('/how-to-buy/dogecoin'),
      isTarget: true,
      isShow: true,
      type: 'Buy Token',
      content: 'Buy Dogecoin'
    },
    {
      title: 'common_footer.buy_ripple',
      url: formatLocalPath('/how-to-buy/ripple'),
      isTarget: true,
      isShow: true,
      type: 'Buy Token',
      content: 'Buy XRP'
    },
    {
      title: 'common_footer.buy_bgb',
      url: formatLocalPath('/how-to-buy/bitget-token'),
      isTarget: true,
      isShow: true,
      type: 'Buy Token',
      content: 'Buy BGB'
    },
    {
      title: 'common_footer.buy_shib',
      url: formatLocalPath('/how-to-buy/shiba-inu'),
      isTarget: true,
      isShow: true,
      type: 'Buy Token',
      content: 'Buy SHIB'
    }
  ]
  const showAcademy = ['en', 'ja', 'vi', 'ru', 'pt', 'tr', 'fr', 'de', 'zh-TW', 'es'].includes(lang)
  return {
    describe: `common_footer.bitget_desc`,
    copyright: 'common_footer.bitget_link',
    list: [
      {
        show: true,
        title: 'common_footer.company',
        //@ts-ignore
        row: process.client ? (document.body.clientWidth < 1200 ? 2 : 2) : 2,
        list: [
          // 关于我们
          {
            title: 'common_footer.about_us',
            url: formatLocalPath('/aboutus'),
            isTarget: true,
            isShow: true,
            type: 'Company',
            content: 'About Us'
          },
          {
            title: 'common_footer.community',
            url: formatLocalPath('/bitget-community'),
            isTarget: true,
            isShow: true,
            type: 'Company',
            content: 'Community'
          },
          // 工作机会
          {
            title: 'common_footer.hire_text',
            url: formatLocalPath('/hire'),
            isTarget: true,
            isShow: true,
            newRel: '',
            type: 'Company',
            content: 'Careers'
          },
          // 梅西
          {
            title: 'common_footer.messi_landing_page',
            url: formatLocalPath('/messi-partnership'),
            isTarget: true,
            isShow: true,
            type: 'Company',
            content: 'Messi Landing Page'
          },
          // Blockchain4Youth
          {
            title: 'common_footer.block_chain_4_youth',
            url: formatLocalPath('/promo/blockchain4youth'),
            isTarget: true,
            isShow: true,
            type: 'Company',
            content: 'Blockchain4Youth'
          },
          // Blockchain4Her
          {
            title: 'common_footer.block_chain_4_her',
            url: formatLocalPath('/promotion/blockchain4her'),
            isTarget: true,
            isShow: true,
            type: 'Company',
            content: 'Blockchain4Her'
          },
          // 媒体包
          {
            title: 'common_footer.media_kit',
            url: formatLocalPath('/media-kit'),
            isTarget: true,
            isShow: true,
            type: 'Company',
            content: 'Media Kit'
          },
          // Academy
          {
            title: 'common_footer.academy_title',
            url: formatLocalPath('/academy'),
            isTarget: true,
            isShow: showAcademy,
            type: 'Company',
            content: 'Academy'
          },
          // Blog
          {
            title: 'common_footer.blog_title',
            url: formatLocalPath('/blog'),
            isTarget: true,
            isShow: true,
            type: 'Company',
            content: 'Blog'
          },
          // 公告中心
          {
            title: 'common_footer.menu_announcements',
            url: formatLocalPath('/support/announcement-center'),
            isTarget: true,
            isShow: true,
            type: 'Company',
            content: 'Announcements'
          },
          // 存储证明
          {
            title: 'common_footer.proof_reserves',
            url: formatLocalPath('/proof-of-reserves'),
            isTarget: true,
            isShow: true,
            type: 'Company',
            content: 'Proof of Reserves'
          },
          // 保护基金
          {
            title: 'common_footer.guarantee',
            url: formatLocalPath('/protection-fund'),
            isTarget: true,
            isShow: true, // lang === 'zh-CN' ? false : true,
            type: 'Company',
            content: 'Protection Fund'
          },
          // bitget 代币
          {
            title: 'common_footer.bitget_token',
            url: formatLocalPath('/events/BGB/intro'),
            isTarget: true,
            isShow: true,
            type: 'Company',
            content: 'Bitget Token'
          },
          // 友情链接
          {
            title: 'common_footer.crypto_directory',
            url: formatLocalPath('/links'),
            isTarget: true,
            isShow: true,
            type: 'Company',
            content: "Partners' Links"
          }
        ]
      },
      {
        show: true,
        title: 'common_footer.products',
        //@ts-ignore
        row: process.client ? (document.body.clientWidth < 1200 ? 2 : 2) : 2,
        list: [
          //买币
          {
            title: 'common_footer.buy_crypto',
            url: lang === 'zh-CN' ? '/zh-CN/p2p-trade/quick' : formatLocalPath('/buy-sell-crypto'),
            isTarget: false,
            isShow: !builderAds && lang !== 'zh-CN',
            type: 'Products',
            content: 'Buy Crypto'
          },
          //现货
          {
            title: 'common_footer.spot',
            url: formatLocalPath('/spot/BTCUSDT'),
            isTarget: false,
            isShow: true,
            type: 'Products',
            content: 'Spot'
          },
          //合约
          {
            title: 'common_footer.word2',
            url: formatLocalPath('/futures/usdt/BTCUSDT'),
            isTarget: true,
            isShow: true,
            type: 'Products',
            content: 'Futures'
          },
          //杠杆
          {
            title: 'common_footer.margin',
            url: formatLocalPath('/spot/BTCUSDT?type=cross'),
            isTarget: false,
            isShow: true,
            type: 'Products',
            content: 'Margin'
          },
          //策略
          {
            title: 'common_footer.bots',
            url: formatLocalPath('/trading-bot/spot/BTCUSDT'),
            isTarget: false,
            isShow: true,
            type: 'Products',
            content: 'Bots'
          },
          // api交易
          {
            title: 'common_footer.api_tutorial',
            url: formatLocalPath('/bitget-api'),
            isTarget: true,
            isShow: true,
            type: 'Products',
            content: 'API'
          },
          // Launchpad
          {
            title: 'common_header.launchpad',
            url: formatLocalPath('/events/launchpad'),
            isTarget: true,
            isShow: true,
            type: 'Products',
            content: 'Launchpad'
          },
          // Wallet
          {
            title: 'common_header.wallet',
            url: `https://web3.bitget.com/${lang}`,
            isTarget: true,
            isShow: true,
            type: 'Products',
            content: 'Wallet'
          },
          // 网站地图
          {
            title: 'common_footer.site_map',
            url: formatLocalPath('/sitemap/price'),
            isTarget: true,
            isShow: true,
            type: 'Products',
            content: 'Sitemap'
          },
          // 币圈导航
          {
            title: 'common_footer.links',
            url: formatLocalPath('/crypto-directory'),
            isTarget: true,
            isShow: true,
            type: 'Products',
            content: 'Crypto Directory'
          },
          //Crypto Price
          {
            title: 'common_footer.crypto_price',
            url: formatLocalPath('/price'),
            isTarget: true,
            isShow: true,
            type: 'Buy Token',
            content: 'Crypto Price'
          },
          //Bitcoin Price
          {
            title: 'common_footer.btc_price',
            url: formatLocalPath('/price/bitcoin'),
            isTarget: true,
            isShow: true,
            type: 'Buy Token',
            content: 'Bitcoin Price'
          },
          //Ethereum Price
          {
            title: 'common_footer.eth_price',
            url: formatLocalPath('/price/ethereum'),
            isTarget: true,
            isShow: true,
            type: 'Buy Token',
            content: 'Ethereum Price'
          },
          // brc-20
          {
            title: 'common_footer.brc20_price',
            url: formatLocalPath('/inscription/brc-20'),
            isTarget: true,
            isShow: true,
            type: 'Buy Token',
            content: 'BRC-20 Price'
          }
        ]
      },
      {
        show: true,
        title: 'common_footer.social_trading',
        row: 1,
        list: [
          {
            title: 'common_footer.copy_trading_spot_title',
            url: formatLocalPath('/copy-trading/spot'),
            isTarget: true,
            isShow: true,
            type: 'Copy Trading',
            content: 'Spot Copy Trading'
          },
          {
            title: 'common_footer.copy_trading',
            url: formatLocalPath('/copy-trading/futures'),
            isTarget: true,
            isShow: true,
            type: 'Copy Trading',
            content: 'Futures Copy Trading'
          },
          {
            title: 'common_footer.strategy_trading',
            url: formatLocalPath('/copy-trading/strategy'),
            isTarget: true,
            isShow: true,
            type: 'Copy Trading',
            content: 'Strategy Trading'
          }
        ]
      },
      {
        // @ts-ignore
        show: process.client
          ? document.body.clientWidth < 1200 && !builderAds
            ? true
            : false
          : false,
        title: 'common_footer.buy_crypto',
        bottomOffset: process.client
          ? document.body.clientWidth < 1200
            ? 'bottom-offset'
            : ''
          : '',
        // @ts-ignore
        row: 1,
        list: buyTokenList
      },
      {
        show: true,
        title: 'common_footer.service',
        topOffset: process.client ? (document.body.clientWidth < 1200 ? 'top-offset' : '') : '',
        // @ts-ignore
        row: process.client ? (document.body.clientWidth < 1200 ? 2 : 2) : 2,
        list: [
          // feedback
          {
            title: 'common_footer.nav_feedback',
            url: formatLocalPath('/feedback'),
            isTarget: true,
            isShow: true,
            type: 'Service',
            content: 'Feedback'
          },
          // 帮助中心
          {
            title: 'common_footer.menu_help',
            url: formatLocalPath('/support'),
            isTarget: true,
            isShow: true,
            type: 'Service',
            content: 'Support'
          },
          // crypto-widgets
          {
            title: 'common_footer.crypto_widgets',
            url: formatLocalPath('/crypto-widgets'),
            isTarget: true,
            isShow: true,
            type: 'Service',
            content: 'Crypto Widgets'
          },
          //Calendar
          {
            title: 'common_footer.events_calendar',
            url: formatLocalPath('/calendar'),
            isTarget: true,
            isShow: true,
            type: 'Service',
            content: 'Calendar'
          },
          {
            title: 'common_footer.ico_calendar',
            url: formatLocalPath('/ico'),
            isTarget: true,
            isShow: lang !== 'zh-CN',
            type: 'Service',
            content: 'ICO'
          },
          // 收费标准
          {
            title: 'common_footer.fee_schedule',
            url: formatLocalPath('/fee'),
            isTarget: true,
            isShow: true,
            type: 'Support',
            content: 'Fee Schedule'
          },
          // 福利中心
          {
            title: 'common_footer.promotions_text',
            url: formatLocalPath('/events/rewards'),
            isTarget: true,
            isShow: true,
            type: 'Service',
            content: 'Promotions'
          },
          // 官方验证渠道
          {
            title: 'common_footer.official_verification_channel',
            url: formatLocalPath('/official-verification'),
            isTarget: true,
            isShow: true,
            type: 'Service',
            content: 'Official Verification Channel'
          },
          // 好友邀请
          {
            title: 'common_footer.referral',
            url: formatLocalPath('/events/referral'),
            isTarget: true,
            isShow: lang !== 'en-GB',
            type: 'Service',
            content: 'Referral Program'
          },
          // vip 计划
          {
            title: 'common_footer.vip_services',
            url: formatLocalPath('/vip/vipIntroduce'),
            isTarget: true,
            isShow: true,
            type: 'Service',
            content: 'VIP Services'
          },
          // 渠道招募
          {
            title: 'common_footer.affiliate_program',
            url: formatLocalPath('/affiliates'),
            isTarget: true,
            isShow: lang !== 'zh-CN',
            type: 'Service',
            content: 'Affiliate program'
          },
          // 机构服务
          {
            title: 'common_footer.service_h1',
            url: formatLocalPath('/vip-institutional-services'),
            isTarget: true,
            isShow: true,
            type: 'Service',
            content: 'Institutional Services'
          },
          // 机构服务
          {
            title: 'common_footer.asset_custody',
            url: formatLocalPath('/custody'),
            isTarget: true,
            isShow: true,
            type: 'Service',
            content: 'Asset Custody'
          },
          // 数据下载
          {
            title: 'common_footer.data_download',
            url: formatLocalPath('/data-download'),
            isTarget: true,
            isShow: true,
            type: 'Service',
            content: 'Data Download'
          }
        ]
      },
      {
        show: true,
        title: 'common_footer.legal_disclosures',
        topOffset: process.client ? (document.body.clientWidth < 1200 ? 'top-offset' : '') : '',
        // @ts-ignore
        row: process.client ? (document.body.clientWidth < 1200 ? 2 : 2) : 2,
        list: [
          // 合规牌照
          {
            title: 'common_footer.regulatory_license',
            url: formatLocalPath('/compliance'),
            isTarget: true,
            isShow: true,
            type: 'Legal & Disclosures',
            content: 'Regulatory License'
          },
          // 反洗黑钱
          {
            title: 'common_footer.aml_kyc_policies',
            url: formatLocalPath(
              '/support/articles/360041116691'
            ),
            isTarget: true,
            rel: ' nofollow',
            isShow: true,
            type: 'Legal & Disclosures',
            content: 'AML/KYC Policies'
          },
          {
            title: 'common_footer.law_enforcement_request',
            url: formatLocalPath('/support/articles/12560603800342'),
            isTarget: true,
            rel: ' nofollow',
            isShow: true,
            type: 'Legal & Disclosures',
            content: 'Law Enforcement Request'
          },
          // 隐私政策
          {
            title: 'common_footer.privacy_policy',
            url: formatLocalPath('/support/articles/360015150651'),
            isTarget: true,
            rel: 'nofollow',
            isShow: true,
            type: 'Legal & Disclosures',
            content: 'Privacy Policy'
          },
          // 用户协议
          {
            title: 'common_footer.terms_of_use',
            url: formatLocalPath('/support/articles/360014944032'),
            isTarget: true,
            rel: ' nofollow',
            isShow: true,
            type: 'Legal & Disclosures',
            content: 'Terms of Use'
          },
          // 法律声明
          {
            title: 'common_footer.legal_statement',
            url: formatLocalPath('/support/articles/360014943592'),
            isTarget: true,
            rel: ' nofollow',
            isShow: true,
            type: 'Legal & Disclosures',
            content: 'Legal Statement'
          },
          // 风险提示
          {
            title: 'common_footer.risk_disclosure',
            url: formatLocalPath('/support/articles/7700532076057'),
            isTarget: true,
            rel: ' nofollow',
            isShow: true,
            type: 'Legal & Disclosures',
            content: 'Risk Disclosure'
          },
          // ST规则
          {
            title: 'common_footer.st_rules',
            url: formatLocalPath('/support/articles/12560603781975'),
            isTarget: true,
            rel: ' nofollow',
            isShow: true,
            type: 'Legal & Disclosures',
            content: 'Risk Disclosure'
          }
        ]
      },
      {
        // @ts-ignore
        show: process.client
          ? document.body.clientWidth < 1200
            ? false
            : !builderAds
          : !builderAds,
        title: 'common_footer.buy_crypto',
        // @ts-ignore
        row: 1,
        list: buyTokenList
      }
    ],
    community: {
      // title: "",
      // download: {
      //   title: "",
      //   rqCodeImg: "",
      //   describe: "",
      // },
      list: [],
      iconLinkList: []
      // list: this.emailList,
      // iconLinkList: this.iconLinkList,
    }
  }
}
