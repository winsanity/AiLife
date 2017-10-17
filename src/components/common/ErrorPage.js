import React from 'react';
import {StyleSheet,Image,View,TouchableOpacity,Text} from 'react-native';

import {SCREEN_WIDTH} from '../../config'
import * as components from '../'

export default ({refreshAct,closeAct}) => {
  return (
      <View>
        <Image source={require('../../sources/error_1x.png')} style={styles.errorImage}/>
          <View>
            <Text style={styles.errorTitle}>soryy,网页加载出错了～</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',margin:40}}>
              <TouchableOpacity onPress={closeAct} style={{alignItems:'center'}}>
                <components.Icon name='close' style={{fontSize:25,color:'#aaa'}}/>
                <Text style={styles.actBtn}>关闭</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{alignItems:'center'}}>
                <components.Icon name='autorenew' style={{fontSize:25,color:'#aaa'}}/>
                <Text style={styles.actBtn}>刷新</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
  errorImage:{
    margin:20,
    width:SCREEN_WIDTH-40,
    height:200
  },
  errorTitle:{
    margin:20,
    width:SCREEN_WIDTH-40,
    textAlign:'center',
    fontSize:18,
    color:'red'
  },
  actBtn:{
    fontSize:16,
    color:'#aaa',
    textAlign:'center'
  }
})
