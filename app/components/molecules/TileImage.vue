<template>
  <FlexboxLayout ref="tile-image" class="tile-image" :class="[ `tile-image--${size}`, zoomed ? 'zoomed' : '' ]">
    <Image :src="img" class="tile-image__image"/>
    <Label v-if="maintext" :text="maintext" class="tile-image__main-text"/>
    <Label v-if="secondtext" :text="secondtext" class="tile-image__second-text"/>
  </FlexboxLayout>
</template>

<script>
import utils from '../../utils/all';

export default {
  props: ['img', 'maintext', 'secondtext', 'size', 'zoomed'],
  async mounted() {
    this.$emit("sizecomponent", await utils.returnSizeWhenNativeViewLoaded(this.$refs['tile-image'].nativeView));
  }
}
</script>

<style scoped lang="scss">
.tile-image {
  flex-direction: column;
  width: 170;
  align-items: center;
  justify-content: center;
  &__image {
    width: 100%;
  }
  &--small {
    .tile-image__image {
      margin-top: 20;
      width: 70%;
    }
    &.zoomed {
      .tile-image__image {
        animation-name: zoom;
        animation-duration: 0.15s;
        animation-fill-mode: forwards;
      }
    } 
  }
  &__main-text {
    width: 90%;
    font-size: 16;
  }
  &__second-text {
    width: 90%;
    font-size: 10;
  }
}
@keyframes zoom {
    from { transform: scale(1); }
    to { transform: scale(1.5); }
}
</style>