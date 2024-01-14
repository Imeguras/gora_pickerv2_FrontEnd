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
      <ion-button expand="block" fill="clear" id="register">Register</ion-button>
       <ion-toast trigger="register" message="As of right now, its impossible to create new accounts, talk to the admin" :duration="5000"></ion-toast>
    </ion-card-content>
  </ion-card>
</div>
</template>

<script lang="ts">

import { IonToolbar,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonHeader,
    IonToast } from '@ionic/vue';
import axios from 'axios';
import store from '@/store/index';
import {AccountRequest, ACTIONS_AUTH} from '@/store/index';
import { jwtDecode } from "jwt-decode";

export default {
  name: 'Login',
  components: {
    IonHeader,
    IonToolbar,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonToast
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
  mounted() {
    const token= localStorage.getItem('token');
    if(token){
      
      
      const decodedHeader = jwtDecode(token);
      //check http://schemas.microsoft.com/ws/2008/06/identity/claims/expiration for expiration
    
      let expiration = decodedHeader["http://schemas.microsoft.com/ws/2008/06/identity/claims/expiration"];
      
      if(expiration){
        //expiration is string
        const expirationDate = new Date(expiration);
        const currentDate = new Date();
        
        if(expirationDate < currentDate){
          //TODO 
          //localStorage.removeItem('token');
          //this.$router.replace('/login');
        }
      }
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

      this.$router.replace('/inventory');
     console.log(decodedHeader)
    }
    //check if localStorage has a token
    
  },
  methods: {
    login() {
      store.dispatch(ACTIONS_AUTH.login, this.auth).then(() => {
        this.$router.replace('/inventory');
        
      }).catch((error) => {
        console.log(error);
      });
    }
   
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
