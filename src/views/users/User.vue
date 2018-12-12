<template>
  <div class="animated fade-in">
    <b-row>
      <b-col sm="6">
        <b-card>
          <div slot="header">
            <strong>Usuario </strong><small>Agregar</small>
          </div>
          <b-form>
            <b-form-group>
              <label for="user">Usuario</label>
              <b-form-input type="text" id="mail" placeholder="usuario@mi-empresa.com"> de</b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="name">Nombre</label>
              <b-form-input type="text" id="name" placeholder="Introduce tu nombre">{{ data.items.name }}</b-form-input>
            </b-form-group>
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="role">Rol</label>
                  <b-form-select id="role"
                    :plain="true"
                    :options="['Admin','Gerente','Coordinador','Operativo','Auditor']"
                    value="Operativo">
                  </b-form-select>
              </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="status">Estatus</label>
                  <b-form-select id="status"
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
      default: 'User id'
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
      //items: usersData.find( (user) => user.id.toString() === id),
      items: usersData.filter((user) => user.id === 3),
      fields: [
        {label: 'ID', key: 'id', sortable: true},
        {label: 'Nombre', key: 'name', sortable: true},
        {label: 'Rol', key: 'role', sortable: true},
        {label: 'Estatus', key: 'status', sortable: true}
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
