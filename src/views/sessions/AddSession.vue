<template>
  <div class="animated fade-in">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <b-form>
              <strong>{{ caption }}</strong><small> ID: {{ sessionID }}</small>
                <small class="float-right text-muted">
                  2019/01/09 11:12:06 - Vigente
                </small>
                <b-row class="mt-3">
                <b-col sm="4">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" id="name" :disabled="true" v-model="userName" placeholder="Nombre">{{ userName }}</b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-sitemap" ></i></b-input-group-text>
                      </b-input-group-prepend>
                      <!--<b-form-input type="text" id="sessionDepartmentName" :disabled="true" v-model="items($route.params.idsession).sessionDepartmentName" placeholder="Departamento"></b-form-input>-->
                      <b-form-select id="department"
                        v-model="department"
                        class="form-control" :class="{ 'is-invalid': departmentValidationError }"
                        :options="departmentOptions"
                        :disabled="addSessionVar"
                        value="Departamento...">
                      </b-form-select>
                    </b-input-group>
                    <div class="small text-danger" v-if="!departmentValidationRequired">Campo requerido</div>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <!--<b-form-input type="text" id="sessionLocationName" :disabled="true" v-model="items($route.params.idsession).sessionLocationName" placeholder="Ubicación"></b-form-input>-->
                      <b-form-select id="sessionLocation"
                        v-model="location"
                        class="form-control" :class="{ 'is-invalid': locationValidationError }"
                        :options="locationOptions"
                        :disabled="addSessionVar"
                        value="Ubicación...">
                      </b-form-select>
                    </b-input-group>
                    <div class="small text-danger" v-if="!locationValidationRequired">Campo requerido</div>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="pull-right">
                    <b-button v-show="!addSessionVar" type="reset" size="sm" variant="danger" @click="goBack" class="mr-1"><i class="fa fa-ban"></i> Cancelar</b-button>
                    <b-button v-show="!addSessionVar" type="button" size="sm" variant="primary" @click="addSessionClicked" :disabled="!formValidated"><i class="fa fa-play"></i> Iniciar</b-button>
                  </div>
                </b-col>
              </b-row>
            </b-form>
          </div>

          <b-row>
            <b-col>
              <div class="text-center mb-4">
                <b-button v-show="addSessionVar" type="button" size="lg" variant="success" @click="scanModal = true" ><i class="fa fa-barcode"></i> REGISTRAR </b-button>
              </div>
            </b-col>
          </b-row>

          <b-table v-show="addSessionVar" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="lg" :items="tableitems" :fields="tablefields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
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
            <b-pagination v-show="addSessionVar" size="sm" :total-rows="getRowCount(tableitems)" :per-page="perPage" v-model="currentPage" prev-text="Ant" next-text="Sig" hide-goto-end-buttons/>
          </nav>

          <div slot="footer" v-show="addSessionVar">
            <div class="pull-right">
              <b-button type="reset" size="sm" variant="secondary" @click="goBack" class="mr-1"><i class="fa fa-chevron-left"></i> Atras</b-button>
              <b-button v-show="addSessionVar" type="button" size="sm" variant="primary" @click="closeSession" :disabled="!formValidated"><i class="fa fa-stop"></i> Terminar</b-button>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!--MODAL-->
    <b-modal title="Registrar activo" class="modal-success" v-model="scanModal" @ok="scanAsset" ok-variant="primary" @cancel="cancelScan" cancel-title="Cancelar" ok-title="Guardar">
      <div>
        <b-row>
          <b-col>
            <div class="text-center mb-4">
              <b-button v-show="!scanBarcode" type="button" variant="success" @click="scaner" ><i class="fa fa-camera"></i> Cámara para scanear código de barras </b-button>
            </div>
          </b-col>
        </b-row>
        <b-row v-show="scanBarcode">
          <b-col lg="12">
            <b-card>
              <div slot="header">
                <label class="small muted" for="keyfield">Estatus</label>
                <strong> {{nuevo.status}} </strong>
                <small class="float-right text-muted">
                  ID Sesión: {{ sessionID }}
                </small>
              </div>
              <b-form>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-barcode" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="keyfield" v-model="nuevo.keyfield" :disabled="true" placeholder="Introduce la clave"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!departmentValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-cube" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="asset" v-model="nuevo.asset" placeholder="Introduce el activo"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!departmentValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="description">Descripción</label>
                  <b-form-input type="text" id="description" v-model="nuevo.description" placeholder="Introduce la descripción"></b-form-input>
                </b-form-group>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="brand">Marca</label>
                      <b-form-input type="text" id="brand" v-model="nuevo.brand" placeholder="Introduce la marca"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="model">Modelo</label>
                      <b-form-input type="text" id="model" v-model="nuevo.model" placeholder="Introduce el modelo"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="serial">Serie</label>
                      <b-form-input type="text" id="brand" v-model="nuevo.serial" placeholder="Introduce el número de serie"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="cost">Costo</label>
                      <b-form-input type="text" id="cost" v-model="nuevo.cost" placeholder="Introduce el costo"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <label class="small muted" for="assetType">Tipo de activo</label>
                      <b-form-select id="assetType" v-model="nuevo.assetType" 
                        :options="['Tipo de activo...', 'Mobiliario','Equipo','Maquinaria','Instrumental','Vehículo', 'Inmueble', 'Terreno', 'Bien natural', 'Otro']">
                      </b-form-select>
                  </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-sitemap" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="department"
                      v-model="nuevo.department"
                      class="form-control" :class="{ 'is-invalid': departmentValidationError }"
                      :options="departmentOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!departmentValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="sessionLocation"
                      v-model="nuevo.location"
                      class="form-control" :class="{ 'is-invalid': locationValidationError }"
                      :options="locationOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!locationValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="locationDetail">Detalles de la ubicación</label>
                  <b-form-input type="text" id="locationDetail" v-model="nuevo.locationDetail" placeholder="Introduce el detalle de la ubicación"></b-form-input>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="comments">Comentarios</label>
                  <b-form-input type="text" id="comments" v-model="nuevo.comments" placeholder="Introduce comentarios adicionales"></b-form-input>
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

    <!--MODAL-->
    <b-modal title="Detalle de activo" v-model="assetModal" ok-only ok-variant="secondary" ok-title="Cerrar">
      <div>
        <b-row>
          <b-col lg="12">
            <b-card>
              <div slot="header">
                <strong> {{ nuevo.status }} </strong>
                <small> ID: {{ nuevo.id }} </small>
                <small class="float-right text-muted">
                  ID Sesión: {{ sessionID }}
                </small>
              </div>
              <b-form>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-barcode" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="keyfield" v-model="nuevo.keyfield" :disabled="true"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-cube" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="asset" v-model="nuevo.asset" :disabled="true"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="description">Descripción</label>
                  <b-form-input type="text" id="description" v-model="nuevo.description" :disabled="true"></b-form-input>
                </b-form-group>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="brand">Marca</label>
                      <b-form-input type="text" id="brand" v-model="nuevo.brand" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="model">Modelo</label>
                      <b-form-input type="text" id="model" v-model="tableitems.model" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="serial">Serie</label>
                      <b-form-input type="text" id="brand" v-model="nuevo.serial" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="cost">Costo</label>
                      <b-form-input type="text" id="cost" v-model="nuevo.cost" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <label class="small muted" for="cost">Tipo de activo</label>
                      <b-form-input type="text" id="assetType" v-model="nuevo.assetType" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-sitemap" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="department"
                      v-model="nuevo.department"
                      class="form-control"
                      :disabled="true"
                      :options="departmentOptions">
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="location"
                      v-model="nuevo.location"
                      class="form-control"
                      :disabled="true"
                      :options="locationOptions">
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="locationDetail">Detalles de la ubicación</label>
                  <b-form-input type="text" id="locationDetail" v-model="nuevo.locationDetail" :disabled="true"></b-form-input>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="comments">Comentarios</label>
                  <b-form-input type="text" id="comments" v-model="nuevo.comments" :disabled="true"></b-form-input>
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
                  <b-button type="button" variant="primary" class="float-right" size="sm"><i class="fa fa-cloud-download"></i></b-button>
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
  name: 'AddSession',
  props: {
    caption: {
      type: String,
      default: 'Nueva sesión de registro'
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
      validateSelectsVar: false,
      scanModal: false,
      assetModal: false,
      itemSelected: 0,
      sessionID: 17,
      slide: 0,
      userName: 'Ana Sánchez',
      addSessionVar: false,
      scanBarcode: false,
      department: null,
      departmentOptions: [
        {value: null, text: 'Departamento...', disabled: true},
        {value: 1001, text: 'Cancerología'},
        {value: 1002, text: 'Dirección General'},
        {value: 2001, text: 'Enfermería'},
        {value: 2002, text: 'Especialidades'},
        {value: 2003, text: 'Ginecología'},
        {value: 3001, text: 'Inventarios'},
        {value: 3002, text: 'Legales'},
        {value: 3003, text: 'Psiquiatría'},
        {value: 4001, text: 'Seguridad'},
        {value: 4002, text: 'Soporte'}
      ],
      location: null,
      locationOptions: [
        {value: null, text: 'Ubicación...', disabled: true},
        {value: 116, text: 'Edificio 16'},
        {value: 123, text: 'Edificio 23'},
        {value: 100, text: 'Edificio de Gobierno'},
        {value: 200, text: 'Laboratorios'},
        {value: 300, text: 'Torre A'},
        {value: 400, text: 'Torre B'},
        {value: 500, text: 'Torre C'},
        {value: 600, text: 'Torre D'},
        {value: 700, text: 'Torre E'}
      ],
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
      nuevo: {
        id: 1, keyfield: 'HGM0012345', asset: 'Silla', description: 'Silla de madera', brand: 'ND', model: 'ND', serial:'ND', cost: '180.00', assetType: 'Mobiliario', locationDetail: '', comments: '', status: 'Conciliado'
      },
      tableitems:  [ 
        //id, keyfield, asset, description, brand, model, serial, cost, assetType, locationDetail, comments, status 
      ],
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
      perPage: 5,
      totalRows: 0
    }
  },
  computed: {
  	formValidated: function() {
      var form_validate = false
      if (this.departmentValidationRequired && this.locationValidationRequired) {
        form_validate = true
      }
      return form_validate
    },
    departmentValidationError: function() {
      var department_error = true
      if (this.department) {
        department_error = false
      }
      return department_error
    },
    departmentValidationRequired: function() {
      var department_required = false
      if (this.department) {
        department_required = true
      }
      return department_required
    },
    locationValidationError: function() {
      var location_error = true
      if (this.location) {
        location_error = false
      }
      return location_error
    },
    locationValidationRequired: function() {
      var location_required = false
      if (this.location) {
        location_required = true
      }
      return location_required
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
      : status === 'Cambio de descripción' ? 'primary'
      : status === 'En demasía' ? 'warning'
      : status === 'No inventariado' ? 'danger' : 'primary'
    },
    getRowCount (item) {
      return item.length
    },
    regLink (idsession,id) {
      return `session/sessionID/asset/${id.toString()}`
    },
    rowClicked (item) {
      //const regLink = this.regLink(this.$route.params.idsession,item.id)
      //this.$router.push({ path: regLink })
      this.itemSelected = item.id - 1
      this.assetModal = true
    },
    addSessionClicked () {
      this.addSessionVar = true
      this.nuevo.department = this.department
      this.nuevo.location = this.location
    },
    scaner () {
      this.scanBarcode = true
    },
    scanAsset () {
      this.tableitems.push(this.nuevo)
      this.scanBarcode = false
    },
    cancelScan () {
      this.scanBarcode = false
    },
    closeSession () {

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
