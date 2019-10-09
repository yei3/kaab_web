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
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Nombre</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-book"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.name.$error }" type="text" id="name" v-model="$v.name.$model" placeholder="Nombre del proyecto"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.name.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.name.minLength">El nombre debe contener 4 letras mínimo</div>
                  <div class="small text-danger" v-if="!$v.name.maxLength">El nombre debe contener 64 letras máximo</div>
                </b-form-group>
              </b-col>

            </b-row>

            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Contacto</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="role"
                                   v-model.trim="$v.contactID.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.contactID.$error }"
                                   :options="contactIDOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.contactID.required">Campo requerido</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Estatus</label>
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
              <p class="small text-success" v-if="submitStatus === 'OK'">Registro actualizado satisfactoriamente</p>
              <p class="small text-danger" v-if="submitStatus === 'ERROR'">Por favor revisa que los datos sean correctos</p>
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
  import gets from '../../services/Gets'
  import updateCatalog from '../../services/UpdateCatalogService'
  import S3 from '../../s3/config'
  import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
  import { CodeLoader } from 'vue-content-loader';
  export default {
    name: 'Proyecto',
    props: {
      caption: {
        type: String,
        default: 'Modificar Proyecto'
      },
    },
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
        contactIDOptions: [],
        statusOptions: [
          {value: null, text: 'Estatus...'},
          {value: 2, text: 'Activo'},
          {value: 3, text: 'Inactivo'},
          {value: 10, text: 'Cerrado'}
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
      const pry = await getById.getProjectById(this.$route.params.id);
      this.name = pry.data.project.name;
      this.contactID = pry.data.project.contactID;
      this.status = pry.data.project.statusID;

      const cntcts = await gets.getContactsByCompany(this.$session.get('companyID'));
      let tmp = [
        {value: null, text: 'Contacto...'}
      ];
      cntcts.data.contacts.map(function(value, key) {
        let dt = {value: value.id, text: value.names + ' ' + value.lastname};
        tmp.push(dt);
      });
      this.contactIDOptions = tmp;
    },
    validations: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(64)
      },
      contactID: {
        required
      },
      status: {
        required
      },
      base: {

      }
    },
    computed: {
    },
    methods: {
      goBack() {
        this.$router.go(-1);
        this.$router.push('/projects');
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
            "id": parseInt(this.$route.params.id,10),
            "companyID": this.$session.get('companyID'),
            "contactID": this.contactID,
            "name": this.name,
            "statusID": this.status,
            "userId": this.$session.get('userId')
          };
          await updateCatalog.updateProject(usr).then(response => {
            console.info(response);
            if (response.data.error.errorCode === 0){
              this.$toaster.success(response.data.error.message);
              this.submitStatus = 'OK';
              this.$session.set('refresh', true);
              this.$router.push('/projects');
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
