<template>
  <div class="animated fade-in">
  <b-row>
    <b-col lg="12">
      <transition name="slide">
        <b-card>
          <div slot="header">
            {{caption}}
            <div class="card-header-actions">
              <b-button type="button" variant="primary" class="float-right" size="sm" @click="exportEx"><i class="fa fa-file-excel-o"></i></b-button>
            </div>
          </div>

          <b-row>
            <b-col md="2" class="my-1">
              <b-form-group label-cols-sm="1"  class="mb-0">
                <b-input-group>
                  <b-form-input type="search" v-on:keyup.13="search" v-model="filter" placeholder="Teclea para buscar..."></b-form-input>
                  <b-input-group-append>
                    <b-button  @click="search">Buscar</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="2" class="my-1">
              <b-form-group class="mb-0">
                <b-input-group>
                  <b-input-group-append>
                    <b-form-checkbox v-model="deptTree" name="check-button" switch>
                      Usar jerarquía de departamentos
                    </b-form-checkbox>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="4" class="my-1">
              <b-form-group  class="mb-0">
                <b-input-group>
                  <treeselect  :multiple="false" :options="options" id="departmentIDSearch"  v-model="departmentID" placeholder="Departamento..." @change="filter = true"/>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="4" class="my-1">
              <b-form-group label-cols-sm="1"  class="mb-0">
                <b-input-group>
                  <b-form-select id="location"
                                 v-model="locationID"
                                 class="form-control"
                                 :disabled="false"
                                 :options="locationOptions"
                                 @change="filter = true">
                  </b-form-select>

                </b-input-group>
              </b-form-group>
            </b-col>



          </b-row>
          <code-loader v-if="!flag"
                       :speed="2"
                       :animate="true"
          ></code-loader>
          <b-table v-else
                   :hover="hover"
                   :striped="striped"
                   :bordered="bordered"
                   :small="small"
                   :fixed="fixed"
                   responsive="lg"
                   :items="items"
                   :fields="fields"
                   :current-page="currentPage"
                   :per-page="perPage"
                   @row-clicked="rowClicked">
            <template slot="id" slot-scope="data">
              {{data.item.id}}
            </template>
            <template slot="name" slot-scope="data">
              {{data.item.name}}
            </template>
            <template slot="statusID" slot-scope="data">
              <b-badge :variant="getBadge(data.item.statusID)">{{getStatus(data.item.statusID)}}</b-badge>
            </template>
          </b-table>
          <nav>
            <b-pagination size="sm" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Ant" next-text="Sig" />
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
                      <b-input-group-text><i class="fa fa fa-sitemap"></i></b-input-group-text>
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
  import XLSXjs from 'xlsx/xlsx'
  //import usersData from './UsersData'
  export default {
    name: 'InitBase',
    props: {
      caption: {
        type: String,
        default: 'Base Inicial'
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
        filter: null,
        locationID: null,
        departmentID: null,
        deptTree: false,
        deps:[],
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

      const depsful = await gets.getAllDepartmentsByCompany(this.$session.get('companyID'));
      this.deps = depsful.data.departments;

      let tmp2 = [
        {value: null, text: 'Ubicaciones...'}
      ];
      lctns.data.locations.map(function(value, key) {
        let dt = {value: value.id, text: value.name};
        tmp2.push(dt);
      });
      this.locationOptions = tmp2;

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

      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      async search(){
        const assts = await gets.getAssetBySearch(this.$session.get('projectID'), this.filter,this.locationID, this.departmentID,this.deptTree);
        this.items = assts.data.assets;

        var localitems = [];
        let localDeps = this.deps;
        this.items.forEach(function(finalAsset){
          localitems.push({
            asset: finalAsset.asset,
            assetType: finalAsset.assetType,
            brand: finalAsset.brand,
            currentDepartment: localDeps.find(dp => dp.id === finalAsset.currentDepartmentID) === undefined ? "" : localDeps.find(dp => dp.id === finalAsset.currentDepartmentID).name,
            currentDepartmentID:finalAsset.currentDepartmentID,
            description: finalAsset.description,
            locationID:finalAsset.locationID,
            locationDetail:finalAsset.locationDetail,
            comments:finalAsset.comments,
            id: finalAsset.id,
            keyField: finalAsset.keyField,
            model:finalAsset.model,
            personalString02: finalAsset.personalString02,
            price: finalAsset.price,
            cost: finalAsset.cost,
            serial: finalAsset.serial,
            statusID: finalAsset.statusID,
          });
        });
        console.info(localitems);
        this.items = localitems;
        this.currentPage = 1;
        this.flag = true;
      },
      exportEx(){
        var expData = [];
        this.items.forEach(function (item) {
          expData.push({
            Inventario: item.keyField,
            Inentario_Anterior: item.personalString02,
            Bien: item.asset,
            Descripcion: item.description,
            Marca: item.brand,
            Modelo: item.model,
            Serie: item.serial,
            Nombre_Unidad: item.currentDepartment
          });
        });
        var report = XLSXjs.utils.json_to_sheet(expData);
        var wb = XLSXjs.utils.book_new();
        XLSXjs.utils.book_append_sheet(wb, report, 'Base inicial')
        XLSXjs.writeFile(wb, 'reporte_base_inicial.xlsx')
      }
    }
  }
</script>

<style scoped>
  .card-body >>> table > tbody > tr > td {
    cursor: pointer;
  }
</style>
