<template>
  <div class="d-flex flex-row">
    <week-forecast-item v-for="dayForecast in weekForecast" :key="dayForecast.dt" :dayForecast="dayForecast"></week-forecast-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import weekForecastItem from './WeekForecastItem/WeekForecastItem'
export default {
  components: {
    weekForecastItem
  },
  computed: {
    ...mapGetters({
      weekForecast: 'weather/getWeekForecast'
    }),
  },
}
</script>