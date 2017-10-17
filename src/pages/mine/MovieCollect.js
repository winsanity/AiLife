import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableWithoutFeedback
} from 'react-native';

import * as components from '../../components'
import * as storages from '../../storage'
import {SCREEN_WIDTH} from '../../config'

/**第三方**/
import Swipeout from 'react-native-swipeout';

export default class MovieCollect extends Component {

  static navigationOptions = ({ navigation }) => ({

    headerRight: (
      <Text  style={{fontSize:16,marginRight:10,marginTop:2}} onPress={() => {
        navigation.state.params.clearAll();
      }}>清空</Text>

    )
  });

  constructor() {
    super();

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

 onClearSelected(){

   if (this.state.datas.length === 0) {
     alert('暂没有数据！')
     return;
   }
   this.setState({
     isVisible:true
   })
 }
  _loadAllData(){

    storages.MovieStorage.loadAllCollectedMovies().then((subjects) => {
      this.setState({
        datas:subjects,
        loadedData:true,
        isRefreshing:false,
        isVisible:false
      });
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
          getItemLayout={(data,index) => ({length:140,offset:140.5*index,index})}
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
      <components.MovieItem subject={item} callback={() => {
        navigate('MovieDetail',{
          isVisible:true,
          title:'影片信息',
          movie_id:item.id
        })
      }}/>
      </Swipeout>
    );
  }

  //此函数用于为给定的item生成一个不重复的key
  _keyExtractor = (item, index) => item.id;

  _renderSep() {
    return (
      <View style={styles.sep}></View>
    )
  }

  _removeCell(item) {
    storages.MovieStorage.removeOneCollectedMovie(item.id);
    this._loadAllData();
  }

  clearCollectedMovies() {
    this.setState({
      isVisible:false
    })

    storages.MovieStorage.clearAllCollectedMovie();
    this._loadAllData();
  }

}

const styles = StyleSheet.create({
  sep:{
    width:SCREEN_WIDTH-10,
    height:0.5,
    backgroundColor:'#DDDDDD',
    marginLeft:5,
    marginRight:5
  },
})
