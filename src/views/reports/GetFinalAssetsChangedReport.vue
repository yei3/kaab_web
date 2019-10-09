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
            <b-col md="2" class="my-1">
              <b-form-group class="mb-0">
                <b-input-group>
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

            <b-col md="8" class="my-1">
              <b-form-group label-cols-sm="3" class="mb-0">
                <b-input-group>
                  <treeselect  :multiple="false" :options="options" id="departmentIDSearch"  v-model="departmentID" placeholder="Departamento..." @change="search"/>
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
            <template slot="assetBDI" slot-scope="data">
              {{data.item.assetBDI}}
            </template>
            <template slot="description" slot-scope="data">
              {{data.item.description}}
            </template>
            <template slot="descriptionBDI" slot-scope="data">
              {{data.item.descriptionBDI}}
            </template>
            <template slot="brand" slot-scope="data">
              {{data.item.brand}}
            </template>
            <template slot="brandBDI" slot-scope="data">
              {{data.item.brandBDI}}
            </template>
            <template slot="model" slot-scope="data">
              {{data.item.model}}
            </template>
            <template slot="modelBDI" slot-scope="data">
              {{data.item.modelBDI}}
            </template>
            <template slot="serial" slot-scope="data">
              {{data.item.serial}}
            </template>
            <template slot="serialBDI" slot-scope="data">
              {{data.item.serialBDI}}
            </template>
            <template slot="location" slot-scope="data">
              {{data.item.location}}
            </template>
            <template slot="locationDetail" slot-scope="data">
              {{data.item.locationDetail}}
            </template>
            <template slot="locationDetailBDI" slot-scope="data">
              {{data.item.locationDetailBDI}}
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
            <template slot="status" slot-scope="data">
              <b-badge :variant="getBadge(data.item.status)">{{getStatus(data.item.statusID)}}</b-badge>
            </template>-->

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
  import getById from '../../services/GetCatalogById'
  import reports from '../../services/Reports'
  import gets from '../../services/Gets'
  import posts from '../../services/Posts'
  import { CodeLoader } from 'vue-content-loader';
  import XLSXjs from 'xlsx/xlsx'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import BButton from "bootstrap-vue/src/components/button/button";
  //import usersData from './UsersData'
  export default {
    name: 'Assets',
    props: {
      caption: {
        type: String,
        default: 'Reporte de activos con cambios'
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
        deptTree: false,
        options:[],
        departmentID: null,
        flag: false,
        fields: [
          // {label: 'ID', key: 'id', sortable: true},
          {label: 'Inventario', key: 'keyField', sortable: true},
          {label: 'Inventario anterior', key: 'personalString02', sortable: true},
          // {label: 'Tipo de activo', key: 'assetType', sortable: true},
          {label: 'Bien', key: 'asset', sortable: true},
          {label: 'Bien anterior', key: 'assetBDI', sortable: true},
          {label: 'Descripción', key: 'description', sortable: true},
          {label: 'Descripción anterior', key: 'descriptionBDI', sortable: true},
          {label: 'Marca', key: 'brand', sortable: true},
          {label: 'Marca Anterior', key: 'brandBDI', sortable: true},
          {label: 'Modelo', key: 'model', sortable: true},
          {label: 'Modelo anterior', key: 'modelBDI', sortable: true},
          {label: 'Serie', key: 'serial', sortable: true},
          {label: 'Serie anterior', key: 'serialBDI', sortable: true},
          {label: 'Detalle de Ubicación', key: 'locationDetail', sortable: true},
          {label: 'Detalle de Ubicación anterior', key: 'locationDetailBDI', sortable: true},
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
          {label: 'Nombre Unidad', key: 'location', sortable: true},
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
          //   {label: 'Modalidad', key: 'status', sortable: true}
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
      //const assets = await reports.getExceededFinalAssetsReport(this.$session.get('projectID'),null,this.deptTree);

      this.deptos = deps.data.departments;
      this.costs = csts.data.costCenters;
      this.accounts = accs.data.accountingAccounts;
      this.locations = lctns.data.locations;
      const dprtmnts = await gets.getDepartmentsByCompany(this.$session.get('companyID'));
      this.options = dprtmnts.data.departments;

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
        expData.push(["Reporte de Activos en Demasía","","","","","","","","",""]);
        expData.push([(this.deptos.find(dp => dp.id === this.departmentID) === undefined ? "" : this.deptos.find(dp => dp.id === this.departmentID).name),"","","","","","","","",""]);
        expData.push(["","","","","","","","","","",""]);
        expData.push(["","","","","","","","","","",""]);
        expData.push(["","","","","","","","","","",""]);
        expData.push([
          "Inventario",
          "Inventario_Anterior",
          "Bien",
          "Bien_anterior",
          "Descripcion",
          "Descripcion_anterior",
          "Marca",
          "Marca_anterior",
          "Modelo",
          "Modelo_anterior",
          "Serie",
          "Serie_anterior",
          "Costo",
          "Nombre_Unidad",
          "Detalle_de_Ubicacion",
          "Detalle_de_Ubicacion_anterior",
          "Comentarios"
        ]);
        this.items.forEach(function (item) {
          expData.push([
            item.keyField,
            item.personalString02,
            item.asset,
            item.assetBDI,
            item.description,
            item.descriptionBDI,
            item.brand,
            item.brandBDI,
            item.model,
            item.modelBDI,
            item.serial,
            item.serialBDI,
            item.cost,
            item.location,
            item.locationDetail,
            item.locationDetailBDI,
            item.comments
          ]);
          /* expData.push({
             Inventario: item.keyField,
             Inventario_Anterior: item.personalString02,
             Bien: item.asset,
             Descripcion: item.description,
             Marca: item.brand,
             Modelo: item.model,
             Serie: item.serial,
             Detalle_de_Ubicacion: item.locationDetail,
             Nombre_Unidad: item.currentDepartment
           });*/
        });
        expData.push(["Total","","","","","","","","",this.items.length]);
        expData.push(["MISMO QUE DEVOLVERÉ CUANDO ME SEA REQUERIDO POR EL PERSONAL A CARGO, ME COMPROMETO A REPORTAR CUALQUIER CAMBIO DE UBICACIÓN, EXTRAVIÓ O MAL FUNCIONAMIENTO DEL EQUIPO.","","","","","","","","","",""]);
        expData.push(["Firmas","","","","","","","","","",""]);
        expData.push(["Datos de quien recibe","","","","","","","","","",""]);
        if (this.departmentID != null) {
          expData.push(["Departamento","Nombre/Cargo","","","","Tel","Firma","","","",""]);
          expData.push([(this.deptos.find(dp => dp.id === this.departmentID) === undefined ? "" : this.deptos.find(dp => dp.id === this.departmentID).name),(this.deptos.find(dp => dp.id === this.departmentID) === undefined ? "" : this.deptos.find(dp => dp.id === this.departmentID).headDepartment),"","","","","","","","",""]);
        }
        var report = XLSXjs.utils.json_to_sheet(expData);
        var wb = XLSXjs.utils.book_new();
        XLSXjs.utils.book_append_sheet(wb, report, 'En demasía')
        XLSXjs.writeFile(wb, 'demasia.xlsx')
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
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'imagenes.zip');
          document.body.appendChild(link);
          link.click();
        });
      },
      async search(){
        this.flag = false;
        const assets = await reports.getFinalAssetsChangedReport(this.$session.get('projectID'),this.departmentID,this.deptTree);
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
            assetBDI: finalAsset.assetBDI,
            asset: finalAsset.asset,
            assetTypeBDI: finalAsset.assetTypeBDI,
            assetType: finalAsset.assetType,
            brand: finalAsset.brand,
            brandBDI: finalAsset.brandBDI,
            comments: finalAsset.comments,
            cost: finalAsset.cost,
            costCenter: localCosts.find(dp => dp.id === finalAsset.costCenterID) === undefined ? "" : localCosts.find(dp => dp.id === finalAsset.costCenterID).name,
            currentDepartment: localDeps.find(dp => dp.id === finalAsset.currentDepartmentID) === undefined ? "" : localDeps.find(dp => dp.id === finalAsset.currentDepartmentID).name,
            currentValue: finalAsset.currentValue,
            description: finalAsset.description,
            descriptionBDI: finalAsset.descriptionBDI,
            fiscalDepreciation: finalAsset.fiscalDepreciation,
            id: finalAsset.id,
            invoice: finalAsset.invoice,
            keyField: finalAsset.keyField,
            lastDepartment: localDeps.find(dp => dp.id === finalAsset.lastDepartmentID) === undefined ? "" : localDeps.find(dp => dp.id === finalAsset.lastDepartmentID).name,
            lastRegistration: finalAsset.lastRegistration,
            locationDetail: finalAsset.locationDetail,
            locationDetailBDI: finalAsset.locationDetail,
            location: localLocations.find(dp => dp.id === finalAsset.locationID) === undefined ? "" : localLocations.find(dp => dp.id === finalAsset.locationID).name,
            model:finalAsset.model,
            modelBDI:finalAsset.modelBDI,
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
            serialBDI: finalAsset.serialBDI,
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
