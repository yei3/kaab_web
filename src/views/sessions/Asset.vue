<template>
  <div class="animated fade-in">
    <b-row>
      <b-col md="12" lg="6">
        <b-card>
          <div slot="header">
            <strong>{{caption}}</strong><small> ID: {{items($route.params.idasset).id }}</small>
            <small class="float-right text-muted">
              ID Sesión: {{items($route.params.idsession).id }}
            </small>
          </div>
          <b-form>
            <b-form-group>
              <label class="small muted" for="keyfield">Clave</label>
              <b-form-input type="text" id="keyfield" v-model="items($route.params.idasset).keyfield" :disabled="true" placeholder="Introduce la clave"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label class="small muted" for="asset">Activo</label>
              <b-form-input type="text" id="asset" v-model="items($route.params.idasset).asset" :disabled="true" placeholder="Introduce el activo"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label class="small muted" for="description">Descripción</label>
              <b-form-input type="text" id="description" v-model="items($route.params.idasset).description" :disabled="true" placeholder="Introduce la descripción"></b-form-input>
            </b-form-group>
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label class="small muted" for="brand">Marca</label>
                  <b-form-input type="text" id="brand" v-model="items($route.params.idasset).brand" :disabled="true" placeholder="Introduce la marca"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label class="small muted" for="model">Modelo</label>
                  <b-form-input type="text" id="model" v-model="items($route.params.idasset).model" :disabled="true" placeholder="Introduce el modelo"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label class="small muted" for="serial">Serie</label>
                  <b-form-input type="text" id="brand" v-model="items($route.params.idasset).serial" :disabled="true" placeholder="Introduce el número de serie"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label class="small muted" for="cost">Costo</label>
                  <b-form-input type="text" id="cost" v-model="items($route.params.idasset).cost" :disabled="true" placeholder="Introduce el costo"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-group>
              <label class="small muted" for="assetType">Tipo de activo</label>
              <b-form-input type="text" id="assetType" v-model="items($route.params.idasset).assetType" :disabled="true" placeholder="Introduce el tipo de activo"></b-form-input>
            </b-form-group>
            <!--<b-row>
              <b-col>
                <b-form-group>
                  <label for="assetType">Tipo de activo</label>
                  <b-form-select id="assetType" v-model="items($route.params.id).assetType" 
                    :options="['Tipo de activo...', 'Mobiliario','Equipo','Maquinaria','Instrumental','Vehículo', 'Inmueble', 'Terreno', 'Bien natural', 'Otro']"
                    value="Tipo de activo...">
                  </b-form-select>
              </b-form-group>
              </b-col>
            </b-row>-->
            <b-form-group>
              <label class="small muted" for="comments">Comentarios</label>
              <b-form-input type="text" id="comments" v-model="items($route.params.idasset).comments" :disabled="true" placeholder="Introduce los comentarios"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label class="small muted" for="status">Estatus</label>
              <b-form-input type="text" id="status" v-model="items($route.params.idasset).status" :disabled="true" placeholder="Introdude el estatus"></b-form-input>
            </b-form-group>
          </b-form>
          <div slot="footer">
            <div class="pull-right">
              <b-button type="reset" size="sm" variant="secondary" @click="goBack"><i class="fa fa-chevron-left"></i> Atras</b-button>
            </div>
          </div>
        </b-card>
      </b-col>

      <b-col md="12" lg="6">
        <b-card
          header-tag="header"
          footer-tag="footer">
          <div slot="header">
            <i class="fa fa-align-justify"></i><strong> Imágenes del activo</strong>
            <div class="card-header-actions">
              <b-button type="button" variant="primary" class="float-right" size="sm"><i class="fa fa-cloud-download"></i></b-button>
            </div>
          </div>
          <div>
            <b-carousel id="carousel1"
                        style="text-shadow: 1px 1px 2px #333;"
                        controls
                        indicators
                        background="#ababab"
                        :interval="4000"
                        img-width="1024"
                        img-height="768"
                        v-model="slide"
                        @sliding-start="onSlideStart"
                        @sliding-end="onSlideEnd"
            >

              <!-- Text slides with image -->
              <b-carousel-slide img-src="https://lorempixel.com/1024/768/technics/2/"
              ></b-carousel-slide>

              <!-- Slides with custom text -->
              <b-carousel-slide img-src="https://lorempixel.com/1024/768/technics/4/">
              </b-carousel-slide>

              <!-- Slides with image only -->
              <b-carousel-slide img-src="https://lorempixel.com/1024/768/technics/8/">
              </b-carousel-slide>
            </b-carousel>

            <p class="small muted mt-4">
              Imagen: {{ slide + 1 }}
            </p>

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
          <b-table striped small fixed responsive="lg" :items="items($route.params.id)" :fields="fields">
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
      slide: 0
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    },
    onSlideStart (slide) {
      console.log('onSlideStart', slide)
      this.sliding = true
    },
    onSlideEnd (slide) {
      console.log('onSlideEnd', slide)
      this.sliding = false
    }
  }
}
</script>
