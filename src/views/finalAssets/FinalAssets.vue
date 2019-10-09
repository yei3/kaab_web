<template>
  <b-row>
    <b-col lg="12">
      <transition name="slide">
        <b-card style="overflow-x: scroll;">
          <div slot="header">
            {{caption}}

          </div>
          <b-row>
            <b-col md="6" class="my-1">
              <b-form-group  class="mb-0">
                <label class="small muted">Departamento</label>
                <b-input-group>
                  <treeselect  :multiple="false" :options="options" id="departmentIDSearch"  v-model="departmentID" placeholder="Departamento..." @change="search"/>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="3" class="my-1">
              <b-form-group  class="mb-0">
                <label class="small muted">Ubicación</label>
                <b-input-group>
                  <b-form-select id="location"
                                 v-model="locationID"
                                 class="form-control"
                                 :options="locations">
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="3" class="my-1">
              <b-form-group  class="mb-0">
                <label class="small muted">Estatus</label>
                <b-input-group>
                  <b-form-select id="statusid"
                                 v-model="statusID"
                                 class="form-control"
                                 :options="statusOptions">
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>


            <b-col md="3" class="my-1">
              <b-form-group  class="mb-0">
                <label class="small muted">Sesión de registro</label>
                <b-input-group>
                  <b-form-select id="location"
                                 v-model="sessionID"
                                 class="form-control"
                                 :options="sessionOptions">
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="2" class="my-1">
              <b-form-group  class="mb-0">
                <label class="small muted">Usuario</label>
                <b-input-group>
                  <b-form-select id="location"
                                 v-model="userID"
                                 class="form-control"
                                 :options="userOptions">
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>


            <b-col md="2" class="my-1">
              <b-form-group  class="mb-0">
                <label class="small muted">Fecha inicial</label>
                <b-input-group>
                  <b-form-input type="date" id="location"
                                v-model="startDate"
                                class="form-control">
                  </b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col md="2" class="my-1">
              <b-form-group  class="mb-0">
                <label class="small muted">Fecha final</label>
                <b-input-group>
                  <b-form-input type="date"
                                id="location"
                                v-model="endDate"
                                class="form-control">
                  </b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="2" class="my-1">
              <b-row>
                  <b-form-group class="mb-0">
                    <b-input-group>
                      <b-input-group-append>
                        <b-form-checkbox v-model="deptTree" name="check-button" switch>
                          Usar jerarquía de departamentos
                        </b-form-checkbox>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>

              </b-row>
              <b-row>
                <b-form-group   class="mb-0">
                  <b-input-group>
                    <b-input-group-append>
                      <b-form-checkbox
                        id="checkbox-1"
                        v-model="isRep"
                        unchecked-value="null"
                        name="checkbox-1">
                        Traer solo los repetidos
                      </b-form-checkbox>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-row>
            </b-col>

            <b-col md="1" class="my-1">
              <b-form-group   class="mb-0">
                <b-input-group>
                  <b-input-group-append>
                    <b-button  @click="buscar">Buscar</b-button>
                  </b-input-group-append>
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
                   responsive="true"
                   :items="items"
                   :fields="fields"
                   :current-page="currentPage"
                   :per-page="perPage"
                   @row-clicked="rowClicked"
                   :filter="filter"
                   @filtered="onFiltered">
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
</template>


