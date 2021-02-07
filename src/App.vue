<template>
  <div id="app">
    <div class="bg-blur"></div>
    <div id="app-content">
      <div class="status-bar">
        <div class="col-3 status-bar__item justify-content-start">
          <span class="status-bar__text">
            Carrier
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="28" fill="#ffffff" class="bi bi-wifi-2 mb-2" viewBox="0 0 16 16">
            <path d="M13.229 8.271c.216-.216.194-.578-.063-.745A9.456 9.456 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.577 1.336c.205.132.48.108.652-.065zm-2.183 2.183c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.408.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.611-.091l.015-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .708 0l.707-.707z"/>
          </svg>
        </div>
        <div class="col-6 status-bar__item justify-content-center">
          <span class="status-bar__time">
            {{ currentTime }}
          </span>
        </div>
        <div class="col-3 status-bar__item justify-content-end">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="26" fill="#ffffff" class="bi bi-battery-full" viewBox="0 0 16 16">
            <path d="M2 6h10v4H2V6z"/>
            <path d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h10zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8z"/>
          </svg>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <component @change-view="changeView" :is="currentView"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import CountriesList from './components/CountriesList'
import Forecast from './components/Forecast'
import {mapActions} from "vuex";

export default {
  name: 'App',
  components: {
    CountriesList,
    Forecast
  },
  data() {
    return {
      currentView: 'Forecast'
    }
  },
  computed: {
    currentTime() {
      return new Date().toLocaleTimeString('en-US', { hour: 'numeric',minute: '2-digit', hour12: true })
    }
  },
  methods: {
    ...mapActions({
      getCurrentWeatherByCity: 'weather/weatherByCityName',
      getCurrentWeatherByCoords: 'weather/weatherByCoords'
    }),
    changeView(view) {
      this.currentView = view
    },
    proceedAllowedGeolocation(geolocation) {
      this.getCurrentWeatherByCoords(
          {
            lat: geolocation.coords.latitude,
            lon: geolocation.coords.longitude
          }
      )
    },
    proceedDeclinedGeolocation() {
      this.getCurrentWeatherByCity('Vilnius')
    }
  },
  created() {
    navigator.geolocation.getCurrentPosition(this.proceedAllowedGeolocation, this.proceedDeclinedGeolocation)
  }
}
</script>
