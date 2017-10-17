/**
 * AiLife
 */

import {combineReducers} from 'redux'
import store from './store'
import loading from './loading'
import network from './network'
import error from './error'

export default combineReducers({
  store,
  loading,
  network,
  error
})
