import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/Charts')
const Widgets = () => import('@/views/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const Flags = () => import('@/views/icons/Flags')
const FontAwesome = () => import('@/views/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const RecoverPassword = () => import('@/views/pages/RecoverPassword')
const Register = () => import('@/views/pages/Register')

// Users *
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')
const AddUser = () => import('@/views/users/AddUser')

// Companies *
const Companies = () => import('@/views/companies/Companies')
const Company = () => import('@/views/companies/Company')
const AddCompany = () => import('@/views/companies/AddCompany')

// Contacts *
const Contacts = () => import('@/views/contacts/Contacts')
const Contact = () => import('@/views/contacts/Contact')
const AddContact = () => import('@/views/contacts/AddContact')

// Departments *
const Departments = () => import('@/views/departments/Departments')
const Department = () => import('@/views/departments/Department')
const AddDepartment = () => import('@/views/departments/AddDepartment')

// Cost Centers *
const CostCenters = () => import('@/views/cost_centers/CostCenters')
const CostCenter = () => import('@/views/cost_centers/CostCenter')
const AddCostCenter = () => import('@/views/cost_centers/AddCostCenter')

// Accounting Account *
const AccountingAccounts = () => import('@/views/accounting_accounts/AccountingAccounts')
const AccountingAccount = () => import('@/views/accounting_accounts/AccountingAccount')
const AddAccountingAccount = () => import('@/views/accounting_accounts/AddAccountingAccount')

// Projects *
const Projects = () => import('@/views/projects/Projects')
const Project = () => import('@/views/projects/Project')
const AddProject = () => import('@/views/projects/AddProject')

// Locations *
const Locations = () => import('@/views/locations/Locations')
const Location = () => import('@/views/locations/Location')
const AddLocation = () => import('@/views/locations/AddLocation')

// Assets *
const Assets = () => import('@/views/assets/Assets')

// Final Assets *
const FinalAssets = () => import('@/views/finalAssets/FinalAssets')
const FinalAsset = () => import('@/views/finalAssets/FinalAsset')
const FinalAssetGroup = () => import('@/views/finalAssets/FinalAssetGroup')

// Sessions *
const Sessions = () => import('@/views/sessions/Sessions')
const Session = () => import('@/views/sessions/Session')
const SessionAsset = () => import('@/views/sessions/Asset')
const AddSession = () => import('@/views/sessions/AddSession')

//Reports
const GetConcealedFinalAssetsReport = () => import('@/views/reports/GetConcealedFinalAssetsReport')
const GetDepartmentChangedFinalAssetsReport = () => import('@/views/reports/GetDepartmentChangedFinalAssetsReport')
const GetExceededFinalAssetsReport = () => import('@/views/reports/GetExceededFinalAssetsReport')
const GetInventoriedFinalAssetsReport = () => import('@/views/reports/GetInventoriedFinalAssetsReport')
const GetLocationChangedFinalAssetsReport = () => import('@/views/reports/GetLocationChangedFinalAssetsReport')
const GetNoDataLabelFinalAssetsReport = () => import('@/views/reports/GetNoDataLabelFinalAssetsReport')
const GetNonInventoriedFinalAssetsReport = () => import('@/views/reports/GetNonInventoriedFinalAssetsReport')
const GetDoubledLabelFinalAssetsReport = () => import('@/views/reports/GetDoubledLabelFinalAssetsReport')
const GetFinalAssetsChangedReport = () => import('@/views/reports/GetFinalAssetsChangedReport')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'users',
          meta: { label: 'Usuarios' },
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Users
            },
            {
              path: 'user/:id',
              meta: { label: 'Detalle de usuario' },
              name: 'User',
              component: User
            },
            {
              path: 'adduser',
              meta: { label: 'Agregar usuario' },
              name: 'AddUser',
              component: AddUser
            },
          ]
        },
        {
          path: 'costcenters',
          meta: { label: 'Centros de Costo' },
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: CostCenters
            },
            {
              path: 'costcenter/:id',
              meta: { label: 'Detalle de centro de costo' },
              name: 'CostCenter',
              component: CostCenter
            },
            {
              path: 'addcostcenter',
              meta: { label: 'Agregar centro de costo' },
              name: 'AddCostCenter',
              component: AddCostCenter
            }
          ]
        },
        {
        path: 'companies',
        meta: { label: 'Empresas' },
        component: {
          render (c) { return c('router-view') }
        },
        children: [
          {
            path: '',
            component: Companies
          },
          {
            path: 'company/:id',
              meta: { label: 'Detalle de empresa' },
            name: 'Company',
              component: Company
          },
          {
            path: 'addCompany',
              meta: { label: 'Agregar empresa' },
            name: 'AddCompany',
              component: AddCompany
          },
        ]
        },
        {
          path: 'accountingAccounts',
          meta: { label: 'Cuentas Contables' },
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: AccountingAccounts
            },
            {
              path: 'accountingaccount/:id',
              meta: { label: 'Detalle de cuenta contable' },
              name: 'AccountingAccount',
              component: AccountingAccount
            },
            {
              path: 'addaccountingaccount',
              meta: {label: 'Agregar cuenta contable'},
              name: 'AddAccountingAccount',
              component: AddAccountingAccount
            }
          ]
        },
        {
          path: 'contacts',
            meta: { label: 'Contactos' },
            component: {
              render (c) { return c('router-view') }
            },
            children: [
              {
                path: '',
                component: Contacts
            },
              {
                path: 'contact/:id',
                  meta: { label: 'Detalle de contacto' },
                name: 'Contact',
                  component: Contact
              },
              {
                path: 'addContact',
                  meta: { label: 'Agregar contacto' },
                name: 'AddContact',
                  component: AddContact
              },
            ]
            },
            {
              path: 'departments',
                meta: { label: 'Departamentos' },
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: '',
                  component: Departments
                },
                {
                  path: 'department/:id',
                  meta: { label: 'Detalle de departamento' },
                  name: 'Department',
                  component: Department
                },
                {
                  path: 'addDepartment',
                  meta: { label: 'Agregar departamento' },
                  name: 'AddDepartment',
                  component: AddDepartment
                },
              ]
            },
            {
              path: 'projects',
              meta: { label: 'Proyectos' },
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: '',
                  component: Projects
                },
                {
                  path: 'project/:id',
                  meta: { label: 'Detalle de proyecto' },
                  name: 'Project',
                  component: Project
                },
                {
                  path: 'addProject',
                  meta: { label: 'Agregar proyecto' },
                  name: 'AddProject',
                  component: AddProject
                },
              ]
            },
            {
              path: 'assets',
              meta: { label: 'Base inicial' },
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: '',
                  component: Assets
                }
              ]
            },
            {
              path: 'locations',
              meta: { label: 'Ubicaciones' },
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: '',
                  component: Locations
                },
                {
                  path: 'location/:id',
                  meta: { label: 'Detalle de ubicación' },
                  name: 'Location',
                  component: Location
                },
                {
                  path: 'addLocation',
                  meta: { label: 'Agregar ubicación' },
                  name: 'AddLocation',
                  component: AddLocation
                },
              ]
            },
            {
              path: 'finalAssets',
              meta: { label: 'Activos Finales' },
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: '',
                  component: FinalAssets
                },
                {
                  path: 'finalAsset/:id',
                  meta: { label: 'Detalle de activo final' },
                  name: 'Activo final',
                  component: FinalAsset
                },
                {
                  path: 'finalAssetGroup/:key',
                  meta: { label: 'Activos del grupo' },
                  name: 'Grupo de activo final',
                  component: FinalAssetGroup
                }
              ]
            },
            {
              path: 'sessions',
                meta: { label: 'Sesiones de registro' },
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: '',
                  component: Sessions
                },
                {
                  path: 'addsession',
                  meta: { label: 'Nueva sesión de registro' },
                  name: 'AddSession',
                  component: AddSession
                },
                {
                  path: 'session/:idsession',
                  meta: { label: 'Detalle de sesión' },
                  name: 'Session',
                  component: Session
                },
                {
                  path: 'session/:idsession/asset/:idasset',
                  meta: { label: 'Detalle de activo' },
                  name: 'Asset',
                  component: SessionAsset
                }
              ],
            },
            {
              path: 'reports',
              meta: { label: 'Reportes' },
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: 'reconciled',
                  meta: { label: 'Reporte de Activos Conciliados' },
                  name: 'GetConcealedFinalAssetsReport',
                  component: GetConcealedFinalAssetsReport
                },
                {
                  path: 'departmentChanges',
                  meta: { label: 'Reporte de Activos con Cambio de Departamento' },
                  name: 'GetDepartmentChangedFinalAssetsReport',
                  component: GetDepartmentChangedFinalAssetsReport
                },
                {
                  path: 'excess',
                  meta: { label: 'Reporte de Activos en Demasía' },
                  name: 'GetExceededFinalAssetsReport',
                  component: GetExceededFinalAssetsReport
                },
                {
                  path: 'registered',
                  meta: { label: 'Reporte de Activos Inventariados' },
                  name: 'GetInventoriedFinalAssetsReport',
                  component: GetInventoriedFinalAssetsReport
                },
                {
                  path: 'locationchanges',
                  meta: { label: 'Reporte de Activos con Cambio de Ubicación' },
                  name: 'GetLocationChangedFinalAssetsReport',
                  component: GetLocationChangedFinalAssetsReport
                },
                {
                  path: 'wronglabel',
                  meta: { label: 'Reporte de Activos sin Etiqueta' },
                  name: 'GetNoDataLabelFinalAssetsReport',
                  component: GetNoDataLabelFinalAssetsReport
                },
                {
                  path: 'notregistered',
                  meta: { label: 'Reporte de Activos no Inventariados' },
                  name: 'GetNonInventoriedFinalAssetsReport',
                  component: GetNonInventoriedFinalAssetsReport
                },
                {
                  path: 'doubledlabel',
                  meta: { label: 'Reporte de Activos con etiqueta duplicada' },
                  name: 'GetDoubledLabelFinalAssetsReport',
                  component: GetDoubledLabelFinalAssetsReport
                }
                ,
                {
                  path: 'changed',
                  meta: { label: 'Reporte de Activos cambiados' },
                  name: 'GetFinalAssetsChangedReport',
                  component: GetFinalAssetsChangedReport
                }
              ],
            },
            {
              path: 'base',
                redirect: '/base/cards',
              name: 'Base',
              component: {
              render (c) { return c('router-view') }
            },
              children: [
                {
                  path: 'cards',
                  name: 'Cards',
                  component: Cards
                },
                {
                  path: 'forms',
                  name: 'Forms',
                  component: Forms
                },
                {
                  path: 'switches',
                  name: 'Switches',
                  component: Switches
                },
                {
                  path: 'tables',
                  name: 'Tables',
                  component: Tables
                },
                {
                  path: 'tabs',
                  name: 'Tabs',
                  component: Tabs
                },
                {
                  path: 'breadcrumbs',
                  name: 'Breadcrumbs',
                  component: Breadcrumbs
                },
                {
                  path: 'carousels',
                  name: 'Carousels',
                  component: Carousels
                },
                {
                  path: 'collapses',
                  name: 'Collapses',
                  component: Collapses
                },
                {
                  path: 'jumbotrons',
                  name: 'Jumbotrons',
                  component: Jumbotrons
                },
                {
                  path: 'list-groups',
                  name: 'List Groups',
                  component: ListGroups
                },
                {
                  path: 'navs',
                  name: 'Navs',
                  component: Navs
                },
                {
                  path: 'navbars',
                  name: 'Navbars',
                  component: Navbars
                },
                {
                  path: 'paginations',
                  name: 'Paginations',
                  component: Paginations
                },
                {
                  path: 'popovers',
                  name: 'Popovers',
                  component: Popovers
                },
                {
                  path: 'progress-bars',
                  name: 'Progress Bars',
                  component: ProgressBars
                },
                {
                  path: 'tooltips',
                  name: 'Tooltips',
                  component: Tooltips
                }
              ]
            },
            {
              path: 'buttons',
                redirect: '/buttons/standard-buttons',
              name: 'Buttons',
              component: {
              render (c) { return c('router-view') }
            },
              children: [
                {
                  path: 'standard-buttons',
                  name: 'Standard Buttons',
                  component: StandardButtons
                },
                {
                  path: 'button-groups',
                  name: 'Button Groups',
                  component: ButtonGroups
                },
                {
                  path: 'dropdowns',
                  name: 'Dropdowns',
                  component: Dropdowns
                },
                {
                  path: 'brand-buttons',
                  name: 'Brand Buttons',
                  component: BrandButtons
                }
              ]
            },
            {
              path: 'icons',
                redirect: '/icons/font-awesome',
              name: 'Icons',
              component: {
              render (c) { return c('router-view') }
            },
              children: [
                {
                  path: 'coreui-icons',
                  name: 'CoreUI Icons',
                  component: CoreUIIcons
                },
                {
                  path: 'flags',
                  name: 'Flags',
                  component: Flags
                },
                {
                  path: 'font-awesome',
                  name: 'Font Awesome',
                  component: FontAwesome
                },
                {
                  path: 'simple-line-icons',
                  name: 'Simple Line Icons',
                  component: SimpleLineIcons
                }
              ]
            },
            {
              path: 'notifications',
                redirect: '/notifications/alerts',
              name: 'Notifications',
              component: {
              render (c) { return c('router-view') }
            },
              children: [
                {
                  path: 'alerts',
                  name: 'Alerts',
                  component: Alerts
                },
                {
                  path: 'badges',
                  name: 'Badges',
                  component: Badges
                },
                {
                  path: 'modals',
                  name: 'Modals',
                  component: Modals
                }
              ]
            }
          ]
        },
        {
          path: '/pages',
            redirect: '/pages/404',
          name: 'Pages',
          component: {
          render (c) { return c('router-view') }
        },
          children: [
            {
              path: '404',
              name: 'Page404',
              component: Page404
            },
            {
              path: '500',
              name: 'Page500',
              component: Page500
            },
            {
              path: 'login',
              name: 'Login',
              component: Login
            },
            {
              path: 'recoverPassword',
              name: 'RecoverPassword',
              component: RecoverPassword
            },
            {
              path: 'register',
              name: 'Register',
              component: Register
            }
          ]
        }
      ]
    })
