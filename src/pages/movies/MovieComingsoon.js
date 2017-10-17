/**
 * AiLife
 * 即将上映的电影列表
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
   RefreshControl,
   ActivityIndicator,
   TouchableWithoutFeedback
 } from 'react-native';

 import * as components from '../../components'
 import {COLOR,SCREEN_WIDTH,SYSTEM,DOUBAN} from '../../config'

 export default class MovieComingsoon extends Component {
   constructor(props) {
     super(props);

     this.state={
       datas:[],
       isRefreshing:true,
       start:0,
       firstMount:true,
       loadMore:false
     }
   }

  componentDidMount(){
    this._getListData(0);
  }

   _getListData(start) {
     var that = this;
     fetch(`${DOUBAN.KBaseUrl}${DOUBAN.APIS.movie_coming_soon}?start=${start}`).then((response)=>
     response.json()).then((responseJson) =>{

       if (responseJson.count) {
         var datas = [ ];
         if (start == 0) {
           datas = responseJson.subjects
         }else {
           datas = this.state.datas.concat(responseJson.subjects)
         }
         if (datas.length === responseJson.total) {
           alert('无更多数据.')
         }

         that.setState({
           isRefreshing:false,
           datas:datas,
           loadMore:false,
           firstMount:false,
           start:this.state.start+20
         })
       }
     }).then(() => {
       this.setState({
         isRefreshing:false
       })
     })
   }

   render(){

       return(
         <components.Layout>
           <FlatList
             data={this.state.datas}
             renderItem={this._renderItem.bind(this)}
             keyExtractor={this._keyExtractor}
             ItemSeparatorComponent={this._renderSep.bind(this)}
             ListFooterComponent={this._renderListFooter.bind(this)}
             onEndReachedThreshold={0}
             onEndReached={() => this._onEndReached()}
             //getItemLayout={(data,index) => ({length:140,offset:140.5*index,index})}
             refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => { this._getListData(0)}}
                tintColor="#ff0000"
                title="加载中..."
                titleColor="#ff0000"
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffff00"
              />
            }
           />
         </components.Layout>
       )

   }

   //此函数用于为给定的item生成一个不重复的key
   _keyExtractor = (item, index) => item.id;


   _renderItem({item,index}) {

   const {navigate} = this.props.navigation;
     return (
       <TouchableWithoutFeedback onPress={() =>navigate('WebView',{
         isVisible:false,
         title:item.title,
         url:item.alt
       })}>
         <View>
           <View style={{flexDirection:'row',justifyContent:'space-between',margin:5}}>
             <Text style={{fontSize:16,color:COLOR.theme}}>{`【 ${item.title} 】`}</Text>
             <View style={{flexDirection:'row',width:60,alignItems:'center'}}>
               <components.Icon name='remove-red-eye' style={{fontSize:18,color:'#aaa'}}/>
               <Text style={{fontSize:13,color:'#aaa',paddingLeft:2}}>{item.collect_count}</Text>
             </View>
           </View>
           <View style={{flexDirection:'row',marginLeft:10}}>
             <Text style={{color:'#aaa'}}>{item.directors[0] ? '导演:' : ''}</Text>
             <Text style={{color:'black'}} onPress={() => navigate('MoviePeopleInfo',{
               isVisible:true,
               title:'影人信息',
               celebrity_id:item.directors[0].id
             })}>{ item.directors[0] ?`${item.directors[0].name}` :''}</Text>
           </View>
           <View style={{flexDirection:'row',marginLeft:10}}>
             <Text style={{color:'#aaa',marginTop:5}}>{item.casts[0] ? '主演:' :''}</Text>
             {
               item.casts.map((item,i) => {
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
         </View>
       </TouchableWithoutFeedback>
     )
   }

   _renderSep() {
     return (
       <View style={styles.sep}></View>
     )
   }

   _renderListFooter(){
     if (this.state.loadMore) {
       return (
         <LoadingMoreView />
       )
     } else {
       return null
     }
   }

   _onEndReached(){
     if (this.state.firstMount) {

     } else {
       if (this.state.loadMore) {

       } else {
           this.setState({
             loadMore:true
           })
           this._getListData(this.state.start)
       }
     }
   }
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

 const LoadingMoreView = () => {
   return (
       <View style={styles.loadingMore}>
         <View></View>
         <View style={{flexDirection:'row'}}>
           <ActivityIndicator
             animating={true}
             size='small'
           />
           <Text style={{paddingLeft:5,color:'#aaa'}}>加载中...</Text>
         </View>
         <View></View>
       </View>
   )
 }

 const styles = StyleSheet.create({
   sep:{
     backgroundColor:'#aaa',
     width:SCREEN_WIDTH - 10,
     height:0.5,
     marginLeft:5,
     marginRight:5
   },
   loadingMore:{
     flexDirection:'row',
     width:SCREEN_WIDTH,
     height:40,
     alignItems:'center',
     justifyContent:'space-between'
   }
 })
