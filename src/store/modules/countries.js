let countries = require('../../../public/city.list.min.json');

export default {
	namespaced: true,
	state: {
		countries: []
	},
	getters: {
		getCountries: state => state.countries
	},
	mutations: {
		setCountries (state, countries) {
			state.countries = countries
		}
	},
	actions: {
		loadCountries ({ commit }) {
			let mappedCountries = countries.map(country => {
				return country.name
			}).slice(0,10000)
			return commit('setCountries', mappedCountries)
		},
		selectCountry({ dispatch }, countryName) {
			return dispatch('weather/weatherByCityName', countryName, { root: true })
		}
	},

}