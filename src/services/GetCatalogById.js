import Api from './Api'

export default {
  getAccountingAccountById (id){
    return Api.getCatalogById().get('/getAccountingAccountById?id=' + id)
  },
  getAddressById (id){
    return Api.getCatalogById().get('/getAddressById?id=' + id)
  },
  getAssetById (id){
    return Api.getCatalogById().get('/getAssetById?id=' + id)
  },
  getAssetFileById (id){
    return Api.getCatalogById().get('/getAssetFileById?id=' + id)
  },
  getCompanyById (id){
    return Api.getCatalogById().get('/getCompanyById?id=' + id)
  },
  getCompanyAccountById (id){
    return Api.getCatalogById().get('/getCompanyAccountById?id=' + id)
  },
  getContactById (id){
    return Api.getCatalogById().get('/getContactById?id=' + id)
  },
  getCostCenterById (id){
    return Api.getCatalogById().get('/getCostCenterById?id=' + id)
  },
  getDepartmentById (id){
    return Api.getCatalogById().get('/getDepartmentById?id=' + id)
  },
  getFileById (id){
    return Api.getCatalogById().get('/getFileById?id=' + id)
  },
  getFinalAssetById (id){
    return Api.getCatalogById().get('/getFinalAssetById?id=' + id)
  },
  getLocationAddressById (id){
    return Api.getCatalogById().get('/getLocationAddressById?id=' + id)
  },
  getMenuById (id){
    return Api.getCatalogById().get('/getMenuById?id=' + id)
  },
  getMenuRolById (id){
    return Api.getCatalogById().get('/getMenuRolById?id=' + id)
  },
  getLocationById (id){
    return Api.getCatalogById().get('/getLocationById?id=' + id)
  },
  getProjectById (id){
    return Api.getCatalogById().get('/getProjectById?id=' + id)
  },
  getRegistrationSessionById (id){
    return Api.getCatalogById().get('/getRegistrationSessionById?id=' + id)
  },
  getStatusById (id){
    return Api.getCatalogById().get('/getStatusById?id=' + id)
  },
  getUserById (id){
    return Api.getCatalogById().get('/getUserById?id=' + id)
  }
}
