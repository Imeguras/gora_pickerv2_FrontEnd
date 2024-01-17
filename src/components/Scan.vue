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
    //TODO fix below
    ion-toast(:is-open="!permissable" message="Something went wrong with camera" position="top" color="danger" duration="2000")
    ion-content(v-if="advanced_mode")
      ion-list(v-for="(val, key, index) in barcodes_raw" :key="key")
          ion-item(style="display:flex; flex-direction:column; align-items:flex-start; space-between:wrap;")
            ion-text(style="text-overflow: ellipsis") {{val}}
            ion-button(slot="end" @click="removeBarcode(index)") Remove
    ion-content(v-if="!advanced_mode")
      ion-list(v-for="(val, key, index) in barcodes_processed" :key="key")
          ion-item(style="display:flex; flex-direction:column; align-items:flex-start; space-between:wrap;")
            ion-text(:aria-label="productPartNumberLabel" ) Part Number
            ion-text(:aria-labelledby="productPartNumberLabel" style="text-overflow: ellipsis") {{val.PartNumber}}
            ion-text(:aria-label="productQuantityLabel") Quantity
            ion-text(:aria-labelledby="productQuantityLabel" style="text-overflow: ellipsis") {{val.Quantity}}
            ion-button(slot="end" @click="removeBarcode(index)") Remove
    ion-modal
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
        ion-list
          ion-item(v-for="(val, key, index) in barcodes_resolved" :key="key")
            ion-text(:aria-label="productPartNumberLabel" ) Part Number
            ion-text(:aria-labelledby="productPartNumberLabel" style="text-overflow: ellipsis") {{val.PartNumber}}
          ion-item(v-for="(val, key, index) in barcodes_unresolved" :key="key")
            ion-text(:aria-label="productPartNumberLabel" ) Part Number
            ion-text(:aria-labelledby="productPartNumberLabel" style="text-overflow: ellipsis") {{val.PartNumber}}
            
    ion-fab( vertical="bottom" horizontal="start" slot="fixed")
      ion-fab-button( @click="openModal")
    ion-fab( vertical="bottom" horizontal="center" slot="fixed")
      ion-fab-button( @click="scanBarcode")
    ion-fab(vertical="bottom" horizontal="end" slot="fixed")
      ion-fab-button( @click="inv")
        
</template>
<script>
import { IonMenu,IonTitle,IonToolbar,IonHeader,IonToast,IonContent,IonButtons,IonButton,IonModal, IonPage, IonList,IonText,IonFab, IonFabButton, IonIcon, IonItem, IonToggle} from '@ionic/vue';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { matrixToValues,teConversion} from '../utils/matrix';
import store,{ ACTIONS_CHIPS } from '../store/index';

export default {
  name: 'Scan',
  components: {
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
    BarcodeScanner,
    IonModal,
    IonMenu, 
    IonToast
  },
  
  mounted() {
    this.prepareBarcode(); 
    this.scanBarcode();

  },
  
  methods: {
    removeBarcode(index){
      this.barcodes_raw.splice(index,1);
      this.barcodes_processed.splice(index,1);

    },
    async onWillDismiss() {
      console.log('will dismiss');
      
    },
    async cancelModal() {
      this.isModalOpen = false;
    },
    
    confirmModal() {
      this.isModalOpen = false;  
    },
    async prepareBarcode(){
      
      BarcodeScanner.isSupported().then((result) => {
        this.permissable = result.value;
      });
  //if built for iphone

      BarcodeScanner.checkPermissions({ force: true }).then((result) => {
        this.permissable = result.camera === 'granted';
      }).catch((error) => {
        console.log("perms blocked"+error);
      })
      

      if(!BarcodeScanner.isGoogleBarcodeScannerModuleAvailable) {

        BarcodeScanner.installGoogleBarcodeScannerModule();
        
      }
      
    },
    async scanBarcode() {
      try{
        BarcodeScanner.scan().then(((result) => {
          //console.log enumerate objects properties and functions
          console.log(result.barcodes);
          result.barcodes.forEach(barcode => {
          
            const obj = matrixToValues(barcode.rawValue);
            this.barcodes_raw.push(barcode.rawValue);
            this.barcodes_processed.push(teConversion(obj))

          });
          
        }));
      }catch(error){
        this.permissable = false;
      
      }
    },
    openModal(){
      this.isModalOpen = true;
      console.log("import");
      /*this.isOpen = true;
      console.log("HELLLOOOO");
      this.barcodes_resolved = [];
      this.barcodes_unresolved = [];
      this.barcodes_processed.foreach((barcode)=>{
        //check if barcode exists in database
        //if not, add to unresolved
        //if so, add to resolved
        const PartNumber = barcode.PartNumber;
        store.dispatch(ACTIONS_CHIPS.get, PartNumber).then((result)=>{
          this.barcodes_resolved.push(barcode);
          console.log(result)
        }).catch((error)=>{
          console.log("erro aqui!"+error)
          this.barcodes_unresolved.push(barcode);
          
        })
      })*/
    },
    inv() {
      
      this.$router.replace({path:'/inventory/list'});
    }
  },
  data() {
    return {
      isModalOpen: false,
      advanced_mode: false,
      permissable: true,
      setup: false,
      barcodes_raw:[],
      barcodes_processed:[], 
      barcodes_resolved:[],
      barcodes_unresolved:[],
    

    }
  },
}

</script>
<style scoped>
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
