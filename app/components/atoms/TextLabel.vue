<template>
  <Label :text="content" class="text-label" :class="type"/>
</template>

<script>
export default {
  props: ['content', 'type']
}
</script>

<style>
</style>