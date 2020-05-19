<template>
	<view>
		<!-- 搜索 -->
		<view class="newhouse-search common-padding">
		  <view class="search-box" bindtap="routesearch">
		    <image src="../../../static/img/resources/newhouse/search.png"></image>
		    <text>搜索房源</text>
		  </view>
		  <!-- <image class="news" src="../../img/resources/newhouse/news.png"></image> -->
		</view>
		
		<!-- banner -->
		<view class="banner" v-if='homedata.bannerInfo.length>0'>
		  <swiper  
		  display-multiple-items='1'
		  indicator-dots="true"
		  autoplay="true" 
		  interval="5000" 
		  indicator-active-color="#fff"
		  indicator-color="#5d656d"
		  circular="true"
		  duration="500">    
		    <block v-for="(item,index) in homedata.bannerInfo" :key='index'>             
		      <swiper-item>									
		        <view 
		        class='box swiper-item' 
		        :data-targeturl="item.targetURL"
		        data-routename='banner'
		        @click="routerview"
		        >						
		          <image lazy-load :src="item.bannerImageName"></image>
		        </view>
		      </swiper-item>
		    </block>
		  </swiper>
		</view>
		
		<view class="banner" v-if='homedata.bannerInfo.length==0'>
		  <view class="banner-none"><image :src="imgurlhost + '/cache/weixin/newhouse/banner.png'"></image></view>
		</view>
		
		<!-- nav -->
		<view class="nav-bar">
		  <view 
		  v-for='(item,index) in navArr'
		  :data-path="item.pathto"
			:key='index'
		  :data-opendataid="item.opendataid"
		  @click="routego"
		  >
		    <image :src="item.url"></image>
		    <text>{{item.text}}</text>
		  </view>
		</view>
		
		<!-- 楼盘动态 -->
		<view class="tips" v-if="homedata.dynamic.length > 0">
		  <image class="tipe-image" :src="imgurlhost + '/cache/weixin/newhouse/tips.png'"></image>
		  <view class="tip-loop">
		    <swiper  
		    autoplay="true" 
		    interval="3000" 
		    vertical="true"
		    circular="true"
		    duration="500">             
		      <swiper-item 
		      v-for="(item,index) in homedata.dynamic" 
		      :key="index"
		      data-routename='dynamic'
		      :data-estateid="item.articleEstates.estateID"
		      :data-propertytypeid="item.articleEstates.propertyTypeID"
		      data-path="detail"
		      @click="routego"
		      >
		        <view class="tip-title-wrap">
		          <view class="tip-title">{{item.articleEstates.estateName}}</view>
		          <view class="tip-sub-title">{{item.title}}</view>
		        </view>
		        <image class="tip-image" :src="item.homeArticleImageName"></image>
		      </swiper-item>        
		    </swiper>
		  </view>
		</view>
		<view class="setbg" >
		  <!-- 楼盘导购 -->
		  <view class="card" v-if="homedata.guide.length > 0">
		    <view class="card_list">
		      <scroll-view class="scroll-view_H" scroll-x>
		        <view 
		        class="card_wrap"
		        v-for='(item,index) in homedata.guide'
		        :data-targeturl="item.targetURL"
		        data-routename='guide'
		        @click="routerview"
		        >
		          <image 
		          lazy-load
		          :src="imgurlhost + '/cache/weixin/newhouse/guide-'+index+'.png'" />
		          <view class="guide-text">{{item.title}}</view>
		        </view>
		      </scroll-view>
		    </view>
		  </view>
		
		  <!-- 为您推荐 -->
		  <view class="recommend common-padding" v-if="homedata.hotEstate.length > 0">
		    <view class="title">
		      <view>为您推荐</view>  
		      <view
		      @click="routego"
		      data-path="list"
		      >
		      查看更多
		      <image src="../../../static/img/resources/right.png"></image>
		      </view>
		    </view>
		    <view>
		      <view class="list-item" 
		      v-for='(item,index) in homedata.hotEstate'
		      data-path="detail"
		      :data-estateid="item.estateID"
		      :data-propertytypeid="item.propertyTypeID"
		      @click="routego"
		      >
		        <view class="image-wrap">
		          <image lazy-load="true" :src="item.coverImageName"></image>
		        </view>
		        <view class="content">
		          <view class="item-1">
		            <text>{{item.estateName}}</text>
		            <view class="tag">{{item.saleStatus_desc}}</view>
		          </view>
		          <view class="item-2">
		          <text>{{item.propertyTypeName}}</text>·
		          <text>{{item.estateAreaName}}</text>-
		          <text>{{item.estateAddress}}</text>
		          </view>
		          <view class="item-3">
		            <view class="item-tag"
		              v-for="(itemson,indexson) in item.tagList"
		              :key='indexson'
		            >{{itemson}}</view>
		          </view>
		          <view class="item-4">
		            <text>{{item.show_price}}</text>
		            <text
		             v-if='item.minBuildArea && item.maxBuildArea'
		            >建面{{item.minBuildArea}}-{{item.maxBuildArea}}㎡</text>
		          </view>
		        </view>
		      </view>
		    </view>
		  </view>
		</view>
		
		<!-- 加载框 -->
		<view class="loading" v-if="!loadstatus">
		    <image class="loading-img" src="../../../static/img/resources/load.png"></image>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import {SET_WEBVIEWURL} from '../../../store/mutation-types'
	export default {
		data() {
			return {
				loadstatus:false,
				imgurlhost:'https://res.5i5j.com', //图片服务器地址
				homedata:'', 
				navArr:[ //nav数组
					{
						url:'../../../static/img/resources/newhouse/allhouse.png',
						text:'全部楼盘',
						pathto:'list'
					},
					{
						url: '../../../static/img/resources/newhouse/newopen.png',
						text: '最近开盘',
						pathto:'list',
						opendataid:5
					},
					{
						url: '../../../static/img/resources/newhouse/mapsearch.png',
						text: '地图找房',
						pathto:'map'
					},
					{
						url: '../../../static/img/resources/newhouse/knowledge.png',
						text: '新房百科',
						pathto:'wiki'
					}
				]
			}
		},
		computed:{
			...mapState([
				'cityid'
			])
		},
		onLoad(){
			console.log(this.cityid)
			this.getData(this.cityid)
		},
		methods: {
			...mapMutations([
				SET_WEBVIEWURL
			]),
			//获取首页数据
			getData:function(cityid){
				var _this = this;
				this.loadstatus = false
				uni.request({
					url: 'https://appapi.5i5j.com/home/'+_this.cityid+'/info', //仅为示例，并非真实的接口地址
					data: {
						cityid: _this.cityid
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						console.log(res.data.data)
						_this.homedata = res.data.data
						_this.loadstatus = true
					}
				})
			},
			//跳转页面
			routego:function(e){
				var path = e.currentTarget.dataset.path;
				if(path == 'list'){
					var postdata = { //请求参数
						page: 1,
						pageSize: 15,
						keyword: '', //搜索关键字
						areaID: '', //区域ID
						priceID: '', //价格区间ID
						customPriceLow: '', //自定义最低价格
						customPriceTop: '', //自定义最高价格
						houseTypeID: '', //户型类型ID
						propertyTypeID: '', //业态类型ID
						trafficID: '', //交通ID
						tagID: '', //标签ID
						otherID: '', //其他销售状态ID
						openDate: '', //开盘时间
						budingArea: '', //面积
						totalPrice: '', //总价
						customTotalPriceLow: '', //自定义总价最低价格
						customTotalPriceTop: '', //自定义总价最高价格
						sortID: '', //排序ID
						swLat: '', //西南纬度
						swLng: '', //西南经度
						neLng: '', //东北经度
						neLat: '', //东北纬度
					}
					var opendataid = e.currentTarget.dataset.opendataid;
					postdata.openDate = opendataid
					uni.navigateTo({
						url:'../list/list?condition=' + JSON.stringify(postdata) + '&cityid=' + this.cityid,
					})
				}else if(path == 'detail'){
					var estateid = e.currentTarget.dataset.estateid;
					var propertytypeid = e.currentTarget.dataset.propertytypeid;
					wx.navigateTo({
						url: '/pages/newhouse/detail/detail?estateid='+estateid+'&propertytypeid='+propertytypeid,
					})
				}else if(path == 'map'){
					uni.showToast({
						icon:'none',
						title: '敬请期待',
					})
				}else if(path == 'wiki'){
					var targeturl = JSON.stringify('https://m.5i5j.com/appcms/wiki?city_id=' + this.cityid).split('"')[1]
					this.SET_WEBVIEWURL(targeturl)
					uni.navigateTo({
						url: '../../webview/webview'
					})
				}
			},
			//点击路由跳转
			routerview:function(e){
				console.log(1111)
				var routarr = ['banner','guide']
				var routename = e.currentTarget.dataset.routename
				if (routarr.indexOf(routename) != -1){
					var targeturl = JSON.stringify(e.currentTarget.dataset.targeturl).split('"')[1];
					this.SET_WEBVIEWURL(targeturl)
					console.log(targeturl)
					wx.navigateTo({
						url: '../../webview/webview'
					})
				}else{
					console.log('跳转详情页')
				}
			},
		}
	}
