import React from 'react';
import {StyleSheet,View,TouchableWithoutFeedback,Text} from 'react-native';

import {SCREEN_WIDTH,COLOR} from '../../config';
import * as components from '../'

export default ({name,title,callback,color}) => {
  return (
  <TouchableWithoutFeedback onPress={callback}>
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:40}}>
        <View style={{flexDirection:'row',marginLeft:10,alignItems:'center'}}>
          <components.Icon name={name} style={{color:color,fontSize:25,marginRight:5}}/>
          <Text style={{paddingLeft:10,alignItems:'center',fontSize:16}}>{title}</Text>
        </View>
        <components.Icon  name='chevron-right' style={{color:'#aaa',fontSize:25}}/>
      </View>
    </View>
  </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container:{
    width:SCREEN_WIDTH,
    height:44,
    justifyContent:'center',
    backgroundColor:'white'
  },
  sep:{
    margin:5,
    backgroundColor:'#DDDDDD',
    width:SCREEN_WIDTH - 5,
    height:0.5
  }
})
