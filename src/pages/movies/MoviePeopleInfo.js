/**
 * AiLife
 * 影人详情
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

 export default class MoviePeopleInfo extends Component {
   constructor(props) {
     super(props);

     this.state={
       loadedData:false,
       subject:undefined
     }
   }

   componentDidMount(){
     this._getListData()
   }

   _getListData(){

   const {state:{params:{celebrity_id}},goBack} = this.props.navigation;

   if (celebrity_id === null) {
     alert('没有相关信息');
     setTimeout(function () {
       goBack();
     }, 10);
     return;
   }


     fetch(DOUBAN.KBaseUrl+DOUBAN.APIS.movie_celebrity+celebrity_id).then((response) =>
       response.json()).then((responseJson) => {
         if (responseJson.id) {
           this.setState({
             loadedData:true,
             subject:responseJson
           })
         }
    }).catch((error) => {
      alert(error)
    })

   }

   render() {

     var subject = this.state.subject

     const {navigate} = this.props.navigation

     return (
       <components.Layout>
         {
           this.state.loadedData
           ?
           <ScrollView>
             <View style={styles.top}>
               {
                 subject.avatars ?
                 <Image source={{uri:subject.avatars.large}} style={styles.avatar}/>
                 :
                 <View style={styles.avatar}></View>
               }

               <Text style={styles.name}>{subject.name}</Text>
             </View>
             <CommonDesc desc='英文名' detail={subject.name_en ? subject.name_en : '暂无'}/>
             <CommonDesc desc='性别' detail={subject.gender}/>
             <CommonDesc desc='出生日期' detail={subject.birthday ? subject.birthday : '暂无'}/>
             <CommonDesc desc='出生地' detail={subject.born_place ? subject.born_place : '暂无'}/>
             <CommonDesc desc='星座' detail={subject.constellation ? subject.constellation : '暂无'}/>
             <components.SepLine />
             <CommonDesc desc='代表作' detail=''/>
             <ScrollView
               horizontal={true}
               >
                 {
                    subject.works.map((item,i) =>{
                     return (
                       <MovieCard subject={item} key={i} callback={() => navigate('MovieDetail',{
                         isVisible:true,
                         title:'影片信息',
                         movie_id:item.subject ? item.subject.id : item.id
                       })}/>
                     )
                   })

                 }

             </ScrollView>
             <components.SepLine />
             <Text style={{margin:5,color:'#55AA00',textAlign:'right',marginTop:20}} onPress={() =>{
               navigate('WebView',{
                 isVisible:false,
                 title:subject.name,
                 url:subject.mobile_url,
                 headerBackTitle:'返回'
               })
             }}>去豆瓣电影查看详情</Text>



           </ScrollView>
           :
           <components.LoadingView />
         }
       </components.Layout>
     )
   }
 }

 const CommonDesc = ({desc,detail}) => {
   return (
     <View style={styles.commonDesc}>
       <Text style={[styles.commonText],{color:'black'}}>{`${desc}:`}</Text>
       <Text style={[styles.commonText,{marginLeft:5}]}>{detail}</Text>
     </View>
   )
 }

 const MovieCard = ({subject,callback}) => {
   return(
   <View style={styles.movieCard}>
     <TouchableOpacity onPress={callback}>
       {
         subject.subject.images ?
           <Image source={{uri:subject.subject.images.large}} style={styles.movieImage}/>
           :
           <View style={styles.movieImage}></View>
       }
      <Text style={{width:100,textAlign:'center',paddingTop:2}} numberOfLines={2}>{subject.subject.title}</Text>
    </TouchableOpacity>
   </View>
 )
 }

 const styles = StyleSheet.create({
   top:{
     alignItems:'center',
     marginTop:0,
     width:SCREEN_WIDTH,
     height:180,
     backgroundColor:'#B088FF'
   },
   avatar:{
     marginTop:50,
     width:80,
     height:80,
     borderRadius:40
   },
   name:{
     margin:5,
     fontSize:16,
     color:'white'
   },
   commonDesc:{
     margin:5,
     flexDirection:'row'
   },
   commonText:{
     color:'#aaa',
     fontSize:16
   },
   movieCard:{
     margin:5
   },
   movieImage:{
     width:100,
     height:130,
     borderRadius:5
   }
 })
