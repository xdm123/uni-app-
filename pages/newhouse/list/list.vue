<template>
	<view>
		<!-- 搜索 -->
		<view class="list-search">
		  <view class="list-search-box" @click="searchhouse">
		    <image src="../../../static/img/resources/newhouse/search.png"></image>
		    <text>输入小区或商圈名称</text>
		  </view>
		  <!-- <image class="list-news" src="../../../img/resources/newhouse/news.png"></image> -->
		</view>
		
		<!-- tab -->
		<view class="list-tab">
		  <view 
		  v-for="(item,index) in tabArr"
			:key='index'
		  class="list-item"
			:class="item.select ? 'filter-cur' : tabindex == index ? 'filter-cur' : ''"
		  @click="filtertabFn"
		  :data-index='index'
		  >
		    <view v-if="item.name != '排序'">
		      <text>{{item.name}}</text>
		      <text class="arrow"></text>
		      <view class="item-border"></view>
		    </view>
		    <view v-else>
		      <image 
		      :src="item.select ? '../../../static/img/resources/newhouse/sort_select.png' : tabindex == index ? '../../../static/img/resources/newhouse/sort_select.png' : '../../../static/img/resources/newhouse/sort.png'"
		      ></image>
		    </view>
		  </view>
		</view>
		
		<!-- 列表 -->
		<view class="list-data">
		  <scroll-view
		  scroll-y="true"
		  lower-threshold='50'
		  @scrolltolower='scrolltolower'
		  >
		    <view 
		    class="list-ctn"
		    v-for="(item,index) in listdata"
		    :key="item.estateID"
		    :data-estateid="item.estateID"
		    :data-propertytypeid="item.propertyTypeID"
		    @click="routego"
		    >
		      <view class="image-wrap">
		        <image lazy-load='true' :src="item.coverImageName"></image>
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
		          v-if="item.minBuildArea && item.maxBuildArea"
		          >建面{{item.minBuildArea}}-{{item.maxBuildArea}}㎡</text>
		        </view>
		      </view>
		    </view>
		  </scroll-view>
		  <view class="nodata" v-if="datastatus">
		    <image src="../../../static/img/resources/no-house.png"></image>
		    <text>没有找到相关房源</text>
		  </view>
		</view>
		
		<!-- 筛选条件 -->
		<view class="filter" v-if="tabindex != 5">
		  <view class="filter-box" @click="hidefilter" v-if="tabindex != 5"></view>
		  <view class="area" v-if="tabindex == 0" >
		    <view class="area-left">
		      <view 
		      @click.stop="checkarea" 
		      data-index='0'
		      :class="areaFirstSelect == 0 ? 'filter-cur' :''">区域</view>
		      <view
		      @click.stop="checkarea"
		      data-index='1'
		      :class="areaFirstSelect == 1 ? 'filter-cur' :''">地铁</view>
		    </view>
		    <view class="area-right">
		      <scroll-view scroll-y='true'>
		        <view 
		        @click="areasecondFn"
		        data-areaid='bx'
		        class="bx"
						:class="postdata.areaID == '' && postdata.trafficID == '' ? 'filter-cur' : ''"
						>不限</view>
		        <view 
		        v-for='(item,index) in areaData' 
		        :data-areaid='item.areaID || item.trafficID'
		        :data-name="item.areaName || item.trafficName"
		        @click="areasecondFn"
		        :class="item.areaID == postdata.areaID ? 'filter-cur' : '' || item.trafficID == postdata.trafficID ? 'filter-cur' : ''"
		        :key="item.areaID || item.trafficID">
		          {{item.areaName || item.trafficName}}
		        </view>
		      </scroll-view>
		    </view>
		  </view>
		  <view class="price" v-if="tabindex == 1">
		    <view class="price-left">
		      <view 
		      @click="checkprice" 
		      data-index='0'
		      :class="priceFirstSelect == 0 ? 'filter-cur' :''">总价</view>
		      <view
		      @click="checkprice"
		      data-index='1'
		      :class="priceFirstSelect == 1 ? 'filter-cur' :''">单价</view>
		    </view>
		    <view class="price-right">
		      <scroll-view scroll-y='true'>
		        <view 
		        data-priceid=""
		        @click="pricesecondFn"
						:class="postdata.priceID == '' && postdata.customPriceLow == '' && postdata.customPriceTop == '' && postdata.customTotalPriceLow == '' && postdata.customTotalPriceTop == '' ? 'filter-cur' : ''"
		        class="bx">不限</view>
		        <view 
		        v-for='(item,index) in peiceData' 
		        :key="item.id"
		        @click="pricesecondFn"
		        :class="postdata.priceID == item.id ? 'filter-cur' : ''"
		        :data-priceid="item.id"
		        :data-name="item.name || item.regionName"
		        >
		          {{item.name || item.regionName}}
		        </view>
		      </scroll-view>
		    </view>
		    <view class="custom">
		      <view>自定义</view>
		      <input 
		      class="minprice" 
		      data-type="min"
		      bindinput="inputprice"
		      :value="minprice"
		      maxlength="7"
		      placeholder="最低价"></input>
		      <view class="hx">-</view>
		      <input 
		      class="topprice" 
		      :value="maxprice"
		      data-type="max"
		      bindinput="inputprice"
		      maxlength="7"
		      placeholder="最高价"></input>
		      <text>万</text>
		      <view @click="priceconfirm" class="confirm-btn">确定</view>
		    </view>
		  </view>
		  <view class="housetype" v-if="tabindex == 2">
		    <scroll-view scroll-y='true'>
		      <view 
		      :class="postdata.houseTypeID == '' ? 'filter-cur' : ''"
		      data-housetypeid=''
		      @click='housetypeFn'
		      >不限</view>
		      <view 
		      v-for="(item,idex) in housetypeData" 
		      :data-housetypeid="item.id"
		      :data-name='item.houstTypeName'
		      :class="postdata.houseTypeID == item.id ? 'filter-cur':''"
		      @click='housetypeFn'
		      :key='item.id'>
		        {{item.houstTypeName}}
		      </view>
		    </scroll-view>
		  </view>
		  <view class="moretag" v-if="tabindex == 3">
		    <view class="tag-ctn">
		     <scroll-view scroll-y='true'>
		        <view class="moretag-title">面积</view>
		        <view style="overflow:hidden;">
		          <view 
		          data-type='budingArea'
		          @click="moretagFn"
		          data-id=''
							:class="postdatafront.budingArea == '' ? 'filter-cur' : ''"
		          class="more-tag-item"
		          >不限</view>
		          <view 
		          data-type='budingArea'
		          @click="moretagFn"
		          :data-id='item.id'
							:class="postdatafront.budingArea == item.id ? 'filter-cur' : ''"
		          class="more-tag-item"
		          v-for='(item,index) in filterData.budingArea'
		          :key="item.id"
		          >
		            {{item.name}}
		          </view>
		        </view>
		        <view class="moretag-title">售卖状态</view>
		        <view style="overflow:hidden;">
		          <view 
		          data-type='otherID'
		          @click="moretagFn"
		          data-id=''
		          class="more-tag-item"
							:class="postdatafront.otherID == '' ? 'filter-cur' : ''"
		          >不限</view>
		          <view 
		          data-type='otherID'
		          @click="moretagFn"
		          v-for="(item,index) in filterData.other"
		          :key="ite.id"
		          :data-id='item.id'
		          class="more-tag-item"
							:class="postdatafront.otherID == item.id ? 'filter-cur' : ''"
		          > 
		            {{item.otherName}}
		          </view>
		        </view>
		        <view class="moretag-title">类型</view>
		        <view style="overflow:hidden;">
		          <view 
		          data-type='propertyTypeID'
		          @click="moretagFn"
		          data-id=''
							:class="postdatafront.propertyTypeID == '' ? 'filter-cur' : ''"
		          class="more-tag-item"
		          >不限</view>
		          <view 
		          data-type='propertyTypeID'
		          @click="moretagFn"
		          v-for="(item,index) in filterData.propertyType"
		          :key="item.propertyTypeID"
		          :data-id='item.propertyTypeID'
							:class="postdatafront.propertyTypeID == item.propertyTypeID ? 'filter-cur' : ''"
		          class="more-tag-item"
		          > 
		            {{item.propertyTypeName}}
		          </view>
		        </view>
		        <view class="moretag-title">特色</view>
		        <view style="overflow:hidden;">
		          <view 
		          data-type='tagID'
		          @click="moretagFn"
		          data-id=''
							:class="postdatafront.tagID == '' ? 'filter-cur' : ''"
		          class="more-tag-item"
		          >不限</view>
		          <view 
		          data-type='tagID'
		          @click="moretagFn"
		          v-for="(item,index) in filterData.tag"
		          :key="item.tagID"
		          :data-id='item.tagID'
							:class="postdatafront.tagID == item.tagID ? 'filter-cur' : ''"
		          class="more-tag-item"
		          > 
		            {{item.tagName}}
		          </view>
		        </view>
		        <view class="moretag-title">开盘时间</view>
		        <view style="overflow:hidden;">
		          <view 
		          data-type='openDate'
		          @click="moretagFn"
		          data-id=''
							:class="postdatafront.openDate == '' ? 'filter-cur' : ''"
		          class="more-tag-item"
		          >不限</view>
		          <view 
		          data-type='openDate'
		          @click="moretagFn"
		          v-for="(item,index) in filterData.openDate"
		          :key="ite.id"
		          :data-id='item.id'
							:class="postdatafront.openDate == item.id ? 'filter-cur' : ''"
		          class="more-tag-item"
		          > 
		            {{item.otherName}}
		          </view>
		        </view>
		      </scroll-view>
		    </view>
		    <view class="tab-btn">
		      <view @click="moreCancel">重置</view>
		      <view @click="moreConfirm">确定</view>
		    </view>
		  </view>
		  <view class="sorttab" v-if="tabindex == 4">
		    <view
		    :class="postdata.sortID == '' ? 'filter-cur' : ''"
		    data-sortid=''
		    @click='sortFn'
		    >默认排序</view>
		    <view 
		    @click='sortFn'
		    :data-sortid="item.id"
		    :class="postdata.sortID == item.id ? 'filter-cur' : ''"
		    v-for="(item,index) in filterData.order"
		    :key="item.id"
		    >
		      {{item.orderName}}
		    </view>
		  </view>
		</view>
		
		<!-- 记载框 -->
		<view class="loading" v-if="!loadstatus">
		    <image class="loading-img" src="../../../static/img/resources/load.png"></image>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				cityid:'1',
				loadstatus:false, //是否加载完成
				showcount:true, //是否提示找到房源总数
				filterData:[], //搜索标签
				areaData:[], //区域搜索标签
				peiceData:[], //价格搜索标签
				housetypeData:[], //房型所搜标签
				tabArr:[
					{
						name:'区域',
						select:false
					}, {
						name: '价格',
						select: false
					}, {
						name: '房型',
						select: false
					}, {
						name: '更多',
						select: false
					}, {
						name: '排序',
						select: false
					}
				],
				tabindex:5, //控制tab选中样式
				areaFirstSelect:0, //区域条件下一级选中
				priceFirstSelect: 0, //价格条件下一级选中
				postdata:{ //请求参数
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
				},
				postdatafront:{
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
				},
				listdata:[],
				datastatus:false, // 是否有数据
				count:'', //房源总数
				pageCount:'', //房源总页数
				minprice:'', //自定义最低价格
				maxprice:'', //自定义最高价格
			}
		},
		onLoad(options){
			console.log(options)
			this.cityid = options.cityid
			if(options.condition){
				this.setcondition(options)
			}
			this.getlistData()
			this.getTagList()
		},
		methods: {
			//处理所搜条件
			setcondition:function(data){
				var postdata = JSON.parse(data.condition)
				var tabArr = this.tabArr
				if(postdata.budingArea || postdata.otherID || postdata.openDate || postdata.propertyTypeID || postdata.tagID){
					tabArr[3].select = true
				}
				if(postdata.areaID){
					tabArr[0].select = true
				}
				this.postdata = postdata
				this.tabArr = tabArr
			},  
			
			//获取列表数据
			getlistData:function(){
				var _this = this
				this.loadstatus = false
				this.datastatus = false
				// console.log(_this.data.postdata)
				var postjson = _this.postdata;
				postjson['cityid'] = _this.cityid
				wx.request({
					url: 'https://appapi.5i5j.com/estate/'+_this.cityid+'/list', //仅为示例，并非真实的接口地址
					method: 'POST',
					data: postjson,
					header: {
						'content-type': 'application/x-www-form-urlencoded' // 默认值
					},
					success(res) {
						console.log(res)
						if(res.data.status == '200'){
							// console.log(res.data.data)
							var setDataArr = _this.listdata.concat(res.data.data.results)
							var nodata;
							var str = '共找到' + res.data.data.count + '套房源'
							// console.log(setDataArr)
							_this.listdata = setDataArr
							_this.count = res.data.data.count
							_this.pageCount = res.data.data.pageCount
							_this.loadstatus = true
							
							
							if(_this.showcount){
								setTimeout(function () {
									uni.showToast({
										icon: 'none',
										title: str,
									})
								}, 500)
							}
							var page = _this.postdata.page
							var postdata = _this.postdata
							page += 1
							postdata.page = page
							_this.postdata = postdata
							// console.log(_this.data.postdata)
						}else if(res.data.status == '204'){
							_this.loadstatus = true,
							_this.datastatus = true
						}
					}
				})
			},
			
			//获取筛选标签 
			getTagList:function(){
				var _this = this
				wx.request({
					url: 'https://appapi.5i5j.com/appapi/location/'+_this.cityid+'/index', 
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' // 默认值
					},
					success(res) {
						_this.filterData = res.data.data,
						_this.areaData = res.data.data.area,
						_this.peiceData = res.data.data.totalPrice,
						_this.housetypeData = res.data.data.houseType
				
						//从搜索页返回时显示对应商圈名字
						if(_this.postdata.areaID){
							var tabarr = _this.tabArr;
							var areaid = _this.postdata.areaID;
							var areaname = ''
							res.data.data.area.map((item)=>{
								if(areaid == item.areaID){
									areaname = item.areaName
								}
							})
							tabarr[0].name = areaname
							_this.tabArr = tabarr
						}
					}
				})
			},
			
			//滚动到底部加载数据
			scrolltolower:function(){
				var pagecount = this.pageCount
				var page = this.postdata.page
				if (page <= pagecount){
					this.showcount = false
					this.getlistData()
				}else{
					uni.showToast({
						icon:'none',
						title: '没有更多房源',
					})
				}
			},
			//tab点击事件
			filtertabFn:function(e){
				var index = e.currentTarget.dataset.index;
				var tabindex = this.tabindex;
				var postdata = this.postdata
				// console.log(postdata)
				if (tabindex == index){
					this.tabindex = 5
					this.postdatafront = JSON.parse(JSON.stringify(postdata))
				}else{
					this.tabindex = index,
					this.postdatafront = JSON.parse(JSON.stringify(postdata))
				}
			},
			//区域切换地铁小区
			checkarea:function(e){
				var index = e.currentTarget.dataset.index;
				var areaData
				if(index == 0){
					areaData = this.filterData.area
				}else{
					areaData = this.filterData.traffic
				}
				this.areaFirstSelect = index
				this.areaData = areaData
			},
			//价格切换总价和单价
			checkprice:function(e){
				var index = e.currentTarget.dataset.index;
				var priceData
				if (index == 0) {
					priceData = this.filterData.totalPrice
				} else {
					priceData = this.filterData.price
				}
				this.priceFirstSelect = index
				this.peiceData = priceData
			},
			hidefilter:function(){
				this.tabindex = 5
				return false
			},
			//区域二级tab点击
			areasecondFn:function(e){
				var areaid = e.currentTarget.dataset.areaid;
				console.log(e)
				var postdata = this.postdata;
				var tabArr = this.tabArr
				var tabname = e.currentTarget.dataset.name
				if (areaid != 'bx'){
					if (this.areaFirstSelect == 0) {
						postdata.areaID = areaid;
						postdata.trafficID = ''
					} else {
						postdata.areaID = '';
						postdata.trafficID = areaid
					}
					tabArr[0].name = tabname
					tabArr[0].select = true
				}else{
					postdata.areaID = '';
					postdata.trafficID = ''
					tabArr[0].select = false
					tabArr[0].name = '区域'
				}
				postdata.page = 1
				console.log(tabArr)
				this.postdata = postdata
				this.showcount = true
				this.tabindex = 5
				this.tabArr = tabArr
				this.listdata = []
				this.postdatafront = JSON.parse(JSON.stringify(postdata))
				this.getlistData()
				// console.log(areaid)
			},
			//价格二级tab点击
			pricesecondFn:function(e){
				var priceid = e.currentTarget.dataset.priceid;
				var postdata = this.postdata;
				var tabArr = this.tabArr
				var tabname = e.currentTarget.dataset.name
				if (priceid == ''){
					postdata.priceID = '';
					postdata.customPriceLow = ''
					postdata.customPriceTop = ''
					postdata.customTotalPriceLow = ''
					postdata.customTotalPriceTop = ''
					tabArr[1].name = '价格'
					tabArr[1].select = false
				}else{
					postdata.priceID = priceid;
					tabArr[1].name = tabname
					tabArr[1].select = true
				}
				postdata.page = 1
				this.minprice = ''
				this.postdata = postdata
				this.tabArr = tabArr
				this.showcount = true
				this.tabindex = 5
				this.listdata = []
				this.maxprice = ''
				this.postdatafront = JSON.parse(JSON.stringify(postdata))
				this.getlistData()
			},
			//确定输入价格
			priceconfirm:function(){
				var min = parseInt(this.minprice);
				var max = parseInt(this.maxprice);
				var priceFirstSelect = this.priceFirstSelect;
				var postdata = this.postdata;
				var tabArr = this.tabArr
				if (!min && !max){
					uni.showToast({
						icon:'none',
						title: '请输入价格区间'
					})
				}else{
					if (priceFirstSelect == 0){
						postdata.customPriceLow = ''
						postdata.customPriceTop = ''
						if(min && !max){
							postdata.customTotalPriceLow = min
							postdata.customTotalPriceTop = 999999999
							tabArr[1].select = true
							tabArr[1].name = min + '万以上'
						}else if(!min && max){
							postdata.customTotalPriceLow = 0
							postdata.customTotalPriceTop = max
							tabArr[1].select = true
							tabArr[1].name = max + '万以下'
						}else if(min && max){
							postdata.customTotalPriceLow = min
							postdata.customTotalPriceTop = max
							tabArr[1].select = true
							tabArr[1].name = min + '-' +max + '万'
						}
					}
					if (priceFirstSelect == 1) {
						postdata.customTotalPriceLow = ''
						postdata.customTotalPriceTop = ''
						if (min && !max) {
							postdata.customPriceLow = min
							postdata.customPriceTop = 999999999
							tabArr[1].select = true
							tabArr[1].name = min + '万以上'
						} else if (!min && max) {
							postdata.customPriceLow = 0
							postdata.customPriceTop = max
							tabArr[1].select = true
							tabArr[1].name = max + '万以下'
						} else if (min && max) {
							postdata.customPriceLow = min
							postdata.customPriceTop = max
							tabArr[1].select = true
							tabArr[1].name = min + '-' + max + '万'
						}
					}
					postdata.priceID = ''
					postdata.page = 1
					this.postdata = postdata
					this.tabArr = tabArr
					this.listdata = []
					this.showcount = true
					this.tabindex = 5
					this.postdatafront = JSON.parse(JSON.stringify(postdata))
					this.getlistData()
					// console.log(this.data.minprice,this.data.maxprice)
				}
			},
			//输入价格
			inputprice:function(e){
				// console.log(e)
				var value = e.detail.value;
				var type = e.currentTarget.dataset.type
				var minprice = this.minprice;
				var maxprice = this.maxprice;
				if(type == 'min'){
					minprice = value
				}else{
					maxprice = value
				}
				this.maxprice = maxprice
				this.minprice = minprice
				// console.log(e.currentTarget.dataset.type)
			},
			//房型tab点击
			housetypeFn:function(e){
				var housetypeid = e.currentTarget.dataset.housetypeid;
				var postdata = this.postdata;
				var tabArr = this.tabArr;
				if (housetypeid == ''){
					postdata.houseTypeID = ''
					tabArr[2].name = '房型'
					tabArr[2].select = false
				}else{
					postdata.houseTypeID = housetypeid;
					var name = e.currentTarget.dataset.name;
					tabArr[2].name = name
					tabArr[2].select = true
				}
				postdata.page = 1
				this.postdata = postdata,
				this.tabArr = tabArr,
				this.listdata = [],
				this.showcount =  true,
				this.tabindex =  5,
				this.postdatafront = JSON.parse(JSON.stringify(postdata))
				this.getlistData()
			},
			//排序
			sortFn:function(e){
				var postdata = this.postdata;
				var sortid = e.currentTarget.dataset.sortid;
				var tabArr = this.tabArr
				if (sortid == ''){
					postdata.sortID = '';
					tabArr[4].select = false
				}else{
					postdata.sortID = sortid;
					tabArr[4].select = true
				}
				postdata.page = 1;
				this.postdata = postdata
				this.tabArr = tabArr
				this.listdata = []
				this.showcount = true
				this.tabindex = 5
				this.postdatafront = JSON.parse(JSON.stringify(postdata))
				this.getlistData()
			},
			//更多标签点击
			moretagFn:function(e){
				var type = e.currentTarget.dataset.type
				var postdatafront = this.postdatafront
		
				//type判断点击那一类型，根据参数字段设置对应数据
				// console.log(type)
				if(e.currentTarget.dataset.id == ''){
					postdatafront[type] = ''
				}else{
					postdatafront[type] = e.currentTarget.dataset.id
				}
				this.postdatafront = postdatafront
				
				// console.log(this.data.postdatafront)
				// console.log(this.data.postdata)
			},
			//更多选项确定
			moreConfirm:function(){
				var postdatafront = this.data.postdatafront;
				var tabArr = this.tabArr;
		
				//有选中的tab文字设置为选中
				if (postdatafront.budingArea || postdatafront.otherID || postdatafront.propertyTypeID || postdatafront.tagID || postdatafront.openDate){
					tabArr[3].select = true
				}else{
					tabArr[3].select = false
				}
				postdatafront.page = 1
				// console.log(postdatafront)
				this.postdata = JSON.parse(JSON.stringify(postdatafront)),
				this.listdata = [],
				this.showcount = true,
				this.tabindex = 5,
				this.tabArr = tabArr
				this.getlistData()
			},
			//更多确定重置
			moreCancel:function(){
				var postdatafront = this.postdatafront
				postdatafront.budingArea = '';
				postdatafront.otherID = '';
				postdatafront.propertyTypeID = '';
				postdatafront.tagID = '';
				postdatafront.openDate = '';
				this.postdatafront = postdatafront
			},
			routego:function(e){
				var estateid = e.currentTarget.dataset.estateid;
				var propertytypeid = e.currentTarget.dataset.propertytypeid;
				uni.navigateTo({
					url: '/pages/newhouse/detail/detail?estateid='+estateid+'&propertytypeid='+propertytypeid,
				})
			},
			searchhouse:function(){
				var cityid = this.cityid
				wx.navigateTo({
					url: '/pages/newhouse/search/search?cityid=' + cityid,
				})
			}, 
		}
	}
