<template>

  <div class="animated fade-in">

    <b-row>
      <b-col lg="6">
        <code-loader v-if="!companyIDOptions"
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
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.names.$error }" type="text" id="name" v-model="$v.names.$model" placeholder="Nombre"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.names.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.names.minLength">El nombre debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
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
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.middlename.$error }" type="text" id="middlename" v-model="$v.middlename.$model" placeholder="Apellido Materno"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.middlename.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.middlename.minLength">El apellido debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
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
  import getAll from '../../services/GetAllCatalog'
  import createCatalog from '../../services/CreateCatalogService'
  import { required, minLength,email } from 'vuelidate/lib/validators'
  import { CodeLoader } from 'vue-content-loader';
  export default {
    name: 'Contact',
    props: {
      caption: {
        type: String,
        default: 'Crear contacto'
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
      position: {
        required,
        minLength: minLength(4)
      },
      phoneType: {
        required
      },
      phoneType2: {
      },
      phoneNumber: {
        required,
        minLength: minLength(4)
      },
      phoneNumber2: {
        minLength: minLength(4)
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
            "companyID": this.$session.get('companyID'),
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
          await createCatalog.createContact(cntct).then(response => {
            console.info(response);
            if (response.data.error.errorCode === 0){
              this.$toaster.success(response.data.error.message);
              this.submitStatus = 'OK';
              this.$router.push('/contacts');
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
