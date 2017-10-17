import React, {Component} from 'react'

import {Provider} from 'react-redux';

import store from './store'
import AppNavigator from './navigation';
import {SYSTEM} from './config';

import *as wechat from 'react-native-wechat'
import SplashScreen from 'react-native-splash-screen'

export default class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
  componentDidMount() {
    if (SYSTEM.iOS) {
      wechat.registerAppWithDescription('wx77b20f21eb54a3e9','心享生活 无限乐趣');
    } else {
      wechat.registerApp('wx77b20f21eb54a3e9');
    }
     SplashScreen.hide();
  }
}
