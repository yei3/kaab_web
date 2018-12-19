<template>
  <div class="animated fade-in">
    <b-row>
      <b-col sm="6">
        <b-card>
          <div slot="header">
            <strong>{{caption}}</strong><small> ID: {{items($route.params.id).id }}</small>
          </div>
          <b-form>
            <b-form-group>
              <label for="user">Usuario</label>
              <b-form-input type="text" id="mail" v-model="items($route.params.id).user" placeholder="usuario@mi-empresa.com"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="name">Nombre</label>
              <b-form-input type="text" id="name" v-model="items($route.params.id).name" placeholder="Introduce tu nombre"></b-form-input>
            </b-form-group>
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="role">Rol</label>
                  <b-form-select id="role" v-model="items($route.params.id).role" 
                    :plain="true"
                    :options="['Admin','Gerente','Coordinador','Operativo','Auditor']"
                    value="Operativo">
                  </b-form-select>
              </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="status">Estatus</label>
                  <b-form-select id="status" v-model="items($route.params.id).status  " 
                    :plain="true"
                    :options="['Activo','Inactivo']"
                    value="Activo">
                  </b-form-select>
              </b-form-group>
              </b-col>
            </b-row>
          </b-form>
          <div slot="footer">
            <b-button type="submit" size="sm" variant="success"><i class="fa fa-save"></i> Guardar</b-button>
            <b-button type="reset" size="sm" variant="danger" @click="goBack"><i class="fa fa-ban"></i> Cancelar</b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!--<b-row>
      <b-col cols="12" lg="6">
        <b-card no-header>
          <template slot="header">
            User id:  {{ $route.params.id }}
          </template>
          <b-table striped small fixed responsive="sm" :items="items($route.params.id)" :fields="fields">
            <template slot="value" slot-scope="data">
              <strong>{{data.item.value}}</strong>
            </template>
          </b-table>
          <template slot="footer">
            <b-button @click="goBack">Back</b-button>
          </template>
        </b-card>
      </b-col>
    </b-row>-->
  </div>
  
</template>

<script>
import usersData from './UsersData'
export default {
  name: 'User',
  props: {
    caption: {
      type: String,
      default: 'Modificar usuario'
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
      items: (id) => {
        const user = usersData.find( user => user.id.toString() === id)
        return user
      },
      fields: [
        {label: 'ID', key: 'id'},
        {label: 'Nombre', key: 'name'},
        {label: 'Rol', key: 'role'},
        {label: 'Estatus', key: 'status'}
      ],
      
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    }
  }
}
</script>
