/**
 *  新闻首页
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

/*
第三方
 */
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view'

import * as components from '../../components'
import {COLOR} from '../../config'


var typeArr = [
  {'title':'头条', 'type':'top'},
  {'title':'社会', 'type':'shehui'},
  {'title':'国内', 'type':'guonei'},
  {'title':'国际', 'type':'guoji'},
  {'title':'娱乐', 'type':'yule'},
  {'title':'体育', 'type':'tiyu'},
  {'title':'军事', 'type':'junshi'},
  {'title':'科技', 'type':'keji'},
  {'title':'财经', 'type':'caijing'},
  {'title':'时尚', 'type':'shishang'},
]


 export default class NewsMain extends Component {

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'NewsMain'
  }


  render(){

    const { navigate } = this.props.navigation;
    return(
      <components.Layout screenId={this.screenId}>
        <ScrollableTabView
        renderTabBar={() => <ScrollableTabBar />}
        tabBarBackgroundColor='white'
        tabBarActiveTextColor={COLOR.theme}
        tabBarInactiveTextColor='#aaa'
        tabBarTextStyle={{fontSize:16}}
        tabBarUnderlineStyle={{backgroundColor:COLOR.theme,height:1.5}}
        initialPage={0}
        >
          {
            typeArr.map((item,i) => {
              return (
                <components.NewsFlatList key={i} tabLabel={item.title} typeId={item.type} navigate={navigate}/>
              )
            })
          }

        </ScrollableTabView>
      </components.Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
