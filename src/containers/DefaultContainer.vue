<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="img/logo.png" width="100" height="40" alt="Kaab Logo">
        <img class="navbar-brand-minimized" src="img/logo-symbol.png" width="50" height="50" alt="Kaab Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav>
        <b-nav-text class="px-3">Empresa:</b-nav-text>
        <b-nav-form class="px-0">
          <b-form-select id="role"
                         v-model.trim="companyID"
                         class="form-control"
                         :options="companyIDOptions"
                         @change="changeCompany($event)">
          </b-form-select>
        </b-nav-form>
        <b-nav-form class="px-0">
          <b-nav-text class="px-3">Proyecto:</b-nav-text>
          <b-form-select id="role"
                         v-model.trim="projectID"
                         class="form-control"
                         :options="projectIDOptions"
                         @change="changeProject($event)">
          </b-form-select>
        </b-nav-form>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <a href="http://yei3.com/kaab">Kaab Inventarios</a>
        <span class="ml-1">&copy; 2018</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Hecho con <i class="fa fa-heart"></i> por</span>
        <a href="http://yei3.com">Yei<b>3 </b>Software</a>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import nav from '@/_nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import gets from '../services/Gets'
import getAll from '../services/GetAllCatalog'

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      nav: nav.items,
      companyID:null,
      projectID:null,
      projectIDOptions: [],
      companyIDOptions: []
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
    if (this.$session.has('companyID')){
      this.companyID = this.$session.get('companyID');
    } else{
      this.$session.set('companyID', this.companyIDOptions[1].value);
      this.companyID = this.companyIDOptions[1].value;
    }


    const prycts = await gets.getProjectsByCompany(this.companyID);
    let tmp2 = [
      {value: null, text: 'Proyecto...'}
    ];
    prycts.data.projects.map(function(value, key) {
      let dt = {value: value.id, text: value.name};
      tmp2.push(dt);
    });
    this.projectIDOptions = tmp2;
    if (!this.$session.has('companyID')){
      this.projectID = this.projectIDOptions[1].value;
      this.$session.set('projectID', this.projectID);
    }else{
      this.projectID = this.$session.get('projectID');
    }

  },
  methods:{
    async changeCompany(event){
      this.companyID = event;
      if (event != null)
        this.$session.set('companyID', event);
      const prycts2 = await gets.getProjectsByCompany(this.companyID);
      let tmp2 = [
        {value: null, text: 'Proyecto...'}
      ];
      if (prycts2.data.projects.length !== 0){
        prycts2.data.projects.map(function(value, key) {
          let dt = {value: value.id, text: value.name};
          tmp2.push(dt);
        });
        this.projectIDOptions = tmp2;
        this.projectID = this.projectIDOptions[1].value;
        this.$session.set('projectID', this.projectID);
        this.$router.go();
      } else {
        this.$router.go('/projects');
      }


    },
    changeProject(event){
      this.projectID = event;
      //console.info(event);
      if (event != null){
        //console.info("entra al if")
        this.$session.set('projectID', this.projectID);
        this.$router.go();
      }

    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  }
}
</script>
