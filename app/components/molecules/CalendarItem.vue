<template>
  <StackLayout class="calendar-item" :class="state" @tap="emitToParent">
    <TextLabel :content="day" class="calendar-item__day"/>
    <TextLabel :text="date" class="calendar-item__date"/>
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
      return this.dateObj ? this.dateObj.getDate() : "00";
    },
    month() {
      return this.dateObj ? this.arrayMonthName[this.dateObj.getMonth()] : "ProbM";
    }
  },
  methods: {
    emitToParent() {
      !this.state.includes("disabled") && this.$emit('datetap', this.dateObj);
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
.calendar-item {
  width: 36;
  text-align: center;
  margin-right: $size-s;
  &__date {
    padding-top: 6;
    height: 36;
    margin: $size-xs 0;
    border-color: white;
    border-width: 2;
    border-radius: 50;
    font-size: 16;
  }
  &.disabled {
    .p {
      color: #B3B3B3;
    }
    .calendar-item__date {
      border-color: #B3B3B3;
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