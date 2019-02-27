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
  }
}
