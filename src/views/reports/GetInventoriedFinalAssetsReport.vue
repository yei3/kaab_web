<template>
  <b-row>
    <b-col lg="12">
      <transition name="slide">
        <b-card>
          <div slot="header">
            {{caption}}
            <div class="card-header-actions">
              <b-button type="button" variant="primary" class="float-right" size="sm" @click="exportEx"><i class="fa fa-file-excel-o"></i></b-button>
              <form action="http://34.215.35.107/kaab/s3Downloader/example/index.php" method="post">
                <input type="hidden" id="imagesInput" value="" name="fileData">
                <button type="submit" variant="primary" class="float-right"><i class="fa fa-file-image-o"></i></button>
              </form>
            </div>
          </div>
          <b-row>
            <b-col md="5" class="my-1">
              <b-form-group  class="mb-0">
                <label class="small muted">Departamento</label>
                <b-input-group>
                  <treeselect  :multiple="false" :options="options" id="departmentIDSearch"  v-model="departmentID" placeholder="Departamento..." @change="search"/>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="4" class="my-1">
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
                <label class="small muted">Modalidad</label>
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

            <b-col md="1" class="my-1">
              <b-form-group   class="mb-0">
                <b-input-group>
                  <b-input-group-append>
                    <b-button  @click="search">Buscar</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

          </b-row>
          <b-table :busy="!flag"  :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="lg" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" style="overflow-x: scroll">
            <div slot="table-busy" class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
            <template slot="keyField" slot-scope="data">
              {{data.item.keyField}}
            </template>
            <template slot="personalString02" slot-scope="data">
              {{data.item.personalString02}}
            </template>
            <template slot="asset" slot-scope="data">
              {{data.item.asset}}
            </template>
            <template slot="description" slot-scope="data">
              {{data.item.description}}
            </template>
            <template slot="brand" slot-scope="data">
              {{data.item.brand}}
            </template>
            <template slot="model" slot-scope="data">
              {{data.item.model}}
            </template>
            <template slot="serial" slot-scope="data">
              {{data.item.serial}}
            </template>
            <template slot="currentDepartmentID" slot-scope="data">
              {{data.item.currentDepartment}}
            </template>
            <template slot="status" slot-scope="data">
              <b-badge :variant="getBadge(data.item.statusID)">{{getStatus(data.item.statusID)}}</b-badge>
            </template>
            <!--<template slot="id" slot-scope="data">
              {{data.item.id}}
            </template>
            <template slot="keyField" slot-scope="data">
              {{data.item.keyField}}
            </template>
            <template slot="assetType" slot-scope="data">
              {{data.item.assetType}}
            </template>
            <template slot="asset" slot-scope="data">
              {{data.item.asset}}
            </template>
            <template slot="description" slot-scope="data">
              {{data.item.description}}
            </template>
            <template slot="brand" slot-scope="data">
              {{data.item.brand}}
            </template>
            <template slot="model" slot-scope="data">
              {{data.item.model}}
            </template>
            <template slot="serial" slot-scope="data">
              {{data.item.serial}}
            </template>
            <template slot="acquisitionDate" slot-scope="data">
              {{data.item.acquisitionDate}}
            </template>
            <template slot="acquisitionType" slot-scope="data">
              {{data.item.acquisitionType}}
            </template>
            <template slot="invoice" slot-scope="data">
              {{data.item.invoice}}
            </template>
            <template slot="price" slot-scope="data">
              ${{data.item.price}}
            </template>
            <template slot="tax" slot-scope="data">
              ${{data.item.tax}}
            </template>
            <template slot="cost" slot-scope="data">
              ${{data.item.cost}}
            </template>
            <template slot="currentValue" slot-scope="data">
              ${{data.item.currentValue}}
            </template>
            <template slot="accountingDepreciation" slot-scope="data">
              {{data.item.accountingDepreciation}}
            </template>
            <template slot="fiscalDepreciation" slot-scope="data">
              {{data.item.fiscalDepreciation}}
            </template>
            <template slot="lastDepartmentID" slot-scope="data">
              {{getDepartmentById(data.item.lastDepartmentID)}}
            </template>
            <template slot="currentDepartmentID" slot-scope="data">
              {{getDepartmentById(data.item.currentDepartmentID)}}
            </template>
            <template slot="costCenterID" slot-scope="data">
              {{getCostCenterById(data.item.costCenterID)}}
            </template>
            <template slot="accountingAccount" slot-scope="data">
              {{getAccountingAccountById(data.item.accountingAccount)}}
            </template>
            <template slot="locationID" slot-scope="data">
              {{getLocationById(data.item.locationID)}}
            </template>
            <template slot="locationDetail" slot-scope="data">
              {{data.item.locationDetail}}
            </template>
            <template slot="comments" slot-scope="data">
              {{data.item.comments}}
            </template>
            <template slot="personalString01" slot-scope="data">
              {{data.item.personalString01}}
            </template>
            <template slot="personalString02" slot-scope="data">
              {{data.item.personalString03}}
            </template>
            <template slot="personalString03" slot-scope="data">
              {{data.item.personalString03}}
            </template>
            <template slot="personalString04" slot-scope="data">
              {{data.item.personalString04}}
            </template>
            <template slot="personalInt01" slot-scope="data">
              {{data.item.personalInt01}}
            </template>
            <template slot="creationDateTime" slot-scope="data">
              {{data.item.creationDateTime}}
            </template>
            <template slot="creationUserID" slot-scope="data">
              {{getUserById(data.item.creationUserID)}}
            </template>
            <template slot="lastModDateTime" slot-scope="data">
              {{data.item.lastModDateTime}}
            </template>
            -->

          </b-table>
          <nav>
            <b-pagination size="sm" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Ant" next-text="Sig"/>
          </nav>
        </b-card>
      </transition>
    </b-col>
  </b-row>
