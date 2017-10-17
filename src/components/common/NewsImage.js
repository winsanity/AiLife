import React from 'react';
import {StyleSheet,Image} from 'react-native';

import {SCREEN_WIDTH} from '../../config';

export default ({url,...props}) => {
  return (
    <Image
      {...props}
      source={{uri:url}}
      style={styles.newsImage}
    />
  )
}

const styles = StyleSheet.create({
  newsImage:{
    margin:5,
    width:(SCREEN_WIDTH - 30)/3,
    height:80,
    borderRadius:5
  }
})
