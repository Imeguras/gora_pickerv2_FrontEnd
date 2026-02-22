<template lang="pug">
ion-page
  ion-header(:translucent="true")
    ion-toolbar#toolbar_inventory
      ion-menu-button(:slot="slot_side" auto-hide="false")
      ion-title#title_inventory(@ionChange="jumpChange(search)") GoraPicker{{capitalizeFirstLetter(componentInRouter)}}
  .ion-padding
  ion-content
    ion-content(v-if="componentsAdd.length")
      ion-text(style="font-weight:bold; font-size:1.5em; margin-top:1em; margin-bottom:1em;") Add Chips
      ion-accordion-group(v-for="component in results" :key="component")
        ion-accordion
          ion-item(slot="header" color="light")
            ion-label {{component}}
          add-chip(:in_code="component" @Success-Chip="componentsAdd.splice(componentsAdd.indexOf(component), 1)")
    ion-content
      //ion-backdrop(:visible="!componentsAdd.length")
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
    const componentsAdd: Array<string> = [];
    const results: Array<string> = [];
    const resultsTagged: Array<string> = [];
    return {
      slot_side: "start",
      componentsAdd,
      resultsTagged,
      results,
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

      },
      jumpChange(search: string) {
        this.$router.push({path: search});
      },
      filterSearch(_query: string) {
        if(_query === ""){
          console.log(this.componentsAdd);
          if(this.resultsTagged.length <=0){
            this.results = this.resultsTagged;

          }else{
            this.results = this.componentsAdd;
          }
          

        }
        if (this.resultsTagged.length <=0){

          this.results = this.componentsAdd.filter((d: any) => d.code.toLocaleLowerCase().indexOf(_query.toLocaleLowerCase()) > -1);

        }else{
          this.results = this.resultsTagged.filter((d: any) => d.code.toLocaleLowerCase().indexOf(_query.toLocaleLowerCase()) > -1);
        }
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