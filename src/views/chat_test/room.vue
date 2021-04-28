<template>
 <div class="chat-box">
    <van-nav-bar :title="friendsNameList[text_friend]" left-text="返回" left-arrow @click-left="goback()">
      <template #right>
        <van-icon name="more-o" size="18" />
      </template>
    </van-nav-bar>
    <!-- <div class="msg-box" ref="msg-box">
      <div
        v-for="(i,index) in list"
        :key="index"
        class="msg"
        :style="i.userId == userId?'flex-direction:row-reverse':''"
      >
        <div class="user-head">
          <div
            class="head"
            :style="` background: hsl(${getUserHead(i.userId,'bck')}, 88%, 62%); clip-path:polygon(${getUserHead(i.userId,'polygon')}% 0,100% 100%,0% 100%); transform: rotate(${getUserHead(i.userId,'rotate')}deg)`"
          ></div>
        </div>
        <div class="user-msg">
          <span
            :style="i.userId == userId?' float: right;':''"
            :class="i.userId == userId?'right':'left'"
          >{{i.content}}</span>
        </div>
      </div>
    </div> -->
	<div class="record-wrapper">
			<a v-for="item in message_list">
				<div v-if="item.senderID != userId">
					<div class="leftText" v-if="item.type === '好友消息'">
					   <div class="img-left">
					     <img class="img1" :src="friendsHeadPicUrl[text_friend]" />
					   </div>
					   <div class="message-left">
							{{item.content}}
						</div>
					 </div>
					
					<div class="leftImage" v-if="item.type === '图片'">
					   <div class="img-left">
					     <img class="img1" :src="friendsHeadPicUrl[text_friend]" />
					   </div>
						<van-image
						  width="4rem"
						  height="4rem"
						  fit="scale-down"
						  :src= item.content
						  class="left-image"
						>
							<template v-slot:error>加载失败</template>
						</van-image>
					 </div>
				</div>
					
				<div v-else>
					<div class="rightText" v-if="item.type === '好友消息'">
					   <div class="img-right">
					     <img class="img2" :src="headPicSrc" />
					   </div>
					   <div class="message-right">
							{{item.content}}
					   </div>
					</div>
					
					<div class="rightImage" v-if="item.type === '图片'">
					   <div class="img-right">
					     <img class="img2" :src="headPicSrc" />
					   </div>
					   <van-image
					     width="4rem"
					     height="4rem"
					     fit="scale-down"
					     :src= item.content
						 class="right-image"
						>
							<template v-slot:error>加载失败</template>
						</van-image>
					</div>
				</div>
			</a>
	</div>
    <!-- <div class="input-box">
      <input type="text" ref="sendMsg" v-model="contentText" @keyup.enter="sendText()" />
      <div class="btn" :class="{['btn-active']:contentText}" @click="sendText()">发送</div>
    </div> -->
	<div>
		<div class="input">
			<input class="input-content" type="text" v-model="inputText"/>
			<button class="button" @click="send_message" :disabled="sendButtonOn" >发送</button>
		
			<!-- <div class="icons"> -->
			<van-icon name="phone-o" size="35" class="icon1"/>
			<van-icon name="photo-o" size="35" class="icon2" @click="routeToUploader"/>
			<van-icon name="balance-o" size="35" class="icon3"/>
			<van-icon name="video-o" size="35" class="icon4"/>
			<van-icon name="notes-o" size="35" class="icon5"/>
			<!-- </div> -->
		</div>
	</div>
  </div>
</template>
 
<script>
import { mapState, mapMutations } from 'vuex';
import {EventBus} from "../../utils/eventBus.js"
import imgUploader from './uploadImage.vue'

