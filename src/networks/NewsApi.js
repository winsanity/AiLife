/**
 * AiLife
 */

import logger from '../logger'
import {JUHE} from '../config'


export  class NewsApi {
  constructor() {

  }

  requestNewsList(typeId) {
   return new Promise((reslove,reject) => {
     fetch(JUHE.serverNet,{
       method:'POST',
       headers:{
         'Accept':'application/json',
         'Content-Type': 'application/x-www-form-urlencoded',
       },
         body:'type=' + typeId + '&key=' + JUHE.appKey
     }).then((response) => response.json())
        .then((responseJson) => {
          reslove(responseJson)
        })
        .catch((error) => {
          reject(error)
        })
   })
 }

}

export default new NewsApi()
