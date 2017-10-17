/**
 * AiLife
 * 电影详情
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
   ScrollView
 } from 'react-native';

 import * as components from '../../components'
 import {COLOR,SCREEN_WIDTH,SYSTEM,DOUBAN} from '../../config'
 import * as networks from '../../networks'
 import * as storages from '../../storage'

 import *as wechat from 'react-native-wechat'

 export default class MovieDetail extends Component {
   constructor(props) {
     super(props);
     this.state={
       loadedData:false,
       subject:undefined,
       collected:false,
       modalisVisible:false
     }
   }



   componentDidMount() {
      const {state: {params: {movie_id}}} = this.props.navigation;

     this._getListData(movie_id);
     storages.MovieStorage.loadOneCollectedMovie(movie_id).then((subject) => {
       if (subject) {
         this.setState({
           collected:true
         })
       }
     })
   }


   _getListData(id) {


     fetch(DOUBAN.KBaseUrl+DOUBAN.APIS.movie_subject+id).then((response) =>
       response.json()).then((responseJson) => {
         if (responseJson.id) {
           this.setState({
             loadedData:true,
             subject:responseJson
           })
         }
    })
   }

   render(){

     var subject = this.state.subject
     const {navigate} = this.props.navigation

     return (
       <components.Layout>
         {
           this.state.loadedData ?
           <ScrollView>
             <View style={styles.top}>
               {
                 subject.images.large ?
                 <Image source={{uri:subject.images.large}} style={styles.movieImage}/>
                 :
                 <View style={styles.movieImage}></View>
               }

               <View style={styles.topMiddle}>
                 <Text style={[styles.title,{flex:1}]}>{`【 ${subject.title} 】`}</Text>
                 <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center'}}>
                   <View style={{width:(SCREEN_WIDTH-120)/2}}>
                     <Text style={[styles.commonText,{marginTop:5}]}>{` 原名: ${subject.original_title}`}</Text>
                     <Text style={[styles.commonText,{marginTop:15}]}>{` 年份: ${subject.year}年`}</Text>
                   </View>
                   <View style={{width:(SCREEN_WIDTH-120)/2,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                    <Text style={{color:'#aaa',fontSize:11}}>豆瓣评分:</Text>
                    <Text style={{color:'red',fontSize:20,paddingLeft:2,fontFamily:'Cochin',fontWeight:'bold'}}>{subject.rating.average}</Text>
                   </View>

                 </View>
                 <View style={[styles.genres,{flex:1,marginTop:15}]}>
                   {subject.genres.map((item,i) => {
                     return (
                       <View style={styles.genre} key={i}>
                        <Text style={styles.genreText}>{item}</Text>
                       </View>

                     )
                   })}
                 </View>

               </View>
             </View>
             <components.SepLine />
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.commonText,{margin:5}]}>导演:</Text>
              <View style={{flexDirection:'row'}}>
                {
                  subject.directors[0]
                  ?
                  subject.directors.map((item,i) => {
                    return (
                        <Text key={i} style={[styles.commonText,{margin:5}]} onPress={() => {
                          navigate('MoviePeopleInfo',{
                            isVisible:true,
                            title:'影人信息',
                            celebrity_id:item.id
                          })
                        }}>{item.name}</Text>
                    )
                  })
                  :
                  <Text style={[styles.commonText,{margin:5}]}>无</Text>
                }
              </View>
            </View>
             <components.SepLine />
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.commonText,{margin:5}]}>主演:</Text>
              {
                subject.casts[0] ?
                subject.casts.map((item,i) => {
                  return (
                      <AvatarView key={i} cast={item} callback={() => navigate('MoviePeopleInfo',{
                        isVisible:true,
                        title:'影人信息',
                        celebrity_id:item.id
                      })}/>
                  )
                })
                :
               <Text style={[styles.commonText,{margin:5}]}>无</Text>

              }
            </View>
            <components.SepLine />
            <Text style={{marginLeft:5,fontSize:16,color:'red'}}>简介:</Text>
            <Text style={{margin:5,height:200,fontSize:15}} selectable={true} numberOfLines={11}>{subject.summary}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View></View>
              <Text style={{margin:5,color:'#55AA00'}} onPress={() =>{
                navigate('WebView',{
                  isVisible:false,
                  title:subject.title,
                  url:subject.alt,
                })
              }}>去豆瓣电影查看详情</Text>
            </View>
            <components.SepLine />
            <View style={{flexDirection:'row',marginTop:5,marginBottom:5}}>
              {
                this.state.collected ?
                <ActionBtn title='取消收藏' color='#40E0D0' name='star' callback={() => {
                  this._collectTheMovie(this.state.subject.id);
                }}/>
                :
                <ActionBtn title='收藏' color={COLOR.theme} name='star' callback={() => {
                  this._collectTheMovie(this.state.subject.id);
                }}/>
              }

              <ActionBtn title='分享' color='#5599FF' name='share' callback={ () => {
                this.shareBtnClick();
              }}/>

            </View>
           </ScrollView>
           :
           <components.LoadingView />
         }

         <components.ShareModal
           isVisible={this.state.modalisVisible}
           title='分享电影'
           wxMomentAction={() => this.shareToTimeline()}
           wechatAction={() => this.shareToSession()}
         />
       </components.Layout>
     )

   }

   _collectTheMovie(id) {

    if (this.state.collected) {
       storages.MovieStorage.removeOneCollectedMovie(id);
       alert('取消收藏成功!');
       this.setState({
         collected:false
       })

    } else {
        storages.MovieStorage.collectOneMovie(id,this.state.subject);
        alert('收藏成功!');
        this.setState({
          collected:true
        })
    }

   }

   shareBtnClick() {

     this.setState({
       modalisVisible:true
     })

   }

 /**
  * 分享到微信好友
  * @return {[type]} [description]
  */
   shareToSession() {
     wechat.isWXAppInstalled()
    .then( ( isInstalled ) => {
         if ( isInstalled ) {
     wechat.shareToSession({
     type: 'news',
     title: '分享了一部电影',
     description: this.state.subject.title,
     mediaTagName: 'url',
     messageAction: undefined,
     messageExt: undefined,
     webpageUrl: this.state.subject.alt
   });

   this.setState({
     modalisVisible:false
   });
         } else {
           alert( '没有安装微信软件，请您安装微信之后再试' );
         }
     } );
   }

