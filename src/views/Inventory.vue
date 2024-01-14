<template lang="pug">
ion-page
  ion-header
    ion-toolbar#toolbar_inventory
      ion-menu-button(slot="start")
      ion-title#title_inventory GoraPicker{{capitalizeFirstLetter(componentInRouter)}}
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
    IonRouterOutlet
      
      
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