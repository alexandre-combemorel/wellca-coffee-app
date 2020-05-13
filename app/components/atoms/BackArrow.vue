<template>
  <Label class="back-arrow" text="BACK" @tap="back"/>
</template>

<script>
export default {
  methods: {
    back() {
      this.$navigateTo(App,{
          animated: true,
          transition: {
            name: "slideRight",
            duration: 200,
            curve: "easeIn"
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.back-arrow {
  width: 100%;
  color: white;
}
</style>