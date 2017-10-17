/**
 *  电影首页
 */


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AlertIOS,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  RefreshControl
} from 'react-native';

import * as components from '../../components'
import {COLOR,SCREEN_WIDTH,SYSTEM,DOUBAN} from '../../config'
import * as networks from '../../networks'
import * as storages from '../../storage'

/**第三方**/
import Toast from 'react-native-root-toast'

/****两个热门搜索先写死****/
var hotMovies = ['肖申克的救赎','变形金刚','阿甘正传'];
var hotLabels = ['喜剧','剧情','科幻','动画','动作','古装'];

 export default class MovieMain extends Component {

   static navigationOptions = {
     header:null
  };

  constructor(props) {
    super(props);

    this.state={
      loadedData:false,
      isRefreshing:true,
      navOpacity:0,
      theathers:undefined,
      comings:undefined,
      modalVisible:false,
      stringSearch:true,
      historyList:[ ],
      searchText:'',
    }

  }

/****lifecycle****/
componentDidMount(){
  this.loadMoviesInTheathers();
  this._reloadSearchList();

}


/*********网络加载********/

/**
 * 正在上映
 * @param  {[type]} city 城市名或城市id
 * @return {[type]}      [description]
 */
loadMoviesInTheathers(){
  networks.DBMovieApi.loadMoviesInTheathers().then((responseJson) => {
    if (responseJson.count) {
      this.setState({
        theathers:responseJson.subjects
      })
      this.loadComingsoonMovies();
    }

  }).catch((error) => {
    alert(error);
  })
}

loadComingsoonMovies() {
  networks.DBMovieApi.loadComingsoonMovies().then((responseJson) => {
    if (responseJson.count) {
      this.setState({
        loadedData:true,
        comings:responseJson.subjects,
        isRefreshing:false
      })
    }
  }).catch((error) => {
    alert(error);
  })
}

  render(){

   const {navigate} = this.props.navigation;

    return(
      this.state.loadedData ?
      <components.Layout>
        <Modal
              animationType={"fade"}
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {alert("Modal has been closed.")}}
              >
          {
            this.renderSearchModal()
          }

        </Modal>
        <ScrollView
          ref="scrollview"
          scrollEventThrottle={5}
          onScroll={ (e)=> this.onAnimationEnd(e)}
          refreshControl={
           <RefreshControl
             refreshing={this.state.isRefreshing}
             onRefresh={() => {this.loadMoviesInTheathers()}}
             tintColor="#ff0000"
             title="加载中..."
             titleColor="#ff0000"
             colors={['#ff0000', '#00ff00', '#0000ff']}
             progressBackgroundColor="#ffff00"
           />
         }
          >
          <Image source={require('../../sources/movie_banner.png')} style={{width:SCREEN_WIDTH,height:180,marginBottom:5}}/>
          <SectionSep title="正在热映" name="flare" more='全部' callback={() => {
            navigate('MovieHotLine',{
              isVisible:true,
              title:'正在热映',
              datas:this.state.theathers
            })
          }}/>
          <ScrollView
            horizontal={true}
            >
              {
                this.state.theathers.slice(0,10).map((item,i) => {
                  return(
                    <TouchableOpacity key={i} onPress={() => {
                      navigate('MovieDetail',{
                        isVisible:true,
                        title:'影片信息',
                        movie_id:item.id
                      })
                    }}>
                      <View style={{width:110,height:160}}>
                        <Image source={{uri:item.images.large}} style={{width:100,height:150,margin:5}}/>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
              <TouchableOpacity onPress={() => {
                navigate('MovieHotLine',{
                  isVisible:true,
                  title:'正在热映',
                  datas:this.state.theathers
                })
              }}>
                <View style={{width:110,height:160}}>
                  <Image source={require('../../sources/movie_more.png')} style={{width:100,height:150,margin:5}}/>
                </View>
              </TouchableOpacity>
          </ScrollView>
          <SectionSep title="豆瓣榜单" name="poll" />
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity onPress={() => this.switchToDouBanRank(0)}>
              <Image source={require('../../sources/list1.png')} style={styles.listImage}/>
              <Text style={styles.listTitle}>Top250</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.switchToDouBanRank(1)}>
              <Image source={require('../../sources/list3.png')} style={styles.listImage}/>
              <Text style={styles.listTitle}>北美票房榜</Text>
            </TouchableOpacity>
          </View>
          <SectionSep title="即将上映" name="query-builder" callback={() => navigate('MovieComingsoon',{
            isVisible:true,
            title:'即将上映'
          })} more='更多'/>
          {
            this.state.comings.slice(0,10).map((item,i) =>{
              return (
                <ComingMovieView subject={item} key={i} navigate={navigate}/>
              )
            })
          }
        </ScrollView>
        {
          this.renderNavBar()
        }
      </components.Layout>
      :
      <components.Layout>
        <components.LoadingView />
      </components.Layout>

    )
  }


  renderNavBar(){
    return(

      <View style={[styles.navBar,{opacity:this.state.navOpacity}]}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:63.5}}>
        <View style={styles.search}>
        </View>
        <Text style={styles.title}>电影</Text>
        <TouchableOpacity onPress={() =>  {
          if (this.state.navOpacity !==0) {
            this.setState({modalVisible:true})}
          }
        }
        >
          <View style={styles.search}>
            <components.Icon name='search' style={{color:'black',fontSize:22,marginLeft:SCREEN_WIDTH/3-30}}/>
          </View>
        </TouchableOpacity>
        </View>
        <View style={{width:SCREEN_WIDTH,height:0.5,backgroundColor:'#DDDDDD'}}></View>
      </View>

    )
  }

onAnimationEnd(e) {
  var offSetY = e.nativeEvent.contentOffset.y;
   var  opacity = offSetY / 64;
   this.setState({
     navOpacity:opacity
   });
}

switchToDouBanRank(initialPage) {

  const {navigate} = this.props.navigation;
  navigate('DouBanRank',{
    isVisible:true,
    title:'豆瓣榜单',
    initialPage:initialPage
  })
}

renderSearchModal(){
  return (
    <ScrollView>
    <View style={styles.top}>
      <View style={styles.searchBar}>
        <components.Icon name='search' style={{fontSize:18,marginLeft:10}}/>
        <TextInput
          ref='textInput'
          style={styles.textInput}
          onChangeText={(text) => this.setState({searchText:text}) }
          placeholder='输入您想搜索的内容(不能包含_字符)'
          returnKeyType='search'
          onSubmitEditing={() => this.beginSearch()}
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
      <Text style={styles.cancelSearch} onPress={() => this.setState({modalVisible:false})}>取消</Text>
    </View>
    <components.SepLine />
    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:10}}>
      <Text style={{width:SCREEN_WIDTH-100,color:'red'}} numberOfLines={2}>!!!友情提示:默认按照影名或人名搜索，如需标签搜索，为了精确选中右方圆圈</Text>
      {
        this.state.stringSearch ?
        <TouchableOpacity onPress={() => this.setState({stringSearch:false})}>
          <components.Icon name='radio-button-unchecked' style={{fontSize:22,color:'#aaa',margin:10}}/>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => this.setState({stringSearch:true})}>
          <components.Icon name='radio-button-checked' style={{fontSize:22,color:'red',margin:10}}/>
        </TouchableOpacity>
      }
    </View>
    <components.SepLine />
    {
      this.state.historyList.length > 0
      ?
      <ScrollView style={{width:SCREEN_WIDTH,height:120}}>
        <Text style={{fontSize:16,color:'#aaa',textAlign:'center'}} onPress={() => this._removeAllHistory()}>清空搜索历史</Text>
        {
        this.state.historyList.map((item,i) => {
          return (
            <HistoryItem item={item} callback={() => this.swithToMovieSearchList(item,false)} key={i} removeCallBack={() => this._removeOneHistory(item)}/>
          )
        })
       }
      </ScrollView>
      :
      <Text style={{fontSize:16,margin:5,color:'#aaa'}}>暂无搜索历史</Text>
    }
    <components.SepLine />
    <Text style={{fontSize:15,margin:5,color:'red'}}>热门搜索</Text>
    <View style={{flexDirection:'row'}}>
      {
        hotMovies.map((item,i) =>{
          return (
            <HotSingle title={item} key={i} callback={() => this.swithToMovieSearchList(item,false)}/>
          )
        })
      }
    </View>
    <components.SepLine />
    <Text style={{fontSize:15,margin:5,color:'red'}}>热门标签</Text>
    <View style={{flexDirection:'row'}}>
      {
        hotLabels.map((item,i) => {
          return (
            <HotSingle title={item} key={i} callback={() => this.swithToMovieSearchList(item,true)}/>
          )
        })
      }
    </View>
  </ScrollView>
  )
}

