import Api from './Api'

export default {
  getAllAccountingAccounts () {
    return Api.getAllCatalog().get('/getAllAccountingAccounts')
  },
  getAllAddresses () {
    return Api.getAllCatalog().get('/getAllAddresses')
  },
  getAllAssets () {
    return Api.getAllCatalog().get('/getAllAssets')
  },
  getAllAssetFiles () {
    return Api.getAllCatalog().get('/getAllAssetFiles')
  },
  getAllCompanies () {
    return Api.getAllCatalog().get('/getAllCompanies')
  },
  getAllCompanyAccounts () {
    return Api.getAllCatalog().get('/getAllCompanyAccounts')
  },
  getAllContacts () {
    return Api.getAllCatalog().get('/getAllContacts')
  },
  getAllCostCenters () {
    return Api.getAllCatalog().get('/getAllCostCenters')
  },
  getAllDepartments () {
    return Api.getAllCatalog().get('/getAllDepartments')
  },
  getAllFiles () {
    return Api.getAllCatalog().get('/getAllFiles')
  },
  getAllFinalAssets () {
    return Api.getAllCatalog().get('/getAllFinalAssets')
  },
  getAllLocationAddresses () {
    return Api.getAllCatalog().get('/getAllLocationAddresses')
  },
  getAllMenus () {
    return Api.getAllCatalog().get('/getAllMenus')
  },
  getAllMenuRoles () {
    return Api.getAllCatalog().get('/getAllMenuRoles')
  },
  getAllLocations () {
    return Api.getAllCatalog().get('/getAllLocations')
  },
  getAllProjects () {
    return Api.getAllCatalog().get('/getAllProjects')
  },
  getAllRegistrationSessions () {
    return Api.getAllCatalog().get('/getAllRegistrationSessions')
  },
  getAllStatus () {
    return Api.getAllCatalog().get('/getAllStatus')
  },
  getAllUsers () {
    return Api.getAllCatalog().get('/getAllUsers')
  }
}
