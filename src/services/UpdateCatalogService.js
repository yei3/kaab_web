import Api from './Api'

export default {
  updateAccountingAccount (params) {
    return Api.updateCatalog().post('/updateAccountingAccount', params)
  },
  updateAddress (params) {
    return Api.updateCatalog().post('/updateAddress', params)
  },
  updateAsset (params) {
    return Api.updateCatalog().post('/updateAsset', params)
  },
  updateAssetFile (params) {
    return Api.updateCatalog().post('/updateAssetFile', params)
  },
  updateCompany (params) {
    return Api.updateCatalog().post('/updateCompany', params)
  },
  updateCompanyAccount (params) {
    return Api.updateCatalog().post('/updateCompanyAccount', params)
  },
  updateContact (params) {
    return Api.updateCatalog().post('/updateContact', params)
  },
  updateCostCenter (params) {
    return Api.updateCatalog().post('/updateCostCenter', params)
  },
  updateDepartment (params) {
    return Api.updateCatalog().post('/updateDepartment', params)
  },
  updateFile (params) {
    return Api.updateCatalog().post('/updateFile', params)
  },
  updateFinalAsset (params) {
    return Api.updateCatalog().post('/updateFinalAsset', params)
  },
  updateLocation (params) {
    return Api.updateCatalog().post('/updateLocation', params)
  },
  updateLocationAddress (params) {
    return Api.updateCatalog().post('/updateLocationAddress', params)
  },
  updateMenu (params) {
    return Api.updateCatalog().post('/updateMenu', params)
  },
  updateMenuRol (params) {
    return Api.updateCatalog().post('/updateMenuRol', params)
  },
  updateProject (params) {
    return Api.updateCatalog().post('/updateProject', params)
  },
  updateRegistrationSession (params) {
    return Api.updateCatalog().post('/updateRegistrationSession', params)
  },
  updateStatus (params) {
    return Api.updateCatalog().post('/updateStatus', params)
  },
  updateUser (params) {
    return Api.updateCatalog().post('/updateUser', params)
  }
}
