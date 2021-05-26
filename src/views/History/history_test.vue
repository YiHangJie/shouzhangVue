<template>
	<div>
		<van-nav-bar title="打卡记录" right-text="下一步" @click-right="routeToShouzhangPreview">
		</van-nav-bar>
		
		<van-checkbox-group v-model="result">
		  <van-cell-group>
			<div v-for="(val, key, index) in POI_record">
				<van-cell
				  clickable
				  :title= val.poiName
				  :label= val.time
				  @click="toggle(key)"
				>
					<template #right-icon>
						<van-checkbox :name="key" ref="checkboxes" />
					</template>
				</van-cell>
			</div>
		  </van-cell-group>
		</van-checkbox-group>
	</div>
</template>

<script>
	import {request} from '../../network/request.js'
	
	export default{
		name: "DakaRecord",
		data(){
			return {
				POI_record : null,
				POI_record_show: [],
				UserInfo: null,
				chosenPOIId: [],
				result: []
			}
		},
		created() {
			
		},
		mounted() {
			this.getDakaRecord();
		},
		methods:{
			getDakaRecord(){
				request({
					url:'/TravelApp3/getPOIByUid',
					method: "post",
					header:{
							"Content-Type" : 'text/plain',
					},
				},
				res => {
					console.log("获取打卡记录！");
					console.log(res);
					this.POI_record = res["data"]["poiList"];
					// for((val, index) in this.POI_record){
					// 	this.POI_record_show.push(index:{
					// 		id:index,
					// 		name: val.poiName,
					// 	    tel: val.time',
					// 	    address: val.longitude,
					// 	})
					// }
					let that = this;
					this.POI_record.forEach( function(element, index, array){
						that.POI_record_show[index] = {
							id:index,
							name: element.poiName,
							tel: element.time,
							address: element.longitude,
						}
					})
					console.log(this.POI_record_show);
				},
				err => {
					console.log(err);
				}
			  )},
			toggle(index) {
				// this.$refs.checkboxes[index].toggle();
				console.log("result", index, this.result);
				
			},
			routeToShouzhangPreview(){
				let pois = [];
				for (let i = 0; i < this.result.length; i++){
					pois.push(this.POI_record[this.result[i]]);
				}
				this.$store.commit('editPreparedPois', pois);
				this.$router.replace('/shouzhangpreview');
			}
		}
	}
</script>

<style>
	.message_show{
		background-color: #D9ECFF;
		border-radius: 0.1rem 0.1rem 0.1rem 0.1rem;
	}
</style>
