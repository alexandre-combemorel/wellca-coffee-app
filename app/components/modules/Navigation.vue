<template>
    <AbsoluteLayout class="navigation">
      <FlexboxLayout class="navigation__backLayer"/>
      <AbsoluteLayout ref="circleMark" class="navigation__circle">
        <StackLayout class="navigation__circle__back"/>
        <StackLayout class="navigation__circle__left"/>
        <StackLayout class="navigation__circle__center"/>
        <StackLayout class="navigation__circle__right"/>
      </AbsoluteLayout>
      <FlexboxLayout class="navigation__items-container">
        <FlexboxLayout @tap="selectItem(index)" v-for="(item, index) in $store.getters['navigation/getMenu']" :key="index" class="navigation__items-container__item__wrapper">
          <Label v-if="item.type === 'icon'" class="navigation__items-container__item--icon fas" :class="{ 'active': item.active }" :text="convertIcon(item.value)"/>
          <Image v-else :src="getImagePath(item)" class="navigation__items-container__item--img" :class="{ 'active': item.active }"/>
        </FlexboxLayout>
      </FlexboxLayout>
      <StackLayout @pan="panCircle" ref="circlePan" class="navigation__circlePan"/>
    </AbsoluteLayout>
</template>

<script>
import utils from '../../utils/all';
const platformModule = require("tns-core-modules/platform");
const fileSystemModule = require("tns-core-modules/file-system");

export default {
  data() {
    return {
      block: undefined,
      halfABlock: undefined,
    }
  },
  async mounted() {
    this.block = platformModule.screen.mainScreen.widthDIPs / this.$store.getters['navigation/getMenu'].length;
    this.halfABlock = this.block / 2;
    this.translateCircle(this.distanceCalculated());

    await utils.returnSizeWhenNativeViewLoaded(this.$refs.circlePan.nativeView)
    // this.selectItem(1); // to be removed
  },
  methods: {
    getImagePath(item) {
      const rootPath = '~/assets/images/navigation/';
      return item.active ? `${rootPath}${item.value}-on.png` : `${rootPath}${item.value}-off.png`;
    },
    convertIcon(value) {
      return String.fromCharCode(`0x${value}`)
    },
    panCircle(args) {
      const indexToSelect = Math.trunc((this.$refs.circlePan.nativeView.translateX + 56) / this.block); // 56 is to align with the center of CirclePan: $wandhSide + $wandhCenter/2 (see css)
      if (args.state === 1) {
        // finger down
        this.distanceStart = this.distanceCalculated();
      } else if (args.state === 2) {
        // finger moving
        this.translateCircle(this.distanceStart + args.deltaX);
        if (this.$store.getters['navigation/indexItemCurrentlyActive'] !== indexToSelect) this.activateItem(indexToSelect);
      } else if (args.state === 3) {
        // finger up
        this.selectItem(indexToSelect);
      }
    },
    activateItem(indexParam) {
      this.$store.commit('navigation/changeActiveMenu', indexParam);
    },
    selectItem(indexParam) {
      this.$store.commit('navigation/changeSelectedMenu', indexParam);
      this.$emit('selected');
      this.translateCircleAnimated();
    },
    distanceCalculated() {
      const multiplicator = this.$store.getters['navigation/indexItemCurrentlyActive'] + 1;
      const distance = multiplicator * this.block - this.halfABlock - 56;
      return distance;
    },
    translateCircleAnimated() {
      const distance = this.distanceCalculated();
      this.$refs.circleMark.nativeView.animate({
        translate: { x: distance, y: 0 },
        duration: 200
      });
      this.$refs.circlePan.nativeView.animate({
        translate: { x: distance, y: 0 },
        duration: 200
      });
    },
    translateCircle(distance) {
      this.$refs.circlePan.nativeView.translateX = distance;
      this.$refs.circleMark.nativeView.translateX = distance;
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
$wandhSide: 26;
$wandhCenter: 60;
$colorCenter: $primary-color;
$colorBackground: $tertiary-color;
.navigation {
  width: 100%;
  height: 70;
  &__backLayer {
    top: 10;
    background: $colorBackground;
    height: 60;
    width: 100%;
  }
  &__items-container {
    height: 100%;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    &__item {
      &--icon {
        font-size: 25;
        text-align: center;
        color: $primary-color;
      }
      &--img {
        width: 30;
      }
      &__wrapper {
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
    }
    .active {
      animation-name: upAndBigger;
      animation-duration: 0.15s;
      color: $text-color-primary;
      transform: translateY(-10) scale(1.5);
    }
  }
  &__circle {
    top: 10;
    left: 0;
    width: $wandhCenter+$wandhSide*2;
    height: 100%;
    &__left {
      top: 0;
      left: 0;
      width: $wandhSide;
      height: $wandhSide;
      background: $colorBackground;
      border-radius: 0 50 50 0;
    }
    &__center {
      left: $wandhSide;
      width: $wandhCenter;
      height: $wandhCenter;
      background: $colorCenter;
      border-radius: 0 0 50 50;
      height: 50;
    }
    &__right {
      left: $wandhCenter+$wandhSide;
      width: $wandhSide;
      height: $wandhSide;
      background: $colorBackground;
      border-radius: 50 0 0 50;
    }
    &__back {
      left: 0;
      top: 0;
      width: $wandhCenter+$wandhSide*2;
      height: 15;
      background: $colorCenter;
    }
  }
  &__circlePan {
    margin-left: $wandhSide;
    width: $wandhCenter;
    height: $wandhCenter;
    border-radius: 50;
  }
}
@keyframes upAndBigger {
    from { 
      transform: translateY(0) scale(1);
    }
    to { 
      transform: translateY(-10) scale(1.5);
    }
}
</style>
