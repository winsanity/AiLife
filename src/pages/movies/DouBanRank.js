/**
 * AiLife
 * 豆瓣榜单
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
import {COLOR,DOUBAN} from '../../config'

var typeArr = [
  {'title':'Top250',api:DOUBAN.APIS.movie_top250},
  {'title':'北美榜',api:DOUBAN.APIS.movie_us_box}
]

export default class DouBanRank extends Component {
  constructor() {
    super();
  }

  render(){
    const {state: {params: {initialPage}},navigate} = this.props.navigation;
    return (
      <components.Layout>
        <ScrollableTabView
        renderTabBar={() => <ScrollableTabBar />}
        tabBarBackgroundColor='white'
        tabBarActiveTextColor={COLOR.theme}
        tabBarInactiveTextColor='#aaa'
        tabBarTextStyle={{fontSize:16}}
        tabBarUnderlineStyle={{backgroundColor:COLOR.theme,height:1.5}}
        initialPage={initialPage}
        >
          {
            typeArr.map((item,i) => {
              return (
                <components.MovieFlatList key={i} tabLabel={item.title} api={item.api} navigate={navigate}/>
              )
            })
          }
        </ScrollableTabView>
      </components.Layout>
    )
  }
}
