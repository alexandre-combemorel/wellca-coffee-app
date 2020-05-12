<template>
  <AbsoluteLayout v-if="$store.getters.getComponentSelected" @swipe="closeSliderFromSwipe" ref="slider-bottom" class="slider-bottom">
    <FlexboxLayout class="slider-bottom__background"></FlexboxLayout>
    <GridLayout columns="*, auto" rows="auto, auto" class="slider-bottom__content">
      <Label row="0" col="0" class="slider-bottom__content__title" :text="$store.getters.getComponentTitle"/>
      <Label row="0" col="1" class="slider-bottom__content__close" text="Close" @tap="closeSlider"/>
      <component :is="$store.getters.getComponentSelected" :data="$store.getters.getDataSliderBottom" row="1" colSpan="2"/>
    </GridLayout>
  </AbsoluteLayout>
</template>

<script>
const platformModule = require("tns-core-modules/platform");

import TextBlock from '../atoms/TextBlock'

export default {
  components: {
    TextBlock
  },
  data: {
    heightScreen: undefined,
  },
  mounted() {
    this.heightScreen = platformModule.screen.mainScreen.heightDIPs;
  },
  methods: {
    closeSliderFromSwipe(args) {
      if (args.direction === 8) {
        this.closeSlider();
      }
    },
    async closeSlider() {
      await this.$refs['slider-bottom'].nativeView.animate({
        translate: { x: 0, y: this.heightScreen },
        duration: 150
      });
      this.$store.commit("resetSliderBottom");
    }
  }
}
</script>

<style scoped lang="scss">
.slider-bottom {
  width: 100%;
  height: 100%;
  top: 5;
  &__content {
    top: 0;
    left: 0;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 10 15;
    &__title {
      color: black;
    }
    &__core {
      background: red;
    }
  }
  &__background {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 15 15 0 0;
    opacity: 0.9;
  }
}
</style>