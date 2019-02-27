<template>
  <b-row>
    <b-col lg="12">
      <transition name="slide">
        <b-card>
          <div slot="header">
            {{caption}}
            <div class="card-header-actions">
              <b-button type="button" variant="primary" class="float-right" size="sm" @click="addClick"><i class="fa fa-plus"></i></b-button>
            </div>
          </div>
          <code-loader v-if="!flag"
                          :speed="2"
                          :animate="true"
          ></code-loader>
          <b-table v-else :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="lg" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
            <template slot="id" slot-scope="data">
              {{data.item.id}}
            </template>
            <template slot="companyID" slot-scope="data">
              {{data.item.companyID}}
            </template>
            <template slot="name" slot-scope="data">
              {{data.item.name}}
            </template>
            <template slot="statusID" slot-scope="data">
              <b-badge :variant="getBadge(data.item.statusID)">{{getStatus(data.item.statusID)}}</b-badge>
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
  import getAll from '../../services/GetAllCatalog'
  import { CodeLoader } from 'vue-content-loader';
  export default {
    name: 'CostCenters',
    props: {
      caption: {
        type: String,
        default: 'Centros de Costo'
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
          {label: 'Empresa', key: 'companyID', sortable: true},
          {label: 'Nombre', key: 'name', sortable: true},
          {label: 'Estatus', key: 'statusID', sortable: true}
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
      const cstcntrs = await getAll.getAllCostCenters();
      this.items = cstcntrs.data.costCenters;
      this.flag = true;
    },
    computed: {
    },
    methods: {
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
        return `costcenters/costcenter/${id.toString()}`
      },
      rowClicked (item) {
        const regLink = this.regLink(item.id)
        this.$router.push({path: regLink})
      },
      addClick () {
        this.$router.push({path: `costcenters/addcostcenter`})
      }
    }
  }
</script>

<style scoped>
  .card-body >>> table > tbody > tr > td {
    cursor: pointer;
  }
</style>
