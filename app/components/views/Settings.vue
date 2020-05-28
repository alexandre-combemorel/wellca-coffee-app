<template>
  <GridLayout rows="auto, *" class="settings">
    <Title row="0" :content="config.views.Settings.title_view" class="settings__title" type="h1"/>
    <ScrollView row="1" orientation="vertical" class="settings__section">
      <StackLayout>
        <SectionTitle :content="config.views.Settings.title_section1" class="settings__section__title"/>
        <FlexboxLayout class="settings__section__content">
          <TextBlock :content="findItem('presentation').content" class="settings__section__content__text"/>
        </FlexboxLayout>
        <SectionTitle :content="config.views.Settings.title_section2" class="settings__section__title"/>
        <FlexboxLayout class="settings__section__content">
          <FlexboxLayout class="settings__section__content__setting-item">
            <TextLabel type="p" class="settings__section__content__setting-item__notification" :content="config.views.Settings.notification.title" /><Switch v-model="notification" @checkedChange="changeNotification"/>
          </FlexboxLayout>
          <FlexboxLayout class="settings__section__content__setting-item">
            <TextLabel type="p" class="settings__section__content__setting-item__localisation" :content="config.views.Settings.localisation.title" />
            <FlexboxLayout @tap="redirectToHomePage" class="settings__section__content__setting-item__localisation-button">
              <TextLabel :content="$store.getters['stores/getStoreSelected'].location"/>
              <ButtonIcon codeicon="f304" options="size-small" class="settings__section__content__setting-item__localisation-button__item-button"/>
            </FlexboxLayout>
          </FlexboxLayout>
        </FlexboxLayout>
        <SectionTitle :content="config.views.Settings.title_section3" class="settings__section__title"/>
        <FlexboxLayout class="settings__section__content">
          <TextLabel v-on:tap="openDialog(findItem('Terms_d_utilisation'))" type="lien" class="settings__content__termsOfUser settings__section__content__labels" :content="findItem('Terms_d_utilisation').title" />
          <TextLabel v-on:tap="openDialog(findItem('mention_legales'))" type="lien" class="settings__content__privacyStatement settings__section__content__labels" :content="findItem('mention_legales').title" />
          <TextLabel :content="`Version: ${config.version}`" class="settings__content__version settings__content--labels" />
        </FlexboxLayout>
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>

<script>
const appSettings = require("tns-core-modules/application-settings");
import config from '../../config/config.json';

import SectionTitle from "../molecules/SectionTitle";
import Title from '../atoms/Title';
import TextLabel from '../atoms/TextLabel';
import TextBlock from '../atoms/TextBlock';
import Button from '../atoms/Button';
import ButtonIcon from '../atoms/ButtonIcon';
import App from '../App';
export default {
  components: {
    Title, SectionTitle, TextLabel, TextBlock, Button, ButtonIcon
  },
  data() {
    return {
      config,
      data: [],
      notification: appSettings.getBoolean(config.views.Settings.notification.storageName) || false,
      componentReady: undefined
    }
  },
  mounted() {
    let resolve;
    this.componentReady = new Promise(finish => {
      resolve = finish;
    })
    this.fetchData(resolve);
  },
  methods: {
    async fetchData(resolve) {
      try {
        // Fetch the items
        const response = await fetch(`${config.apiUrl}/settings?stores.id=${this.$store.getters[`stores/getStoreSelected`].id}`);
        this.data = await response.json();
        resolve();
      } catch (e) {
        console.error("Couldn't load the settings:", e);
      }
    },
    findItem(type) {
      return this.data.find(item => item.type === type) || {};
    },
    openDialog(obj) {
      this.$store.commit("sliderBottom/setSliderComponentState", {
        title: obj.title,
        data: obj.content,
        componentName: "TextBlock"
      });
      this.$store.commit("sliderBottom/showSlider");
    },
    changeNotification(){
      appSettings.setBoolean(config.views.Settings.notification.storageName, this.notification);
    },
    redirectToHomePage() {
      this.$navigateTo(App,{
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
@import '~/assets/css/variables.scss';
.settings {
  width: 100%;
  height: 100%;
  &__title {
    text-align: center;
    margin-top: $size-xl;
    margin-bottom: $size-l;
  }
  &__section {
    height: 100%;
    &__content {
      flex-direction: column;
      margin: 0 $size-m;
      margin-bottom: $size-l;
      &__labels {
        margin-bottom: $size-m;
      }
      &__setting-item {
        width: 100%;
        margin-bottom: $size-m;
        justify-content: space-between;
        align-items: center;
        &__localisation-button {
          align-items: center;
          &__item-button {
            margin-left: $size-s;
          }
        }
      }
    }
  }
}
</style>
