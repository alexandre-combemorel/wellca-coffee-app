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
      let arrayCategories = [];
      items.forEach(i => {
        if (arrayCategories.filter(cate => cate.id === i.carte_category.id).length === 0) {
          arrayCategories.push(i.carte_category);
        }
      });
      state.categories = arrayCategories;
      // state.menuItemSelected = items[0];// to be removed
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