export default {
	name:'chatRoom',
	data() {
		return {
			state: null,
			count: 0,
			userId: null, //当前用户ID
			headPicSrc: null,
			friendId: null,
			friendsNameList: null,
			friendsHeadPicUrl: null,
			text_friend: null,
			inputText: "" ,//input输入的值
		};
	},
	computed:{
		sendButtonOn: function(){
			if (this.inputText === ""){
				return true;
			}
			else{
				return false;
			}
		},
		message_list: function(){
			let messageList = this.$store.getters.getFriendMessage;
			return messageList[0].filter((i, v) => (i.senderID === this.text_friend && i.receiverID === this.userId)
														|| (i.receiverID === this.text_friend && i.senderID === this.userId));
		}
	},
	created() {
		console.log("created");
		this.state = this.$store.state;
		this.userId = this.$store.state.ID;
		this.headPicSrc = this.$store.state.headPicSrc;
		this.friendId = this.$store.state.friendsId;
		this.friendsNameList = this.$store.state.friendsNameList;
		this.friendsHeadPicUrl = this.$store.state.friendsHeadPicUrl;
		this.text_friend = this.$store.state.text_friend;
		let rawmes = this.$store.getters.getFriendMessage;
		this.message_list = rawmes.filter((i, v) => (i.senderID === this.text_friend && i.receiverID === this.userId)
														|| (i.receiverID === this.text_friend && i.senderID === this.userId));
		console.log(this.state, this.userId, this.headPicSrc, this.friendId, this.friendsNameList, this.friendsHeadPicUrl, this.text_friend, this.message_list);
	},
	mounted() {
		
	},
	watch:{
		'$store.state.friendsId': {
			handler: function(newer, older) {
			  //解释一下为什么这里我放了判断，因为我的需求使然，我存在vuex中的是userID，一个用户只有一个id，但可能会提交多条数据，watch只在数据发生变动的时候才执行操作，所以上面我每次都将store里面的数据置空操作。
			  if (newer === older) {
				return
			  } else {
				this.friendsId = newer // methods中定义好的获取数据列表的方法
				console.log(this.friendsId);
			  }
			},
			deep: true // 开启深度监听
	    },
		'$store.state.friendsHeadPicUrl': {
			handler: function(newer, older) {
			  //解释一下为什么这里我放了判断，因为我的需求使然，我存在vuex中的是userID，一个用户只有一个id，但可能会提交多条数据，watch只在数据发生变动的时候才执行操作，所以上面我每次都将store里面的数据置空操作。
			  if (newer === older) {
				return
			  } else {
				this.friendsHeadPicUrl = newer // methods中定义好的获取数据列表的方法
				console.log(this.friendsHeadPicUrl);
			  }
			},
			deep: true // 开启深度监听
		},
		'$store.state.friendsNameList': {
			handler: function(newer, older) {
			  //解释一下为什么这里我放了判断，因为我的需求使然，我存在vuex中的是userID，一个用户只有一个id，但可能会提交多条数据，watch只在数据发生变动的时候才执行操作，所以上面我每次都将store里面的数据置空操作。
			  if (newer === older) {
				return
			  } else {
				this.friendsNameList = newer // methods中定义好的获取数据列表的方法
				console.log(this.friendsNameList);
			  }
			},
			deep: true // 开启深度监听
		},
		'$store.state.text_friend': {
			handler: function(newer, older) {
			  //解释一下为什么这里我放了判断，因为我的需求使然，我存在vuex中的是userID，一个用户只有一个id，但可能会提交多条数据，watch只在数据发生变动的时候才执行操作，所以上面我每次都将store里面的数据置空操作。
			  if (newer === older) {
				return
			  } else {
				this.text_friend = newer // methods中定义好的获取数据列表的方法
				console.log(this.text_friend);
			  }
			},
			deep: true // 开启深度监听
		},
		"$store.state.unReadList": {
			handler: function(newer, older) {
			  //解释一下为什么这里我放了判断，因为我的需求使然，我存在vuex中的是userID，一个用户只有一个id，但可能会提交多条数据，watch只在数据发生变动的时候才执行操作，所以上面我每次都将store里面的数据置空操作。
			console.log("message_list changed!");
			let messageList = this.$store.getters.getFriendMessage;
			console.log("getters.getFriendMessage", messageList);
			this.message_list = messageList[0].filter((i, v) => (i.senderID === this.text_friend.toString() && i.receiverID === this.userId.toString())
														|| (i.receiverID === this.text_friend.toString() && i.senderID === this.userId.toString()));
			this.$store.commit('delSpecificUnReadMessage', messageList[1]);
			this.$store.commit('addReadList', messageList[1]);
			console.log("room message_list", this.message_list);
			},
			deep: true // 开启深度监听
		},
		'$store.state': {
			handler: function(newer, older) {
			  //解释一下为什么这里我放了判断，因为我的需求使然，我存在vuex中的是userID，一个用户只有一个id，但可能会提交多条数据，watch只在数据发生变动的时候才执行操作，所以上面我每次都将store里面的数据置空操作。
			  if (newer === older) {
				return
			  } else {
				this.state = newer // methods中定义好的获取数据列表的方法
				console.log(this.state);
			  }
			},
			deep: true // 开启深度监听
		},
	},
  methods: {
	send_message(){
		console.log("room send_message")
		EventBus.$emit("sendMessage", this.inputText, "好友消息", this.userId, this.text_friend);
		this.$store.commit('addUnReadList', {
			senderID: this.userId,
			receiverID: this.text_friend,
			type: "好友消息",
			content: this.inputText
		});
		// this.message_list.push({
		// 	senderID: this.userId.toString(),
		// 	receiverID: this.text_friend,
		// 	type: "好友消息",
		// 	content: this.inputText
		// })
		this.inputText = "";
		// this.scrollBottm();
	},
	goback(){
		this.$router.replace("/chatlist");
	},
	routeToUploader(){
		this.$router.replace("/imguploader");
	}
  }
};
</script>
 
