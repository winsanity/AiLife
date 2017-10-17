/**
 * AiLife
 */

import React from 'react';
import {StyleSheet,View} from 'react-native';

import * as Animatable from 'react-native-animatable';

export default ({...props}) => {
  return (
    <View style={styles.container}>
       <Animatable.View animation="zoomOut" iterationCount={100} direction="normal"  style={styles.circle}></Animatable.View>
       <Animatable.View animation="zoomOut" iterationCount={100} direction="normal"  style={[styles.circle,{backgroundColor:'yellow'}]}></Animatable.View>
       <Animatable.View animation="zoomOut" iterationCount={100} direction="normal"  style={[styles.circle,{backgroundColor:'blue'}]}></Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:150
  },
  circle:{
    width:10,
    height:10,
    borderRadius:5,
    marginLeft:10,
    backgroundColor:'red'
  }
})
