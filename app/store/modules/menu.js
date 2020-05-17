const moduleMenu = {
  namespaced: true,
  state: {
    categories: [],
    items: [],
    menuLoaded: false,
    categorySelected: 0,
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
    setCategorySelected(state, categorySelected) {
      state.categorySelected = categorySelected;
    },
    setMenuItemSelected(state, menuItemSelected) {
      state.menuItemSelected = menuItemSelected;
    }
  },
  actions: {},
  getters: {
    isMenuLoaded: state => state.menuLoaded,
    getCategories: state => state.categories,
    getCategorySelected: state => state.categorySelected,
    getCategory: (state) => {
      return (cateSelected) => state.categories.filter(category => category.id === cateSelected);
    },
    getItems: state => state.items,
    getMenuItemSelected: state => state.menuItemSelected,
  }
}
export default moduleMenu;