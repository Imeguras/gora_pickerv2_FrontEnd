<template lang="pug">
ion-page
  ion-header(:translucent="true")
    ion-toolbar#toolbar_inventory
      ion-menu-button(:slot="slot_side" auto-hide="false")
      ion-title#title_inventory GoraPicker{{capitalizeFirstLetter(componentInRouter)}}
  //side-navigator(v-if="slot_side=='end'")
    .ion-page#page-content
      ion-page Test
  ion-router-outlet
  
      
</template>
      
<script lang="ts">


import { 
    IonPage,
    IonFab, 
    IonFabButton,
    IonMenuButton,
    IonTitle,
    IonHeader,
    IonContent,
    IonToolbar, 
    IonRouterOutlet} from '@ionic/vue';

import {isPlatform,getPlatforms} from '@ionic/vue';
import SideNavigator, {validPlatforms} from '@/components/SideNavigator.vue';

export default {
 
  
  name: 'Inventory',
  components: {
    IonPage,
    IonFab, 
    IonFabButton,
    IonMenuButton,
    IonTitle,
    IonHeader,
    IonContent, 
    IonToolbar, 
    IonRouterOutlet,
    SideNavigator
      
      
  },
  watch: {
    '$route.path' (to, from) {
      if(this.$route.path!=undefined){
        this.componentInRouter = this.$route.path;
      }
      
    }
  },
  mounted() {
    
    validPlatforms.some(isPlatform) ? this.slot_side = "end" : this.slot_side = "start";
    
  },
  data() {
    return {
      slot_side: undefined,
      componentInRouter: this.$route.path
    }
  },
  methods: {
      capitalizeFirstLetter(s:string) {
        //split the string by /
        let words = s.split('/');
        //capatalize the first letter of each item in the array
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        //join the array back into a string
        return words.join('/');

      }
  },  
    

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