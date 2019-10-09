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
              <b-col lg="12">
                <b-form-group>
                  <label class="small muted">Departamento padre</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-sitemap"></i></b-input-group-text>
                      <treeselect  :multiple="false" :options="options" id="departmentID" v-model="$v.departmentID.$model" required/>
                    </b-input-group-prepend>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Tipo de departamento</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-sitemap"></i></b-input-group-text>
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
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Nombre</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-sitemap"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.name.$error }" type="text" id="name" v-model="$v.name.$model" placeholder="Departamento"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.name.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.name.minLength">El nombre debe contener 4 letras mínimo</div>
                </b-form-group>
              </b-col>

            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Jefe de departamento</label>
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
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Encargado A</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" type="text" id="attendantA" v-model="attendantA" placeholder="Encargado A"></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Encargado B</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" type="text" id="attendantB" v-model="attendantB" placeholder="Encargado B"></b-form-input>
                  </b-input-group>
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
  import gets from '../../services/Gets'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import updateCatalog from '../../services/UpdateCatalogService'
  import { required, minLength,maxLength } from 'vuelidate/lib/validators'
  import { CodeLoader } from 'vue-content-loader';
  export default {
    name: 'Department',
    props: {
      caption: {
        type: String,
        default: 'Modificar departamento'
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
        attendantA: '',
        attendantB: '',
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
          {value: 'Sub-departamento', text: 'Sub-departamento'},
          {value: 'Jefatura', text: 'Jefatura'},
          {value: 'Unidad', text: 'Unidad'},
          {value: 'Servicio', text: 'Servicio'},
          {value: 'Subdirección', text: 'Subdirección'},
          {value: 'Otro', text: 'Otro'}
        ]
      }
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
    async mounted() {
      const dprtmnt = await getById.getDepartmentById(this.$route.params.id);
      const dprtmnts = await gets.getDepartmentsByCompany(dprtmnt.data.department.companyID);
      this.options = dprtmnts.data.departments;
      this.departmentID = dprtmnt.data.department.departmentID;
      this.departmentType = dprtmnt.data.department.departmentType;
      this.name = dprtmnt.data.department.name;
      this.headDepartment = dprtmnt.data.department.headDepartment;
      this.attendantA = dprtmnt.data.department.attendantA;
      this.attendantB = dprtmnt.data.department.attendantB;
      this.status = dprtmnt.data.department.statusID;
      this.companyID = dprtmnt.data.department.companyID;
    },
    validations: {
      departmentID: {

      },
      departmentType: {
        required
      },
      name: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(128)
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
            "id": parseInt(this.$route.params.id),
            "companyID": this.companyID,
            "departmentType": this.departmentType,
            "departmentID": this.departmentID,
            "name": this.name,
            "headDepartment": this.headDepartment,
            "attendantA": this.attendantA,
            "attendantB": this.attendantB,
            "statusID": this.status,
            "userId": this.$session.get('userId')
          };
          await updateCatalog.updateDepartment(dprt).then(response => {
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
