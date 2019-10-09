<template>
  <AppHeaderDropdown right no-caret>
    <template slot="headera">

    </template>
    <template slot="header">
      <img
        src="img/avatars/logo.png"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
    </template>\
    <template slot="dropdown">

      <b-dropdown-item @click="logout"><i class="fa fa-lock" /> Cerrar Sesión</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import CognitoAuth from '../cognito/cognito'
import posts from '../services/Posts'

export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return {
      itemsCount: 42
    }
  },
  methods: {
     logout: async function () {
       const params = {
         "userID": this.$session.get('userId')
       };
      await posts.postClearActiveSessions(params).then(async response => {
        this.$session.destroy();
        let cog = new CognitoAuth();
        cog.logout();
        this.$router.push('/pages/login');
      });
    }
  }
}
</script>
