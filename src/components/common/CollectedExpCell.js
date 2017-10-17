/**
 * AiLife
 * 显示在快递首页的收藏的快递
 */

import React, { Component } from 'react';
 import {StyleSheet,Text,View,Image,ActivityIndicator,TouchableWithoutFeedback} from 'react-native'
 import * as Animatable from 'react-native-animatable'

 import {COLOR,SCREEN_WIDTH,KUAIDIBIRD} from '../../config'
import * as networks from '../../networks'

 export default class CollectedExpCell extends Component {
   constructor(props) {
     super(props);
     this.state={
       loadedData:false,
       status:'',
       description:''
     }
   }

   componentDidMount() {
     this._getDetailStatus();
   }

   _getDetailStatus(){

     const model = this.props.model;
     networks.ExpressApi.loadTracesData(model.code,model.postNum).then((responseJson) =>{

      if (responseJson && responseJson.Success && responseJson.State != 0) {

        if (responseJson.State == 1) {
          this.setState({
            status:'已发货'
          })
        } else if (responseJson.State == 2) {
          this.setState({
            status:'运输中'
          })
        } else if (responseJson.State == 3) {
          this.setState({
            status:'已签收'
          })
        } else if (responseJson.State == 4) {
          this.setState({
            status:'问题件'
          })
        }

        this.setState({
          loadedData:true,
          description:responseJson.Traces[0].AcceptStation,
        });
      }
    }).catch((error) => {
      alert(error)
    });
   }

   render() {
     const model = this.props.model;
     const callback = this.props.callback;
     return (
       this.state.loadedData ?
       <TouchableWithoutFeedback onPress={callback}>
         <View style={styles.container}>
           <Image source={{uri:KUAIDIBIRD.LogoBaseUrl+model.logo}} style={styles.logo}/>
           <View style={styles.middle}>
             <Text style={styles.commonText}>{ model.remark ?`${model.remark}(${model.name})` :model.name}</Text>
             <Text style={styles.commonText}>{`单号：${model.postNum}`}</Text>
             <Text style={styles.commonText} numberOfLines={2}>{this.state.description}</Text>
          </View>
          <View style={styles.sep}></View>
          <Text style={styles.status}>{this.state.status}</Text>
         </View>
       </TouchableWithoutFeedback>
       :
       <View style={[styles.container,{justifyContent:'space-between'}]}>
         <Image source={{uri:KUAIDIBIRD.LogoBaseUrl+model.logo}} style={styles.logo}/>
         <ActivityIndicator style={{margin:30}} color='white'/>
       </View>
     )
   }
 }

 const styles = StyleSheet.create({
   container:{
     width:SCREEN_WIDTH - 20 ,
     height:100,
     margin:10,
     borderRadius:10,
     backgroundColor:COLOR.theme,
     flexDirection:'row',
     alignItems:'center'
   },
   logo:{
     width:80,
     height:80,
     marginTop:10,
     marginBottom:10,
     marginLeft:10,
     marginLeft:5,
     borderRadius:5
   },
   middle:{
    width:SCREEN_WIDTH-150,
    margin:5
  },
  rightMiddle:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  sep:{
    width:0.5,
    height:90,
    marginTop:5,
    marginBottom:5,
    backgroundColor:'white'
  },
  status:{
    width:20,
    textAlign:'center',
    alignItems:'center',
    margin:5,
    fontSize:18,
    color:'red'
  },
  commonText:{
    color:'white',
    marginTop:2,
    marginBottom:2
  }
 })
