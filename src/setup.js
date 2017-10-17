import {AppRegistry, NetInfo, Platform} from 'react-native'
// import compareVersions from 'compare-versions'
// import coordtransform from 'coordtransform'

import {SYSTEM} from './config'
import logger from './logger'
import store, {persistStore} from './store'
import App from './App'
import * as actions from './actions'

persistStore(
  store,
  state => {

    if (SYSTEM.iOS) {

      //store.dispatch(actions.errorFlash())

      NetInfo.isConnected.fetch().then(isConnected =>
        store.dispatch(actions.setNetwork({isConnected}))
      )
      NetInfo.fetch().then(reach => {
        reach = (reach === 'cell' || reach.startsWith('MOBILE')) ? 'mobile' : 'wifi'
        store.dispatch(actions.setNetwork({reach}))
      })
    }
    NetInfo.isConnected.addEventListener(
      'change',
      isConnected => {
        let {network} = store.getState()
        store.dispatch(actions.setNetwork({isConnected}))
        if (network.isConnected !== undefined) {
          store.dispatch(actions.errorFlash(
            isConnected === true ? '网络已恢复' : '当前网络不可用'
          ))
        }
      }
    )

    NetInfo.addEventListener(
      'change',
      reach => {
        reach = (reach === 'cell' ||
          reach.startsWith('MOBILE')) ? 'mobile' : 'wifi'
          let {network} = store.getState()
          store.dispatch(actions.setNetwork({reach}))
          if (network.reach !== undefined) {
            actions.errorFlash(
              reach === 'mobile' ? '当前为移动网络' : '当前为WIFI网络'
            )
          }
      }
    )
    logger.debug('listen network ok')
  },

  error => {
    logger.warn('load state fail', error)
  }
)

AppRegistry.registerComponent('AiLife', () => App)
