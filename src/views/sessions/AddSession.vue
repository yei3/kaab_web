<template>
  <div class="animated fade-in">
    <b-row>
      <b-col sm="12">
        <b-card>
          <b-form validated novalidate>
            <div slot="header">
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
                      <b-form-select id="sessionDepartmentName"
                        v-model="sessionDepartmentName"
                        :options="sessionDepartmentOptions"
                        :required="true"
                        @change="selectClicked"
                        value="Departamento...">
                      </b-form-select>
                      <b-form-invalid-feedback>
                        Por favor, seleccione un departamento.
                      </b-form-invalid-feedback>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <!--<b-form-input type="text" id="sessionLocationName" :disabled="true" v-model="items($route.params.idsession).sessionLocationName" placeholder="Ubicación"></b-form-input>-->
                      <b-form-select id="sessionLocationName"
                        v-model="sessionLocationName"
                        :options="sessionLocationOptions"
                        :required="true"
                        @change="selectClicked"
                        value="Ubicación...">
                      </b-form-select>
                      <b-form-invalid-feedback>
                        Por favor, seleccione una ubicación.
                      </b-form-invalid-feedback>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-button v-show="validateSelectsVar" type="submit" size="sm" variant="success" @click="addSessionClicked"><i class="fa fa-play"></i> Iniciar</b-button>
                  <b-button v-show="!addSessionVar" type="reset" size="sm" variant="danger" @click="goBack"><i class="fa fa-ban"></i> Cancelar</b-button>
                </b-col>
              </b-row>
            </div>
          </b-form>
          
          <b-table v-show="addSessionVar" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="tableitems" :fields="tablefields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
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
            <b-button type="reset" size="sm" variant="secondary" @click="goBack"><i class="fa fa-chevron-left"></i> Atras</b-button>
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
      sessionDepartmentName: null,
      sessionDepartmentOptions: [
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
      sessionLocationName: null,
      sessionLocationOptions: [
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
    selectClicked () {
      if (this.sessionDepartmentName && this.sessionLocationName) {
        this.validateSelectsVar = true
      }

      
    }
  }


}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
