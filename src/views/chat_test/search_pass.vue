<template>
	<div>
		<van-nav-bar title="好友申请" left-arrow left-text="返回" @click-left="onClickLeft">
		</van-nav-bar>	
		<div style="margin: 16px;"></div>
		<van-tabs type="card" @click="choose_function">
		  <van-tab title="搜索好友"></van-tab>
		  <van-tab title="好友申请"></van-tab>
		</van-tabs>
		<div v-if="function_name === 0">
			<div style="margin: 16px;"></div>
			<van-form @submit="onSearch">
			  <van-field
			    v-model="username"
			    name="用户名"
			    label="用户名"
			    placeholder="用户名"
			    :rules="[{ required: true, message: '请填写用户名' }]"
			  />
			  <div style="margin: 16px;">
			    <van-button round block type="info" native-type="submit">搜索</van-button>
			  </div>
			</van-form>
			
			<div v-if="ifShowRes===1">
				<van-row>
					<van-col span="6" id="headpic">
						<van-image
						  round
						  :src="userData.headPicSrc"
						  class="searchPassHeadPic"
						/>
					</van-col>
					<van-col span="10">
						<van-cell :title="userData.userName" size="large" :label="textIfonline" />
						<p class="introduction">{{userData.Email}}</p>
					</van-col>
					<van-col span="6">
						<van-button round type="info" @click="apply" id="add_button">加好友</van-button>
					</van-col>
				</van-row>
			</div>
		</div>
		<div v-else-if="function_name === 1">
			<div style="margin: 16px;"></div>
			<van-list finished-text="没有更多了">
				<van-row v-for="(item,index) in application_list">
					<van-col span="6" id="headpic">
						<van-image
						  round
						  :src="headpic_list[index]"
						  class="searchPassHeadPic"
						/>
					</van-col>
					<van-col span="10">
						<van-cell :title="item.content" size="large" />
						<p class="introduction">{{Email_list[index]}}</p>
					</van-col>
					<van-col span="4">
						<van-button round type="info" @click="confirm(index)" id="add_button">同意</van-button>
					</van-col>
					<van-col span="4">
						<van-button round type="info" @click="refuse(index)" id="add_button">拒绝</van-button>
					</van-col>
				</van-row>
			</van-list>
		</div>
		
	</div>
</template>

<script>
	import {request} from "network/request.js"
	import {EventBus} from "utils/eventBus.js"
	
	export default{
		name:"search_pass",
		data(){
			return{
				function_name : 0,
				userData : {
				},
				application_list: this.$store.getters.getFriendApplication,
				headpic_list:[],
				Email_list:[],
				username : "",
				ifContain:0,
				ifOnline:0,
				ifFriend:0,
				ifShowRes:0
			}
		},
		computed: {
			textIfonline: function(){
				if(this.ifOnline===0){
					return "下线";
				}
				else{
					return "在线";
				}
			}
		},
		methods:{
			choose_function(name, title){			//切换页面的功能
				console.log(name, title);
				this.function_name = name;
				if(this.function_name === 1){
					this.application_list = this.$store.getters.getFriendApplication;
					console.log("search_pass",this.application_list);
					for (let i=0;i<this.application_list.length;i++){
						request({
							url:'/TravelApp3/UserInfoByName',
							method: "post",
							header:{
								"Content-Type" : 'text/plain',
							},
							params: {
								uname:this.application_list[i].content
							}
						},
						res => {
							console.log("查询好友信息！");
							console.log(res);
							this.headpic_list.push(res['data']['userData']['headPicSrc']);
							this.Email_list.push(res['data']['userData']['Email']);
						},
						err => {
							console.log(err);
						}
						);
					}
				}
			},
			onClickLeft(){
				this.$router.replace("/chatlist");
			},
			onSearch(username){			//搜索好友
				request({
					url:'/TravelApp3/UserInfoByName',
					method: "post",
					header:{
						"Content-Type" : 'text/plain',
					},
					params: {
						uname:username["用户名"]
					}
				},
				res => {
					console.log("查询好友信息！");
					console.log(res);
					this.userData = res['data']['userData'];
					this.ifContain = res['data']['ifContain'];
					this.ifOnline = res['data']['ifOnline'];
					this.ifFriend = res['data']['ifFriend'];
					this.ifShowRes = 1;
					if(this.ifContain === "0"){
						this.$toast.fail("用户不存在");
					}
				},
				err => {
					console.log(err);
					this.ifShowRes = 0;
				}
				);
			},
			apply(){			//发出加好友请求
				if(this.ifFriend === "1"){
					this.$toast.fail("该用户已经是好友了");
					return 0;
				}
				console.log("bus emit");
				EventBus.$emit("sendMessage", this.$store.state.userName, "好友请求", this.$store.state.ID, this.userData.ID);
			},
			confirm(index){			//同意好友申请
				request({
					url:'/TravelApp3/AddFriend',
					method: "post",
					header:{
						"Content-Type" : 'text/plain',
					},
					params: {
						myID:this.$store.state.ID,
						friendID:this.application_list[index].senderID
					}
				},
				res => {
					console.log("发出好友申请！");
					console.log(res);
					this.userData = res['data']['userData'];
					this.ifOnline = res['data']['ifOnline'];
				},
				err => {
					console.log(err);
				}
				);
				this.application_list.splice(index,1);
			},
			refuse(index){			//拒绝好友申请
				this.application_list.splice(index,1);
				this.$store.commit('delSpecificUnReadApplication', this.application_list[index].senderID);
			}
		}
	}
</script>

<style>
	.searchPassHeadPic {
	    display: block;
	    width: 90%;
	    height: 90%;
	}
	#headpic {
	    margin-top: 6px;
	}
	button#add_button {
	    margin-top: 12px;
	}
	p.introduction {
	    margin-left: 16px;
	    font-style: italic;
	    width: 210px;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	}
</style>
