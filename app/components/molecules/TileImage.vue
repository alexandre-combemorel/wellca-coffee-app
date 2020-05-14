<template>
  <FlexboxLayout class="tile-image">
    <Image :src="img" class="tile-image__image"/>
    <Label v-if="maintext" :text="maintext" class="tile-image__main-text"/>
    <Label v-if="secondtext" :text="secondtext" class="tile-image__second-text"/>
  </FlexboxLayout>
</template>

<script>
export default {
  props: ['img', 'maintext', 'secondtext']
}
</script>

<style scoped lang="scss">
.tile-image {
  flex-direction: column;
  width: 150;
  align-items: center;
  &__image {
    width: 100%;
    height: 120;
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