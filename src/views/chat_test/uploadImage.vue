<template>
	<div>
		<van-nav-bar title="选择并上传图片" right-text="完成" @click-right="sendImage">
		</van-nav-bar>
		<div>
			<van-uploader v-model="fileList" multiple :max-count="9" :max-size="2048 * 1024" :after-read="afterRead" @oversize="onOversize"/>
		</div>
	</div>
</template>

<script>
	import {EventBus} from '../../utils/eventBus.js'
	
	export default{
		name: 'imgUploader',
		data(){
			return {
				fileList: []
			}
		},
		methods:{
			afterRead(res){
				console.log('res.file',res.file);
				let message = {
					senderID: this.$store.state.ID,
					receiverID: this.$store.state.text_friend,
					type: "图片",
					content: res.content
				};
				EventBus.$emit("sendMessage", res.content, "图片", this.$store.state.ID, this.$store.state.text_friend);
				this.$store.commit('addUnReadList', message);
			},
			onOversize(){
				this.$toast.fail("文件大小不能超过 2M");
			},
			sendImage(){
				this.$router.replace('/chatroom');
			},
			goback(){
				this.$router.replace('/chatroom');
			}
		}
		
	}
</script>

<style>
</style>
