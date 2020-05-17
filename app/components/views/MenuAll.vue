<template>
  <AbsoluteLayout class="menu-all" ref="menu-all">
    <ScrollView orientation="vertical" class="menu-all__section">
      <StackLayout orientation="vertical" class="menu-all__section--wrapper">
        <StackLayout @tap="openActionCategorySelector()"><Title :content="categorySelectedName" class="menu-all__section__page-title"/></StackLayout>
        <StackLayout v-for="category in categoriesToDisplay" :key="category.id" orientation="vertical">
          <SectionTitle :content="category.name" class="menu-all__section__title"/>
          <FlexboxLayout orientation="horizontal" class="menu-all__section__items">
            <StackLayout @tap="openMenuDetail(menuItem)" v-for="menuItem in itemPerCategory(category.id)" :key="menuItem.id">
              <TileImage :maintext="menuItem.item.title" :secondtext="menuItem.item.sub_title" :img="returnImageUrl(menuItem.item.img[0].url)" class="menu-all__section__items__item"/>
            </StackLayout>
          </FlexboxLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
    <Label class="menu-all__gradient menu-all__gradient--top"/>
    <Label class="menu-all__gradient menu-all__gradient--bottom" ref="menu-all__gradient"/>
  </AbsoluteLayout>
</template>

<script>
import Title from '../atoms/Title';
import SectionTitle from '../molecules/SectionTitle';
import TileImage from '../molecules/TileImage';

import config from '../../config/config.json'
import utils from '../../utils/all';

export default {
  components: {
    Title, SectionTitle, TileImage
  },
  data() {
    return {
      allCategoryName: "NOS BOISSONS"
    };
  },
  mounted() {
    this.initGradientPosition();
  },
  computed: {
    categoriesToDisplay() {
      const categorySelectedId = this.$store.getters['menu/getCategorySelected'];
      if (categorySelectedId === 0) {
        return this.$store.getters['menu/getCategories'];
      } else {
        return this.$store.getters['menu/getCategory'](categorySelectedId);
      }
    },
    categorySelectedName() {
      let cateName = this.allCategoryName;
      const categorySelectedId = this.$store.getters['menu/getCategorySelected'];
      if (categorySelectedId !== 0) {
        cateName = this.$store.getters['menu/getCategory'](categorySelectedId)[0].name;
      }
      return cateName;
    }
  },
  methods: {
    async initGradientPosition() {
      const { height } = await utils.returnSizeWhenNativeViewLoaded(this.$refs['menu-all'].nativeView);
      this.$refs['menu-all__gradient'].nativeView.animate({
        translate: { x: 0, y: height-this.$refs['menu-all__gradient'].nativeView.getActualSize().height },
        duration: 0
      });
    },
    async openActionCategorySelector() {
      const categorySelectedParam = await action("Choisissez votre categorie", "Retour", [this.allCategoryName, ...this.$store.getters['menu/getCategories'].map(category => category.name)])
      const categorySelected = 
        categorySelectedParam === this.allCategoryName 
          ? 0 
          : this.$store.getters['menu/getCategories'].filter(category => category.name === categorySelectedParam)[0].id;
      this.$store.commit('menu/setCategorySelected', categorySelected);
    },
    itemPerCategory(cateId) {
      return this.$store.getters['menu/getItems'].filter(item => item.carte_category.id === cateId);
    },
    openMenuDetail(menuItem) {
      this.$store.commit("menu/setMenuItemSelected", menuItem);
    },
    returnImageUrl(path) {
      return utils.returnImageUrl(path);
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
.menu-all {
  height: 100%;
  width: 100%;
  &__section {
    width: 100%;
    height: 100%;
    &--wrapper {
      padding-bottom: $size-xxl;
    }
    &__page-title {
      margin-top: 130;
      margin-bottom: 50;
      text-align: center;
    }
    &__title {
      margin-top: 50;
    }
    &__items {
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      &__item {
        margin: $size-xs;
      }
    }
  }
  &__gradient {
    height: 40;
    width: 100%;
    &--top {
      background: linear-gradient(to top, rgba(23, 25, 28, 0), $primary-color);
    }
    &--bottom {
      background: linear-gradient(to bottom, rgba(23, 25, 28, 0), $primary-color);
    }
  }
}
</style>