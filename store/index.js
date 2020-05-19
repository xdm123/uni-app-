import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import mutations from './mutations'


const state = {
	city:'北京', //手动选择城市
	citylocation:'北京', //定位城市
	cityid:'1',
	citylist:'',
	webviewUrl:'', //webview页打开的链接
}
export default new Vuex.Store({
	state,
	mutations
})