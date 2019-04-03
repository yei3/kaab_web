<template>
  <b-row>
    <b-col lg="12">
      <transition name="slide">
        <b-card>
          <div slot="header">
            {{caption}}
          </div>

          <b-table :busy="!flag"  :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="lg" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" style="overflow-x: scroll">
            <div slot="table-busy" class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
            <template slot="id" slot-scope="data">
              {{data.item.id}}
            </template>
            <template slot="keyField" slot-scope="data">
              {{data.item.keyField}}
            </template>
            <template slot="assetType" slot-scope="data">
              {{data.item.assetType}}
            </template>
            <template slot="asset" slot-scope="data">
              {{data.item.asset}}
            </template>
            <template slot="description" slot-scope="data">
              {{data.item.description}}
            </template>
            <template slot="brand" slot-scope="data">
              {{data.item.brand}}
            </template>
            <template slot="model" slot-scope="data">
              {{data.item.model}}
            </template>
            <template slot="serial" slot-scope="data">
              {{data.item.serial}}
            </template>
            <template slot="acquisitionDate" slot-scope="data">
              {{data.item.acquisitionDate}}
            </template>
            <template slot="acquisitionType" slot-scope="data">
              {{data.item.acquisitionType}}
            </template>
            <template slot="invoice" slot-scope="data">
              {{data.item.invoice}}
            </template>
            <template slot="price" slot-scope="data">
              ${{data.item.price}}
            </template>
            <template slot="tax" slot-scope="data">
              ${{data.item.tax}}
            </template>
            <template slot="cost" slot-scope="data">
              ${{data.item.cost}}
            </template>
            <template slot="currentValue" slot-scope="data">
              ${{data.item.currentValue}}
            </template>
            <template slot="accountingDepreciation" slot-scope="data">
              {{data.item.accountingDepreciation}}
            </template>
            <template slot="fiscalDepreciation" slot-scope="data">
              {{data.item.fiscalDepreciation}}
            </template>
            <template slot="lastDepartmentID" slot-scope="data">
              {{getDepartmentById(data.item.lastDepartmentID)}}
            </template>
            <template slot="currentDepartmentID" slot-scope="data">
              {{getDepartmentById(data.item.currentDepartmentID)}}
            </template>
            <template slot="costCenterID" slot-scope="data">
              {{getCostCenterById(data.item.costCenterID)}}
            </template>
            <template slot="accountingAccount" slot-scope="data">
              {{getAccountingAccountById(data.item.accountingAccount)}}
            </template>
            <template slot="locationID" slot-scope="data">
              {{getLocationById(data.item.locationID)}}
            </template>
            <template slot="locationDetail" slot-scope="data">
              {{data.item.locationDetail}}
            </template>
            <template slot="comments" slot-scope="data">
              {{data.item.comments}}
            </template>
            <template slot="personalString01" slot-scope="data">
              {{data.item.personalString01}}
            </template>
            <template slot="personalString02" slot-scope="data">
              {{data.item.personalString03}}
            </template>
            <template slot="personalString03" slot-scope="data">
              {{data.item.personalString03}}
            </template>
            <template slot="personalString04" slot-scope="data">
              {{data.item.personalString04}}
            </template>
            <template slot="personalInt01" slot-scope="data">
              {{data.item.personalInt01}}
            </template>
            <template slot="creationDateTime" slot-scope="data">
              {{data.item.creationDateTime}}
            </template>
            <template slot="creationUserID" slot-scope="data">
              {{getUserById(data.item.creationUserID)}}
            </template>
            <template slot="lastModDateTime" slot-scope="data">
              {{data.item.lastModDateTime}}
            </template>
            <template slot="status" slot-scope="data">
              <b-badge :variant="getBadge(data.item.status)">{{getStatus(data.item.statusID)}}</b-badge>
            </template>

          </b-table>
          <nav>
            <b-pagination size="sm" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Ant" next-text="Sig" hide-goto-end-buttons/>
          </nav>
        </b-card>
      </transition>
    </b-col>
  </b-row>
</template>


