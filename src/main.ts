import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import { IonicVue } from '@ionic/vue';
//import * as Config from './gora_config';
import axios from 'axios';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import Toaster from "@meforma/vue-toaster";

/* Theme variables */
import './theme/variables.css';
import { Env } from 'ionicons/dist/types/stencil-public-runtime';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(Toaster)
  .use(store);

let configModule: any; 
let config: any;
try{
	configModule = require('./gora_config');
	config = configModule.config
}catch(error){
	console.log(error);
	config = {
		apiURL: Env.FRONTEND_API_URL,
		apiDomain: Env.FRONTEND_API_DOMAIN
	}
}

axios.defaults.baseURL = config.apiURL

//axios.defaults.headers.common['Content-Type'] = 'application/json'
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
//axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
//axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
//axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true'

//axios.defaults.withCredentials = false

//axios proxy to false
//axios.defaults.proxy = false

app.config.globalProperties.$axios = axios
app.config.globalProperties.$serverUrl = config.apiDomain



router.isReady().then(() => {
  app.mount('#app');
});