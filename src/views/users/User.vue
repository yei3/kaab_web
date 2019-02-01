<template>

  <div class="animated fade-in">

    <b-row>
      <b-col lg="6">
        <code-loader v-if="!status"
                     :speed="2"
                     :animate="true"
        ></code-loader>
        <b-card v-else>
          <div slot="header">
            <strong>{{caption}}</strong><small> ID: {{$route.params.id }}</small>
          </div>
          <form @submit.prevent="submit">
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-at"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input class="form-control" :class="{ 'form-group--error': $v.user.$error }" type="email" id="user" v-model="$v.user.$model" placeholder="usuario@mi-empresa.com" disabled></b-form-input>
              </b-input-group>
              <div class="small text-danger" v-if="!$v.user.required">Campo requerido</div>
              <div class="small text-danger" v-if="!$v.user.minLength">El usuario debe contener 3 letras mínimo</div>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input class="form-control" :class="{ 'form-group--error': $v.names.$error }" type="text" id="name" v-model="$v.names.$model" placeholder="Nombre"></b-form-input>
              </b-input-group>
              <div class="small text-danger" v-if="!$v.names.required">Campo requerido</div>
              <div class="small text-danger" v-if="!$v.names.minLength">El nombre debe contener 3 letras mínimo</div>
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
import getById from '../../services/GetCatalogById'
import updateCatalog from '../../services/UpdateCatalogService'
import { required, minLength } from 'vuelidate/lib/validators'
import { CodeLoader } from 'vue-content-loader';
export default {
  name: 'User',
  props: {
    caption: {
      type: String,
      default: 'Modificar usuario'
    },
  },
  /*data: () => {
    return {
      items: (id) => {
        const user = usersData.find( user => user.id.toString() === id)
        const userDetails = user ? Object.entries(user) : [['id', 'Not found','','']]
        return userDetails.map(([key, value]) => {return {key: key, value: value}})
      },
      fields: [
        {key: 'key'},
        {key: 'value'}
      ],*/


  data: () => {
    return {
      user: '',
      names: '',
      middlename: '',
      lastname: '',
      role: null,
      status: null,
      submitStatus: null,
      fields: [
        {label: 'ID', key: 'id'},
        {label: 'Usuario', key: 'user'},
        {label: 'Nombre', key: 'names'},
        {label: 'Rol', key: 'role'},
        {label: 'Estatus', key: 'status'}
      ],
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
        {value: 2, text: 'Activo'},
        {value: 3, text: 'Inactivo'}
      ]
    }
  },
  components: {
    CodeLoader
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/pages/login')
    }
  },
  async mounted() {
    const usr = await getById.getUserById(this.$route.params.id);
    this.user = usr.data.user.user;
    this.names = usr.data.user.names;
    this.middlename = usr.data.user.middlename;
    this.lastname = usr.data.user.lastname;
    this.role = usr.data.user.role;
    this.status = usr.data.user.statusID;
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
      minLength: minLength(4)
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
      this.$router.go(-1);
      this.$router.push('/users');
    },
    async submit() {
      console.log('submit!');
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
        console.info(this.$v)
      } else {
        this.submitStatus = 'PENDING';
        const usr = {
          "role": this.role,
          "user": this.user,
          "companyAccountID": this.$session.get('companyAccountId'),
          "names": this.names,
          "lastname": this.lastname,
          "middlename": this.middlename,
          "statusID": this.status,
          "userId": this.$session.get('userId')
        };
        await updateCatalog.updateUser(usr).then(response => {
          console.info(response);
          if (response.data.error.errorCode === 0){
            this.$toaster.success(response.data.error.message);
            this.submitStatus = 'OK';
          }else{
            this.$toaster.error(response.data.error.message);
            this.submitStatus = 'ERROR';
          }
        });
      }
    }
  }
}
</script>
