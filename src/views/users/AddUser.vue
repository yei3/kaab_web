<template>
  <div class="animated fade-in">
    <b-row>
      <b-col sm="6">
        <b-card>
          <div slot="header">
            <strong>Usuario </strong><small>Agregar</small>
          </div>
          <b-form-group>
            <label for="user">Usuario</label>
            <b-form-input type="text" id="mail" placeholder="usuario@mi-empresa.com"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label for="name">Nombre</label>
            <b-form-input type="text" id="name" placeholder="Introduce tu nombre"></b-form-input>
          </b-form-group>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <label for="role">Rol</label>
                <b-form-select id="role"
                  :plain="true"
                  :options="['Admin','Gerente','Coordinador','Operativo','Auditor']"
                  value="Operativo">
                </b-form-select>
            </b-form-group>
            </b-col>
          </b-row>
          <div slot="footer">
            <b-button type="submit" size="sm" variant="success"><i class="fa fa-save"></i> Guardar</b-button>
            <b-button type="reset" size="sm" variant="danger" @click="goBack"><i class="fa fa-ban"></i> Cancelar</b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'AddUser',
  methods: {
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    }
  }
}
</script>