<template>
  <div class="animated fade-in">
    <b-row>
      <b-col lg="6">
        <b-card>         
          <div slot="header">
            <strong>Centro de Costo </strong><small>Agregar</small>
          </div>
          <form @submit.prevent="submit">
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-cc"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input class="form-control" :class="{ 'form-group--error': $v.name.$error }" type="text" id="name" v-model="$v.name.$model" placeholder="Nombre"></b-form-input>
              </b-input-group>
              <div class="small text-danger" v-if="!$v.name.required">Campo requerido</div>
              <div class="small text-danger" v-if="!$v.name.minLength">El campo debe contener 4 letras mínimo</div>
              <div class="small text-danger" v-if="!$v.name.maxLength">El campo debe contener 32 letras máximo</div>
            </b-form-group>
            <b-form-group>
              <label class="small muted" for="description">Descripción</label>
              <b-input-group>
                <b-form-input class="form-control" :class="{ 'form-group--error': $v.description.$error }" type="text" id="description" v-model="$v.description.$model" placeholder="Descripción"></b-form-input>
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
  name: 'AddCostCenter',
  data: () => {
    return {
      name: '',
      description: '',
      status: null,
      submitStatus: null,
      statusOptions: [
        {value: null, text: 'Estatus...', disabled: true},
        {value: 2, text: 'Activo'},
        {value: 3, text: 'Inactivo'}
      ]
    }
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/pages/login')
    }
  },
  async mounted() {

  },
  validations: {
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
        const cstcntr = {
        "companyID": this.$session.get('companyID'),
        "name": this.name,
        "description": this.description,
        "statusID": this.status,
        "userId": this.$session.get('userId')
      };
        await createCatalog.createCostCenter(cstcntr).then(response => {
          console.info(response);
          if (response.data.error.errorCode === 0){
            this.$toaster.success(response.data.error.message);
            this.submitStatus = 'OK';
            this.$router.push('/costcenters');
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
