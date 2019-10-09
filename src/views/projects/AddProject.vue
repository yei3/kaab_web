<template>

  <div class="animated fade-in">
    <b-modal size="lg" v-model="showErr" id="errorsModal" title="Revisión del archivo" ok-only>
      <h3>Se encontraron {{numErrs}} detalles en el archivo subido</h3>
      <b-table striped hover :items="errors"></b-table>
    </b-modal>
    <b-row>
      <b-col lg="6">
        <b-card >
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


            </b-row>

            <b-row>
              <b-col lg="12">
                <b-form-group>
                  <label class="small muted">Base inicial</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-database"></i> </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-file @change="upload" id="baseIn" :plain="false" accept=".csv"></b-form-file>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>

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
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Iniciar desde proyecto anterior</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-exclamation-circle"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="preProject"
                                   v-model.trim="$v.preProject.$model"
                                   class="form-control"
                                   :options="preProjectOptions">
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row><a href="https://s3-us-west-2.amazonaws.com/kaab-files/plantilla.csv">Descarga la plantilla de base de datos inicial</a></b-row>
            <b-row><a href="" id="uploadedLink" style="display: none;">Descarga lo que subiste</a></b-row>

            <div slot="footer" class="pull-right">
              <b-button id="btn-cancelar" type="reset" size="sm" variant="danger" @click="goBack" class="mr-1"><i class="fa fa-ban"></i> Cancelar</b-button>
              <b-button id="btn-guardar" type="submit" size="sm" variant="success" :disabled="submitStatus === 'PENDING' || submitStatus ==='UPLOADING'"><i class="fa fa-save"></i> Guardar</b-button>
              <p class="small text-success" v-if="submitStatus === 'OK'">Registro actualizado satisfactoriamente</p>
              <p class="small text-danger" v-if="submitStatus === 'ERROR'">Por favor revisa que los datos sean correctos</p>
              <p class="small text-dark" v-if="submitStatus === 'PENDING'">Guardando...</p>
              <p class="small text-dark" v-if="submitStatus === 'UPLOADING'">Validando archivo...</p>
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
  import posts from '../../services/Posts'
  import createCatalog from '../../services/CreateCatalogService'
  import S3 from '../../s3/config'
  import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
  import { CodeLoader } from 'vue-content-loader';
  import XLSXjs from 'xlsx/xlsx'
  import BRow from "bootstrap-vue/src/components/layout/row";
  import BInputGroup from "bootstrap-vue/src/components/input-group/input-group";
  import BInputGroupPrepend from "bootstrap-vue/src/components/input-group/input-group-prepend";
  export default {
    name: 'Proyecto',
    props: {
      caption: {
        type: String,
        default: 'Crear Proyecto'
      },
    },
    data: () => {
      return {
        name: '',
        contactID: null,
        status: null,
        submitStatus: null,
        showErr: null,
        errors:[],
        numErrs: 0,
        initDB: false,
        preProject: null,
        xlsUrl:'',
        key:'',
        fields: [
          {label: 'ID', key: 'id'},
          {label: 'Usuario', key: 'user'},
          {label: 'Nombre', key: 'names'},
          {label: 'Rol', key: 'role'},
          {label: 'Estatus', key: 'status'}
        ],
        contactIDOptions: [],
        preProjectOptions: [],
        statusOptions: [
          {value: null, text: 'Estatus...'},
          {value: 2, text: 'Activo'},
          {value: 3, text: 'Inactivo'},
          {value: 10, text: 'Cerrado'}
        ]
      }
    },
    components: {
      BInputGroupPrepend,
      BInputGroup,
      BRow,
      CodeLoader
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/pages/login')
      }
    },
    async mounted() {
      const pry = await getById.getProjectById(this.$route.params.id);


      const cntcts = await gets.getContactsByCompany(this.$session.get('companyID'));
      let tmp = [
        {value: null, text: 'Contacto...'}
      ];
      cntcts.data.contacts.map(function(value, key) {
        let dt = {value: value.id, text: value.names + ' ' + value.lastname};
        tmp.push(dt);
      });
      this.contactIDOptions = tmp;

      const prycts = await gets.getProjectsByCompany(this.$session.get('companyID'));
      let tmp2 = [
        {value: null, text: 'Proyecto Anterior...'}
      ];
      prycts.data.projects.map(function(value, key) {
        let dt = {value: value.id, text: value.name};
        tmp2.push(dt);
      });
      this.preProjectOptions = tmp2;
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
      preProject: {
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
      async upload(){
        this.initDB = true;
       this.submitStatus = 'UPLOADING';
        this.initDB = true;


        let formData = new FormData();
        formData.append('companyID',this.$session.get('companyID'));
        formData.append('plantilla', document.getElementById('baseIn').files[0]);
        await posts.evaluateCSV(formData).then(async response => {
          if (response.data.numErr != 0){
            this.numErrs = response.data.numErr;
            this.errors = response.data.errors;
            this.showErr = true;
          }else{
            this.submitStatus = 'OK'
          }

        });
        //setTimeout(() => this.submitStatus = 'OK', 10000)
        /*document.getElementById('uploadedLink').href = this.xlsUrl;*/

      },
      async submit() {
        this.xlsUrl = document.getElementById('uploadedLink').href;
        console.info(this.key);
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR';
          console.info(this.$v)
        } else {
          this.submitStatus = 'PENDING';
          const params = {
            "companyID": this.$session.get('companyID'),
            "userID": this.$session.get('userId')
          };
          await posts.postClearActiveProjects(params).then(async response => {
            console.log(response);
            const usr = {
              "key": this.key,
              "companyID": this.$session.get('companyID'),
              "contactID": this.contactID,
              "name": this.name,
              "statusID": this.status,
              "userId": this.$session.get('userId')
            };
            await createCatalog.createProject(usr).then( async response => {
              console.info(response);
              var self = this;
              if (response.data.error.errorCode === 0){
                //Fill initial DB
                if (this.initDB === true){
                  let formData = new FormData();
                  formData.append('projectID',response.data.id);
                  formData.append('companyID',self.$session.get('companyID'));
                  formData.append('userId',self.$session.get('userId'));
                  formData.append('plantilla', document.getElementById('baseIn').files[0]);
                  await posts.postInitialDBPHP(formData).then(async response => {
                    console.info(response);
                    this.submitStatus = 'OK'
                  });
                }else{
                  if (this.preProject != null){
                    let formData = new FormData();
                    formData.append('projectID',response.data.id);
                    formData.append('preProject',this.preProject);
                    formData.append('userId',self.$session.get('userId'));
                    await posts.postInitFromOldDB(formData).then(async response => {
                      console.info(response);
                      this.submitStatus = 'OK'
                    });
                  }
                }
                //fill initial DB
                this.$toaster.success(response.data.error.message);
                this.submitStatus = 'OK';
                this.$router.go();
              //  this.$session.set('refresh', true);
                this.$router.push('/projects');
              }else{
                this.$toaster.error(response.data.error.message);
                this.submitStatus = 'ERROR';
              }
            });
          });

        }
      },
      getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
    }
  }
</script>
