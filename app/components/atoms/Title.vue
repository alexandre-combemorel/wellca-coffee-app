<template>
  <Label class="title" :text="content"/>
</template>

<script>
export default {
  props: ["content"],
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
.title {
  font-size: $title-size;
}
</style>