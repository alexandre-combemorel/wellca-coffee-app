<template>
  <GridLayout class="settings" columns="auto, auto" rows="*, auto">
      <Label class="fas" :text="icon" col="0" row="0"/>
      <Label class="message" :text="msg" col="1" row="0"/>
  </GridLayout>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'settings',
        icon: String.fromCharCode('0xf015')
      }
    }
  }
</script>

<style scoped lang="scss">
.settings {
  color: white;
}
</style>
