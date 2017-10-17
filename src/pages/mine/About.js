import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity
} from 'react-native';


import *as wechat from 'react-native-wechat'

import * as components from '../../components'

import {SCREEN_WIDTH} from '../../config'

export default class About extends Component {

  static navigationOptions = ({ navigation }) => ({

    headerRight: (
      <TouchableOpacity onPress={ () => navigation.state.params.share()}>
        <components.Icon name='reply'  style={{marginRight:10,fontSize:25,color:'black'}}/>
      </TouchableOpacity>

    )
  });

  constructor() {
    super();
    this.state={
      modalisVisible:false,
      left1: new Animated.Value(-100),
      left2: new Animated.Value(SCREEN_WIDTH)
    }

    this.shareBtnClick = this.shareBtnClick.bind(this);
  }

  componentDidMount(){

    this.props.navigation.setParams({share: this.shareBtnClick });

  Animated.timing(
                            // Animate value over time
  this.state.left1,                     // The value to drive
  {
    toValue: (SCREEN_WIDTH/2-100),                               // Animate to final value of 1
  }
).start();

Animated.timing(                            // Animate value over time
this.state.left2,                     // The value to drive
{
  toValue:SCREEN_WIDTH/2,                             // Animate to final value of 1
},

).start();

  }


  shareBtnClick() {

    this.setState({
      modalisVisible:true
    })

  }

  render () {
    return (
      <components.Layout>
        <ScrollView>
          <View style={styles.top}>
            <Image source={require('../../sources/appicon.png')} style={styles.appicon}/>
            <Text style={styles.version}>V1.1.0</Text>
            </View>
            <Animated.Text style={[styles.desc,{marginLeft:this.state.left1}]}>
               心 享 生 活
            </Animated.Text>
            <Animated.Text style={[styles.desc,{marginLeft:this.state.left2,marginTop:250}]}>
               无 限 乐 趣
            </Animated.Text>
        </ScrollView>
        <components.ShareModal
          isVisible={this.state.modalisVisible}
          title='分享客户端'
          wxMomentAction={() => this.shareToTimeline()}
          wechatAction={() => this.shareToSession()}
        />
        <Text style={styles.sign}>Developed by Winsanity</Text>
      </components.Layout>
    )
  }

  shareToSession() {
    wechat.isWXAppInstalled()
   .then( ( isInstalled ) => {
        if ( isInstalled ) {
    wechat.shareToSession({
    type: 'news',
    title: '分享了一个24k纯帅的人',
    description: '分享给你们',
    mediaTagName: 'url',
    messageAction: undefined,
    messageExt: undefined,
    webpageUrl: 'http://tvax3.sinaimg.cn/crop.0.0.750.750.180/0062NRQhly8ffkkf9rllrj30ku0kujrt.jpg'
  });

  this.setState({
    modalisVisible:false
  });
        } else {
          alert( '没有安装微信软件，请您安装微信之后再试' );
        }
    } );
  }

  shareToTimeline(){
    wechat.isWXAppInstalled()
   .then( ( isInstalled ) => {
        if ( isInstalled ) {
          wechat.shareToTimeline({
    type: 'news',
    title: '分享了一个24k纯帅的人',
    description: '分享给你们',
    mediaTagName: 'url',
    messageAction: undefined,
    messageExt: undefined,
    webpageUrl: 'http://tvax3.sinaimg.cn/crop.0.0.750.750.180/0062NRQhly8ffkkf9rllrj30ku0kujrt.jpg'
  });
  this.setState({
    modalisVisible:false
  })
        } else {
          alert( '没有安装微信软件，请您安装微信之后再试' );
        }
    } );
  }

}

const styles = StyleSheet.create({
  top:{
    justifyContent:'center',
    alignItems:'center',
    margin:50
  },
  appicon:{
    width:100,
    height:100,
    marginBottom:5,
    borderRadius:10
  },
  desc:{
    width:100,
    color:'#7B68EE',
    position:'absolute',
    marginTop:220,
    fontSize:18,
    textAlign:'center',
    fontFamily:'Verdana'
  },
  sign:{
    width:SCREEN_WIDTH-30,
    textAlign:'center',
    margin:20,
    fontSize:13
  },
  version:{
    fontSize:14,
    margin:2
  }
})
