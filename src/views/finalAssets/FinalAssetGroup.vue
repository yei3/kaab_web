<template>
  <b-row>
    <b-modal ref="conceal" size="xl" title="Conciliar" @ok="ok" :ok-title="Conciliar">
      <form @submit.prevent="submit">
        <b-row>
          <b-col lg="5">
            <b-form-group>
              <label class="small muted">Clave</label>
              <b-form-input v-model="keyField"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="5">
            <b-form-group>
              <b-form-checkbox v-model="changeAsset" name="check-button" switch disabled>
                Cambio de tipo de activo o descripción
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3">
          <b-form-group>
            <label class="small muted">Tipo de activo</label>
            <b-form-input v-model="assetType"></b-form-input>
          </b-form-group>
        </b-col>
          <b-col lg="3">
            <b-form-group>
                  <b-input-group-text><i class="fa fa-angle-double-left"></i></b-input-group-text>
                <b-form-select
                  v-model="assetType"
                  class="form-control"
                  :options="assetTypeOptions">
                </b-form-select>
            </b-form-group>
          </b-col>


          <b-col lg="3">
            <b-form-group>
              <label class="small muted">Activo</label>
              <b-form-input v-model="assetName"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>

                  <b-input-group-text><i class="fa fa-angle-double-left"></i></b-input-group-text>
                  <b-form-select
                    v-model="assetName"
                    class="form-control"
                    :options="assetNameOptions">
                  </b-form-select>

            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="3">
            <b-form-group>
              <label class="small muted">Descripción</label>
              <b-form-input v-model="assetDescription"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <b-input-group-text><i class="fa fa-angle-double-left"></i></b-input-group-text>
              <b-form-select
                v-model="assetDescription"
                class="form-control"
                :options="assetDescriptionOptions">
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col lg="3">
            <b-form-group>
              <label class="small muted">Marca</label>
              <b-form-input v-model="assetBrand"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <b-input-group-text><i class="fa fa-angle-double-left"></i></b-input-group-text>
              <b-form-select
                v-model="assetBrand"
                class="form-control"
                :options="assetBrandOptions">
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="3">
            <b-form-group>
              <label class="small muted">Modelo</label>
              <b-form-input v-model="assetModel" v-b-tooltip.hover.html="assetModelOptions"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <b-input-group-text><i class="fa fa-angle-double-left"></i></b-input-group-text>
              <b-form-select
                v-model="assetModel"
                class="form-control"
                :options="assetModelOptions">
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col lg="3">
            <b-form-group>
              <label class="small muted">Serie</label>
              <b-form-input v-model="assetSerial" v-b-tooltip.hover.html="assetSerialOptions"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <b-input-group-text><i class="fa fa-angle-double-left"></i></b-input-group-text>
              <b-form-select
                v-model="assetSerial"
                class="form-control"
                :options="assetSerialOptions">
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="3">
            <b-form-group>

              <label class="small muted">Fecha de adquisición</label>
              <b-form-input v-model="acquisitionDate" v-b-tooltip.hover.html="assetAcquisitionDateOptions"></b-form-input>

            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <b-input-group-text><i class="fa fa-angle-double-left"></i></b-input-group-text>
              <b-form-select
                v-model="acquisitionDate"
                class="form-control"
                :options="assetAcquisitionDateOptions">
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col lg="3">
            <b-form-group>

              <label class="small muted">Tipo de adquisición</label>
              <b-form-input v-model="acquisitionType" v-b-tooltip.hover.html="assetAcquisitionTypeOptions"></b-form-input>

            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <b-input-group-text><i class="fa fa-angle-double-left"></i></b-input-group-text>
              <b-form-select
                v-model="acquisitionType"
                class="form-control"
                :options="assetAcquisitionTypeOptions">
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3">
            <b-form-group>

              <label class="small muted">Factura</label>
                  <b-form-input v-model="assetInvoice" v-b-tooltip.hover.html="assetInvoiceOptions"></b-form-input>

            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <b-input-group-text><i class="fa fa-angle-double-left"></i></b-input-group-text>
              <b-form-select
                v-model="assetInvoice"
                class="form-control"
                :options="assetInvoiceOptions">
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col lg="3">
            <b-form-group>
              <label class="small muted">Precio</label>
                <b-form-input v-model="assetPrice" v-b-tooltip.hover.html="assetPriceOptions"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <b-input-group-text><i class="fa fa-angle-double-left"></i></b-input-group-text>
              <b-form-select
                v-model="assetPrice"
                class="form-control"
                :options="assetPriceOptions">
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="3">
            <b-form-group>
              <label class="small muted">Impuesto</label>
                  <b-form-input v-model="assetTax" v-b-tooltip.hover.html="assetTaxOptions"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <b-input-group-text><i class="fa fa-angle-double-left"></i></b-input-group-text>
              <b-form-select
                v-model="assetTax"
                class="form-control"
                :options="assetTaxOptions">
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="small muted">Costo</label>
                <b-form-input v-model="assetCost" v-b-tooltip.hover.html="assetCostOptions"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <b-input-group-text><i class="fa fa-angle-double-left"></i></b-input-group-text>
              <b-form-select
                v-model="assetCost"
                class="form-control"
                :options="assetCostOptions">
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <b-form-group>
              <label class="small muted">Valor actual</label>
              <b-form-input v-model="currentValue" v-b-tooltip.hover.html="assetCurrentValueOptions"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>
              <label class="small muted">Depreciación contable</label>
              <b-form-input v-model="accountingDepreciation" v-b-tooltip.hover.html="assetAccountingDepreciationOptions"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <b-form-group>
              <label class="small muted">Depreciación fiscal</label>
              <b-form-input v-model="fiscalDepreciation" v-b-tooltip.hover.html="assetFiscalDepreciationOptions"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>
              <label class="small muted">Último departamento</label>
                <treeselect
                  v-model="lastDepartmentId"
                  :multiple="false"
                  :options="assetDepartmentOptions"
                  placeholder="Último departamento..."
                disabled/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <b-form-group>

              <label class="small muted">Departamento actual</label>
                  <treeselect
                    v-model="currentDepartmentId"
                    :multiple="false"
                    :options="assetDepartmentOptions"
                    placeholder="Departamento actual..." />

            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>

              <label class="small muted">Centro de costo</label>
                <b-form-select
                  v-model="costCenterId"
                  class="form-control"
                  :options="assetCostCenterOptions">
                </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <b-form-group>

              <label class="small muted">Cuenta contable</label>
                  <b-form-select
                    v-model="accountingAccountId"
                    class="form-control"
                    :options="assetAccountingAccountOptions"
                  @change="calcDep">
                  </b-form-select>

            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>

              <label class="small muted">Ubicación</label>

                <b-form-select
                  v-model="locationId"
                  class="form-control"
                  :options="assetLocationOptions">
                </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="3">
            <b-form-group>

              <label class="small muted">Detalle de ubicación</label>
                  <b-form-input v-model="locationDetail" v-b-tooltip.hover.html="assetLocationDetailOptions"></b-form-input>

            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <b-input-group-text><i class="fa fa-angle-double-left"></i></b-input-group-text>
              <b-form-select
                v-model="locationDetail"
                class="form-control"
                :options="assetLocationDetailOptions">
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>

              <label class="small muted">Comentarios</label>
                <b-form-input v-model="comments" v-b-tooltip.hover.html="assetCommentsOptions"></b-form-input>

            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <b-input-group-text><i class="fa fa-angle-double-left"></i></b-input-group-text>
              <b-form-select
                v-model="comments"
                class="form-control"
                :options="assetCommentsOptions">
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <b-form-group>

              <label class="small muted">Alta</label>
                <b-form-input v-model="alta" v-b-tooltip.hover.html="assetAltaOptions"></b-form-input>

            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>

              <label class="small muted">Estatus</label>
                <b-form-select
                  v-model="statusID"
                  :options="statusOptions"
                  placeholder="Estado..."
                >
                </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <b-form-group>

              <label class="small muted">Inventario anterior</label>
                  <b-form-input v-model="previousAsset" v-b-tooltip.hover.html="assetPreviousAssetOptions"></b-form-input>

            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>

              <label class="small muted">Partida</label>
                <b-form-input v-model="partida" v-b-tooltip.hover.html="assetPartidaOptions"></b-form-input>

            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <b-form-group>

              <label class="small muted">CABM</label>
                  <b-form-input v-model="cabm" v-b-tooltip.hover.html="assetCabmOptions"></b-form-input>

            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>

              <label class="small muted">Año</label>
                <b-form-input v-model="assetYear" v-b-tooltip.hover.html="assetYearOptions"></b-form-input>

            </b-form-group>
          </b-col>
        </b-row>

        <b-col lg="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Imágenes del activo</strong>

            </div>
            <div>
              <b-carousel id="carouselCurrent"
                          style="text-shadow: 1px 1px 2px #333;"
                          indicators
                          background="#ababab"
                          :interval="0"
                          img-width="1024"
                          img-height="768"
                          v-model="slide"
                          @sliding-start="onSlideStart"
                          @sliding-end="onSlideEnd"
              >

              </b-carousel>

              <p class="small muted mt-4">
                Imagen: {{ slide + 1 }}
              </p>

            </div>
          </b-card>
        </b-col>
      </form>
    </b-modal>
    <b-col lg="12">
      <transition name="slide">
        <b-card>
          <div slot="header">
            {{caption}}
          </div>
          <b-row>
            <b-col md="6" class="my-1">
              <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
                <b-input-group>
                  <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
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
                   responsive="lg"
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
            <b-pagination size="sm" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Ant" next-text="Sig" hide-goto-end-buttons/>
          </nav>
        </b-card>
      </transition>
    </b-col>
  </b-row>
