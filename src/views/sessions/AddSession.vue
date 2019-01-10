<template>
  <div class="animated fade-in">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <b-form>
              <strong>{{ caption }}</strong><small> ID: 17</small>
                <small class="float-right text-muted">
                  2019/01/09 11:12:06 - Vigente
                </small>
                <b-row class="mt-3">
                <b-col sm="4">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" id="name" :disabled="true" v-model="userName" placeholder="Nombre">{{ userName }}</b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-sitemap" ></i></b-input-group-text>
                      </b-input-group-prepend>
                      <!--<b-form-input type="text" id="sessionDepartmentName" :disabled="true" v-model="items($route.params.idsession).sessionDepartmentName" placeholder="Departamento"></b-form-input>-->
                      <b-form-select id="department"
                        v-model="department"
                        class="form-control" :class="{ 'is-invalid': departmentValidationError }"
                        :options="departmentOptions"
                        value="Departamento...">
                      </b-form-select>
                    </b-input-group>
                    <div class="small text-danger" v-if="!departmentValidationRequired">Campo requerido</div>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <!--<b-form-input type="text" id="sessionLocationName" :disabled="true" v-model="items($route.params.idsession).sessionLocationName" placeholder="Ubicación"></b-form-input>-->
                      <b-form-select id="sessionLocation"
                        v-model="location"
                        class="form-control" :class="{ 'is-invalid': locationValidationError }"
                        :options="locationOptions"
                        value="Ubicación...">
                      </b-form-select>
                    </b-input-group>
                    <div class="small text-danger" v-if="!locationValidationRequired">Campo requerido</div>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="pull-right">
                    <b-button v-show="!addSessionVar" type="reset" size="sm" variant="danger" @click="goBack" class="mr-1"><i class="fa fa-ban"></i> Cancelar</b-button>
                    <b-button v-show="!addSessionVar" type="button" size="sm" variant="primary" @click="addSessionClicked" :disabled="!formValidated"><i class="fa fa-play"></i> Iniciar</b-button>
                  </div>
                </b-col>
              </b-row>
            </b-form>
          </div>

          <b-row>
            <b-col>
              <div class="text-center mb-4">
                <b-button v-show="addSessionVar" type="button" size="lg" variant="success" @click="scan" ><i class="fa fa-barcode"></i> REGISTRAR</b-button>
              </div>
            </b-col>
          </b-row>

          <b-table v-show="addSessionVar" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="lg" :items="tableitems" :fields="tablefields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
            <template slot="id" slot-scope="data">
              {{data.item.id}}
            </template>
            <template slot="keyfield" slot-scope="data">
              {{data.item.keyfield}}
            </template>
            <template slot="status" slot-scope="data">
              <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
            </template>
          </b-table>
          <nav>
            <b-pagination v-show="addSessionVar" size="sm" :total-rows="getRowCount(tableitems)" :per-page="perPage" v-model="currentPage" prev-text="Ant" next-text="Sig" hide-goto-end-buttons/>
          </nav>

          <div slot="footer" v-show="addSessionVar">
            <div class="pull-right">
              <b-button type="reset" size="sm" variant="secondary" @click="goBack" class="mr-1"><i class="fa fa-chevron-left"></i> Atras</b-button>
              <b-button v-show="addSessionVar" type="button" size="sm" variant="primary" @click="saveSession" :disabled="!formValidated"><i class="fa fa-stop"></i> Terminar</b-button>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
  
</template>

