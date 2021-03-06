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
          <code-loader v-if="!items.length"
                       :speed="2"
                       :animate="true"
          ></code-loader>
          <b-table v-else :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="lg" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
            <template slot="id" slot-scope="data">
              {{data.item.id}}
            </template>
            <template slot="name" slot-scope="data">
              {{data.item.name}}
            </template>
            <template slot="fiscalID" slot-scope="data">
              {{data.item.fiscalID}}
            </template>
            <template slot="status" slot-scope="data">
              <b-badge :variant="getBadge(data.item.statusID)">{{data.item.statusID}}</b-badge>
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
    name: 'Companies',
    props: {
      caption: {
        type: String,
        default: 'Empresas'
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
        fields: [
          {label: 'ID', key: 'id', sortable: true},
          {label: 'Nombre', key: 'name', sortable: true},
          {label: 'RFC', key: 'fiscalID', sortable: true},
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
      const cmpns = await getAll.getAllCompanies();
      this.items = cmpns.data.companies;
    },
    computed: {
    },
    methods: {
      getBadge (status) {
        return status === 'Activo' ? 'success'
          : status === 'Inactivo' ? 'secondary'
            : status === 'Pendiente' ? 'warning'
              : status === 'Eliminado' ? 'danger' : 'primary'
      },
      getRowCount (items) {
        return items.length
      },
      regLink (id) {
        return `companies/company/${id.toString()}`
      },
      rowClicked (item) {
        const regLink = this.regLink(item.id)
        this.$router.push({path: regLink})
      },
      addClick () {
        this.$router.push({path: `companies/addCompany`})
      }
    }
  }
</script>

<style scoped>
  .card-body >>> table > tbody > tr > td {
    cursor: pointer;
  }
</style>
