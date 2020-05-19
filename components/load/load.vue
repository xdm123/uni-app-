<template>
	<view name='load' class="load-wrap">
		<view class="loading">
		    <image class="loading-img" src="../../static/img/resources/load.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:'load'
	}
</script>

<style>
	.load-wrap{
		width:100%;
		height:100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}
</style>
