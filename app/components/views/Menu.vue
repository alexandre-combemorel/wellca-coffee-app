<template>
  <AbsoluteLayout class="menu">
    <BackArrow class="menu__back-btn" v-on:taped="showMenuAll"/>
    <MenuAll v-show="isMenuAllVisibile" :type_selected="item.type_selected"/>
    <MenuDetail v-show="!isMenuAllVisibile" :is-display="!isMenuAllVisibile" :type_selected="item.type_selected"/>
  </AbsoluteLayout>
</template>

<script>
import config from '../../config/config.json'

import BackArrow from '../atoms/BackArrow';
import MenuDetail from './MenuDetail';
import MenuAll from './MenuAll';


export default {
  components: {
    BackArrow, MenuAll, MenuDetail
  },
  props: ['item'],
  watch: {
    isViewSelected(newVal, oldVal) {
      if (newVal && !this.$store.getters[`${this.item.type_selected}/isMenuLoaded`]) {
        this.fetchCarteItems();
      }
    },
  },
  computed: {
    isViewSelected() {
      return this.$store.getters['navigation/getMenuSelected'] === "Menu";
    },
    isMenuAllVisibile() {
      return this.$store.getters[`${this.item.type_selected}/getMenuItemSelected`] === undefined;
    },
  },
  methods: {
    async fetchCarteItems() {
      try {
        // Fetch the items
        const response = await fetch(`${config.apiUrl}/carte-items?carte_type.name=${this.item.type_selected}&stores.id=${this.$store.getters['stores/getStoreSelected'].id}`, { method: "GET" });
        this.$store.commit(`${this.item.type_selected}/setItems`, await response.json())
      } catch (e) {
        console.error("Couldn't load the carte items:", e);
      }
    },
    showMenuAll() {
      this.$store.commit(`${this.item.type_selected}/setMenuItemSelected`, undefined);
    },
  }
}
</script>

<style scoped lang="scss">
.menu {
  width: 100%;
  height: 100%;
  &__back-btn {
    z-index: 1;
  }
  
}
</style>