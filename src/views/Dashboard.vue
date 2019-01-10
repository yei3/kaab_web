<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3">
        <b-card class="bg-dark text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>100%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/users" class="text-white">9,823</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Activos de base inicial (2018)</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-secondary text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>82.9%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/users" class="text-white">8,687</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Activos inventariados</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-success text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>68.4%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/users" class="text-white">6,723</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Activos conciliados</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-danger text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>12.8%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/users" class="text-white">1,263</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Activos no inventariados</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-info text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>5.6%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/users" class="text-white">502</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Cambios de departamento</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-info text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>10.0%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/users" class="text-white">987</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Cambios de ubicación</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-info text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>3.2%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/users" class="text-white">324</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Cambios de descripción</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-warning text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>1.2%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/users" class="text-white">127</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Activos en demasía</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-warning text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>0.1%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/users" class="text-white">13</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Activos con etiqueta duplicada</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-warning text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>0.1%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/users" class="text-white">11</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Activos con etiqueta sin datos</small>
        </b-card>
      </b-col>
    </b-row>

    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 id="traffic" class="card-title mb-0">Avance del proyecto</h4>
          <div class="small text-muted">HGM-2019</div>
        </b-col>
        <b-col sm="7" class="d-none d-md-block">
          <b-button type="button" variant="primary" class="float-right" size="sm"><i class="fa fa-cloud-download"></i></b-button>
          <b-button-toolbar class="float-right" aria-label="Toolbar with buttons group">
            <b-form-radio-group class="mr-3" id="radiosBtn" buttons button-variant="outline-secondary " v-model="selected" name="radiosBtn" size="sm">
              <b-form-radio class="mx-0" value="Week">Semana</b-form-radio>
              <b-form-radio class="mx-0" value="Month">Mes</b-form-radio>
              <b-form-radio class="mx-0" value="Year">Año</b-form-radio>
            </b-form-radio-group>
          </b-button-toolbar>
        </b-col>
      </b-row>
      <main-chart-example chartId="main-chart-01" class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></main-chart-example>
      <div slot="footer">
        <b-row class="text-center">
          <b-col class="mb-sm-2 mb-2" sm="6" lg="3">
            <div class="text-muted">Inventariados</div>
            <strong>8,687 (100%)</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="secondary" :value="100"></b-progress>
          </b-col>
          <b-col class="mb-sm-2 mb-2" sm="6" lg="3">
            <div class="text-muted">Conciliados</div>
            <strong>6,723 (77.4%)</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="success" :value="84"></b-progress>
          </b-col>
          <b-col class="mb-sm-2 mb-2" sm="6" lg="3">
            <div class="text-muted">Cambios (Depto, Ubic, Desc)</div>
            <strong>1,813 (20.8%)</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="info" :value="12"></b-progress>
          </b-col>
          <b-col class="mb-sm-2 mb-2" sm="6" lg="3">
            <div class="text-muted">En demasía y otros</div>
            <strong>151 (1.7%)</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="warning" :value="12"></b-progress>
          </b-col>
        </b-row>
      </div>
    </b-card>
    
    <b-row>
      <b-col md="12">
        <b-card header="Departamentos, Ubicaciones y Usuarios">
          <b-row>
            <b-col sm="12" lg="4">
              <b-row>
                <b-col sm="6">
                  <Callout variant="secondary">
                    <small class="text-muted">Departamentos registrados</small><br>
                    <strong class="h4">126</strong>
                  </Callout>
                </b-col>
                <b-col sm="6">
                  <Callout variant="danger">
                    <small class="text-muted">Departamentos pendientes</small><br>
                    <strong class="h4">14</strong>
                  </Callout>
                </b-col>
              </b-row>
              <hr class="mt-0">
              <div class="progress-group mb-4">
                <div class="progress-group-prepend">
                  <span class="progress-group-text">
                    Departamentos
                  </span>
                </div>
                <div class="progress-group-bars">
                  <b-progress class="progress-xs" variant="secondary" :value="90" height={} />
                  <b-progress class="progress-xs" variant="danger" :value="10" height={} />
                </div>
              </div>
            </b-col>
            <b-col sm="12" lg="4">
              <b-row>
                <b-col sm="6">
                  <Callout variant="secondary">
                    <small class="text-muted">Ubicaciones registradas</small><br>
                    <strong class="h4">19</strong>
                  </Callout>
                </b-col>
                <b-col sm="6">
                  <Callout variant="danger">
                    <small class="text-muted">Ubicaciones pendientes</small><br>
                    <strong class="h4">4</strong>
                  </Callout>
                </b-col>
              </b-row>
              <hr class="mt-0">
              <div class="progress-group mb-4">
                <div class="progress-group-prepend">
                  <span class="progress-group-text">
                    Ubicaciones
                  </span>
                </div>
                <div class="progress-group-bars">
                  <b-progress class="progress-xs" variant="secondary" :value="80" height={} />
                  <b-progress class="progress-xs" variant="danger" :value="20" height={} />
                </div>
              </div>
            </b-col>
            <b-col sm="12" lg="4">
              <b-row>
                <b-col sm="6">
                  <Callout variant="secondary">
                    <small class="text-muted">Usuarios del sistema</small><br>
                    <strong class="h4">17</strong>
                  </Callout>
                </b-col>
                <b-col sm="6">
                  <Callout variant="success">
                    <small class="text-muted">Usuarios con registro de activos</small><br>
                    <strong class="h4">10</strong>
                  </Callout>
                </b-col>
              </b-row>
              <hr class="mt-0">
              <div class="progress-group mb-4">
                <div class="progress-group-prepend">
                  <span class="progress-group-text">
                    Usuarios
                  </span>
                </div>
                <div class="progress-group-bars">
                  <b-progress class="progress-xs" variant="success" :value="59" height={} />
                </div>
              </div>
            </b-col>
          </b-row>
          <br/>
          <b-table class="mb-0 table-outline" responsive="lg" hover :items="tableItems" :fields="tableFields" head-variant="light">
            <div slot="avatar" class="avatar" slot-scope="item">
              <img :src="item.value.url" class="img-avatar" alt="">
              <span class="avatar-status" v-bind:class="{ 'bg-success': item.value.status == 'success',  'bg-secondary': item.value.status == '' }"></span>
            </div>
            <div slot="user" slot-scope="item">
              <div>{{item.value.name}}</div>
              <div class="small text-muted">
                {{item.value.role}}
              </div>
            </div>
            <div slot="usage" slot-scope="item">
              <div class="clearfix">
                <div class="float-left">
                  <strong>{{item.value.value}}%</strong>
                </div>
                <div class="float-right">
                  <small class="text-muted">{{item.value.assetsRegistered}}</small>
                </div>
              </div>
              <b-progress height={} class="progress-xs" v-model="item.value.value" variant="secondary"></b-progress>
            </div>
            <div slot="activity" slot-scope="item">
              <div class="small text-muted">Último login</div>
              <strong>{{item.value}}</strong>
            </div>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CardLine1ChartExample from './dashboard/CardLine1ChartExample'
