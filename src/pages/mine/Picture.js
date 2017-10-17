import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  AlertIOS
} from 'react-native';

import * as components from '../../components'
import {SCREEN_WIDTH} from '../../components'

export default class Picture extends Component {
  constructor() {
    super();

    this.state={
      datas:[],
      isRefreshing:true,
      page:1,
      firstMount:true,
      loadMore:false
    }

  }

  componentDidMount() {
     this._getListData(1);
  }


  _getListData(page) {
    fetch(`http://gank.io/api/data/福利/20/${page}`).then((response)=>
    response.json()).then((responseJson) =>{
      var datas = [ ];
      if (page == 1) {
        datas = responseJson.results
      }else {
        datas = this.state.datas.concat(responseJson.results)
      }
      this.setState({
        isRefreshing:false,
        datas:datas,
        loadMore:false,
        firstMount:false,
        page:this.state.page+1
      })
    }).catch((error) => {
      alert(error);
    })
  }

  render() {

    return (
      <components.Layout>
        <FlatList
          data={this.state.datas}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={this._keyExtractor.bind(this)}
          numColumns={2}


          refreshControl={
           <RefreshControl
             refreshing={this.state.isRefreshing}
             onRefresh={() => {this._getListData(1)}}
             tintColor="#ff0000"
             title="加载中..."
             titleColor="#ff0000"
             colors={['#ff0000', '#00ff00', '#0000ff']}
             progressBackgroundColor="#ffff00"
           />
         }
        />
      </components.Layout>
    )
  }

  _renderItem({item,index}) {
    return (
      <View>
        <Image source={{uri:item.url}}/>
      </View>
      )
      

  }



  //此函数用于为给定的item生成一个不重复的key
  _keyExtractor = (item, index) => item._id;

  _renderListFooter(){
    if (this.state.loadMore) {
      return (
        <LoadingMoreView />
      )
    } else {
      return null
    }
  }

  _onEndReached(){
    if (this.state.firstMount) {

    } else {
      if (this.state.loadMore) {

      } else {
          this.setState({
            loadMore:true
          })
          this._getListData(this.state.page)
      }
    }
  }

}
  const LoadingMoreView = () => {
    return (
        <View style={styles.loadingMore}>
          <View></View>
          <View style={{flexDirection:'row'}}>
            <ActivityIndicator
              animating={true}
              size='small'
            />
            <Text style={{paddingLeft:5,color:'#aaa'}}>加载中...</Text>
          </View>
          <View></View>
        </View>
    )
  }

const styles = StyleSheet.create({
  loadingMore:{
    flexDirection:'row',
    width:SCREEN_WIDTH,
    height:40,
    alignItems:'center',
    justifyContent:'space-between'
  },
  picture:{
    margin:20,
    width:(SCREEN_WIDTH-80)/2,
    height:150,
    borderRadius:5
  }
})
