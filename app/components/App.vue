<template>
    <Page>
        <ActionBar title="Welcome to Wellca-Coffee-Vue!"/>
        <GridLayout class="gridmain" columns="auto, *" rows="*, auto">
            <Label class="icon fas" :text="icon" col="0" row="0"/>
            <Label class="message" :text="`menu selected: ${whenMenuChange}`" col="1" row="0"/>

            <Navigation row="1" colSpan="2"/>
        </GridLayout>
    </Page>
</template>

<script>
  import Navigation from './Navigation';
  export default {
    components: {
      Navigation
    },
    data() {
      return {
        icon: String.fromCharCode('0xf015')
      }
    },
    computed: {
      whenMenuChange() {
        return this.$store.getters.indexItemCurrentlySelected;
      }
    }
  }
</script>

<style scoped lang="scss">
Page {
  background: #242424;
  ActionBar {
    background-color: #bdbdbd;
    color: #ffffff;
  }
  .gridmain {
    width: 100%;
    color: white;
    .icon {
    }
    .message {
      font-size: 20;
    }
  }
}


</style>
