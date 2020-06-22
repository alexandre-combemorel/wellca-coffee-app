<template>
  <FlexboxLayout ref="tile-image" class="tile-image" :class="[ `tile-image--${size}`, zoomed ? 'zoom-on' : 'zoom-off' ]">
    <ImageCacheIt class="tile-image__image" stretch="fill"
			:width="width"
      :height="height"
      :src="img"/>
    <Title v-if="maintext" :content="maintext" type="h3" class="tile-image__main-text"/>
    <TextLabel :content="secondtext" type="hashtag" class="tile-image__second-text"/>
  </FlexboxLayout>
</template>

<script>
import utils from '../../utils/all';
import Title from '../atoms/Title';
import TextLabel from '../atoms/TextLabel';

export default {
  props: ['img', 'maintext', 'secondtext', 'size', 'zoomed'],
  components: {
    Title, TextLabel
  },
  computed: {
    width() {
      if(this.size === "small") {
        return 133;
      } else {
        return 180;
      }
    },
    height() {
      if(this.size === "small") {
        return 133;
      } else {
        return 180;
      }
    }
  },
  async mounted() {
    const size = await utils.returnSizeWhenNativeViewLoaded(this.$refs['tile-image'].nativeView);
    this.$emit("sizecomponent", size);
  },
}
</script>

<style scoped lang="scss">
.tile-image {
  flex-direction: column;
  width: 180;
  height: 100%;
  align-items: center;
  justify-content: center;
  &--small {
    &.zoom-off {
      .tile-image__image {
        animation-name: zoomOff;
        animation-duration: 0.15s;
        animation-fill-mode: forwards;
      }
    }
    &.zoom-on {
      .tile-image__image {
        animation-name: zoomOn;
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
@keyframes zoomOn {
    from { transform: scale(1); }
    to { transform: scale(1.3); }
}
@keyframes zoomOff {
    from { transform: scale(1.3); }
    to { transform: scale(1); }
}
</style>