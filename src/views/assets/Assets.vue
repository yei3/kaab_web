<template>
  <div class="animated fade-in">
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
          <code-loader v-if="!flag"
                       :speed="2"
                       :animate="true"
          ></code-loader>
          <b-table v-else :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="lg" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
            <template slot="id" slot-scope="data">
              {{data.item.id}}
            </template>
            <template slot="name" slot-scope="data">
              {{data.item.name}}
            </template>
            <template slot="status" slot-scope="data">
              <b-badge :variant="getBadge(data.item.status)">{{getStatus(data.item.statusID)}}</b-badge>
            </template>
          </b-table>
          <nav>
            <b-pagination size="sm" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Ant" next-text="Sig" hide-goto-end-buttons/>
          </nav>
        </b-card>
      </transition>
    </b-col>
  </b-row>

    <b-modal title="Detalle de activo" v-model="assetModal" ok-only ok-variant="secondary" ok-title="Cerrar">
      <div>
        <b-row>
          <b-col lg="12">
            <b-card>
              <div slot="header">
                <strong> Activo</strong>
                <small> ID: {{ current.id }} </small>
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
                    <b-form-input type="text" id="keyfield" v-model="current.keyField" :disabled="true"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-cube" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="asset" v-model="current.asset" :disabled="true"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="description">Descripción</label>
                  <b-form-input type="text" id="description" v-model="current.description" :disabled="true"></b-form-input>
                </b-form-group>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="brand">Marca</label>
                      <b-form-input type="text" id="brand" v-model="current.brand" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="model">Modelo</label>
                      <b-form-input type="text" id="model" v-model="current.model" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="serial">Serie</label>
                      <b-form-input type="text" id="brand" v-model="current.serial" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="cost">Costo</label>
                      <b-form-input type="text" id="cost" v-model="current.cost" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <label class="small muted" for="cost">Tipo de activo</label>
                      <b-form-input type="text" id="assetType" v-model="current.assetType" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                      <treeselect  :multiple="false" :options="options" id="departmentID"  v-model="current.currentDepartmentID" disabled/>
                    </b-input-group-prepend>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="location"
                                   v-model="current.locationID"
                                   class="form-control"
                                   :disabled="true"
                                   :options="locationOptions">
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="locationDetail">Detalles de la ubicación</label>
                  <b-form-input type="text" id="locationDetail" v-model="current.locationDetail" :disabled="true"></b-form-input>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="comments">Comentarios</label>
                  <b-form-input type="text" id="comments" v-model="current.comments" :disabled="true"></b-form-input>
                </b-form-group>
              </b-form>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-modal>

  </div>
</template>


<script>
  import gets from '../../services/Gets'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { CodeLoader } from 'vue-content-loader';
  //import usersData from './UsersData'
  export default {
    name: 'Projects',
    props: {
      caption: {
        type: String,
        default: 'Proyectos'
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
      CodeLoader,
      Treeselect
    },
    data: () => {
      return {
        items: [],
        current: {
          id: 0, keyfield: '', asset: '', description: '', brand: '', model: '', serial:'', cost: '', assetType: '', locationDetail: '', comments: '', status: ''
        },
        assetModal: false,
        flag: false,
        fields: [
          {label: 'ID', key: 'id', sortable: true},
          {label: 'Clave', key: 'keyField', sortable: true},
          {label: 'Tipo de Activo', key: 'assetType', sortable: true},
          {label: 'Activo', key: 'asset', sortable: true},
          {label: 'Descripción', key: 'description', sortable: true},
          {label: 'Estatus', key: 'statusID', sortable: true}
        ],
        currentPage: 1,
        options:[],
        locationOptions:[],
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
      const dprtmnts = await gets.getDepartmentsByCompany(this.$session.get('companyID'));
      this.options = dprtmnts.data.departments;
      const lctns = await gets.getLocationsByCompany(this.$session.get('companyID'));
      let tmp2 = [
        {value: null, text: 'Ubicaciones...'}
      ];
      lctns.data.locations.map(function(value, key) {
        let dt = {value: value.id, text: value.name};
        tmp2.push(dt);
      });
      this.locationOptions = tmp2;
      const assts = await gets.getAssetByProjectId(this.$session.get('projectID'));
      this.items = assts.data.assets;
      this.flag = true;
    },
    computed: {
    },
    methods: {
      getBadge (statusID) {
        return statusID === 2 ? 'success' //activo
          : statusID === 3 ? 'secondary' //inactivo
            : statusID === 'Pendiente' ? 'warning'
              : statusID === 'Eliminado' ? 'danger' : 'primary'
      },
      getStatus (statusID) {
        return statusID === 2 ? 'Activo'
          : statusID === 3 ? 'Inactivo' //
            : statusID === 'Pendiente' ? 'Pendiente'
              : statusID === 'Eliminado' ? 'Eliminado' : 'primary'
      },
      getRowCount (items) {
        return items ? items.length : 0
      },
      regLink () {
        return `dashboard`
      },
      async rowClicked (item) {
        this.current = item;
        this.assetModal = true;
        console.info(item);
        /*const images = await gets.getImagesByAsset(this.current.id,true);
        console.info(images)
        var div = document.createElement('div');
        document.querySelector('#carouselCurrent___BV_inner_').innerHTML = '';
        for (let i = 0; i < images.data.files.length; i++){
          const file = images.data.files[i];
          //div.innerHTML = '<b-carousel-slide img-src="'+ URL.createObjectURL(file) +'"></b-carousel-slide>'
          div.innerHTML = '<div data-v-19bfb51e role="listitem" class="carousel-item" aria-current="false" aria-posinset="1" aria-setsize="3" style="background: rgb(171, 171, 171);" aria-hidden="true">' +
            '<img src="' + images.data.files[i].url + '" width="1024" height="768" class="img-fluid w-100 d-block">' +
            '<div class="carousel-caption"><!----><!----></div>' +
            '</div>'
          const element = div.firstChild;
          document.querySelector('#carouselCurrent___BV_inner_').appendChild(element);
        }*/
      },
      addClick () {

      }
    }
  }
</script>

<style scoped>
  .card-body >>> table > tbody > tr > td {
    cursor: pointer;
  }
</style>
