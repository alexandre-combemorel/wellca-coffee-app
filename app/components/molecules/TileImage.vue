<template>
  <FlexboxLayout class="tile-image">
    <Image :src="img" class="tile-image__image" :class="`tile-image--${setSize}`"/>
    <Label v-if="maintext" :text="maintext" class="tile-image__main-text"/>
    <Label v-if="secondtext" :text="secondtext" class="tile-image__second-text"/>
  </FlexboxLayout>
</template>

<script>
export default {
  props: ['img', 'maintext', 'secondtext', 'size'],
  computed: {
    setSize() {
      return this.size | 'normal';
    }
  }
}
</script>

<style scoped lang="scss">
.tile-image {
  flex-direction: column;
  width: 170;
  align-items: center;
  justify-content: center;
  &--normal {
    .tile-image__image {
      width: 50;
    }
  }
  &--small {
    .tile-image__image {
      width: 70%;
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
</style>