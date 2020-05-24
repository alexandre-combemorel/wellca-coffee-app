<template>
  <StackLayout class="calendar-item" :class="state">
    <Label text="Mar" class="calendar-item__day"/>
    <Label text="20" class="calendar-item__date"/>
    <label text="Dec" class="calendar-item__month"/>
  </StackLayout>
</template>

<script>
export default {
  props: ["state"]
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
.calendar-item {
  width: 40;
  text-align: center;
  font-size: 14;
  margin-right: $size-l;
  &__date {
    padding-top: 6;
    height: 40;
    margin: $size-s 0;
    border-color: white;
    border-width: 2;
    border-radius: 50;
    font-size: 16;
  }
  &.disabled {
    color: #B3B3B3;
    .calendar-item__date {
      border-color: #B3B3B3;
    }
  }
}
</style>