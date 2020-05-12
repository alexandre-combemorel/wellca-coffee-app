const moduleSliderBottom = {
  state: {
    componentSelected: undefined,
    componentTitle: undefined,
    dataSliderBottom: undefined,
  },
  mutations: {
    setSliderComponentState(state, data) {
      state.componentTitle = data.title;
      state.dataSliderBottom = data.data;
      state.componentSelected = data.componentName;
    },
    resetSliderBottom(state) {
      state.componentSelected = undefined;
    }
  },
  actions: {},
  getters: {
    getComponentSelected: state => state.componentSelected,
    getComponentTitle: state => state.componentTitle,
    getDataSliderBottom: state => state.dataSliderBottom
  }
}
export default moduleSliderBottom;