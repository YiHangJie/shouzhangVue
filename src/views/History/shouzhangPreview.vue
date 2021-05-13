<template>
	<div>
		<van-nav-bar title="请调整地图" left-text="返回" left-arrow right-text="下一步" @click-left="goback" @click-right="next" id="shouzhangPreviewNavbar">
		</van-nav-bar>
		<div id="container"></div>

	</div>
	
</template>

<script>
	import {request} from "network/request.js";
	import html2canvas from 'html2canvas';
	export default{
		name:'shouzhangPreview',
		data(){
			return {
				map : undefined,
				lng: 0,
				lat: 0,
				city: "北京",
				adcode: 1100,
				poiList: [],
				footprintIcon: undefined,
				overlayShow: false,
				progressrate: 0,
			}
		},
		mounted() {
			this.mapInit(); 
			// this.showMarker();
		},
		methods:{
			next(){
				this.getRawMap();
				this.$router.replace('/stylechoose');
			},
			getRawMap(){
				let that = this;
				html2canvas(document.getElementById("container"),{
					useCORS: true,//支持图片跨域
				}).then(function(canvas) {
					// 保存截图至VueX中
					that.$store.state.rawMap = canvas.toDataURL('image/jpg');
					//以下代码为下载此图片功能
					that.downLoadFile("simple", that.$store.state.rawMap);
				});	
			},
			downLoadFile(fileName, canvasImg) {
			            //创建一个a标签
			            var a = document.createElement('a')
			            //指定下载文件名称
			            a.href = canvasImg;
			            a.download = fileName
			            //a 标签 需要点击触发。所以强制给他分派一个点击事件
			            //创建一个鼠标事件
			            let event = document.createEvent("MouseEvents")
			            // 初始化鼠标事件
			            event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
			            // 指定元素对象触发事件
			            a.dispatchEvent(event)
			        },
			goback(){
				this.$router.replace('/historypage');
			},
			mapInit(){
				var url = 'https://webapi.amap.com/maps?v=1.4.15&key=2fdef7e86c76d6b26dfafaf389855ac4&callback=init';
				var jsapi = document.createElement('script');
				jsapi.charset = 'utf-8';
				jsapi.src = url;
				document.head.appendChild(jsapi);
				
				let that = this;
				 window.init= function(){
					var map = new AMap.Map('container', {
						center:[116.39,39.9],
						zoom: 11,
						scrollWheel: true,
						resizeEnable: true,
						mapStyle: 'amap://styles/7a4c1de1f0a6472553f977d132a9bd68', //设置地图的显示样式
					});
				    //加载控件----异步加载
				  //   AMap.plugin(["AMap.ToolBar"], function() {//加载插件
				  //       map.addControl(new AMap.ToolBar({
						// 	offset: new AMap.Pixel(9, 175),
						// 	liteStyle: true
						// }));
				  //   });
					that.map = map;
					that.makeFootprintIcon();
					that.showMarker();
				}
			},
			makeFootprintIcon(){
				// 创建一个 icon
				let that = this;
				let endIcon = new AMap.Icon({
					size: new AMap.Size(250, 340),
					image: '../../icons/脚印-蓝色',
					imageSize: new AMap.Size(135, 40),
					imageOffset: new AMap.Pixel(-95, -3)
				});
				that.footprintIcon = endIcon;
			},
			showMarker(){
				this.poiList = this.$store.state.preparedPois;
				
				console.log("this.poiList", this.poiList);
				let markerList = []				
				let avgLon = 0;				// 平均经纬度
				let avgLat = 0;
				let maxLon = -180;
				let maxLat = -90;
				let minLon = 180;
				let minLat = 90;
				
				for (let i = 0; i < this.poiList.length; i++){
					let lon = parseFloat(this.poiList[i].longitude);
					let lat = parseFloat(this.poiList[i].latitude);
					avgLon = avgLon + lon;
					avgLat = avgLat + lat;
					if(lon > maxLon){
						maxLon = lon;
					}else if(lon < minLon){
						minLon = lon;
					}
					if(lat > maxLat){
						maxLat = lat;
					}else if(lat < minLat){
						minLat = lat;
					}
					// 将 icon 传入 marker
					var endMarker = new AMap.Marker({
						position: new AMap.LngLat(lon, lat),
						// icon: this.footprintIcon,
						offset: new AMap.Pixel(-13, -30)
					});
					markerList.push(endMarker);
				}
				
				avgLon = avgLon / this.poiList.length;
				avgLat = avgLat / this.poiList.length;
				console.log("this.markerList", this.markerList);
				console.log("avgLon avgLat", avgLon, avgLat);
				// 将 markers 添加到地图
				this.map.add(markerList);
				this.map.setCenter([avgLon, avgLat]);
				
				var mybounds = new AMap.Bounds([minLon, minLat], [maxLon,maxLat]);
				// this.map.setBounds(mybounds);
				this.map.setFitView();
			}
		}
	}
</script>

<style>
	#container {
	  /*position: relative; */
	  width: 100%;
	  height: 100%;
	  position:absolute ;
	  z-index: 1;
	  /* z-index: 9999; */
	}
	#shouzhangPreviewNavbar{
		z-index: 10;
	}
	#shouzhangPreviewOverlay{
		z-index: 100;
	}
	.progressbar {
		top: 50%;
		left: 50%;
		position: relative;
		transform: translate(-50%,-50%);
	}
	#progressBarWord{
		
	}
	div#progressBarWord {
	    text-align: center;
	    line-height: 1rem;
	}
	
</style>
