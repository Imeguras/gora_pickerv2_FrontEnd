<template lang="pug">
ion-content(:fullscreen="true" scroll-y="false" scroll-x="false" style="display:flex;align-items:center;justify-items:center;flex-direction:row;")
  ion-header#title_header
      ion-toolbar 
        ion-title#title_login Gora Picker
  ion-page.loginPage
    ion-card
      ion-card-title Welcome Back!
      ion-card-content.inputsGroup
        ion-item.inputs
          ion-input(label="Email" label-placement="floating" type="email" v-model="auth.email")
        ion-item.inputs
          ion-input(label="Password" label-placement="floating" type="password" v-model="auth.password")
      ion-button(expand="block" @click="login") Login
      ion-button(expand="block" fill="clear" id="register") Register
      ion-toast(trigger="register" message="As of right now, its impossible to create new accounts, talk to the admin" :duration="5000")
  </template>

<script lang="ts">

import { IonToolbar,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonTitle,
    IonContent,
    IonPage,
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
    IonContent,
    IonToolbar,
    IonCard,
    IonPage,
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
ion-card-title {
  
  font-size: 30px;
  font-weight: bold;
}
.loginPage {
 
  margin: auto;
  padding: 2em;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-content: center;
  
  /*border: 1px solid #ccc;*/
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
}
ion-card{
  align-self:center; 
  width: 40%;
}

.loginPage>ion-card{
  padding: 4em;
  border-radius: 25px;
  /*Center */
  justify-self: center;
  justify-content: center;

}

@media (min-width:320px)  {
   /* smartphones, iPhone, portrait 480x320 phones */ 
    ion-card{
      width: 90% !important;
      margin-top: 10em;
    }
 .inputsGroup{
    margin-block: 2em;
    margin-bottom: 3em !important;
    
  }
  .inputs{
    margin-block: 1em !important;
  }
}

/*@media (min-width:641px)  { 

  ion-card{
    width: 70% !important;
  }
  .inputsGroup{
    margin-block: 2em;
    margin-bottom: 3em !important;
    
  }
  .inputs{
    margin-block: 1em !important;
  }
}*/
@media (min-width:1025px) {
  ion-card{
  
    width: 40% !important;
  }
  .inputsGroup{
    margin-block: 2em;
    margin-bottom: 3em !important;
    
  }
  .inputs{
    margin-block: 1em !important;
  }
}

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
