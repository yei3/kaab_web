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
              {{data.item.names}}
            </template>
            <template slot="fiscalID" slot-scope="data">
              {{data.item.lastname}}
            </template>
            <template slot="fiscalID" slot-scope="data">
              {{data.item.position}}
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
  import gets from '../../services/Gets'
  import { CodeLoader } from 'vue-content-loader';
  export default {
    name: 'Contacts',
    props: {
      caption: {
        type: String,
        default: 'Contactos'
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
          {label: 'Nombre', key: 'names', sortable: true},
          {label: 'Apellido', key: 'lastname', sortable: true},
          {label: 'Puesto', key: 'position', sortable: true},
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
      const cntcts = await gets.getContactsByCompany(this.$session.get('companyID'));
      this.items = cntcts.data.contacts;
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
        return `contacts/contact/${id.toString()}`
      },
      rowClicked (item) {
        const regLink = this.regLink(item.id)
        this.$router.push({path: regLink})
      },
      addClick () {
        this.$router.push({path: `contacts/addContact`})
      }
    }
  }
</script>

<style scoped>
  .card-body >>> table > tbody > tr > td {
    cursor: pointer;
  }
</style>
