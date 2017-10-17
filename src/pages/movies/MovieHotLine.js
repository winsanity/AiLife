/**
 * AiLife
 * 正在热映
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AlertIOS,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
} from 'react-native';

import * as components from '../../components'
import {COLOR,SCREEN_WIDTH,SYSTEM,DOUBAN} from '../../config'

export default class MovieHotLine extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    const {state: {params: {datas}}} = this.props.navigation;
    return(
      <components.Layout>
        <FlatList
          data={datas}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderSep.bind(this)}
          getItemLayout={(data,index) => ({length:140,offset:140.5*index,index})}
        />
      </components.Layout>
    )

  }

  //此函数用于为给定的item生成一个不重复的key
  _keyExtractor = (item, index) => item.id;


  _renderItem({item,index}) {

    const {navigate} = this.props.navigation;
    return (
      <components.MovieItem subject={item} callback={() => {
        navigate('MovieDetail',{
          isVisible:true,
          title:'影片信息',
          movie_id:item.id
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
