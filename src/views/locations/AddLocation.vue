<template>

  <div class="animated fade-in">

    <b-row>
      <b-col lg="6">
        <b-card >
          <div slot="header">
            <strong>{{caption}}</strong><small> ID: {{$route.params.id }}</small>
          </div>
          <form @submit.prevent="submit">
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Tipo de ubicación</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="locationType"
                                   v-model.trim="$v.locationType.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.locationType.$error }"
                                   :options="locationTypeOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.locationType.required">Campo requerido</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Nombre</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.name.$error }" type="text" id="name" v-model="$v.name.$model" placeholder="Nombre"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.name.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.name.minLength">El nombre debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <b-form-group>
                  <label class="small muted">Ubicación madre</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                    </b-input-group-prepend>
                      <b-form-select id="locationID"
                                     v-model.trim="$v.locationID.$model"
                                     class="form-control" :class="{ 'form-group--error': $v.locationID.$error }"
                                     :options="options">
                      </b-form-select>

                  </b-input-group>
                </b-form-group>
              </b-col>

            </b-row>
            <!--address-->
            <label style="margin-right: 25px; ">Dirección</label>
            <b-button style="margin-bottom: 50px" v-b-toggle.collapse variant="primary">Mostrar/Ocultar</b-button>
            <b-collapse id="collapse">
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Tipo de dirección</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="addressType"
                                   v-model.trim="$v.addressType.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.addressType.$error }"
                                   :options="addressTypeOptions">
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Tipo de vialidad</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="roadType"
                                   v-model.trim="$v.roadType.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.roadType.$error }"
                                   :options="roadTypeOptions">
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="4">
                <b-form-group>
                  <label class="small muted">Calle</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.roadName.$error }" type="text" id="roadName" v-model="$v.roadName.$model" placeholder="Calle"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.roadName.minLength">La calle debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group>
                  <label class="small muted">Número exterior</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.outdoorNumber.$error }" type="text" id="outdoorNumber" v-model="$v.outdoorNumber.$model" placeholder="Número exterior"></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group>
                  <label class="small muted">Número interior</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.indoorNumber.$error }" type="text" id="indoorNumber" v-model="$v.indoorNumber.$model" placeholder="Número interior"></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Colonia</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.colony.$error }" type="text" id="colony" v-model="$v.colony.$model" placeholder="Colonia"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.colony.minLength">La colonia debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Ubicación</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.location.$error }" type="text" id="location" v-model="$v.location.$model" placeholder="Localidad"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.location.minLength">La localidad debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="4">
                <b-form-group>
                  <label class="small muted">Municipio</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.municipality.$error }" type="text" id="municipality" v-model="$v.municipality.$model" placeholder="Municipio"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.municipality.minLength">El municipio debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group>
                  <label class="small muted">Código postal</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.cp.$error }" type="text" id="cp" v-model="$v.cp.$model" placeholder="Código postal"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.cp.minLength">El código postal debe contener 5 letras</div>
                  <div class="small text-danger" v-if="!$v.cp.maxLength">El código postal debe contener 5 letras</div>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group>
                  <label class="small muted">Estado</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="state"
                                   v-model.trim="$v.state.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.state.$error }"
                                   :options="stateOptions">
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Tipo de teléfono</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="phoneType"
                                   v-model.trim="$v.phoneType.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.phoneType.$error }"
                                   :options="phoneTypeOptions">
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Número de teléfono</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.phoneNumber.$error }" type="text" id="phoneNumber" v-model="$v.phoneNumber.$model" placeholder="Número de teléfono"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.phoneNumber.minLength">El número debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Tipo de teléfono 2</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="phoneType2"
                                   v-model.trim="$v.phoneType2.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.phoneType2.$error }"
                                   :options="phoneTypeOptions">
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Número de teléfono 2</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.phoneNumber2.$error }" type="text" id="phoneNumber2" v-model="$v.phoneNumber2.$model" placeholder="Número de teléfono 2"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.phoneNumber2.minLength">El nombre debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
            </b-row>
            </b-collapse>
            <!--address-->
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Estatus</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-exclamation-circle"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="status"
                                   v-model.trim="$v.status.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.status.$error }"
                                   :options="statusOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.status.required">Campo requerido</div>
                </b-form-group>
              </b-col>
            </b-row>
            <div slot="footer" class="pull-right">
              <b-button id="btn-cancelar" type="reset" size="sm" variant="danger" @click="goBack" class="mr-1"><i class="fa fa-ban"></i> Cancelar</b-button>
              <b-button id="btn-guardar" type="submit" size="sm" variant="success" :disabled="submitStatus === 'PENDING'"><i class="fa fa-save"></i> Guardar</b-button>
              <p class="small text-success" v-if="submitStatus === 'OK'">Usuario actualizado satisfactoriamente.</p>
              <p class="small text-danger" v-if="submitStatus === 'ERROR'">Por favor revisa que los datos sean correctos.</p>
              <p class="small text-dark" v-if="submitStatus === 'PENDING'">Guardando...</p>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>

