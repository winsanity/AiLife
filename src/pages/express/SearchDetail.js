/**
 *  快递搜索选项页
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ListView,
  DeviceEventEmitter,
  AlertIOS
} from 'react-native';

/**第三方组件*/
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast'
import ActionButton from 'react-native-action-button';

/**本地快递状态json*/
var StatusData = require('../../localJson/stateData')

import {COLOR,SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM,KUAIDIBIRD} from '../../config'
import * as components from '../../components'
import * as storages from '../../storage'
import * as networks from '../../networks'
import * as helpers from '../../helpers'

var stateW = SCREEN_WIDTH/4

var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});


export default class SearchDetail extends Component {
  constructor(props) {
    super(props);
    this.state ={
      loadedData:false,
      dataSource:ds,
      datas:[],
      currentState:1,
      collected:false,
      markText:null
    }
}

/****  life circle ***/
componentDidMount(){

const {state: {params: {code,postNum,name,logo}}} = this.props.navigation;
  var that = this;
  this.listener = DeviceEventEmitter.addListener(KUAIDIBIRD.RemarkRefreshEventKey,function(markText){
        that.addCollect(code,postNum,name,markText,logo)
        that.setState({
          markText:markText
        })
    });

  this._getData();

}

//最后别忘了移除通知
componentWillUnmount(){
      this.listener.remove();
  }

_getData(){

 const {state: {params: {code,postNum}}} = this.props.navigation;

   networks.ExpressApi.loadTracesData(code,postNum).then((responseJson) =>{

    if (responseJson && responseJson.Success && responseJson.State != 0) {

      this.setState({
        dataSource:ds.cloneWithRows(responseJson.Traces.reverse()),
        loadedData:true,
        datas:responseJson.Traces,
        currentState:responseJson.State
      });

      var id = code +  postNum;
       storages.ExpressStorage.loadOneCollectedExpress(id).then((ret) => {
         if (ret) {
           this.setState({
             collected:true,
             markText:ret.remark
           })
         }
       }).catch(() => {
         this.setState({
           collected:false,
           markText:null
         })
       })

    }else {
      Toast.show(responseJson.Reason,{
        duration:Toast.durations.SHORT,
        position:SYSTEM.iOS ? Toast.positions.CENTER : Toast.positions.BOTTOM,
        shadow:true,
        animation:true
      });

    }
  }).catch((error) => {
  alert(error)
  });

}



  render(){
     const {state: {params: {logo,name,code,postNum}}} = this.props.navigation;

      return(

        !this.state.loadedData ?
        <components.Layout>
          <components.LoadingView />
        </components.Layout>

        :
        <components.Layout>
          <View style={styles.top}>
            <View style={{flexDirection:'row'}}>
             <Image source={{uri:KUAIDIBIRD.LogoBaseUrl+logo}} style={{width:60,height:60,marginLeft:10}}/>
             <View>
                <Text style={{color:'white',fontSize:16,margin:5}}>{this.state.markText ? this.state.markText + `(${name})` : name}</Text>
                <Text style={{color:'white',fontSize:16,margin:5}}>{'运单号:'+ postNum}</Text>
             </View>
            </View>

          </View>

        {
          this.state.datas.length === 0 && this.state.loadedData?
          <Text style={{margin:10}}>暂没有此物流信息</Text>
          :
          <ListView
            renderHeader={this._renderHeader.bind(this)}
            scrollEnabled={true}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            enableEmptySections={true}
          />
        }


        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="备注" onPress={() => {this.markThePost(code,postNum,name)}}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          {
            !this.state.collected ?
            <ActionButton.Item buttonColor='#FFCC22' title="收藏" onPress={() => {this.addCollect(code,postNum,name,this.state.markText,logo)}}>
              <Icon name="ios-star-outline" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            :
            <ActionButton.Item buttonColor='#FFCC22' title="取消收藏" onPress={() => {this.cancelCollect(code,postNum)}}>
              <Icon name="ios-star" style={[styles.actionButtonIcon,{color:'red'}]} />
            </ActionButton.Item>
          }

        </ActionButton>
        </components.Layout>
      )
    }

