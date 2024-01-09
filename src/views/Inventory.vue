<template>
  <ion-page>
    <ion-header>
      <ion-toolbar id="toolbar_inventory">
        <ion-menu-button slot="start"></ion-menu-button>
        <ion-title id="title_inventory">GoraPicker/Inventory</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-menu content-id="main-content">
      <ion-content :fullscreen="true">
          <ion-toolbar>
            <ion-title>Options</ion-title>
          </ion-toolbar>
         
          <ion-content class="ion-padding">
            <ion-list>
              <!-- slider to either activate list or graphic view-->
              <ion-item>
                <ion-label>Display Mode</ion-label>
                <ion-toggle slot="end" v-model="display_mode" :enable-on-off-labels="true"/>
              </ion-item>
            </ion-list>
          </ion-content>
      </ion-content>
    </ion-menu>
    <ion-content id="main-content">
      <ion-toolbar>
        <ion-searchbar animated></ion-searchbar>
        
      </ion-toolbar>
      <ion-list v-show="!display_mode" v-for="item in inventory" :key="item.id">
        <ion-item>
          <ion-img :src="'manufacturers/'+item.manufacturer.toLowerCase() +'.png'" style="border-radius:50px; width: 64px;background-color: grey; margin-right:1em;" ></ion-img>
      
          <ion-label>{{item.code}}</ion-label>
          <ion-label>{{item.quantity}}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
      
<script lang="ts">

import { IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenu,
    IonMenuButton} from '@ionic/vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Inventory',
  components: {
    
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenu,
    IonMenuButton
      
      
      
  },
  computed: {
      ...mapGetters(['getInventory'])
  },
  
  data(){
    return{
      inventory: [],
      display_mode: false
    }
  }, 
  created(){
    this.fetchInventory();
  },
  watch: {
   getInventory(value, oldValue){
      this.inventory = value;
			
			
		},
  },
  methods:{
    fetchInventory(){
      this.inventory = this.getInventory;

    }
    
  }
}

</script>
<style>
#toolbar_inventory {
  position: sticky;
  top: 0;
  z-index: 1;
}
#title_inventory{
  font-size: 30px;
  font-weight: bold;
}

</style>