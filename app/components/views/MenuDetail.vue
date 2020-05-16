<template>
  <FlexboxLayout class="menu-detail">
    <FlexboxLayout @pan="panItems" ref="menu-detail" class="menu-detail__list">
      <StackLayout v-for="menuItem in items" :key="menuItem.id" class="menu-detail__list__item-wrapper">
        <TileImage :img="returnImageUrl(menuItem.item.img[0].url)" :size="setSize(menuItem.id)"  class="menu-detail__list__item-wrapper__item"/>
      </StackLayout>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script>
const platformModule = require("tns-core-modules/platform");
import utils from '../../utils/all';

import TileImage from '../molecules/TileImage';

export default {
  components: {
    TileImage
  },
  data() {
    return {
      prevPosition: 0,
    }
  },
  computed: {
    items() {
      const cateId = this.$store.getters['menu/getMenuItemSelected']?.carte_category.id;
      return this.$store.getters['menu/getItems'].filter(item => item?.carte_category.id === cateId);
    }
  },
  methods: {
    setSize(menuItemId) {
      return menuItemId === this.$store.getters['menu/getMenuItemSelected'].id ? 'normal' : 'small';
    },
    returnImageUrl(path) {
      return utils.returnImageUrl(path);
    },
    panItems(args) {
      if (args.state === 1) {
        // finger down
        this.prevPosition = this.$refs['menu-detail'].nativeView.translateX;
      } else if (args.state === 2) {
        // finger moving
        this.$refs['menu-detail'].nativeView.translateX = this.prevPosition + args.deltaX;
      } else if (args.state === 3) {
        // finger up
      }
    },
    setListPosition() {

    }
  }
}
</script>

<style scoped lang="scss">
.menu-detail {
  top: 30;
  &__list {
    background: red;
    &__item-wrapper {
      height: 100%;
      &__item {
        // background: green;
      }
    }
  }
}
</style>