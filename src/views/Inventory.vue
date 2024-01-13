<template>
  <ion-page>
    <ion-router-outlet></ion-router-outlet>
    
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
                <ion-text id="display_mode_label ">Display Cascading Nodes Mode</ion-text>
                <ion-toggle slot="end" aria-labelledby="display_mode_label" v-model="display_mode" :enable-on-off-labels="true"/>
              </ion-item>
            </ion-list>
          </ion-content>
      </ion-content>
    </ion-menu>
    <ion-content id="main-content">
      <ion-toolbar>
        <ion-searchbar animated></ion-searchbar>
        
      </ion-toolbar>

      <v-network-graph v-show="display_mode" class="graph" :configs="config" :nodes="nodes" :edges="edges"></v-network-graph>
      <ion-list v-for="item in inventory" :key="item.id">
        <ion-item>
          <ion-img :src="'manufacturers/'+item.manufacturer.toLowerCase() +'.png'" style="border-radius:50px; width: 64px;background-color: grey; margin-right:1em;" ></ion-img>
          <ion-text>{{item.code}}</ion-text>
          <ion-text>{{item.quantity}}</ion-text>
        </ion-item>
      </ion-list>

      <!-- button to scan-->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="scan">
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>
      
<script lang="ts">
 
import { VNetworkGraph } from "v-network-graph"
import "v-network-graph/lib/style.css"
import store from '@/store/index';

import { ACTIONS_GENERALCHIPDETAILS } from '@/store/index';

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
 
  
  name: 'Inventory',
  components: {
    VNetworkGraph,
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
  
  computed: {
      ...mapGetters(['getInventory']),
      ...mapGetters(['getGeneralChipDetails']),
  },
  
  data(){
    const config = VNetworkGraph
    return{
      
      inventory: [],
      display_mode: false,
      nodes:{
        database: { name: "Database Origin" },
        manufacturers: { name: "Manufacturers" }
      },
      edges:{
        edgesManufacturer: {source:"database", target:"manufacturers"}        
      },
      config
      
    }
  },
  mounted(){
    store.dispatch(ACTIONS_GENERALCHIPDETAILS.fetch, null).catch((error) => {
      console.log(error);
    });
    this.fetchInventory();
      
  },
  watch: {
   getInventory(value, oldValue){
      this.inventory = value;
			
			
		},
    getGeneralChipDetails(value, oldValue){
      const _nodes = { database: { name: "Database Origin" }};
      
      console.log("new VALUES"+value);
      //add each  display_name as a node key with name as display_name too
      /*value.forEach((item:) => {
        _nodes[item.display_name] = {name: item.display_name};
      });
      });*/
    }
  },
  methods:{
    fetchInventory(){
      this.inventory = this.getInventory;

    },
    scan(){
      this.$router.push('/inventory/scan');
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

.graph {
  width: 800px;
  height: 600px;
  border: 1px solid #000;
 
}
</style>