<script>
  import getById from '../../services/GetCatalogById'
  import reports from '../../services/Reports'
  import { CodeLoader } from 'vue-content-loader';
  //import usersData from './UsersData'
  export default {
    name: 'Assets',
    props: {
      caption: {
        type: String,
        default: 'Usuarios'
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
    components: {
      CodeLoader
    },
    data: () => {
      return {
        items: [],
        flag: false,
        fields: [
          {label: 'ID', key: 'id', sortable: true},
          {label: 'Inventario', key: 'keyField', sortable: true},
          {label: 'Tipo de activo', key: 'assetType', sortable: true},
          {label: 'Bien', key: 'asset', sortable: true},
          {label: 'Descripción', key: 'description', sortable: true},
          {label: 'Marca', key: 'brand', sortable: true},
          {label: 'Modelo', key: 'model', sortable: true},
          {label: 'Serie', key: 'serial', sortable: true},
          {label: 'Fecha de adquisicion', key: 'acquisitionDate', sortable: true},
          {label: 'Tipo de adquisicion', key: 'acquisitionType', sortable: true},
          {label: 'Factura', key: 'invoice', sortable: true},
          {label: 'Precio', key: 'price', sortable: true},
          {label: 'Impuesto', key: 'tax', sortable: true},
          {label: 'Costo', key: 'cost', sortable: true},
          {label: 'Valor', key: 'currentValue', sortable: true},
          {label: 'Depreciacion contable', key: 'accountingDepreciation', sortable: true},
          {label: 'Depreciacion fiscal', key: 'fiscalDepreciation', sortable: true},
          {label: 'Ultimo departammento', key: 'lastDepartmentID', sortable: true},
          {label: 'Departamento actual', key: 'currentDepartmentID', sortable: true},
          {label: 'Centro de Costo', key: 'costCenterID', sortable: true},
          {label: 'Cuenta Contable', key: 'accountingAccount', sortable: true},
          {label: 'Ubicación', key: 'locationID', sortable: true},
          {label: 'Detalle de Ubicación', key: 'locationDetail', sortable: true},
          {label: 'Comentarios', key: 'comments', sortable: true},
          {label: 'Alta', key: 'personalString01', sortable: true},
          {label: 'Inventario anterior', key: 'personalString02', sortable: true},
          {label: 'Partida', key: 'personalString03', sortable: true},
          {label: 'CABM', key: 'personalString04', sortable: true},
          {label: 'Año', key: 'personalInt01', sortable: true},
          {label: 'Fecha de Creación', key: 'creationDateTime', sortable: true},
          {label: 'Usuario', key: 'creationUserID', sortable: true},
          {label: 'Ultima Modificación', key: 'lastModDateTime', sortable: true},
          {label: 'Modalidad', key: 'status', sortable: true}
        ],
        currentPage: 1,
        perPage: 10,
        totalRows: 0
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/pages/login')
      }
    },
    async mounted() {
      const assets = await reports.getDepartmentChangedFinalAssetsReport(this.$session.get('projectID'));
      this.items = assets.data.finalAssets;
      this.flag = true;
    },
    computed: {
    },
    methods: {
      async getDepartmentById(id){
        const dep = await getById.getDepartmentById(id);
        return dep.data.error.errorCode === 0 ? dep.data.department.name : '';
      },
      async getCostCenterById(id){
        const dep = await getById.getCostCenterById(id);
        return dep.data.error.errorCode === 0 ? dep.data.costCenter.name : '';
      },
      async getAccountingAccountById(id){
        const dep = await getById.getAccountingAccountById(id);
        return dep.data.error.errorCode === 0 ? dep.data.accountingAccount.name : '';
      },
      async getLocationById(id){
        const dep = await getById.getLocationById(id);
        return dep.data.error.errorCode === 0 ? dep.data.location.name : '';
      },
      async getUserById(id){
        const dep = await getById.getUserById(id);
        return dep.data.error.errorCode === 0 ? dep.data.user.names : '';
      },
      getBadge (statusID) {
        return statusID === 2 ? 'success' //activo
          : statusID === 3 ? 'secondary' //inactivo
            : statusID === 'Pendiente' ? 'warning'
              : statusID === 'Eliminado' ? 'danger' : 'primary'
      },
      getStatus (statusID) {
        return statusID === 2 ? 'Activo'
          : statusID === 3 ? 'Inactivo' //
            : statusID === 'Pendiente' ? 'Pendiente'
              : statusID === 'Eliminado' ? 'Eliminado' : 'primary'
      },
      getRowCount (items) {
        return items ? items.length : 0
      },
      regLink (id) {
        return `users/user/${id.toString()}`
      },
      rowClicked (item) {
        const regLink = this.regLink(item.id)
        this.$router.push({path: regLink})
      },
      addClick () {
        this.$router.push({path: `users/adduser`})
      }
    }
  }
</script>

<style scoped>
  .card-body >>> table > tbody > tr > td {
    cursor: pointer;
  }
</style>
