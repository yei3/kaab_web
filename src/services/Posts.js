import Api from './Api'

export default {
  postClearActiveSessions (params) {
    return Api.posts().post('/postClearActiveSessions',params);
  },
  postInitialDB (params) {
    return Api.posts().post('/postInitialDB',params);
  }
}
