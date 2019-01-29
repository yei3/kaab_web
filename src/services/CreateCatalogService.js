import Api from './Api'

export default {
  createAccountingAccount (params) {
    return Api.createCatalog().post()
  },
  createAddress (params) {
    return Api.createCatalog().post()
  },
  createAsset (params) {
    return Api.createCatalog().post()
  },
  createAssetFile (params) {
    return Api.createCatalog().post()
  },
  createCompany (params) {
    return Api.createCatalog().post()
  },
  createCompanyAccount (params) {
    return Api.createCatalog().post()
  },
  createContact (params) {
    return Api.createCatalog().post()
  },
  createCostCenter (params) {
    return Api.createCatalog().post()
  },
  createDepartment (params) {
    return Api.createCatalog().post()
  },
  createFile (params) {
    return Api.createCatalog().post()
  },
  createFinalAsset (params) {
    return Api.createCatalog().post()
  },
  createLocation (params) {
    return Api.createCatalog().post()
  },
  createLocationAddress (params) {
    return Api.createCatalog().post()
  },
  createMenu (params) {
    return Api.createCatalog().post()
  },
  createMenuRol (params) {
    return Api.createCatalog().post()
  },
  createProject (params) {
    return Api.createCatalog().post()
  },
  createRegistrationSession (params) {
    return Api.createCatalog().post()
  },
  createStatus (params) {
    return Api.createCatalog().post()
  },
  createUser (params) {
    return Api.createCatalog().post('/createUser', params)
  }
}
