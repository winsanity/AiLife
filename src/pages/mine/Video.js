import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  AlertIOS,
  ActivityIndicator
} from 'react-native';

import * as components from '../../components'
import {SCREEN_WIDTH} from '../../config'

export default class Video extends Component {
  constructor(){
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
    fetch(`http://gank.io/api/data/休息视频/20/${page}`).then((response)=>
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
          ListFooterComponent={this._renderListFooter.bind(this)}
          onEndReachedThreshold={0}
          onEndReached={() => this._onEndReached()}
          ItemSeparatorComponent={this._renderSep.bind(this)}
          getItemLayout={(data,index) => ({length:80,offset:80.5*index,index})}
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

    const {navigate} = this.props.navigation;
    return (

        <TouchableOpacity onPress={() => navigate('WebView',{
          isVisible:false,
          title:item.desc,
          url:item.url
        })}>
          <View style={styles.cell} >
            <Image source={require('../../sources/video.png')} style={styles.logo}/>
            <View>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                  <components.Icon name='face' style={{fontSize:18}}/>
                  <Text style={styles.commonText}>{item.who}</Text>
                </View>
              <Text style={{marginTop:10,width:SCREEN_WIDTH-80,fontSize:15}} numberOfLines={2}>{item.desc}</Text>
            </View>
            <Text style={[{position:'absolute',top:10,right:5},styles.commonText]}>{item.publishedAt.substring(0,10)}</Text>
          </View>
        </TouchableOpacity>
    );
  }

  //此函数用于为给定的item生成一个不重复的key
  _keyExtractor = (item, index) => item._id;

  _renderSep() {
    return (
      <View style={styles.sep}></View>
    )
  }

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
  sep:{
    width:SCREEN_WIDTH-10,
    height:0.5,
    backgroundColor:'#aaa'
  },
  cell:{
    flexDirection:'row',
    height:80
  },
  logo:{
    width:70,
    height:70,
    margin:5,
  },
  commonText:{
    fontSize:14,
    color:'#aaa'
  },
  loadingMore:{
    flexDirection:'row',
    width:SCREEN_WIDTH,
    height:40,
    alignItems:'center',
    justifyContent:'space-between'
  }
})
