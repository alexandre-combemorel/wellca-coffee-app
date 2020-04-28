<template>
  <GridLayout class="error" columns="auto, auto" rows="*, auto">
      <Label class="fas" :text="icon" col="0" row="0"/>
      <Label class="message" :text="msg" col="1" row="0"/>
  </GridLayout>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Error',
        icon: String.fromCharCode('0xf015')
      }
    }
  }
</script>

<style scoped lang="scss">
.error {
  color: white;
  background: grey;
}
</style>
