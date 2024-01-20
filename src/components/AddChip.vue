<template lang="pug">
.ion-padding( slot="content")
  ion-input(v-model="code" label="code" label-placement="floating" aria-labelledby="codeLabel" required="true")
  ion-searchbar(animated placeholder="manufacturer" v-model="selected_manufacturer" :floating="true" :debounce="250" @ionInput="handleFilter('manufacturer'); sel_man = false")
  ion-list(v-if="sel_man===false && selected_manufacturer != ''  " style="height: 200px; overflow: auto;")
    ion-item(v-for="manufacturer in manufacturers" :key="manufacturer" @click="selected_manufacturer = manufacturer.name; sel_man = true")
      ion-label {{manufacturer.name}}
  ion-accordion-group 
    ion-accordion
      ion-item(slot="header" color="light")
        ion-label Other Fields(Recommended)
      .ion-padding( slot="content")
        ion-searchbar(animated placeholder="family" v-model="selected_family" :floating="true" :debounce="250" @ionInput="handleFilter('family')")
        ion-list(v-if="sel_family===false && selected_family != ''  " style="height: 200px; overflow: auto;")
          ion-item(v-for="family in familys" :key="family" @click="selected_family = family.name; sel_family = true")
            ion-label {{family.name}}
    ion-accordion
      ion-item(slot="header" color="light")
        ion-label In-Depth Fields
      .ion-padding( slot="content")
        ion-text TODO... Yeah ask imeguras to work harder...
  
  ion-fab-button(slot="fixed" @click="addChip")
    ion-icon(name="add")
</template>

<script lang="ts">
 import store, { ACTIONS_CHIPS, ACTIONS_MANUFACTURERS } from '@/store/index';

import { 
    IonInput,
    IonText,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonToggle,
    IonMenu,
    IonAccordion,
    IonAccordionGroup,
    IonLabel,
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
import {add} from 'ionicons/icons';
import { addIcons } from 'ionicons';
addIcons({
  'add': add
});

export default {
  name: 'AddChip',
  props: {
    in_code: String,
    in_manufacturer: String,
    in_family: String,
  },
  components: {
    IonInput,
    IonLabel,
    IonAccordion,
    IonAccordionGroup,
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
      code: '',
      sel_man: false,
      sel_family: false,
      manufacturers: undefined,
      familys: undefined,
    }
  },
  mounted() {
    if(this.getManufacturers.length==0){
      store.dispatch(ACTIONS_MANUFACTURERS.fetch).catch((error) => {
        console.log(error);
      });
    }
    if(this.in_code!=undefined){
      
      this.code = this.in_code;
    }
    if(this.in_manufacturer!=undefined){
      this.selected_manufacturer = this.in_manufacturer;
    }
    if(this.in_family!=undefined){
      this.selected_family = this.in_family;
    }
  },
  methods: {
    async addChip(){
      
      //store.dispatch(ACTIONS_CHIPS.add, {code: this.code, manufacturer: this.selected_manufacturer, family: this.selected_family}).catch((error) => {
      //  console.log(error);
      //});
    }, 
    async handleFilter(which:string) {
      switch(which){
        case 'manufacturer':
          this.manufacturers = this.getManufacturers.filter((manufacturer:any) => {
            //find manufacturer which atribute name is similar to selected_manufacturer
            const man= manufacturer.name.match(this.selected_manufacturer)
            return man;
          })
          break;
        case 'family':
          
          break;
      }
    },

  }
}
</script>