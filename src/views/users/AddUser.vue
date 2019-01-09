<template>
  <div class="animated fade-in">
    <b-row>
      <b-col sm="6">
        <b-card>         
          <div slot="header">
            <strong>Usuario </strong><small>Agregar</small>
          </div>
          <b-form>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-at"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input class="form-control" :class="{ 'is-invalid': userValidationError }" type="text" id="mail" v-model.trim="user" placeholder="usuario@mi-empresa.com"></b-form-input>
              </b-input-group>
              <div class="small text-danger" v-if="!userValidationRequired">Campo requerido</div>
              <div class="small text-danger" v-if="!userValidationEmail">Introduzca un correo válido</div>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input class="form-control" :class="{ 'is-invalid': nameValidationError }" type="text" id="name" v-model.trim="name" placeholder="Nombre"></b-form-input>
              </b-input-group>
              <div class="small text-danger" v-if="!nameValidationRequired">Campo requerido</div>
              <div class="small text-danger" v-if="!nameValidationMinLength">El nombre debe contener 3 letras mínimo</div>              
            </b-form-group>
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                    </b-input-group-prepend>
                      <b-form-select id="role"
                        v-model.trim="role"
                        class="form-control" :class="{ 'is-invalid': roleValidationError }"
                        :options="roleOptions">
                      </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!roleValidationRequired">Campo requerido</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-exclamation-circle"></i></b-input-group-text>
                    </b-input-group-prepend>
                      <b-form-select id="status"
                        v-model.trim="status"
                        class="form-control" :class="{ 'is-invalid': statusValidationError }"
                        :options="statusOptions">
                      </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!statusValidationRequired">Campo requerido</div>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
          <div slot="footer" class="pull-right">
            <b-button id="btn-cancelar" type="reset" size="sm" variant="danger" @click="goBack" class="mr-1"><i class="fa fa-ban"></i> Cancelar</b-button>
            <b-button id="btn-guardar" type="submit" size="sm" variant="success" :disabled="!formValidated"><i class="fa fa-save"></i> Guardar</b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'AddUser',
  data: () => {
    return {
      user: '',
      name: '',
      role: null,
      status: null,
      roleOptions: [
        {value: null, text: 'Rol...'},
        {value: 'Admin', text: 'Admin'},
        {value: 'Gerente', text: 'Gerente'},
        {value: 'Coordinador', text: 'Coordinador'},
        {value: 'Operativo', text: 'Operativo'},
        {value: 'Auditor', text: 'Auditor'}
      ],
      statusOptions: [
        {value: null, text: 'Estatus...'},
        {value: 'Activo', text: 'Activo'},
        {value: 'Inactivo', text: 'Inactivo'}
      ]
    }
  },
  computed: {
  	formValidated: function() {
      var form_validate = false
      if (this.userValidationRequired && this.userValidationEmail && this.nameValidationRequired && this.nameValidationMinLength && this.roleValidationRequired && this.statusValidationRequired) {
        form_validate = true
      }
      return form_validate
    },
    userValidationError: function() {
      var user_error = true
      if (this.user && this.userValidationEmail) {
        user_error = false
      }
      return user_error
    },
    userValidationRequired: function() {
      var user_required = false
      if (this.user) {
        user_required = true
      }
      return user_required
    },
    userValidationEmail: function() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.user)
    },
    nameValidationError: function() {
      var name_error = true
      if (this.name && this.nameValidationMinLength) {
        name_error = false
      }
      return name_error
    },
    nameValidationRequired: function() {
      var name_required = false
      if (this.name) {
        name_required = true
      }
      return name_required
    },
    nameValidationMinLength: function() {
      var name_min_length = false
      if (this.name.length >= 3) {
        name_min_length = true
      }
      return name_min_length
    },
    roleValidationError: function() {
      var role_error = true
      if (this.role) {
        role_error = false
      }
      return role_error
    },
    roleValidationRequired: function() {
      var role_required = false
      if (this.role) {
        role_required = true
      }
      return role_required
    },
    statusValidationError: function() {
      var status_error = true
      if (this.status) {
        status_error = false
      }
      return status_error
    },
    statusValidationRequired: function() {
      var status_required = false
      if (this.status) {
        status_required = true
      }
      return status_required
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    }
  }
}
</script>