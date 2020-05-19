<template>
	<view>
		<button @click="opentest">打开弹窗</button>
		
		<uni-popup ref="popup" type="bottom">
			<view class="box">dsadsadsaasa</view>
		</uni-popup>
	
		
	</view>
</template>

<script>
	import uniPopup from "../../components/uni-popup/uni-popup.vue"
	import {mapState} from 'vuex'
	export default {
		data(){
			return {
				
			}
		},
		components:{
			uniPopup	
		},
		onLoad(){
			
		},
		methods:{
			opentest(){
				 this.$refs.popup.open()
			},
			
		},
		computed:{
			...mapState([
				'city'
			])
		}
	}
</script>

<style>
	
	.box{
		width:100%;
		height:300rpx;
		background:#fff;
		position: fixed;
		bottom:0;
		left:0;
	}
</style>