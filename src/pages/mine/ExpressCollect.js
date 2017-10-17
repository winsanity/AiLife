import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  RefreshControl
} from 'react-native';

import {COLOR,SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM,KUAIDIBIRD} from '../../config'
import * as components from '../../components'
import * as storages from '../../storage'

/**第三方**/
import Swipeout from 'react-native-swipeout';

 export default class ExpressCollect extends Component {

   static navigationOptions = ({ navigation }) => ({

     headerRight: (
       <Text  style={{fontSize:16,marginRight:10,marginTop:2}} onPress={() => {
         navigation.state.params.clearAll();
       }}>清空</Text>

     )
   });

  constructor(props) {
    super(props);

    this.state={
      datas:[],
      loadedData:false,
      isRefreshing:true,
      isVisible:false
    }

  this.onClearSelected = this.onClearSelected.bind(this);

  }

  componentDidMount(){
    this.props.navigation.setParams({clearAll: this.onClearSelected });
    this._loadAllData();
  }

  _loadAllData(){
    this.setState({
      isRefreshing:true
    })
    storages.ExpressStorage.loadAllCollectedExpress().then((models) => {
      this.setState({
        datas:models,
        loadedData:true,
        isRefreshing:false,
        isVisible:false
      });
    })
  }

  onClearSelected(){

    if (this.state.datas.length === 0) {
      alert('暂没有数据！')
      return;
    }
    this.setState({
      isVisible:true
    })
  }

  render(){
    return(
      <components.Layout>
        <FlatList
          data={this.state.datas}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={this._keyExtractor.bind(this)}
          ItemSeparatorComponent={this._renderSep.bind(this)}
          getItemLayout={(data,index) => ({length:70,offset:70.5*index,index})}
          refreshControl={
           <RefreshControl
             refreshing={this.state.isRefreshing}
             onRefresh={() => {this._loadAllData()}}
             tintColor="#ff0000"
             title="加载中..."
             titleColor="#ff0000"
             colors={['#ff0000', '#00ff00', '#0000ff']}
             progressBackgroundColor="#ffff00"
           />
         }
        />
        <components.CommonModal
          isVisible={this.state.isVisible}
          confirmAction={() => this.clearCollectedMovies()}
        />
      </components.Layout>

    )
  }

  _renderItem({item,index}) {

    const {navigate} = this.props.navigation;
    return (
      <Swipeout
        right={[{
          text:'删除',
          backgroundColor:'red',
          color:'white',
          onPress:() => {this._removeCell(item)}
        }]}
        scroll={event => console.log('scroll event') }
      >
        <TouchableWithoutFeedback onPress={() => navigate('SearchDetail',{
          isVisible:true,
          title:'物流详情',
          code:item.code,
          name:item.name,
          logo:item.logo,
          postNum:item.postNum
        })}>
          <View style={styles.cell} >
            <Image source={{uri:KUAIDIBIRD.LogoBaseUrl+item.logo}} style={styles.logo}/>
            <View>
              <Text style={styles.commonText}>{item.remark ? `${item.remark}(${item.name})` : item.name}</Text>
              <Text style={styles.commonText}>{`单号:${item.postNum}`}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Swipeout>
    );
  }

  //此函数用于为给定的item生成一个不重复的key
  _keyExtractor = (item, index) => item.code + item.postNum;

  _renderSep() {
    return (
      <View style={styles.sep}></View>
    )
  }

  _removeCell(item) {
    storages.ExpressStorage.removeOneCollect(item.code+item.postNum);
    this._loadAllData();
  }

  clearCollectedMovies() {
    this.setState({
      isVisible:false
    })

    storages.ExpressStorage.clearAllCollectedExpress();
    this._loadAllData();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  sep:{
    width:SCREEN_WIDTH-10,
    height:0.5,
    backgroundColor:'#DDDDDD',
    marginLeft:5,
    marginRight:5
  },
  cell:{
    width:SCREEN_WIDTH,
    height:60,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white'
  },
  logo:{
    width:50,
    height:50,
    margin:5,
    borderRadius:3
  },
  commonText:{
    fontSize:16,
    margin:5
  }
});
