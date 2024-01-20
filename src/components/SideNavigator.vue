<template lang="pug">
ion-split-pane(content-id="page-content")
  ion-menu(content-id="page-content")
    ion-header
      ion-toolbar
        ion-title Menu
    ion-content
      ion-list
        ion-menu-toggle
          ion-item(:routerLink="{name: 'Home'}")
            ion-icon(name="home-outline" slot="start")
            ion-label Home
        ion-menu-toggle
          ion-item(:routerLink="{name: 'DatabasePage'}")
            ion-icon(name="list-outline" slot="start")
            ion-label Database
        ion-menu-toggle
          ion-item(:routerLink="{name: 'InventoryList'}")
            ion-icon(name="list-outline" slot="start")
            ion-label Inventory
        ion-menu-toggle
          ion-item(:routerLink="{name: 'Settings'}")
            ion-icon(name="settings-outline" slot="start")
            ion-label Settings
        ion-menu-toggle
          ion-item(:routerLink="{name: 'Login'}")
            ion-icon(name="log-out-outline" slot="start")
            ion-label Logout
</template>
<script lang="ts">
import {IonText,
    IonSplitPane,
    IonTitle, 
    IonToolbar,
    IonHeader,
    IonContent,
    IonMenu,
    IonMenuToggle,
    IonItem,
    IonLabel,
    IonIcon,
    IonList,
    IonRouterOutlet} from '@ionic/vue';
import { settingsOutline,logOutOutline, listOutline, homeOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
  addIcons({
    settingsOutline,
    logOutOutline,
    listOutline,
    homeOutline

  });
export const validPlatforms:Array<string> = ["desktop","electron"];
export default {
  name: 'SideNavigator',
  components: {
    IonText,
    IonSplitPane,
    IonTitle, 
    IonToolbar,
    IonHeader,
    IonContent,
    IonMenu,
    IonMenuToggle,
    IonItem,
    IonLabel,
    IonIcon,
    IonList,
    IonRouterOutlet

  },
}
</script>
<style scoped>

</style>