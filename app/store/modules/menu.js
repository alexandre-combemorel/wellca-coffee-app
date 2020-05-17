const moduleMenu = {
  namespaced: true,
  state: {
    categories: [],
    items: [],
    menuLoaded: false,
    categorySelectedId: 0,
    menuItemSelected: undefined,
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
      state.menuItemSelected = items[1];
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
    getCategorySelected: state => state.categorySelectedId,
    getCategory: (state) => {
      return (cateSelected) => state.categories.filter(category => category.id === cateSelected);
    },
    getItems: state => state.items,
    getMenuItemSelected: state => state.menuItemSelected,
  }
}
export default moduleMenu;