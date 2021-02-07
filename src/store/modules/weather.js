import ajaxUrls from '../../helpers/ajaxUrls'
import axios from 'axios'

export default {
	namespaced: true,
	state: {
		currentWeather: {},
		weekForecast: [],
		maxWeekTemperature: '',
		minWeekTemperature: ''
	},
	getters: {
		getCurrentWeather: state => state.currentWeather,
		getWeekForecast: state => state.weekForecast,
		getCurrentCity: state => state.currentWeather.name,
		getWeekTemperatureData: state => {
			console.log()
			return {
				minTemperature: state.minWeekTemperature,
				graphHeight: Math.abs(+state.minWeekTemperature) + state.maxWeekTemperature
			}
		}
	},
	mutations: {
		setCurrentWeather (state, currWeather) {
			state.currentWeather = {
				name: currWeather.name,
				temperature: currWeather.main,
				weather: currWeather.weather[0]
			}
		},
		setWeekForecast (state, forecast) {
			state.weekForecast = forecast.slice(1)
			let maxTempDay = state.weekForecast.reduce((prev, current) => (prev.temp.max > current.temp.max) ? prev : current);
			let minTempDay = state.weekForecast.reduce((prev, current) => (prev.temp.max < current.temp.max) ? prev : current);
			state.maxWeekTemperature = Math.round(maxTempDay.temp.max)
			state.minWeekTemperature = Math.round(minTempDay.temp.min)
		}
	},
	actions: {
		weatherByCityName({ commit, dispatch }, cityName) {
			 axios.get(ajaxUrls.currWeatherByCityName(cityName))
				.then(res => {
					commit('setCurrentWeather', res.data)
					return dispatch('weekForecast', {
						lat: res.data['coord'].lat,
						lon: res.data['coord'].lon
					})
				})
		},
		weatherByCoords({ commit, dispatch }, coords) {
			axios.get(ajaxUrls.currWeatherByCoords(coords.lat, coords.lon))
				.then(res => {
					commit('setCurrentWeather', res.data)
					return dispatch('weekForecast', {
						lat: res.data['coord'].lat,
						lon: res.data['coord'].lon
					})
				})
		},
		weekForecast({ commit }, coords) {
			axios.get(ajaxUrls.weekForecastByCoords(coords.lat, coords.lon))
				.then(res => {
					commit('setWeekForecast', res.data['daily'])
				})
		}
	}
}