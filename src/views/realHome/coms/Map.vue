<template>
	<!-- <div> -->
<!-- 		<div @click="dakatest">aaaaa</div> -->
		<div id="container">
		</div>
<!-- 	</div> -->
</template>

<script>
import {request} from "network/request.js";
import { Notify } from 'vant';
export default {
	name: 'RealHomeMap',
	data(){
		return {
			map : undefined,
			geolocation : undefined,
			placeSearch: undefined,
			weather: undefined,
			lng: 0,
			lat: 0,
			city: "北京",
			adcode: 1100,
			poiList: null,
			pois_show: null,
			poiRecommend: [],
			markerList: [],
			markerInfo: ""
		}
	},
    created(){
		
    },
	mounted() {
		this.mapInit();
		// this.geolocation.getCurrentPosition();	//单次定位
		Notify({ type: 'primary', message: '推荐您前往这些地方', duration: 8000});
		// this.SearchPois();
		this.geolocation.watchPosition();	//实现连续定位，在移动端上有效
	},
	beforeUpdate() {
		console.log("map beforeUpdate");
		console.log(this.map);
	},
	methods:{
		mapInit(){
			var url = 'https://webapi.amap.com/maps?v=1.4.15&key=2fdef7e86c76d6b26dfafaf389855ac4&callback=init';
			var jsapi = document.createElement('script');
			jsapi.charset = 'utf-8';
			jsapi.src = url;
			document.head.appendChild(jsapi);
			
			let that = this;
			 window.init= function(){
				var map = new AMap.Map('container', {
					center:[120.137960,30.24388],
					zoom: 15,
					scrollWheel: true,
					resizeEnable: true,
					mapStyle: "amap://styles/whitesmoke"
				});
			    //加载控件----异步加载
			    AMap.plugin(["AMap.ToolBar"], function() {//加载插件
			        map.addControl(new AMap.ToolBar({
						offset: new AMap.Pixel(9, 175),
						liteStyle: true
					}));
			        
			    });
					  
				AMap.plugin("AMap.Geolocation", function() {//加载插件
					//map.addControl();
					var geolocation = new AMap.Geolocation({
						enableHighAccuracy: true,//是否使用高精度定位，默认:true
						timeout: 10000,          //超过10秒后停止定位，默认：无穷大
						maximumAge: 0,           //定位结果缓存0毫秒，默认：0
						convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
						showButton: true,        //显示定位按钮，默认：true
						buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
						buttonOffset: new AMap.Pixel(13, 200),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
						showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
						showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
						panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
						zoomToAccuracy:true ,
						extensions:'all',
					})
					map.addControl(geolocation);
					that.geolocation = geolocation;
					// geolocation.getCurrentPosition();
					geolocation.watchPosition();
					AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
					AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
					function onComplete (data) {
						// data是具体的定位信息
						that.map.remove(that.markerList);
						console.log("定位信息");
						console.log(data);
						that.lng = data["position"]["lng"];
						that.lat = data["position"]['lat'];
						that.adcode = data["addressComponent"]["adcode"];
						that.poiList = data["pois"];
						that.poiRecommend = data["pois"];
						that.addRecommendPoisToMap();
						// that.poiRecommend = data["pois"];
						// that.SearchPois();
						that.getWeather();
						console.log(that.lng+" "+that.lat);
					}
					function onError (data) {
						// 定位出错
					}
				});
				AMap.plugin(["AMap.PlaceSearch"], function() {
					//构造地点查询类
					that.placeSearch = new AMap.PlaceSearch({ 
					type: '', // 兴趣点类别
					pageSize: 30, // 单页显示结果条数
					pageIndex: 1, // 页码
					// city: "010", // 兴趣点城市
					// citylimit: true,  //是否强制限制在设置的城市内搜索
					map: map, // 展现结果的地图实例
					panel: "panel", // 结果列表将在此容器中进行展示。
					autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
				});
				});
				AMap.plugin('AMap.Weather', function() {
					//创建天气查询实例
					that.weather = new AMap.Weather();
				});
				AMap.plugin('AMap.Autocomplete', function(){
				  // 实例化Autocomplete
				  var autoOptions = {
				    // input 为绑定输入提示功能的input的DOM ID
				    // input: document.getElementById("poiInput").id
					input: "poiInput"
				  }
				  var autoComplete= new AMap.Autocomplete(autoOptions);
				  // 无需再手动执行search方法，autoComplete会根据传入input对应的DOM动态触发search
				})
				that.map = map;
			}
		},
		SearchPois(){
			var cpoint = [this.lng, this.lat]; //中心点坐标
			let that = this
		    this.placeSearch.searchNearBy('', cpoint, 200, function(status, result) {
				console.log("周边POI");
				console.log(status,result);
				// that.poiList = result["poiList"]["pois"];
				// that.poiRecommend = result["poiList"]["pois"];
				console.log("searchNearBy", that.poiRecommend);
				that.addRecommendPoisToMap();
				that.FilterDakaInfo();
				// 向realhome中发送打卡信息
				that.$emit("showPois", that.pois_show);
		    });
			// 添加 marker 到地图上
			// var marker = new AMap.Marker({
			//     position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			//     title: '北京'
			// });
			// // 多个点实例组成的数组
			// var markerList = [marker1, marker2, marker3];
			// this.map.add(markerList);
			// this.map.add(marker);
		},
		FilterDakaInfo(){
			this.pois_show = new Array;
			for(let i=0; i<this.poiList.length; i++){
				let poi = {
					lat : this.poiList[i]["location"]["lat"],
					lng : this.poiList[i]["location"]["lng"],
					name: this.poiList[i]["name"],
					type: this.poiList[i]["type"],
				}
				this.pois_show.push(poi);
			}
			console.log(this.pois_show)
		},
		getWeather(){
			let that = this;
			//执行实时天气信息查询
			this.weather.getLive(this.adcode, function(err, data) {
				console.log("天气信息");
			    console.log(err, data);
				that.$emit("showWeather", data);
				that.$emit("sendWeather");
				return data;
			});
		},
		addRecommendPoisToMap(){
			console.log("addRecommendPoisToMap", this.poiRecommend);
			this.map.remove(this.markerList);
			this.markerList = [];
			for(let i = 0; i < 5; i++){
				// 将 icon 传入 marker
				var endMarker = new AMap.Marker({
					position: new AMap.LngLat(this.poiRecommend[i].location.lng, this.poiRecommend[i].location.lat),
					offset: new AMap.Pixel(-13, -30),
					clickable: true,
					bubble: true
				});
				// endMarker.on("click",this.markerOnClick,i);
				// 设置点标记的动画效果，此处为弹跳效果
				endMarker.setAnimation('AMAP_ANIMATION_BOUNCE');
				endMarker.setLabel({
				        offset: new AMap.Pixel(5, 0),  //设置文本标注偏移量
				        content: "<div class='info'>"+this.poiRecommend[i].name+"</div>", //设置文本标注内容
				        direction: 'right' //设置文本标注方位
				    });
				this.markerList.push(endMarker);
			}
			this.map.add(this.markerList);
			this.map.setFitView();
			
			for(let i = 0; i < this.markerList.length; i++){
				let that = this;
				window.setTimeout(function(){
					that.markerList[i].setAnimation('AMAP_ANIMATION_NONE');
				}, 3000);
			}
		}
	}

  }

</script>

<style>
  #container {
    /* position: relative; */
    width: 100%;
    height: 100%;
    /* z-index: 9999; */
  }

</style>
