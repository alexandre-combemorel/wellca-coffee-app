<template>
  <AbsoluteLayout ref="menu" class="menu">
    <BackArrow class="menu__back-btn" />
    <ScrollView orientation="vertical" class="menu__section">
      <StackLayout orientation="vertical">
        <StackLayout @tap="openActionCategorySelector()"><Title content="NOS BOISSON" class="menu__section__page-title"/></StackLayout>
        <StackLayout v-for="category in categoriesToDisplay" :key="category.id" orientation="vertical">
          <SectionTitle :content="category.name" class="menu__section__title"/>
          <FlexboxLayout orientation="horizontal" class="menu__section__items">
            <TileImage v-for="menuItem in itemPerCategory(category.id)" :key="menuItem.id" :maintext="menuItem.item.title" :secondtext="menuItem.item.sub_title" class="menu__section__items__item"/>
          </FlexboxLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
    <Label class="menu__gradient menu__gradient--top"/>
    <Label class="menu__gradient menu__gradient--bottom" ref="menu__gradient"/>
  </AbsoluteLayout>
</template>

<script>
import BackArrow from '../atoms/BackArrow';
import Title from '../atoms/Title';
import SectionTitle from '../molecules/SectionTitle';
import TileImage from '../molecules/TileImage';

import utils from '../../utils/all';

export default {
  components: {
    Title, SectionTitle, BackArrow, TileImage
  },
  data() {
    return {
      categories: [],
      items: [],
      categorySelected: 0,
    };
  },
  mounted() {
    this.initGradientPosition();
    this.fetchCarteItems();
  },
  computed: {
    categoriesToDisplay() {
      if (this.categorySelected === 0) {
        return this.categories;
      } else {
        return this.categories.filter(category => category.id === this.categorySelected);
      }
    }
  },
  methods: {
    async initGradientPosition() {
      const height = await utils.returnHeightWhenNativeViewLoaded(this.$refs['menu'].nativeView);
      this.$refs['menu__gradient'].nativeView.animate({
        translate: { x: 0, y: height-this.$refs['menu__gradient'].nativeView.getActualSize().height },
        duration: 0
      });
    },
    async fetchCarteItems() {
      try {
        let response;
        // Fetch the categories
        response = await fetch("https://app.wellcacoffee.com/carte-categories", { method: "GET" });
        this.categories = await response.json();
        // Fetch the items
        response = await fetch("https://app.wellcacoffee.com/carte-items", { method: "GET" });
        this.items = await response.json();
      } catch (e) {
        console.error("Couldn't load the carte items:", e);
      }
    },
    async openActionCategorySelector() {
      const all = "Toutes les categories";
      const categorySelectedParam = await action("Select your category", "Cancel", [all, ...this.categories.map(category => category.name)])
      this.categorySelected = categorySelectedParam === all ? 0 : this.categories.filter(category => category.name === categorySelectedParam)[0].id;
    },
    itemPerCategory(cateId) {
      return this.items.filter(item => item.carte_category.id === cateId);
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
  height: 100%;
  &__back-btn {
    z-index: 1;
  }
  &__section {
    width: 100%;
    height: 100%;
    &__page-title {
      margin-top: 130;
      margin-bottom: 50;
    text-align: center;
    }
    &__title {
      margin-top: 50;
    }
    &__items {
      flex-wrap: wrap;
      justify-content: space-around;
      width: 100%;
      &__item {
        margin: 20;
      }
    }
  }
  &__gradient {
    height: 40;
    width: 100%;
    background:red;
    &--top {
      background: linear-gradient(to top, rgba(255,255,255,0), #242424);
    }
    &--bottom {
      background: linear-gradient(to bottom, rgba(255,255,255,0), #242424);
    }
  }
}
</style>