<template>
  <AbsoluteLayout class="slider-bottom">
    <FlexboxLayout class="slider-bottom__background"></FlexboxLayout>
    <FlexboxLayout class="slider-bottom__content">
      <Label class="slider-bottom__content__title" :text="title"/>
    </FlexboxLayout>
  </AbsoluteLayout>
</template>

<script>
export default {
  props: ["title"]
}
</script>

<style scoped lang="scss">
.slider-bottom {
  width: 100%;
  height: 100%;
  &__content {
    top: 0;
    left: 0;
    flex-direction: column;
    width: 100%;
    height: 100%;
    &__title {
      color: black;
      background: green;
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
    opacity: 0.95;
  }
}
</style>