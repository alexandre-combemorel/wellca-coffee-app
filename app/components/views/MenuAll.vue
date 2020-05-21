<template>
  <AbsoluteLayout class="menu-all" ref="menu-all">
    <AbsoluteLayout class="menu-all--wrapper">
      <FlexboxLayout @tap="openActionCategorySelector()" class="menu-all__page-title" ref="menu-all__page-title">
        <StackLayout>
          <Title :content="categoryName"/>
        </StackLayout>
      </FlexboxLayout>
      <ScrollView @scroll="getScroll" orientation="vertical" ref="menu-all__section" class="menu-all__section">
        <StackLayout @pan="makeSticky" orientation="vertical" class="menu-all__section--wrapper">
          <StackLayout v-for="category in categoriesToDisplay" :key="category.id" orientation="vertical">
            <SectionTitle :content="category.name" v-if="categoriesToDisplay.length > 1" class="menu-all__section__title"/>
            <FlexboxLayout orientation="horizontal" class="menu-all__section__items">
              <StackLayout @tap="openMenuDetail(menuItem)" v-for="menuItem in itemPerCategory(category.id)" :key="menuItem.id">
                <TileImage :maintext="menuItem.item.title" :secondtext="menuItem.item.sub_title" :img="returnImageUrl(menuItem.item.img[0].url)" class="menu-all__section__items__item"/>
              </StackLayout>
            </FlexboxLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </AbsoluteLayout>
    <Label class="menu-all__gradient menu-all__gradient--top" v-show="topGradientActive"/>
    <Label class="menu-all__gradient menu-all__gradient--bottom" ref="menu-all__gradient--bottom"/>
  </AbsoluteLayout>
</template>

<script>
import Title from '../atoms/Title';
import SectionTitle from '../molecules/SectionTitle';
import TileImage from '../molecules/TileImage';

import config from '../../config/config.json'
import utils from '../../utils/all';
const platformModule = require("tns-core-modules/platform");

const stateMenu = {
  first: "expanded",
  second: "compact"
};