    _renderRow(rowData,rowID,sectionID) {
      return(
        <View style={styles.cellContainer}>
          <View style={styles.timeview}>
            {
              sectionID == 0 ?
                <Text style={[styles.time,{color:'black'}]}>{rowData.AcceptTime.substr(10,8)}</Text>
                :
                <Text style={styles.time}>{rowData.AcceptTime.substr(10,8)}</Text>
            }
            <Text style={styles.date}>{rowData.AcceptTime.substring(0,9)}</Text>
            {
              sectionID == this.state.datas.length -1  ?
              <View style={[styles.sep,{opacity:0}]}></View>
              :
              <View style={styles.sep}></View>
            }
          </View>
          {
            sectionID == 0 ?
            <View style={{width:SCREEN_WIDTH - 100}}>
              <Text selectable={true} numberOfLine={3} style={[styles.station,{color:COLOR.theme}]}>{rowData.AcceptStation}</Text>
              <Text selectable={true} style={[styles.remark,{color:COLOR.theme}]}>{rowData.Remark ? '标记:' + rowData.Remark : ''}</Text>
            </View>
            :
            <View style={{width:SCREEN_WIDTH - 100}}>
              <Text  selectable={true} numberOfLine={3} style={styles.station}>{rowData.AcceptStation}</Text>
              <Text  selectable={true} style={styles.remark}>{rowData.Remark ? '标记:' + rowData.Remark : ''}</Text>
            </View>
          }
        </View>
      )
    }
    _renderHeader(){
      return(
        <View style={styles.headerview}>
          <View style={styles.headerTop}>
            <StateView currentState={this.state.currentState} State={1} name="ios-checkmark-circle-outline" title={'已发货'}/>
            <View style={{width:SCREEN_WIDTH/4,height:1,backgroundColor:'#aaa',borderRadius:3,marginTop:22}}></View>
            <StateView currentState={this.state.currentState} State={2} name="ios-checkmark-circle-outline" title={'运输中'}/>
            <View style={{width:SCREEN_WIDTH/4,height:1,backgroundColor:'#aaa',borderRadius:3,marginTop:22}}></View>
            {
              this.state.currentState == 4 ?
              <StateView currentState={this.state.currentState} State={4} name="ios-help-circle-outline" title={'问题件'}/>
              :
              <StateView currentState={this.state.currentState} State={3} name="ios-checkmark-circle-outline" title={'已签收'}/>

            }


          </View>
          <View style={{height:10,backgroundColor:'#DDDDDD'}}></View>
        </View>
      )
    }

/**
 * 加入收藏
 */
 addCollect(code,postNum,name,remark,logo){
   this.setState({
      collected:true
   });

  var model = {
    name:name,
    code:code,
    postNum:postNum,
    remark:remark,
    logo:logo
  };

  var id = code +  postNum;

  //收藏
  storages.ExpressStorage.collectOneCollect(id,model);

 }

 /**
  * 取消收藏
  */
 cancelCollect(code,postNum){
   this.setState({
      collected:false
    });
    var id = code +  postNum;
    storages.ExpressStorage.removeOneCollect(id);
 }

 /**
  * 跳转到修改备注
  * @param  {[type]} code    快递公司code
  * @param  {[type]} postNum 快递单号
  * @param  {[type]} name    快递公司名称
  * @return {[type]}
  */
 markThePost(code,postNum,name) {
   const { navigate } = this.props.navigation;
   if (!this.state.collected) {
     alert('备注功能在收藏之后开启!');
     return;
   }
   navigate('RemarkName',{
     isVisible:true,
     title:'快递备注',
     code:code,
     name:this.state.markText ? this.state.markText : name ,
     postNum:postNum
   });
 }
}

const StateTitleView = ({currentState,State,title}) => {
  return(
    currentState == State
    ?
    <Text style={[styles.stateStyle,{color:'red'}]}>{title}</Text>
    :
    <Text style={styles.stateStyle}>{title}</Text>
  )
}

const StateIconView = ({currentState,State}) => {

    if (State == 4) {
      return(
        <View  style={{flexDirection:'row'}}>
          <View style={{width:SCREEN_WIDTH/6-25,height:2,backgroundColor:'#aaa',borderRadius:3}}></View>
            <Icon name="ios-help-circle-outline" size={25} color='red' style={{marginLeft:10,marginRight:10,marginTop:-13}}></Icon>
          <View style={{width:SCREEN_WIDTH/6-25,height:2,backgroundColor:'#aaa',borderRadius:3}}></View>
        </View>
      )
    }else {
      return(
        <View  style={{flexDirection:'row'}}>
          <View style={{width:SCREEN_WIDTH/6-25,height:2,backgroundColor:'#aaa',borderRadius:3}}></View>
          {
            currentState == State
            ?
            <Icon name="ios-checkmark-circle-outline" size={25} color={COLOR.theme} style={{marginLeft:10,marginRight:10,marginTop:-13}}></Icon>
            :
            <Icon name="ios-checkmark-circle-outline" size={25} color={'#aaa'} style={{marginLeft:10,marginRight:10,marginTop:-13}}></Icon>
          }
          <View style={{width:SCREEN_WIDTH/6-25,height:2,backgroundColor:'#aaa',borderRadius:3}}></View>
        </View>

      )
    }
}


const StateView = ({currentState,State,name,title}) => {
  return(
    currentState == State
    ?
    <View style={{alignItems:'center'}}>
      <Text style={[styles.stateStyle,{color:COLOR.theme}]}>{title}</Text>
      <Icon name={name} size={25} color='red'/>
    </View>
    :
    <View style={{alignItems:'center'}}>
      <Text style={styles.stateStyle}>{title}</Text>
      <Icon name={name} size={25} color={'#aaa'} />
    </View>
  )
}




const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  top:{
    backgroundColor:'red',
    height:80,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  headerview:{
    height:100,
  },
  headerTop:{
    height:80,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginLeft:20,
    marginRight:20
  },
  cellContainer:{
    flexDirection:'row'
  },
  timeview:{
    margin:15,
    alignItems:'center'
  },
  time:{
    fontSize:16,
    color:'#aaa'
  },
  date:{
    fontSize:13,
    color:'#aaa'
  },
  sep:{
    width:0.5,
    height:20,
    marginTop:10,
    backgroundColor:'#aaa'
  },
  station:{
    marginTop:20,
    paddingRight:10,
    marginBottom:10,
    color:'#aaa'
  },
  remark:{
    marginTop:5,
    fontSize:13,
    color:'#aaa'
  },
  stateStyle:{
    color:'#aaa',
    fontSize:14,
    textAlign:'center',
    marginBottom:10
  },
  actionButtonIcon: {
   fontSize: 20,
   height: 22,
   color: 'white',
 },
})
