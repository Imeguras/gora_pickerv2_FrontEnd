<template lang="pug">
ion-menu(content-id="main-content")
      ion-content(:fullscreen="true")
        ion-toolbar
          ion-title Options
        ion-content
          ion-list
            ion-item
              ion-text#display_mode_label  Advanced Mode
              ion-toggle(slot="end" aria-labelledby="display_mode_label" v-model="advanced_mode" :enable-on-off-labels="true")
ion-page#main-content
  ion-content
    .ion-padding
    ion-content(v-if="advanced_mode")
      ion-list(v-for="(val, key, index) in barcodes_raw" :key="key")
          ion-item(style="display:flex; flex-direction:column; align-items:flex-start; space-between:wrap;")
            ion-text.ion-nowrap(style="text-overflow: ellipsis") {{val}}
            ion-button(slot="end" @click="removeBarcode(index)") Remove
    ion-content(v-if="!advanced_mode")
      ion-list(v-for="(val, key, index) in barcodes_processed" :key="key")
          ion-item(style="display:flex; flex-direction:column; align-items:flex-start; space-between:wrap;")
            ion-text.ion-nowrap(:aria-label="productPartNumberLabel" ) Part Number
            ion-text.ion-nowrap(:aria-labelledby="productPartNumberLabel" style="text-overflow: ellipsis") {{val.PartNumber}}
            
            ion-text.ion-nowrap(:aria-label="productQuantityLabel") Quantity
            ion-text.ion-nowrap(:aria-labelledby="productQuantityLabel" style="text-overflow: ellipsis") {{val.Quantity}}
            ion-button.ion-nowrap(slot="end" @click="removeBarcode(index)") Remove
    ion-fab(  vertical="bottom" horizontal="end" slot="fixed")
        ion-fab-button( @click="inv")
          ion-icon(name="home-outline")
    ion-fab( vertical="bottom" horizontal="center" slot="fixed")
        ion-fab-button( @click="scanBarcode")
          ion-icon(name="scan-outline")

</template>
<script>
import { IonContent, IonPage, IonList,IonText,IonFab, IonFabButton, IonIcon, IonItem, IonToggle, useBackButton} from '@ionic/vue';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { matrixToValues,teConversion} from '../utils/matrix';

export default {
  name: 'Scan',
  components: {
    IonContent,
    IonPage,
    IonToggle,
    IonList,
    IonText, 
    IonItem,
    IonFab,
    IonFabButton,
    IonIcon,
    BarcodeScanner, 
    useBackButton
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
    async prepareBarcode(){
      
      BarcodeScanner.isSupported().then((result) => {
        this.permissable = result.value;
      });
  //if built for iphone

      BarcodeScanner.checkPermissions({ force: true }).then((result) => {
        this.permissable = result.camera === 'granted';
      });
      

      if(!BarcodeScanner.isGoogleBarcodeScannerModuleAvailable) {

        BarcodeScanner.installGoogleBarcodeScannerModule();
        
      }
      
    },
    async scanBarcode() {
      BarcodeScanner.scan().then(((result) => {
        //console.log enumerate objects properties and functions
        console.log(result.barcodes);
        result.barcodes.forEach(barcode => {
         
          const obj = matrixToValues(barcode.rawValue);
          this.barcodes_raw.push(barcode.rawValue);
          this.barcodes_processed.push(teConversion(obj))
          
        });
        
      }));
      
    },
    
    inv() {
      this.$router.push('/inventory');
    }
  },
  data() {
    return {
      advanced_mode: false,
      permissable: true,
      setup: false,
      barcodes_raw:[],
      barcodes_processed:[]
    

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
