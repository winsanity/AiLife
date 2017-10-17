/**
 * AiLife
 * 快递备注页
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHeighLight,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Keyboard,
  ScrollView,
  DeviceEventEmitter
} from 'react-native';

var TimerMixin = require('react-timer-mixin');

import * as storages from '../../storage'
import {COLOR,SCREEN_WIDTH,KUAIDIBIRD,SYSTEM} from '../../config'

import * as components from '../../components'


/**第三方组件*/
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';

export default class  RemarkName extends Component {
  constructor(props) {
    super(props);
     const {state: {params: {code,postNum,name}}} = this.props.navigation;
    this.state = {
      markText:name
    }
  }

///** life circle**/
componentWillUnmount() {
  this.timer && clearTimeout(this.timer);
}

 render(){
   const {state: {params: {code,postNum,name}}} = this.props.navigation;
   return(
       <View style={styles.container}>
        <ScrollView>
          <View style={styles.topContainer}>
            <View style={styles.top}>
              <Text style={styles.title}>备注：</Text>
              <TextInput
                ref='textInput'
                style={styles.textInput}
                onChangeText={(text) => this.setState({markText:text}) }
                defaultValue = {name}
                returnKeyType='send'
                onSubmitEditing={() => this.saveRemark(code,postNum)}
                >
              </TextInput>
              <TouchableOpacity onPress={() => {
                this.refs.textInput.clear();
                this.setState({
                  searchText:''
                })
              }}>
                <Icon name='ios-close-circle' size={16} color='gray' style={{marginRight:5,marginTop:2}}/>
              </TouchableOpacity>
            </View>
          </View>


         <components.Button title={'提交'} style={{height:40}} callback={() => {
           this.saveRemark(code,postNum)
         }}/>

        </ScrollView>
       </View>

   )
 }

 saveRemark(code,postNum){
     const { goBack } = this.props.navigation;

     if (this.state.markText.length < 1) {
       Toast.show('备注名不能为空',{
         duration:Toast.durations.SHORT,
         position:SYSTEM.iOS ? Toast.positions.CENTER : Toast.positions.BOTTOM,
         shadow:true,
         animation:true
       });
     }else {

       //通知快递详情页重新渲染备注Text
        DeviceEventEmitter.emit(KUAIDIBIRD.RemarkRefreshEventKey,this.state.markText);

       Toast.show('保存成功',{
         duration:Toast.durations.SHORT,
         position:SYSTEM.iOS ? Toast.positions.CENTER : Toast.positions.BOTTOM,
         shadow:true,
         animation:true
       });
       this.timer = setTimeout(
         () => { goBack() },
         1000
       );
      }
     }
}
 const styles = StyleSheet.create({
   container:{
     flex:1,
   },
   topContainer:{
     backgroundColor:'#DDDDDD',
     margin:20,
   },
   top:{
     flexDirection:'row',
     backgroundColor:'white',
     alignItems:'center',
     justifyContent:'space-between',
     height:30
   },
   title:{
     color:'#aaa',
     fontSize:13,
     padding:5
   },
   textInput:{
     width:SCREEN_WIDTH - 110,
     height:20,
     fontSize:13,
     marginRight:-10,
     marginTop:5
   },
   submitBtn:{
     width:SCREEN_WIDTH - 40,
     marginLeft:20,
     borderWidth:0,
     backgroundColor:'red',
     height:40
   }
 })
