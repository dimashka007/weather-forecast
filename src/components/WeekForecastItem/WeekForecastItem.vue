<template>
  <div class="day-forecast">
    <span class="day-forecast__title">
      {{currentDayOfWeek}}
    </span>
    <img :src="`${$root.publicPath}weather-icons/${getIcon(dayForecast.weather[0].icon)}`" class="day-forecast__weather" alt="">
    <div class="d-flex flex-row">
      <span class="day-forecast__temp day-forecast__temp_max">
        {{ roundTemperature(tempMax) }}
      </span>
      <span class="day-forecast__temp day-forecast__temp_min">
        {{ roundTemperature(tempMin) }}
      </span>
    </div>
    <div class="day-forecast__columns">
      <div :style="{height: `${calcColumnHeight(tempMax)}%`}" class="day-forecast__column day-forecast__column_max"></div>
      <div :style="{height: `${calcColumnHeight(tempMin)}%`}" class="day-forecast__column day-forecast__column_min"></div>
    </div>
  </div>
</template>

<script>
import weatherIconsMixin from "@/mixins/weather-icon-mixin";
import {mapGetters} from "vuex";

export default {
  props: {
    dayForecast: {
      type: Object,
      required: true
    }
  },
  mixins: [weatherIconsMixin],
  data() {
    return {
      daysOfWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    }
  },
  methods: {
    roundTemperature(temp) {
      return Math.round(temp)
    },
    calcColumnHeight(value) {
      return (Math.abs(this.weekTemperatureData.minTemperature) + Math.round(value)) / this.weekTemperatureData.graphHeight * 100
    },
  },
  computed: {
    ...mapGetters({
      weekTemperatureData: 'weather/getWeekTemperatureData'
    }),
    currentDayOfWeek() {
      let current = new Date(this.dayForecast.dt*1000).getDay()
      return this.daysOfWeek[current]
    },
    tempMax() {
      return this.dayForecast.temp.max
    },
    tempMin() {
      return this.dayForecast.temp.min
    },
  },
}
</script>