beginSearch(){
  if (this.state.searchText === '') {
    Toast.show('搜索条件不能为空',{
      duration:Toast.durations.SHORT,
      position:SYSTEM.iOS ? Toast.positions.CENTER : Toast.positions.BOTTOM,
      shadow:true,
      animation:true
    });
  }else {
    if (this.state.stringSearch) {
      this.swithToMovieSearchList(this.state.searchText,false);
    } else {
      this.swithToMovieSearchList(this.state.searchText,true);
    }
  }
}

swithToMovieSearchList(name,isLabelSearch) {

  if (name.indexOf('_') >= 0) {
    alert('请不要包含_字符');
    return;
  }

  this.setState({
    modalVisible:false
  })

  const {navigate} = this.props.navigation;


  storages.MovieStorage.saveMovieSearchHistory(name);

  this._reloadSearchList();

  navigate('MovieSearchList',{
   isVisible:true,
   title:'搜素结果',
   searchText:name,
   isLabelSearch:isLabelSearch
  })
}

_reloadSearchList(){
  storages.MovieStorage.loadAllMovieSearchHistory().then((response) =>{
    this.setState({
      historyList:response
    })
  }).catch((error) => {
    console.error();
  })
}

_removeOneHistory(name) {
  storages.MovieStorage.removeOneMovieSearchHistory(name);
  this._reloadSearchList();
}