</script>

<style>
page{
  font-family: 'PingFang-Medium'
}
view{
  margin:0;
  padding:0;
}
.common-padding{
  padding:0 40rpx;
}
.newhouse-search{
  display: flex;
  align-items: center;
  margin-top: 10rpx;
  justify-content: space-between;
}
.search-box{
  height: 80rpx;
  /* width:578rpx; */
  width:100%;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 5rpx 20rpx 0 rgba(0,0,0,0.1);
  font-size: 28rpx;
  color:#A8A9AB;
  letter-spacing: 1px;
}
.search-box image{
  width:34rpx;
  height:34rpx;
  margin-left:27rpx;
  margin-right: 20rpx;
}
.news{
  width:38rpx;
  height:38rpx;
}
.banner{
  margin-top: 36rpx;
  height:200rpx;
  box-sizing: border-box;
  /* background:red; */
}
.banner-none{
  padding:0 40rpx;
  height:100%;
}
.banner-none image{
  width:100%;
  height:100%;
}
.banner swiper,.banner .swiper-item{
  width:100%;
  height:100%;
}
.banner .swiper-item image{
  width:calc(100% - 80rpx);
  height:100%;
  margin:0 auto;
  border-radius: 16rpx;
}
.swiper-item{
  justify-content: center;
  text-align: center;
}
.nav-bar{
  padding:0 60rpx;
  display: flex;
  margin-top:24rpx;
  margin-bottom: 32rpx;
  justify-content: space-between;
}
.nav-bar view{
  width:106rpx;
  text-align: center;
}
.nav-bar view image{
  width:106rpx;
  height:116rpx;
}
.nav-bar text{
  font-size: 24rpx;
  color:#292b33;
  margin-top: -17rpx;
  display: block;
}
.tips{
  width:calc(100% - 80rpx);
  height:100rpx;
  margin:0 auto;
  border-top:1px solid #ecebeb;
  display: flex;
  justify-content: flex-start;
  padding:36rpx 0;
}
.tipe-image{
  width:78rpx;
  height:76rpx;
  margin-left:32rpx;
}
.tip-loop{
  height:76rpx;
  width:calc(100% - 160rpx);
  overflow: hidden;
  margin-left:18rpx;
}
.tip-loop swiper-item,.tip-loop swiper{
  width:100%;
  height:100%;
}
.tip-loop swiper-item{
  display: flex;
  justify-content: space-between;
}
.tip-title-wrap{
  width:calc(100% - 100rpx);
  height:100%;
  color:#292b33;
}
.tip-title{
  height: 14px;
  font-size: 14px;
  line-height: 14px;
  margin: 11rpx 0 8rpx;

}
.tip-sub-title{
  height: 12px;
  font-size: 12px;
  line-height: 16px;
}
.tip-image{
  width:76rpx;
  height:76rpx;
}
.card{
  width:100%;
}
.card_list{
  width:100%;
  height:220rpx;
}
.scroll-view_H{
	white-space: nowrap;
	height:220rpx;
	display:flex;
}
.card_wrap{
  width:375rpx;
  height:220rpx;
  display: inline-block;
  margin-right:2rpx;
	border-radius:16px;
	overflow: hidden;
  position: relative;
  /* background: red; */
}
.card_wrap image{
  width:100%;
  height:100%;
}
.card_wrap .guide-text{
  position: absolute;
  z-index: 10;
  bottom: 56rpx;
  width: 86%;
  height:90rpx;
  line-height: 50rpx;
  display: block;
  font-size: 30rpx;
  color: #fff;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  left: 50%;
  white-space: normal;
  margin-left: -43%;
}
.scroll-view_H .card_wrap:nth-child(1){
  margin-left:40rpx;
}
.recommend .title{
  font-size: 44rpx;
  color:#292b33;
  font-weight: 600;
  margin-top:30rpx;
  margin-bottom: 42rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.recommend .title view:nth-child(2){
  font-size: 24rpx;
  color:#7d7e82;
}
.recommend .title view:nth-child(2) image{
  width:18rpx;
  height:18rpx;
}
.list-item{
  overflow: hidden;
  padding-bottom: 54rpx;
}
.image-wrap{
  width:210rpx;
  height:166rpx;
  float:left;
}
.image-wrap image{
  width:100%;
  height:100%;
  border-radius: 16rpx;
}
.content{
  width:calc(100% - 230rpx);
  float:right;
}
.item-1{
  font-size: 32rpx;
  color:#292b33;
  /* margin-right: 16rpx; */
}
.item-1 text{
  display: inline-block;
  margin-right: 16rpx;
}
.tag{
  display: inline-block;
  font-size: 12px;
  color:#1c60ea; 
  border-radius: 17rpx;
  background:skyblue;
  padding:2rpx 8rpx;
}
.item-2{
  font-size: 22rpx;
  color:#7d7e82;
  padding:8rpx 0 0rpx;
  width:100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-tag{
  display: inline-block;
  padding:3px;
  background:#ebf5f7;
  color:#608997;
  font-size: 22rpx;
  border-radius: 17rpx;
  margin-right: 8rpx;
}
.item-4{
  margin-top: -5rpx;
}
.item-4 text:nth-child(1){
  font-size: 32rpx;
  color:#ff522f;
}
.item-4 text:nth-child(2){
  font-size: 22rpx;
  color:#7d7e82;
  margin-left:16rpx;
}
.setbg{
  width:100%;
  background:#f8f8f8;
}
</style>
