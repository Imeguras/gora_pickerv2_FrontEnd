<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inventory</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Inventory</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle,
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList,
    IonItem,
    IonAvatar,
    IonImg,
    IonLabel,
    InfiniteScrollCustomEvent, } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent, reactive } from 'vue';


</script>
