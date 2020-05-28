<template>
    <Page class="select-page">
      <FlexboxLayout v-if="isLoaded" class="store-list-container" flexDirection="column">
        <TextLabel @tap="selectStore(store)" v-for="store in $store.getters['stores/getStores']" :key="store.id" :content="store.information.title" class="store-list-container__store"/>
      </FlexboxLayout>
      <FlexboxLayout v-else class="loader" flexDirection="column">
        <TextLabel content="Loading..." class="loader__item"/>
      </FlexboxLayout>
    </Page>
</template>

<script>
const appSettings = require("tns-core-modules/application-settings");

import Index from './Index';
import config from '../config/config.json';

import TextLabel from './atoms/TextLabel'

export default {
  components: {
    Index, TextLabel
  },
  mounted() {
    this.fetchStores();
  },
  computed: {
    isLoaded() {
      return this.$store.getters['stores/isStoresLoaded'];
    }
  },
  methods: {
    async fetchStores() {
      try {
        const response = await fetch(`${config.apiUrl}/stores`, {
          method: "GET",
        });
        const stores = await response.json();
        this.$store.commit('stores/setStores', stores);
        
        this.selectStore(stores[0]); // to be removed
        
      } catch (e) {
        console.error("Couldn't load the Stores (shops):", e);
      }
      
    },
    selectStore(storeSelected) {
      this.$store.commit('navigation/setMenu', storeSelected.navigations);
      this.$store.commit('stores/setStoreSelected', storeSelected);
      appSettings.setNumber(config.views.Settings.localisation.storageName, storeSelected.id);
      // load everything
      this.$navigateTo(Index,{
        animated: true,
        transition: {
          name: "slideLeft",
          duration: 200,
          curve: "easeIn"
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
.select-page {
  background: linear-gradient(to bottom, $secondary-color, $primary-color);
  .store-list-container {
    height: 100%;
    width: 100%;
    padding: 20;
    justify-content: center;
    &__store {
      border-width: 1;
      border-radius: 5;
      font-weight: bold;
      border-color: white;
      margin: 10;
      width: 100%;
      padding: 10;
    }
  }
  .loader {
    padding: 20;
    justify-content: center;
    align-items: center;
    &__item {
      color: $text-color-primary;
    }
  }
}


</style>
