import { weatherIcons } from '../helpers/weatherHelpers'

export default {
	methods: {
		getIcon(icon) {
			return weatherIcons.get(icon)
		}
	}
}