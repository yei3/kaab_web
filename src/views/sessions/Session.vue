<template>
  <div class="animated fade-in">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>{{caption}}</strong><small> ID: {{ items($route.params.idsession).id }}</small>
              <small class="float-right text-muted">
                {{ items($route.params.idsession).creationDateTime }} - {{ items($route.params.idsession).finalDateTime }}
              </small>
              <b-row class="mt-3">
              <b-col sm="4">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="name" :disabled="true" v-model="items($route.params.idsession).userName" placeholder="Nombre"></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-sitemap"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="sessionDepartmentName" :disabled="true" v-model="items($route.params.idsession).sessionDepartmentName" placeholder="Departamento"></b-form-input>
                    <!--<b-form-select id="sessionDepartmentName" :disabled="true" v-model="items($route.params.id).sessionDepartmentName" 
                      :plain="true"
                      :options="['Departamento...','Cancerología','Dirección General','Enfermería','Especialidades', 'Ginecología','Inventarios', 'Legales', 'Psiquiatría', 'Seguridad', 'Soporte']"
                      value="Departamento...">
                    </b-form-select>-->
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="sessionLocationName" :disabled="true" v-model="items($route.params.idsession).sessionLocationName" placeholder="Ubicación"></b-form-input>
                    <!--<b-form-select id="sessionLocationName" :disabled="true" v-model="items($route.params.id).sessionLocationName  " 
                      :plain="true"
                      :options="['Ubicación...','Edificio 16','Edificio 23','Edificio de Gobierno','Laboratorios', 'Torre A','Torre B', 'Torre C', 'Torre D', 'Torre E']"
                      value="Ubicación...">
                    </b-form-select>-->
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          
          <b-row>
            <b-col sm="12">
              <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="lg" :items="tableitems" :fields="tablefields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
                <template slot="id" slot-scope="data">
                  {{data.item.id}}
                </template>
                <template slot="keyfield" slot-scope="data">
                  {{data.item.keyfield}}
                </template>
                <template slot="status" slot-scope="data">
                  <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
                </template>
              </b-table>
              <nav>
                <b-pagination size="sm" :total-rows="getRowCount(tableitems)" :per-page="perPage" v-model="currentPage" prev-text="Ant" next-text="Sig" hide-goto-end-buttons/>
              </nav>
            </b-col>
          </b-row>

          <div slot="footer">
            <div class="pull-right">
              <b-button type="reset" size="sm" variant="secondary" @click="goBack"><i class="fa fa-chevron-left"></i> Atras</b-button>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!--MODAL-->
    <b-modal title="Detalle de activo" v-model="assetModal" ok-only>
      <div>
        <b-row>
          <b-col lg="12">
            <b-card>
              <div slot="header">
                <strong> {{ tableitems[itemSelected].status }} </strong>
                <small> ID: {{ tableitems[itemSelected].id }} </small>
                <small class="float-right text-muted">
                  ID Sesión: {{ items($route.params.idsession).id }}
                </small>
              </div>
              <b-form>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-barcode" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="keyfield" v-model="tableitems[itemSelected].keyfield" :disabled="true"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-cube" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="asset" v-model="tableitems[itemSelected].asset" :disabled="true"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="description">Descripción</label>
                  <b-form-input type="text" id="description" v-model="tableitems[itemSelected].description" :disabled="true"></b-form-input>
                </b-form-group>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="brand">Marca</label>
                      <b-form-input type="text" id="brand" v-model="tableitems[itemSelected].brand" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="model">Modelo</label>
                      <b-form-input type="text" id="model" v-model="tableitems[itemSelected].model" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="serial">Serie</label>
                      <b-form-input type="text" id="brand" v-model="tableitems[itemSelected].serial" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="cost">Costo</label>
                      <b-form-input type="text" id="cost" v-model="tableitems[itemSelected].cost" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <label class="small muted" for="cost">Tipo de activo</label>
                      <b-form-input type="text" id="assetType" v-model="tableitems[itemSelected].assetType" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-sitemap" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="department" v-model="items($route.params.idsession).sessionDepartmentName" :disabled="true"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="location" v-model="items($route.params.idsession).sessionLocationName" :disabled="true"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="locationDetail">Detalles de la ubicación</label>
                  <b-form-input type="text" id="locationDetail" v-model="tableitems[itemSelected].locationDetail" :disabled="true"></b-form-input>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="comments">Comentarios</label>
                  <b-form-input type="text" id="comments" v-model="tableitems[itemSelected].comments" :disabled="true"></b-form-input>
                </b-form-group>
              </b-form>
            </b-card>
          </b-col>

          <b-col lg="12">
            <b-card
              header-tag="header"
              footer-tag="footer">
              <div slot="header">
                <i class="fa fa-align-justify"></i><strong> Imágenes del activo</strong>
                <div class="card-header-actions">
                  <b-button type="button" variant="primary" class="float-right" size="sm"><i class="fa fa-plus"></i></b-button>
                </div>
              </div>
              <div>
                <b-carousel id="carousel1"
                            style="text-shadow: 1px 1px 2px #333;"
                            controls
                            indicators
                            background="#ababab"
                            :interval="0"
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
      </div>
    </b-modal>

  </div>
  
</template>

<script>
import sessionsData from './SessionsData'
import assetsData from './AssetsData'
export default {
  name: 'Session',
  props: {
    caption: {
      type: String,
      default: 'Detalle de sesión'
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
      assetModal: false,
      itemSelected: 0,
      items: (id) => {
        const session = sessionsData.find( session => session.id.toString() === id)
        return session
      },
      fields: [
        {label: 'ID', key: 'id', sortable: true},
        {label: 'Inicio', key: 'creationDateTime', sortable: true},
        {label: 'Fin', key: 'finalDateTime', sortable: true},
        {label: 'Usuario', key: 'userName', sortable: true},
        {label: 'Departamento', key: 'sessionDepartmentName', sortable: true},
        {label: 'Ubicación', key: 'sessionLocationName', sortable: true},
        {label: 'Estatus', key: 'status', sortable: true}
      ],
      tableitems: assetsData.filter((asset) => asset.id > 0),
      tablefields: [
        {label: 'ID', key: 'id', sortable: true},
        {label: 'Clave', key: 'keyfield', sortable: true},
        {label: 'Activo', key: 'asset', sortable: true},
        {label: 'Descripción', key: 'description', sortable: true},
        {label: 'Costo', key: 'cost', sortable: true},
        {label: 'Tipo', key: 'assetType', sortable: true},
        {label: 'Estatus', key: 'status', sortable: true}
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      slide: 0
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getBadge (status) {
      return status === 'Conciliado' ? 'success'
      : status === 'Cambio de despartamento' ? 'primary'
      : status === 'Cambio de ubicación' ? 'primary'
      : status === 'Cambio de activo' ? 'primary'
      : status === 'En demasía' ? 'warning'
      : status === 'No inventariado' ? 'danger' : 'primary'
    },
    getRowCount (item) {
      return item.length
    },
    regLink (idsession,id) {
      return `${idsession.toString()}/asset/${id.toString()}`
    },
    rowClicked (item) {
      //const regLink = this.regLink(this.$route.params.idsession,item.id)
      //this.$router.push({ path: regLink })
      this.itemSelected = item.id - 1
      this.assetModal = true
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

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
