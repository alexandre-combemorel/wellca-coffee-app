<template>
    <StackLayout class="menu-detail">
      <Title v-if="categoryName" :content="categoryName" class="menu-detail__section-title"/>
      <ScrollView @pan="panItems" @scroll="scrollItems" orientation="horizontal" ref="menu-detail__list" class="menu-detail__list">
        <StackLayout orientation="horizontal">
          <Label ref="menu-detail__list__buffer--start"/>
          <StackLayout v-for="menuItem in items" :key="menuItem.id" class="menu-detail__list__item-wrapper">
            <TileImage v-on:sizecomponent="setSizeItem" :img="returnImageUrl(menuItem.item.img[0].url)" size="small" :zoomed="isTileImageZoomed(menuItem.id)"  class="menu-detail__list__item-wrapper__item"/>
          </StackLayout>
          <Label ref="menu-detail__list__buffer--end"/>
        </StackLayout>
      </ScrollView>
      <ScrollView orientation="vertical">
        <StackLayout>
          <FlexboxLayout class="menu-detail__information">
            <Label v-if="itemSelected" :text="itemSelected.item.title" class="menu-detail__information__title"/>
            <Label v-if="itemSelected" :text="itemSelected.item.sub_title" class="menu-detail__information__subtitle"/>
            <TextBlock v-if="itemSelected" :data="itemSelected.item.description" class="menu-detail__information__description"/>
          </FlexboxLayout>
          <FlexboxLayout class="menu-detail__button-price">
            <Button content="button 1$"/>
            <Button content="button 2$"/>
            <Button content="button 3$"/>
          </FlexboxLayout>
        </StackLayout>
      </ScrollView>
    </StackLayout>
</template>

<script>
const platformModule = require("tns-core-modules/platform");
import utils from '../../utils/all';

import TextBlock from '../atoms/TextBlock'
import TileImage from '../molecules/TileImage';
import Title from '../atoms/Title';
import Button from '../atoms/Button';

export default {
  props: ['isDisplay'],
  components: {
    TileImage, TextBlock, Title, Button
  },
  data() {
    return {
      positionList: 0,
      widthItem: 0,
      widthScreen: 0,
      menuListView: undefined,
      itemsLoaded: undefined,
    }
  },
  watch: {
    isDisplay(newVal, oldVal) {
      if (newVal) {
        this.setListPosition();
      }
    }
  },
  async mounted() {
    await this.initVar();
  },
  computed: {
    categoryName() {
      const itemSelected = this.$store.getters['menu/getMenuItemSelected'];
      return itemSelected ? itemSelected.carte_category.name : undefined;
    },
    itemSelected() {
      return this.$store.getters['menu/getMenuItemSelected'];
    },
    items() {
      const cateId = this.itemSelected?.carte_category.id;
      return this.$store.getters['menu/getItems'].filter(item => item?.carte_category.id === cateId);
    }
  },
  methods: {
    setSizeItem(sizeItem) {
      this.itemsLoaded(sizeItem.width);
    },
    async initVar() {
      this.widthItem = await new Promise((itemLoaded, reject) => {
        this.itemsLoaded = itemLoaded;
      });
      this.widthScreen = platformModule.screen.mainScreen.widthDIPs;
      this.startPosition = this.widthScreen / 2 - this.widthItem / 2;
      this.$refs['menu-detail__list__buffer--start'].nativeView.width = this.startPosition;
      this.$refs['menu-detail__list__buffer--end'].nativeView.width = this.startPosition;
      this.menuListView = this.$refs['menu-detail__list'].nativeView;
    },
    isTileImageZoomed(menuItemId) {
      return menuItemId === this.itemSelected.id;
    },
    returnImageUrl(path) {
      return utils.returnImageUrl(path);
    },
    scrollItems(event) {
      this.positionList = event.scrollX;
    },
    panItems(args) {
      if (args.state === 2) {
        // finger moving
        this.selectItemAccordingToNewPostion(this.positionList);
      } else if (args.state === 3) {
        // finger up
        this.setListPosition(true)
      }
    },
    selectItemAccordingToNewPostion(positionX) {
      const indexToSelect = Math.abs(positionX + this.widthScreen * 0.2) / this.widthItem;
      this.$store.commit("menu/setMenuItemSelected", this.getItemFromIndex(Math.trunc(indexToSelect)));
    },
    setListPosition(animate) {
      if (this.menuListView) {
        const index = this.getIndexItemSelected();
        const distanceToTranslate = this.widthItem * index;
        // hack to get the scrollView to animate
        setTimeout(() => {
          this.menuListView.scrollToHorizontalOffset(distanceToTranslate, animate);
        }, 1);
      }
    },
    getItemFromIndex(indexParam) {
      let itemToReturn = 0;
      this.items.forEach((item, index) => {
        if (index === indexParam) {
          itemToReturn = item;
        }
      });
      return itemToReturn;
    },
    getIndexItemSelected() {
      let indexToreturn = 0;
      this.items.forEach((item, index) => {
        if (item.id === this.itemSelected.id) {
          indexToreturn = index;
        }
      });
      return indexToreturn;
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
.menu-detail {
  height: 100%;
  width: 100%;
  &__section-title {
    margin-top: 50;
    text-align: center;
    height: 70;
  }
  &__list {
    width: 100%;
    margin-bottom: 20;
  }
  &__information {
    width: 100%;
    flex-direction: column;
    padding: $size-l;
    &__title {
      font-size: $title-size;
      font-weight: bold;
    }
    &__subtitle {
      font-size: 15;
      margin-top: $size-xs;
    }
    &__description {
      font-size: $text-size;
      margin-top: $size-m;
    }
  }
  &__button-price {
    margin-top: 20;
    justify-content: space-around;
  }
}
</style>