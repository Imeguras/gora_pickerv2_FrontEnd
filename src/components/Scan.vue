<template>
<ion-content>
  SCAN!!
</ion-content>
  <!--ion-header>
    <ion-toolbar>
      <ion-title>Barcode Scanner</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-list>
      <ion-item v-for="barcode in barcodes" :key="barcode.value">
        <ion-label>{{ barcode.value }}</ion-label>
      </ion-item>
    </ion-list>
  </ion-content-->
</template>
<script>
//import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
export default {
  name: 'Scan',
  /*data() {
    return {
      isSupported: true, 
      barcodes: []
    }
  },
  mounted() {
    BarcodeScanner.isSupported().then((result)=>{
      this.isSupported=result.supported
      this.scan();
    });
  },
  methods: {
    async scan() {
      const granted = await this.requestPermissions();
      if (!granted) {
        this.presentAlert();
        return;
      }
      const { barcodes } = await BarcodeScanner.scan();
      this.barcodes.push(...barcodes);
    },
    async requestPermissions() {
      const { camera } = await BarcodeScanner.requestPermissions();
      return camera === 'granted' || camera === 'limited';
    },
    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Permission denied',
        message: 'Please grant camera permission to use the barcode scanner.',
        buttons: ['OK'],
      });
      await alert.present();
    }

  },*/
  
}
</script>
