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
  Keyboard,

} from 'react-native';

/**第三方组件*/
import Toast from 'react-native-root-toast'
import Icon from 'react-native-vector-icons/MaterialIcons'

/**本地快递公司数据json*/
var allCompanyDatas = require('../../localJson/companyData')

import {COLOR,SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM,KUAIDIBIRD} from '../../config'
import * as components from '../../components'


const dismissKeyboard = require('dismissKeyboard');

var SINGLEW = (SCREEN_WIDTH-75)/3

export default class SearchExpress extends Component {

  static navigationOptions =  {

    // headerRight:(
    //   <TouchableOpacity onPress={ () => alert(this.props.navigation)}>
    //     <components.Icon name='search' style={{fontSize:20,color:'white',marginRight:10}}/>
    //   </TouchableOpacity>
    // )

  };

  constructor() {
    super();


    this.state = {
         listsArr:[ ],
         isShowCommon:true,
         showingContent:[ ],
         selectedIndex:0,
         loadedData:false,
         contents:allCompanyDatas[0].company,

         //搜索结果跳转需要
         name:allCompanyDatas[0].company[0].name,   //当前快递公司name 默认顺丰
         logo:allCompanyDatas[0].company[0].logo,  //当前快递公司logo 默认顺丰
         searchText:'',
         currentCode:allCompanyDatas[0].company[0].code     //当前快递公司code 默认顺丰
       }

  }


 componentWillUnmount(){
  dismissKeyboard();
 }

  render() {
    let { state,goBack } = this.props.navigation;
    const {navigate} = this.props.navigation;

    return(
      <components.Layout style={{backgroundColor:'#DDDDDD'}}>
        <View style={styles.top}>
          <View style={styles.searchBar}>
            <components.Icon name='search' style={{fontSize:18,marginLeft:10}}/>
            <TextInput
              ref='textInput'
              style={styles.textInput}
              onChangeText={(text) => this.setState({searchText:text}) }
              placeholder='输入单号,并选择快递公司'
              returnKeyType='search'
              onSubmitEditing={() => this._showResult(navigate)}
            />
            <TouchableOpacity onPress={ () => {
              this.refs.textInput.clear();
              this.setState({
                searchText:''
              })
            }}>
              <components.Icon name='highlight-off' style={{fontSize:18,marginRight:10}}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.beginSearch} onPress={() => this._showResult(navigate)}>搜索</Text>
        </View>
        <ScrollView style={styles.scrollView}>
           {
             allCompanyDatas.map((item,i) => {
               return(
                 <TouchableOpacity
                   key={i}
                   onPress={() => this.setState({selectedIndex:i,contents:item.company})}
                 >
                 {this._renderItemContent(item,i)}
                 </TouchableOpacity>
               )
             })
           }
         </ScrollView>
         <View style={styles.content}>
          <ScrollView style={styles.scrollView_c}>
          <View style={styles.mainContent}>
          {
            this.state.contents.map((item,i) => {
              return(
              <TouchableOpacity key={i} onPress={() => this.setState({currentCode:item.code,name:item.name,logo:item.logo})}>
                <View style={styles.singleActivity}>
                  <Image style={{width:50,height:50,marginTop:10}} source={{uri:KUAIDIBIRD.LogoBaseUrl+item.logo}}></Image>
                  <Text style={{textAlign:'center',marginTop:5,fontSize:14,color:this.state.currentCode === item.code ? 'white' : '#aaa',backgroundColor:this.state.currentCode === item.code ? 'red' :'white' }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
            })
          }
         </View>
        </ScrollView>
       </View>
      </components.Layout>
    )
  }

  _renderItemContent(rowData,rowID){
    return(
      this.state.selectedIndex === rowID ?
      <View style={[styles.cellBgView,{backgroundColor:'white'}]}>
        <View style={{width:5,height:15,backgroundColor:COLOR.theme,borderRadius:2,marginLeft:5}}></View>
        <Text style={[styles.title,{color:'red',width:50}]}>{rowData.title}</Text>
      </View>
      :
      <View style={styles.cellBgView}>
        <Text style={styles.title}>{rowData.title}</Text>
      </View>
    )
  }

  _showResult(navigate){

    if (this.state.searchText === '') {
       Toast.show('请输入运单号',{
         duration:Toast.durations.SHORT,
         position:SYSTEM.iOS ? Toast.positions.CENTER : Toast.positions.BOTTOM,
         shadow:true,
         animation:true
       });
    }else {
      navigate('SearchDetail',{
        isVisible:true,
        title:'物流详情',
        code:this.state.currentCode,
        name:this.state.name,
        logo:this.state.logo,
        postNum:this.state.searchText
      });
    }
  }



}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#DDDDDD'
  },
  top:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#DDDDDD'
  },
  searchBar:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:SCREEN_WIDTH - 50,
    height:25,
    borderRadius:6,
    marginTop:5,
    marginBottom:5,
    marginLeft:5,
    marginRight:10,
    backgroundColor:'white'
  },
 imgBtn:{
   width:49,
   height:49,
   marginTop:20
 },
 textInput:{
   marginLeft:10,
   height:25,
   width:SCREEN_WIDTH-110,
   color:'gray',
   fontSize:13,
   backgroundColor:'white'
 },
 cellBgView:{
   backgroundColor:'#aaa',
   flexDirection:'row',
   alignItems:'center'
 },
 scrollView:{
   backgroundColor:'#DDDDDD',
   height:SCREEN_WIDTH -99,
 },
 title:{
   paddingTop:20,
   paddingBottom:20,
   textAlign:'center',
   width:60
 },
 content:{
   flex:1,
   width:SCREEN_WIDTH - 75,
   height:SCREEN_HEIGHT - 99,
   position:'absolute',
   left:75,
   top:35,
   backgroundColor:'white',
 },
 mainContent:{
   flexDirection:'row',
   flexWrap:'wrap',
   alignItems:'center'
 },
 singleActivity:{
   width:SINGLEW,
   height:SINGLEW,
   alignItems:'center'
 },
 scrollView_c:{
   height:SCREEN_WIDTH - 64.5,

 },
 beginSearch:{
   color:COLOR.theme,
   marginRight:5,
   fontSize:15
 }
})
