<template>

  <div class="animated fade-in">

    <b-row>
      <b-col lg="6">
        <code-loader v-if="!status"
                     :speed="2"
                     :animate="true"
        ></code-loader>
        <b-card v-else>
          <div slot="header">
            <strong>{{caption}}</strong><small> ID: {{$route.params.id }}</small>
          </div>
          <form @submit.prevent="submit">
            <b-row>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Tipo de empresa</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-industry"></i></b-input-group-text>
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
                  <label class="small muted">Tipo de industria</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-industry"></i></b-input-group-text>
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
                  <label class="small muted">Nombre</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-industry"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.name.$error }" type="text" id="name" v-model="$v.name.$model" placeholder="Nombre"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.name.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.name.minLength">El usuario debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">RFC</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-industry"></i></b-input-group-text>
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
                  <label class="small muted">Tipo de dirección</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-pencil-square"></i></b-input-group-text>
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
                  <label class="small muted">Tipo de vialidad</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-pencil-square"></i></b-input-group-text>
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
                  <label class="small muted">Calle</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-pencil-square"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.roadName.$error }" type="text" id="roadName" v-model="$v.roadName.$model" placeholder="Calle"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.roadName.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.roadName.minLength">El nombre debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group>
                  <label class="small muted">Número exterior</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-pencil-square"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.outdoorNumber.$error }" type="text" id="outdoorNumber" v-model="$v.outdoorNumber.$model" placeholder="Número exterior"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.outdoorNumber.required">Campo requerido</div>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group>
                  <label class="small muted">Número interior</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-pencil-square"></i></b-input-group-text>
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
                      <b-input-group-text><i class="fa fa-pencil-square"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input class="form-control" :class="{ 'form-group--error': $v.colony.$error }" type="text" id="colony" v-model="$v.colony.$model" placeholder="Colonia"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!$v.colony.required">Campo requerido</div>
                  <div class="small text-danger" v-if="!$v.colony.minLength">El nombre debe contener 3 letras mínimo</div>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group>
                  <label class="small muted">Ubicación</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-pencil-square"></i></b-input-group-text>
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
                   <label class="small muted">Municipio</label>
                   <b-input-group>
                     <b-input-group-prepend>
                       <b-input-group-text><i class="fa fa-pencil-square"></i></b-input-group-text>
                     </b-input-group-prepend>
                     <b-form-input class="form-control" :class="{ 'form-group--error': $v.municipality.$error }" type="text" id="municipality" v-model="$v.municipality.$model" placeholder="Municipio"></b-form-input>
                   </b-input-group>
                   <div class="small text-danger" v-if="!$v.municipality.required">Campo requerido</div>
                   <div class="small text-danger" v-if="!$v.municipality.minLength">El nombre debe contener 3 letras mínimo</div>
                 </b-form-group>
               </b-col>
               <b-col lg="4">
                 <b-form-group>
                   <label class="small muted">Código postal</label>
                   <b-input-group>
                     <b-input-group-prepend>
                       <b-input-group-text><i class="fa fa-pencil-square"></i></b-input-group-text>
                     </b-input-group-prepend>
                     <b-form-input class="form-control" :class="{ 'form-group--error': $v.cp.$error }" type="text" id="cp" v-model="$v.cp.$model" placeholder="Código postal"></b-form-input>
                   </b-input-group>
                   <div class="small text-danger" v-if="!$v.cp.required">Campo requerido</div>
                   <div class="small text-danger" v-if="!$v.cp.minLength">El codigo  debe contener 5 dígitos</div>
                   <div class="small text-danger" v-if="!$v.cp.maxLength">El codigo  debe contener 5 dígitos</div>
                 </b-form-group>
               </b-col>
               <b-col lg="4">
                 <b-form-group>
                   <label class="small muted">Estado</label>
                   <b-input-group>
                     <b-input-group-prepend>
                       <b-input-group-text><i class="fa fa-pencil-square"></i></b-input-group-text>
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
                   <label class="small muted">Tipo de teléfono</label>
                   <b-input-group>
                     <b-input-group-prepend>
                       <b-input-group-text><i class="fa fa-pencil-square"></i></b-input-group-text>
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
                   <label class="small muted">Número de teléfono</label>
                   <b-input-group>
                     <b-input-group-prepend>
                       <b-input-group-text><i class="fa fa-pencil-square"></i></b-input-group-text>
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
                   <label class="small muted">Tipo de teléfono 2</label>
                   <b-input-group>
                     <b-input-group-prepend>
                       <b-input-group-text><i class="fa fa-pencil-square"></i></b-input-group-text>
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
                       <b-input-group-text><i class="fa fa-pencil-square"></i></b-input-group-text>
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
              <p class="small text-success" v-if="submitStatus === 'OK'">Empresa actualizada satisfactoriamente.</p>
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
  import updateCatalog from '../../services/UpdateCatalogService'
  import { required, minLength, maxLength } from 'vuelidate/lib/validators'
  import { CodeLoader } from 'vue-content-loader';
  import Vue from 'vue';
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
        ]
      }
    },
    components: {
      CodeLoader
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/pages/login')
      }
    },
    async mounted() {
      const cmpn = await getById.getCompanyById(this.$route.params.id);
      this.name = cmpn.data.company.name;
      this.fiscalID = cmpn.data.company.fiscalID;
      this.companyType = cmpn.data.company.companyType;
      this.industryType = cmpn.data.company.industryType;
      this.addressID = cmpn.data.company.addressID;
      //address
      const addrss = await getById.getAddressById(this.addressID);
      this.addressType = addrss.data.address.addressType;
      this.roadType = addrss.data.address.roadType;
      this.roadName = addrss.data.address.roadName;
      this.outdoorNumber = addrss.data.address.outdoorNumber;
      this.indoorNumber = addrss.data.address.indoorNumber;
      this.colony = addrss.data.address.colony;
      this.location = addrss.data.address.location;
      this.municipality = addrss.data.address.municipality;
      this.cp = addrss.data.address.cp;
      this.state = addrss.data.address.state;
      this.phoneType = addrss.data.address.phoneType;
      this.phoneNumber = addrss.data.address.phoneNumber;
      this.phoneType2 = addrss.data.address.phoneType2;
      this.phoneNumber2 = addrss.data.address.phoneNumber2;
      //address
      this.status = cmpn.data.company.statusID;

    },
    validations: {
      name: {
        required,
        minLength: minLength(3)
      },
      fiscalID: {
        required,
        minLength: minLength(3)
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
        minLength: minLength(3)
      },
      outdoorNumber: {
        required
      },
      indoorNumber: {

      },
      colony: {
        required,
        minLength: minLength(3)
      },
      location: {
        required,
        minLength: minLength(3)
      },
      municipality: {
        required,
        minLength: minLength(3)
      },
      cp: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(5)
      },
      state: {
        required
      },
      phoneType: {
        required
      },
      phoneNumber: {
        required,
        minLength: minLength(3)
      },
      phoneType2: {

      },
      phoneNumber2: {
        minLength: minLength(3)
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
          const cmpn = {
            "id": parseInt(this.$route.params.id),
            "companyAccountID": this.$session.get('companyAccountId'),
            "companyType": this.companyType,
            "industryType": this.industryType,
            "name": this.name,
            "fiscalID": this.fiscalID,
            "addressID": this.addressID,
            "statusID": this.status,
            "userId": this.$session.get('userId')
          };
          const addrss = {
            "id": this.addressID,
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
          await updateCatalog.updateAddress(addrss).then(response => {
            console.info(response);
            if (response.data.error.errorCode === 0){
              this.$toaster.success(response.data.error.message);
              this.submitStatus = 'OK';
            }else{
              this.$toaster.error(response.data.error.message);
              this.submitStatus = 'ERROR';
            }
          });
          await updateCatalog.updateCompany(cmpn).then(response => {
            console.info(response);
            if (response.data.error.errorCode === 0){
              this.$toaster.success(response.data.error.message);
              this.submitStatus = 'OK';
              this.$session.set('refresh', true);
              this.$router.push('/companies');
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
