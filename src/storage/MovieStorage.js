/**
 * AiLife
 */

import {DOUBAN} from './../config'
import storage from './AsyncStorageConfig'

export class MovieStorage {
  constructor() {
  }

//保存某个搜索历史
 saveMovieSearchHistory (name) {
   storage.save({
     key:DOUBAN.MovieSearchKey,
     id:name,
     data:name,
     expires:null
   });
 }

//加载所有搜索历史
 loadAllMovieSearchHistory() {
   return new Promise((reslove,reject) => {
     storage.getAllDataForKey(DOUBAN.MovieSearchKey).then(names => {
       reslove(names);
     });
   }).catch((error) => {
     reject(error);
   })
 }

//删除所有搜索历史
 removeAllMovieSearchHistory() {
   storage.clearMapForKey(DOUBAN.MovieSearchKey);
 }

//删除单个数据
 removeOneMovieSearchHistory(name) {
   storage.remove({
     key:DOUBAN.MovieSearchKey,
     id:name
   });
 }


 /**
  * 收藏某部剧
  * @param  {[type]} id    剧id
  * @param  {[type]} model 剧对象
  * @return {[type]}
  */
   collectOneMovie(id,subject) {
     storage.save({
       key:DOUBAN.CollectMovieKey,
       id:id,
       data:subject,
       expires:null
     })
   }

 /**
  * 移除某个部收藏的剧
  * @param  {[type]} id 剧id
  * @return {[type]}    [description]
  */
   removeOneCollectedMovie(id) {
     storage.remove({
       key:DOUBAN.CollectMovieKey,
       id:id
     });
   }

  /**
   * 加载某个收藏的快递
   * @param  {[type]} id 快递单号＋快递公司code
   * @return {[type]}    [description]
   */
   loadOneCollectedMovie (id) {
     return new Promise(function(resolve, reject) {
       storage.load({
         key:DOUBAN.CollectMovieKey,
         id:id
       }).then(subject => {
         resolve(subject)
       })
     });
  }

 /**
  * 加载所有的收藏的剧
  * @return {[type]} [description]
  */
  loadAllCollectedMovies () {
    return new  Promise(function(resolve, reject) {
      storage.getAllDataForKey(DOUBAN.CollectMovieKey).then(subjects => {
        resolve(subjects);
      }).then((error) => {
        reject(error);
      })
    });
  }

 /**
  * 清除所有收藏的剧
  * @return {[type]} [description]
  */
  clearAllCollectedMovie() {
    storage.clearMapForKey(DOUBAN.CollectMovieKey);
  }

}

export default new MovieStorage()
