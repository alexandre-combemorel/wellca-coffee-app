<template>
  <StackLayout class="calendar-item" :class="state" @tap="emitToParent">
    <TextLabel :content="day" class="calendar-item__day"/>
    <AbsoluteLayout class="calendar-item__date">
      <TextLabel :text="date" class="calendar-item__date__item"/>
    </AbsoluteLayout>
    <TextLabel :content="month" class="calendar-item__month"/>
  </StackLayout>
</template>

<script>
import TextLabel from '../atoms/TextLabel'

import dateUtils from '../../utils/date';
export default {
  components: {
    TextLabel
  },
  props: ["state", "dateObj"],
  data() {
    return {
      arrayDayName: dateUtils.dayOfTheWeekShort,
      arrayMonthName: dateUtils.monthOfTheYearShort
    };
  },
  computed: {
    day() {
      return this.dateObj ? this.arrayDayName[this.dateObj.getDay()] : "ProbD";
    },
    date() {
      let date = this.dateObj ? this.dateObj.getDate() : "00"
      return date < 10 ? `0${date}` : date;
    },
    month() {
      return this.dateObj ? this.arrayMonthName[this.dateObj.getMonth()] : "ProbM";
    }
  },
  methods: {
    emitToParent() {
      this.$emit('datetap', this.dateObj);
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
.calendar-item {
  width: 36;
  text-align: center;
  &__date {
    height: 34;
    border-color: white;
    border-width: 2;
    border-radius: 50;
    font-size: 16;
    &__item {
      width: 20;
      top: 6;
      left: 6;
    }
  }
  &.disabled {
    .p {
      color: $disable-state;
    }
    .calendar-item__date {
      border-color: $disable-state;
    }
  }
  &.active {
    .calendar-item__date {
      background: $active-state;
      border-color: $active-state;
    }
  }
}
</style>