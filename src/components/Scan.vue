<template lang="pug">
ion-page
  ion-menu(content-id="main-content")
      ion-content(:fullscreen="true")
        ion-toolbar
          ion-title Options
        ion-content
          ion-list
            ion-item
              ion-text#display_mode_label  Advanced Mode
              ion-toggle(slot="end" aria-labelledby="display_mode_label" v-model="advanced_mode" :enable-on-off-labels="true")
  ion-content#main-content
    .ion-padding
    ion-content(v-if="advanced_mode")
      ion-list(v-for="(val, key, index) in barcodes_raw" :key="key")
          ion-item(style="display:flex; flex-direction:column; align-items:center;")
            ion-text(style="text-overflow: ellipsis") {{val}}
            ion-button(slot="end" @click="removeBarcode(index)") Remove
    ion-content(v-if="!advanced_mode")
      ion-list(v-for="(val, key, index) in barcodes_processed" :key="key")
          ion-item(style="display:flex; flex-direction:column; align-items:center;")
            ion-text(aria-label="productPartNumberLabel" ) Part Number
            ion-text(aria-labelledby="productPartNumberLabel" style="text-overflow: ellipsis") {{val.PartNumber}}
            ion-text(aria-label="productQuantityLabel") Quantity
            ion-text(aria-labelledby="productQuantityLabel" style="text-overflow: ellipsis") {{val.Quantity}}
            ion-button(slot="end" @click="removeBarcode(index)") Remove
    ion-alert(:is-open="alertOpen" header="There are unresolved conflicts" subHeader="Not resolving them will result in loss of data. Do you want to discard the references that are unresolved?" :buttons="alertButtons")
    ion-modal(:is-open="isModalOpen")
      ion-header
        ion-toolbar
          ion-title Dispatch Chips Resolution
          ion-buttons(slot="start")
            ion-button(@click="cancelModal")
              | Cancel
          ion-buttons(slot="end")
            ion-button(@click="confirmModal")
              | Confirm
      ion-content
        ion-text(v-if="barcodes_resolved.length>0" style="font-weight:bold; font-size:1.5em; margin-top:1em; margin-bottom:1em;") Resolved Chips
        ion-list
          ion-item(v-for="(val, key, index) in barcodes_resolved" :key="key")
            ion-text(aria-label="productPartResolvedNumberLabelModal" color="success") Pt. 
            ion-text(aria-labelledby="productPartResolvedNumberLabelModal" color="success" style="text-overflow: ellipsis") {{val.PartNumber}}
        ion-text(v-if="barcodes_unresolved.length>0" style="font-weight:bold; font-size:1.5em; margin-top:1em; margin-bottom:1em;") Unresolved Chips
        ion-list
          ion-item(v-for="(val, key, index) in barcodes_unresolved" :key="key")
            ion-text(aria-label="productPartUnresolvedNumberLabelModal" color="warning" ) Pt. 
            ion-text(aria-labelledby="productPartUnresolvedNumberLabelModal" color="warning" style="text-overflow: ellipsis") {{val.PartNumber}}
    //ion-router-outlet       
    ion-fab( vertical="bottom" horizontal="start" slot="fixed")
      ion-fab-button( @click="openModal")
        ion-icon(name="add")
    ion-fab( vertical="bottom" horizontal="center" slot="fixed")
      ion-fab-button(  @click="scanBarcode")
        ion-icon(name="scan-outline")
    ion-fab(vertical="bottom" horizontal="end" slot="fixed")
      ion-fab-button( @click="inv")
        ion-icon(name="list-outline")
