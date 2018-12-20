<template>
  <div class="animated fade-in">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>{{caption}}</strong><small> ID: {{items($route.params.id).id }}</small>
              <small class="float-right text-muted">
                {{items($route.params.id).creationDateTime}} - {{items($route.params.id).finalDateTime}}
              </small>
              <b-row class="mt-3">
              <b-col sm="4">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="name" :disabled="true" v-model="items($route.params.id).userName" placeholder="Nombre"></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-sitemap"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="sessionDepartmentName" :disabled="true" v-model="items($route.params.id).sessionDepartmentName" placeholder="Departamento"></b-form-input>
                    <!--<b-form-select id="sessionDepartmentName" :disabled="true" v-model="items($route.params.id).sessionDepartmentName" 
                      :plain="true"
                      :options="['Departamento...','Cancerología','Dirección General','Enfermería','Especialidades', 'Ginecología','Inventarios', 'Legales', 'Psiquiatría', 'Seguridad', 'Soporte']"
                      value="Departamento...">
                    </b-form-select>-->
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="sessionLocationName" :disabled="true" v-model="items($route.params.id).sessionLocationName" placeholder="Ubicación"></b-form-input>
                    <!--<b-form-select id="sessionLocationName" :disabled="true" v-model="items($route.params.id).sessionLocationName  " 
                      :plain="true"
                      :options="['Ubicación...','Edificio 16','Edificio 23','Edificio de Gobierno','Laboratorios', 'Torre A','Torre B', 'Torre C', 'Torre D', 'Torre E']"
                      value="Ubicación...">
                    </b-form-select>-->
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          
          <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
            <template slot="id" slot-scope="data2">
              {{data2.item.id}}
            </template>
            <template slot="name" slot-scope="data2">
              {{data2.item.name}}
            </template>
            <template slot="status" slot-scope="data2">
              <b-badge :variant="getBadge(data2.item.status)">{{data2.item.status}}</b-badge>
            </template>
          </b-table>
          <!--<nav>
            <b-pagination size="sm" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Ant" next-text="Sig" hide-goto-end-buttons/>
          </nav>-->

          <!--<div slot="footer">
            <b-button type="reset" size="sm" variant="secondary" @click="goBack"><i class="fa fa-chevron-left"></i> Atras</b-button>
          </div>-->
        </b-card>
      </b-col>
    </b-row>
  </div>
  
</template>

<script>
import sessionsData from './SessionsData'
import assetsData from './AssetsData'
export default {
  name: 'Session',
  props: {
    caption: {
      type: String,
      default: 'Detalle de sesión'
    },
  },
  data: () => {
    return {
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
      
    }
  },
  data2: () => {
    return {
      items2: sessionsData.filter((session) => session.id > 0),
      fields: [
        {label: 'ID', key: 'id', sortable: true},
        {label: 'Clave', key: 'keyfield', sortable: true},
        {label: 'Activo', key: 'assets', sortable: true},
        {label: 'Descripción', key: 'description', sortable: true},
        {label: 'Costo', key: 'cost', sortable: true},
        {label: 'Tipo', key: 'assetType', sortable: true},
        {label: 'Estatus', key: 'status', sortable: true}
      ],
      currentPage: 1,
      perPage: 25,
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
    getRowCount (items) {
      return items.length
    },
    regLink (id) {
      return `sessions/session/asset/${id.toString()}`
    },
    rowClicked (item) {
      const regLink = this.regLink(item.id)
      this.$router.push({path: regLink})
    }
  },
  name: 'Assets',
    props: {
      caption: {
        type: String,
        default: 'Activos registrados'
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
    }


}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
