<template>
	<div>
		<van-nav-bar title="这是您的定制手帐" right-text="完成" @click-right="goback">
		</van-nav-bar>
		<div id="shouzhangResultImageAndButton">
			<van-image
			  width="7rem"
			  height="9rem"
			  fit="scale-down"
			  src="https://47.103.66.24:8443/shouzhang/image/shouzhang1.png"
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
	export default{
		name:"shouzhangResult",
		data(){
			return{
				
			}
		},
		methods:{
			goback(){
				this.$router.replace('/historypage');
			},
			save(){
				this.$toast.success("保存成功！");
			}
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
