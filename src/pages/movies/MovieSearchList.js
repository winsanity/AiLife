/**
 * AiLife
 * 电影搜索结果页
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  AlertIOS,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import * as components from '../../components'
import * as helpers from '../../helpers'
import {SCREEN_WIDTH,COLOR,DOUBAN,SYSTEM} from '../../config';

/**第三方**/
import Toast from 'react-native-root-toast'

export default class MovieSearchList extends Component {
  constructor(props) {
    super(props);

    this.state={
      datas:[],
      loadedData:false,
    }
  }

 componentDidMount() {
    const {state:{params:{isLabelSearch,searchText}}} = this.props.navigation;
    if (isLabelSearch) {
      this._getSearchListFromLabel(searchText);
    }else {
      this._getSearchListFromName(searchText);
    }

}

/**
 * 影名或人民搜索
 * @param  {[type]} name 名称
 * @return {[type]}      [description]
 */
_getSearchListFromName(name){
    fetch(DOUBAN.KBaseUrl+DOUBAN.APIS.movie_search+`?q=${name}`,{
      method:'GET',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) =>
      response.json()
    ).then((responseJson) => {
      if (responseJson.count) {
        if (responseJson.count === 0) {
          Toast.show('暂没有搜索结果',{
            duration:Toast.durations.SHORT,
            position:SYSTEM.iOS ? Toast.positions.CENTER : Toast.positions.BOTTOM,
            shadow:true,
            animation:true
          });
        }else {
          this.setState({
            loadedData:true,
            datas:responseJson.subjects
          })
        }
      } else {
        Toast.show('访问出错了～',{
          duration:Toast.durations.SHORT,
          position:SYSTEM.iOS ? Toast.positions.CENTER : Toast.positions.BOTTOM,
          shadow:true,
          animation:true
        });
      }
    }).catch((error) => {
      console.error();
    })

}

/**
 * 标签搜索
 * @param  {[type]} label 标签名
 * @return {[type]}       [description]
 */
_getSearchListFromLabel(label) {
  fetch(DOUBAN.KBaseUrl+DOUBAN.APIS.movie_search+`?tag=${label}`,{
    method:'GET',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((response) =>
    response.json()
  ).then((responseJson) => {
    if (responseJson.count) {
      if (responseJson.count === 0) {
        Toast.show('暂没有搜索结果',{
          duration:Toast.durations.SHORT,
          position:SYSTEM.iOS ? Toast.positions.CENTER : Toast.positions.BOTTOM,
          shadow:true,
          animation:true
        });
      }else {
        this.setState({
          loadedData:true,
          datas:responseJson.subjects
        })
      }
    } else {
      Toast.show('访问出错了～',{
        duration:Toast.durations.SHORT,
        position:SYSTEM.iOS ? Toast.positions.CENTER : Toast.positions.BOTTOM,
        shadow:true,
        animation:true
      });
    }
  }).catch((error) => {
    alert(error)
  })
}


render(){
  return (
    <components.Layout>
      {
        this.state.loadedData ?
        <FlatList
          data={this.state.datas}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderSep.bind(this)}
          getItemLayout={(data,index) => ({length:140,offset:140.5*index,index})}
        />
        :
        <components.LoadingView />
      }
    </components.Layout>
  )
}

//此函数用于为给定的item生成一个不重复的key
_keyExtractor = (item, index) => index;

_renderItem({item,index}) {

  const {navigate} = this.props.navigation;

  return (
    <components.MovieItem subject={item.subject ? item.subject : item} callback={() => {
      navigate('MovieDetail',{
        isVisible:true,
        title:'影片信息',
        movie_id:item.subject ? item.subject.id : item.id
      })
    }}/>
  )
}

_renderSep() {
  return (
    <View style={styles.sep}></View>
  )
}
}

const styles = StyleSheet.create({
  sep:{
    backgroundColor:'#aaa',
    width:SCREEN_WIDTH - 10,
    height:0.5,
    marginLeft:5,
    marginRight:5
  }
})
