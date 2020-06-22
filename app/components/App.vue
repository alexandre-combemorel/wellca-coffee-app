<template>
    <Page class="select-page" actionBarHidden="true">
        <FlexboxLayout class="select-page--container">
          <Image src="~/assets/images/logo-opening.png" class="select-page__image"/>
          <FlexboxLayout class="select-page__wrapper">
            <FlexboxLayout v-if="!loading" class="select-page__store-list-container">
              <Button :type="['square', 'h1']" v-on:tap="selectStore(store)" v-for="store in $store.getters['stores/getStores']" :key="store.id" :content="store.information.title" class="select-page__store-list-container__store"/>
            </FlexboxLayout>
            <FlexboxLayout v-else class="select-page__loader">
              <TextLabel content="Loading..." class="select-page__loader__item"/>
            </FlexboxLayout>
          </FlexboxLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
const appSettings = require("tns-core-modules/application-settings");

import Index from './Index';
import config from '../config/config.json';

import Button from './atoms/Button'
import TextLabel from './atoms/TextLabel'

export default {
  components: {
    Index, Button, TextLabel
  },
  data() {
    return {
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    if (!this.$store.getters['stores/isStoresLoaded']) await this.fetchStores();
    this.loading = false;
    const storeId = appSettings.getNumber(config.views.Settings.localisation.storageName);
    if (storeId) {
      const storeFound = this.$store.getters['stores/getStores'].find(store => store.id === storeId);
      storeFound && this.selectStore(storeFound);
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
      } catch (e) {
        console.error("Couldn't load the Stores (shops):", e);
      }
    },
    async selectStore(storeSelected) {
      this.loading = true;
      try {
        this.$store.commit('navigation/setMenu', storeSelected.navigations);
        this.$store.commit('stores/setStoreSelected', storeSelected);
        setTimeout(() => {
          appSettings.setNumber(config.views.Settings.localisation.storageName, storeSelected.id);
          this.$navigateTo(Index,{
            animated: true,
            transition: {
              name: "slideLeft",
              duration: 100,
              curve: "easeIn"
            }
          });
          this.loading = false;
        }, 100)
      } catch (e) {
        console.log("selectStore -> e", e)
      }
      
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
.select-page {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, $secondary-color, $primary-color);
  &--container {
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__image {
    margin-bottom: $size-xl;
    width: 256;
  }
  &__wrapper {
    height: 200;
  }
  &__store-list-container {
    flex-direction: column;
    width: 80%;
    justify-content: center;
    &__store {
      padding-bottom: $size-l;
    }
  }
  &__loader {
    padding: 20;
    justify-content: center;
    align-items: center;
    &__item {
      color: $text-color-primary;
    }
  }
}


</style>
