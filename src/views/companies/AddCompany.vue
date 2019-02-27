<template>

  <div class="animated fade-in">

    <b-row>
      <b-col lg="6">
        <b-card>
          <div slot="header">
            <strong>{{caption}}</strong><small> ID: {{$route.params.id }}</small>
          </div>
          <form @submit.prevent="submit">
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="companyType"
                                   v-model.trim="$v.companyType.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.companyType.$error }"
                                   :options="companyTypeOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.companyType.required">Campo requerido</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-id-card"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="industryType"
                                   v-model.trim="$v.industryType.$model"
                                   class="form-control" :class="{ 'form-group--error': $v.industryType.$error }"
                                   :options="industryTypeOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.industryType.required">Campo requerido</div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-at"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.name.$error }" type="text" id="name" v-model="$v.name.$model" placeholder="Nombre"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.name.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.name.minLength">El usuario debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.fiscalID.$error }" type="text" id="fiscalID" v-model="$v.fiscalID.$model" placeholder="RFC"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.fiscalID.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.fiscalID.minLength">El nombre debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
            </b-row>
<!--address-->
            <label>Dirección</label>
            <b-row>
              <b-col lg="6">
                <b-form-group>
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
                  <div class="small text-danger" v-if="!$v.addressType.required">Campo requerido</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
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
                  <div class="small text-danger" v-if="!$v.roadType.required">Campo requerido</div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="4">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.roadName.$error }" type="text" id="roadName" v-model="$v.roadName.$model" placeholder="Calle"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.roadName.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.roadName.minLength">El nombre debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.outdoorNumber.$error }" type="text" id="outdoorNumber" v-model="$v.outdoorNumber.$model" placeholder="Número exterior"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.outdoorNumber.required">Campo requerido</div>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group>
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
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.colony.$error }" type="text" id="colony" v-model="$v.colony.$model" placeholder="Colonia"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.colony.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.colony.minLength">El nombre debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.location.$error }" type="text" id="location" v-model="$v.location.$model" placeholder="Localidad"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.location.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.location.minLength">El nombre debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
               <b-col lg="4">
                 <b-form-group>
                   <b-input-group>
                     <b-input-group-prepend>
                       <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                     </b-input-group-prepend>
                     <b-form-input class="form-control" :class="{ 'form-group--error': $v.municipality.$error }" type="text" id="municipality" v-model="$v.municipality.$model" placeholder="Municipio"></b-form-input>
                   </b-input-group>
                   <div class="small text-danger" v-if="!$v.municipality.required">Campo requerido</div>
                   <div class="small text-danger" v-if="!$v.municipality.minLength">El nombre debe contener 3 letras mínimo</div>
                 </b-form-group>
               </b-col>
               <b-col lg="4">
                 <b-form-group>
                   <b-input-group>
                     <b-input-group-prepend>
                       <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                     </b-input-group-prepend>
                     <b-form-input class="form-control" :class="{ 'form-group--error': $v.cp.$error }" type="text" id="cp" v-model="$v.cp.$model" placeholder="Código postal"></b-form-input>
                   </b-input-group>
                   <div class="small text-danger" v-if="!$v.cp.required">Campo requerido</div>
                   <div class="small text-danger" v-if="!$v.cp.minLength">El nombre debe contener 3 letras mínimo</div>
                 </b-form-group>
               </b-col>
               <b-col lg="4">
                 <b-form-group>
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
                   <div class="small text-danger" v-if="!$v.state.required">Campo requerido</div>
                 </b-form-group>
               </b-col>
             </b-row>
             <b-row>
               <b-col lg="6">
                 <b-form-group>
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
                   <div class="small text-danger" v-if="!$v.phoneType.required">Campo requerido</div>
                 </b-form-group>
               </b-col>
               <b-col lg="6">
                 <b-form-group>
                   <b-input-group>
                     <b-input-group-prepend>
                       <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                     </b-input-group-prepend>
                     <b-form-input class="form-control" :class="{ 'form-group--error': $v.phoneNumber.$error }" type="text" id="phoneNumber" v-model="$v.phoneNumber.$model" placeholder="Número de teléfono"></b-form-input>
                   </b-input-group>
                   <div class="small text-danger" v-if="!$v.phoneNumber.required">Campo requerido</div>
                   <div class="small text-danger" v-if="!$v.phoneNumber.minLength">El nombre debe contener 3 letras mínimo</div>
                 </b-form-group>
               </b-col>
             </b-row>
             <b-row>
               <b-col lg="6">
                 <b-form-group>
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
<!--address-->
            <b-row>
              <b-col lg="6">
                <b-form-group>
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
  import createCatalog from '../../services/CreateCatalogService'
  import { required, minLength } from 'vuelidate/lib/validators'
  export default {
    name: 'Company',
    props: {
      caption: {
        type: String,
        default: 'Modificar empresa'
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
        companyType: null,
        industryType: null,
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
        companyTypeOptions: [
          {value: null, text: 'Tipo de empresa...'},
          {value: 'Cliente', text: 'Cliente'},
          {value: 'Proveedor', text: 'Proveedor'},
          {value: 'Competencia', text: 'Competencia'},
          {value: 'Partner/Socio', text: 'Partner/Socio'},
          {value: 'Otro', text: 'Otro'}
        ],
        addressTypeOptions: [
          {value: null, text: 'Tipo de dirección...'},
          {value: 'Domicilio', text: 'Domicilio'},
          {value: 'Domicilio Fiscal', text: 'Domicilio Fiscal'},
          {value: 'Otro', text: 'Otro'}
        ],
        phoneTypeOptions: [
          {value: null, text: 'Tipo de dirección...'},
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
        ]
      }
    },
    components: {

    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/pages/login')
      }
    },
    validations: {
      name: {
        required,
        minLength: minLength(4)
      },
      fiscalID: {
        required,
        minLength: minLength(4)
      },
      companyType: {
        required
      },
      industryType: {
        required
      },
      addressType: {
        required
      },
      roadType: {
        required
      },
      roadName: {
        required,
        minLength: minLength(4)
      },
      outdoorNumber: {
        required
      },
      indoorNumber: {

      },
      colony: {
        required,
        minLength: minLength(4)
      },
      location: {
        required,
        minLength: minLength(4)
      },
      municipality: {
        required,
        minLength: minLength(4)
      },
      cp: {
        required,
        minLength: minLength(4)
      },
      state: {
        required
      },
      phoneType: {
        required
      },
      phoneNumber: {
        required,
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
          await createCatalog.createAddress(addrss).then(response => {
            console.info(response);
            if (response.data.error.errorCode === 0){
              const cmpn = {
                "companyAccountID": this.$session.get('companyAccountId'),
                "companyType": this.companyType,
                "industryType": this.industryType,
                "name": this.name,
                "fiscalID": this.fiscalID,
                "addressID": response.data.id,
                "statusID": this.status,
                "userId": this.$session.get('userId')
              };
              createCatalog.createCompany(cmpn).then(response => {
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
