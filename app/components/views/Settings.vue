<template>
  <AbsoluteLayout class="settings">
    <FlexboxLayout class="settings__content">
      <WebView class="settings__content__logo" src="~/assets/svg/logo.svg" />
      <Label @tap="openDialog('Terms of Use')" class="settings__content__termsOfUser settings__content--labels" text="Terms of Use" />
      <Label @tap="openDialog('Privacy Statement')" class="settings__content__privacyStatement settings__content--labels" text="Privacy Statement" />
      <Label class="settings__content__version settings__content--labels" :text="`Version: ${config.version}`" />
    </FlexboxLayout>
  </AbsoluteLayout>
</template>

<script>
import config from '../../config/config.json';

export default {
  data() {
    return {
      config,
      dialogContent: null,
      dialogTitle: null,
    }
  },
  methods: {
    openDialog(id) {
      this.$store.commit("setSliderComponentState", {
        title: id,
        data: this.config[id],
        componentName: "TextBlock"
      });
      this.$store.commit("showSlider");
    },
  }
}
</script>

<style scoped lang="scss">
.settings {
  &__content {
    width: 100%;
    height: 100%;
    color: white;
    flex-direction: column;
    &__logo {
      margin: 20 0;
      width: 100%;
      height: 100;
    }
    &--labels {
      margin: 10 0;
    }
  }
}
</style>
