<template>
	<div class="all">
		<real-home-map class="coms1" ref = RHM @showPois="showPois" @showWeather="showWeather"></real-home-map>
		<HomeHeader class="coms2"></HomeHeader>
		<SideButton class="coms5" @SearchPois = "SearchPois" v-bind:pois="pois" v-bind:weather="weather"></SideButton>
		<Weather class="coms7" v-bind:weather="weather"></Weather>
	</div>
</template>


<script>
import HomeHeader from './coms/Header.vue';
import RealHomeMap from './coms/Map.vue';
// import CircleButton from './coms/CircleButton.vue';
import SideButton from './coms/SideButton.vue';
import BottomBar from './coms/BottomBar.vue';
import Weather from './coms/Weather.vue';

export default {
    name: 'RealHomePage',
	data(){
		return {
			pois : null,
			weather: null
		}
	},
    components: {
      RealHomeMap,
      HomeHeader,
      // CircleButton,
      SideButton,
      BottomBar,
      Weather

    },
	methods:{  
	  SearchPois(data){	//触发poi查询
		this.$refs.RHM.SearchPois();
	  },
	  showPois(pois){
		  this.pois = pois;
	  },
	  showWeather(weather){
		  this.weather = weather;
	  },
	},
	
  }

</script>
<style>

 * { touch-action: pan-y; }

  .all{

    width: 100%;
    height: 100%;

  }
  .coms1{
    position:absolute ;
    z-index: 1;
  }
  .coms2{
    position: absolute;
    z-index: 99;
  }
  .coms3{
    position: absolute;
    z-index: 99;
    margin-top: 600px;
    margin-left: 163px;
  }
  .coms4{
    position: absolute;
    z-index: 99;
    margin-top: 200px;
    margin-left: 10px;
  }
  .coms5{
      position: absolute;
      z-index: 99;
      margin-top:10px;
      margin-left: 1px;
    }
 .coms6{
      position: absolute;
      position: fixed;
      z-index: 9999;
      margin-top:680px;
      margin-left: -57px;
    }
.coms7{
      position: absolute;
      z-index: 999;
      margin-top:50px;
      margin-left: 50px;
      /* margin-left: -px; */
    }
</style>