</template>

<script>
  import getById from '../../services/GetCatalogById'
  import createCatallog from '../../services/CreateCatalogService'
  import gets from '../../services/Gets'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { required, minLength,maxLength } from 'vuelidate/lib/validators'
  import { CodeLoader } from 'vue-content-loader';
  export default {
    name: 'Location',
    props: {
      caption: {
        type: String,
        default: 'Crear ubicación'
      },
    },
    /*data: () => {
      return {
        items: (id) => {
          const user = use0''''rsData.find( user => user.id.toString() === id)
          const userDetails = user ? Object.entries(user) : [['id', 'Not found','','']]
          return userDetails.map(([key, value]) => {return {key: key, value: value}})
        },
        fields: [
          {key: 'key'},
          {key: 'value'}
        ],*/


    data: () => {
      return {
        name: '',
        fiscalID: '',
        locationType: null,
        locationID: 0,
        locationAddressID:null,
        //address
        addressID:null,
        addressType:null,
        roadType:null,
        roadName:'',
        outdoorNumber:'',
        indoorNumber:'',
        colony:'',
        location:'',
        municipality:'',
        cp:'',
        state:null,
        phoneType:null,
        phoneNumber:'',
        phoneType2:null,
        phoneNumber2:'',
        //address
        status: null,
        submitStatus: null,
        fields: [
          {label: 'ID', key: 'id'},
          {label: 'Nombre', key: 'name'},
          {label: 'RFC', key: 'fiscalID'},
          {label: 'Tipo de empresa', key: 'companyType'},
          {label: 'Tipo de industria', key: 'industryType'},
          {label: 'Estatus', key: 'status'}
        ],
        locationTypeOptions: [
          {value: null, text: 'Tipo de ubicación...'},
          {value: 'Matriz', text: 'Matriz'},
          {value: 'Sede', text: 'Sede'},
          {value: 'Sucursal', text: 'Sucursal'},
          {value: 'Torre', text: 'Torre'},
          {value: 'Edificio', text: 'Edificio'},
          {value: 'Piso', text: 'Piso'},
          {value: 'Unidad', text: 'Unidad'},
          {value: 'Anexo', text: 'Anexo'},
          {value: 'Otro', text: 'Otro'}
        ],
        addressTypeOptions: [
          {value: null, text: 'Tipo de dirección...'},
          {value: 'Domicilio', text: 'Domicilio'},
          {value: 'Domicilio Fiscal', text: 'Domicilio Fiscal'},
          {value: 'Otro', text: 'Otro'}
        ],
        phoneTypeOptions: [
          {value: null, text: 'Tipo de Teléfono...'},
          {value: 'Celular', text: 'Celular'},
          {value: 'Casa', text: 'Casa'},
          {value: 'Trabajo', text: 'Trabajo'},
          {value: 'Otro', text: 'Otro'}
        ],
        roadTypeOptions: [
          {value: null, text: 'Tipo de vialidad...'},
          {value: 'Carretera', text: 'Carretera'},
          {value: 'Boulevard', text: 'Boulevard'},
          {value: 'Avenida', text: 'Avenida'},
          {value: 'Calle', text: 'Calle'},
          {value: 'Callejón', text: 'Callejón'},
          {value: 'Andador', text: 'Andador'},
          {value: 'Retorno', text: 'Retorno'},
          {value: 'Privada', text: 'Privada'},
          {value: 'Otro', text: 'Otro'}
        ],
        industryTypeOptions: [
          {value: null, text: 'Tipo de industria...'},
          {value: 'Tecnologías de Información', text: 'Tecnologías de Información'},
          {value: 'Telecomunicaciones', text: 'Telecomunicaciones'},
          {value: 'Fabricación/Transformación', text: 'Fabricación/Transformación'},
          {value: 'Extracción', text: 'Extracción'},
          {value: 'Consultoría', text: 'Consultoría'},
          {value: 'Servicios Financieros', text: 'Servicios Financieros'},
          {value: 'Gobierno', text: 'Gobierno'},
          {value: 'Paquetería', text: 'Paquetería'},
          {value: 'Transportes', text: 'Transportes'},
          {value: 'Entretenimiento', text: 'Entretenimiento'},
          {value: 'Servicios', text: 'Servicios'},
          {value: 'Otro', text: 'Otro'}
        ],
        stateOptions: [
          {value: null, text: 'Estado...'},
          {value: 'Aguascalientes', text: 'Aguascalientes'},
          {value: 'Baja California', text: 'Baja California'},
          {value: 'Baja California Sur', text: 'Baja California Sur'},
          {value: 'Campeche', text: 'Campeche'},
          {value: 'Chiapas', text: 'Chiapas'},
          {value: 'Chihuahua', text: 'Chihuahua'},
          {value: 'Ciudad de México', text: 'Ciudad de México'},
          {value: 'Coahuila', text: 'Coahuila'},
          {value: 'Colima', text: 'Colima'},
          {value: 'Durango', text: 'Durango'},
          {value: 'Guanajuato', text: 'Guanajuato'},
          {value: 'Guerrero', text: 'Guerrero'},
          {value: 'Hidalgo', text: 'Hidalgo'},
          {value: 'Jalisco', text: 'Jalisco'},
          {value: 'México', text: 'México'},
          {value: 'Michoacán', text: 'Michoacán'},
          {value: 'Morelos', text: 'Morelos'},
          {value: 'Nayarit', text: 'Nayarit'},
          {value: 'Nuevo León', text: 'Nuevo León'},
          {value: 'Oaxaca', text: 'Oaxaca'},
          {value: 'Puebla', text: 'Puebla'},
          {value: 'Querétaro', text: 'Querétaro'},
          {value: 'Quintana Roo', text: 'Quintana Roo'},
          {value: 'San Luis Potosí', text: 'San Luis Potosí'},
          {value: 'Sinaloa', text: 'Sinaloa'},
          {value: 'Sonora', text: 'Sonora'},
          {value: 'Tabasco', text: 'Tabasco'},
          {value: 'Tamaulipas', text: 'Tamaulipas'},
          {value: 'Tlaxcala', text: 'Tlaxcala'},
          {value: 'Veracruz', text: 'Veracruz'},
          {value: 'Yucatán', text: 'Yucatán'},
          {value: 'Zacatecas', text: 'Zacatecas'}
        ],
        statusOptions: [
          {value: null, text: 'Estatus...'},
          {value: 2, text: 'Activo'},
          {value: 3, text: 'Inactivo'}
        ],
        options: [],
        optionsDep: []
      }
    },
    components: {
      CodeLoader,
      Treeselect
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/pages/login')
      }
    },
    async mounted() {
      const dprtmnts = await gets.getDepartmentsByCompany(this.$session.get('companyID'));
      this.optionsDep = dprtmnts.data.departments;

      const lctns = await gets.getLocationsByCompany(this.$session.get('companyID'));
      let tmp2 = [
        {value: null, text: 'Ubicaciones...'}
      ];
      lctns.data.locations.map(function(value, key) {
        let dt = {value: value.id, text: value.name};
        tmp2.push(dt);
      });
      this.options = tmp2;


    },
    validations: {
      name: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(128)
      },
      locationID: {

      },
      locationType: {
        required
      },
      addressType: {

      },
      roadType: {
      },
      roadName: {
        minLength: minLength(3)
      },
      outdoorNumber: {
      },
      indoorNumber: {

      },
      colony: {
        minLength: minLength(3)
      },
      location: {
        minLength: minLength(3)
      },
      municipality: {
        minLength: minLength(3)
      },
      cp: {
        minLength: minLength(5),
        maxLength: maxLength(5)
      },
      state: {
      },
      phoneType: {
      },
      phoneNumber: {
        minLength: minLength(4)
      },
      phoneType2: {

      },
      phoneNumber2: {
        minLength: minLength(4)
      },
      status: {
        required
      }
    },
    computed: {
    },
    methods: {
      goBack() {
        this.$router.go(-1);
        this.$router.push('/users');
      },
      async submit() {
        console.log('submit!');
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR';
          console.info(this.$v)
        } else {
          this.submitStatus = 'PENDING';

          const addrss = {
            "addressType": this.addressType,
            "roadType": this.roadType,
            "roadName": this.roadName,
            "outdoorNumber": this.outdoorNumber,
            "indoorNumber": this.indoorNumber,
            "colony": this.colony,
            "location": this.location,
            "municipality": this.municipality,
            "cp": this.cp,
            "state": this.state,
            "phoneType": this.phoneType,
            "phoneNumber": this.phoneNumber,
            "phoneType2": this.phoneType2,
            "phoneNumber2": this.phoneNumber2,
            "statusID": this.status,
            "userId": this.$session.get('userId')
          };

          await createCatallog.createAddress(addrss).then( response =>{
            console.info(response);
            if (response.data.error.errorCode === 0){
              this.addressID = response.data.id;
              const lctn = {
                "companyID": this.$session.get('companyID'),
                "locationType": this.locationType,
                "locationID": this.locationID,
                "addressID": this.addressID,
                "name": this.name,
                "statusID": this.status,
                "userId": this.$session.get('userId')
              };
               createCatallog.createLocation(lctn).then(response => {
                console.info(response);
                if (response.data.error.errorCode === 0){
                  this.$toaster.success(response.data.error.message);
                  this.submitStatus = 'OK';
                }else{
                  this.$toaster.error(response.data.error.message);
                  this.submitStatus = 'ERROR';
                }
              });
            }else{
              this.$toaster.error(response.data.error.message);
              this.submitStatus = 'ERROR';
            }
          });
        }
      }
    }
  }
</script>
