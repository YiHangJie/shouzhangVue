<template>
	<div>
		<!-- <van-row>
			<van-col span="6" id="headpic">
				<van-image
				  round
				  :src="$store.state.headPicSrc"
				  class="searchPassHeadPic"
				/>
			</van-col>
			<van-col span="10">
				<van-cell :title="$store.state.userName" size="large" label="" />
				<p class="introduction">{{$store.state.Email}}</p>
			</van-col>
		</van-row> -->
		<ShowPerson></ShowPerson>
	</div>
</template>

<script>
	import ShowPerson from "./components/ShowPerson.vue"
	export default{
		name: "PersonPage",
		components:{
			ShowPerson
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
