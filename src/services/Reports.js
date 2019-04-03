import Api from './Api'

export default {
  getConcealedFinalAssetsReport (projectID) {
    return Api.reports().get('/getConcealedFinalAssetsReport?projectID=' + projectID);
  },
  getDepartmentChangedFinalAssetsReport (projectID) {
    return Api.reports().get('/getDepartmentChangedFinalAssetsReport?projectID=' + projectID);
  },
  getExceededFinalAssetsReport (projectID) {
    return Api.reports().get('/getExceededFinalAssetsReport?projectID=' + projectID);
  },
  getInventoriedFinalAssetsReport (projectID) {
    return Api.reports().get('/getInventoriedFinalAssetsReport?projectID=' + projectID);
  },
  getLocationChangedFinalAssetsReport (projectID) {
    return Api.reports().get('/getLocationChangedFinalAssetsReport?projectID=' + projectID);
  },
  getNoDataLabelFinalAssetsReport (projectID) {
    return Api.reports().get('/getNoDataLabelFinalAssetsReport?projectID=' + projectID);
  },
  getNonInventoriedFinalAssetsReport (projectID) {
    return Api.reports().get('/getNonInventoriedFinalAssetsReport?projectID=' + projectID);
  }
}
