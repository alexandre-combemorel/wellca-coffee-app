const moduleSliderBottom = {
  namespaced: true,
  state: {
    componentSelected: undefined,
    componentTitle: undefined,
    dataSliderBottom: undefined,
    visible: false,
  },
  mutations: {
    setSliderComponentState(state, data) {
      state.componentTitle = data.title;
      state.dataSliderBottom = data.data;
      state.componentSelected = data.componentName;
    },
    showSlider(state) {
      state.visible = true;
    },
    hideSlider(state) {
      state.visible = false;
    },
    resetSliderBottom(state) {
      state.componentSelected = undefined;
    }
  },
  actions: {},
  getters: {
    getComponentSelected: state => state.componentSelected,
    getComponentTitle: state => state.componentTitle,
    getDataSliderBottom: state => state.dataSliderBottom,
    getSliderVisibility: state => state.visible
  }
}
export default moduleSliderBottom;