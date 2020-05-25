const moduleCalendar = {
  namespaced: true,
  state: {
    events: [],
  },
  mutations: {
    setEvents(state, events) {
      events = events.map(event => {
        event.date_start = new Date(event.date_start);
        event.date_end = new Date(event.date_end);
        return event;
      })
      state.events = events;
    },
  },
  actions: {},
  getters: {
    getEvents: state => state.events,
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
    }
  }
}
export default moduleCalendar;