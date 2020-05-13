<template>
    <Page class="select-page">
      <FlexboxLayout v-if="isLoaded" class="store-list-container" flexDirection="column">
        <Label @tap="selectStore(store)" v-for="store in $store.getters.getStores" :key="store.id" :text="store.information.title" class="store-list-container__store"/>
      </FlexboxLayout>
      <FlexboxLayout v-else class="loader" flexDirection="column">
        <Label text="Loading..." class="loader__item"/>
      </FlexboxLayout>
    </Page>
</template>

<script>
  import Index from './views/Index';

  export default {
    components: {
      Index
    },
    mounted() {
      this.fetchStores();
    },
    computed: {
      isLoaded() {
        return this.$store.getters.isStoresLoaded;
      }
    },
    methods: {
      async fetchStores() {
        try {
          const response = await fetch("https://app.wellcacoffee.com/stores", {
            method: "GET",
          });
          const stores = await response.json();
          this.$store.commit('setStores', stores);
          this.selectStore(stores[0]);
          
        } catch (e) {
          console.error("Couldn't load the Stores (shops):", e);
        }
        
      },
      selectStore(storeSelected) {
        this.$store.commit('setMenu', storeSelected.navigations);
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
.select-page {
  background: #242424;
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
      color: white;
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
      color: white;
    }
  }
}


</style>
