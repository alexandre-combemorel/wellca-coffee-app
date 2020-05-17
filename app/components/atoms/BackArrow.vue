<template>
  <Label class="back-arrow" text="BACK" @tap="$emit('taped')"/>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
.back-arrow {
  width: 100%;
  color: $tertiary-color;
}
</style>