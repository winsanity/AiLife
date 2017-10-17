/**
 *  网页页面
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   WebView,
   Text,
   TouchableOpacity,
   View
 } from 'react-native';

import { NavigationActions } from 'react-navigation'

 import *as wechat from 'react-native-wechat'

import * as components from '../components';
import {SCREEN_WIDTH,COLOR} from '../config';

const WEBVIEW_REF = 'webview';
const PROGRESSBAR_REF = 'progressBar';


const resetAction = NavigationActions.reset({
  index:0,
  actions:[
   NavigationActions.navigate({
     routeName:'',
     params:{
       isVisible:false
     }
   })
  ]
})

 export default class extends Component {

   constructor(props) {
     super(props)

      const {state: {params: {url}}} = this.props.navigation;

     this.state = {
       url:url,
       progress:0,
       active:true,
       isGoBack:false,
       isForWard:false,
       modalisVisible:false
     }
   }

   componentWillUnmount() {
     this.setIntervar && clearInterval(this.setIntervar);
}

_onNavigationStateChange = (navState) => {

if (this.refs[WEBVIEW_REF] && this.refs[PROGRESSBAR_REF]) {
  this.setState({
     isGoBack:navState.canGoBack,
     isForWard:navState.canGoForward,
     url:navState.url
   });
}

};

_reload = () => {

   this.refs[WEBVIEW_REF].reload();


};


_goBack = ()=> {
     if (this.state.isGoBack) {
           this.refs[WEBVIEW_REF].goBack();
      }else {
           this._close();
     }
};

_close = () =>{

const {goBack} = this.props.navigation;

     goBack();
}

   render(){
     const {state: {params: {title,type}}} = this.props.navigation;
     return (
       <components.Layout ref="root">
         {
           type == 'news' ?

           <TouchableOpacity onPress={this.shareBtnClick.bind(this)} style={{position:'absolute',
           top:30,
           right:10,
           zIndex:1}}>
             <components.Icon name='reply'  style={styles.shareBtn}/>
           </TouchableOpacity>

           :
           null
         }
         <WebNavbar title={title}  callback1={() => this._goBack()} callback2={() => this._close()}/>
         <View style={styles.navSep}></View>
         <components.ProgressBar
           ref={PROGRESSBAR_REF}
           progress = {this.state.progress}
           style={{
             height:2,
             width:SCREEN_WIDTH,
             borderWidth:0,
             borderRadius:0,
             opacity:this.state.progress == 100 ? 0 :1
           }}
           filledColor='red'
           unfilledColor='#F5FCFF'/>
         <WebView
           ref={WEBVIEW_REF}
           source={{uri:this.state.url}}
           domStorageEnabled={true}
           renderError={() => this.renderError()}
           calesPageToFit={true}
           automaticallyAdjustContentInsets={false}
           onNavigationStateChange={this._onNavigationStateChange.bind(this)}
           scalesPageToFit={true}
           startInLoadingState={true}
           onLoadStart={()=>{

               console.log('开始加载');

               if (this.refs[WEBVIEW_REF] && this.refs[PROGRESSBAR_REF]) {
                 this.setState({
                     progress:0,
                     active:false,
                 });
                 this.setIntervar = setInterval(()=>{
                      if (this.state.progress === 100) {
                        return;
                      }
                      if (this.refs[WEBVIEW_REF] && this.refs[PROGRESSBAR_REF]) {
                        this.setState({
                            progress:this.state.progress + 0.5,
                        });
                      }

                 });
               }

                }}
            onLoad={()=>{
                        console.log('加载完成');
                    }}
              onLoadEnd={()=>{
                        console.log('加载结束，成功或失败都会走到这里');
                        if (this.refs[WEBVIEW_REF] && this.refs[PROGRESSBAR_REF]) {
                          this.setState({
                                      progress:100,
                                       active:true
                                  });
                           this.setIntervar && clearInterval(this.setIntervar);
                        }

                         }}
         />
         <components.ShareModal
           isVisible={this.state.modalisVisible}
           title='分享新闻'
           wxMomentAction={() => this.shareToTimeline()}
           wechatAction={() => this.shareToSession()}
         />
       </components.Layout>
     )
   }

   renderError(){
     return(
       <components.ErrorPage refreshAct={() => this._reload()} closeAct={() => this._close()}/>
     )
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
        const {state: {params: {title,url}}} = this.props.navigation;
       wechat.isWXAppInstalled()
      .then( ( isInstalled ) => {
           if ( isInstalled ) {
       wechat.shareToSession({
       type: 'news',
       title: '分享了一条新闻',
       description: title,
       mediaTagName: 'url',
       messageAction: undefined,
       messageExt: undefined,
       webpageUrl: url
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
         const {state: {params: {title,url}}} = this.props.navigation;
       wechat.isWXAppInstalled()
      .then( ( isInstalled ) => {
           if ( isInstalled ) {
             wechat.shareToTimeline({
               type: 'news',
               title: '分享了一条新闻',
               description: title,
               mediaTagName: 'url',
               messageAction: undefined,
               messageExt: undefined,
               webpageUrl: url
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

 const WebNavbar = ({title,callback1,callback2,headerRight}) =>{
   return (
     <View style={styles.navBar}>
       <View style={{flexDirection:'row',alignItems:'center',marginTop:15,width:100}}>
         <View style={{flexDirection:'row',alignItems:'center'}}>
           <TouchableOpacity onPress={callback1}>
             <View style={{flexDirection:'row',alignItems:'center',marginLeft:-4}}>
               <components.Icon name='navigate-before' style={{fontSize:40,color:'black'}}/>
               <Text style={{fontSize:16,marginLeft:-10}}>返回</Text>
             </View>
           </TouchableOpacity>
           <TouchableOpacity onPress={callback2}>
             <components.Icon name='close' style={{fontSize:25,color:'#aaa',marginLeft:2}}/>
           </TouchableOpacity>
         </View>
       </View>
       <Text style={styles.title} numberOfLines={1}>{title}</Text>
       <View style={{width:100}}>
         {headerRight}
       </View>
     </View>
   )


 }

 const styles = StyleSheet.create({
   navBar:{
     flexDirection:'row',
     height:63.5,
     justifyContent:'space-between'
   },
   title:{
     fontSize:18 ,
     color:'black',
     textAlign:'center',
     marginTop:30,
     fontWeight:'bold',
     width:SCREEN_WIDTH-200
   },
   navSep:{
     width:SCREEN_WIDTH,
     height:0.5,
     backgroundColor:'#aaa'
   },
   shareBtn:{

     fontSize:25,
     color:'black'
   }
 })