</template>


<script>
  import posts from '../../services/Posts'
  import reports from '../../services/Reports'
  import gets from '../../services/Gets'
  import getAll from '../../services/GetAllCatalog'
  import { CodeLoader } from 'vue-content-loader';
  import XLSXjs from 'xlsx/xlsx'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import fileDownload from 'js-file-download'
  import BButton from "bootstrap-vue/src/components/button/button";
  //import usersData from './UsersData'
  export default {
    name: 'Assets',
    props: {
      caption: {
        type: String,
        default: 'Reporte de activos inventariados'
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
        deptos: [],
        costs:[],
        accounts:[],
        locations:[],
        locs:[],
        options:[],
        deptTree: false,
        sessionOptions: [],
        statusOptions: [
          {value: null, text: "Todas las modalidades."},
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
        locationID: null,
        userID: null,
        sessionID: null,
        fields: [
          // {label: 'ID', key: 'id', sortable: true},
          {label: 'Inventario', key: 'keyField', sortable: true},
          {label: 'Inventario anterior', key: 'personalString02', sortable: true},
          // {label: 'Tipo de activo', key: 'assetType', sortable: true},
          {label: 'Bien', key: 'asset', sortable: true},
          {label: 'Descripción', key: 'description', sortable: true},
          {label: 'Marca', key: 'brand', sortable: true},
          {label: 'Modelo', key: 'model', sortable: true},
          {label: 'Serie', key: 'serial', sortable: true},
          // {label: 'Fecha de adquisicion', key: 'acquisitionDate', sortable: true},
          //  {label: 'Tipo de adquisicion', key: 'acquisitionType', sortable: true},
          //   {label: 'Factura', key: 'invoice', sortable: true},
          //   {label: 'Precio', key: 'price', sortable: true},
          //   {label: 'Impuesto', key: 'tax', sortable: true},
          //   {label: 'Costo', key: 'cost', sortable: true},
          ////   {label: 'Valor', key: 'currentValue', sortable: true},
          //    {label: 'Depreciacion contable', key: 'accountingDepreciation', sortable: true},
          //   {label: 'Depreciacion fiscal', key: 'fiscalDepreciation', sortable: true},
          //     {label: 'Ultimo departammento', key: 'lastDepartmentID', sortable: true},
          {label: 'Nombre Unidad', key: 'currentDepartment', sortable: true},
          // {label: 'Centro de Costo', key: 'costCenterID', sortable: true},
          //  {label: 'Cuenta Contable', key: 'accountingAccount', sortable: true},
          //  {label: 'Ubicación', key: 'locationID', sortable: true},
          //   {label: 'Detalle de Ubicación', key: 'locationDetail', sortable: true},
          //   {label: 'Comentarios', key: 'comments', sortable: true},
          //   {label: 'Alta', key: 'personalString01', sortable: true},

          //  {label: 'Partida', key: 'personalString03', sortable: true},
          //  {label: 'CABM', key: 'personalString04', sortable: true},
          //   {label: 'Año', key: 'personalInt01', sortable: true},
          //   {label: 'Fecha de Creación', key: 'creationDateTime', sortable: true},
          //   {label: 'Usuario', key: 'creationUserID', sortable: true},
          //   {label: 'Ultima Modificación', key: 'lastModDateTime', sortable: true},
             {label: 'Modalidad', key: 'status', sortable: true}
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
      this.locations = tmp2;
      this.locs = lctns.data.locations;
      const dprtmnts = await gets.getDepartmentsByCompany(this.$session.get('companyID'));
      this.options = dprtmnts.data.departments;
      this.options.unshift({id: null, label: "Todos los departamentos."});

      this.flag = true;
    },
    computed: {
    },
    methods: {

      getBadge (statusID) {
        return  'primary'
      },
      getStatus (statusID) {
        return statusID === 2 ? 'Activo'
          : statusID === 3 ? 'Inactivo' //
            : statusID === 4 ? 'CONCILIADO'
              : statusID === 5 ? 'CAMBIO DE DEPARTAMENTO'
                : statusID === 6 ? 'CAMBIO DE UBICACION '
                  : statusID === 7 ? 'ETIQUETA DUPLICADA'
                    :statusID === 8 ? 'ETIQUETA SIN DATOS'
                      :'EN DEMASÍA '
      },
      getRowCount (items) {
        return items ? items.length : 0
      },
      regLink (id) {
        return `users/user/${id.toString()}`
      },
      rowClicked (item) {
        const regLink = this.regLink(item.id)
        this.$router.push({path: regLink})
      },
      addClick () {
        this.$router.push({path: `users/adduser`})
      },
      exportEx(){
        var expData = [];
        let localAccounts = this.accounts;
        let localCosts = this.costs;
        let localDeps = this.deptos;
        let localLocations = this.locations;
        this.items.forEach(function (item) {

          expData.push({
            Inventario: item.keyField,
            Inventario_Anterior: item.personalString02,
            Bien: item.asset,
            Descripcion: item.description,
            CABM: item.personalString04,
            Partida: item.personalString03,
            Marca: item.brand,
            Modelo: item.model,
            Serie: item.serial,
            Centro_de_Costo:localCosts.find(dp => dp.id === item.costCenterID) === undefined ? "" : localCosts.find(dp => dp.id === item.costCenterID).name,
            Cuenta_Contable: localAccounts.find(dp => dp.id === item.accountingAccountID) === undefined ? "" : localAccounts.find(dp => dp.id === item.accountingAccountID).name,
            Departamento_Anterior: localDeps.find(dp => dp.id === item.lastDepartmentID) === undefined ? "" : localDeps.find(dp => dp.id === item.lastDepartmentID).name,
            Departamento_Actual: item.currentDepartment,
            Ubicacion: item.location,
            Detalle_de_Ubicacion: item.locationDetail,
            Costo: item.cost,
            Valor_actual: item.currentValue,
            Precio: item.price,
            Alta: item.personalString01,
            Año: item.personalInt01,
            Fecha_Adquisicion: item.acquisitionDate,
            Tipo_de_Adquisicion: item.acquisitionType,
            Tipo_de_Bien: item.assetType,
            Factura: item.invoice,
            Depreciacion_Contable: item.accountingDepreciation,
            Depreciacion_Fiscal: item.fiscalDepreciation,
            Comentarios: item.comments,
            Estatus: item.statusID === 2 ? 'Activo'
              : item.statusID === 3 ? 'Inactivo' //
                : item.statusID === 4 ? 'CONCILIADO'
                  : item.statusID === 5 ? 'CAMBIO DE DEPARTAMENTO'
                    : item.statusID === 6 ? 'CAMBIO DE UBICACION '
                      : item.statusID === 7 ? 'ETIQUETA DUPLICADA'
                        :item.statusID === 8 ? 'ETIQUETA SIN DATOS'
                          :'EN DEMASÍA '
          });
        });
        var report = XLSXjs.utils.json_to_sheet(expData);
        var wb = XLSXjs.utils.book_new();
        XLSXjs.utils.book_append_sheet(wb, report, 'Inventariados')
        XLSXjs.writeFile(wb, 'inventariados.xlsx')
      },
      async downloadImages(){

        var files = [];

        for (var i = 0; i < this.items.length; i++){
          for (var j = 0; j < this.items[i].files.length; j++){
            files.push({
              file: 'projects/' + this.$session.get('projectID') + '/assets/' + this.items[i].id + '/' + this.items[i].files[j],
              name: 'projects/' + this.$session.get('projectID') + '/assets/' + (this.items[i].keyField == "" ? this.items[i].id : this.items[i].keyField) + '/' + this.items[i].files[j]
            })
          }
        }

        let formData = new FormData();
        formData.append('fileData',JSON.stringify(files));
        await posts.downloadImagesAssets(formData).then(async response => {

          console.info(response)
          const url = window.URL.createObjectURL(new Blob([response.data],{type: "application/zip"}));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'imagenes.zip');
          document.body.appendChild(link);
          link.click();
        });
      },
      async search(){
        this.flag = false;
        const assets = await reports.getInventoriedFinalAssetsReport(this.$session.get('projectID'),this.departmentID,this.locationID,this.sessionID,this.userID, this.startDate == '' ? null : this.startDate, this.endDate == '' ? null : this.endDate,this.statusID,this.deptTree);
        var localitems = [];
        let localAccounts = this.accounts;
        let localCosts = this.costs;
        let localDeps = this.deptos;
        let localLocations = this.locations;
        assets.data.finalAssets.forEach(function(finalAsset){
          localitems.push({
            files: finalAsset.files,
            accountingDepreciation: finalAsset.accountingDepreciation,
            accountingAccount: localAccounts.find(dp => dp.id === finalAsset.accountingAccountID) === undefined ? "" : localAccounts.find(dp => dp.id === finalAsset.accountingAccountID).name,//this.getAccountingAccountById(finalAsset.accountingAccountID),
            acquisitionDate: finalAsset.acquisitionDate,
            acquisitionType: finalAsset.acquisitionType,
            asset: finalAsset.asset,
            assetType: finalAsset.assetType,
            brand: finalAsset.brand,
            comments: finalAsset.comments,
            cost: finalAsset.cost,
            costCenter: localCosts.find(dp => dp.id === finalAsset.costCenterID) === undefined ? "" : localCosts.find(dp => dp.id === finalAsset.costCenterID).name,
            currentDepartment: localDeps.find(dp => dp.id === finalAsset.currentDepartmentID) === undefined ? "" : localDeps.find(dp => dp.id === finalAsset.currentDepartmentID).name,
            currentValue: finalAsset.currentValue,
            description: finalAsset.description,
            fiscalDepreciation: finalAsset.fiscalDepreciation,
            id: finalAsset.id,
            invoice: finalAsset.invoice,
            keyField: finalAsset.keyField,
            lastDepartment: localDeps.find(dp => dp.id === finalAsset.lastDepartmentID) === undefined ? "" : localDeps.find(dp => dp.id === finalAsset.lastDepartmentID).name,
            lastRegistration: finalAsset.lastRegistration,
            locationDetail: finalAsset.locationDetail,
            location: localLocations.find(dp => dp.value === finalAsset.locationID) === undefined ? "" : localLocations.find(dp => dp.value === finalAsset.locationID).text,
            model:finalAsset.model,
            personalFloat01: finalAsset.personalFloat01,
            personalFloat02: finalAsset.personalFloat02,
            personalFloat03: finalAsset.personalFloat03,
            personalInt01: finalAsset.personalInt01,
            personalInt02: finalAsset.personalInt02,
            personalInt03: finalAsset.personalInt03,
            personalString01: finalAsset.personalString01,
            personalString02: finalAsset.personalString02,
            personalString03: finalAsset.personalString03,
            personalString04: finalAsset.personalString04,
            personalString05: finalAsset.personalString05,
            price: finalAsset.price,
            serial: finalAsset.serial,
            statusID: finalAsset.statusID,
            tax: finalAsset.tax
          });
        });
        console.info(localitems);
        this.items = localitems;

        var filesj = [];

        for (var i = 0; i < localitems.length; i++){
          for (var j = 0; j < localitems[i].files.length; j++){
            filesj.push({
              file: 'projects/' + this.$session.get('projectID') + '/assets/' + localitems[i].id + '/' + localitems[i].files[j],
              name: '/activos/' + (localitems[i].keyField == "" ? localitems[i].id : localitems[i].keyField) + '/' + localitems[i].files[j]
            })
          }
        }
        document.querySelector('#imagesInput').value = JSON.stringify(filesj);
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
