<template>
    <Page class="home">
        <ActionBar title="Welcome to Wellca-Coffee-Vue!"/>
        <GridLayout class="gridmain" columns="auto, *" rows="auto, *, auto">
            <Label class="icon fas" :text="icon" col="0" row="0"/>
            <Label class="message" :text="`menu selected: ${whenMenuChange}`" col="1" row="0"/>
            <GridLayout :columns="columsDefinition" class="views-container" ref="views-container" colSpan="2" row="1">
              <StackLayout v-for="(item, index) in $store.state.menu" :col="index" :key="index" class="views-container__view">
                <component :is="item.component || 'Error'"/>
              </StackLayout>
            </GridLayout>

            <Navigation v-on:selected="onSelectMenu" row="2" colSpan="2"/>
        </GridLayout>
    </Page>
</template>

<script>
  import Navigation from '../molecules/Navigation';
  import Settings from './Settings';
  import Error from './Error';

  export default {
    components: {
      Navigation, Settings, Error
    },
    data() {
      return {
        icon: String.fromCharCode('0xf015')
      }
    },
    computed: {
      whenMenuChange() {
        return this.$store.getters.indexItemCurrentlySelected;
      },
      columsDefinition() {
        let columns = "auto";
        for (let i = 1; i < this.$store.state.menu.length ; i++) {
          columns += ", auto"
        }
        return columns;
      },
    },
    methods: {
      onSelectMenu() {
        const containerEl = this.$refs['views-container'];
        const space = containerEl.nativeView.getActualSize().width;
        containerEl.childNodes.forEach(viewElement => {
          viewElement.nativeView.animate({
            translate: { x: this.$store.getters.indexItemCurrentlySelected*-space, y: 0 },
            duration: 200
          })
        });
      },
    }
  }
</script>

<style scoped lang="scss">
.home {
  background: #242424;
  ActionBar {
    background-color: #bdbdbd;
    color: #ffffff;
  }
  .views-container {
    &__view {
      width: 100%;
      height: 100%;
      padding: 10;
    }
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
