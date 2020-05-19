<template>
	<view>
		<view id="switch" class="_flex _column _wrap">
			<view id="bar_position" class="_flex _row _auto _nowrap">
				<text>定位城市</text>
			</view>
			<view id="loc" class="_flex _row _auto _nowrap">
				<image src="../../static/img/resources/index-position.png"/>
				<text class="_auto ">{{citylocation}}</text>
			</view>
		
			<view id="bar_hot" class="_flex _row _auto _nowrap">
				<text>热门城市</text>
			</view>
			<view id="tag" class="_flex _row _wrap _start">
				<text v-for="(item,index) in citylist" 
				:key="index"  v-if="item.id != 66"
				:data-city='item.name'
				:data-cityid='item.id'
				 @click="choosecity">
					{{item.name}}
		    </text>
			</view>
		</view>
	</view>
</template>
<script>
	import {mapState,mapMutations} from 'vuex'
	import {SET_CITY_ID,SET_CITY} from '../../store/mutation-types'
	export default {
		data() {
			return {
				
			}
		},
		onLoad:function(){
			
		},
		computed:{
			...mapState([
				'city',
				'citylist',
				'citylocation'
			])
		},
		methods: {
			...mapMutations([
				SET_CITY,
				SET_CITY_ID
			]),
			choosecity:function(e){
				var city = e.currentTarget.dataset.city;
				var cityid = e.currentTarget.dataset.cityid;
				this.SET_CITY(city)
				this.SET_CITY_ID(cityid)
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style>

</style>
