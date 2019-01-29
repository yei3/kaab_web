<template>
  <div class="animated fade-in">
    <b-row>
      <b-col lg="6">
        <b-card>         
          <div slot="header">
            <strong>Usuario </strong><small>Agregar</small>
          </div>
          <form @submit.prevent="submit">
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-at"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input class="form-control" :class="{ 'form-group--error': $v.user.$error }" type="email" id="user" v-model="$v.user.$model" placeholder="usuario@mi-empresa.com"></b-form-input>
              </b-input-group>
              <div class="small text-danger" v-if="!$v.user.required">Campo requerido</div>
              <div class="small text-danger" v-if="!$v.user.email">El correo electrónico debe ser válido.</div>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input class="form-control" :class="{ 'form-group--error': $v.names.$error }" type="text" id="name" v-model="$v.names.$model" placeholder="Nombre"></b-form-input>
              </b-input-group>
              <div class="small text-danger" v-if="!$v.names.required">Campo requerido</div>
              <div class="small text-danger" v-if="!$v.names.minLength">El nombre debe contener 4 letras mínimo</div>
            </b-form-group>
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.middlename.$error }" type="text" id="name" v-model="$v.middlename.$model" placeholder="Apellido Paterno"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.middlename.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.middlename.minLength">El apellido debe contener 4 letras mínimo</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.lastname.$error }" type="text" id="name" v-model="$v.lastname.$model" placeholder="Apellido Materno"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.lastname.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.lastname.minLength">El apellido debe contener 4 letras mínimo</div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="role"
                                   v-model.trim="$v.role.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.role.$error }"
                                   :options="roleOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.role.required">Campo requerido</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-exclamation-circle"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="status"
                                   v-model.trim="$v.status.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.status.$error }"
                                   :options="statusOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.status.required">Campo requerido</div>
                </b-form-group>
              </b-col>
            </b-row>
            <div slot="footer" class="pull-right">
              <b-button id="btn-cancelar" type="reset" size="sm" variant="danger" @click="goBack" class="mr-1"><i class="fa fa-ban"></i> Cancelar</b-button>
              <b-button id="btn-guardar" type="submit" size="sm" variant="success" :disabled="submitStatus === 'PENDING'"><i class="fa fa-save"></i> Guardar</b-button>
              <p class="small text-success" v-if="submitStatus === 'OK'">Usuario actualizado satisfactoriamente.</p>
              <p class="small text-danger" v-if="submitStatus === 'ERROR'">Por favor revisa que los datos sean correctos.</p>
              <p class="small text-dark" v-if="submitStatus === 'PENDING'">Guardando...</p>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import createCatalog from '../../services/CreateCatalogService'
  import { required, minLength, email } from 'vuelidate/lib/validators'
  import CognitoAuth from '../../cognito/cognito'
export default {
  name: 'AddUser',
  data: () => {
    return {
      user: '',
      names: '',
      middlename: '',
      lastname: '',
      role: null,
      status: null,
      submitStatus: null,
      roleOptions: [
        {value: null, text: 'Rol...', disabled: true},
        {value: 'Admin', text: 'Admin'},
        {value: 'Gerente', text: 'Gerente'},
        {value: 'Coordinador', text: 'Coordinador'},
        {value: 'Operativo', text: 'Operativo'},
        {value: 'Auditor', text: 'Auditor'}
      ],
      statusOptions: [
        {value: null, text: 'Estatus...', disabled: true},
        {value: 2, text: 'Activo'},
        {value: 3, text: 'Inactivo'}
      ]
    }
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/pages/login')
    }
  },
  validations: {
    names: {
      required,
      minLength: minLength(4)
    },
    middlename: {
      required,
      minLength: minLength(4)
    },
    lastname: {
      required,
      minLength: minLength(4)
    },
    user: {
      required,
      email
    },
    role: {
      required
    },
    status: {
      required
    }
  },
  computed: {
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    },
    async submit() {
      let cog = new CognitoAuth();
      cog.signup(this.user,this.names,this.middlename,this.lastname,this.role,this.status,(err, result) =>{
        if (err.statusCode !== 200) {
          console.log(err);
          this.error = err
        } else {
          console.log(result);
          //this.$router.replace('/profile')
        }
      });
/*
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        console.info(this.$v)
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        const usr = {
          "role": this.role,
          "user": this.user,
          "companyAccountID": 3,
          "names": this.names,
          "lastname": 'test',
          "middlename": 'tst',
          "statusID": 2,
          "userId": 2
        };
          await createCatalog.createUser(usr).then(response => {
            console.info(response);
            this.submitStatus = 'OK';
            this.$router.go(-1);
          })
      }*/
    }
  }
}
</script>
