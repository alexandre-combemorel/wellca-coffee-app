<template>
  <GridLayout rows="auto, *" class="home">
    <Title row="0" :content="config.views.Home.title_view" class="home__title"/>
    <ScrollView row="1" orientation="vertical" class="home__section">
      <StackLayout class="home__wrapper">
        <SectionTitle :content="config.views.Home.title_section_1" class="home__section__section-title"/>
        <StackLayout class="home__section__opening">
          <StackLayout class="home__section__opening__calendar">
            <calendar-item v-for="(dateDay) in dateRange" :key="dateDay.getDate()" :date-obj="dateDay" :state="giveStateOfCalendarItem(dateDay)" v-on:datetap="selectDay"/>
            <button-icon codeicon="f13a" class="home__section__opening__calendar__expand" v-on:icontapped="onPickDateTap"/>
          </StackLayout>
          <GridLayout columns="auto, *" rows="auto, auto" class="home__section__opening__content">
            <StackLayout rowSpan="2" col="0" class="home__section__opening__content__clock"></StackLayout>
            <Title row="0" col="1" :content="getCurrentDaySelectedNameLong()" class="home__section__opening__content__title"/>
            <StackLayout row="1" col="1" class="home__section__opening__content__info">
              <StackLayout class="home__section__opening__content__info__item" v-for="event in eventsToDisplay" :key="event.id">
                <Label :text="getCurrentDaySelectedHours(event)" class="home__section__opening__content__info__item__text"/>
                <Label :text="event.title" class="home__section__opening__content__info__item__text"/>
                <Label :text="event.sub_title" class="home__section__opening__content__info__item__text"/>
              </StackLayout>
            </StackLayout>
          </GridLayout>
          <FlexboxLayout class="home__section__opening__content-description">
            <StackLayout class="home__section__opening__content-description__item" v-for="(description, index) in eventsDescriptionToDisplay" :key="index">
              <Label :text="description.title" class="home__section__opening__content-description__item__title"/>
              <Label :text="description.description" class="home__section__opening__content-description__item__text"/>
            </StackLayout>
          </FlexboxLayout>
        </StackLayout>
        <SectionTitle :content="config.views.Home.title_section_2" class="home__section__section-title"/>
        <MapView v-show="dateDaySelected" class="home__section__map" iosOverflowSafeArea="true" @mapReady="onMapReady"></MapView>
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>

<script>
import { isAndroid, isIOS } from "tns-core-modules/platform";
import dateUtils from '../../utils/date';
import config from '../../config/config.json'
var mapsModule = require("nativescript-google-maps-sdk");
import { DateTimePicker } from "nativescript-datetimepicker";

import SectionTitle from "../molecules/SectionTitle";
import CalendarItem from "../molecules/CalendarItem";
import Title from "../atoms/Title";
import ButtonIcon from "../atoms/ButtonIcon";

