import Api from './Api'

export default {
  postClearActiveSessions (params) {
    return Api.posts().post('/postClearActiveSessions',params);
  },
  postInitialDB (params) {
    return Api.posts().post('/postInitialDB',params);
  },
  postInitialDBPHP (params) {
    return Api.php().post('/db/postInitialDB.php',params);
  },
  evaluateCSV (params) {
    return Api.php().post('/db/evaluateCSV.php',params);
  },
  postClearActiveProjects (params) {
    return Api.posts().post('/postClearActiveProjects',params);
  },
  postInitFromOldDB (params) {
    return Api.php().post('/db/initFromOldDB.php',params);
  },
  downloadImagesAssets (params) {
    return Api.phpFiles().post('/s3Downloader/example/index.php',params);
  }
}
