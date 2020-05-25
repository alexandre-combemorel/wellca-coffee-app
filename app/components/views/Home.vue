<template>
  <GridLayout rows="auto, *" class="home">
    <Title row="0" :content="`WELCOME`" class="home__title"/>
    <ScrollView row="1" @scroll="getScroll" orientation="vertical" class="home__section">
      <StackLayout class="home__wrapper">
        <SectionTitle :content="`OUVERTURE`" class="home__section-title"/>
        <StackLayout class="home__section__opening">
          <StackLayout class="home__section__opening__calendar">
            <calendar-item/>
            <calendar-item/>
            <calendar-item state="disabled"/>
            <calendar-item state="disabled"/>
            <calendar-item/>
            <calendar-item/>
          </StackLayout>
          <GridLayout columns="auto, *" rows="auto, auto" class="home__section__opening__content">
            <StackLayout rowSpan="2" col="0" class="home__section__opening__content__clock"></StackLayout>
            <Title row="0" col="1" :content="`Mercredi`" class="home__section__opening__content__title"/>
            <StackLayout row="1" col="1" class="home__section__opening__content__info">
              <StackLayout class="home__section__opening__content__info__item" orientation="vertical">
                <Label text="7h - 13h" class="home__section__opening__content__info__item__text"/>
                <Label text="Bourges" class="home__section__opening__content__info__item__text"/>
                <Label text="Marché de la chancellerie" class="home__section__opening__content__info__item__text"/>
              </StackLayout>
              <StackLayout class="home__section__opening__content__info__item" orientation="vertical">
                <Label text="7h - 13h" class="home__section__opening__content__info__item__text"/>
                <Label text="Bourges" class="home__section__opening__content__info__item__text"/>
                <Label text="Marché de la chancellerie" class="home__section__opening__content__info__item__text"/>
              </StackLayout>
            </StackLayout>
          </GridLayout>
          <FlexboxLayout class="home__section__opening__content-description">
            <StackLayout class="home__section__opening__content-description__item">
              <Label text="Evenement :" class="home__section__opening__content-description__item__title"/>
              <Label text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rhoncus, risus in convallis vehicula, nisl leo mollis orci, id vestibulum sem enim maximus enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi nibh sapien, ultricies eget turpis ut, interdum molestie purus. " class="home__section__opening__content-description__item__text"/>
            </StackLayout>
          </FlexboxLayout>
        </StackLayout>
        <SectionTitle :content="`MAP`" class="home__section__section-title"/>
        <MapView class="home__section__map" iosOverflowSafeArea="true" @mapReady="onMapReady"></MapView>
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>

<script>
import { isAndroid, isIOS } from "tns-core-modules/platform";
var mapsModule = require("nativescript-google-maps-sdk");

import SectionTitle from "../molecules/SectionTitle";
import CalendarItem from "../molecules/CalendarItem";
import Title from "../atoms/Title";

export default {
  components: {
    SectionTitle, Title, CalendarItem
  },
  methods: {
    onMapReady(args) {
      this.mapView = args.object;
      this.mapView.zoomGesturesEnabled = true;
      const gMap = this.mapView.gMap;
      this.mapView.latitude = 47.082692;
      this.mapView.longitude = 2.392121;
      this.mapView.zoom = 10;
      if (isAndroid) {
        const uiSettings = gMap.getUiSettings();
      }
      if (isIOS) {
        gMap.myLocationEnabled = true;
        gMap.settings.myLocationButton = true;
      }
      this.addMarker({ 
        lat: this.mapView.latitude,
        long: this.mapView.longitude
      });
    },
    onMarkerSelect() {},
    onMarkerInfoWindowTapped() {},
    addMarker(coords) {
      const marker = new mapsModule.Marker();
      marker.position = mapsModule.Position.positionFromLatLng(coords.lat, coords.long);
      marker.title = "Bourges";
      marker.snippet = "France";
      marker.userData = { index : 1 };
      this.mapView.addMarker(marker);
    }
  }
};
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
@keyframes animTitle {
  0% { opacity: 0; transform: translate(0, $size-l) }
  50% { opacity: 1; }
  100% { transform: translate(0, 0) }
}
@keyframes animSection {
  0% { opacity: 0; transform: translate(0, 200) }
  50% { opacity: 1; }
  100% { transform: translate(0, 0) }
}
.home {
  width: 100%;
  height: 100%;
  &__title {
    text-align:center;
    margin-top: $size-l;
    margin-bottom: $size-l;
    animation: animTitle 2s linear;
  }
  &__section {
    animation: animSection 2s linear;
    &__section-title {
      margin-bottom: $size-m;
    }
    &__opening {
      width:100%;
      &__calendar {
        margin: 0 $size-m;
        height: 100;
        orientation: horizontal;
      }
      &__content {
        margin: 0 $size-l;
        &__clock {
          width: 115;
          background: grey;
          margin-right: $size-l;
        }
        &__title {
          margin-bottom: $size-l;
        }
        &__info {
          &__item {
            text-align: right;
            margin-top: $size-m;
            &__text {
              margin-top: $size-s;
              font-size: 16;
              text-wrap: true;
            }
          }
        }
      }
      &__content-description {
        margin: 0 $size-l;
        margin-top: $size-l;
        margin-bottom: $size-l;
        &__item {
          border-color: white;
          border-width: 2;
          padding: $size-s;
          &__title {
            font-size: 18;
          }
          &__text {
            margin-top: $size-s;
            text-wrap: true;
          }
        }
      }
    }
    &__map {
      margin: 0 $size-l;
      margin-bottom: $size-l;
      height: 300;
    }
  }
}
</style>