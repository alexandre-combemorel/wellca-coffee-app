<template>
  <Page class="index" actionBarHidden="true">
    <AbsoluteLayout class="index__wrapper">
      <GridLayout class="index__wrapper__gridmain" columns="auto, *" rows="*, auto">
        <GridLayout :columns="columsDefinition" class="index__wrapper__gridmain__views-container" ref="views-container" colSpan="2" row="0">
          <StackLayout v-for="(item, index) in $store.getters.getMenu" :col="index" :key="index" class="index__wrapper__gridmain__views-container__view">
            <component :is="item.component || 'Error'"/>
          </StackLayout>
        </GridLayout>

        <Navigation v-on:selected="onSelectMenu" row="2" colSpan="2"/>
      </GridLayout>
      <SliderBottom class="index__wrapper__slider-bottom"/>
    </AbsoluteLayout>
  </Page>
</template>

<script>
import Navigation from '../molecules/Navigation';
import Error from './Error';
import SliderBottom from '../modules/SliderBottom';

//Views
import Settings from './Settings';
import Menu from './Menu';

export default {
  components: {
    Navigation, Settings, Error, SliderBottom, Menu
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
      for (let i = 1; i < this.$store.getters.getMenu.length ; i++) {
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
.index {
  background: #242424;
  &__wrapper {
    &__gridmain {
      width: 100%;
      height: 100%;
      color: white;
      &__views-container {
        &__view {
          width: 100%;
          height: 100%;
          padding: 10;
        }
      }
    }
    &__slider-bottom {
      bottom: 0;
      height: 100%;
    }
  }
}


</style>
