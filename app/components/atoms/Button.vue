<template>
  <StackLayout class="button--wrapper">
    <Label :text="content" class="button" :class="addClasses" @tap="pressed"/>
  </StackLayout>
</template>

<script>
export default {
  props: ['content'],
  data() {
    return {
      addClasses: [],
    };
  },
  methods: {
    pressed() {
      const pressClass = "button--press";
      this.addClasses = [pressClass];
      setTimeout(() => {
        this.addClasses = [];
      }, 150);
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
  &--press {
    background: $tertiary-color;
    color: $text-color-secondary;
  }
}
</style>