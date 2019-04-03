import { Config, CognitoIdentityCredentials  } from 'aws-sdk'
import { CognitoUser, CognitoUserPool, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import cogConfig from '../config/config'

export default class CognitoAuth {
  constructor () {
    this.userSession = null
    this.configure(cogConfig)
  }

  isAuthenticated (cb) {
    let cognitoUser = this.getCurrentUser()
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          return cb(err, false)
        }
        return cb(null, true)
      })
    } else {
      cb(null, false)
    }
  }

  configure (config) {
    if (typeof config !== 'object' || Array.isArray(config)) {
      throw new Error('[CognitoAuth error] valid option object required')
    }
    this.userPool = new CognitoUserPool({
      UserPoolId: config.UserPoolId,
      ClientId: config.ClientId
    })
    Config.region = config.region
    Config.credentials = new CognitoIdentityCredentials({
      IdentityPoolId: config.IdentityPoolId
    })
    this.options = config
  }

  signup(user, name, familyName, middleName, role, companyAccountId, cb) {
    let attributeList = [
      new CognitoUserAttribute({
        Name: 'name',
        Value: name
      }),
      new CognitoUserAttribute({
        Name: 'family_name',
        Value: familyName
      }),
      new CognitoUserAttribute({
        Name: 'middle_name',
        Value: middleName
      })
    ];
    this.userPool.signUp(user, 'css2523*', attributeList, null, cb)
  }

  authenticate (username, pass, cb) {

    let authenticationData = { Username: username, Password: pass }
    let authenticationDetails = new AuthenticationDetails(authenticationData)
    let userData = { Username: username, Pool: this.userPool }
    let cognitoUser = new CognitoUser(userData)

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log('access token + ' + result.getAccessToken().getJwtToken())
        /*var logins = {}
        logins['cognito-idp.' + this.options.region + '.amazonaws.com/' + this.options.UserPoolId] = result.getIdToken().getJwtToken()
        console.log(logins)


        Config.credentials = new CognitoIdentityCredentials({
          IdentityPoolId: this.options.UserPoolId,
          Logins: logins
        })*/
        //console.log(Config.credentials)
        //this.onChange(true)
        cb(true, result)
      },
      onFailure: function (err) {
        cb(false, err);
      },
      newPasswordRequired: function (userAttributes, requiredAttributes) {
        console.log('New Password Is Required')
      }
    })
  }

  getCurrentUser () {
    return this.userPool.getCurrentUser()
  }

  confirmRegistration (username, code, cb) {
    let cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool
    })
    cognitoUser.confirmRegistration(code, true, cb)
  }

  /**
   * Logout of your cognito session.
   */
  logout () {
    this.getCurrentUser().signOut()
  }

  /**
   * Resolves the current token based on a user session. If there
   * is no session it returns null.
   * @param {*} cb callback
   */
  getIdToken (cb) {
    if (this.getCurrentUser() == null) {
      return cb(null, null)
    }
    this.getCurrentUser().getSession((err, session) => {
      if (err) return cb(err)
      if (session.isValid()) {
        return cb(null, session.getIdToken().getJwtToken())
      }
      cb(Error('Session is invalid'))
    })
  }

  recoverPassword(user, pass, cb){
    let userData = { Username: user, Pool: this.userPool }
    let cognitoUser = new CognitoUser(userData)
    cognitoUser.forgotPassword({
      onSuccess: function (data) {
        // successfully initiated reset password request
        console.log('CodeDeliveryData from forgotPassword: ' + data);
      },
      onFailure: function(err) {
        alert(err.message || JSON.stringify(err));
      },
      //Optional automatic callback
      inputVerificationCode: function(data) {
        var verificationCode = prompt('Por favor introduce el código de verificación enviado: ' ,'');
        cognitoUser.confirmPassword(verificationCode, pass, {
          onSuccess() {
            cb(true);
          },
          onFailure(err) {
            cb(err);
          }
        });
      }
    });
  }
}
