<template>
  <AbsoluteLayout class="menu">
    <BackArrow class="menu__back-btn" />
    <component is="MenuAll"/>
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
  watch: {
    isViewSelected(newVal, oldVal) {
      if (newVal && !this.$store.getters['menu/isMenuLoaded']) {
        this.fetchCarteItems();
      }
    },
  },
  computed: {
    isViewSelected() {
      return this.$store.getters['navigation/getMenuSelected'] === "Menu";
    },
  },
  methods: {
    async fetchCarteItems() {
      try {
        let response;
        // Fetch the categories
        response = await fetch(`${config.apiUrl}/carte-categories`, { method: "GET" });
        this.$store.commit("menu/setCategories", await response.json())
        // Fetch the items
        response = await fetch(`${config.apiUrl}/carte-items`, { method: "GET" });
        this.$store.commit("menu/setItems", await response.json())
      } catch (e) {
        console.error("Couldn't load the carte items:", e);
      }
    },
  }
}
</script>

<style scoped lang="scss">
.menu {
  height: 100%;
  &__back-btn {
    z-index: 1;
  }
  
}
</style>