</script>

<style>
.list-search{
  padding:0 40rpx;
  height:72rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-tab{
  width:100%;
  height:88rpx;
}
.list-data{
  width:100%;
  position: fixed;
  top:160rpx;
  bottom:0;
}
.list-tab image{
  width:30rpx;
  height:30rpx;
}
.list-search-box{
  /* width:85%; */
  width:100%;
  height:72rpx;
  border-radius: 30px;
  background:#f7f7f7;
  display: flex;
  align-items: center;
  color:#7d7e82;
  font-size: 24rpx;
}
.list-search-box image{
  width:32rpx;
  height: 32rpx;
  margin-left:24rpx;
  margin-right:18rpx;
}
.list-news{
  width:48rpx;
  height:48rpx;
}
.list-tab{
  display: flex;
  font-size: 26rpx;
  color:#292b33;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 10rpx 10rpx 0 rgba(0,0,0,0.1);
}
.list-item{
  display: flex;
  align-items: center;
  justify-content: center;
  height:100%;
  position: relative;
  font-size: 26rpx;
  width:20%;
}
.list-item text{
  display: inline-block;
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item .item-border{
  width:1px;
  height:20rpx;
  background:#e8e8e8;
  position: absolute;
  right:0;
  top:50%;
  margin-top: -10rpx;
}
.list-item:nth-last-child(1) .item-border{
  display: none;
}
.list-tab .arrow{
  border:10rpx solid transparent;
  border-top:10rpx solid #aaa;
  margin-left:10rpx;
  margin-top: 10rpx;
  }
.filter-cur{color:#ffb000;}
.filter-cur .arrow{border-top-color:#ffb000;}

.list-ctn{
  padding:27rpx 40rpx;
  overflow: hidden;
} 
.list-ctn:nth-child(1){
  padding-top:54rpx;
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
.list-data scroll-view{
  width:100%;
  height:100%;
  overflow: hidden;
}
.filter-box{
  position: fixed;
  width:100%;
  top:160rpx;
  bottom:0;
  background:rgba(0,0,0,0.5);
  z-index: 100;
}
.filter{
  position: fixed;
  width:100%;
  top:160rpx;
  bottom:0;
  z-index: 100;
}
.area,.price{
  width:100%;
  height:740rpx;
  background:#f7f7f7;
  position: relative;
  z-index: 101;
  font-size: 28rpx;
}
.housetype,.moretag,.sorttab{
  position: relative;
  z-index: 101;
}
.price{
  height:850rpx;
}
.area-left,.price-left{
  width:320rpx;
  float:left;
}
.price-left{
  height:740rpx;
}
.area-left view,.price-left view{
  height:92rpx;
  line-height: 92rpx;
  text-indent: 42rpx;
  color:#292b33;
}
.area-left .filter-cur,.price-left .filter-cur,.sorttab .filter-cur,.moretag .filter-cur{
  color:#ffb000;
  background:#fff;
}
.area-right,.price-right{
  width:calc(100% - 362rpx);
  padding-left:42rpx;
  float:right;
  height:100%;
  background:#fff;
}
.price-right{
  height:740rpx;
}
.area-right scroll-view,.price-right scroll-view{
  width:100%;
  height:100%;
}
.area-right view,.price-right view{
  width:100%;
  height:92rpx;
  line-height: 92rpx;
  border-bottom: 1px solid #eaeaea;
}
.custom{
  width:100%;
  height:110rpx;
  background:#fff;
  float: left;
  overflow: hidden;
  line-height: 110rpx;
}
.custom view{
  float:left;
}
.custom view:nth-child(1){
  margin-left:42rpx;
}
.custom .hx{
  margin:0 10rpx;
}
.custom .minprice,.custom .topprice{
  display: block;
  width:133rpx;
  text-align: center;
  height:54rpx;
  background:#f7f7f7;
  border-radius: 8rpx;
  float: left;
  margin-top: 28rpx;
}
.topprice{
  margin-right: 12rpx;
}
.minprice{
  margin-left:10rpx;
}
.custom .confirm-btn{
  width:182rpx;
  height:74rpx;
  background:-webkit-linear-gradient(left,#FFC30E,#FFAD00);background:-o-linear-gradient(right,#FFC30E,#FFAD00);background:-moz-linear-gradient(right,#FFC30E,#FFAD00);background:linear-gradient(to right,#FFC30E,#FFAD00);
  text-align: center;
  line-height: 74rpx;
  font-size: 30rpx;
  color:#fff;
  float:right;
  margin-right:42rpx;
  border-radius: 10rpx;
  margin-top: 18rpx;
}
.housetype{
  width:100%;
  height:560rpx;
  background:#fff;
  font-size: 28rpx;
  color:#292b33;
}
.housetype scroll-view{
  width:100%;
  height:100%;
}
.housetype scroll-view view{
  width:100%;
  height:92rpx;
  line-height: 92rpx;
  text-indent: 42rpx;
  border-bottom:1px solid #eaeaea;
}
.housetype scroll-view view:nth-last-child(1){
  border:none;
}
.moretag{
  height:100%;
  background:#fff;
  overflow: hidden;
}
.moretag-title{
  font-size: 28rpx;
  color:#292b33;
  margin-top:34rpx;
  margin-bottom: 30rpx;
}
.tag-ctn{
  width:100%;
  padding-left:40rpx;
  position: absolute;
  top:0;
  bottom:110rpx;
}
.tag-ctn scroll-view{
  width:100%;
  height:100%;
}
.more-tag-item{
  width:154rpx;
  height:60rpx;
  text-align: center;
  line-height:60rpx;
  background:#f7f7f7;
  color:#292b33;
  font-size: 24rpx;
  border-radius: 30rpx;
  float:left;
  margin-right: 18rpx;
  margin-bottom:20rpx;
}
.tab-btn{
  width:100%;
  height:110rpx;
  position: absolute;
  bottom:0;
  left:0;
  border-top:1px solid #eaeaea;
  display:flex;
  align-items: center;
  justify-content: space-around;
}
.tab-btn view{
  width:312rpx;
  height:74rpx;
  text-align: center;
  line-height:74rpx;
  font-size: 30rpx;
  color:#292b33;
  border-radius: 16rpx;
}
.tab-btn view:nth-child(1){
  background:#f7f7f7;
}
.tab-btn view:nth-child(2){
  color:#fff;
    background:-webkit-linear-gradient(left,#FFC30E,#FFAD00);background:-o-linear-gradient(right,#FFC30E,#FFAD00);background:-moz-linear-gradient(right,#FFC30E,#FFAD00);background:linear-gradient(to right,#FFC30E,#FFAD00);
}
.sorttab{
  width:100%;
  height:auto;
  background:#fff;
}
.sorttab view{
  width:100%;
  height:92rpx;
  line-height: 92rpx;
  font-size: 28rpx;
  color:#292b33;
  text-align: center;
  border-bottom:1px solid #eaeaea;
}
.nodata{
  position: absolute;
  top:0;
  left:0;
  width:100%;
  text-align: center;
  color:#eaeaea;
}

.nodata image{
  width:160rpx;
  height:250rpx;
  display: block;
  margin:0 auto;
  margin-top: 160rpx;
  margin-bottom: 40rpx;
}

</style>
