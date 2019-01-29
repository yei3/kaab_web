import Api from './Api'

export default {
  getUserByEmail (email) {
    return Api.gets().get('/getUserByEmail?email=' + email);
  }
}
