<template>
<div id="container">
  <ion-header id="title_header">
    <ion-toolbar>
      <ion-title id="title_login">Gora Picker </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-card>
    <ion-card-title>Welcome Back!</ion-card-title>
    <ion-card-content>
      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input type="email" v-model="auth.email" />
      </ion-item>
      <ion-item>
        <ion-label position="floating">Password</ion-label>
        <ion-input type="password" v-model="auth.password"/>
      </ion-item>
      <ion-button expand="block" @click="login">Login</ion-button>
      <ion-button expand="block" fill="clear" @click="register">Register</ion-button>
    </ion-card-content>
  </ion-card>
</div>
</template>

<script lang="ts">

import { IonCard, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import {} from 'vue';
import store from '@/store/index';
import {AccountRequest, ACTIONS_AUTH} from '@/store/index';

export default {
  name: 'Login',
  components: {
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  }, 
  data() {
    const auth: AccountRequest={
      email: '',
      password: ''
    }
    return {
      auth
    }
  },
  methods: {
    login() {
      store.dispatch(ACTIONS_AUTH.login, this.auth).then(() => {
        this.$router.push('/inventory');
      }).catch((error) => {
        console.log(error);
      });
    },
   
  }
};
</script>

<style scoped>
#title_header {
  position: sticky;
  top: 0;
  z-index: 1;

}
#title_login {
  font-size: 30px;
  font-weight: bold;
 
}
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
