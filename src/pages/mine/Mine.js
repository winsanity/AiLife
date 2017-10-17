import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {SCREEN_WIDTH,COLOR} from '../../config'
import * as components from '../../components'

import ParallaxView from 'react-native-parallax-view';


 export default class Mine extends Component {
  static navigationOptions = {
    header:null
 };

  constructor(props) {
    super(props);

  }

  render(){

    const {navigate} = this.props.navigation;
    return(
      <components.Layout containerStyle={{backgroundColor:'#F8F8FF'}}>
        <ParallaxView
         backgroundSource={require('../../sources/mine_banner.png')}
         windowHeight={230}
         backgroundColor={COLOR.theme}
         scrollableViewStyle={{ backgroundColor:'#F8F8FF' }}
        >
        <SepView height={10}/>
        <components.Indicate name='border-outer' title='快递收藏' color='#00FF00' callback={() => {
          navigate('ExpressCollect',{
            isVisible:true,
            title:'快递收藏'
          })
        }}/>
        <SepView height={1} color={'#DDDDDD'}/>
        <components.Indicate name='local-movies' title='电影收藏' color='red'
          callback={() => {
            navigate('MovieCollect',{
              isVisible:true,
              title:'电影收藏'
            })
          }}/>
        <SepView height={10}/>
        <components.Indicate name='play-circle-outline' title='精彩视频' color='#00BBFF'
          callback={() => {
            navigate('Video',{
              isVisible:true,
              title:'精彩视频'
            })
          }}/>
        <SepView height={10}/>
        <components.Indicate name='rate-review' title='联系我们' color='#E93EFF'

        />
        <SepView height={1} color={'#DDDDDD'}/>
        <components.Indicate name='lightbulb-outline' title='关于' color='#FFCC22'
          callback={() => {
            navigate('About',{
              isVisible:true,
              title:'关于'
            })
          }}/>
     </ParallaxView>

   </components.Layout>
    )
  }

}

const SepView = ({height}) => {
  return (
    <View style={[styles.sepView,{height:height}]}></View>
  )
}

const styles = StyleSheet.create({
  sepView:{
    width:SCREEN_WIDTH,
    backgroundColor:'#F8F8FF'
  }
});
