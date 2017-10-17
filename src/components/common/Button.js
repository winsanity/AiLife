import React from 'react'
import {StyleSheet, Text,TouchableOpacity,View} from 'react-native'

import {SCREEN_WIDTH,COLOR} from '../../config';

export default ({callback,title,style,...props}) => {
  return (
    <View style={[styles.container,style]}>
    <TouchableOpacity onPress={callback}>
      <Text style={styles.name}>{title}</Text>
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
  margin:20,
  width:SCREEN_WIDTH-40,
  height:50,
  backgroundColor:COLOR.theme,
  borderRadius:5,
  justifyContent:'center'
},
name:{
  textAlign:'center',
   color:'white'
}
})
