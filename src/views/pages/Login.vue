<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
          <b-col md="8" class="text-center">
              <img src="img/logo.png" style="max-width: 75%; height: auto;" alt="Kaab Logo">
          </b-col>
      </b-row>
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-3 bg-light">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
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
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="bg-dark px-2 py-3 d-md-down-none text-secondary">
              <b-card-body class="text-center">
                <div>
                  <h3>Bienvenido a <b>Kaab</b></h3>
                  <p>La forma más fácil y práctica para generar y mantener actualizado el inventario de activos de tu empresa o negocio. No necesitas periféricos costosos ni instalaciones complicadas. Es fácil... es simple.</p>
                  <b-button variant="text-white secondary bg-primary" class="active mt-3">Más info</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
      <b-row class="justify-content-center text-muted">
          <b-col md="4" style="width:50%" >
              <small>Kaab Inventarios &copy; 2018</small>
          </b-col>
          <b-col md="4" style="width:50%" class="text-right text-muted">
              <small><a href="http://yei3.com">Yei<b>3 </b>Software</a></small>
          </b-col>
      </b-row>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>
