<template lang="pug">
ion-content
  ion-searchbar(animated :placeholder="manufacturer" v-model="selected_manufacturer" :floating="true")
  ion-searchbar(animated :placeholder="family" v-model="selected_family" :floating="true")
    
</template>
<script lang="ts">
 import store from '@/store/index';

import { 
    IonText,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonToggle,
    IonMenu,
    IonMenuButton,
    IonFab, 
    IonFabButton,
    IonIcon,
    IonList,
    IonItem,
    IonSearchbar,
    IonImg,
    IonRouterOutlet} from '@ionic/vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AddChip',
  props: {
    in_code: String,
    in_manufacturer: String,
    in_family: String,
  },
  components: {
    IonText, 
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonToggle,
    IonMenu,
    IonMenuButton,
    IonFab, 
    IonFabButton,
    IonIcon,
    IonList,
    IonItem,
    IonSearchbar,
    IonImg,
    IonRouterOutlet
  },
  computed:{
      ...mapGetters(['getManufacturers'])

  },
  watch: {
   
   getManufacturers:{
    handler(value, oldValue){
      this.manufacturers = value;
		},
    deep: true
   },
  
  },
  data() {
    return {
      selected_manufacturer: '',
      selected_family: '',
      manufacturers: [],
      familys: [],
    }
  },
  mounted() {
    if(this.in_manufacturer!=undefined){
      this.selected_manufacturer = this.in_manufacturer;
    }
    if(this.in_family!=undefined){
      this.selected_family = this.in_family;
    }
  },
}
</script>