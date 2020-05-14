const moduleMenu = {
  namespaced: true,
  state: {
    categories: [],
    items: [],
    menuLoaded: false,
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setMenuLoaded(state, isLoaded) {
      console.log("isLoaded", isLoaded);
      state.menuLoaded = isLoaded;
    },
  },
  actions: {},
  getters: {
    isMenuLoaded: state => state.menuLoaded,
    getCategories: state => state.categories,
    getCategory: (state, cateSelected) => {
      return state.categories.filter(category => category.id === cateSelected);
    },
    getItems: state => state.items,
  }
}
export default moduleMenu;