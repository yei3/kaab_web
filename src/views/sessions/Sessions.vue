<template>
  <b-row>
    <b-col>
      <transition name="slide">
      <b-card>
        <div slot="header">
          {{caption}}
          <div class="card-header-actions">
            <b-button type="button" variant="primary" class="float-right" size="sm" @click="addClick"><i class="fa fa-plus"></i></b-button>
          </div>
        </div>
        <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="lg" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
          <template slot="id" slot-scope="data">
            {{data.item.id}}
          </template>
          <template slot="name" slot-scope="data">
            {{data.item.name}}
          </template>
          <template slot="status" slot-scope="data">
            <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
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
import { URLSearchParams } from 'url';
export default {
  name: 'Sessions',
  props: {
    caption: {
      type: String,
      default: 'Sesiones de registro'
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
  },beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/pages/login')
    }
  },
  data: () => {
    return {
      items: [],
      fields: [
        {label: 'ID', key: 'id', sortable: true},
        {label: 'Inicio', key: 'creationDateTime', sortable: true},
        {label: 'Departamento', key: 'sessionDepartmentName', sortable: true},
        {label: 'Ubicación', key: 'sessionLocationName', sortable: true},
        {label: 'Fin', key: 'finalDateTime', sortable: true}
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0
    }
  },
  computed: {
  },
  async mounted() {
    const rgsSssns = await gets.getRegistrationSessionsByUser(this.$session.get('userId'));
    console.info(rgsSssns)
    this.items = rgsSssns.data.registrationSessions;
    this.flag = true;
  },
  methods: {
    getBadge (status) {
      return status === 'Activa' ? 'success'
        : status === 'Terminada' ? 'secondary'
          : status === 'Pendiente' ? 'warning'
            : status === 'Eliminado' ? 'danger' : 'primary'
    },
    getRowCount (items) {
      return items ? items.length : 0
    },
    regLink (id) {
      return `sessions/session/${id.toString()}`
    },
    rowClicked (item) {
      const regLink = this.regLink(item.id)
      this.$router.push({path: regLink})
    },
    addClick () {
      this.$router.push({path: `sessions/addsession`})
    }
  }
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
