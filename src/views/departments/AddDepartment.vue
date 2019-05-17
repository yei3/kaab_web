<template>

  <div class="animated fade-in">

    <b-row>
      <b-col lg="6">
        <b-card>
          <div slot="header">
            <strong>{{caption}}</strong><small> ID: {{$route.params.id }}</small>
          </div>
          <form @submit.prevent="submit">
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                      <treeselect  :multiple="false" :options="options" id="departmentID" v-model="$v.departmentID.$model"/>
                    </b-input-group-prepend>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="departmentType"
                                   v-model.trim="$v.departmentType.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.departmentType.$error }"
                                   :options="departmentTypeOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.departmentType.required">Campo requerido</div>
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
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.name.$error }" type="text" id="name" v-model="$v.name.$model" placeholder="Departamento"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.name.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.name.minLength">El nombre debe contener 4 letras mínimo</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.headDepartment.$error }" type="text" id="headDepartment" v-model="$v.headDepartment.$model" placeholder="Jefe de departamento"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.headDepartment.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.headDepartment.minLength">El nombre debe contener 4 letras mínimo</div>
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
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import gets from '../../services/Gets'
  import createCatalog from '../../services/CreateCatalogService'
  import { required, minLength } from 'vuelidate/lib/validators'
  import { CodeLoader } from 'vue-content-loader';
  export default {
    name: 'Department',
    props: {
      caption: {
        type: String,
        default: 'Crear departamento'
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
        departmentID: null,
        departmentType: '',
        name: '',
        headDepartment: '',
        status: null,
        submitStatus: null,
        companyID: null,
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
        ],
        options: [],
        departmentTypeOptions:[
          {value: null, text: 'Tipo de departamento...'},
          {value: 'Dirección', text: 'Dirección'},
          {value: 'Área', text: 'Área'},
          {value: 'Departamento', text: 'Departamento'},
          {value: 'Adjunto', text: 'Adjunto'},
          {value: 'Otro', text: 'Otro'}
        ]
      }
    },
    async mounted() {
      const dprtmnts = await gets.getDepartmentsByCompany(this.$session.get('companyID'));
      this.options = dprtmnts.data.departments;
    },
    components: {
      CodeLoader,
      Treeselect
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/pages/login')
      }
    },
    validations: {
      departmentID: {

      },
      departmentType: {
        required
      },
      name: {
        required,
        minLength: minLength(4)
      },
      headDepartment: {
        required,
        minLength: minLength(4)
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
          const dprt = {
            "companyID": this.$session.get('companyID'),
            "departmentType": this.departmentType,
            "departmentID": this.departmentID,
            "name": this.name,
            "headDepartment": this.headDepartment,
            "statusID": this.status,
            "userId": this.$session.get('userId')
          };
          await createCatalog.createDepartment(dprt).then(response => {
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
