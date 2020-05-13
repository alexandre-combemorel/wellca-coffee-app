<template>
  <StackLayout class="text-block">
    <Label class="text-block__content" :text="data" textWrap="true"/>
  </StackLayout>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style scoped lang="scss">
.text-block {
  width: 100%;
  &__content {
    width: 100%;
  }
}
</style>