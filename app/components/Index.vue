<template>
  <Page class="index" actionBarHidden="true">
    <AbsoluteLayout class="index__wrapper">
      <GridLayout class="index__wrapper__gridmain" rows="*, auto">
        <GridLayout row="0" :columns="columsDefinition" class="index__wrapper__gridmain__views-container" ref="views-container">
          <StackLayout v-for="(item, index) in $store.getters['navigation/getMenu']" :col="index" :key="index" class="index__wrapper__gridmain__views-container__view">
            <component :is="item.component || 'Error'" :item="item"/>
          </StackLayout>
        </GridLayout>

        <Navigation v-on:selected="onSelectMenu" row="1" class="navigation" ref="navigation"/>
      </GridLayout>
      <SliderBottom class="index__wrapper__slider-bottom"/>
    </AbsoluteLayout>
  </Page>
</template>

<script>
import Navigation from './modules/Navigation';
import SliderBottom from './modules/SliderBottom';
import notification from '../notification';

//Views
import Settings from './views/Settings';
import Home from './views/Home';
import Menu from './views/Menu';
import Error from './views/Error';

import utils from '../utils/all';

export default {
  components: {
    Navigation, Settings, Error, SliderBottom, Menu, Home
  },
  data() {
    return {
      viewsContainerView: undefined,
    }
  },
  async mounted() {
    await utils.returnSizeWhenNativeViewLoaded(this.$refs['views-container'].nativeView);
    this.viewsContainerView = this.$refs['views-container'].nativeView;
    // init notification
    notification.init();
  },
  computed: {
    whenMenuChange() {
      return this.$store.getters['navigation/indexItemCurrentlySelected'];
    },
    columsDefinition() {
      let columns = "auto";
      for (let i = 1; i < this.$store.getters['navigation/getMenu'].length ; i++) {
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
          translate: { x: this.$store.getters['navigation/indexItemCurrentlySelected']*-space, y: 0 },
          duration: 200
        })
      });
    },
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
.index {
  
  &__wrapper {
    background: $primary-color;
    &__gridmain {
      width: 100%;
      height: 100%;
      &__views-container {
        background: linear-gradient(to bottom, $secondary-color, $primary-color);
        width: 100%;
        height: 100%;
        &__view {
          width: 100%;
          height: 100%;
        }
      }
    }
    &__slider-bottom {
      height: 100%;
    }
  }
}


</style>
