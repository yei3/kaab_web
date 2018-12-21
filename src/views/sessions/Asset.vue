<template>
  <div class="animated fade-in">
    <b-row>
      <b-col sm="6">
        <b-card>
          <div slot="header">
            <strong>{{caption}}</strong><small> ID: {{items($route.params.idasset).id }}</small>
            <small class="float-right text-muted">
              ID Sesión: {{items($route.params.idsession).id }}
            </small>
          </div>
          <b-form>
            <b-form-group>
              <label for="user">Usuario</label>
              <b-form-input type="text" id="mail" v-model="items($route.params.idasset).keyfield" placeholder="usuario@mi-empresa.com"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="name">Nombre</label>
              <b-form-input type="text" id="name" v-model="items($route.params.idasset).asset" placeholder="Introduce tu nombre"></b-form-input>
            </b-form-group>
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="role">Rol</label>
                  <b-form-select id="role" v-model="items($route.params.idasset).asset" 
                    :plain="true"
                    :options="['Admin','Gerente','Coordinador','Operativo','Auditor']"
                    value="Operativo">
                  </b-form-select>
              </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="status">Estatus</label>
                  <b-form-select id="status" v-model="items($route.params.idasset).status  " 
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


    {id: 30, keyfield: 'HGM0012374', asset: 'Silla', description: 'Silla de madera', brand: 'ND', model: 'ND', serial:'ND', cost: '180.00', assetType: 'Mobiliario', locationDetail: '', comments: 'No tiene una pata',  status: 'Cambio de departamento'}

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
import assetsData from './AssetsData'
export default {
  name: 'Asset',
  props: {
    caption: {
      type: String,
      default: 'Detalle de activo'
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
        const asset = assetsData.find( asset => asset.id.toString() === id)
        return asset
      },
      fields: [
        {label: 'ID', key: 'id'},
        {label: 'Clave', key: 'keyfield'},
        {label: 'Activo', key: 'asset'},
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
