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

// Sessions *
const Sessions = () => import('@/views/sessions/Sessions')
const Session = () => import('@/views/sessions/Session')
const Asset = () => import('@/views/sessions/Asset')
const AddSession = () => import('@/views/sessions/AddSession')

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
              component: Asset 
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
