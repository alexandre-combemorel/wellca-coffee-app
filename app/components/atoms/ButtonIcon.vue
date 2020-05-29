<template>
  <AbsoluteLayout>
    <Label :text="icon" class="button-icon" :class="`${options} ${type || 'fas'}`" @tap="emitToParent"/>
    <Label v-show="isActive" class="dot-active"/>
  </AbsoluteLayout>
</template>

<script>
export default {
  props: ["options", "codeicon", "isActive", "type"],
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
@import '~/assets/css/variables.scss';
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
  &.size-small {
    width: 18;
    height: 18;
    font-size: 15;
  }
}
.dot-active {
  background: $active-state;
  width: 12;
  height: 12;
  border-radius: 50;
  z-index: 1;
  top: 16;
  left: 18;
}
</style>