<script>
import sessionsData from './SessionsData'
import assetsData from './AssetsData'
export default {
  name: 'AddSession',
  props: {
    caption: {
      type: String,
      default: 'Nueva sesión de registro'
    },
    hover: {
      type: Boolean,
      default: true
    },
      striped: {
      type: Boolean,
      default: false
    },
      bordered: {
      type: Boolean,
      default: false
    },
      small: {
      type: Boolean,
      default: false
    },
      fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      validateSelectsVar: false,
      userName: 'Ana Sánchez',
      addSessionVar: false,
      department: null,
      departmentOptions: [
        {value: null, text: 'Departamento...', disabled: true},
        {value: 1001, text: 'Cancerología'},
        {value: 1002, text: 'Dirección General'},
        {value: 2001, text: 'Enfermería'},
        {value: 2002, text: 'Especialidades'},
        {value: 2003, text: 'Ginecología'},
        {value: 3001, text: 'Inventarios'},
        {value: 3002, text: 'Legales'},
        {value: 3003, text: 'Psiquiatría'},
        {value: 4001, text: 'Seguridad'},
        {value: 4002, text: 'Soporte'}
      ],
      location: null,
      locationOptions: [
        {value: null, text: 'Ubicación...', disabled: true},
        {value: 116, text: 'Edificio 16'},
        {value: 123, text: 'Edificio 23'},
        {value: 100, text: 'Edificio de Gobierno'},
        {value: 200, text: 'Laboratorios'},
        {value: 300, text: 'Torre A'},
        {value: 400, text: 'Torre B'},
        {value: 500, text: 'Torre C'},
        {value: 600, text: 'Torre D'},
        {value: 700, text: 'Torre E'}
      ],
      items: (id) => {
        const session = sessionsData.find( session => session.id.toString() === id)
        return session
      },
      fields: [
        {label: 'ID', key: 'id', sortable: true},
        {label: 'Inicio', key: 'creationDateTime', sortable: true},
        {label: 'Fin', key: 'finalDateTime', sortable: true},
        {label: 'Usuario', key: 'userName', sortable: true},
        {label: 'Departamento', key: 'sessionDepartmentName', sortable: true},
        {label: 'Ubicación', key: 'sessionLocationName', sortable: true},
        {label: 'Estatus', key: 'status', sortable: true}
      ],
      tableitems: assetsData.filter((asset) => asset.id > 0),
      tablefields: [
        {label: 'ID', key: 'id', sortable: true},
        {label: 'Clave', key: 'keyfield', sortable: true},
        {label: 'Activo', key: 'asset', sortable: true},
        {label: 'Descripción', key: 'description', sortable: true},
        {label: 'Costo', key: 'cost', sortable: true},
        {label: 'Tipo', key: 'assetType', sortable: true},
        {label: 'Estatus', key: 'status', sortable: true}
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0
      
    }
  },
  computed: {
  	formValidated: function() {
      var form_validate = false
      if (this.departmentValidationRequired && this.locationValidationRequired) {
        form_validate = true
      }
      return form_validate
    },
    departmentValidationError: function() {
      var department_error = true
      if (this.department) {
        department_error = false
      }
      return department_error
    },
    departmentValidationRequired: function() {
      var department_required = false
      if (this.department) {
        department_required = true
      }
      return department_required
    },
    locationValidationError: function() {
      var location_error = true
      if (this.location) {
        location_error = false
      }
      return location_error
    },
    locationValidationRequired: function() {
      var location_required = false
      if (this.location) {
        location_required = true
      }
      return location_required
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getBadge (status) {
      return status === 'Conciliado' ? 'success'
      : status === 'Cambio de despartamento' ? 'primary'
      : status === 'Cambio de ubicación' ? 'primary'
      : status === 'Cambio de descripción' ? 'primary'
      : status === 'En demasía' ? 'warning'
      : status === 'No inventariado' ? 'danger' : 'primary'
    },
    getRowCount (item) {
      return item.length
    },
    regLink (idsession,id) {
      return `${idsession.toString()}/asset/${id.toString()}`
    },
    rowClicked (item) {
      const regLink = this.regLink(this.$route.params.idsession,item.id)
      this.$router.push({ path: regLink })
    },
    addSessionClicked () {
      this.addSessionVar = true     
    },
    scan () {

    },
    saveSession () {

    }
  }
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
