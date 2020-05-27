<template>
  <AbsoluteLayout @swipe="closeSliderFromSwipe" ref="slider-bottom" class="slider-bottom">
    <FlexboxLayout class="slider-bottom__background"></FlexboxLayout>
    <GridLayout columns="*, auto" rows="auto, auto" class="slider-bottom__content">
      <Title row="0" col="0" class="slider-bottom__content__title" type="h2" :content="$store.getters['sliderBottom/getComponentTitle']"/>
      <ButtonIcon row="0" col="1" class="slider-bottom__content__close" codeicon="f057" v-on:icontapped="closeSlider"/>
      <component :is="$store.getters['sliderBottom/getComponentSelected']" class="slider-bottom__content__component" :content="$store.getters['sliderBottom/getDataSliderBottom']" row="1" colSpan="2"/>
    </GridLayout>
  </AbsoluteLayout>
</template>

<script>

import TextBlock from '../atoms/TextBlock'
import TextLabel from '../atoms/TextLabel'
import Title from '../atoms/Title'
import ButtonIcon from '../atoms/ButtonIcon'

export default {
  components: {
    TextBlock, TextLabel, ButtonIcon, Title
  },
  computed: {
    visibility() {
      return this.$store.getters['sliderBottom/getSliderVisibility'];
    }
  },
  watch: {
    async visibility(newVisibility) {
      const componentHeight = this.$refs['slider-bottom'].nativeView.getActualSize().height;
      if (newVisibility) {
        await this.$refs['slider-bottom'].nativeView.animate({
          translate: { x: 0, y: -componentHeight },
          duration: 150
        });
      } else {
        await this.$refs['slider-bottom'].nativeView.animate({
          translate: { x: 0, y: 0 },
          duration: 150
        });
        this.$store.commit("sliderBottom/resetSliderBottom");
      }
    }
  },
  methods: {
    closeSliderFromSwipe(args) {
      if (args.direction === 8) {
        this.closeSlider();
      }
    },
    closeSlider() {
      this.$store.commit("sliderBottom/hideSlider");
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
.slider-bottom {
  width: 100%;
  height: 100%;
  top: 5;
  margin-top: 100%;
  &__content {
    top: 0;
    left: 0;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: $size-m;
    &__close {
      text-align: right;
    }
    &__component {
      margin-top: $size-m;
    }
  }
  &__background {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $primary-color;
    border-radius: 15 15 0 0;
  }
}
</style>