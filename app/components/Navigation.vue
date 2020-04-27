<template>
    <AbsoluteLayout class="navigation">
      <FlexboxLayout class="navigation__backLayer"/>
      <AbsoluteLayout ref="circleMark" class="navigation__circle">
        <StackLayout class="navigation__circle__back"/>
        <StackLayout class="navigation__circle__left"/>
        <StackLayout class="navigation__circle__center"/>
        <StackLayout class="navigation__circle__right"/>
      </AbsoluteLayout>
      <FlexboxLayout class="navigation_items-container">
        <Label v-for="(item, index) in listItems" :key="index" @tap="selectItem(index)" class="navigation_items-container__item fas" :class="{ 'active': index === $store.getters.indexItemCurrentlySelected }" :text="item.icon"/>
      </FlexboxLayout>
      <StackLayout @pan="panCircle" ref="circlePan" class="navigation__circlePan"/>
    </AbsoluteLayout>
</template>

<script>
  const platformModule = require("tns-core-modules/platform");

  export default {
    data() {
      return {
        block: undefined,
        halfABlock: undefined
      }
    },
    mounted() {
      
      this.block = platformModule.screen.mainScreen.widthDIPs / this.$store.state.menu.length;
      this.halfABlock = this.block / 2;
      this.translateCircle(this.distanceCalculated());
    },
    computed: {
      listItems() {
        return this.$store.state.menu.map(item => {
          return {
            ...item,
            icon: String.fromCharCode(`0x${item.icon}`)
          };
        });
      },
    },
    methods: {
      panCircle(args) {
        if (args.state === 1) {
          // finger down
          this.prevDeltaX = 0;
          this.distanceStart = this.distanceCalculated();
        } else if (args.state === 2) {
          // finger moving
          this.translateCircle(this.distanceStart + args.deltaX);
          const indexToSelect = Math.trunc((this.$refs.circlePan.nativeView.translateX + 26) / this.block);
          if (this.$store.getters.indexItemCurrentlySelected !== indexToSelect) this.selectItem(indexToSelect, false);
        } else if (args.state === 3) {
          // finger up
          const indexToSelect = Math.trunc(this.$refs.circlePan.nativeView.translateX / this.block);
          this.selectItem(indexToSelect);
        }
      },
      selectItem(indexParam, escapeTransalte = true) {
        this.$store.commit('changeActiveMenu', indexParam);
        if (escapeTransalte) this.translateCircleAnimated();
      },
      distanceCalculated() {
        const multiplicator = this.$store.getters.indexItemCurrentlySelected + 1;
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
          translate: { x: distance + 26, y: 0 },
          duration: 200
        });
      },
      translateCircle(distance) {
        this.$refs.circlePan.nativeView.translateX = distance + 26;
        this.$refs.circleMark.nativeView.translateX = distance;
      }
    }
  }
</script>

<style scoped lang="scss">
$wandhSide: 26;
$wandhCenter: 60;
$colorCenter: #242424;
$colorBackground: white;
.navigation {
  width: 100%;
  height: 70;
  &__backLayer {
    top: 10;
    background: $colorBackground;
    height: 60;
    width: 100%;
  }
  &_items-container {
    height: 100%;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    &__item {
      padding-top: 5;
      width: 100%;
      font-size: 25;
      text-align: center;
      color: black;
    }
    .active {
      animation-name: upAndBigger;
      animation-duration: 0.2s;
      // font-size: 40;
      color: white;
      transform: translateY(-15) scale(1.5);
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
      top: -12;
      width: $wandhCenter;
      height: $wandhCenter;
      background: $colorCenter;
      border-radius: 0 0 50 50;
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
      transform: translateY(-15) scale(1.5);
    }
}
</style>
