<template>
	<div class="side">
		<van-popup
		  v-model="show"
		  round
		  position="right"
		  get-container="body"
		  :style="{ height: '70%', width: '90%'}"
		 >
<!-- 		   <div v-for="(val, key, index) in pois" @click="daka(key)">
			    <a>{{val.name}} <br/>
				</a>
		   </div> -->
		   
		   <van-cell title="请选择打卡地点" size="large" class="popupheadline"></van-cell>
		   <van-cell-group>
		     <van-cell
		       v-for="(val, key, index) in pois"
		       clickable
		       :title= val.name
		       @click="daka(key)"
			   size="large"
		     >
		       <template #right-icon>
		         <van-rate v-model="rate[key]"/>
		       </template>
		     </van-cell>
		   </van-cell-group>
		   
		   <!-- <li v-for="(val, key, i) in pois">{{val}}</li> -->
		</van-popup>

		<div  is-link @click="showPopup" class="icon">
			<i class="iconfont icon-add"></i>
		</div>
         <!-- <div class="all">
            <div is-link @click="showPopup" class="popupButton">
              <span class="iconfont back-icon3">&#xe632;</span>
              <!-- <svg-icon icon-class='积分签到'class='back-icon3'></svg-icon> -->
          <!--  </div>

          </div> -->

	       <!-- <div class="text">
	            Jinan Shandong
	        </div> -->

	    <div class="icon">
	        <i class="iconfont icon-mail"></i>
	    </div>
	    <div class="icon">
	        <i class="iconfont icon-tel">&#xe604;</i>
		</div>
	</div>
</template>

<script>
	import {request} from "network/request.js"
	import {weather2code,windDirection2code} from "utils/weather2code.js"
	export default{
		name:"SideButton",
		data() {
		   return {
			 show: false,
			 rate: []
		   };
		 },
		props:{
			pois:{
				default:{}
			},
			weather:{
				default:{
					city:"",
					weather:"",
					temperature:""
				}
			}
		},
		created() {
			
		},
		methods: {
		  showPopup:function() {
			this.show = true;	
			this.$emit('SearchPois');//select事件触发后，自动触发SearchPois事件
			for(let i = 0; i < 30; i++){
				this.rate.push(0);
			}
		  },
		  transferWeather(weather){
			  let weather_str = weather2code[this.weather["weather"]];
			  let tem_str = "";
			  let windpower_str = "";
			  let windDirection_str = windDirection2code[this.weather["windDirection"]];
			  
			  if(this.weather["temperature"] < 0){
				  tem_str = (1100-this.weather["temperature"]).toString().substr(1,3);
			  }else{
				  tem_str = (1000+this.weather["temperature"]).toString().substr(1,3);
			  }
			  if(this.weather["windPower"] === "≤3"){
				  windpower_str = "03"
			  }else{
				  windpower_str = (100+this.weather["windPower"]).toString().substr(1,2);
			  }
			  let code = weather_str+tem_str+windpower_str+windDirection_str;
			  console.log("天气代码："+code);
			  return code;
		  },
		  daka(index){
			  let params =  {
			  	longitude:this.pois[index]["lng"],
			  	latitude:this.pois[index]["lat"],
			  	poiName:this.pois[index]["name"],
			  	poiType:this.pois[index]["type"],
			  	weatherCode:this.transferWeather(this.weather)
			  }
			  request({
			  		url:'/TravelApp3/DoMarkPOI',
			  		method: "post",
			  		header:{
			  				"Content-Type" : 'text/plain',
			  		},
			  		params: params
			  	},
			  	res => {
			  		console.log("发送打卡！");
			  		console.log(res);
					this.$toast.success('打卡成功！');
			  	},
			  	err => {
			  		console.log(err);
					this.$toast.fail('打卡失败！');
			  	}
			  )
		  }
		}
	}
</script>

