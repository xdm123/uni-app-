import {
	SET_CITY,
	SET_CITY_LOCATION,
	SET_CITY_ID,
	SET_CITY_LIST,
	SET_WEBVIEWURL
} from './mutation-types'

const mutations = {
	[SET_CITY](state,city){
		state.city = city
	},
	[SET_CITY_LOCATION](state,city){
		state.citylocation = city
	},
	[SET_CITY_ID](state,id){
		state.cityid = id
	},
	[SET_CITY_LIST](state,citylist){
		state.citylist = citylist
	},
	[SET_WEBVIEWURL](state,url){
		state.webviewUrl = url
	}
}

export default mutations