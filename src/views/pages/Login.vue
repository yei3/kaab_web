<template>
  <div class="app flex-row align-items-center" style="background-image: url('img/bg.jpg'); background-position: center;">
    <div class="container">
      <b-row class="justify-content-center">
          <b-col md="8" class="text-center" style="height: 275px">
              <img src="img/logo-symbol_w.png" style="width: auto; max-height: 100%;" alt="Kaab Logo-Symbol">
          </b-col>
      </b-row>
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-3 bg-light">
              <b-card-body>
                <b-form @submit.prevent="login">
                  <h2>Login</h2>
                  <p class="text-muted">Iniciar sesión</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input id="username" type="text" class="form-control" placeholder="Usuario" v-model="username" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input id="password" type="password" class="form-control" placeholder="Contraseña" v-model="pass" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" variant="secondary bg-primary" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Reestablecer</b-button>
                    </b-col>
                  </b-row>
                  <b-row class="justify-content-center text-muted" style="position:absolute; left:1.25rem; right:1.25rem; bottom:1rem; height:1rem; ">
                    <b-col cols="7 " style="width:50%" >
                        <small>Kaab Inventarios &copy; 2018</small>
                    </b-col>
                    <b-col cols="5" style="width:50%" class="text-right text-white">
                        <small><a href="http://yei3.com">Yei<b>3 </b>Software</a></small>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="bg-gray-700 px-2 py-3 d-md-down-none">
              <b-card-body class="text-center text-secondary">
                <div>
                  <img src="img/logo.png" style="max-width: 75%; height: auto;" alt="Kaab Logo">
                  <h3>Bienvenido a <b>Kaab</b></h3>
                  <p>La forma más práctica para generar y mantener actualizado el inventario de activos de tu empresa o negocio. ¡Pruébalo! Es fácil.</p>
                  <b-button variant="text-white secondary bg-primary" class="active mt-3">Más info</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
  import CognitoAuth from '../../cognito/cognito'
  import gets from '../../services/Gets'
  export default {
    name: 'Login',
    data () {
      return {
        username: '',
        pass: '',
        error: null,
        loading: false
      }
    },
    beforeCreate: function () {
      if (this.$session.exists()) {
        this.$router.push('/dashboard')
      }
    },
    methods: {
      async login () {
        console.info("Login start")
        this.loading = true;
        let cog = new CognitoAuth();
         cog.authenticate(this.username, this.pass, async (err, result) => {
          if (err) {
            console.info("Login succesful");
            await gets.getUserByEmail(this.username).then(response => {
              console.info(response);
              if (response.data.error.errorCode === 0){
                this.$session.start();
                this.$session.set('jwt', result.getAccessToken().getJwtToken());
                this.$session.set('userId', response.data.user.id);
                this.$session.set('companyAccountId', response.data.user.companyAccountID);
                //this.Vue.http.headers.common['Authorization'] = 'Bearer ' + result.getAccessToken().getJwtToken();
                this.$router.push('/dashboard');
              }else{
                this.$toaster.error(response.data.error.message);
              }
            })
           // this.$session.set('userId', result.getAccessToken().getJwtToken());
           // this.$session.set('', result.getAccessToken().getJwtToken());
           // Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token;
           // this.$router.push('/panel/search');
          }else{
            console.info(result.message);
            this.$toaster.error(result.message);

          }
         /* if (err.statusCode !== 200) {
            console.log(err);
            this.error = err
          } else {
            console.log(result);
            //this.$router.replace('/profile')
          }*/
        });
      }
    }
  }

</script>
