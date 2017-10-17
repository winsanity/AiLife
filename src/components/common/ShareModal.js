import React, { Component } from 'react'
import { Text, View, StyleSheet, Modal ,TouchableWithoutFeedback,Image} from 'react-native'

import {SCREEN_WIDTH,SCREEN_HEIGHT} from '../../config'

const shareIconWechat = require('../../sources/wxsession.png');
const shareIconMoments = require('../../sources/wxtimeline.png');

export default class ShareModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible:false
  }
}


 componentDidMount() {

  }


  componentWillReceiveProps(nextProps) {

    this.setState({ isVisible: nextProps.isVisible })
  }


  render() {
    const {title,wechatAction,wxMomentAction} = this.props;
    return (
      <Modal
        animationType="fade"
        visible={this.state.isVisible}
        transparent
        >
        <TouchableWithoutFeedback onPress={() => {
          this.setState({
            isVisible:false
          })
        }}>
          <View key={'spinner'} style={styles.spinner}>
            <View style={styles.mainView}>
              <TitleView title={title} containerStyle={{fontSize:15}}/>
              <View style={styles.btns}>
                <ShareBtn title='微信' icon={shareIconWechat} action={wechatAction}/>
                <ShareBtn title='朋友圈' icon={shareIconMoments} action={wxMomentAction}/>
              </View>
              <TitleView title='取消' containerStyle={{color:'red'}} callback={() =>this.setState({isVisible:false})}/>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    )
  }

}

 const TitleView = ({title,callback,containerStyle}) => {
  return (
    <TouchableWithoutFeedback onPress={callback}>
      <View style={styles.titleView}>
        <Text style={containerStyle}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const ShareBtn = ({action,title,icon}) => {
  return (
    <TouchableWithoutFeedback onPress={action}>
      <View style={{justifyContent:'center',alignItems:'center',margin:10}}>
        <Image source={icon} style={{width:50,height:50}}/>
        <Text style={{marginTop:2,textAlign:'center',color:'#aaa'}}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  mainView:{
    flexDirection:'column',
  },
  titleView:{
    justifyContent:'center',
    alignItems:'center',
    width:SCREEN_WIDTH-20,
    height:40,
    borderRadius:8,
    margin:10,
    backgroundColor:'white'
  },
  btns:{
    flexDirection:'row',
    width:SCREEN_WIDTH-20,
    marginLeft:10,
    height:100,
    backgroundColor:'white',
    borderRadius:8,
    alignItems:'center'
  }
})
