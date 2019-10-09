<template>
  <div class="animated fade-in">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <b-form @submit.prevent="submit">
              <strong>Sesión </strong><small>Agregar</small>
              <small class="float-right text-muted">
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
                        <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                        <treeselect  :multiple="false" :options="options" id="departmentID"  v-model="$v.departmentID.$model" required/>
                      </b-input-group-prepend>
                    </b-input-group>
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
                                     v-model="$v.locationID.$model"
                                     class="form-control" :class="{ 'form-group--error': $v.locationID.$error }"
                                     :options="locationOptions"
                                     value="Ubicación...">
                      </b-form-select>
                    </b-input-group>
                    <div class="small text-danger" v-if="!$v.locationID.required">Campo requerido</div>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div slot="footer" class="pull-right">
                    <b-button id="btn-cancelar" type="reset" size="sm" variant="danger" @click="goBack" class="mr-1"><i class="fa fa-ban"></i> Cancelar</b-button>
                    <b-button id="btn-guardar" type="submit" size="sm" variant="primary" :disabled="submitStatus === 'PENDING' || this.departmentID == null || this.locationID == null"><i class="fa fa-play"></i> Iniciar</b-button>
                    <p class="small text-success" v-if="submitStatus === 'OK'">Sesión iniciada satisfactoriamente.</p>
                    <p class="small text-danger" v-if="submitStatus === 'ERROR'">Por favor revisa que los datos sean correctos.</p>
                    <p class="small text-dark" v-if="submitStatus === 'PENDING'">Guardando...</p>
                  </div>
                </b-col>
              </b-row>
            </b-form>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import assetsData from './AssetsData'
  import gets from '../../services/Gets'
  import posts from '../../services/Posts'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import createCatalog from '../../services/CreateCatalogService'
  import { required, minLength } from 'vuelidate/lib/validators'
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
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/pages/login')
      }
    },
    components: {
      Treeselect
    },
    validations: {
      departmentID: {

      },
      locationID: {
        required
      }
    },
    data: () => {
      return {
        userName:null,
        departmentID: null,
        options: [],
        locationID: null,
        submitStatus: null,
        locationOptions: []
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
      this.flag = true;
      this.userName = this.$session.get('name')
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      async submit(){
        const params = {
          "userID": this.$session.get('userId')
        };
        await posts.postClearActiveSessions(params).then(async response => {
          console.log(response);
          this.$v.$touch();
          if (this.$v.$invalid) {
            this.submitStatus = 'ERROR';
            console.info(this.$v)
          } else {
            this.submitStatus = 'PENDING';
            const rgSssn = {
              "sessionLocationId": this.locationID,
              "sessionDepartmentID": this.departmentID,
              "projectID": this.$session.get('projectID'),
              "userId": this.$session.get('userId')
            };
            await createCatalog.createRegistrationSession(rgSssn).then(response => {
              console.info(response);
              if (response.data.error.errorCode === 0){
                this.$toaster.success(response.data.error.message);
                this.submitStatus = 'OK';
                this.$session.set('activeSessionID', response.data.id);
                this.$router.push('/sessions/session/' + response.data.id);
              }else{
                this.$toaster.error(response.data.error.message);
                this.submitStatus = 'ERROR';
              }
            });
          }
        });
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
        return `session/sessionID/asset/${id.toString()}`
      },
      rowClicked (item) {
        this.itemSelected = item.id - 1
        this.current = this.tableitems[this.itemSelected]
        this.assetModal = true
      },
      addSessionClicked () {
        this.addSessionVar = true
        this.find.department = this.department
        this.find.location = this.location
        this.nuevo.department = this.department
        this.nuevo.location = this.location
      },
      scaner () {
        this.scanBarcode = true
      },
      scanAsset () {
        this.find.id = this.tableitems.length + 1
        this.tableitems.push(
          {
            id : this.find.id,
            keyfield : this.find.keyfield,
            asset : this.find.asset,
            description : this.find.description,
            brand : this.find.brand,
            model : this.find.model,
            serial : this.find.serial,
            cost : this.find.cost,
            assetType : this.find.assetType,
            department : this.find.department,
            location : this.find.location,
            locationDetail : this.find.locationDetail,
            comments : this.find.comments,
            status : this.find.status
          }
        )
        this.scanBarcode = false
      },
      addAsset () {
        this.nuevo.id = this.tableitems.length + 1
        this.tableitems.push(
          {
            id : this.nuevo.id,
            asset : this.nuevo.asset,
            description : this.nuevo.description,
            brand : this.nuevo.brand,
            model : this.nuevo.model,
            serial : this.nuevo.serial,
            cost : this.nuevo.cost,
            assetType : this.nuevo.assetType,
            department : this.nuevo.department,
            location : this.nuevo.location,
            locationDetail : this.nuevo.locationDetail,
            comments : this.nuevo.comments,
            status : this.nuevo.status
          }
        )
        this.scanBarcode = false
        this.nuevo.id = '',
          this.nuevo.asset = '',
          this.nuevo.description = '',
          this.nuevo.brand = '',
          this.nuevo.model = '',
          this.nuevo.serial = '',
          this.nuevo.cost = '',
          this.nuevo.assetType = '',
          this.nuevo.department = this.department,
          this.nuevo.location = this.location,
          this.nuevo.locationDetail = '',
          this.nuevo.comments = '',
          this.nuevo.status = 'En demasía'
      },
      cancelScan () {
        this.scanBarcode = false
      },
      cancelAdd () {

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
