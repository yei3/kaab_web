<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3">
        <b-card class="bg-dark text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>100%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/assets" class="text-white">{{initCount}}</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Activos de base inicial ({{new Date().getFullYear()}})</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-secondary text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>{{finalCountPercent}}%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/reports/registered" class="text-white">{{finalCount}}</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Activos inventariados</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-success text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>{{finalCountConcealedPercent}}%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/reports/reconciled" class="text-white">{{finalCountConcealed}}</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Activos conciliados</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-danger text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>{{finalMissingPercent}}%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/reports/nonregistered" class="text-white">{{finalMissing}}</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Activos no inventariados</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-info text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>{{finalCountDepChangePercent}}%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/reports/deparmentChanges" class="text-white">{{finalCountDepChange}}</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Cambios de departamento</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-info text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>{{finalCountLocChangePercent}}%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/reports/locationchanges" class="text-white">{{finalCountLocChange}}</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Cambios de ubicación</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-warning text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>{{finalCountExcesPercent}}%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/reports/excess" class="text-white">{{finalCountExces}}</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Activos en demasía</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-warning text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>{{finalCountDupLabelPercent}}%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/reports/doubledlabel" class="text-white">{{finalCountDupLabel}}</a></div>
            <small class="text-muted text-uppercase font-weight-bold">Activos con etiqueta duplicada</small>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card class="bg-warning text-white" style="min-height:7rem">
            <div class="h4 text-muted text-right mb-4">
              <h4 class="float-right" right>{{finalCountNoDataPercent}}%</h4>
            </div>
            <div class="h2 mb-0"><a href="#/reports/wronglabel" class="text-white">{{finalCountNoData}}</a></div>
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

        </b-col>
      </b-row>
      <main-chart-example chartId="main-chart-01" class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></main-chart-example>
      <div slot="footer">
        <b-row class="text-center">
          <b-col class="mb-sm-2 mb-2" sm="6" lg="3">
            <div class="text-muted">Inventariados</div>
            <strong>{{finalCount}} (100%)</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="secondary" :value="100"></b-progress>
          </b-col>
          <b-col class="mb-sm-2 mb-2" sm="6" lg="3">
            <div class="text-muted">Conciliados</div>
            <strong>{{finalCountConcealed}} ({{finalCountConcealedPercent}}%)</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="success" :value="finalCountConcealedPercent"></b-progress>
          </b-col>
          <b-col class="mb-sm-2 mb-2" sm="6" lg="3">
            <div class="text-muted">Cambios (Depto, Ubic)</div>
            <strong>{{finalCountLocChange + finalCountDepChange}} ({{cambios}}%)</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="info" :value="cambios"></b-progress>
          </b-col>
          <b-col class="mb-sm-2 mb-2" sm="6" lg="3">
            <div class="text-muted">En demasía y otros</div>
            <strong>{{finalCountExces + finalCountDupLabel + finalCountNoData}} ({{demasiaOthers}}%)</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="warning" :value="demasiaOthers"></b-progress>
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
                    <strong class="h4">{{regDepartments}}</strong>
                  </Callout>
                </b-col>
                <b-col sm="6">
                  <Callout variant="danger">
                    <small class="text-muted">Departamentos pendientes</small><br>
                    <strong class="h4">{{pendDepartments > regDepartments ? 0 : pendDepartments}}</strong>
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
                  <b-progress class="progress-xs" variant="secondary" :value="100" height={} />
                  <b-progress class="progress-xs" variant="danger" :value="(100 * regDepartments) / pendDepartments" height={} />
                </div>
              </div>
            </b-col>
            <b-col sm="12" lg="4">
              <b-row>
                <b-col sm="6">
                  <Callout variant="secondary">
                    <small class="text-muted">Ubicaciones registradas</small><br>
                    <strong class="h4">{{regLocations}}</strong>
                  </Callout>
                </b-col>
                <b-col sm="6">
                  <Callout variant="danger">
                    <small class="text-muted">Ubicaciones pendientes</small><br>
                    <strong class="h4">{{pendLocations > regLocations ? 0 :pendLocations}}</strong>
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
                  <b-progress class="progress-xs" variant="secondary" :value="100" height={} />
                  <b-progress class="progress-xs" variant="danger" :value="(100 * regLocations) / pendLocations" height={} />
                </div>
              </div>
            </b-col>
            <b-col sm="12" lg="4">
              <b-row>
                <b-col sm="6">
                  <Callout variant="secondary">
                    <small class="text-muted">Usuarios del sistema</small><br>
                    <strong class="h4">{{countUsers}}</strong>
                  </Callout>
                </b-col>
                <b-col sm="6">
                  <Callout variant="success">
                    <small class="text-muted">Usuarios con registro de activos</small><br>
                    <strong class="h4">{{countUsersWithSessions}}</strong>
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
                  <b-progress class="progress-xs" variant="success" :value="(100 / countUsers) * countUsersWithSessions" height={} />
                </div>
              </div>
            </b-col>
          </b-row>
          <br/>
          <b-table class="mb-0 table-outline" responsive="lg" hover :items="tableItems" :fields="tableFields" head-variant="light">
            <div slot="user" slot-scope="item">
              <div>{{item.value.name}}</div>
              <div class="small text-muted">
                {{item.value.role}}
              </div>
            </div>
            <div slot="usage" slot-scope="item">
              <div class="clearfix">
                <div class="float-left">
                  <strong>{{(item.value.value).toFixed(2)}}%</strong>
                </div>
                <div class="float-right">
                  <small class="text-muted">{{item.value.assetsRegistered}}</small>
                </div>
              </div>
              <b-progress height={} class="progress-xs" v-model="item.value.value" variant="secondary"></b-progress>
            </div>
            <div slot="activity" slot-scope="item">
              <div class="small text-muted">Última actividad</div>
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
import gets from '../services/Gets'

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
      initCount: 0,
      finalCount: 0,
      finalMissing: 0,
      finalCountConcealed: 0,
      finalCountDepChange: 0,
      finalCountLocChange: 0,
      finalCountDupLabel: 0,
      finalCountNoData: 0,
      finalCountExces: 0,
      regDepartments:0,
      regLocations:0,
      pendDepartments:0,
      pendLocations:0,
      countUsers:0,
      countUsersWithSessions:0,
      tableItems: [],
      tableFields: {
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
  async mounted() {
    const dash1 = await gets.getDashboardData(this.$session.get('projectID'),this.$session.get('companyAccountId'));
    console.info(dash1)
    this.initCount = dash1.data.dashboard.initCount;
    this.finalCount = dash1.data.dashboard.finalCount;
    this.finalMissing = dash1.data.dashboard.finalMissing;
    this.finalCountConcealed = dash1.data.dashboard.finalCountConcealed;
    this.finalCountDepChange = dash1.data.dashboard.finalCountDepChange;
    this.finalCountLocChange = dash1.data.dashboard.finalCountLocChange;
    this.finalCountDupLabel = dash1.data.dashboard.finalCountDupLabel;
    this.finalCountNoData = dash1.data.dashboard.finalCountNoData;
    this.finalCountExces = dash1.data.dashboard.finalCountExces;
    this.regDepartments = dash1.data.dashboard.regDepartments;
    this.pendDepartments = dash1.data.dashboard.pendDepartments;
    this.regLocations = dash1.data.dashboard.regLocations;
    this.pendLocations = dash1.data.dashboard.pendDLocations;
    this.countUsers = dash1.data.dashboard.countUsers;
    this.countUsersWithSessions = dash1.data.dashboard.countUsersWithSessions;
    var assetsByUser = 0;
    for (var i = 0; i < dash1.data.dashboard.usersTable.length; i++){
      assetsByUser += dash1.data.dashboard.usersTable[i].items;
    }
    for ( i = 0; i < dash1.data.dashboard.usersTable.length; i++){
    this.tableItems.push(
      {
        user: { name: dash1.data.dashboard.usersTable[i].name, role: dash1.data.dashboard.usersTable[i].role },
        usage: { value: (100 / assetsByUser) * dash1.data.dashboard.usersTable[i].items, assetsRegistered: dash1.data.dashboard.usersTable[i].items },
        activity: dash1.data.dashboard.usersTable[i].lastActivity
      }
    )
      console.info(this.tableItems)
    }
  },
  computed:{
    finalCountPercent : function() {
      return parseFloat((100/this.initCount) * this.finalCount).toFixed(2);
    },
    finalMissingPercent : function() {
      return parseFloat((100/this.initCount) * this.finalMissing).toFixed(2);
    },
    finalCountConcealedPercent : function() {
      return parseFloat((100/this.finalCount) * this.finalCountConcealed).toFixed(2);
    },
    finalCountDepChangePercent : function() {
      return parseFloat((100/this.finalCount) * this.finalCountDepChange).toFixed(2);
    },
    finalCountLocChangePercent : function() {
      return parseFloat((100/this.finalCount) * this.finalCountLocChange).toFixed(2);
    },
    finalCountDupLabelPercent : function() {
      return parseFloat((100/this.finalCount) * this.finalCountDupLabel).toFixed(2);
    },
    finalCountNoDataPercent : function() {
      return parseFloat((100/this.finalCount) * this.finalCountNoData).toFixed(2);
    },
    finalCountExcesPercent : function() {
      return parseFloat((100/this.finalCount) * this.finalCountExces).toFixed(2);
    },demasiaOthers: function(){
      return (parseFloat((100/this.finalCount) * this.finalCountExces) + parseFloat((100/this.finalCount) * this.finalCountDupLabel) + parseFloat((100/this.finalCount) * this.finalCountNoData)).toFixed(2);
    },
    cambios: function(){
      return (parseFloat((100/this.finalCount) * this.finalCountLocChange) + parseFloat((100/this.finalCount) * this.finalCountDepChange)).toFixed(2);
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
