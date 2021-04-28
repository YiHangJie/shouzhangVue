<template>

    <div class="container">

        <!-- 主画布 -->
        <div class="main">
            <!-- 太阳 -->
            <div class="sun">
                <span style="--i:1"></span>
                <span style="--i:2"></span>
                <span style="--i:3"></span>
                <span style="--i:4"></span>
                <span style="--i:5"></span>
                <span style="--i:6"></span>
                <span style="--i:7"></span>
                <span style="--i:8"></span>
            </div>
            <!-- 群山 让我们一起走过山川河流 -->
            <div class="mountain a"></div>
            <div class="mountain b"></div>
            <div class="mountain c"></div>
            <div class="mountain d"></div>
            <div class="mountain e"></div>
            <!-- 云和风 仰望天空，看见朵朵白云 -->
            <div class="cloud_wind_wrap_fast">
                <div class="cloud_wind_wrap_slow">
                    <div class="cloud_wind_group" style="--i:1">
                        <div class="cloud a">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="cloud b">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="cloud c">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="wind a">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="wind b">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="wind_small">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div class="cloud_wind_group" style="--i:2">
                        <div class="cloud a">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="cloud b">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="cloud c">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="wind a">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="wind b">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="wind_small">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div class="cloud_wind_group" style="--i:3">
                        <div class="cloud a">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="cloud b">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="cloud c">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="wind a">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="wind b">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="wind_small">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    	<div  class="weather" >{{weather.city}} {{weather.weather}} {{weather.temperature}}</div>
    </div>

</template>

<script>
  export default {
    name:"Weather",
	props:{
		weather:{
			default:{
				city:"",
				weather:"",
				temperature:""
			}
		}
	},
	
  }
</script>

<style>
  :root {
      --background-color: #f5f5f5;
      --border-color: #7591AD;
      --text-color: #34495e;
      --color1: #EC3E27;
      --color2: #fd79a8;
      --color3: #6aa6d4;
      --color4: #00b894;
      --color5: #fdcb6e;
      --color6: #e056fd;
      --color7: #04a704;
      --color8: #BDC581;
  }

  *,
  ::after,
  ::before {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }
  .container {
      position: absolute;
      width: 100px;
      height: 130px;
      top:10%;
      left:52%;
      /* background-color: #00b894; */
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
  }



  .main {
      position: relative;
      width: 80px;
      height: 80px;
     /* border: 2px solid #333; */
      margin-top: 20px;
      overflow: hidden;
  }


  /* **********
   * 这里是太阳
   * **********/

  .sun {
      position: absolute;
      width: 20px;
      height: 20px;
      border: 2px solid #333;
      border-radius: 50%;
      left: 40px;
      top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      animation: sun_rotate 10s linear infinite;
  }

  @keyframes sun_rotate {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(-360deg);
      }
  }

  .sun span {
      position: absolute;
      display: block;
      height: 3px;
      width: 12px;
      background-color: #333;
      box-shadow: 4px 4px 0 0 var(--color5);
      transform: rotate(calc(var(--i) * 45deg)) translateX(-20px);
      animation: sun_ray 1s linear infinite;
      animation-delay: calc(var(--i) * -0.5s);
  }

  @keyframes sun_ray {
      0% {
          transform: rotate(calc(var(--i) * 45deg)) translateX(-20px) scaleX(1)
      }
      50% {
          transform: rotate(calc(var(--i) * 45deg)) translateX(-20px) scaleX(0.6)
      }
      100% {
          transform: rotate(calc(var(--i) * 45deg)) translateX(-20px) scaleX(1)
      }
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
