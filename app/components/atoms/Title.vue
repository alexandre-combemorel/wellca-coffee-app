<template>
  <Label class="title" :text="content"/>
</template>

<script>
export default {
  props: ["content"],
}
</script>

<style>
.title {
  font-size: 24;
}
</style>