<template>
  <Label class="title" :text="content" :class="type || 'h1'"/>
</template>

<script>
export default {
  props: ["content", "type"],
}
</script>

<style scoped lang="scss">
</style>