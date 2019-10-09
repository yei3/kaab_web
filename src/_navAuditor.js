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
          name: 'Base inicial',
          url: '/assets',
          icon: 'fa fa-database'
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
          name: 'C. de Departamento',
          url: '/reports/departmentChanges',
          icon: 'fa fa-file-text'
        },
        {
          name: 'Activos en demasía',
          url: '/reports/excess',
          icon: 'fa fa-file-text'
        },
        {
          name: 'Etiqueta sin datos',
          url: '/reports/wronglabel',
          icon: 'fa fa-file-text'
        },
        {
          name: 'Activos cambiados',
          url: '/reports/changed',
          icon: 'fa fa-file-text'
        }
      ]
    }
  ]
}
