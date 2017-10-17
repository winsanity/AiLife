import React from 'react';
import {StyleSheet,View} from 'react-native';

import {SCREEN_WIDTH,COLOR} from '../../config';

export default () => {
  return (
    <View style={styles.sep}></View>
  )
}
const styles = StyleSheet.create({
  sep:{
    margin:5,
    backgroundColor:'#DDDDDD',
    width:SCREEN_WIDTH - 10,
    height:0.5
  }
})
