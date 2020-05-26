<template>
  <Label :text="icon" class="button-icon fas" :class="options" @tap="emitToParent"/>
</template>

<script>
export default {
  props: ["options", "codeicon"],
  computed: {
    icon() {
      return String.fromCharCode(`0x${this.codeicon}`);
    }
  },
  methods: {
    emitToParent(args) {
      this.$emit('icontapped', args);
    }
  }
}
</script>

<style scoped lang="scss">
.button-icon {
  width: 40;
  height: 30;
  font-size: 25;
  &.borders {
    border-color: white;
    border-width: 2;
    border-radius: 50;
  }
  &.size-medium {
    width: 36;
    height: 36;
    font-size: 22;
    padding: 5;
  }
}
</style>