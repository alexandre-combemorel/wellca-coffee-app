<template>
  <Label class="back-arrow" text="BACK" @tap="$emit('taped')"/>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.back-arrow {
  width: 100%;
  color: white;
}
</style>