/**
 * AiLife
 */

import logger from '../logger'
import {DOUBAN} from '../config'


export class DBMovieApi {
  constructor() {

  }

  loadMoviesInTheathers(){
    return new Promise ((reslove,reject) => {
      fetch(DOUBAN.KBaseUrl+DOUBAN.APIS.movie_theaters,{
        method:'GET'
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
 * 即将上映的影片
 * @return {[type]} [description]
 */
 loadComingsoonMovies() {
   return new Promise ((reslove,reject) => {
     fetch(DOUBAN.KBaseUrl+DOUBAN.APIS.movie_coming_soon,{
       method:'GET'
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

export default new DBMovieApi()
