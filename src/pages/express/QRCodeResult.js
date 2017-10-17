/**
 * AiLife
 * 二维码扫描页
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

import {COLOR,SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM,KUAIDIBIRD} from '../../config'

export default class QRCodeResult extends Component {
  constructor() {
    super()
  }

  render () {
    const {state: {params: {data}}} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.content}>{data}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  content:{
    width:SCREEN_WIDTH-20,
    margin:10
  }
})
