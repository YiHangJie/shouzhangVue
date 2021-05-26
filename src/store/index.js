import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state:{
        //存放的键值对就是所要管理的状态
		userName: "",
		ID: "",
		Email:"",
		headPicSrc:"",
		friendsId:"",
		friendsHeadPicUrl:"",
		friendsNameList:"",
		text_friend:"",
		unReadList:[],
		readList:[],
		preparedPois:[],
		rawMap:"",
		stylizedMap:"",
		picUrls:[]
	},
    mutations:{
        //es6语法，等同edit:funcion(){...}
        UserInfo(state,payload){
			state.userName = payload.userName;
			state.ID = payload.ID;
			state.Email = payload.Email;
			state.headPicSrc = payload.headPicSrc;
			state.friendsId = payload.friendsId;
			state.friendsHeadPicUrl = payload.friendsHeadPicUrl;
			state.friendsNameList = payload.friendsNameList;
			console.log(state.userName,state.ID,state.Email,state.headPicSrc,state.friendsId,state.friendsHeadPicUrl,state.friendsNameList);
        },
		text_friend(state,payload){
			state.text_friend = payload;
		},
		addUnReadList(state,payload){
			console.log("VueX addUnReadList",payload);
			state.unReadList = state.unReadList.concat(payload);
			console.log("state.unReadList",state.unReadList);
		},
		shiftUnReadList(state,payload){
			state.unReadList.shift();
		},
		delSpecificUnReadApplication(state,payload){
			console.log("VueX delSpecificUnReadApplication",payload);
			state.unReadList.splice(state.unReadList.findIndex(function (item){
				return item.senderID === payload && item.type==="好友请求";
			} , 1));
			console.log("state.unReadList",state.unReadList);
		},
		delSpecificUnReadMessage(state,payload){
			console.log("VueX delSpecificUnReadApplication",payload);
			for (let i = 0; i<payload.length; i++){
				state.unReadList.splice(state.unReadList.findIndex(function (item){
					return item.senderID === payload && item.type==="好友消息" && item.content === i.content;
				} , 1));
			}
			console.log("state.unReadList",state.unReadList);
		},
		initUnReadList(state,payload){
			console.log("VueX initUnReadList",payload);
			state.unReadList = payload;
			console.log("state.unReadList",state.unReadList);
		},
		initReadList(state,payload){
			console.log("VueX initReadList",payload);
			state.readList = payload;
			console.log("state.readList",state.readList);
		},
		addReadList(state,payload){
			console.log("VueX addReadList",payload);
			state.readList = state.readList.concat(payload);
			console.log("state.readList",state.readList);
		},
		editPreparedPois(state,payload){
			console.log("VueX editPreparedPois",payload);
			state.preparedPois = payload;
			console.log("state.preparedPois", state.preparedPois);
		}
    },
	actions:{
		UpdateUserInfo({commit}, obj){
			setTimeout(()=>{
				commit('UserInfo',obj);
			},1000)
		},
		set_text_friend({commit}, obj){
			commit('text_friend',obj);
		},
	},
	getters:{
		getFriendApplication(state){
			let res = state.unReadList.filter( (i, v) => i.type === "好友请求");
			console.log("VueX getters getFriendApplication", res);
			return res;
		},
		getFriendMessage(state, payload){
			let res1 = state.readList.filter( (i, v) => i.type === "好友消息" || i.type === "图片");
			let res2 = state.unReadList.filter( (i, v) => i.type === "好友消息" || i.type === "图片");
			let res3 = [];
			res3 = res3.concat(res1, res2);
			console.log("VueX getters getFriendMessage", res3);
			return [res3,res2];
		}
	}
})

export default store