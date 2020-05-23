<template>
  <FlexboxLayout class="error">
      <Label class="fas" :text="icon"/>
      <Label class="message" :text="msg"/>
  </FlexboxLayout>
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
  flex-direction: column;
  height: 100%;
}
</style>
