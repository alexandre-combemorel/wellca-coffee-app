<template>
  <GridLayout rows="auto, *" class="home">
    <Title row="0" :content="`Welcome`" class="home__title"/>
    <ScrollView row="1" @scroll="getScroll" orientation="vertical" class="home__section">
      <StackLayout class="home__wrapper">
        <SectionTitle :content="`Map`"/>
        <MapView class="home__map" iosOverflowSafeArea="true" @mapReady="onMapReady"></MapView>
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>

<script>
import { isAndroid, isIOS } from "tns-core-modules/platform";
var mapsModule = require("nativescript-google-maps-sdk");

import SectionTitle from "../molecules/SectionTitle";
import Title from "../atoms/Title";

export default {
  components: {
    SectionTitle, Title
  },
  methods: {
    onMapReady(args) {
      this.mapView = args.object;
      this.mapView.zoomGesturesEnabled = true;
      const gMap = this.mapView.gMap;
      this.mapView.latitude = 47.082692
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
.home {
  width: 100%;
  height: 100%;
  &__map {
    width: 300;
    height: 300;
  }
}
</style>