</template>
<script>
import { IonAlert,IonMenu,IonTitle,IonToolbar,IonHeader,IonToast,IonContent,IonButtons,IonButton,IonModal, IonPage, IonList,IonText,IonFab, IonFabButton, IonIcon, IonItem, IonToggle, IonRouterOutlet} from '@ionic/vue';
import barcodeScanner from '../utils/BarcodeScanner_Abs'
import { matrixToValues,teConversion} from '../utils/matrix';
import {isPlatform} from '@ionic/vue';
import store,{ ACTIONS_CHIPS } from '../store/index';
import { scanOutline,trash,add, listOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
addIcons({
  'scan-outline': scanOutline,
  'trash': trash,
  'add': add, 
  'list-outline': listOutline
});


export default {
  name: 'Scan',
  components: {
    IonRouterOutlet,
    IonAlert,
    IonHeader,
    IonToolbar,
    IonContent,
    IonPage,
    IonToggle,
    IonList,
    IonText, 
    IonItem,
    IonTitle,
    IonFab,
    IonFabButton,
    IonButtons,
    IonButton,
    IonIcon,
    barcodeScanner,
    IonModal,
    IonMenu, 
    IonToast
  },
  
  mounted() {
    this.prepareBarcode(); 
    

  },
  
  methods: {
    removeBarcode(index){
      this.barcodes_raw.splice(index,1);
      this.barcodes_processed.splice(index,1);

    },
    async cancelModal() {
      this.isModalOpen = false;
      this.alertOpen = false;
    },
    
    confirmModal() {
      //this.isModalOpen = false; 
      if(this.barcodes_unresolved.length>0){
        this.alertOpen = true;

      }else{
        //TODO: add chips
        this.cancelModal();
      }
    },
    async prepareBarcode(){
      
      await barcodeScanner.isSupported().then((result) => {
        console.log(result.value);
        this.permissable = result.value;
      });
  //if built for iphone
      if(isPlatform('ios')){
        await barcodeScanner.checkPermissions({ force: true }).then((result) => {
          this.permissable = result.camera === 'granted';
        }).catch((error) => {
          console.log("perms blocked"+error);
        })
      }
      

      if(!barcodeScanner.isGoogleBarcodeScannerModuleAvailable) {

        await barcodeScanner.installGoogleBarcodeScannerModule();
        
      }
      this.scanBarcode();
      
    },
    async scanBarcode() {
      try{
        console.log(this.permissable);
        if(this.permissable){
          barcodeScanner.scan().then(((result) => {
            //console.log enumerate objects properties and functions
            console.log(result.barcodes);
            result.barcodes.forEach(barcode => {
            
              const obj = matrixToValues(barcode.rawValue);
              this.barcodes_raw.push(barcode.rawValue);
              this.barcodes_processed.push(teConversion(obj))

            });
            
          }));
        }
      }catch(error){
        this.permissable = false;
      
      }
    },
    openModal(){
      this.isModalOpen = true;
      this.barcodes_resolved = [];
      this.barcodes_unresolved = [];
      console.log(this.barcodes_processed)
      this.barcodes_processed.forEach((barcode)=>{
        
        //check if barcode exists in database
        //if not, add to unresolved
        //if so, add to resolved
        const PartNumber = barcode.PartNumber;
        store.dispatch(ACTIONS_CHIPS.get, PartNumber).then((result)=>{
          this.barcodes_resolved.push(barcode);
          console.log(result)
        }).catch((error)=>{
          this.barcodes_unresolved.push(barcode);
          
        })
      })
    },
    inv() {
      
      this.$router.replace({path:'/inventory/list'});
    }
  },
  data() {
    const alertButtons = [{text: 'Discard',role: 'cancel',handler: () => {this.alertOpen = false;this.isModalOpen = false;this.inv()},},{text: 'Resolve Conflicts',role: 'confirm',handler: () => {this.alertOpen = false;this.isModalOpen = false;this.$router.replace({name:"database", query: { in_codes: this.barcodes_unresolved.map((x)=> x.PartNumber)}})},}];
    return {
      alertOpen: false,
      isModalOpen: false,
      advanced_mode: false,
      permissable: true,
      setup: false,
      barcodes_raw:[],
      barcodes_processed:[{PartNumber:"teste", Quantity:5}], 
      barcodes_resolved:[],
      barcodes_unresolved:[],
      alertButtons

    }
  },
}

</script>
<style scoped>
ion-item>ion-text:nth-child(even){
   /* put a soft | at each side*/
  border-inline: 2px solid #aaa;
}
ion-item>ion-text {
  padding-inline: 1em;
 

}
ion-text{
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
.ion-padding {
  margin-top:50px;
}
</style>
