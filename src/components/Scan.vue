<template lang="pug">
ion-page
  .ion-padding
  ion-content Hello World

</template>
<script>
import { IonContent, IonPage } from '@ionic/vue';
export default {
  name: 'Scan',
  components: {
    IonContent,
    IonPage
  },
}
</script>
<style scoped>
.ion-padding {
  margin-top:2em;
}
</style>
