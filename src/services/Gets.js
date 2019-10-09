import Api from './Api'

export default {
  getUserByEmail (email) {
    return Api.gets().get('/getUserByEmail?email=' + email);
  },
  getDepartmentsByCompany (companyId) {
    return Api.gets().get('/getDepartmentsByCompany?companyId=' + companyId);
  },
  getProjectsByCompany (companyId) {
    return Api.gets().get('/getProjectsByCompany?companyID=' + companyId);
  },
  getContactsByCompany (companyId) {
    return Api.gets().get('/getContactsByCompany?companyID=' + companyId);
  },
  getAllDepartmentsByCompany (companyId) {
    return Api.gets().get('/getAllDepartmentsByCompany?companyID=' + companyId);
  },
  getAccountingAccountsByCompany (companyId) {
    return Api.gets().get('/getAccountingAccountsByCompany?companyID=' + companyId);
  },
  getCostCentersByCompany (companyId) {
    return Api.gets().get('/getCostCentersByCompany?companyID=' + companyId);
  },
  getLocationsByCompany (companyId) {
    return Api.gets().get('/getLocationsByCompany?companyID=' + companyId);
  },
  getLocationAddressByLocation (locationID) {
    return Api.gets().get('/getLocationAddressByLocation?locationID=' + locationID);
  },
  getRegistrationSessionsByUser (userID,projectID) {
    return Api.gets().get('/getRegistrationSessionsByUser?userID=' + userID + '&projectID=' + projectID);
  },
  getAssetByKeyField (projectID,keyField) {
    return Api.gets().get('/getAssetByKeyField?projectID=' + projectID + '&keyField=' + keyField);
  },
  getFinalAssetsBySession (sessionID) {
    return Api.gets().get('/getFinalAssetsBySession?sessionID=' + sessionID);
  },
  getFinalAssetsByProject (projectID,departmentID, locationID, sessionID, userID, startDate, endDate, statusID, isRep, deptTree) {
    return Api.gets().get('/getFinalAssetsByProject?projectID=' + projectID + '&departmentID=' + departmentID + '&locationID=' + locationID + '&sessionID=' + sessionID + '&userID=' + userID + '&startDate=' + startDate + '&endDate=' + endDate + '&statusID=' + statusID + '&reps=' + isRep + '&deptTree=' + deptTree);
  },
  getFinalAssetsGroup (keyField, projectID) {
    return Api.gets().get('/getFinalAssetsGroup?keyField=' + keyField + '&projectID=' + projectID);
  },
  getImagesByAsset (assetID,isFinal) {
    return Api.gets().get('/getImagesByAsset?assetID=' + assetID + '&isFinal=' + isFinal);
  },
  getAssetByProjectId (projectID) {
    return Api.gets().get('/getAssetByProjectId?projectID=' + projectID);
  },
  getAssetBySearch (projectID,query,locationID,departmentID,deptTree) {
    return Api.gets().get('/getAssetBySearch?projectID=' + projectID + '&query=' + query + "&locationID=" + locationID + "&departmentID=" + departmentID + "&deptTree=" + deptTree);
  },
  getDashboardData (projectID,companyAccountID) {
    return Api.gets().get('/getDashboardData?projectID=' + projectID + "&companyAccountID=" + companyAccountID);
  },
  getDashboardDataChart (projectID) {
    return Api.gets().get('/getDashboardDataChart?projectID=' + projectID );
  }
}
