import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  AlertIOS,
  RefreshControl,
  TouchableWithoutFeedback
} from 'react-native';

import * as networks from '../networks'
import * as components from '../components'
import * as helpers from '../helpers'
import {SCREEN_WIDTH,COLOR} from '../config';

export default class NewsFlatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedData:false,
      datas:[ ],
      isRefreshing:true,

    }

  }

/*
life circle
 */
  componentDidMount(){
    this._getListData();
  }

  render(){
    return(
      <FlatList
        data={this.state.datas}
        renderItem={this._renderItem.bind(this)}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={this._renderSep.bind(this)}
        refreshControl={
         <RefreshControl
           refreshing={this.state.isRefreshing}
           onRefresh={() => {this._getListData()}}
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


  _getListData(){
    const {typeId} = this.props;

    networks.NewsApi.requestNewsList(typeId).then((responseJson) => {
      if (responseJson.result.stat == 1) {
          var datas = responseJson.result.data;
          this.setState({
            loadedData:true,
            isRefreshing:false,
            datas : datas
          })
      }else {
        this.setState({
          loadedData:true,
          isRefreshing:false
        })
        alert(responseJson.reason);
      }
    }).catch((error) => {
     this.setState({
       isRefreshing:false
     })
    })

  }


  //此函数用于为给定的item生成一个不重复的key
  _keyExtractor = (item, index) => item.uniquekey;

  _renderItem({item,index}) {
    return (
      !item.thumbnail_pic_s02
      ?
      <TouchableWithoutFeedback onPress={() => this.switchToNewsDetail(item)}>
        <View style={styles.cellContainer_row}>
          <View style={styles.left}>
            <Text style={[styles.title_row,styles.title]}>{item.title}</Text>
            <View style={styles.bottom}>
              <Text style={styles.original}>{`来源:${item.author_name}`}</Text>
              <Text style={styles.date}>{helpers.dateText(item.date)}</Text>
            </View>
          </View>
          <components.NewsImage url={item.thumbnail_pic_s}/>
        </View>
      </TouchableWithoutFeedback>
      :
      <TouchableWithoutFeedback onPress={() => this.switchToNewsDetail(item)}>
        <View>
          <Text style={[styles.title,{margin:10}]}>{item.title}</Text>
          <View style={styles.images_row}>
            <components.NewsImage url={item.thumbnail_pic_s}/>
            <components.NewsImage url={item.thumbnail_pic_s02}/>
            {
              item.thumbnail_pic_s03
              ?
              <components.NewsImage url={item.thumbnail_pic_s03}/>
              :null
            }
          </View>
          <View style={[styles.bottom,{marginLeft:10,marginRight:10,marginTop:5,width:SCREEN_WIDTH-20}]}>
            <Text style={styles.original}>{`来源:${item.author_name}`}</Text>
            <Text style={styles.date}>{helpers.dateText(item.date)}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  _renderSep(){
    return (
      <View style={styles.sep}></View>
    )

  }

  switchToNewsDetail(item){
    const navigate = this.props.navigate;
    navigate('WebView',{
      isVisible:false,
      title:item.author_name,
      url:item.url,
      type:'news'
    })
  }
}


const styles = StyleSheet.create({
  cellContainer_row:{
    flexDirection:'row'
  },
  title:{
    fontSize:16,
  },
  left:{
    marginLeft:10,
    marginTop:10,
    marginBottom:10,
    justifyContent:'space-between'
  },
  title_row:{
    width:SCREEN_WIDTH - (SCREEN_WIDTH - 30)/3 - 20
  },
  bottom:{
    flexDirection:'row',
    width:SCREEN_WIDTH - (SCREEN_WIDTH - 30)/3 - 20,
    justifyContent:'space-between'

  },
  date:{
    fontSize:13,
    color:'#aaa',
  },
  original:{
    fontSize:14,
    color:COLOR.theme,
  },
  images_row:{
    flexDirection:'row'
  },
  sep:{
    margin:5,
    backgroundColor:'#DDDDDD',
    width:SCREEN_WIDTH - 10,
    height:0.5
  }
})
