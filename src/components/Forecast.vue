<template>
  <div class="forecast">
    <div @click="$emit('change-view', 'CountriesList')" class="forecast-header">
      <div class="col-3 justify-content-start forecast-header__item">
        <img src="../assets/images/cloud_icon.svg" alt="">
      </div>
      <div class="col-6 forecast-header__item justify-content-center flex-column">
        <span>Weather Forecast</span>
        <span class="forecast-header__location">{{ currentWeather.name }}</span>
      </div>
      <div class="col-3 forecast-header__item justify-content-end">
        <img src="../assets/images/settings_icon.svg" alt="">
      </div>
    </div>
    <div class="forecast-summary">
      <span class="forecast-summary__title">Day Forecast</span>
      <div class="forecast-summary__temperature">
        <span class="forecast-summary__temperature forecast-summary__temperature_max">
          {{ Math.round(tempMax) }}
        </span>
        <span class="forecast-summary__temperature forecast-summary__temperature_min">
          {{ Math.round(tempMin) }}
        </span>
      </div>
    </div>
    <div class="forecast-body">
      <h1 class="forecast-body__temperature">{{ Math.round(currentWeather.temperature.temp) }}&#176;</h1>
      <span class="forecast-body__city">{{ currentWeather.name }}</span>
      <div class="forecast-body__weather">
        <span>{{ currentWeather.weather.main }}</span>
        <img :src="`${$root.publicPath}weather-icons/${getIcon(currentWeather.weather.icon)}`" class="forecast-body__weather_icon" alt="">
      </div>
    </div>
    <div class="forecast-period">
      <span class="forecast-period__title">Week Forecast</span>
    </div>
    <week-forecast></week-forecast>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import weatherIconsMixin from "@/mixins/weather-icon-mixin";
import weekForecast from './WeekForecast'

export default {
  mixins: [weatherIconsMixin],
  components: {
    weekForecast
  },
  computed: {
    ...mapGetters({
      currentWeather: 'weather/getCurrentWeather'
    }),
    tempMax() {
      return this.currentWeather.temperature.temp_max
    },
    tempMin() {
      return this.currentWeather.temperature.temp_min
    }
  },
}
</script>