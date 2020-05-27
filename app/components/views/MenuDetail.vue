<template>
    <GridLayout rows="auto, auto, *, auto" class="menu-detail">
      <FlexboxLayout row="0" class="menu-detail__section-title">
        <Title v-if="categoryName" :content="categoryName"/>
      </FlexboxLayout>
      <ScrollView row="1" @pan="panItems" @scroll="scrollItems" orientation="horizontal" ref="menu-detail__list" class="menu-detail__list"  scrollBarIndicatorVisible="false">
        <StackLayout orientation="horizontal">
          <Label class="menu-detail__list__buffer" ref="menu-detail__list__buffer--start"/>
          <StackLayout v-for="menuItem in items" :key="menuItem.id" class="menu-detail__list__item-wrapper">
            <TileImage v-on:sizecomponent="setSizeItem" :img="returnImageUrl(menuItem.item.img[0].url)" size="small" :zoomed="isTileImageZoomed(menuItem.id)"  class="menu-detail__list__item-wrapper__item"/>
          </StackLayout>
          <Label class="menu-detail__list__buffer" ref="menu-detail__list__buffer--end"/>
        </StackLayout>
      </ScrollView>
      <ScrollView row="2" orientation="vertical" class="menu-detail__information--wrapper">
        <FlexboxLayout class="menu-detail__information">
          <Title v-if="itemSelected" :text="itemSelected.item.title" type="h4" class="menu-detail__information__title"/>
          <TextLabel v-if="itemSelected" :text="itemSelected.item.sub_title" type="hashtag" class="menu-detail__information__subtitle"/>
          <TextBlock v-if="itemSelected" :content="itemSelected.item.description" type="p2" class="menu-detail__information__description"/>
        </FlexboxLayout>
      </ScrollView>
      <FlexboxLayout row="3" class="menu-detail__button-price">
        <Button content="button 1$"/>
        <Button content="button 2$"/>
        <Button content="button 3$"/>
      </FlexboxLayout>
    </GridLayout>
</template>

<script>
const platformModule = require("tns-core-modules/platform");
import utils from '../../utils/all';

import TextBlock from '../atoms/TextBlock'
import TextLabel from '../atoms/TextLabel'
import TileImage from '../molecules/TileImage';
import Title from '../atoms/Title';
import Button from '../atoms/Button';

export default {
  props: ['isDisplay', 'type_selected'],
  components: {
    TileImage, TextBlock, TextLabel, Title, Button
  },
  data() {
    return {
      positionList: 0,
      widthItem: 0,
      widthScreen: 0,
      menuListView: undefined,
      itemsLoaded: undefined,
      componentLoaded: undefined,
    }
  },
  watch: {
    isDisplay(newVal, oldVal) {
      if (newVal) {
        this.setListPosition();
      }
    }
  },
  mounted() {
    this.componentLoaded = this.initVar();
  },
  computed: {
    categoryName() {
      const itemSelected = this.$store.getters[`${this.type_selected}/getMenuItemSelected`];
      return itemSelected ? itemSelected.carte_category.name : undefined;
    },
    itemSelected() {
      return this.$store.getters[`${this.type_selected}/getMenuItemSelected`];
    },
    items() {
      const cateId = this.itemSelected?.carte_category.id;
      return this.$store.getters[`${this.type_selected}/getItems`].filter(item => item?.carte_category.id === cateId);
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
      this.$store.commit(`${this.type_selected}/setMenuItemSelected`, this.getItemFromIndex(Math.trunc(indexToSelect)));
    },
    async setListPosition(animate) {
      await this.componentLoaded;
      const index = this.getIndexItemSelected();
      const distanceToTranslate = this.widthItem * index;
      // hack to get the scrollView to animate
      setTimeout(() => {
        this.menuListView.scrollToHorizontalOffset(distanceToTranslate, animate);
      }, 1);
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
  flex-direction: column;
  &__section-title {
    justify-content: center;
    align-items: center;
    height: 70;
  }
  &__list {
    width: 100%;
    height: 160;
  }
  &__information {
    &--wrapper {
      flex-shrink: 1;
    }
    flex-direction: column;
    padding: 0 $size-l;
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
    justify-content: space-around;
    padding: $size-s 0;
  }
}
</style>