<style>
	@font-face {
	    font-family: "iconfont";
	    src        : url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAASgAAsAAAAACQAAAARTAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqFSIRWATYCJAMQCwoABCAFhG0HOhu6B1FUTgJkPyRJgs/LwyEAcJtBFBQA9HAFCQAA4EAE1RrZs7uPqEABKrRcHoAC5MgYtFGxMYKNI8k6+q5f2y/ipex0PJJMk9bTfSe+t9h0WiYlCI0f2h/+d++fU03udie4RjU9GE1guw9meCC/9j+HS5teYPNblssc43nUCzAaWwMbY2L79EDvgOXYbxi7uIzDBBoNaCusLPcnqCu0UYG45zkG1GMqpQQf6qW1OQsLiBdq1KeydA3P3d+Pf6aiDiQ1GWgTV68XNox/hv1MzUzFOLQR2P0ZwCwjYxIoxK1c07mSH5pU0iglls0B9boh0Vdb8s/UqsKctYjq8b88QpKJWqCJmhF2Jpz5uWhSCX6uUkn8XFfJEF2G16MB34lRIOvr5yZJ+WuhqmQr7+CsobG6g90/psvNaSwnBAGKYibPZ7S17huOEWiOS2cUIs2xM78zx9EHT+adKD/GHN/ciKdfK0+kmwlEA81jK8YA0nnMU/3ACWO5npM+GvuPGwFmtHwc0qoZYxUO04/yThkyzhZvlMjsxhKaWqSszVE+Q3KcD8SP+Q7u88b7Z/Dx/WJARvMwnjJM6PFFdDPeq2JEKm1xMLZoJwT/YQJvxPFRzv6G4DwuZszvIDLP82Zthw7od5/xHh7vYWfOiDIEJvz6/2fN9noHmBqx2sRD86ttne2/clLlySM16Hw4tMguZ8ZJo4/bjcktSQlgcVSXIwvCtl3aVvTq2ytARk4WDIek7SABRcGRMPyRVCpoDW4NGw0eBV6HFTb0wwdq29UePKB9vrGWOiWW63Ussck+6zqJye7fiO5or7cs0Z5Nvzx+PD1gDrjxuX2qxtv4+flo8s7rHUtcjzxKT3tGbfhqNscjhrxCYjOkEYvA03bNU+GQWz9n3oJFuYOKOR52WT41rl2v7h1TWW4gHx1bQud8zc45uOib0eu3+9+W3pjQuBoWuEEv3/TgaOkIhd09FEG1qcmFLryxQXHhY79rieky76CTXnNPEah+Sh++ZzMxMK7HeDufiJTMZ0pnaiE5V9X78AigeoOulRwA+V3iqZ6hb+OLCwievfnxRWsL/F/ful4lXz9+DeyqnmHasd45uzb752DXzCsyV1OXIvJMlmIuHkcSJDTqWn6JGJ3++pD01M4k1OsJIanTD1m9QWTBTkKNJjNQq948NJqwWt6kCyuJogQY9wIQ2r0hafUesnYfZMH+oEavf6jVHiVotB06GzYZDq9JMhlCNppP9KwkVoZWml72gZxraHCU6xIuxLnnxYGzazK6opi4jyn5zRmKKFScRLgEx1EYJphy4pMlXVckHfVc5uU9qGslETQtY8QgiA2ZnpDHkogpu7hopn7+gDiuQgYuySnRXhCW8zpHA139GsiVKK6Vcy7dczeOISEUHqawRAQtoYGEeiiB0vx+PmIRXW6LQGqkhwqpuqLu+JLoCtdAI22rEghEIQblQD6z7fJSwwtLe6gEAAA=') format('woff2');
	}
	.popupheadline {
	    text-align: center;
		color: #1989fa;
	}

	.iconfont {
	    font-family            : "iconfont" !important;
	    font-size              : 12px;
	    font-style             : normal;
	    -webkit-font-smoothing : antialiased;
	    -moz-osx-font-smoothing: grayscale;
	}

	/* 字体图标来自iconfont */
	.icon-add:before {
	    content: "\e641";
	}

	.icon-mail:before {
	    content: "\e650";
	}

	/* .icon-tel:before {
	    content: "\e652";
	}
 */
	:root {
	    --background-color: #2c3e50;
	    --border-color    : #7591AD;
	    --text-color      : #34495e;
	    --color1          : #EC3E27;
	    --color2          : #fd79a8;
	    --color3          : #0984e3;
	    --color4          : #00b894;
	    --color5          : #fdcb6e;
	    --color6          : #e056fd;
	    --color7          : #F97F51;
	    --color8          : #BDC581;
	}



	.side {
	    /* 做了这么多案例，第一次用fixed定位 */
	    position: fixed;

	    width : 60px;
	    height: 210px;

	    left: 0;
	    top : 35%;

	    z-index: 3;

	    /* background-color: #fff; */

	}


	.side .icon {
	    position: relative;

	    width : 60px;
	    height: 70px;

	    display        : flex;
	    justify-content: center;
	    align-items    : center;
	}



	/* 利用after伪元素实现背景，对text的 */
	.side .icon::after {
	    position: absolute;
     /* background-color: #FFFFFF; */
	    content : '';

	    width : 60px;
	    height: 70px;

	    top : 0;
	    left: 0;

	    box-sizing: border-box;

	    /* border-bottom: 2px solid #7591AD; */
		border: 2px solid #7591AD;

	}

	/* 第一个icon的右上角圆角 */
	.side .icon:nth-child(1)::after {
	    border-radius: 0 35px 0 0;
	}

	/* 第三个icon的右下角圆角 */
	.side .icon:nth-child(3)::after {
	    border-radius: 0 0 35px 0;
	    /* 第三个不需要下边线 */
	}

	/* 第一个icon的右上角圆角 */
	.side .icon:nth-child(2):active::after {
	    border-radius: 0 0 0 0;
	}

	/* 第三个icon的右下角圆角 */
	.side .icon:nth-child(4):active::after {
	    border-radius: 0 0 0 0;
	}

 .side .icon-tel{
    color: #FF0000;
  }
	/* 图标 */
	.side .icon i {
	    font-size : 39px;
	    color     : rgb(44,55,44);
	    cursor    : pointer;
	    transition: all 0.2s;
	}
 
	.side .icon:active i {
	    color: #EC3E27;
	}

	/* 弹出信息 */
	.side .icon .text {
	    position: absolute;
	    width   : 200px;
	    height  : 80px;

	    background-color: #fff;

	    left: -140px;

	    font-size  : 20px;
	    line-height: 80px;

	    padding-left: 10px;

	    border-radius: 0 10px 10px 0;

	    /* 这里让弹出层text在icon背景层与图标层i之间 */
	    z-index: -2;

	    transition: all 0.5s;
	}
	.weather{
		width: 100px;
		line-height:30px ;
		text-align: center;
		vertical-align: middle;
		/* border: 2px #000000; */
	  background-color: #FFFFFF;
	  border-radius: 25px;
		font-size: 15px;
	
	}

</style>
