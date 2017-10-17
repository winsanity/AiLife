/**
 * ailife   全局
 *
 */

import { Dimensions,Platform } from  'react-native';

export const DEBUG = __DEV__ ;  //开发环境
export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent;

export const  VERSION = '1.1.0';

let { width,height } = Dimensions.get('window');
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const STATUS_BAR_HEIGHT = 20;
export const NAV_BAR_HEIGHT = 64;
export const TAB_BAR_HEIGHT = 50;

export let HTTP_SCHEME = 'http';
export let HTTPS_SCHEME = 'https';

export const SYSTEM = {
  iOS : Platform.OS === 'ios',
  Android : Platform.OS === 'android',
}

export const COLOR = {
  theme: '#B088FF',
  favored: '#C71A22',
  textPrompt: '#929292',
  textNormal: '#5E5E5E',
  textEmpha: '#212121',
  textLightPrompt: '#EBEBEB',
  textLightNormal: '#FFFFFF',
  backgroundDarker: '#D6D6D6',
  backgroundNormal: '#EBEBEB',
  backgroundLighter: '#FFFFFF',
  backgroundDarkLighter: '#424242',
  backgroundDarkNormal: '#000000',
  backgroundNotice: '#FFFB00',
  linePrompt: '#EBEBEB',
  lineNormal: '#A9A9A9',
  lineEmpha: '#929292'
}

export const JUHE = {
  appKey:'8aa7217ff06718c483cb3d94db33a248',
  serverNet:'http://v.juhe.cn/toutiao/index'
}

export const KUAIDIBIRD = {
  /**
   * 电商ID
   * @type {String}
   */
  EBusinessID: "1290116",
  /**
   * 加密私钥
   * @type {String}
   */
  AppKey: "e12ce6b8-526b-45da-b091-f728eb72b908",
  /**
   * 快递鸟单号识别
   * @type {String}
   */
  ExpressReqURL: "http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx",
  /**
   * 快递公司电话号码
   * @type {String}
   */
  ExpressPhoneURL:"http://wap.guoguo-app.com/cpCompany.htm?type=10",
  /**
   * 本地保存,快递搜索记录key
   * @type {String}
   */
  SeachHistroyKey:"SeachHistroyKey",
  /**
   * 本地保存,快递备注key
   * @type {String}
   */
  SeachRemarkKey:"SeachRemarkKey",
  /**
   * 本地保存,快递收藏记录key
   * @type {String}
   */
  ExpressCollectKey:"ExpressCollectKey",
  /**
   * 快递logo字符串
   * @type {String}
   */
  LogoBaseUrl:"https://www.kuaidi100.com/images/all/",
  /**
   * 备注修改完后，通知物流页面去刷新
   * @type {String}
   */
  RemarkRefreshEventKey:"RemarkRefreshEventKey",
}

export const DOUBAN = {
  KBaseUrl:"https://api.douban.com",
  APIS:{
      /**
       * 正在热映
       * @type {String}
       */
      movie_theaters:'/v2/movie/in_theaters',
      /**
       * 即将上映
       * @type {String}
       */
      movie_coming_soon:'/v2/movie/coming_soon',
      /**
       * top250
       * @type {String}
       */
      movie_top250:'/v2/movie/top250',
      /**
       * 口碑榜
       * @type {String}
       */
      movie_weekly:'/v2/movie/weekly',
      /**
       * 欧美票房榜
       * @type {String}
       */
      movie_us_box:'/v2/movie/us_box',
     /**
      * 新片榜
      * @type {String}
      */
      movie_new:'/v2/movie/new_movies',
     /**
      * 电影条目信息
      * @type {String}
      */
      movie_subject:'/v2/movie/subject/',

     /**
      * 影人条目信息
      * @type {String}
      */
      movie_celebrity:'/v2/movie/celebrity/',

      /**
       *  电影搜索
       * @type {String}
       */
      movie_search:'/v2/movie/search',
  },

  /**
   * 用于保存电影搜索历史的
   * @type {String}
   */
   MovieSearchKey:"MovieSearchKey",

   /**
    * 用于收藏电影key
    * @type {String}
    */
   CollectMovieKey:"CollectMovieKey"

}

  export const JDWX = {
    AppKey:'7d0d41ad29d9c0fc468a3016e8de0ce7',
    JiSuBaseUrl:'https://way.jd.com/jisuapi/get'
  }
