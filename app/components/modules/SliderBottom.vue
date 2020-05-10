<template>
  <AbsoluteLayout @swipe="closeSlider" ref="slider-bottom" class="slider-bottom">
    <FlexboxLayout class="slider-bottom__background"></FlexboxLayout>
    <GridLayout columns="*, auto" rows="auto, auto" class="slider-bottom__content">
      <Label row="0" col="0" class="slider-bottom__content__title" :text="title"/>
      <Label row="0" col="1" class="slider-bottom__content__close" text="Close"/>
    </GridLayout>
  </AbsoluteLayout>
</template>

<script>
const platformModule = require("tns-core-modules/platform");

export default {
  props: ["title"],
  data: {
    heightScreen: undefined,
  },
  mounted() {
    this.heightScreen = platformModule.screen.mainScreen.heightDIPs;
  },
  methods: {
    closeSlider(args) {
      if (args.direction === 8) {
        this.$refs['slider-bottom'].nativeView.animate({
          translate: { x: 0, y: this.heightScreen },
          duration: 150
        });
      }
      
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