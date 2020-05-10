<template>
  <Page class="home" actionBarHidden="true">
    <AbsoluteLayout class="home__wrapper">
      <GridLayout class="home__wrapper__gridmain" columns="auto, *" rows="*, auto">
        <GridLayout :columns="columsDefinition" class="home__wrapper__gridmain__views-container" ref="views-container" colSpan="2" row="0">
          <StackLayout v-for="(item, index) in $store.getters.getMenu" :col="index" :key="index" class="home__wrapper__gridmain__views-container__view">
            <component :is="item.component || 'Error'"/>
          </StackLayout>
        </GridLayout>

        <Navigation v-on:selected="onSelectMenu" row="2" colSpan="2"/>
      </GridLayout>
      <SliderBottom class="home__wrapper__slider-bottom"/>
    </AbsoluteLayout>
  </Page>
</template>

<script>
import Navigation from '../molecules/Navigation';
import Settings from './Settings';
import Error from './Error';
import SliderBottom from '../modules/SliderBottom';

export default {
  components: {
    Navigation, Settings, Error, SliderBottom
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
.home {
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
