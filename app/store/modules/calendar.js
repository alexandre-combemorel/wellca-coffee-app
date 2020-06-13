import dateUtils from '../../utils/date';
import cloneDeep from 'lodash.clonedeep';
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
      const listEventReccurent = [];
      data.dateRange.forEach(dateDay => {
        data.events.forEach(event => {
          const diffTimeBetweenStartEnd = event.date_end.getTime() - event.date_start.getTime();
          const matchingDateStart = dateDay.getDay() === event.date_start.getDay() && dateDay;
          const matchingDateEnd = dateDay.getDay() === event.date_end.getDay() && dateDay;
          
          const eventCopy = cloneDeep(event);
          if (matchingDateStart) {
            eventCopy.date_start = new Date(matchingDateStart.getFullYear(), matchingDateStart.getMonth(), matchingDateStart.getDate(), eventCopy.date_start.getHours(), eventCopy.date_start.getMinutes());
            eventCopy.date_end = new Date(eventCopy.date_start.getTime()+diffTimeBetweenStartEnd);
          } else if (matchingDateEnd) {
            eventCopy.date_end = new Date(matchingDateEnd.getFullYear(), matchingDateEnd.getMonth(), matchingDateEnd.getDate(), eventCopy.date_end.getHours(), eventCopy.date_end.getMinutes());
            eventCopy.date_start = new Date(eventCopy.date_end.getTime()-diffTimeBetweenStartEnd);
          }

          // Does the event has already been created for this week
          const isAlreadyExisting = !!listEventReccurent.find(event => event.date_start.getTime() === eventCopy.date_start.getTime() && event.date_end.getTime() === eventCopy.date_end.getTime());
          ((matchingDateStart || matchingDateEnd) && !isAlreadyExisting) && listEventReccurent.push(eventCopy);
        });
      });
      state.events = [...state.events, ...listEventReccurent];
    }
  },
  actions: {},
  getters: {
    isDayWithEvent: state => dateDay => {
      return state.events && !!state.events.filter(event => {
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