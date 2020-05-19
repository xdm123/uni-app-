<template>
	<view>
		<!-- 搜索框 -->
		<view class="index">
			<view class="home-top">
				<view class="h-search-box flexbox b-s">
					<view class="city" data-type="choosecity" @click="routerPage">{{city || '北京市'}}</view>
					<image class="h-search" src="../../static/img/resources/home-search.png"></image>
					<view class="info" >请输入小区名或商圈</view>   
				</view>
			</view>
		</view>
		<!-- banner -->
		<view class="home-banner">
			<image src="https://res.5i5j.com/cache/weixin/common/home-banner.png"/>
		</view>
		
		<!-- nav -->
		<view class="home-nav _flex _row _icenter _around">
			<view @click="routerPage" data-type='sale'>
				<image src="../../static/img/resources/home-sale.png"/>
				<text>二手房</text>
			</view>
			<view>
				<image src="../../static/img/resources/home-rent.png"/>
				<text>租房</text>
			</view>
			<view @click="routerPage" data-type='newhouse'>
				<image class="newhouse" src="../../static/img/resources/home-newhouse.png"/>
				<text>新房</text>
			</view>
			<!-- <view data-type="community" bindtap="_dispatch" data-bindtap="navigateTo">
				<image src="/img/resources/home-xiaoqu.png"/>
				<text>小区</text>
			</view>
			<view data-type="broker" bindtap="_dispatch" data-bindtap="navigateTo" wx:if="{{state.city!='天津'}}">
				<image src="/img/resources/home-broker.png"/>
				<text>经纪人</text>
			</view>
			<view data-type="broker2" bindtap="_dispatch" data-bindtap="navigateTo" wx:if="{{state.city=='天津'}}">
				<image src="/img/resources/home-broker.png"/>
				<text>经纪人</text>
			</view> -->
		</view>
		<!-- 新增入口 -->
		<view class="home_nav_new">
		  <view data-type="community">
		    <image src="../../static/img/resources/nav_community.png"></image>
		    小区
		  </view>
		  <view data-type="broker" v-if='city!="天津"'>
		    <image src="../../static/img/resources/nav_broker.png"></image>
		    经纪人
		  </view>
		  <view data-type="broker2" v-if='city=="天津"'>
		    <image src="../../static/img/resources/nav_broker.png"></image>
		    经纪人
		  </view>
		  <view data-type="sellhouse" >
				<image src="../../static/img/resources/nav_sale.png"></image>
				卖房
			</view>
		  <view data-type="rentout" >
				<image src="../../static/img/resources/nav_rent.png"></image>
				出租
			</view>
		</view>
		<view v-if="loadingdone">
			<!-- houseknowledge -->
			<view class="houseknowledge"> 
				<image 
				@click="routerPage"
				data-type="houseknowledge"
				:data-url="houseknowledge.moreUrl"
				src="../../static/img/resources/zixun.png"></image>
				<view class="knowledge_title">
					<swiper
						autoplay="true" 
						interval="2000" 
						vertical="true"
						circular="true"
						duration="500">
						<block v-for="(item,index) in houseknowledge.list" :key='index'>
							<swiper-item>
								<view
								@click="routerPage"
								data-type="houseknowledge"
								:data-url="item.url"
								class="swiper-item">{{item.title}}</view>
							</swiper-item>
						</block>
					</swiper>
				</view>
				<view
			  @click="routerPage"
			  data-type="houseknowledge"
			  :data-url="houseknowledge.moreUrl"
			  class="more_knowledge">更多</view>
			</view>
			<!-- houseknowledge -->
			<!-- hotrecommend -->
			  <view class="helpYouPick" v-if='hotrecommend.length > 0'>
			    <view class='title'>热门推荐</view>
			   <view class="hotrecommend_tab">
			      <view 
			      v-for="(item,index) in hotrecommend"
						:key="index"
			      :class="'tab_' + index"
						:style="{background:'url('+item.hotimgurl+') no-repeat center',backgroundSize:'100%'}"
			      >
			        <view class="tag_name">{{item.tag_name}}</view>
			        <view class="tab_title">{{item.title}}</view>
			        <view class="sub_title">{{item.sub_title}}</view>
			      </view>
			    </view>
			  </view>
			<!-- hotrecommend -->
			<!-- helpYouPick -->
			<view class="helpYouPick" v-if='helpYouPick.length > 0'>
				<view class='title'>帮你挑</view>
				<view class="pick_list">
					<scroll-view class="scroll-view_H" scroll-x>
						<view 
						data-bindtap="routewebview" 
						class="pick_item_wrap" 
						v-for="(item,index) in helpYouPick" 
						:key="index"
						>
							<view class="pick_image_wrap">
								<image :src="item.imgurl"></image>
								<view class="title">{{item.title}}</view>
								<view class="title sub_title">{{item.sub_title}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<!-- helpYouPick -->
			<!-- helpYouRent -->
			<view class="helpYouPick" v-if='helpYouRent.length > 0'>
				<view class='title'>帮你租</view>
				<view class="pick_list">
					<scroll-view class="scroll-view_H" scroll-x>
						<view 
						class="pick_item_wrap" 
						v-for="(item,index) in helpYouRent" 
						:key="index"
						>
							<view class="pick_image_wrap">
								<image :src="item.imgurl"></image>
								<view class="title">{{item.title}}</view>
								<view class="title sub_title">{{item.sub_title}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<!-- helpYouRent -->
			<!-- commuitytest -->
			<view class="communitytest" v-if="communitytest.list.length > 0">
				<view class='title'>小区测评</view>
				<view class="pick_list">
					<scroll-view enable-flex class="scroll-view_H" scroll-x>
						<view 
						class="community_total">
						<image class="community_image" src="../../static/img/resources/community_index.png"></image>
							<view class="absolute_txt">
								了解小区真实面貌
							</view>
							<view class="absolute_total">
								<text style="font-size:60rpx; margin-right:10rpx;">{{communitytest.count}}</text>套
							</view>
						</view>
		
						<view class="community_list">
							<view
							class="pick_item_wrap" 
							v-for="(item,index) in communitytest.list"
							:key='index'
							>
								<view class="pick_image_wrap">
									<image :src="item.img"></image>
									<view class="socer">
										{{item.total_score}}分
										<view class="star_wrap">
											<view v-for="(itemson,indexson) in setstar.setStarArr(item.total_score)" :key='indexson'>
												<image :src="itemson == 3 ? '../../static/img/resources/star.png' : itemson == 2 ? '../../static/img/resources/starhalf.png':'../../static/img/resources/star_bg.png'"></image>
											</view>
										</view>
									</view>
									<view class="title">{{item.community_name}}</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<!-- commuitytest -->
			<!-- 推荐房源 -->
			<view class="h-tit" v-if='recommendList'>推荐房源</view>
			<view class="house-list recommend">
				<view class="list-item flexbox" v-for="(item,index) in recommendList" :key="index" >
					<view class="item-img">
						<image :src='item.imgurl==null || item.imgurl=="" ? "../../static/img/resources/default_house_list_404.png" : item.imgurl'></image>
						<text class="zhenxuan" v-if="item.housetag">甄选</text>
						<view class="icon3d hz-3d" v-if="item.flag3d==1"><image src='../../static/img/resources/icon3d.png'></image></view>
						<view class="iconhz hz-3d" v-if="item.flag3d==2"><image src='../../static/img/resources/iconhz.png'></image></view>
					</view>
					<view class="item-con flex1">
						<text class="item-tit">{{item.housetitle}}</text>          
						<view class="item-info"> 
							<text>{{ item.bedroom + '室' + item.livingroom + '厅' + item.toilet + '卫' }}</text>
							<text class="dian"></text>
							<text>{{ item.buildarea }}㎡</text>
							<text class="dian"></text>
							<text>{{item.heading}}</text>
							<text class="dian"></text>
							<text>{{item.communityname}}</text>
						</view>
						<view class="item-label" v-if="item.tagwall != ''">           
							<text v-for="(itemtag,indextag) in item.tagwall" :key="indextag" class="tag">{{itemtag}}</text>
						</view>
						<view class="item-price">
							<view class="wan-price"><text class="num">{{item.price}}</text><text class="wan"></text></view>
							<text class="ping">{{item.unitprice}}</text> 
						</view>     
					</view>
				</view>
				<view v-if="recommendList" class="look-link"><text>查看全部二手房</text></view>
			</view>
		</view>
		<view class="loading" v-if="!loadingdone">
				<image class="loading-img" src="../../static/img/resources/load.png"></image>
		</view>
	</view>
</template>

<!-- wxs引入 -->
<script module="setstar" lang="wxs" src='../../common/wxs/tool.wxs'></script>

<script>
	import commonConfig from '../../common/js/commonConfig.js';
	import setstar from '../../common/wxs/tool.wxs'
	import QQMapWX from '../../common/js/qqmap-wx-jssdk.min.js'
	import { mapState } from 'vuex';
	import {mapMutations} from 'vuex'
	import {SET_CITY , SET_CITY_LOCATION,SET_CITY_ID,SET_CITY_LIST,SET_WEBVIEWURL} from '../../store/mutation-types'
	export default {
		data() {
			return {
				houseknowledge:[], //房产资讯
				helpYouPick:[],
				helpYouRent:[],
				communitytest:[],
				recommendList:[],
				hotrecommend:[],
				loadingdone:false
			}
		},
		onLoad(options) {
			this.getlocationCity()
		},
		computed:{
			...mapState([
				'city',
				'cityid'
			])
		},
		watch:{
			city(){
				console.log(this.cityid)
				this.getData(this.cityid)
			}
		},
		methods: {
			...mapMutations([
				SET_CITY,
				SET_CITY_LOCATION,
				SET_CITY_ID,
				SET_CITY_LIST,
				SET_WEBVIEWURL
			]),
			getData:function(cityid){
				var urlhost = commonConfig.urlhost
				this.loadingdone = false
				uni.request({
				    url: urlhost + '/appapi/newindex/'+cityid+'/v1/weixinindex', 
						method:'POST',
				    header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', 'deviceSource': 3 },//表单数据发送时的
				    success: (res) => {
							console.log(res.data.data);
							var data = res.data.data
							this.houseknowledge = data.houseknowledge
							this.helpYouPick = data.helpYouPick
							this.helpYouRent = data.helpYouRent
							this.communitytest = data.commuitytest
							this.recommendList = data.recommendHouses
							this.hotrecommend = data.hotrecommend
							this.loadingdone = true
				    }
				});
			},
			//路由跳转
			routerPage:function(e){
				var type = e.currentTarget.dataset.type;
				console.log(type)
				var url = ''
				if(type == 'choosecity'){
					url = '/pages/citylist/citylist'
				}else if(type == 'houseknowledge'){
					var webviewUrl = e.currentTarget.dataset.url;
					this.SET_WEBVIEWURL(webviewUrl);
					url = '/pages/webview/webview'
				}else if(type == 'sale'){
					url = '/pages/sale_rent_list/sale_rent_list'
				}else if(type == 'newhouse'){
					url = '/pages/newhouse/newhouseindex/newhouseindex'
				}
				uni.navigateTo({
					url:url
				})
			},
			//获取定位城市
			getlocationCity:function(){
				var _this = this
				//定位城市
				var qqmapsdk
				qqmapsdk = new QQMapWX({
					key: 'PHJBZ-23WC3-WZH3J-YCJHE-ZOSVV-FXBOB'
				});
				qqmapsdk.reverseGeocoder({
					success:res=>{
						console.log(res)
						var city = res.result.address_component.city.substr(0,2)
						console.log(city)
						_this.SET_CITY(city)
						_this.SET_CITY_LOCATION(city)
						_this.getCityList(city)
					}
				})
				
			},
			//获取城市对应id
			getCityList(city){
				var _this = this
				uni.request({
					url:'https://appapi.5i5j.com/appapi/home/switchweb',
					success:function(res){
						console.log(res)
						var citylist = res.data.data;
						_this.SET_CITY_LIST(citylist)
						citylist.map(item=>{
							if(item.name == city){
								_this.SET_CITY_ID(item.id)
								_this.getData(item.id)
							}
						})
						
					}
				})
			},
		},
		onShow(){
			
		},
		onHide(){
			
		},
		onUnload(){
			
		}
	}
</script>

<style>
	@import url("@/common/css/common.css");
	/*首页*/
	.index {
	  width: 100%;
	  height: 100%;
	  font-size: 28rpx;
	}
	.flexbox{display:-webkit-box;display:flex;}
	.b-s{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}
	.home-top{padding:0 40rpx;}
	.h-search-box{width:100%;height:80rpx;align-items:center;justify-content:space-between;padding:0 30rpx;color:#292B33;border-radius:16rpx;box-shadow:0 5rpx 20rpx 0 rgba(0,0,0,0.1);margin-top:10rpx;}
	.h-search-box .city{width:110rpx;line-height:100%;position:relative;border-right:1rpx solid #D8D6D6;}
	.h-search-box .city::after{content:"";position:absolute;width:10rpx;height:10rpx;border:4rpx solid #d8d6d6;border-top:transparent;border-left:transparent;top:calc(50% - 8rpx);right:20rpx;transform:rotate(45deg);}
	.h-search-box .info{width:calc(100% - 180rpx);color:#A8A9AB;}
	.h-search-box .h-search{width:44rpx;height:44rpx;}
	.home-search{width:100%;}
	.home-banner{width:666rpx;margin:36rpx auto;}
	.home-banner image{width:666rpx;height:200rpx;display:block;}
	.home-nav{width:100%;text-align:center;font-size:28rpx;}
	.home-nav image{display:block;width:120rpx;height:110rpx;}
	.h-tit{padding:60rpx 0 20rpx 40rpx;font-size:40rpx;font-weight:bold;}
	.look-link{padding:0 30rpx;margin:30rpx 0 40rpx 0;}
	.look-link text{display:block;line-height:80rpx;font-size:30rpx;color:#FFB102;background:#F7F7F7;border-radius:15rpx;text-align:center;}
	/* 改版增加入口 */
	.home-nav .newhouse{
	 width: 96rpx;
	  height: 96rpx;
	  margin-bottom: 12rpx;
	}
	.home_nav_new{
	  padding:0 40rpx;
	  display: flex;
	  justify-content: space-around;
	  font-size: 28rpx;
	  margin-top: 60rpx;
	}
	.home_nav_new view{
	  padding:0 10rpx;
	  text-align: center;
	}
	.home_nav_new image{
	  width:40rpx;
	  height:39rpx;
	  display: block;
	  margin:0 auto 16rpx;
	}
	/* helpyoupick */
	.helpYouPick .title,.communitytest .title{
	  padding:60rpx 40rpx 42rpx;
	  height:40rpx;
	  font-size:21px;
	  color:rgba(41,43,51,1);
		line-height:20px;
		font-weight: bold;
	}
	.pick_list{
		width:100%;
		height: 350rpx;
	}
	.scroll-view_H{
	  /* width:100%; */
		white-space: nowrap;
		height:350rpx;
		display:flex;
		/* align-items:flex-start; */
		/* justify-content: space-between; */
	}
	.scroll-view_H .pick_item_wrap:nth-child(1){
	  margin-left:40rpx;
	}
	.community_list .pick_item_wrap:nth-child(1){
	  margin-left:0rpx;
	}
	.community_total{
		margin-left:40rpx;
		width:300rpx;
		height:auto;
		display: inline-block;
		/* background:red; */
		margin-right:24rpx;
		position: relative;
	}
	.pick_item_wrap{
	  width:300rpx;
	  height:312rpx;
	  display: inline-block;
	  margin-right:24rpx;
	  box-shadow:0px 12rpx 30rpx 0px rgba(0, 0, 0, 0.06);
		border-radius:16px;
		overflow: hidden;
	}
	.pick_item_wrap image{
	  width:300rpx;
	  height:199rpx;
	  border-radius:16px 16px 0px 0px;
	}
	.pick_item_wrap .title{
	  height:30rpx;
	  font-size: 30rpx;
	  padding:0 25rpx;
	  color:#292B33;
	  margin-top: 10rpx;
	}
	.pick_item_wrap .sub_title{
	  font-size: 12px;
	  color:#9D9DA1;
	}
	.socer{
		padding:0 25rpx;
		font-size: 12px;
		margin-top: 8rpx;
	  display:flex;
	}
	.star_wrap{
	  display:flex;
	  margin-left:14rpx;
	}
	.socer image{
	  width:18rpx;
		height:18rpx;
		margin-right:1px;
	  /* float:left; */
	}
	.communitytest .pick_item_wrap .title{
		margin-top: 6rpx;
	}
	.houseknowledge{
		padding:0 40rpx;
		height:90rpx;
		font-size: 24rpx;
		line-height: 90rpx;
		overflow: hidden;
		display: flex;
		margin-top:40rpx;
		align-items: center;
		justify-content: space-between;
	}
	.houseknowledge image{
		width:122rpx;
		height:38rpx;
		display: inline-block;
	}
	.knowledge_title swiper{
		width:448rpx;
		height:60rpx;
	}
	.knowledge_title{
		width:448rpx;
		height:60rpx;
	}
	.more_knowledge{
		border-left:1px solid #D8D6D6;
		color:#D8D6D6;
		height:38rpx;
		line-height: normal;
		padding-left:15rpx;
	}
	.knowledge_title swiper-item{
		width:448rpx;
		height:60rpx;
		line-height:60rpx;
	}
	.swiper-item{
		width:100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height:60rpx;
	}
	.community_total .community_image{
		width:300rpx;
		height:312rpx;
	}
	.pick_item_wrap .community_image{
		width:100%;
		height:100%;
	}
	.absolute_txt,.absolute_total{
		position: absolute;
		top:0;
		left:0;
		color:#fff;
		padding:50rpx 40rpx 0;
		font-size: 14px;
	}
	.absolute_total{
		top:55rpx;
	}
	.community_list{
		display: inline-block;
		white-space: nowrap;
	}
	.hotrecommend_tab{
	  padding:0 40rpx;
	  overflow: hidden;
	}
	.hotrecommend_tab .tab_0{
	  width:320rpx;
	  height: 413rpx;
	  float:left;
	  position: relative;
	  border-top-left-radius: 10px;
	  border-bottom-left-radius: 10px;
	}
	.hotrecommend_tab .tab_1{
	  width:320rpx;
	  height: 193rpx;
	  float:right;
	  position: relative;
	  border-top-right-radius: 10px;
	}
	.hotrecommend_tab .tab_2{
	  width:320rpx;
	  height: 193rpx;
	  float:right;
	  position: relative;
	  margin-top: 27rpx;
	  border-bottom-right-radius: 10px;
	}
	.hotrecommend_tab .tag_name{
	  height:36rpx;
	  line-height: 36rpx;
	  font-size: 10px;
	  color:#292b33;
	  width:113rpx;
	  background:#fff;
	  text-align: center;
	  border-radius: 12px;
	  margin-top: 27rpx;
	  margin-left:30rpx;
	}
	.hotrecommend_tab .tab_title{ 
	  font-size:16px;
	  color:#fff;
	  position: absolute;
	  left:30rpx;
	  bottom:55rpx;
	}
	.hotrecommend_tab .sub_title{
	  font-size:12px;
	  color:#fff;
	  position: absolute;
	  left:30rpx;
	  bottom:18rpx;
	}
	.messageNumber{
	  position: absolute;
	  top:-3rpx;
	  right: 60rpx;
	  background-color:red;
	  color:#fff;
	  width:40rpx;
	  height:40rpx;
	  text-align: center;
	  line-height:40rpx;
	  border-radius:20rpx;
	}
	/*列表*/
	.page-box{height:calc(100% - 200rpx);position:absolute;top:190rpx;padding-top:10rpx;background:#fff;}
	.list-item{padding:27rpx 40rpx;background:#fff;}
	.item-img{width:210rpx;height:166rpx;position:relative;}
	.item-img image{width:210rpx;height:166rpx;border-radius:16rpx;}
	.item-con{width:calc(100% - 220rpx);font-size:24rpx;padding-left:20rpx;margin-top:-5rpx;text-align:justify;}
	.item-tit{width:100%;display:inline-block;
	font-size:32rpx;font-weight:bold;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;color:#292B33;}
	.item-info{width:100%;display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#7D7E82;margin-top:10rpx;font-size:22rpx;}
	.item-price{margin-top:8rpx;}
	.item-price .ping{color:#7d7e82;display:inline-block;font-size:24rpx;}
	.item-price .wan-price{color:#FF522F;display:inline-block;padding-right:20rpx;}
	.wan-price .num{font-weight:bold;font-size:30rpx;padding-right:5rpx;}
	.wan-price .wan{font-size:22rpx;}
	.item-label{height:46rpx;overflow:hidden;}
	.item-label text{display:inline-block;font-size:22rpx;border-radius:7rpx;padding:8rpx 12rpx;margin-right:10rpx;line-height:100%;margin-top:8rpx;}
	.item-label .tag{background:#ebf5f7;color:#608997;}
	.item-label .tag:last-child{margin-right:0;}
	.dian{position:relative;padding:0 10rpx;}
	.dian::after{content:'';position:absolute;width:6rpx;height:6rpx;background:#CDCFD0;left:8rpx;top:14rpx;border-radius:50%;}
	.house-no{width:100%;position:absolute;top:200rpx;text-align:center;padding:100rpx 0;}
	.rent-type{display:inline-block;font-size:22rpx;border-radius:7rpx;padding:5rpx 12rpx;line-height:100%;color:#777;border:1rpx solid #ddd;}
	/*甄选 3d 换装 图标 相寓*/
	.zhenxuan,.xiangyu,.xiajia{position:absolute;left:10rpx;top:10rpx;font-size:22rpx;color:#fff;padding:7rpx 12rpx;line-height:100%;text-align:center;border-radius:6rpx;}
	.zhenxuan{background:linear-gradient(to right,#ffc30e,#ff9d00);}
	.hz-3d{width:44rpx;height:44rpx;position:absolute;left:10rpx;bottom:10rpx;font-size:24rpx;-webkit-animation:icon-circle 3s linear infinite;-moz-animation:icon-circle 3s linear infinite;-o-animation:icon-circle 3s linear infinite;animation:icon-circle 3s linear infinite;}
	.hz-3d image{width:100%;height:100%;}
	.xiangyu{background:linear-gradient(to right,#BB77F5,rgb(134, 87, 253));}
	.house-list{
		padding-bottom:40rpx;
	}
</style>
