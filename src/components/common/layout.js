/**
 * AiLife
 */
 import React, {Component} from 'react'
 import {StyleSheet, View, StatusBar} from 'react-native'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config'

import * as components from '../'

export default class Layout extends Component {
  constructor(props) {
    super(props)

    this.layout = {
      x:0,
      y:0,
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT
    }
  }

  render () {
      let {screenId, children, containerStyle} = this.props
      return(
        <View
          onLayout={event => {
            this.layout = event.nativeEvent.layout
          }}
          style={[styles.container,containerStyle]}
          >
        <components.ErrorInput  screenId={screenId}/>
          {children}
        <components.ErrorFlash />
        </View>
      )
  }
}

  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white'
    }
  })
