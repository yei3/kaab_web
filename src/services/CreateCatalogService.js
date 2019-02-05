import Api from './Api'

export default {
  createAccountingAccount (params) {
    return Api.createCatalog().post('/createAccountingAccount', params)
  },
  createAddress (params) {
    return Api.createCatalog().post('/createAddress', params)
  },
  createAsset (params) {
    return Api.createCatalog().post('/createAsset', params)
  },
  createAssetFile (params) {
    return Api.createCatalog().post('/createAssetFile', params)
  },
  createCompany (params) {
    return Api.createCatalog().post('/createCompany', params)
  },
  createCompanyAccount (params) {
    return Api.createCatalog().post('/createCompanyAccount', params)
  },
  createContact (params) {
    return Api.createCatalog().post('/createContact', params)
  },
  createCostCenter (params) {
    return Api.createCatalog().post('/createCostCenter', params)
  },
  createDepartment (params) {
    return Api.createCatalog().post('/createDepartment', params)
  },
  createFile (params) {
    return Api.createCatalog().post('/createFile', params)
  },
  createFinalAsset (params) {
    return Api.createCatalog().post('/createFinalAsset', params)
  },
  createLocation (params) {
    return Api.createCatalog().post('/createLocation', params)
  },
  createLocationAddress (params) {
    return Api.createCatalog().post('/createLocationAddress', params)
  },
  createMenu (params) {
    return Api.createCatalog().post('/createMenu', params)
  },
  createMenuRol (params) {
    return Api.createCatalog().post('/createMenuRol', params)
  },
  createProject (params) {
    return Api.createCatalog().post('/createProject', params)
  },
  createRegistrationSession (params) {
    return Api.createCatalog().post('/createRegistrationSession', params)
  },
  createStatus (params) {
    return Api.createCatalog().post('/createStatus', params)
  },
  createUser (params) {
    return Api.createCatalog().post('/createUser', params)
  }
}
