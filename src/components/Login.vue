<template>
<div id="container">
  <ion-card>
    <ion-card-title>Welcome Back!</ion-card-title>
    <ion-card-content>
      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input type="email" v-model="email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Password</ion-label>
        <ion-input type="password" v-model="password"></ion-input>
      </ion-item>
      <ion-button expand="block" @click="login">Login</ion-button>
      <ion-button expand="block" fill="clear" @click="register">Register</ion-button>
    </ion-card-content>
  </ion-card>
</div>
</template>

<script lang="ts">
import { store } from '@/store';
import { IonCard, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import {AccountRequest, ACTIONS_AUTH} from '@/store/index';

export default defineComponent({
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
  setup() {
    const router = useRouter();
    const state = reactive({
      email: '',
      password: '',
    });
    const login = () => {
      const req: AccountRequest= {
        email: '',
        password: '',
      };

      req.email = state.email;
      req.password = state.password;
      store.dispatch(ACTIONS_AUTH.login, state).then(() => {
        console.log('login success');
        router.push('/inventory');
      }).catch((err) => {
        console.log('login failed');
      });
      
    };
    const register = () => {
      console.log('register');
      router.push('/register');
    };
    return {
      ...state,
      login,
      register,
    };
  },
})
</script>

<style scoped>
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
