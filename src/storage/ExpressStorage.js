/**
 * AiLife
 */

import {KUAIDIBIRD} from './../config'
import storage from './AsyncStorageConfig'

export class ExpressStorage {
  constructor() {

  }

/**
 * 收藏某个快递
 * @param  {[type]} id    快递单号＋快递公司code
 * @param  {[type]} model 快递对象
 * @return {[type]}
 */
  collectOneCollect(id,model) {
    storage.save({
      key:KUAIDIBIRD.ExpressCollectKey,
      id:id,
      data:model,
      expires:null
    })
  }

/**
 * 移除某个收藏的快递
 * @param  {[type]} id 快递单号＋快递公司code
 * @return {[type]}    [description]
 */
  removeOneCollect(id) {
    storage.remove({
      key:KUAIDIBIRD.ExpressCollectKey,
      id:id
    });
  }

 /**
  * 加载某个收藏的快递
  * @param  {[type]} id 快递单号＋快递公司code
  * @return {[type]}    [description]
  */
  loadOneCollectedExpress (id) {
    return new Promise(function(resolve, reject) {
      storage.load({
        key:KUAIDIBIRD.ExpressCollectKey,
        id:id
      }).then(ret => {
        resolve(ret)
      })
    });
 }

/**
 * 加载所有的收藏快递
 * @return {[type]} [description]
 */
 loadAllCollectedExpress () {
   return new  Promise(function(resolve, reject) {
     storage.getAllDataForKey(KUAIDIBIRD.ExpressCollectKey).then(models => {
       resolve(models);
     }).then((error) => {
       reject(error);
     })
   });
 }

/**
 * 清除所有的快递
 * @return {[type]} [description]
 */
 clearAllCollectedExpress () {
   storage.clearMapForKey(KUAIDIBIRD.ExpressCollectKey);
 }


}

export default new ExpressStorage()
