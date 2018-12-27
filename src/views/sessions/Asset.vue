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
              <label for="user">Clave</label>
              <b-form-input type="text" id="keyfield" v-model="items($route.params.idasset).keyfield" :disabled="true" placeholder="Introduce la clave"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="name">Activo</label>
              <b-form-input type="text" id="asset" v-model="items($route.params.idasset).asset" :disabled="true" placeholder="Introduce el activo"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="name">Descripción</label>
              <b-form-input type="text" id="description" v-model="items($route.params.idasset).description" :disabled="true" placeholder="Introduce la descripción"></b-form-input>
            </b-form-group>
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="brand">Marca</label>
                  <b-form-input type="text" id="brand" v-model="items($route.params.idasset).brand" :disabled="true" placeholder="Introduce la marca"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="model">Modelo</label>
                  <b-form-input type="text" id="model" v-model="items($route.params.idasset).model" :disabled="true" placeholder="Introduce el modelo"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="serial">Serie</label>
                  <b-form-input type="text" id="brand" v-model="items($route.params.idasset).serial" :disabled="true" placeholder="Introduce el número de serie"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="cost">Costo</label>
                  <b-form-input type="text" id="cost" v-model="items($route.params.idasset).cost" :disabled="true" placeholder="Introduce el costo"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-group>
              <label for="assetType">Tipo de activo</label>
              <b-form-input type="text" id="assetType" v-model="items($route.params.idasset).assetType" :disabled="true" placeholder="Introduce el tipo de activo"></b-form-input>
            </b-form-group>
            <!--<b-row>
              <b-col>
                <b-form-group>
                  <label for="assetType">Tipo de activo</label>
                  <b-form-select id="assetType" v-model="items($route.params.id).assetType" 
                    :plain="true"
                    :options="['Tipo de activo...', 'Mobiliario','Equipo','Maquinaria','Instrumental','Vehículo', 'Inmueble', 'Terreno', 'Bien natural', 'Otro']"
                    value="Tipo de activo...">
                  </b-form-select>
              </b-form-group>
              </b-col>
            </b-row>-->
            <b-form-group>
              <label for="comments">Comentarios</label>
              <b-form-input type="text" id="comments" v-model="items($route.params.idasset).comments" :disabled="true" placeholder="Introduce los comentarios"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="status">Estatus</label>
              <b-form-input type="text" id="status" v-model="items($route.params.idasset).status" :disabled="true" placeholder="Introdude el estatus"></b-form-input>
            </b-form-group>
          </b-form>
          <div slot="footer">
            <!--<b-button type="submit" size="sm" variant="success"><i class="fa fa-save"></i> Guardar</b-button>-->
            <b-button type="reset" size="sm" variant="secondary" @click="goBack"><i class="fa fa-chevron-left"></i> Atras</b-button>
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