<style lang="scss" scoped>
	.record-wrapper {
	  margin-top: 10px;
	  margin-left: 5%;
	  height: 80%;
	  width: 90%;
	  overflow-y: scroll;
	}
	.leftText{
	  width: 100%;
	  height: 60px;
	  margin-left: 1%;
	}
	.leftImage{
	  width: 100%;
	  height: 4.5rem;
	  margin-left: 1%;
	}
	.img-left{
	  height: 50px;
	  width: 50px;
	  float: left;
	}
	.img1 {
	    height: 50px;
	    width: 50px;
	    border-radius: 50px;
	
	  }
	.message-left{
	  height: 45px;
	  line-height: 45px;
	  /* width: 50%; */
	  float: left;
	  margin-left:10px ;
	  margin-top: 5px;
	  vertical-align: middle;
	  font-size: 20px;
	  border-radius: 10px;
	  padding-left:10px;
	  padding-right: 10px;
	  background:#ace;
	  display: inline-block;
	  color: #414146;
	}
	.rightText{
	  width: 100%;
	  height: 60px;
	  margin-right: 1%;
	}
	.rightImage{
	  width: 100%;
	  height: 4.5rem;
	  margin-right: 1%;
	}
	.img-right{
	  height: 50px;
	  width: 50px;
	  float: right;
	}
	.img2 {
	    height: 50px;
	    width: 50px;
	    border-radius: 50px;
	
	  }
	.message-right{
	  height: 45px;
	  line-height: 45px;
	  float: right;
	  margin-right:10px ;
	  margin-top: 5px;
	  vertical-align: middle;
	  font-size: 20px;
	  border-radius: 10px;
	  padding-right:10px;
	  padding-left: 10px;
	  text-align: end;
	  background:#ffdab9;
	  display: inline-block;
	  color: #414146;
	
	}
.left-image{
	float: left;
	margin-left: 0.1rem;
}
.right-image{
	float: right;
	margin-right: 0.1rem;
}
.chat-box {
  margin: 0 auto;
  background: #fafafa;
  position: absolute;
  height: 100%;
  width: 100%;
  header {
    position: fixed;
    width: 100%;
    height: 3rem;
    background: #409eff;
    max-width: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    font-size: 1rem;
  }
  .msg-box {
    position: absolute;
    height: calc(100% - 6.5rem);
    width: 100%;
    margin-top: 3rem;
    overflow-y: scroll;
    .msg {
      width: 95%;
      min-height: 2.5rem;
      margin: 1rem 0.5rem;
      position: relative;
      display: flex;
      justify-content: flex-start !important;
      .user-head {
        min-width: 2.5rem;
        width: 20%;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: #f1f1f1;
        display: flex;
        justify-content: center;
        align-items: center;
        .head {
          width: 1.2rem;
          height: 1.2rem;
        }
        // position: absolute;
      }
      .user-msg {
        width: 80%;
        // position: absolute;
        word-break: break-all;
        position: relative;
        z-index: 5;
        span {
          display: inline-block;
          padding: 0.5rem 0.7rem;
          border-radius: 0.5rem;
          margin-top: 0.2rem;
          font-size: 0.88rem;
        }
        .left {
          background: white;
          animation: toLeft 0.5s ease both 1;
        }
        .right {
          background: #53a8ff;
          color: white;
          animation: toright 0.5s ease both 1;
        }
        @keyframes toLeft {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0px);
          }
        }
        @keyframes toright {
          0% {
            opacity: 0;
            transform: translateX(10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0px);
          }
        }
      }
    }
  }
  .input-box {
    padding: 0 0.5rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1.5rem;
    background: #fafafa;
    box-shadow: 0 0 5px #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      height: 1rem;
      display: inline-block;
      width: 100%;
      padding: 0.5rem;
      border: none;
      border-radius: 0.2rem;
      font-size: 0.5rem;
    }
    .btn {
      height: 1rem;
      min-width: 2rem;
      background: #e0e0e0;
      padding: 0.5rem;
      font-size: 0.4rem;
      color: white;
      text-align: center;
      border-radius: 0.2rem;
      margin-left: 0.5rem;
      transition: 0.5s;
    }
    .btn-active {
      background: #409eff;
    }
  }
  .input{
    height: 15%;
    width: 100%;
	position: fixed;

    background: #ace;
  
  }
  .input-content{
    margin-top: 10px;
    margin-left: 5%;
    line-height: 40px;
    height: 40px;
    vertical-align: middle;
    width: 70%;
    border-radius: 30px;
    float: left;
  
  }
  .button{
    height: 40px;
    width: 20%;
    margin-top: 10px;
    float: left;
     background: #ffdab9;
     border-radius: 30px;
  }
  .icon1{
    margin-top: 10px;
    margin-left: 5%;
  }
  .icon2{
    margin-top: 10px;
    margin-left: 10%;
  }
  .icon3{
    margin-top: 10px;
    margin-left: 10%;
  }
  .icon4{
    margin-top: 10px;
    margin-left: 10%;
  }
  .icon5{
    margin-top: 10px;
    margin-left: 10%;
  }
}

</style>