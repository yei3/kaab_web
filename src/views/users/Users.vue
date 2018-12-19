<template>
  <b-row>
    <b-col cols="12">
      <transition name="slide">
      <b-card>
        <div slot="header">
          {{caption}}
          <div class="card-header-actions">
            <b-link href="#/users/adduser" class="card-header-action">
              <i class="fa fa-plus-square"></i>
            </b-link>
          </div>
        </div>
        <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="usuarios" :fields="fields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
          <template slot="id" slot-scope="data">
            {{data.item.id}}
          </template>
          <template slot="name" slot-scope="data">
            {{data.item.name}}
          </template>
          <template slot="role" slot-scope="data">
            {{data.item.role ==  'roltst' ? 'Test':'New'}}
          </template>
          <template slot="statusID" slot-scope="data">
            <b-badge :variant="getBadge(data.item.statusID)">{{data.item.statusID ==1 ? 'Activo' : 'Inactivo'}}</b-badge>
          </template>
        </b-table>
         <nav>
          <b-pagination size="sm" :total-rows="getRowCount(usuarios)" :per-page="perPage" v-model="currentPage" prev-text="Ant" next-text="Sig" hide-goto-end-buttons/>
        </nav>
      </b-card>
      </transition>
    </b-col>
  </b-row>
</template>



<script>
import usersData from './UsersData'
import axios from 'axios'
export default {
  name: 'Users',
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
  data: () => {
    return {
     fields: [
        {label: 'ID', key: 'id', sortable: true},
        {label: 'User', key: 'user', sortable: true},
        {label: 'Nombre', key: 'names', sortable: true},
        {label: 'Apellido', key: 'lastname', sortable: true},
        {label: 'Rol', key: 'role', sortable: true},
        {label: 'Estatus', key: 'statusID', sortable: true}
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      usuarios: []
    }
  },
  computed: {
  },
  methods: {
    getBadge (status) {
      return status === 1 ? 'success'
        : status === '0' ? 'secondary'
          : status === 'Pendiente' ? 'warning'
            : status === 'Eliminado' ? 'danger' : 'primary'
    },
    getRowCount (items) {
      return items.length
    },
    regLink (id) {
      return `users/user/${id.toString()}`
    },
    rowClicked (item) {
      const regLink = this.regLink(item.id)
      this.$router.push({path: regLink})
    }

  },
  created(){
    axios
      .get('https://so2ut5rylh.execute-api.us-west-2.amazonaws.com/Prod/getAllUsers')
      
      .then(response => (this.usuarios = response.data.users))
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
