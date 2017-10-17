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

import * as networks from '../networks'
import * as components from '../components'
import * as helpers from '../helpers'
import {SCREEN_WIDTH,COLOR,DOUBAN} from '../config';

export default class MovieFlatList extends Component {
  constructor(props) {
    super(props);

    this.state={
      datas:[],
      isRefreshing:true,
      loadedData:false,
      times:undefined, //欧美票房榜的时间
      headerOpacity:0,
      loadMore:false,
      start:0,
      firstMount:true
    }
  }

 componentDidMount() {
    if (this.props.api == DOUBAN.APIS.movie_top250) {
      this._getListTop250Data(0);
    }else {
      this._getListBasicData();
    }

 }

  render(){
    return (
      <FlatList
        data={this.state.datas}
        renderItem={this._renderItem.bind(this)}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={this._renderSep.bind(this)}
        ListHeaderComponent={this._renderListHeader.bind(this)}
        ListFooterComponent={this._renderListFooter.bind(this)}
        onEndReachedThreshold={0}
        onEndReached={() => this._onEndReached()}
        getItemLayout={(data,index) => ({length:140,offset:140.5*index,index})}
        refreshControl={
         <RefreshControl
           refreshing={this.state.isRefreshing}
           onRefresh={() => {this.props.api === DOUBAN.APIS.movie_top250 ? this._getListTop250Data(0) : this._getListBasicData()}}
           tintColor="#ff0000"
           title="加载中..."
           titleColor="#ff0000"
           colors={['#ff0000', '#00ff00', '#0000ff']}
           progressBackgroundColor="#ffff00"
         />
       }
      />

    )
  }

  _getListTop250Data(start) {
    var that = this;
    fetch(`${DOUBAN.KBaseUrl}${this.props.api}?start=${start}`).then((response)=>
    response.json()).then((responseJson) =>{
      if (responseJson.count) {
        var datas = [ ];
        if (start == 0) {
          datas = responseJson.subjects
        }else {
          datas = this.state.datas.concat(responseJson.subjects)
        }
        if (datas.length === 250) {
          alert('无更多数据.')
        }

        that.setState({
          isRefreshing:false,
          datas:datas,
          loadMore:false,
          firstMount:false,
          start:this.state.start+20
        })
      }
    }).catch(() => {
      this.setState({
        isRefreshing:false
      })
    })
  }
  _getListBasicData() {
    var that = this;
    fetch(`${DOUBAN.KBaseUrl}${this.props.api}`).then((response)=>
    response.json()).then((responseJson) =>{
      that.setState({
        isRefreshing:false,
        datas:responseJson.subjects,
        times:responseJson.date,
        headerOpacity:1,

      })
    }).catch(() => {
      this.setState({
        isRefreshing:false
      })
    })
  }

  _onEndReached(){
    if (this.state.firstMount) {

    } else {
      if (this.state.loadMore) {

      } else {
          this.setState({
            loadMore:true
          })
          this._getListTop250Data(this.state.start)
      }
    }
  }

  //此函数用于为给定的item生成一个不重复的key
  _keyExtractor = (item, index) => index;

  _renderItem({item,index}) {
    const navigate = this.props.navigate;

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

  _renderListHeader(){
    if (this.props.api === DOUBAN.APIS.movie_us_box) {
      return (
        <View>
         <Text style={styles.times}>{this.state.times}</Text>
         <View style={[styles.sep,{opacity:this.state.headerOpacity}]}></View>
        </View>

      )
    }else {
      return null
    }
  }

  _renderListFooter(){
    if (this.props.api === DOUBAN.APIS.movie_us_box) {
      return null
    }else {
      if (this.state.loadMore) {
        return (
          <LoadingMoreView />
        )
      } else {
        return null
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
  sep:{
    backgroundColor:'#DDDDDD',
    width:SCREEN_WIDTH - 10,
    height:0.5,
    marginLeft:5,
    marginRight:5
  },
  times:{
    fontSize:16,
    width:SCREEN_WIDTH,
    height:20,
    marginTop:5,
    alignSelf:'center',
    textAlign:'center'
  },
  loadingMore:{
    flexDirection:'row',
    width:SCREEN_WIDTH,
    height:40,
    alignItems:'center',
    justifyContent:'space-between'
  }
})