_removeAllHistory() {
  storages.MovieStorage.removeAllMovieSearchHistory();
  this.setState({
    historyList:[]
  })
}

}

const HotSingle = ({title,callback}) => {
  return (
    <TouchableOpacity onPress={callback}>
     <View style={{height:20,backgroundColor:COLOR.theme,margin:5}}>
      <Text style={{padding:3,color:'white'}}>{title}</Text>
     </View>
    </TouchableOpacity>
  )
}

const HistoryItem = ({item,callback,removeCallBack}) => {
  return (
    <TouchableOpacity onPress={callback}>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:5,marginBottom:5}}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <components.Icon name='query-builder' style={{fontSize:18,color:'#aaa',marginLeft:5}}/>
        <Text style={{fontSize:16,marginLeft:20}}>{item}</Text>
      </View>
        <TouchableOpacity onPress={removeCallBack}>
          <components.Icon name='close' style={{fontSize:18,color:'#aaa',marginRight:10}} />
        </TouchableOpacity>
    </View>
    <components.SepLine />
  </TouchableOpacity>
  )
}

 const SectionSep = ({name,title,more,callback}) => {
   return (
     <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:COLOR.theme,height:30}}>
       <View style={{flexDirection:'row',marginLeft:10,alignItems:'center'}}>
         <components.Icon name={name} style={{color:'white',fontSize:20}}/>
         <Text style={{paddingLeft:10,alignItems:'center',color:'white'}}>{title}</Text>
       </View>
       {
         callback ?
          <Text style={{paddingRight:10,color:'white'}} onPress={callback}>{`${more}>>`}</Text>
          :
          null
       }

     </View>
   )
 }

