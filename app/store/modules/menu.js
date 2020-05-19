const moduleMenu = {
  namespaced: true,
  state: {
    categories: [],
    items: [],
    menuLoaded: false,
    categorySelectedId: undefined,
    menuItemSelected: undefined,
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
      // state.menuItemSelected = items[1];// to be removed
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setMenuLoaded(state, isLoaded) {
      state.menuLoaded = isLoaded;
    },
    setCategorySelected(state, categorySelectedId) {
      state.categorySelectedId = categorySelectedId;
    },
    setMenuItemSelected(state, menuItemSelected) {
      state.menuItemSelected = menuItemSelected;
    }
  },
  actions: {},
  getters: {
    isMenuLoaded: state => state.menuLoaded,
    getCategories: state => state.categories,
    getCategorySelectedId: state => state.categorySelectedId,
    getCategorySelected: state => {
      let categorySelected = undefined;
      if (state.categorySelectedId) categorySelected = state.categories.filter(category => category.id === state.categorySelectedId)[0];
      return categorySelected;
    },
    getCategory: (state) => {
      return (cateSelected) => state.categories.filter(category => category.id === cateSelected);
    },
    getItems: state => state.items,
    getMenuItemSelected: state => state.menuItemSelected,
  }
}
export default moduleMenu;