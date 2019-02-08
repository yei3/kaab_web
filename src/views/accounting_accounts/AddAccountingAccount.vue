<template>
  <div class="animated fade-in">
    <b-row>
      <b-col lg="6">
        <b-card>         
          <div slot="header">
            <strong>Cuenta Contable </strong><small>Agregar</small>
          </div>
          <form @submit.prevent="submit">
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-industry"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-select id="companyID"
                  v-model.trim="$v.companyID.$model"
                  class="form-control" :class="{ 'form-group--error': $v.companyID.$error }"
                  :options="companyIDOptions">
                </b-form-select>
              </b-input-group>
              <div class="small text-danger" v-if="!$v.companyID.required">Campo requerido</div>
            </b-form-group>
            <b-form-group>
              <label class="small muted" for="key">Clave</label>
              <b-input-group>
                <b-form-input class="form-control" :class="{ 'form-group--error': $v.key.$error }" type="text" id="key" v-model="$v.key.$model" placeholder="Introduce la clave"></b-form-input>
              </b-input-group>
              <div class="small text-danger" v-if="!$v.key.required">Campo requerido</div>
              <div class="small text-danger" v-if="!$v.key.minLength">El campo debe contener 4 letras mínimo</div>
              <div class="small text-danger" v-if="!$v.key.maxLength">El campo debe contener 16 letras máximo</div>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-usd"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input class="form-control" :class="{ 'form-group--error': $v.name.$error }" type="text" id="name" v-model="$v.name.$model" placeholder="Introduce el nombre"></b-form-input>
              </b-input-group>
              <div class="small text-danger" v-if="!$v.name.required">Campo requerido</div>
              <div class="small text-danger" v-if="!$v.name.minLength">El campo debe contener 4 letras mínimo</div>
              <div class="small text-danger" v-if="!$v.name.maxLength">El campo debe contener 32 letras máximo</div>
            </b-form-group>
            <b-form-group>
              <label class="small muted" for="description">Descripción</label>
              <b-input-group>
                <b-form-input class="form-control" :class="{ 'form-group--error': $v.description.$error }" type="text" id="description" v-model="$v.description.$model" placeholder="Introduce la descripción"></b-form-input>
              </b-input-group>
              <div class="small text-danger" v-if="!$v.description.required">Campo requerido</div>
              <div class="small text-danger" v-if="!$v.description.minLength">El campo debe contener 4 letras mínimo</div>
              <div class="small text-danger" v-if="!$v.description.maxLength">El campo debe contener 128 letras máximo</div>
            </b-form-group>
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
              <p class="small text-success" v-if="submitStatus === 'OK'">Registro actualizado satisfactoriamente</p>
              <p class="small text-danger" v-if="submitStatus === 'ERROR'">Por favor revisa que los datos sean correctos</p>
              <p class="small text-dark" v-if="submitStatus === 'PENDING'">Guardando...</p>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import getAll from '../../services/GetAllCatalog'
  import createCatalog from '../../services/CreateCatalogService'
  import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'AddAccountingAccount',
  data: () => {
    return {
      key: '',
      name: '',
      description: '',
      companyID: null,
      status: null,
      submitStatus: null,
      statusOptions: [
        {value: null, text: 'Estatus...', disabled: true},
        {value: 2, text: 'Activo'},
        {value: 3, text: 'Inactivo'}
      ],
      companyIDOptions: []
    }
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/pages/login')
    }
  },
  async mounted() {
    const cmpns = await getAll.getAllCompanies();
    let tmp = [
      {value: null, text: 'Empresa...'}
    ];
    cmpns.data.companies.map(function(value, key) {
      let dt = {value: value.id, text: value.name};
      tmp.push(dt);
    });
    this.companyIDOptions = tmp;
  },
  validations: {
    companyID: {
      required
    },
    key: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(16)
    },
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(32)
    },
    description: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(128)
    },
    status: {
      required
    }
  },
  computed: {
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async submit() {
      console.log('submit!');
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
        console.info(this.$v)
      } else {
        this.submitStatus = 'PENDING';
        const accacc = {
        "companyID": this.companyID,
        "key": this.key,
        "name": this.name,
        "description": this.description,
        "statusID": this.status,
        "userId": this.$session.get('userId')
      };
        await createCatalog.createAccountingAccount(accacc).then(response => {
          console.info(response);
          if (response.data.error.errorCode === 0){
            this.$toaster.success(response.data.error.message);
            this.submitStatus = 'OK';
            this.$router.push('/accountingaccounts');
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