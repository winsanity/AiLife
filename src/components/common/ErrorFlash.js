import React from 'react'
import {StyleSheet, Text,View} from 'react-native'
import * as Animatable from 'react-native-animatable'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {COLOR} from '../../config'
import * as components from '../'

function ErrorFlash ({error, containerStyle}) {
  error = error.flash
  if (!error) {
    return null
  }

  return (
    <Animatable.View
      animation='fadeIn'
      style={[styles.container,containerStyle]}
      >
        <View style={styles.content}>
          {
             error === '当前网络不可用' ?
            <components.Icon name='priority-high' style={{fontSize:22,color:'red',marginLeft:20}}/>
            :
            <components.Icon name='check-circle'  style={{fontSize:22,color:'#00DD00',marginLeft:20}}/>
          }
          <Text style={styles.error}>{error}</Text>
        </View>

    </Animatable.View>
  )
};

const styles = StyleSheet.create({
  container:{
    position:'absolute',
    left:10,
    right:10,
    bottom:10,
    padding:10,
    borderRadius:5,
    backgroundColor:COLOR.backgroundNotice
  },
  error:{
    fontSize: 12,
    color: 'red',
    marginLeft:20
  },
  content:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  }
})

function mapStateToProps (state) {
  let {error} = state
  return {
    error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorFlash)
