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
                      <b-input-group-text><i class="fa fa-address-book"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.names.$error }" type="text" id="name" v-model="$v.names.$model" placeholder="Nombre"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.names.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.names.minLength">El nombre debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Apellido paterno</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-address-book"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.lastname.$error }" type="text" id="lastname" v-model="$v.lastname.$model" placeholder="Apellido Paterno"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.lastname.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.lastname.minLength">El apellido debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Apellido materno</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-address-book"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.middlename.$error }" type="text" id="middlename" v-model="$v.middlename.$model" placeholder="Apellido Materno"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.middlename.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.middlename.minLength">El apellido debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Puesto</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-at"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.position.$error }" type="text" id="position" v-model="$v.position.$model" placeholder="Puesto"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.position.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.position.minLength">El puesto debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Tipo de teléfono</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="phoneType"
                                   v-model.trim="$v.phoneType.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.phoneType.$error }"
                                   :options="phoneTypeOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.phoneType.required">Campo requerido</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Número de teléfono</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.phoneNumber.$error }" type="text" id="phoneNumber" v-model="$v.phoneNumber.$model" placeholder="Número de teléfono"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.phoneNumber.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.phoneNumber.minLength">El nombre debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Tipo de teléfono 2</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="phoneType2"
                                   v-model.trim="$v.phoneType2.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.phoneType2.$error }"
                                   :options="phoneTypeOptions">
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Número de teléfono 2</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.phoneNumber2.$error }" type="text" id="phoneNumber2" v-model="$v.phoneNumber2.$model" placeholder="Número de teléfono 2"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.phoneNumber2.minLength">El nombre debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Tipo de correo</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="emailType"
                                   v-model.trim="$v.emailType.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.emailType.$error }"
                                   :options="emailTypeOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.emailType.required">Campo requerido</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Correo</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.email.$error }" type="email" id="email" v-model="$v.email.$model" placeholder="correo@empresa.com"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.email.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.email.email">El correo debe estar formado correctamente</div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Tipo de correo 2</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="emailType2"
                                   v-model.trim="$v.emailType2.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.emailType2.$error }"
                                   :options="emailTypeOptions">
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Correo 2</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.email2.$error }" type="email" id="email2" v-model="$v.email2.$model" placeholder="correo2@empresa.com"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.email2.email">El correo debe estar formado correctamente</div>
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
  import getAll from '../../services/GetAllCatalog'
  import updateCatalog from '../../services/UpdateCatalogService'
  import { required, minLength,email } from 'vuelidate/lib/validators'
  import { CodeLoader } from 'vue-content-loader';
  export default {
    name: 'Contact',
    props: {
      caption: {
        type: String,
        default: 'Modificar contacto'
      },
    },
    /*data: () => {
      return {
        items: (id) => {
          const user = use0''''rsData.find( user => user.id.toString() === id)
          const userDetails = user ? Object.entries(user) : [['id', 'Not found','','']]
          return userDetails.map(([key, value]) => {return {key: key, value: value}})
        },
        fields: [
          {key: 'key'},
          {key: 'value'}
        ],*/


    data: () => {
      return {
        companyID:null,
        names: '',
        lastname: '',
        middlename: null,
        position: null,
        phoneType:null,
        phoneNumber:'',
        phoneType2:null,
        phoneNumber2:'',
        emailType:null,
        email:'',
        emailType2:null,
        email2:'',
        status: null,
        submitStatus: null,
        fields: [
          {label: 'ID', key: 'id'},
          {label: 'Nombre', key: 'names'},
          {label: 'Apellido Paterno', key: 'lastname'},
          {label: 'Apellido Materno', key: 'middlename'},
          {label: 'Puesto', key: 'Position'},
          {label: 'Estatus', key: 'status'}
        ],
        phoneTypeOptions: [
          {value: null, text: 'Tipo de teléfono...'},
          {value: 'Celular', text: 'Celular'},
          {value: 'Casa', text: 'Casa'},
          {value: 'Trabajo', text: 'Trabajo'},
          {value: 'Otro', text: 'Otro'}
        ],
        emailTypeOptions: [
          {value: null, text: 'Tipo de email...'},
          {value: 'Personal', text: 'Personal'},
          {value: 'Trabajo', text: 'Trabajo'},
          {value: 'Otro', text: 'Otro'}
        ],
        statusOptions: [
          {value: null, text: 'Estatus...'},
          {value: 2, text: 'Activo'},
          {value: 3, text: 'Inactivo'}
        ],
        companyIDOptions: []
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
      const cmpns = await getAll.getAllCompanies();
      let tmp = [
        {value: null, text: 'Empresa...'}
      ];
      cmpns.data.companies.map(function(value, key) {
        let dt = {value: value.id, text: value.name};
        tmp.push(dt);
      });
      this.companyIDOptions = tmp;
      const cntct = await getById.getContactById(this.$route.params.id);
      this.companyID = cntct.data.contact.companyID;
      this.names = cntct.data.contact.names;
      this.middlename = cntct.data.contact.middlename;
      this.lastname = cntct.data.contact.lastname;
      this.position = cntct.data.contact.position;
      this.phoneType = cntct.data.contact.phoneType;
      this.phoneNumber = cntct.data.contact.phoneNumber;
      this.phoneType2 = cntct.data.contact.phoneType2;
      this.phoneNumber2 = cntct.data.contact.phoneNumber2;
      this.emailType = cntct.data.contact.emailType;
      this.email = cntct.data.contact.email;
      this.emailType2 = cntct.data.contact.emailType2;
      this.email2 = cntct.data.contact.email2;
      this.status = cntct.data.contact.statusID;
    },
    validations: {
      names: {
        required,
        minLength: minLength(3)
      },
      middlename: {
        required,
        minLength: minLength(3)
      },
      lastname: {
        required,
        minLength: minLength(3)
      },
      position: {
        required,
        minLength: minLength(3)
      },
      phoneType: {
        required
      },
      phoneType2: {
      },
      phoneNumber: {
        required,
        minLength: minLength(3)
      },
      phoneNumber2: {
        minLength: minLength(3)
      },
      emailType: {
        required
      },
      email: {
        required,
        email
      },
      emailType2: {

      },
      email2: {
        email
      },
      companyID:{
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
        this.$router.push('/contacts');
      },
      async submit() {
        console.log('submit!');
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR';
          console.info(this.$v)
        } else {
          this.submitStatus = 'PENDING';
          const cntct = {
            "id": parseInt(this.$route.params.id),
            "companyID": this.companyID,
            "names": this.names,
            "lastname": this.lastname,
            "middlename": this.middlename,
            "position": this.position,
            "phoneType": this.phoneType,
            "phoneNumber": this.phoneNumber,
            "phoneType2": this.phoneType2,
            "phoneNumber2": this.phoneNumber2,
            "emailType": this.emailType,
            "email": this.email,
            "emailType2": this.emailType2,
            "email2": this.email2,
            "statusID": this.status,
            "userId": this.$session.get('userId')
          };
          await updateCatalog.updateContact(cntct).then(response => {
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
