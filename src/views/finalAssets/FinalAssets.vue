<template>
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
      CodeLoader
    },
    data: () => {
      return {
        items: [],
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
     await gets.getFinalAssetsByProject(this.$session.get('projectID')).then(response => {

        console.info(response);
        if (response.data.error.errorCode === 0){
          let finalAssets = response.data.finalAssets;
          this.flag = true;
          finalAssets.forEach(function (finalAsset) {
            console.info(finalAsset)
            let exists = localitems.find(fa => fa.keyField === finalAsset.keyField);
            console.info(exists);

            if (exists === undefined){
              localitems.push(finalAsset)
            }
          });
        }
      });
      this.items = localitems;
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
        return `locations/location/${id.toString()}`
      },
      rowClicked (item) {
       // const regLink = this.regLink(item.id)
       // this.$router.push({path: regLink})
      },
      addClick () {
       // this.$router.push({path: `locations/addLocation`})
      }
    }
  }
</script>

<style scoped>
  .card-body >>> table > tbody > tr > td {
    cursor: pointer;
  }
</style>
