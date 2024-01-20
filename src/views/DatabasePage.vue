<template lang="pug">
ion-page
  ion-header(:translucent="true")
    ion-toolbar#toolbar_inventory
      ion-menu-button(:slot="slot_side" auto-hide="false")
      ion-title#title_inventory GoraPicker{{capitalizeFirstLetter(componentInRouter)}}
  .ion-padding
  ion-content
    ion-text(style="font-weight:bold; font-size:1.5em; margin-top:1em; margin-bottom:1em;") Add Chips
    ion-accordion-group(v-for="component in componentsAdd" :key="component")
      ion-accordion
        ion-item(slot="header" color="light")
          ion-label {{component}}
        add-chip(:in_code="component") 
    ion-content
      ion-backdrop(:visible="!componentsAdd.length")
        ion-router-outlet
</template>
      
<script lang="ts">


import { 
    IonPage,
    IonBackdrop,
    IonFab, 
    IonFabButton,
    IonMenuButton,
    IonTitle,
    IonText,
    IonHeader,
    IonContent,
    IonToolbar,
    IonAccordion,
    IonAccordionGroup,
    IonLabel,
    IonItem,
    IonRouterOutlet} from '@ionic/vue';
import AddChip from '../components/AddChip.vue';
import store from '@/store';
import {isPlatform} from '@ionic/vue';
export default {
 
  
  name: 'DatabasePage',
  components: {
    IonPage,
    IonBackdrop,
    IonFab,
    IonText,
    IonFabButton,
    IonMenuButton,
    IonTitle,
    IonHeader,
    IonContent, 
    IonItem,
    IonToolbar, 
    IonAccordionGroup,
    IonAccordion,
    IonLabel,
    IonRouterOutlet,
    AddChip
  },
  
  watch: {
    '$route.path' (to, from) {
      if(this.$route.path!=undefined){
        this.componentInRouter = this.$route.path;
      }
      
    }
  },
  data() {
    return {
      slot_side: "start",
      componentsAdd: [""],
      componentInRouter: this.$route.path
    }
  },
  mounted() {
    if (isPlatform('desktop')) {
      this.slot_side = "end";
    }
    const in_codes : Array<string> = this.$route.query.in_codes
    if (in_codes != undefined) {
      this.componentsAdd = in_codes;
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