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
                <b-form>
                  <h2>Login</h2>
                  <p class="text-muted">Iniciar sesión</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Usuario" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Contraseña" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="secondary bg-primary" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Olvidé mi contraseña</b-button>
                    </b-col>
                  </b-row>
                  <b-row class="justify-content-center text-muted" style="position:absolute; left:1.25rem; right:1.25rem; bottom:1rem; height:1rem; ">
                    <b-col cols="6 " style="width:50%" >
                        <small>Kaab Inventarios &copy; 2018</small>
                    </b-col>
                    <b-col cols="6" style="width:50%" class="text-right text-white">
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
                <div id="app">
                  {{ info.data.address.municipality }}
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"></script>
<script>
import axios from 'axios'

export default {
  name: 'login',
  
  data: function () {
    return {
      info: null
    }
  },
  mounted () {
    
    axios
      .get('https://so2ut5rylh.execute-api.us-west-2.amazonaws.com/Prod/getAddressById?id=1')
      
      .then(response => (this.info = response))
      .catch(error => console.log(error))
  }
}

</script>
