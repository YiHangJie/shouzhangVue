<template>
	<div>
		<van-nav-bar title="这是您的定制手帐" right-text="完成" @click-right="goback">
		</van-nav-bar>
		<div id="shouzhangResultImageAndButton">
			<van-image
			  width="7rem"
			  height="9rem"
			  fit="scale-down"
			  :src= stylizedMap
			  id = "shouzhangResultImage"
			/>
			<div id="shouzhangResultButton">
				<van-button round type="info" icon="down" class="SaveShareButton" @click="save">保存</van-button>
				<!-- <van-button round type="info" icon="share-o">分享</van-button> -->
			</div>
		</div>
		
		
	</div>
</template>

<script>
	import {getStylizedMap} from "../../network/request.js"
	export default{
		name:"shouzhangResult",
		data(){
			return{
				stylizedMap: this.$store.state.stylizedMap
			}
		},
		created(){
			this.$store.state.stylizedMap = this.$store.state.rawMap;
			this.stylizedMap = this.$store.state.stylizedMap;
			getStylizedMap({
					url:'/TravelApp3/imgTransfer',
					method: "post",
					header:{
						"Content-Type" : 'multipart/form-data',
					},
					params: {
						uname: that.userName
					},
					
				},
				{
					rawMap: that.rawMap,
				},
				res => {
					console.log("rawMap sent", res);
				},
				err => {
					console.log(err);
				}
			);
		},
		methods:{
			goback(){
				this.$router.replace('/historypage');
			},
			save(){
				this.downLoadFile("shouzhang", this.stylizedMap);
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
		}
	}
</script>

<style>
	#shouzhangResultImage{
		position: relative;
		left: 50%;
		transform: translate(-50%,10px);
	}
	#shouzhangResultButton{
		margin-top: 0.625rem;
		text-align: center;
	}
	#shouzhangResultImageAndButton{
		margin-top: 15%;
	}
</style>
