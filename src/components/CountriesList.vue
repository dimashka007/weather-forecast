<template>
  <div class="countries">
    <div class="countries-controls">
      <div class="col-3 countries-controls__item">
        <span @click="$emit('change-view', 'Forecast')" class="countries-controls__done">Done</span>
      </div>
      <div class="col-6 countries-controls__item justify-content-center flex-column">
        <span>Location</span>
        <span class="countries-controls__location">{{ currentCity }}</span>
      </div>
      <div class="col-3 countries-controls__item"></div>
    </div>
    <div class="countries-search">
      <input @keydown="lazyValidate($event)" type="text" class="form-control countries-search__input" v-model="searchQuery">
      <div class="countries-search__clear">
        <img @click="searchQuery = ''" src="../assets/images/cancel_cross.svg" alt="" width="16">
      </div>
    </div>
    <ul class="countries-list">
      <li @click="selectCountry(country)" v-for="(country, idx) in filteredList" :key="idx" class="countries-list__item">
        <span v-html="highlight(country)"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters({
      countriesList: 'countries/getCountries',
      currentCity: 'weather/getCurrentCity'
    }),
    searchExpression() {
      return new RegExp(this.searchQuery, 'i')
    },
    filteredList() {
      return this.countriesList.filter(country => {
        if(country.match(this.searchExpression)) {
          return country
        }
      })
    }
  },
  methods: {
    ...mapActions({
      loadCountries: 'countries/loadCountries',
    }),
    lazyValidate(e) {
      let RegExpression = /^[a-zA-Z\s]*$/;
      if(!e.key.match(RegExpression)) {
        e.preventDefault()
      }
    },
    selectCountry(country) {
      this.$store.dispatch('countries/selectCountry', country);
      this.$emit('change-view', 'Forecast')
    },
    highlight(value) {
      return value.match(this.searchExpression)[0] ? value.replace(this.searchExpression, `<span class="countries-list__highlight">${value.match(this.searchExpression)[0]}</span>`) : value
    }
  },
  created() {
    this.loadCountries()
  }
}
</script>