const ComingMovieView = ({subject,navigate}) => {
  return (
    <TouchableWithoutFeedback onPress={() =>navigate('WebView',{
      isVisible:false,
      title:subject.title,
      url:subject.alt
    })}>
      <View>
        <View style={{flexDirection:'row',justifyContent:'space-between',margin:5}}>
          <Text style={{fontSize:16}}>{`【 ${subject.title} 】`}</Text>
          <View style={{flexDirection:'row',width:60,alignItems:'center'}}>
            <components.Icon name='remove-red-eye' style={{fontSize:18,color:'#aaa'}}/>
            <Text style={{fontSize:13,color:'#aaa',paddingLeft:2}}>{subject.collect_count}</Text>
          </View>
        </View>
        <View style={{flexDirection:'row',marginLeft:10}}>
          <Text style={{color:'#aaa'}}>导演：</Text>
          <Text style={{color:'black'}} onPress={() => navigate('MoviePeopleInfo',{
            isVisible:true,
            title:'影人信息',
            celebrity_id:subject.directors[0].id
          })}>{`${subject.directors[0].name}`}</Text>
        </View>
        <View style={{flexDirection:'row',marginLeft:10}}>
          <Text style={{color:'#aaa',marginTop:5}}>主演：</Text>
          {
            subject.casts.map((item,i) => {
              return(
                <AvatarView cast={item} callback={() => navigate('MoviePeopleInfo',{
                  isVisible:true,
                  title:'影人信息',
                  celebrity_id:item.id
                })} key={i}/>
              )
            })
          }
        </View>
        <View style={{width:SCREEN_WIDTH,height:0.5,backgroundColor:'#DDDDDD'}}></View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const AvatarView = ({cast,callback}) => {
  return (
    <TouchableOpacity onPress={callback}>
      <View style={{margin:10,alignItems:'center'}}>
        <Image source={{uri:cast.avatars.large}} style={{width:60,height:60,borderRadius:30}}/>
        <Text style={{fontSize:10,textAlign:'center',marginTop:2}}>{cast.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  navBar:{
    position:'absolute',
    width:SCREEN_WIDTH,
    height:64,
    backgroundColor:'white',
    top:0,
    zIndex:1
  },
  title:{
    fontSize:SYSTEM.iOS ? 18 :20,
    color:'black',
    alignSelf:'center',
    width:SCREEN_WIDTH/3,
    marginTop:20,
    textAlign:'center',
    fontFamily:'Verdana',
    fontWeight: 'bold'
  },
  search:{
    width:SCREEN_WIDTH/3,
    marginTop:20,
    alignSelf:'center',
  },
  bannerSingle:{
    width:SCREEN_WIDTH,
    height:200
  },
  bannerImage:{
    width:SCREEN_WIDTH,
    height:200
  },
  bannTitle:{
    position:'absolute',
    width:SCREEN_WIDTH,
    fontSize:16,
    color:'white',
    zIndex:1,
    bottom:50,
    left:10
  },
  listImage:{
    width:(SCREEN_WIDTH - 20)/2,
    height:100,
    margin:5,
    borderRadius:5
  },
  listTitle:{
    position:'absolute',
    top:40,
    width:(SCREEN_WIDTH - 20)/2,
    fontSize:20,
    color:'white',
    backgroundColor:'rgba(1,1,1,0)',
    textAlign:'center'
  },
  top:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white',
    marginTop:20
  },
  searchBar:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:SCREEN_WIDTH - 50,
    height:30,
    borderRadius:4,
    marginTop:5,
    marginBottom:5,
    marginLeft:5,
    marginRight:10,
    backgroundColor:'#DDDDDD'
  },
 imgBtn:{
   width:49,
   height:49,
   marginTop:20
 },
 textInput:{
   marginLeft:10,
   height:30,
   width:SCREEN_WIDTH-110,
   color:'gray',
   fontSize:13,
   backgroundColor:'#DDDDDD'
 },
 cancelSearch:{
   color:COLOR.theme,
   marginRight:5,
   fontSize:15
 }
});
