<template lang="pug">
ion-page
  .ion-padding
  ion-content
    


</template>
<script>
import { IonContent, IonPage } from '@ionic/vue';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

export default {
  name: 'Scan',
  components: {
    IonContent,
    IonPage, 
    BarcodeScanner
  },
  
  mounted() {
    this.prepareBarcode(); 
    this.scanBarcode();
    

  },
  deactivated() {
    this.stopScan();
  },
  beforeUnmount() {
    this.stopScan();
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
  }
}

</script>
<style>
.ion-padding {
  margin-top:2em;
}
</style>
