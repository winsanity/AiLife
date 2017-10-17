import React, { Component } from 'react'
import { Text, View, StyleSheet, Modal ,TouchableWithoutFeedback } from 'react-native'


import {SCREEN_WIDTH,SCREEN_HEIGHT} from '../../config'

export default class CommmonModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible:false
  }
}
  componentDidMount() {



  }

  renderSpinner() {

  }




  componentWillReceiveProps(nextProps) {

        this.setState({ isVisible: nextProps.isVisible })

  }

  render() {
    const {title,confirmAction} = this.props;
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
              <TitleView title='清空后将不能恢复' containerStyle={{height:50}} textStyle={{color:'#aaa'}}/>
              <Sep containerStyle={{height:0.5}}/>
              <TitleView title='清空' textStyle={{fontSize:17,color:'red'}} actionCallback={confirmAction}/>
              <Sep containerStyle={{height:10}}/>
              <TitleView title='取消' textStyle={{fontSize:17,color:'black'}} actionCallback={() => this.setState({isVisible:false})}/>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  hideModal(){
    this.setState({
      isVisible:false
    })
  }


}

const TitleView = ({title,containerStyle,actionCallback,textStyle}) => {
  return (
     <TouchableWithoutFeedback onPress={actionCallback}>
       <View style={[styles.singleItem,containerStyle]}>
         <Text style={textStyle}>{title}</Text>
       </View>
     </TouchableWithoutFeedback>
  )
}
const Sep = ({containerStyle}) => {
  return (
    <View style={[styles.sep,containerStyle]}>
    </View>
  )
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },

  mainView:{
    flexDirection:'column'
  },

  singleItem:{
    width:SCREEN_WIDTH,
    height:40,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    fontSize:16
  },
  sep:{
    width:SCREEN_WIDTH,
    backgroundColor:'#DDDDDD'
  }

});

CommmonModal.PropTypes = {
    isVisible: React.PropTypes.isVisible,
};
