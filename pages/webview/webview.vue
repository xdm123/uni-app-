<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="webviewUrl"></web-view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad(){
			console.log(this.webviewUrl)
		},
		computed:{
			...mapState([
				'webviewUrl'
			])
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
