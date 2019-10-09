import Api from './Api'

export default {
  getConcealedFinalAssetsReport (projectID, departmentID, deptTree) {
    return Api.reports().get('/getConcealedFinalAssetsReport?projectID=' + projectID + '&departmentID=' + departmentID + '&deptTree=' + deptTree);
  },
  getDepartmentChangedFinalAssetsReport (projectID, departmentID, lastDepartmentID, deptTree) {
    return Api.reports().get('/getDepartmentChangedFinalAssetsReport?projectID=' + projectID + '&departmentID=' + departmentID + '&deptTree=' + deptTree + '&lastDepartmentID=' + lastDepartmentID);
  },
  getExceededFinalAssetsReport (projectID, departmentID, deptTree) {
    return Api.reports().get('/getExceededFinalAssetsReport?projectID=' + projectID + '&departmentID=' + departmentID + '&deptTree=' + deptTree);
  },
  getInventoriedFinalAssetsReport (projectID,departmentID, locationID, sessionID, userID, startDate, endDate, statusID, deptTree) {
    return Api.reports().get('/getInventoriedFinalAssetsReport?projectID=' + projectID + '&departmentID=' + departmentID + '&locationID=' + locationID + '&sessionID=' + sessionID + '&userID=' + userID + '&startDate=' + startDate + '&endDate=' + endDate + '&statusID=' + statusID + '&deptTree=' + deptTree);
  },
  getLocationChangedFinalAssetsReport (projectID, departmentID, deptTree) {
    return Api.reports().get('/getLocationChangedFinalAssetsReport?projectID=' + projectID + '&departmentID=' + departmentID + '&deptTree=' + deptTree);
  },
  getNoDataLabelFinalAssetsReport (projectID, departmentID, deptTree) {
    return Api.reports().get('/getNoDataLabelFinalAssetsReport?projectID=' + projectID + '&departmentID=' + departmentID + '&deptTree=' + deptTree);
  },
  getNonInventoriedFinalAssetsReport (projectID, departmentID, deptTree, filter) {
    return Api.reports().get('/getNonInventoriedFinalAssetsReport?projectID=' + projectID + '&departmentID=' + departmentID + '&deptTree=' + deptTree + '&filter=' + filter);
  },
  getDoubledLabelFinalAssetsReport (projectID, departmentID, deptTree) {
    return Api.reports().get('/getDoubledLabelFinalAssetsReport?projectID=' + projectID + '&departmentID=' + departmentID + '&deptTree=' + deptTree);
  },
  getFinalAssetsChangedReport (projectID, departmentID, deptTree) {
    return Api.reports().get('/getFinalAssetsChangedReport?projectID=' + projectID + '&departmentID=' + departmentID + '&deptTree=' + deptTree);
  }
}
