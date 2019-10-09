export default {
  items: [
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
          name: 'Sesiones de registro',
          url: '/sessions',
          icon: 'fa fa-barcode'
        }
      ]
    }
  ]
}
