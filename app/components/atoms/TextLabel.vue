<template>
  <Label :text="content" class="text-label" :class="type || 'p'" @tap="$emit('tap')"/>
</template>

<script>
export default {
  props: ['content', 'type']
}
</script>

<style>
</style>