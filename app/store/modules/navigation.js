const moduleNavigation = {
  namespaced: true,
  state: {
    menu: [],
  },
  mutations: {
    setMenu(state, menuParam){
      state.menu = menuParam;
    },
    changeActiveMenu(state, indexParam) {
      state.menu = state.menu.map((item, index) => {
        item.active = index === indexParam;
        return item;
      });
    },
    changeSelectedMenu(state, indexParam) {
      state.menu = state.menu.map((item, index) => {
        item.selected = index === indexParam;
        item.active = index === indexParam;
        return item;
      });
    },
  },
  actions: {},
  getters: {
    getMenu: state => {
      return state.menu.map(item => {
        return {
          ...item,
          icon: String.fromCharCode(`0x${item.icon}`)
        };
      });
    },
    isMenuLoaded: state => {
      return state.menu.length > 0;
    },
    indexItemCurrentlyActive: state => {
      let indexActive = 0;
      state.menu.forEach((item, index) => {
        if (item.active === true) indexActive = index;
      });
      return indexActive;
    },
    indexItemCurrentlySelected: state => {
      let indexSelected = 0;
      state.menu.forEach((item, index) => {
        if (item.selected === true) indexSelected = index;
      });
      return indexSelected;
    },
    getMenuSelected: state => state.menu.find(item => item.selected)?.component
  }
}

export default moduleNavigation;