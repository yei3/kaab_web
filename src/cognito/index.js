import Vue from 'vue'
import CognitoAuth from './cognito'
import config from '../config/config'

Vue.use(CognitoAuth)
Vue.use(config)
export default new CognitoAuth()
