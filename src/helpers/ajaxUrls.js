const apiKey = '2b767df300e7db55a957ac3dd410d39b'
const postfix = '&units=metric'
const excludeOptions = '&exclude=current,minutely,hourly,alerts'

const ajaxUrls = {
	currWeatherByCityName: cityName => `/weather?q=${cityName}&appid=${apiKey}${postfix}`,
	currWeatherByCoords: (lat, lon) => `/weather?lat=${lat}&lon=${lon}&appid=${apiKey}${postfix}`,
	weekForecastByCoords: (lat, lon) => `onecall?lat=${lat}&lon=${lon}${excludeOptions}&appid=${apiKey}${postfix}`
}

export default ajaxUrls