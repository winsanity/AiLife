/**
 *  快递首页
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
  FlatList,
  RefreshControl
} from 'react-native';



import * as components from '../../components'
import {COLOR,SCREEN_WIDTH} from '../../config'
import * as storages from '../../storage'
import CollectedExpCell from '../../components/common/CollectedExpCell'

 export default class ExpressMain extends Component {
  static navigationOptions = {
    title:'快递',
 };

  constructor(props) {
    super(props);
    this.state={
      datas:[],
      isRefreshing:true
    }

  }

  componentDidMount() {

    this._loadCollectedExpress();
  }

  _loadCollectedExpress() {
       this.setState({
         isRefreshing:true
       })
     storages.ExpressStorage.loadAllCollectedExpress().then((models) => {
       this.setState({
          datas:models,
          isRefreshing:false
       })
     }).catch((error) => {
       alert(error);
     })
  }

  render(){
    return(
        <components.Layout>
          <View style={styles.top}>
            <TouchableOpacity onPress={ () => this.switchToSearchPage()}>
              <View style={styles.single}>
               <Image source={require('../../sources/search.png')} style={styles.image}/>
               <Text  fontWeight={800} style={styles.btnTitle}>搜一搜</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.sep}></View>
            <TouchableOpacity onPress={ () => this.switchToQRcodePage()}>
              <View style={styles.single}>
                <Image source={require('../../sources/scan.png')} style={styles.image}/>
                <Text  fontWeight={800} style={styles.btnTitle}>扫一扫</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.historyMark}>
            <View style={styles.line}></View>
            <Text style={styles.historyTitle}>收藏历史</Text>
            <View style={styles.line}></View>
          </View>

          {
            this.state.datas.length > 0?
            <FlatList
              data={this.state.datas.length >= 5 ? this.state.datas.slice(0,5) : this.state.datas}
              renderItem={this._renderItem.bind(this)}
              keyExtractor={this._keyExtractor.bind(this)}
              ItemSeparatorComponent={this._renderSep.bind(this)}
              ListFooterComponent={this._renderListFooter.bind(this)}
              getItemLayout={(data,index) => ({length:100,offset:100.5*index,index})}
              refreshControl={
               <RefreshControl
                 refreshing={this.state.isRefreshing}
                 onRefresh={() => {this._loadCollectedExpress()}}
                 tintColor="#ff0000"
                 title="加载中..."
                 titleColor="#ff0000"
                 colors={['#ff0000', '#00ff00', '#0000ff']}
                 progressBackgroundColor="#ffff00"
               />
             }
            />
            :
            <ScrollView
              refreshControl={
               <RefreshControl
                 refreshing={this.state.isRefreshing}
                 onRefresh={() => {this._loadCollectedExpress()}}
                 tintColor="#ff0000"
                 title="加载中..."
                 titleColor="#ff0000"
                 colors={['#ff0000', '#00ff00', '#0000ff']}
                 progressBackgroundColor="#ffff00"
               />
             }
              >
              <NoneListView that={this}/>
            </ScrollView>
          }

        </components.Layout>

    )
  }

  //此函数用于为给定的item生成一个不重复的key
  _keyExtractor = (item, index) => item.code + item.postNum;

  _renderItem({item,index}) {
    const {navigate} = this.props.navigation;
    return (
      <CollectedExpCell model={item} callback={() => {
        navigate('SearchDetail',{
          isVisible:true,
          title:'物流详情',
          code:item.code,
          name:item.name,
          logo:item.logo,
          postNum:item.postNum
        })
      }}/>
    )
  }

  _renderSep() {
    return (
      <View style={styles.sepLine}></View>
    )
  }

  _renderListFooter(){
    const {navigate} = this.props.navigation;
    return (
      <Text style={{width:SCREEN_WIDTH-10,margin:5,textAlign:'center',color:'red'}} onPress={() => {
        navigate('ExpressCollect',{
          isVisible:true,
          title:'收藏的快递'
        })
      }}>查看全部>></Text>
    )
  }

  switchToSearchPage(){
    const {navigate} = this.props.navigation;
    navigate('SearchExpress',{
      isVisible:true,
      title:'快递查询',
    })
  }

  switchToQRcodePage(){
    const {navigate} = this.props.navigation;
    navigate('QRCodePage',{
      isVisible:true,
      title:'扫一扫',
    })
  }
}


const NoneListView = ({that}) => {
  return (
    <ScrollView>
      <Image source={require('../../sources/empty.png')} style={styles.emptyImage}/>
      <Text style={styles.emptyText}>空空如叶</Text>
      <components.Button title={'去搜索心爱的快递吧～'} style={{height:40}} callback={() => {
        that.switchToSearchPage();
      }}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  top:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  image:{
    width:60,
    height:60,
    margin:30
  },
  sep:{
    height:120,
    width:0.5,
    backgroundColor:'#aaa',
    marginTop:20
  },
  single:{
    alignItems:'center'
  },
  btnTitle:{
    fontSize:16,
    color:COLOR.theme,
    textAlign:'center'
  },
  historyMark:{
    margin:20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  line:{
    width:(SCREEN_WIDTH - 100)/2,
    height:0.5,
    backgroundColor:'#aaa'
  },
  historyTitle:{
    fontSize:13,
    color:'#aaa'
  },
  emptyImage:{
    width:SCREEN_WIDTH,
    height:150
  },
  emptyText:{
    width:SCREEN_WIDTH,
    textAlign:'center',
    marginTop:20,
    marginBottom:20
  },
  sepLine:{
    margin:5,
    backgroundColor:'#aaa',
    width:SCREEN_WIDTH - 10,
    height:0.5
  }
});
