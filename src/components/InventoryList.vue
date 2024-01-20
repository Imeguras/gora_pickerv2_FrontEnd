<template lang="pug">
ion-page
  ion-menu(content-id="main-content")
    ion-content(:fullscreen="true")
      ion-toolbar
        ion-title Options
      ion-content
        ion-list
          ion-item
            ion-text#display_mode_label  Display Cascading Nodes Mode
            ion-toggle(slot="end" aria-labelledby="display_mode_label" v-model="display_mode" :enable-on-off-labels="true")
  ion-content#main-content
    .ion-padding
    ion-searchbar(animated)
    v-network-graph(graph v-show="display_mode" :nodes="nodes" :edges="edges" :configs="config" :layouts="layouts")
      ion-list(v-for="item in inventory" :key="item.id")
        ion-item(style="display:flex; flex-direction:column; align-items:flex-start; space-between:wrap;")
          ion-img(:src="'manufacturers/' + item.manufacturer.toLowerCase() + '.png'" style="border-radius:50px; width: 64px; background-color: grey; margin-right:1em;")
          ion-text {{ item.code }}
          ion-text {{ item.quantity }}
    ion-fab( vertical="bottom" horizontal="end" slot="fixed")
      ion-fab-button( @click="scan")
        ion-icon(name="scan-outline")

</template>

<script lang="ts">
 
import { VNetworkGraph } from "v-network-graph"
//import "v-network-graph/lib/style.css"
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
import { scanOutline,trash,add, listOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
addIcons({
  "scan-outline": scanOutline,
  "trash": trash,
  "add": add,
  "list-outline": listOutline
});
export default {
  name: 'InventoryList',
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
  computed:{
      ...mapGetters(['getGeneralChipDetails', 'getInventory'])

  },
  watch: {
   
   getInventory:{
    handler(value, oldValue){
      this.inventory = value;
		},
    deep: true,
    immediate: true
   },
  
    getGeneralChipDetails:{
      handler(value, oldValue){
        const database = this.nodes.database
        
        this.nodes= {
          database: database,
          
        }
        this.layouts = {
          database: {x: 0, y: 0}
        }
        //foreach value
        const size_value = Object.keys(value).length
        for (const [key, val] of Object.entries(value)) {
          
          this.nodes[val] = {name: val}
          this.edges[val] = {source: "database", target: val}
          //key to number
          const numKey = parseInt(key)
          const theta = (Math.PI * numKey) / size_value;
          const coordsX = 100 * Math.cos(theta);
          const coordsY = 100 * Math.sin(theta);
          this.layouts[val] = {x: coordsX, y: coordsY}
        }
      },
      deep: true,
      immediate: true
    },
  },

  methods:{
    
    scan(){
      this.$router.replace({path:'/inventory/scan'});
     
    }
  },
  data(){
    
  
    return{
      display_mode: true,
      inventory: null,
      nodes:{
        database: { name: "Database Origin" }
        
      },
      edges:{
     
      },
      layouts:{

      },
      config:{
        node: {
          selectable: true,
          normal: {
            type: "circle",
            radius: 16,
            // for type is "rect" -->
            width: 32,
            height: 32,
            borderRadius: 4,
            // <-- for type is "rect"
            strokeWidth: 0,
            strokeColor: "#000000",
            strokeDasharray: "0",
            color: "#4466cc",
          },
          hover: {
            type: "circle",
            radius: 16,
            // for type is "rect" -->
            width: 32,
            height: 32,
            borderRadius: 4,
            // <-- for type is "rect"
            strokeWidth: 0,
            strokeColor: "#000000",
            strokeDasharray: "0",
            color: "#dd2288",
          },
          selected: {
            type: "circle",
            radius: 16,
            // for type is "rect" -->
            width: 32,
            height: 32,
            borderRadius: 4,
            // <-- for type is "rect"
            strokeWidth: 0,
            strokeColor: "#000000",
            strokeDasharray: "0",
            color: "#4466cc",
          },
          label: {
            visible: true,
            fontFamily: "monospace",
            fontSize: 11,
            lineHeight: 1.1,
            color:"#3880ff",
            margin: 4,
            direction: "south"
          },
          focusring: {
            visible: true,
            width: 4,
            padding: 3,
            color: "#eebb00",
            dasharray: "0",
          },
        },
        edge: {
          selectable: true,
          normal: {
            width: 3,
            color: "#4466cc",
            dasharray: "0",
            linecap: "butt",
            animate: false,
            animationSpeed: 50,
          },
          hover: {
            width: 4,
            color: "#3355bb",
            dasharray: "0",
            linecap: "butt",
            animate: false,
            animationSpeed: 50,
          },
          selected: {
            width: 3,
            color: "#dd8800",
            dasharray: "6",
            linecap: "round",
            animate: false,
            animationSpeed: 50,
          },
          gap: 3,
          type: "straight",
          summarize: true,
          summarized: {
            label: {
              fontSize: 10,
              color: "#4466cc",
            },
            shape: {
              type: "rect",
              radius: 6, // for type is "circle"
              width: 12,
              height: 12,
              borderRadius: 3,
              color: "#ffffff",
              strokeWidth: 1,
              strokeColor: "#4466cc",
              strokeDasharray: "0",
            },
            stroke: {
              width: 5,
              color: "#4466cc",
              dasharray: "0",
              linecap: "butt",
              animate: false,
              animationSpeed: 50,
            },
          },
        },

      }
      
    }
  },
  mounted() {
    store.dispatch(ACTIONS_GENERALCHIPDETAILS.fetch, null).catch((error) => {
      console.log(error);
    });
  },
}

</script>
<style scoped>
.ion-padding{
  margin-top: 2em;
}
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

