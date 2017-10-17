/**
 * AiLife
 */
import React from "react";
import {KUAIDIBIRD} from '../config'
import md5Util from '../helpers/md5Util'

var md5 = new md5Util()

var Buffer = require('buffer').Buffer

export class ExpressApi {
  constructor() {

  }

  /**
   * 查询快递物流信息
   * @param  {[type]} code    快递公司编码
   * @param  {[type]} postNum 快递单号
   * @return {[type]}         [description]
   */
  loadTracesData(code,postNum) {
    return new Promise((reslove,reject) => {
      let RequestData = "{'OrderCode':'','ShipperCode':'" + code + "','LogisticCode':'" + postNum + "'}";
      //电商Sign签名生成
      let dataSign = new Buffer(md5.hex_md5(RequestData + KUAIDIBIRD.AppKey)).toString('base64');

      fetch(KUAIDIBIRD.ExpressReqURL,{
        method:'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'RequestData=' + RequestData + '&EBusinessID=' + KUAIDIBIRD.EBusinessID + '&RequestType=' + '1002' + '&DataSign=' + dataSign + '&DataType=' + '2'
      }).then((response) => response.json())
         .then((responseJson) => {
           reslove(responseJson)
         })
        .catch((error) => {
          reject(error)
        })
    })
  }

/**
 * 根据单号识别单号信息
 * @param  {[type]} LogisticCode [description]
 * @return {[type]}              [description]
 */
  readLogisticCode(LogisticCode) {
    return new Promise ((reslove,reject) => {
      let RequestData = "{'OrderCode':'','LogisticCode':'" + LogisticCode + "'}";
      //电商Sign签名生成
      let dataSign = new Buffer(md5.hex_md5(RequestData + KUAIDIBIRD.AppKey)).toString('base64');
      fetch(KUAIDIBIRD.ExpressReqURL,{
        method:'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'RequestData=' + RequestData + '&EBusinessID=' + KUAIDIBIRD.EBusinessID + '&RequestType=' + '2002' + '&DataSign=' + dataSign + '&DataType=' + '2'
      }).then((response) => response.json())
       .then((responseJson) => {
         reslove(responseJson);
       }).catch((error) => {
         reject(error);
       })
    })
  }
}


export default new ExpressApi()
