/**
 * AiLife
 * 单号识别结果
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHeighLight,
  TouchableOpacity,
  Image,
  ScrollView,
  AlertIOS,
  TouchableWithoutFeedback
} from 'react-native';

import {COLOR,SCREEN_WIDTH,KUAIDIBIRD,SYSTEM} from '../../config'

/**本地logo数据*/
var logoData = require('../../localJson/logoData');

import * as components from '../../components'

import * as Animatable from 'react-native-animatable'



var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});

export default class CodeShippersPage extends Component {
  constructor(props) {
    super(props);

   const {state: {params: {datas}}} = this.props.navigation;
    this.state={
      dataSource:ds.cloneWithRows(datas)
    }
  }

  render(){
    return(
      <components.Layout>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
        />
      </components.Layout>
    )
  }

_renderRow(rowData){
  return(
    <Animatable.View animation="rubberBand" style={styles.cellItem}>
      <TouchableOpacity onPress={() => this.showPostDetail(rowData)}>
        <Text style={styles.name}>{rowData.ShipperName}</Text>
      </TouchableOpacity>
    </Animatable.View>
  )
}

showPostDetail(rowData){

const {navigate, state: {params: {postNum}}} = this.props.navigation;
  var code = rowData.ShipperCode;
  if (logoData[code] == null) {
    alert('暂不支持该快递！')
    return;
  }
  var  company = logoData[code];

  navigate('SearchDetail',{
    isVisible:true,
    title:'物流详情',
    code:code,
    name:rowData.ShipperName,
    logo:company.logo,
    postNum:postNum
  });
}

}

const styles = StyleSheet.create({
 cellItem:{
   margin:20,
   width:SCREEN_WIDTH-40,
   height:50,
   backgroundColor:'#E63F00',
   borderRadius:5,
   justifyContent:'center'
 },
 name:{
   textAlign:'center',
   color:'white'
 }
})
