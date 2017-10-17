/**
 * AiLife
 * 二维码扫描页
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHeighLight,
  TouchableOpacity,
  Image,
} from 'react-native';

import {COLOR,SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM,KUAIDIBIRD} from '../../config'
import * as networks from '../../networks'
import * as components from '../../components'
/**第三方组件*/
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';
import {QRScannerView} from 'ac-qrcode';


export default class QRCodePage extends Component {
   constructor (){
    super();
    this.state = {
      data:null,
      modalVisible:false
    }

   }
    render(){
       return(
         <components.Layout>
           <QRScannerView
             onScanResultReceived ={this.barcodeReceived.bind(this)}
             renderTopBarView = { () => this._renderTopMenu()}
             renderBottomMenuView = { () => this.renderMenu() }
             cornerColor={COLOR.theme}
             scanBarColor={COLOR.theme}
           />
         </components.Layout>
       )
     }

 _renderTopMenu(){
   return null;
 }


 renderMenu(){

   return(
      this.state.data ?
      <View style={{backgroundColor:'white'}}>
       <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',width:SCREEN_WIDTH-100}} >
        <Text style={{padding:12}} numberOfLines={2}>{`扫描到的信息:${this.state.data}`}</Text>
        {
          this.state.data === '链接'  || this.state.data === '文本' ?
          null
          :
          <Text style={{color:'red',padding:12,}} onPress={() => this.showSearchList()}>识别该单号？</Text>

        }

       </View>
       <TouchableOpacity onPress={() => this.clearResult()}>
          <Icon name="ios-trash-outline" size={25} color='red' style={{alignSelf:'center'}}/>
       </TouchableOpacity>
      </View>
      :
      null
   )
 }
  barcodeReceived(e){
    const { navigate } = this.props.navigation;


    if (this.state.data === null) {

       if (e.data.length < 20 && e.data.indexOf("http") == - 1) {
         this.setState({
           data:e.data
         })
       }else if (e.data.length >= 20 && e.data.indexOf("http") == -1) {
         this.setState({
           data:'文本'
         })
         navigate('QRCodeResult',{
           isVisible:true,
           title:'扫描结果',
           data:e.data
         })

       } else {
         this.setState({
           data:'链接'
         })
         navigate('WebView',{
           isVisible:false,
           title:'扫描结果',
           url:e.data
         })
       }
    }else {
      return;
    }

  }

 clearResult(){
   this.setState({
     data:null
   })
 }

 showSearchList(){

    const { navigate } = this.props.navigation;

    networks.ExpressApi.readLogisticCode(this.state.data).then((responseJson) => {

        if (responseJson.Success == 1) {
          navigate('CodeShippersPage',{
            isVisible:true,
            title:'识别结果',
            datas:responseJson.Shippers,
            postNum:responseJson.LogisticCode,
          })
        }else {
          Toast.show('未识别到物流信息',{
            duration:Toast.durations.SHORT,
            position:SYSTEM ? Toast.positions.CENTER : Toast.positions.BOTTOM,
            shadow:true,
            animation:true
          });
        }

    }).catch((error) => {

    })
 }
}
