<template>
  <StackLayout class="menu-all" ref="menu-all">
    <ScrollView orientation="vertical" class="menu-all__section">
      <StackLayout orientation="vertical">
        <StackLayout @tap="openActionCategorySelector()"><Title content="NOS BOISSON" class="menu-all__section__page-title"/></StackLayout>
        <StackLayout v-for="category in categoriesToDisplay" :key="category.id" orientation="vertical">
          <SectionTitle :content="category.name" class="menu-all__section__title"/>
          <FlexboxLayout orientation="horizontal" class="menu-all__section__items">
            <StackLayout @tap="openMenuDetail()" v-for="menuItem in itemPerCategory(category.id)" :key="menuItem.id">
              <TileImage :maintext="menuItem.item.title" :secondtext="menuItem.item.sub_title" :img="returnImageUrl(menuItem.item.img[0].url)" class="menu-all__section__items__item"/>
            </StackLayout>
          </FlexboxLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
    <Label class="menu-all__gradient menu-all__gradient--top"/>
    <Label class="menu-all__gradient menu-all__gradient--bottom" ref="menu-all__gradient"/>
  </StackLayout>
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
      categorySelected: 0,
    };
  },
  mounted() {
    this.initGradientPosition();
  },
  computed: {
    categoriesToDisplay() {
      if (this.categorySelected === 0) {
        return this.$store.getters['menu/getCategories'];
      } else {
        return this.$store.getters['menu/getCategory'](this.categorySelected);
      }
    }
  },
  methods: {
    async initGradientPosition() {
      const height = await utils.returnHeightWhenNativeViewLoaded(this.$refs['menu-all'].nativeView);
      this.$refs['menu-all__gradient'].nativeView.animate({
        translate: { x: 0, y: height-this.$refs['menu__gradient'].nativeView.getActualSize().height },
        duration: 0
      });
    },
    async openActionCategorySelector() {
      const all = "Toutes les categories";
      const categorySelectedParam = await action("Select your category", "Cancel", [all, ...this.$store.getters['menu/getCategories'].map(category => category.name)])
      this.categorySelected = categorySelectedParam === all ? 0 : this.$store.getters['menu/getCategories'].filter(category => category.name === categorySelectedParam)[0].id;
    },
    itemPerCategory(cateId) {
      return this.$store.getters['menu/getItems'].filter(item => item.carte_category.id === cateId);
    },
    returnImageUrl(pathUrl) {
      return `${config.apiUrl}${pathUrl}`;
    },
    openMenuDetail() {
      this.$navigateTo(MenuDetail, {
        animated: true,
        transition: {
          name: "slideRight",
          duration: 200,
          curve: "easeIn"
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.menu-all {
  height: 100%;
  width: 100%;
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