import CardLine2ChartExample from './dashboard/CardLine2ChartExample'
import CardLine3ChartExample from './dashboard/CardLine3ChartExample'
import CardBarChartExample from './dashboard/CardBarChartExample'
import MainChartExample from './dashboard/MainChartExample'
import SocialBoxChartExample from './dashboard/SocialBoxChartExample'
import CalloutChartExample from './dashboard/CalloutChartExample'
import { Callout } from '@coreui/vue'

export default {
  name: 'dashboard',
  components: {
    Callout,
    CardLine1ChartExample,
    CardLine2ChartExample,
    CardLine3ChartExample,
    CardBarChartExample,
    MainChartExample,
    SocialBoxChartExample,
    CalloutChartExample
  },
  data: function () {
    return {
      selected: 'Year',
      tableItems: [
        {
          avatar: { url: 'img/avatars/1.jpg', status: 'success' },
          user: { name: 'Fabiola Aragón', role: 'Operativo' },
          usage: { value: 10.7, assetsRegistered: 934 },
          activity: 'Hace 1 minuto'
        },
        {
          avatar: { url: 'img/avatars/2.jpg', status: 'success' },
          user: { name: 'Tania Dorantes', role: 'Operativo' },
          usage: { value: 11.8, assetsRegistered: 1026 },
          activity: 'Hace 5 minutos'
        },
        {
          avatar: { url: 'img/avatars/3.jpg', status: 'success' },
          user: { name: 'Yoselin Herrera', role: 'Coordinador' },
          usage: { value: 15.2, assetsRegistered: 1324 },
          activity: 'Hace 1 hora'
        },
        {
          avatar: { url: 'img/avatars/4.jpg', status: '' },
          user: { name: 'Mónica González', role: 'Operativo' },
          usage: { value: 13.3, assetsRegistered: 1164 },
          activity: 'Hace 2 días'
        },
        {
          avatar: { url: 'img/avatars/5.jpg', status: '' },
          user: { name: 'Lorena Fernandez', role: 'Operativo' },
          usage: { value: 13.8, assetsRegistered: 1201 },
          activity: 'Hace 3 días'
        },
        {
          avatar: { url: 'img/avatars/6.jpg', status: '' },
          user: { name: 'Ana Sánchez', role: 'Operativo' },
          usage: { value: 10.2, assetsRegistered: 887 },
          activity: '08/12/2018'
        },
        {
          avatar: { url: 'img/avatars/7.jpg', status: '' },
          user: { name: 'José Carmona', role: 'Operativo' },
          usage: { value: 9.5, assetsRegistered: 932 },
          activity: '06/12/2018'
        },
        {
          avatar: { url: 'img/avatars/8.jpg', status: '' },
          user: { name: 'Diego Brito', role: 'Operativo' },
          usage: { value: 14, assetsRegistered: 1219 },
          activity: '03/12/2018'
        }

      ],
      tableFields: {
        avatar: {
          label: '<i class="icon-people"></i>',
          class: 'text-center'
        },
        user: {
          label: 'Usuario'
        },
        usage: {
          label: 'Activos registrados'
        },
        activity: {
          label: 'Actividad'
        }
      }
    }
  },
  methods: {
    variant (value) {
      let $variant
      if (value <= 25) {
        $variant = 'info'
      } else if (value > 25 && value <= 50) {
        $variant = 'success'
      } else if (value > 50 && value <= 75) {
        $variant = 'warning'
      } else if (value > 75 && value <= 100) {
        $variant = 'danger'
      }
      return $variant
    }
  }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
</style>
