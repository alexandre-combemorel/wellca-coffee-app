<template>
  <FlexboxLayout class="menu-detail">
    <FlexboxLayout @pan="panItems" ref="menu-detail__list" class="menu-detail__list">
      <StackLayout v-for="menuItem in items" :key="menuItem.id" class="menu-detail__list__item-wrapper">
        <TileImage v-on:sizecomponent="setSizeItem" :img="returnImageUrl(menuItem.item.img[0].url)" size="small" :zoomed="isTileImageZoomed(menuItem.id)"  class="menu-detail__list__item-wrapper__item"/>
      </StackLayout>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script>
const platformModule = require("tns-core-modules/platform");
import utils from '../../utils/all';

import TileImage from '../molecules/TileImage';

export default {
  props: ['isDisplay'],
  components: {
    TileImage
  },
  data() {
    return {
      prevPosition: 0,
      widthItem: 0,
      widthScreen: 0,
      startPosition: 0,
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
      this.menuListView = this.$refs['menu-detail__list'].nativeView;
    },
    isTileImageZoomed(menuItemId) {
      return menuItemId === this.itemSelected.id;
    },
    returnImageUrl(path) {
      return utils.returnImageUrl(path);
    },
    panItems(args) {
      if (args.state === 1) {
        // finger down
        this.prevPosition = this.menuListView.translateX;
      } else if (args.state === 2) {
        // finger moving
        this.menuListView.translateX = this.prevPosition + args.deltaX;
        this.selectItemAccordingToNewPostion(this.menuListView.translateX - this.startPosition*1.5);
      } else if (args.state === 3) {
        // finger up
        this.setListPosition(true)
      }
    },
    selectItemAccordingToNewPostion(positionX) {
      const indexToSelect = Math.abs(positionX) / this.widthItem;
      this.$store.commit("menu/setMenuItemSelected", this.getItemFromIndex(Math.trunc(indexToSelect)));
      
    },
    setListPosition(animate) {
      if (this.menuListView) {
        const index = this.getIndexItemSelected();
        const distanceToTranslate = this.startPosition - this.widthItem * index;
        if (animate) {
          this.menuListView.animate({
            translate: { x: distanceToTranslate, y: 0 },
            duration: 150
          })
        } else {
          this.menuListView.translateX = distanceToTranslate;
        }
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
.menu-detail {
  top: 30;
  &__list {
    &__item-wrapper {
      height: 100%;
      &__item {
      }
    }
  }
}
</style>