export default {
  components: {
    Title, SectionTitle, TileImage
  },
  props: ['type_selected'],
  data() {
    return {
      allCategoryName: config.views.MenuAll.title,
      topGradientActive: false,
      scrollView: undefined,
      pageTitleView: undefined,
      positionStart: undefined,
      scrollingEnabled: false,
      scrollingPosition: 0,
      scrollingStart: 0,
      stateMenu: stateMenu.first,
    };
  },
  async mounted() {
    await this.initMounted();
    console.log(`screen.mainScreen.heightDIPs ${platformModule.screen.mainScreen.heightDIPs}`); // The absolute height of the screen in density independent pixels.
    console.log(`screen.mainScreen.heightPixels ${platformModule.screen.mainScreen.heightPixels}`); // The absolute height of the screen in pixels.
    console.log(`screen.mainScreen.widthDIPs ${platformModule.screen.mainScreen.widthDIPs}`); // The absolute width of the screen in density independent pixels.
    console.log(`screen.mainScreen.widthPixels ${platformModule.screen.mainScreen.widthPixels}`);
  },
  computed: {
    categoriesToDisplay() {
      const categorySelected = this.$store.getters[`${this.type_selected}/getCategorySelected`];
      return categorySelected !== undefined ? [categorySelected] : this.$store.getters[`${this.type_selected}/getCategories`];
    },
    categoryName() {
      return this.categoriesToDisplay.length > 1 ? this.allCategoryName : this.categoriesToDisplay[0] && this.categoriesToDisplay[0].name;
    }
  },
  methods: {
    async initMounted() {
      await this.initGradientPosition();
      await utils.returnSizeWhenNativeViewLoaded(this.$refs['menu-all__section'].nativeView);
      this.scrollView = this.$refs['menu-all__section'].nativeView;
      this.pageTitleView = this.$refs['menu-all__page-title'].nativeView;
      this.setScrollEnable(false);
    },
    setScrollEnable(isEnable) {
      // this.scrollView.ios.scrollEnabled = isEnable;
      this.scrollView.android.setScrollEnabled(isEnable);
      this.scrollingEnabled = isEnable;
    },
    async initGradientPosition() {
      const { height } = await utils.returnSizeWhenNativeViewLoaded(this.$refs['menu-all'].nativeView);
      const gradientBottomView = this.$refs['menu-all__gradient--bottom'].nativeView;
      gradientBottomView.translateY = height-gradientBottomView.getActualSize().height;
    },
    async openActionCategorySelector() {
      const categorySelectedParam = await action("Choisissez votre categorie", "Retour", [this.allCategoryName, ...this.$store.getters[`${this.type_selected}/getCategories`].map(category => category.name)])
      const categorySelected = 
        categorySelectedParam === this.allCategoryName 
          ? 0 
          : this.$store.getters[`${this.type_selected}/getCategories`].filter(category => category.name === categorySelectedParam)[0].id;
      this.$store.commit(`${this.type_selected}/setCategorySelected`, categorySelected);
      if (categorySelected !== 0) this.setViewToState(stateMenu.second, 0, true);
    },
    itemPerCategory(cateId) {
      return this.$store.getters[`${this.type_selected}/getItems`].filter(item => item.carte_category.id === cateId);
    },
    openMenuDetail(menuItem) {
      this.$store.commit(`${this.type_selected}/setMenuItemSelected`, menuItem);
    },
    returnImageUrl(path) {
      return utils.returnImageUrl(path);
    },
    async makeSticky(event) {
      if (this.stateMenu === stateMenu.first) {
        if (event.state === 1) {
          this.positionStart = this.scrollView.translateY;
        } else if (event.state === 2 && event.deltaY < 0) {
          this.translateElementDuringTransition(event.deltaY);
        } else if (event.state === 3 && event.deltaY < 0) {
          this.setViewToState(stateMenu.second, event.deltaY);
        }
      } else if (this.stateMenu === stateMenu.second) {
        if (event.state === 1) {
          this.positionStart = this.scrollView.translateY;
          this.scrollingStart = this.scrollingPosition;
        }
        if (event.deltaY > 0 && this.scrollingPosition === 0) {
          if (event.state === 2) {
            this.translateElementDuringTransition(event.deltaY);
            this.topGradientActive = false;
          } else if (event.state === 3 && event.deltaY > 0) {
            this.setViewToState(stateMenu.first, event.deltaY);
          }
        } else if (event.state === 2) { // emulate scroll because pan and scroll can't work together
          this.scrollView.scrollToVerticalOffset(this.scrollingStart - event.deltaY, false);
          this.topGradientActive = true;
        }
      }
    },
    translateElementDuringTransition(deltaY) {
      const translateTo = this.positionStart + deltaY;
      this.scrollView.translateY = translateTo;
      this.pageTitleView.translateY = translateTo*0.5;
    },
    setViewToState(state, deltaY, forceState) {
      if (Math.abs(deltaY) < 200 && !forceState) {
        state = state === stateMenu.first ? stateMenu.second : stateMenu.first;
      }
      let yTitle, yScroll;
      if (state === stateMenu.first) {
        yTitle = 0;
        yScroll = 0;
      } else {
        yTitle = -90;
        yScroll = -190;
      }
      this.pageTitleView.animate({
        translate: { x: 0, y: yTitle },
        duration: 150
      });
      this.scrollView.animate({
        translate: { x: 0, y: yScroll },
        duration: 150
      });
      this.stateMenu = state;
    },
    getScroll(event) {
      this.scrollingPosition = event.scrollY;
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
.menu-all {
  height: 100%;
  width: 100%;
  &--wrapper {
    height: 100%;
    width: 100%;
  }
  &__page-title {
    width: 100%;
    height: 250;
    justify-content: center;
    align-items: center;
  }
  &__section {
    z-index: 10;
    width: 100%;
    height: 100%;
    top: 250;
    &--wrapper {
      padding-bottom: 70; // menu size
    }
    &__title {
    }
    &__items {
      width: 100%;
      padding: $size-m 0;
      flex-wrap: wrap;
      justify-content: center;
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
      top: 60;
    }
    &--bottom {
      background: linear-gradient(to bottom, rgba(23, 25, 28, 0), $primary-color);
    }
  }
}
</style>