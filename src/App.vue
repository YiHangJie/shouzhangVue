<template>
  <div id="app">
	<router-view class="router"/>
	<van-tabbar route v-if="ifMainpage">
	  <van-tabbar-item replace to="/realhome" icon="home-o">主页</van-tabbar-item>
	  <van-tabbar-item replace to="/chatlist" icon="friends-o">好友</van-tabbar-item>
	  <van-tabbar-item replace to="/historypage" icon="records">历史</van-tabbar-item>
	  <van-tabbar-item replace to="/personpage" icon="setting-o">我的</van-tabbar-item>
	</van-tabbar>
	<van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<script>
	import BottomBar from './views/realHome/coms/BottomBar.vue'
	import {request,getUserInfo} from "network/request.js"
	import chatRoom from './views/chat_test/room.vue'
	import search_pass from './views/chat_test/search_pass.vue'
	import {EventBus} from "./utils/eventBus.js"
	
	export default {
		name:'App',
		data(){
			return {
				isDay:true,			//用于区别白天和黑夜
				ifMainpage: true,	//判断是否是主页
				userInfo: null,		//用户基本信息
				websock: null,		// websocket对象
				userID: null,
				message_received: ""
			}
		},
		components:{
			BottomBar,
			chatRoom,
			search_pass
		},
		created(){
		    // Vue实例创建后，最早可以获取到 data数据的钩子，但是模板未获取到
		    // 建议在这里面发送 ajax 异步请求
			this.dayOrnight();
			this.judge_ifMainpage();
		},
		mounted() {
			EventBus.$on("sendMessage", (data, type, userid, friendsid) => {
				console.log("bus on");
				this.send(data, type, userid, friendsid);
			});
		},
		beforeDestroy(){
			this.websocketclose();
		},
		beforeUpdate() {
			this.judge_ifMainpage();
			this.reqUserInfo();
		},
		updated() {
		},
		// watch: {
		//     '$store.state.friendsId': {
		//         handler: function(newer, older){
		// 			console.log(this.$store.state.ID);
		// 			//解释一下为什么这里我放了判断，因为我的需求使然，我存在vuex中的是userID，一个用户只有一个id，但可能会提交多条数据，watch只在数据发生变动的时候才执行操作，所以上面我每次都将store里面的数据置空操作。
		// 			if (newer != "") {
		// 				this.initWebSocket(this.$store.state.ID);
		// 			}
		//         },
		//         deep: true // 开启深度监听
		//     }
		// },
		methods:{
			send(data, type, userid, friendsid){
				console.log("App send")
				this.websocketsend(
					{
						senderID:userid,
						receiverID:friendsid,
						type:type,
						content:data
					}
				)
			},
			reqUserInfo(){
				let that = this
				getUserInfo(
					res => {
						console.log("getUserInfo");
						console.log(res);
						that.$store.dispatch('UpdateUserInfo', res["data"]["userData"]);
						let newId = res['data']["userData"]["ID"];
						console.log(newId);
						if (newId!=that.userId){
							that.userID = newId;
							that.initWebSocket(newId);
						}
					},
					err => {
						console.log(err);
					}
				);
			},
			click4(){
				if(this.isDay == true){
					this.$router.replace('/loginday');
				}
				else{
					this.$router.replace('/loginnight');
				}
			},
			judge_ifMainpage(){
				let path = this.$route.path;
				if (path == "/" | path == "/loginday" | path == "/chatroom" | path == "/registerday" | path == "/imguploader" | path == "/shouzhangpreview"){
					this.ifMainpage = false;
				}
				else{
					this.ifMainpage = true;
				}
			},
			dayOrnight(){    // 判断白天黑夜的函数，修改isDay变量
				let myDate = new Date();
				let htime = myDate.getHours();
				// console.log(htime);
				if (htime >= 25 || htime <= -1){
					this.isDay = false
				}
				else{
					this.isDay = true
				}
				console.log("isDay:"+this.isDay);
			},
			initWebSocket(uid){ //初始化weosocket
				if(this.websock == null){
					const wsuri = "wss://47.103.66.24:8443/TravelApp3/websocket/"+uid.toString() //这个地址由后端童鞋提供
					console.log("init websocket");
					console.log(wsuri);
					this.websock = new WebSocket(wsuri);
					this.websock.onmessage = this.websocketonmessage;
					this.websock.onopen = this.websocketonopen;
					this.websock.onerror = this.websocketonerror;
					this.websock.onclose = this.websocketclose;
				}
			},
			websocketonopen(){ //连接建立之后执行send方法发送数据
				console.log("websocket open")
			},
			websocketonerror(e){//连接建立失败重连
				this.initWebSocket()
				console.log("websocket error")
				console.log(e)
			},
			websocketonmessage(e){
				console.log("websocket message");
				let mes = JSON.parse(e.data);
				console.log(mes, mes.type);
				if (mes.type==="instant"){
					console.log("type === instant");
					this.$store.commit('addUnReadList', mes.unReadList);
				}
				else if(mes.type==="unRead"){
					console.log("type === unRead");
					this.$store.commit('addUnReadList', mes.unReadList);
				}
				else if(mes.type==="Read"){
					console.log("type === Read");
					if (mes.ReadList.type != "图片"){
						this.$store.commit('addReadList', mes.ReadList);
					}
				}
			},
			websocketsend(Data){//数据发送
				console.log("websocket send")
				this.websock.send(JSON.stringify(Data))
			},
			websocketclose(e){  //关闭
				console.log("websocket close")
				console.log('断开连接', e)
				this.websock = null;
			}
		}
	}
</script>

<style>
	.coms6{
		width: 100%;
		height: 20%;
	     position: absolute;
	     position: fixed; 
 	     z-index: 9999;
	    /* margin-top:680px;
	     margin-left: -57px; */
/* 		 margin-top: 0px;
		 margin-left: 0px; */
	   }
	
	.router{
		/* position: relative; */
		/* position: fixed; */
		width: 100%;
		height: 80%;
	}
</style>