/**
 * 分享到微信朋友圈
 * @return {[type]} [description]
 */
   shareToTimeline(){
     wechat.isWXAppInstalled()
    .then( ( isInstalled ) => {
         if ( isInstalled ) {
           wechat.shareToTimeline({
             type: 'news',
             title: '分享了一部电影',
             description: this.state.subject.title,
             mediaTagName: 'url',
             messageAction: undefined,
             messageExt: undefined,
             webpageUrl: this.state.subject.alt
   });
   this.setState({
     modalisVisible:false
   })
         } else {
           alert( '没有安装微信软件，请您安装微信之后再试' );
         }
     } );
   }
 }

 const AvatarView = ({cast,callback}) => {
   return (
     <TouchableOpacity onPress={callback}>
       <View style={{margin:5,alignItems:'center'}}>
         {
           cast.avatars ?
           <Image source={{uri:cast.avatars.large}} style={{width:60,height:60,borderRadius:30}}/>
           :
           <View style={{width:60,height:60,borderRadius:30}}></View>
         }
         <Text style={{fontSize:10,textAlign:'center',marginTop:2}}>{cast.name}</Text>
       </View>
     </TouchableOpacity>
   )
 }

 const ActionBtn = ({title,color,callback,name}) => {
   return (
     <View style={{width:SCREEN_WIDTH/2,height:40,alignItems:'center'}}>
       <TouchableOpacity onPress={callback}>
         <View style={{width:SCREEN_WIDTH/2-40,height:40,borderRadius:5,backgroundColor:color,flexDirection:'row',alignItems:'center'}}>
           <Text style={{width:SCREEN_WIDTH/4-20,height:14,textAlign:'right',color:'white'}}>{title}</Text>
           <components.Icon name={name} style={{fontSize:20,color:'white'}}/>
         </View>
       </TouchableOpacity>
     </View>
   )
 }

 const styles = StyleSheet.create({
   top:{
     flexDirection:'row',
     alignItems:'center'
   },
   movieImage:{
     width:100,
     height:130,
     margin:5
   },
   topMiddle:{
     justifyContent:'center',
     margin:5
   },
   title:{
     color:'red',
     fontSize:18
   },
   commonText:{
     color:'#aaa',
     fontSize:15
   },
   genres:{
     flexDirection:'row'
   },
   genre:{
     width:60,
     height:22,
     backgroundColor:'#B088FF',
     margin:5,
     borderRadius:5,
   },
   genreText:{
     width:50,
     height:16,
     marginTop:3,
     textAlign:'center',
     color:'white',
     alignSelf:'center'
   }
 })
