<template>
	<div>
		<van-nav-bar title="请选则风格模版" left-text="返回" left-arrow right-text="生成手帐" @click-left="goback" @click-right="generateShouzhang" id="shouzhangPreviewNavbar">
		</van-nav-bar>
		<van-divider>预设模版</van-divider>
		<van-swipe indicator-color="white" @change="onChange">
		   <van-swipe-item>
				<div class="stylePic_div">
				   <img class="stylePic_img" src="../../assets/imgs/style/style1.jpg"/>
				</div>
		   </van-swipe-item>
		   <van-swipe-item>
				<div class="stylePic_div">
				   <img class="stylePic_img" src="../../assets/imgs/style/style2.jpg"/>
				</div>
		   </van-swipe-item>
		   <van-swipe-item>
				<div class="stylePic_div">
				   <img class="stylePic_img" src="../../assets/imgs/style/style3.jpg"/>
				</div>
		   </van-swipe-item>
		   <van-swipe-item>
				<div class="stylePic_div">
				   <img class="stylePic_img" src="../../assets/imgs/style/style4.jpg"/>
				</div>
		   </van-swipe-item>
		   <van-swipe-item>
				<div class="stylePic_div">
				   <img class="stylePic_img" src="../../assets/imgs/style/style5.jpg"/>
				</div>
		   </van-swipe-item>
		   <van-swipe-item>
				<div class="stylePic_div">
				   <img class="stylePic_img" src="../../assets/imgs/style/style6.jpg"/>
				</div>
		   </van-swipe-item>
		   <template #indicator>
		       <div class="custom-indicator">{{ styleIndex + 1 }}/6</div>
		     </template>
		 </van-swipe>
		 
		<van-divider>原图</van-divider>
		<div class="rawMap_div">
		   <img class="stylePic_img" :src=rawMap />
		</div>
		
		<van-overlay :show="overlayShow" @click="overlayShow = false" id="shouzhangPreviewOverlay">
			<div class="progressbar" id="progressBarWord">
				<div style="color: #99A9BF;">手帐生成中······</div>
				<van-progress :percentage="progressrate" stroke-width="8" ref="progressBar"/>
			</div>
		</van-overlay>
	</div>
	
</template>

<script>
	import {sendRawMap} from "network/request.js"
	export default{
		name:'styleChoose',
		data(){
			return{
				styleIndex : 1,
				rawMap:""
			}
		},
		created() {
			this.rawMap = this.$store.rawMap;
		},
		methods:{
			goback(){
				this.$router.replace('/shouzhangpreview');
			},
			generateShouzhang(){
				this.overlayShow = true;
				this.setProgress();
				let that = this;
				sendRawMap({
					url:'/mapTransfer/imgTransfer',
					method: "post",
					header:{
						"Content-Type" : 'text/plain',
					},
					params: {
						uname: that.$store.uname,
						photoData: that.$store.rawMap
					}
					},
					res => {
						console.log("rawMap sent", res);
					},
					err => {
						console.log(err);
					}
				);
			},
			setProgress(){
				let that = this;
				if(this.progressrate === 100){
					window.setTimeout(function(){
						that.overlayShow = false;
						that.progressrate = 0;
						that.$router.replace("/shouzhangresult");
					}, 100);
					return
				}
				window.setTimeout(function(){
					that.progressrate = that.progressrate + 2;
					that.$refs.progressBar.resize();
					that.setProgress();
				}, 100);
			},
			onChange(index) {
			    this.styleIndex = index;
			},
		}
	}
</script>

<style>
	.stylePic_div{
		width: 200px;
		height: 200px;
		vertical-align: middle;
		text-align: center;
		display: table-cell;
	}
	.rawMap_div{
		width: 200px;
		height: 400px;
		vertical-align: middle;
		text-align: center;
		display: table-cell;
	}
	.stylePic_img{
		width: auto;
		height: auto;
		max-width: 100%;  
		max-height: 100%; 
		left: 50%;
		position: relative;
	}
	.custom-indicator {
	    position: absolute;
	    right: 5px;
	    bottom: 5px;
	    padding: 2px 5px;
	    font-size: 12px;
	    background: rgba(0, 0, 0, 0.1);
	  }
</style>
