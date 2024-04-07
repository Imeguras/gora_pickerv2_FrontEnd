<template lang="pug">
.ion-padding( slot="content")
  ion-input(v-model="code" label="code" label-placement="floating" required="true")
  ion-searchbar(animated placeholder="manufacturer" v-model="selected_manufacturer" :floating="true" :debounce="250" @ionInput="handleFilter('manufacturer'); sel_man = false")
  ion-list(v-if="sel_man===false && selected_manufacturer != ''  " style="height: 200px; overflow: auto;")
    ion-item(v-for="manufacturer in manufacturers" :key="manufacturer" @click="selected_manufacturer = manufacturer.name; sel_man = true")
      ion-label {{manufacturer.name}}
  ion-searchbar(animated placeholder="packagetype" v-model="selected_packagetype" :floating="true" :debounce="250" @ionInput="handleFilter('packagetype'); sel_packagetype = false")
  ion-list(v-if="sel_packagetype===false && selected_packagetype != ''  " style="height: 200px; overflow: auto;")
    ion-item(v-for="pack in packagetype" :key="pack.name" @click="selected_packagetype = pack.name; sel_packagetype = true")
      ion-label {{pack.name}}
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
        ion-textarea(v-model="description" placeholder="Description")
        ion-datetime-button(datetime="datetime")
        ion-modal(:keep-contents-mounted="true")
          ion-datetime#datetime(:date-target="eol")
        
  
  ion-fab-button(slot="fixed" @click="addChip")
    ion-icon(name="add")
</template>

<script lang="ts">
 import store, { ACTIONS_CHIPS, ACTIONS_MANUFACTURERS, ACTIONS_PACKAGETYPE, ACTIONS_IMPORT_CACHE } from '@/store/index';
 import { GeneralChip } from '@/store/index';
import { 
    IonInput,
    IonText,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTextarea,
    IonTitle,
    IonDatetime,
    IonDatetimeButton,
    IonContent,
    IonToggle,
    IonMenu,
    IonModal,
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
    in_packagetype: String,
    in_family: String,
  },
  components: {
    IonInput,
    IonLabel,
    IonAccordion,
    IonAccordionGroup,
    IonText, 
    IonTextarea,
    IonModal,
    IonPage,
    IonDatetime,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonToggle,
    IonMenu,
    IonMenuButton,
    IonDatetimeButton,
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
      ...mapGetters(['getManufacturers', 'getPackageTypes'])

  },
  watch: {
   getManufacturers:{
    handler(value, oldValue){
      this.manufacturers = value;
		},
    deep: true
   },
   getPackageTypes:{
    handler(value, oldValue){
      this.packagetype = value;
    },
    deep: true
   },
  },
  data() {
    return {
      selected_manufacturer: '',
      selected_family: '',
      selected_packagetype: '',
      description: '', 
      eol: new Date(),
      code: '',
      sel_man: false,
      sel_family: false,
      sel_packagetype: false,
      manufacturers: undefined,
      familys: undefined,
      packagetype: undefined,
    }
  },
  mounted() {
    if(this.getManufacturers.length==0){
      store.dispatch(ACTIONS_MANUFACTURERS.fetch).catch((error) => {
        console.log(error);
      });
    }
    if(this.getPackageTypes.length==0){
      store.dispatch(ACTIONS_PACKAGETYPE.fetch).catch((error) => {
        console.log(error);
      });
    }

    if(this.in_packagetype!=undefined){
      this.selected_packagetype = this.in_packagetype;
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
      if(this.selected_manufacturer=='' || this.selected_packagetype=='' || this.code==''){
        return;
      }
      const payload: GeneralChip = {
        code: this.code,
        eol: this.eol,
        family: this.selected_family,
        packageType: this.selected_packagetype,
        manufacturer: this.selected_manufacturer,
        description: this.description,
      }; 
      store.dispatch(ACTIONS_CHIPS.add, payload).then(()=>{
        this.$toast.show("Successfully Added Chip");
        //go to store and find in state the chip that was added
        store.dispatch(ACTIONS_IMPORT_CACHE.post_resolved_inv, {code: payload.code, manufacturer: payload.manufacturer}).catch((error)=>{
          this.$toast.error("Failed to add inventory" + error);
        }); 
      }).catch((error) => {
        this.$toast.error("Failed to add chip" + error);
      });
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
        case 'packagetype':
          this.packagetype = this.getPackageTypes.filter((packagetype:any) => {
            //find manufacturer which atribute name is similar to selected_manufacturer
            const pack= packagetype.name.match(this.selected_packagetype)
            return pack;
          })
          break;
        case 'family':
        break;
      }
    },

  }
}
</script>