<template>
  <StackLayout class="button--wrapper">
    <Label :text="content" class="button btn" :class="[...addClasses, state, ...type]" @tap="pressed"/>
  </StackLayout>
</template>

<script>
export default {
  props: ['content', 'state', 'type'],
  data() {
    return {
      addClasses: [],
    };
  },
  methods: {
    pressed() {
      if (this.state === undefined || !this.state.includes("disabled")) {
        const pressClass = "button--press";
        this.addClasses = [pressClass];
        setTimeout(() => {
          this.addClasses = [];
        }, 150);
      }
      this.$emit("tap");
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
.button {
  border-width: 2;
  border-radius: 5;
  border-color: $tertiary-color;
  padding: $size-s;
  text-wrap: true;
  text-align: center;
  &--press {
    background: $tertiary-color;
    color: $text-color-secondary;
  }
  &.disabled {
    border-color: $disable-state;
    color: $disable-state;
  }
  &.square {
    border-radius: 0;
  }
}
</style>