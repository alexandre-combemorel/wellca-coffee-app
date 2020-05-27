<template>
  <StackLayout class="text-block">
    <Label class="text-block__content p" :class="type || 'p2'" :text="content" textWrap="true"/>
  </StackLayout>
</template>

<script>
export default {
  props: ['content', 'type']
}
</script>

<style scoped lang="scss">
.text-block {
  width: 100%;
  &__content {
    width: 100%;
    .p1 {
      font-size: 21;
    }
    .p2 {
      font-size: 17;
    }
  }
}
</style>