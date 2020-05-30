import dateUtils from '../../utils/date';
const moduleCalendar = {
  namespaced: true,
  state: {
    events: [],
  },
  mutations: {
    setEvents(state, events) {
      events = formatDateForEvent(events);
      state.events = events;
    },
    setEventsRecurrent(state, data) {
      data.events = formatDateForEvent(data.events);
      data.events.forEach(event => {
        const diffTimeBetweenStartEnd = event.date_end.getTime() - event.date_start.getTime();
        const matchingDateStart = data.dateRange.find(date => date.getDay() === event.date_start.getDay());
        const matchingDateEnd = data.dateRange.find(date => date.getDay() === event.date_end.getDay());
        if (matchingDateStart) {
          event.date_start = new Date(matchingDateStart.getFullYear(), matchingDateStart.getMonth(), matchingDateStart.getDate(), event.date_start.getHours(), event.date_start.getMinutes());
          event.date_end = new Date(event.date_start.getTime()+diffTimeBetweenStartEnd);
        } else if (matchingDateEnd) {
          event.date_end = new Date(matchingDateEnd.getFullYear(), matchingDateEnd.getMonth(), matchingDateEnd.getDate(), event.date_end.getHours(), event.date_end.getMinutes());
          event.date_start = new Date(event.date_end.getTime()-diffTimeBetweenStartEnd);
        }
      });
      state.events = [...state.events, ...data.events];
    }
  },
  actions: {},
  getters: {
    isDayWithEvent: state => dateDay => {
      return state.events && state.events.filter(event => {
        const startDay = new Date(event.date_start.getFullYear(), event.date_start.getMonth(), event.date_start.getDate());
        const endDay = new Date(event.date_end.getFullYear(), event.date_end.getMonth(), event.date_end.getDate());
        const selectedDay = new Date(dateDay.getFullYear(), dateDay.getMonth(), dateDay.getDate());
        return startDay.getTime() <= selectedDay.getTime() && selectedDay.getTime() <= endDay.getTime();
      }).length;
    },
    getEventsForTheDay: state => dateDay => {
      return state.events && state.events.filter(event => {
        const startDay = new Date(event.date_start.getFullYear(), event.date_start.getMonth(), event.date_start.getDate());
        const endDay = new Date(event.date_end.getFullYear(), event.date_end.getMonth(), event.date_end.getDate());
        const selectedDay = new Date(dateDay.getFullYear(), dateDay.getMonth(), dateDay.getDate());
        return startDay.getTime() <= selectedDay.getTime() && selectedDay.getTime() <= endDay.getTime();
      });
    },
    getFirstDateDayWithEvent: state => {
      let earliestDateDay = Infinity;
      state.events.forEach(event => {
        if (event.date_start.getTime() < earliestDateDay) {
          earliestDateDay = event.date_start.getTime();
        }
      });
      return earliestDateDay !== Infinity ? dateUtils.simplifyDate(new Date(earliestDateDay)) : undefined;
    },
  }
}

const formatDateForEvent = (events) => {
  return events.map(event => {
    event.date_start = new Date(event.date_start);
    event.date_end = new Date(event.date_end);
    return event;
  })
};

export default moduleCalendar;