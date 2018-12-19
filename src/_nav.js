export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'fa fa-dashboard',
      /*badge: {
        variant: 'primary',
        text: 'NEW'
      }*/
    },
    {
      title: true,
      name: 'General',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
    name: 'Inicio',
      url: '/home',
      icon: 'fa fa-home',
      children: [
      {
        name: 'Usuarios',
        url: '/users',
        icon: 'fa fa-user'
      },
      {
        name: 'Empresas',
        url: '/companies',
        icon: 'fa fa-industry'
      },
      {
        name: 'Contactos',
        url: '/contacts',
        icon: 'fa fa-address-book'
      },
      {
        name: 'Departamentos',
        url: '/departments',
        icon: 'fa fa-sitemap'
      },
      {
        name: 'Ubicaciones',
        url: '/locations',
        icon: 'fa fa-building'
      },
      {
        name: 'Centros de Costo',
        url: '/costcenters',
        icon: 'fa fa-cc'
      },
      {
        name: 'Cuentas contables',
        url: '/accountingaccounts',
        icon: 'fa fa-usd'
      }
    ]
    },
    {
      title: true,
      name: 'Inventarios',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Operación',
      url: '/op',
      icon: 'fa fa-cogs',
      children: [
        {
          name: 'Proyectos',
          url: '/projects',
          icon: 'fa fa-book'
        },
        {
          name: 'Base inicial',
          url: '/assets',
          icon: 'fa fa-database'
        },
        {
          name: 'Sesiones de registro',
          url: '/sessions',
          icon: 'fa fa-barcode'
        },
        {
          name: 'Activos',
          url: '/finalassets',
          icon: 'fa fa-cubes'
        }
      ]
    },
    {
      name: 'Reportes',
      url: '/reports',
      icon: 'fa fa-file-text',
      children: [
        {
          name: 'Inventariados',
          url: '/reports/registered',
          icon: 'fa fa-file-text'
        },
        {
          name: 'Conciliados',
          url: '/reports/reconciled',
          icon: 'fa fa-file-text'
        },
        {
          name: 'No inventariados',
          url: '/reports/notregistered',
          icon: 'fa fa-file-text'
        },
        {
          name: 'C. de ubicación',
          url: '/reports/locationchanges',
          icon: 'fa fa-file-text'
        },
        {
          name: 'C. de descripción',
          url: '/reports/descriptionchanges',
          icon: 'fa fa-file-text'
        },
        {
          name: 'Activos en demasía',
          url: '/reports/excess',
          icon: 'fa fa-file-text'
        },
        {
          name: 'Etiqueta erronea',
          url: '/reports/wronglabel',
          icon: 'fa fa-file-text'
        }
      ]
    }
  ]
}