<script>
  import gets from '../../services/Gets'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import getAll from '../../services/GetAllCatalog'
  import { CodeLoader } from 'vue-content-loader';
  import BFormCheckbox from "bootstrap-vue/src/components/form-checkbox/form-checkbox";
  import BRow from "bootstrap-vue/src/components/layout/row";
  import BCol from "bootstrap-vue/src/components/layout/col";
  //import usersData from './UsersData'
  export default {
    name: 'Final Assets',
    props: {
      caption: {
        type: String,
        default: 'Activos Finales'
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
      BCol,
      BRow,
      BFormCheckbox,
      CodeLoader,
      Treeselect
    },
    data: () => {
      return {
        items: [],
        deptos: [],
        costs:[],
        accounts:[],
        locations:[],
        options:[],
        sessionOptions: [],
        statusOptions: [
          {value: null, text: "Todos los estatus."},
          {value: 4, text: "CONCILIADO"},
          {value: 5, text: "CAMBIO DE DEPARTAMENTO"},
          {value: 6, text: "CAMBIO DE UBICACION "},
          {value: 7, text: "ETIQUETA DUPLICADA"},
          {value: 8, text: "ETIQUETA SIN DATOS"},
          {value: 9, text: "EN DEMASÍA "}
        ],
        userOptions: [],
        startDate: null,
        endDate: null,
        flag: true,
        departmentID: null,
        statusID: null,
        isRep: null,
        locationID: null,
        deptTree: false,
        userID: null,
        sessionID: null,
        filter: null,
        fields: [
          {label: 'Usuario sesión', key: 'sessionUser', sortable: true},
          {label: 'inicio sesión', key: 'sesionStart', sortable: true},
          {label: 'Fin sesión', key: 'sesionEnd', sortable: true},
          {label: 'ID', key: 'id', sortable: true},
          {label: 'Clave', key: 'keyField', sortable: true},
          {label: 'Tipo de Activo', key: 'assetType', sortable: true},
          {label: 'Activo', key: 'asset', sortable: true},
          {label: 'Descripción', key: 'description', sortable: true},
          {label: 'Marca', key: 'brand', sortable: true},
          {label: 'Modelo', key: 'model', sortable: true},
          {label: 'Serie', key: 'serial', sortable: true},
          {label: 'Costo', key: 'cost', sortable: true},
          {label: 'Departamento', key: 'department', sortable: true},
          {label: 'Ubicación', key: 'location', sortable: true},
          {label: 'Detalle de ubicación', key: 'locationDetail', sortable: true},
          {label: 'Comentarios', key: 'comments', sortable: true},
          {label: 'Estatus', key: 'statusID', sortable: true}
        ],
        currentPage: 1,
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
      const deps = await gets.getAllDepartmentsByCompany(this.$session.get('companyID'));
      const csts = await gets.getCostCentersByCompany(this.$session.get('companyID'));
      const accs = await gets.getAccountingAccountsByCompany(this.$session.get('companyID'));
      const lctns = await gets.getLocationsByCompany(this.$session.get('companyID'));
      //const assets = await reports.getInventoriedFinalAssetsReport(this.$session.get('projectID'));
      const sesss = await gets.getRegistrationSessionsByUser(this.$session.get('userId'), this.$session.get('projectID'));
      const usrs = await getAll.getAllUsers();

      var localUsrs = [];
      let tmp2 = [
        {value: null, text: "Todas las sesiones."}
      ];
      sesss.data.registrationSessions.map(function(value, key) {
        let dt = {value: value.id, text: value.sessionUser + " " + value.creationDateTime};
        tmp2.push(dt);
      });
      this.sessions = sesss.data.registrationSessions;
      this.sessionOptions = tmp2;

      sesss.data.registrationSessions.forEach(function(sess){
        if (localUsrs.indexOf(sess.creationUserID) === -1 ){
          localUsrs.push(sess.creationUserID)
        }
      });
      console.info("Array id users");
      console.info(localUsrs);

      var localUsrOptions = [
        {value: null, text: "Todos los usuarios."}
      ];
      usrs.data.users.forEach(function(usr){
        if (localUsrs.indexOf(usr.id) !== -1){
          let dt = {value: usr.id, text: usr.names + " " + usr.middlename + " " + usr.lastname};
          localUsrOptions.push(dt)
        }
      });
      console.info("Array  users");
      console.info(localUsrOptions);
      this.userOptions = localUsrOptions;

      this.deptos = deps.data.departments;
      this.costs = csts.data.costCenters;
      this.accounts = accs.data.accountingAccounts;
      tmp2 = [
        {value: null, text: "Todas las ubicaciones."}
      ];
      lctns.data.locations.map(function(value, key) {
        let dt = {value: value.id, text: value.name};
        tmp2.push(dt);
      });
      this.gLocs = lctns.data.locations;
      this.locations = tmp2;
      const dprtmnts = await gets.getDepartmentsByCompany(this.$session.get('companyID'));
      this.options = dprtmnts.data.departments;
      this.options.unshift({id: null, label: "Todos los departamentos."});

      this.flag = true;
    },
    computed: {
    },
    methods: {
      getBadge (statusID) {
        return statusID === 2 ? 'success'
          : statusID === 3 ? 'danger' //
            : statusID === 4 ? 'success'
              : statusID === 5 ? 'primary'
                : statusID === 6 ? 'primary'
                  : statusID === 7 ? 'warning'
                    :statusID === 8 ? 'warning'
                      :'warning'
      },
      getStatus (statusID) {
        return statusID === 2 ? 'Activo'
          : statusID === 3 ? 'Inactivo' //
            : statusID === 4 ? 'CONCILIADO'
              : statusID === 5 ? 'CAMBIO DE DEPARTAMENTO'
                : statusID === 6 ? 'CAMBIO DE UBICACION'
                  : statusID === 7 ? 'ETIQUETA DUPLICADA'
                    :statusID === 8 ? 'ETIQUETA SIN DATOS'
                      :'EN DEMASÍA '
      },
      getRowCount (items) {
        return items ? items.length : 0
      },
      regLink (key) {
        return `finalAssets/finalAssetGroup/${key.toString()}`
      },
      rowClicked (item) {

        let key = item.keyField == "" ? item.id : item.keyField
        const regLink = this.regLink(key);
        this.$router.push({path: regLink});
      },
      addClick () {
        // this.$router.push({path: `locations/addLocation`})
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1
      },
      async buscar(){
        this.flag = false;
        const assets = await gets.getFinalAssetsByProject(this.$session.get('projectID'),this.departmentID,this.locationID,this.sessionID,this.userID, this.startDate == '' ? null : this.startDate, this.endDate == '' ? null : this.endDate, this.statusID, this.isRep == null ? 'null' : this.isRep, this.deptTree);
        var localitems = [];
        let localDeps = this.deptos;
        let localLocations = this.gLocs;
        var localSessions = this.sessions;
        let localRep = this.isRep;
        assets.data.finalAssets.forEach(function(finalAsset){
          let exists = localitems.find(fa => fa.keyField === finalAsset.keyField);
          finalAsset.location = localLocations.find(lc => lc.id === finalAsset.locationID) === undefined ? '' : localLocations.find(lc => lc.id === finalAsset.locationID).name;
          finalAsset.sessionUser = localSessions.find(lc => lc.id === finalAsset.registrationSessionID) === undefined ? '' : localSessions.find(lc => lc.id === finalAsset.registrationSessionID).sessionUser;
          finalAsset.sesionStart = localSessions.find(lc => lc.id === finalAsset.registrationSessionID) === undefined ? '' : localSessions.find(lc => lc.id === finalAsset.registrationSessionID).creationDateTime;
          finalAsset.sesionEnd = localSessions.find(lc => lc.id === finalAsset.registrationSessionID) === undefined ? '' : localSessions.find(lc => lc.id === finalAsset.registrationSessionID).finalDateTime;
          finalAsset.department = localDeps.find(lc => lc.id === finalAsset.currentDepartmentID) === undefined ? '' : localDeps.find(dp => dp.id === finalAsset.currentDepartmentID).name;

          if (localRep == true){
            console.info("entra al true")
            console.info(finalAsset)
            if (finalAsset.reps > 1){
              localitems.push(finalAsset)
            }
          } else{
            console.info("entra al false")
            console.info(finalAsset)
            if (exists === undefined || finalAsset.keyField === ''){
              localitems.push(finalAsset)
            }
          }
        });
        console.info(localitems);
        this.items = localitems;
        this.currentPage = 1;
        this.flag = true;
        //this.filter = this.deptos.find(dp => dp.id === this.departmentID) === undefined ? "" :this.deptos.find(dp => dp.id === this.departmentID).name
      }
    }
  }
</script>

<style scoped>
  .card-body >>> table > tbody > tr > td {
    cursor: pointer;
  }
</style>
