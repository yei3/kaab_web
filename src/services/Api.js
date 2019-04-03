import axios from 'axios'
export default{
  createCatalog(){
    return axios.create({
      baseURL: `https://n64ifi6mkf.execute-api.us-west-2.amazonaws.com/Prod`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
  updateCatalog(){
    return axios.create({
      baseURL: `https://lmsmxjcrrj.execute-api.us-west-2.amazonaws.com/Prod`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
  deleteCatalog(){
    return axios.create({
      baseURL: `https://dnaii63t6l.execute-api.us-west-2.amazonaws.com/Prod`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
  getCatalogById(){
    return axios.create({
      baseURL: `https://0oigmx0bsf.execute-api.us-west-2.amazonaws.com/Prod`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
  getCatalogByFilters(){
    return axios.create({
      baseURL: `https://8k4fyetwz4.execute-api.us-west-2.amazonaws.com/Prod`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
  getAllCatalog(){
    return axios.create({
      baseURL: `https://aioc5f98di.execute-api.us-west-2.amazonaws.com/Prod`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
  gets(){
    return axios.create({
      baseURL: `https://rygs86wbo4.execute-api.us-west-2.amazonaws.com/Prod`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
  posts(){
    return axios.create({
      baseURL: `https://7q8zhqbmch.execute-api.us-west-2.amazonaws.com/Prod`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
  reports(){
    return axios.create({
      baseURL: `https://5bae3uqj1i.execute-api.us-west-2.amazonaws.com/Prod`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