export default {
  components: {
    SectionTitle, Title, CalendarItem, ButtonIcon
  },
  data() {
    return {
      config: config,
      dateRange: [],
      eventsToDisplay: [],
      dateDaySelected: new Date(),
      promiseMapReady: undefined,
    };
  },
  mounted() {
    this.promiseMapReady = new Promise(resolve => {
      this.resolveMapReady = resolve;
    });
    this.selectStartDate(new Date());
  },
  computed: {
    eventsDescriptionToDisplay() {
      const listDescriptions = [];
      this.eventsToDisplay.forEach(event => {
        event.descriptions.forEach(description => {
          listDescriptions.push(description);
        })
      });
      return listDescriptions;
    }
  },
  methods: {
    async selectStartDate(date) {
      this.setDateRange(date);
      await this.fetchEvents();
      this.selectDay(this.$store.getters['calendar/getFirstDateDayWithEvent']);
    },
    onPickDateTap(args) {
      DateTimePicker
          .pickDate({
              context: args.object._context,
              date: this.dateRange[0],
              okButtonText: config.views.Home.datepicker.button_ok,
              cancelButtonText: config.views.Home.datepicker.button_cancel,
              title: config.views.Home.datepicker.title,
              locale: "fr_FR"
          })
          .then(selectedDate => {
              if (selectedDate) {
                  this.selectStartDate(selectedDate);
              }
          });
    },
    setDateRange(date) {
      const dateStart = dateUtils.simplifyDate(date);
      this.dateRange = [];
      for(let numDay = 0; numDay < 7; numDay++) {
        this.dateRange.push(new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate()+numDay));
      }
    },
    getStartEndDate() {
      if (this.dateRange.length > 0) {
        const lastDay = this.dateRange[this.dateRange.length-1];
        const dateEnd = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate(), 0, 0, -1);
        const firstDay = this.dateRange[0];
        return { start: firstDay, end: dateEnd };
      }
      return undefined;
    },
    giveStateOfCalendarItem(dateDay) {
      let state = "";
      if (!this.$store.getters['calendar/isDayWithEvent'](dateDay)) {
        state = "disabled";
      } else if (this.dateDaySelected && dateDay && this.dateDaySelected.getTime() === dateDay.getTime()) {
        state = "active";
      }
      return state;
    },
    selectDay(dateDay) {
      this.dateDaySelected = dateDay;
      this.eventsToDisplay = this.$store.getters['calendar/getEventsForTheDay'](dateDay);
      this.addMarkers();
    },
    getCurrentDaySelectedNameLong() {
      return this.dateDaySelected ? dateUtils.dayOfTheWeekLong[this.dateDaySelected.getDay()] : "";
    },
    getCurrentDaySelectedHours(event) {
      const formatHoursStart = event.date_start.getHours() < 10 ? `0${event.date_start.getHours()}` : event.date_start.getHours();
      const formatMinutesStart = event.date_start.getMinutes() < 10 ? `0${event.date_start.getMinutes()}` : event.date_start.getMinutes();
      const formatHoursEnd = event.date_end.getHours() < 10 ? `0${event.date_end.getHours()}` : event.date_end.getHours();
      const formatMinutesEnd = event.date_end.getMinutes() < 10 ? `0${event.date_end.getMinutes()}` : event.date_end.getMinutes();

      const textStart = this.dateDaySelected.getDay() === event.date_start.getDay() ? `${formatHoursStart}h${formatMinutesStart}` : "Jour précédent";
      const textEnd = this.dateDaySelected.getDay() === event.date_end.getDay() ? `${formatHoursEnd}h${formatMinutesEnd}` : "jour suivant";
      return `${textStart} - ${textEnd}`;
    },



    async fetchEvents() {
      try {
        const { start, end } = this.getStartEndDate();
        // Fetch the items
        const response = await fetch(`${config.apiUrl}/events?store.id=${this.$store.getters[`stores/getStoreSelected`].id}&date_start_gte=${start.getTime()}&date_end_lte=${end.getTime()}`);
        this.$store.commit(`calendar/setEvents`, await response.json())
      } catch (e) {
        console.error("Couldn't load the events:", e);
      }
    },
    onMapReady(args) {
      this.mapView = args.object;
      this.mapView.zoomGesturesEnabled = false;
      const gMap = this.mapView.gMap;
      this.mapView.zoom = 15;
      if (isAndroid) {
        const uiSettings = gMap.getUiSettings();
      }
      if (isIOS) {
        gMap.myLocationEnabled = true;
        gMap.settings.myLocationButton = true;
      }
      this.resolveMapReady(true);
    },
    async addMarkers() {
      try {
        await this.promiseMapReady;
        this.mapView.removeAllMarkers()
        this.eventsToDisplay.forEach(event => {
          const locationInfo = {
            lat: event.lat,
            long: event.long,
            title: event.title,
            sub_title: event.sub_title
          }
          const marker = new mapsModule.Marker();
          marker.position = mapsModule.Position.positionFromLatLng(locationInfo.lat, locationInfo.long);
          marker.title = locationInfo.title;
          marker.snippet = locationInfo.sub_title;
          this.mapView.addMarker(marker);
        });
        setTimeout(() => {
          if (this.eventsToDisplay.length > 1) {
            if (isAndroid) {
              let builder = new com.google.android.gms.maps.model.LatLngBounds.Builder();
              this.mapView.findMarker(marker => {
                  builder.include(marker.android.getPosition());
                  return false;
              });

              let bounds = builder.build();
              let padding = 100;
              let cu = com.google.android.gms.maps.CameraUpdateFactory.newLatLngBounds(bounds, padding);
              this.mapView.gMap.animateCamera(cu);
            }
          } else if (this.eventsToDisplay.length === 1) {
            this.mapView.latitude = this.eventsToDisplay[0].lat;
            this.mapView.longitude = this.eventsToDisplay[0].long;
          }
        }, 10)
        
      } catch (e) {
        console.log("addMarkers -> e", e)
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import '~/assets/css/variables.scss';
@keyframes animTitle {
  0% { opacity: 0; transform: translate(0, $size-xxxl) }
  70% { opacity: 1; }
  100% { transform: translate(0, 0) }
}
@keyframes animSection {
  0% { opacity: 0; transform: translate(0, $size-xxxl+$size-xxl) }
  70% { opacity: 1; }
  100% { transform: translate(0, 0) }
}
.home {
  width: 100%;
  height: 100%;
  &__title {
    text-align:center;
    margin-top: $size-xl;
    margin-bottom: $size-l;
    animation: animTitle 1.5s ease-in-out;
  }
  &__section {
    animation: animSection 1.5s ease-in-out;
    &__section-title {
      margin-bottom: $size-m;
    }
    &__opening {
      width:100%;
      &__calendar {
        margin: 0 $size-m;
        height: 100;
        orientation: horizontal;
        &__expand {
          margin-top: 30;
        }
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
            orientation: vertical;
            &__text {
              margin-top: $size-s;
              font-size: 16;
              text-wrap: true;
            }
          }
        }
      }
      &__content-description {
        flex-direction: column;
        margin-bottom: $size-m;
        &__item {
          margin: $size-s 0;
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