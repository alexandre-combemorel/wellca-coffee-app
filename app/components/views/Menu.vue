<template>
  <AbsoluteLayout ref="menu" class="menu">
    <BackArrow class="menu__back-btn" />
    <ScrollView orientation="vertical" class="menu__section">
      <StackLayout orientation="vertical">
        <Title content="NOS BOISSON" class="menu__section__page-title"/>
        <StackLayout v-for="index in [1, 2, 3, 4, 5]" :key="index" orientation="vertical">
          <SectionTitle :content="`LES LATTES ${index}`" class="menu__section__title"/>
          <FlexboxLayout orientation="horizontal" class="menu__section__items">
            <TileImage maintext="Main text" secondtext="second text" class="menu__section__items__item"/>
            <TileImage maintext="Main text" secondtext="second text" class="menu__section__items__item"/>
            <TileImage maintext="Main text" secondtext="second text" class="menu__section__items__item"/>
            <TileImage maintext="Main text" secondtext="second text" class="menu__section__items__item"/>
            <TileImage maintext="Main text" secondtext="second text" class="menu__section__items__item"/>
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
  mounted() {
    this.initGradientPosition();
    this.fetchCarteItems();
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
        const response = await fetch("https://app.wellcacoffee.com/carte-items", {
          method: "GET",
        });
        const carteItems = await response.json();
        console.log("fetchCarteItems -> carteItems", carteItems)
      } catch (e) {
        console.error("Couldn't load the carte items (shops):", e);
      }
      
    },
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