</template>


<script>
  import gets from '../../services/Gets'
  import { CodeLoader } from 'vue-content-loader';
  import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import updateCatalog from  '../../services/UpdateCatalogService'
  import createCatalog from  '../../services/CreateCatalogService'
  import BFormInput from "bootstrap-vue/src/components/form-input/form-input";
  import BCol from "bootstrap-vue/src/components/layout/col";

  export default {
    name: 'Final Assets Group',
    props: {
      caption: {
        type: String,
        default: 'Grupo de Activos Finales'
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
      BFormInput,
      CodeLoader,
      VueBootstrapTypeahead,
      Treeselect
    },
    data: () => {
      return {
        assetID: null,
        assetType: null,
        assetName: null,
        assetDescription: null,
        assetBrand: null,
        assetModel: null,
        assetSerial: null,
        acquisitionDate: null,
        changeAsset: false,
        acquisitionType: null,
        assetInvoice: null,
        assetPrice: null,
        assetTax: null,
        assetCost: null,
        currentValue: null,
        accountingDepreciation: null,
        fiscalDepreciation: null,
        lastDepartmentId: null,
        currentDepartmentId: null,
        costCenterId: null,
        accountingAccountId: null,
        registrationSessionID: null,
        locationId: null,
        locationDetail: null,
        comments: null,
        keyField: '',
        alta: null,
        previousAsset: null,
        slide: 0,
        partida: null,
        cabm: null,
        statusID: null,
        assetYear: null,
        items: [],
        flag: false,
        filter: null,
        assetTypeOptions: [],
        assetNameOptions: [],
        assetDescriptionOptions: [],
        assetBrandOptions: [],
        assetModelOptions: [],
        assetSerialOptions: [],
        assetAcquisitionDateOptions: [],
        assetAcquisitionTypeOptions: [],
        assetInvoiceOptions: [],
        assetPriceOptions: [],
        assetTaxOptions: [],
        assetCostOptions: [],
        assetCurrentValueOptions: [],
        assetAccountingDepreciationOptions: [],
        assetFiscalDepreciationOptions: [],
        assetDepartmentOptions: [],
        assetCostCenterOptions:[],
        assetLocationOptions: [],
        assetAccountingAccountOptions: [],
        assetCommentsOptions: [],
        assetLocationDetailOptions: [],
        assetAltaOptions: [],
        assetAssetTypeOptions: [],
        assetPartidaOptions: [],
        assetPreviousAssetOptions: [],
        assetYearOptions: [],
        assetCabmOptions: [],
        statusOptions: [
          {value: null, text: 'Estatus...'},
          {value: 4, text: 'CONCILIADO'},
          {value: 5, text: 'CAMBIO DE DEPARTAMENTO'},
          {value: 6, text: 'CAMBIO DE UBICACION '},
          {value: 7, text: 'ETIQUETA DUPLICADA'},
          {value: 8, text: 'ETIQUETA SIN DATOS'},
          {value: 9, text: 'EN DEMASÍA'}
        ],
        fields: [
          {label: 'ID', key: 'id', sortable: true},
          {label: 'Clave', key: 'keyField', sortable: true},
          {label: 'Tipo de Activo', key: 'assetType', sortable: true},
          {label: 'Activo', key: 'asset', sortable: true},
          {label: 'Descripción', key: 'description', sortable: true},
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
      var localitems = []
      var localAssetTypeOptions = []
      var localAssetNameOptions = []
      var localAssetDescriptionOptions = []
      var localAssetBrandOptions = []
      var localAssetModelOptions = []
      var localAssetSerialOptions = []
      var localAssetAcquisitionDatelOptions = []
      var localAssetAcquisitionTypeOptions = []
      var localAssetInvoiceOptions = []
      var localAssetPriceOptions = []
      var localAssetTaxOptions = []
      var localAssetCostOptions = []
      var localAssetCurrentValueOptions = []
      var localAssetAccountingDepreciationOptions = []
      var localAssetFiscalDepreciationOptions = []
      var localAssetLocationDetailOptions = []
      var localAssetCommentsOptions = []
      var localAssetAltaOptions = []
      var localAssetPartidaOptions = []
      var localAssetPreviousAssetOptions = []
      var localAssetCabmOptions = []
      var localAssetYearOptions = []
      const dprtmnts = await gets.getDepartmentsByCompany(this.$session.get('companyID'));
      this.assetDepartmentOptions = dprtmnts.data.departments;

      const cstcntrs = await gets.getCostCentersByCompany(this.$session.get('companyID'));
      let tmp = [
        {value: null, text: 'Centros de costo...'}
      ];
      cstcntrs.data.costCenters.map(function(value, key) {
        let dt = {value: value.id, text: value.name};
        tmp.push(dt);
      });
      this.assetCostCenterOptions = tmp;

      const lctns = await gets.getLocationsByCompany(this.$session.get('companyID'));
      let tmp2 = [
        {value: null, text: 'Ubicaciones...'}
      ];
      lctns.data.locations.map(function(value, key) {
        let dt = {value: value.id, text: value.name};
        tmp2.push(dt);
      });
      this.assetLocationOptions = tmp2;

      const accacc = await gets.getAccountingAccountsByCompany(this.$session.get('companyID'));
      let tmp3 = [
        {value: null, text: 'Cuentas contables...'}
      ];
      accacc.data.accountingAccounts.map(function(value, key) {
        let dt = {value: value.id, text: value.name, depreciationPercentage: value.depreciationPercentage};
        tmp3.push(dt);
      });
      this.assetAccountingAccountOptions = tmp3;

     await gets.getFinalAssetsGroup(this.$route.params.key, this.$session.get('projectID')).then(response => {

        console.info(response);
        if (response.data.error.errorCode === 0){
          localitems = response.data.finalAssets;
          localitems.forEach(function(element) {
            if (localAssetTypeOptions.indexOf(element.assetType) === -1)
              localAssetTypeOptions.push(element.assetType)

            if (localAssetNameOptions.indexOf(element.asset) === -1)
              localAssetNameOptions.push(element.asset)

            if (localAssetDescriptionOptions.indexOf(element.description) === -1)
              localAssetDescriptionOptions.push(element.description)

            if (localAssetBrandOptions.indexOf(element.brand) === -1)
              localAssetBrandOptions.push(element.brand)

            if (localAssetModelOptions.indexOf(element.model) === -1)
              localAssetModelOptions.push(element.model)

            if (localAssetSerialOptions.indexOf(element.serial) === -1)
              localAssetSerialOptions.push(element.serial)

            if (localAssetAcquisitionDatelOptions.indexOf(element.acquisitionDate) === -1)
              localAssetAcquisitionDatelOptions.push(element.acquisitionDate)

            if (localAssetAcquisitionTypeOptions.indexOf(element.acquisitionType) === -1)
              localAssetAcquisitionTypeOptions.push(element.acquisitionType)

            if (localAssetInvoiceOptions.indexOf(element.invoice) === -1)
              localAssetInvoiceOptions.push(element.invoice)

            if (localAssetPriceOptions.indexOf(element.price) === -1)
              localAssetPriceOptions.push("" + element.price)

            if (localAssetTaxOptions.indexOf(element.tax) === -1)
              localAssetTaxOptions.push("" + element.tax)

            if (localAssetCostOptions.indexOf(element.cost) === -1)
              localAssetCostOptions.push("" + element.cost)

            if (localAssetCurrentValueOptions.indexOf(element.currentValue) === -1)
              localAssetCurrentValueOptions.push("" + element.currentValue)

            if (localAssetAccountingDepreciationOptions.indexOf(element.accountingDepreciation) === -1)
              localAssetAccountingDepreciationOptions.push("" + element.accountingDepreciation)

            if (localAssetFiscalDepreciationOptions.indexOf(element.fiscalDepreciation) === -1)
              localAssetFiscalDepreciationOptions.push("" + element.fiscalDepreciation)

            if (localAssetLocationDetailOptions.indexOf(element.locationDetail) === -1)
              localAssetLocationDetailOptions.push(element.locationDetail)

            if (localAssetCommentsOptions.indexOf(element.comments) === -1)
              localAssetCommentsOptions.push(element.comments)

            if (localAssetAltaOptions.indexOf(element.personalString01) === -1)
              localAssetAltaOptions.push(element.personalString01)

            if (localAssetPreviousAssetOptions.indexOf(element.personalString02) === -1)
              localAssetPreviousAssetOptions.push(element.personalString02)

            if (localAssetPartidaOptions.indexOf(element.personalString03) === -1)
              localAssetPartidaOptions.push(element.personalString03)

            if (localAssetCabmOptions.indexOf(element.personalString04) === -1)
              localAssetCabmOptions.push(element.personalString04)

            if (localAssetYearOptions.indexOf(element.personalInt01) === -1)
              localAssetYearOptions.push("" + element.personalInt01)
          });
          this.flag = true;
        }
      });
      this.items = localitems;
      this.assetTypeOptions = localAssetTypeOptions;
      this.assetNameOptions = localAssetNameOptions;
      this.assetDescriptionOptions = localAssetDescriptionOptions;
      this.assetBrandOptions = localAssetBrandOptions;
      this.assetModelOptions = localAssetModelOptions;
      this.assetSerialOptions = localAssetSerialOptions;
      this.assetAcquisitionDateOptions = localAssetAcquisitionDatelOptions;
      this.assetAcquisitionTypeOptions = localAssetAcquisitionTypeOptions;
      this.assetInvoiceOptions = localAssetInvoiceOptions;
      this.assetPriceOptions = localAssetPriceOptions;
      this.assetTaxOptions = localAssetTaxOptions;
      this.assetCostOptions = localAssetCostOptions;
      this.assetCurrentValueOptions = localAssetCurrentValueOptions;
      this.assetAccountingDepreciationOptions = localAssetAccountingDepreciationOptions;
      this.assetFiscalDepreciationOptions = localAssetFiscalDepreciationOptions;
      this.assetLocationDetailOptions = localAssetLocationDetailOptions;
      this.assetCommentsOptions = localAssetCommentsOptions;
      this.assetAltaOptions = localAssetAltaOptions;
      this.assetPartidaOptions = localAssetPartidaOptions;
      this.assetPreviousAssetOptions = localAssetPreviousAssetOptions;
      this.assetYearOptions = localAssetYearOptions;
      this.assetCabmOptions = localAssetCabmOptions;

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
        return `finalAssets/finalAssetGroup/${id.toString()}`
      },
      async rowClicked (item) {

        /*
        * $diff =  abs(time() - strtotime($datos[6]));
				        	$depYears = floor($diff / (365*60*60*24));
				        	$currVal = ($years * $accountingAccountPercent > 1 ? 0 : ($datos[11] - ($datos[11] * ($years * $accountingAccountPercent))));
				        	*/
        let now = new Date().getTime();
        let acqDt = new Date(item.acquisitionDate).getTime();
        let diff = Math.abs(now - acqDt);
        let depYears = Math.floor(diff / (365*60*60*24*1000));
        let accountingAccountPercent = this.assetAccountingAccountOptions.find(dp => dp.value === item.acountingAccountID) === undefined ? 0 : this.assetAccountingAccountOptions.find(dp => dp.value === item.acountingAccountID).depreciationPercentage;
        let currVal = (depYears * accountingAccountPercent > 1 ? 0 : (item.cost - (item.cost * (depYears * accountingAccountPercent))));
        this.assetID = item.id;
        this.registrationSessionID = item.registrationSessionID;
        this.keyField = item.keyField;
        this.assetType = item.assetType;
        this.assetName = item.asset;
        this.assetDescription = item.description;
        this.assetBrand = item.brand;
        this.assetModel = item.model;
        this.assetSerial = item.serial;
        this.acquisitionDate = item.acquisitionDate;
        this.acquisitionType = item.acquisitionType;
        this.assetInvoice = item.invoice;
        this.assetPrice = item.price;
        this.assetTax = item.tax;
        this.assetCost = item.cost;
        this.currentValue = currVal;
        this.accountingDepreciation = (item.accountingAccountID > 0 ? this.assetAccountingAccountOptions.find(dp => dp.value === item.acountingAccountID).depreciationPercentage : 0) * this.assetCost;
        this.fiscalDepreciation = item.fiscalDepreciation;
        this.lastDepartmentId = item.lastDepartmentID;
        this.currentDepartmentId = item.currentDepartmentID;
        this.costCenterId = item.costCenterID;
        this.accountingAccountId = item.acountingAccountID;
        this.locationId = item.locationID;
        this.locationDetail = item.locationDetail;
        this.comments = item.comments;
        this.alta = item.personalInt01;
        this.previousAsset = item.personalString02;
        this.partida = item.personalString03;
        this.cabm = item.personalString04;
        this.assetYear = item.personalInt01;
        this.changeAsset = item.personalInt02 == 1 ? true : false;
        this.statusID = item.statusID;
        this.$refs['conceal'].show()

        const images = await gets.getImagesByAsset(item.id,true);
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
        }
       // const regLink = this.regLink(item.id)
        //this.$router.push({path: regLink})
      },
      calcDep(){
        this.accountingDepreciation = this.assetAccountingAccountOptions.find(dp => dp.value === this.accountingAccountId).depreciationPercentage * this.assetCost;
      },
      addClick () {
       // this.$router.push({path: `locations/addLocation`})
      },
      selImages(){
        let clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent('click', true, true, window,
          0, 0, 0, 0, 0, false, false, false, false, 0, null);
        document.querySelector('#inputfile').dispatchEvent(clickEvent);
      },
      updateCarousel(e){
        alert("selected files: " + e.target.files.length)
        var div = document.createElement('div');

        for (let i = 0; i < e.target.files.length; i++){
          const file = e.target.files[i];
          //div.innerHTML = '<b-carousel-slide img-src="'+ URL.createObjectURL(file) +'"></b-carousel-slide>'
          div.innerHTML = '<div data-v-19bfb51e role="listitem" class="carousel-item" aria-current="false" aria-posinset="1" aria-setsize="3" style="background: rgb(171, 171, 171);" aria-hidden="true">' +
            '<img src="' + URL.createObjectURL(file) + '" width="1024" height="768" class="img-fluid w-100 d-block">' +
            '<div class="carousel-caption"><!----><!----></div>' +
            '</div>'
          const element = div.firstChild;
          document.querySelector('#carousel1___BV_inner_').appendChild(element);
        }

        //
      },
      onSlideStart (slide) {
        console.log('onSlideStart', slide)
        this.sliding = true
      },
      onSlideEnd (slide) {
        console.log('onSlideEnd', slide)
        this.sliding = false
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1
      },
      async ok(){
        const nwAsstA = {
          "id":  this.assetID,
          "registrationSessionID": this.registrationSessionID,
          "keyField": this.keyField,
          "projectID": this.$session.get('projectID'),
          "asset": this.assetName,
          "assetType": this.assetType,
          "description": this.assetDescription,
          "brand": this.assetBrand,
          "model": this.assetModel,
          "serial": this.assetSerial,
          "acquisitionDate": this.acquisitionDate,
          "acquisitionType": this.acquisitionType,
          "invoice": this.assetInvoice,
          "price": "" + this.assetPrice,
          "tax": "" + this.assetTax,
          "cost": "" + this.assetCost,
          "currentValue": "" + this.currentValue,
          "accountingDepreciation": "" + this.accountingDepreciation,
          "fiscalDepreciation": "" + this.fiscalDepreciation,
          "lastDepartmentID": this.lastDepartmentId,
          "currentDepartmentID": this.currentDepartmentId,
          "costCenterID": this.costCenterId,
          "accountingAccountID": this.accountingAccountID == null ? 0 : this.accountingAccountID,
          "locationID": this.locationId,
          "locationDetail": this.locationDetail,
          "comments": this.comments,
          "personalString01": "" + this.alta,
          "personalString02": "" + this.previousAsset,
          "personalString03": "" + this.partida,
          "personalString04": "" + this.cabm,
          "personalString05": '',
          "personalInt01": this.assetYear,
          "personalInt02": 0,
          "personalInt03": 0,
          "personalFloat01": '0.0',
          "personalFloat02": '0.0',
          "personalFloat03": '0.0',
          "statusID": 11,
          "userId": this.$session.get('userId')
        };
        await updateCatalog.updateFinalAsset(nwAsstA).then(async response => {
          console.info(response);
          if (response.data.error.errorCode === 0){
            const nwAsst = {
              "assetID":  0,
              "registrationSessionID": this.registrationSessionID,
              "keyField": this.keyField,
              "projectID": this.$session.get('projectID'),
              "asset": this.assetName,
              "assetType": this.assetType,
              "description": this.assetDescription,
              "brand": this.assetBrand,
              "model": this.assetModel,
              "serial": this.assetSerial,
              "acquisitionDate": this.acquisitionDate,
              "acquisitionType": this.acquisitionType,
              "invoice": this.assetInvoice,
              "price": "" + this.assetPrice,
              "tax": "" + this.assetTax,
              "cost": "" + this.assetCost,
              "currentValue": "" + this.currentValue,
              "accountingDepreciation": "" + this.accountingDepreciation,
              "fiscalDepreciation": "" + this.fiscalDepreciation,
              "lastDepartmentID": this.lastDepartmentId,
              "currentDepartmentID": this.currentDepartmentId,
              "costCenterID": this.costCenterId,
              "accountingAccountID": this.accountingAccountID == null ? 0 : this.accountingAccountID,
              "locationID": this.locationId,
              "locationDetail": this.locationDetail,
              "comments": this.comments,
              "personalString01": "" + this.alta,
              "personalString02": "" + this.previousAsset,
              "personalString03": "" + this.partida,
              "personalString04": "" + this.cabm,
              "personalString05": '',
              "personalInt01": this.assetYear,
              "personalInt02": 0,
              "personalInt03": 0,
              "personalFloat01": '0.0',
              "personalFloat02": '0.0',
              "personalFloat03": '0.0',
              "statusID": this.statusID,
              "userId": this.$session.get('userId')
            };
            await createCatalog.createFinalAsset(nwAsst).then(async response => {
              console.info(response);
              if (response.data.error.errorCode === 0){
                this.$toaster.success(response.data.error.message);
                this.$router.go(`/finalAssets/`)
              }else{
                this.$toaster.error(response.data.error.message);
              }
            });
          }else{
            this.$toaster.error(response.data.error.message);
          }
        });

      }
    }
  }
</script>

<style scoped>
  .card-body >>> table > tbody > tr > td {
    cursor: pointer;
  }
</style>
