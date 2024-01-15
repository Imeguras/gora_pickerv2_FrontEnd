<template lang="pug">
ion-page
  ion-header(:translucent="true")
    ion-toolbar
      ion-title hello

      
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
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
export default {
 
  
  name: 'ScanPage',
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
    BarcodeScanner
      
      
  },
  mounted() {
    this.prepareBarcode(); 
    this.scanBarcode();
    

  },
  methods: {
     
      async prepareBarcode(){
        const t = BarcodeScanner.checkPermission({ force: true });
        return t;
      },
      async scanBarcode() {
        const { barcodes } = BarcodeScanner.startScan().then((barcodes) => {
          console.log('Barcode data', barcodes);
        }).catch((err) => {
          console.log('Error', err);
        });

      }
  },  
  
  deactivated() {
    this.stopScan();
  },
  beforeUnmount() {
    this.stopScan();
  }
}

</script>
<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
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