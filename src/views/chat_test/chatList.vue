<template>
	<div>
		<van-nav-bar
		  title="好友列表"
		  right-text="按钮"
		  @click-right="searchFrined()"
		>
			<template #right>
			    <van-icon name="add-o" size="18" />
				<!-- <van-dropdown-menu>
					<van-dropdown-item v-model="value1" :options="option1" />
				</van-dropdown-menu> -->
			</template>
		</van-nav-bar>
		
		<van-list>
			<div v-for="(val, index) in friendsHeadPicUrl" @click="onChat(index)">
				<van-row gutter="5">
				  <van-col span="4" offset="1">
					  <van-image
						round
						width="1rem"
						height="1rem"
						fit="cover"
						:src=val
					  />
				  </van-col>
				  <van-col span="8">
					  <div class="name">{{friendsNameList[index]}}</div>
				  </van-col>
				</van-row>
			</div>
		</van-list>
	</div>
</template>

<script>
	export default{
		name:"chatList",
		data(){
			return {
				state: null,
				friendsNameList: null,
				friendsId : null,
				friendsHeadPicUrl :null,
				// value1: 0,
				// option1:[
				// 			{ text: '搜索用户', value: 0 },
				// 			{ text: '好友申请', value: 1 },
				// 		],
			}
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
		methods:{ 
			onChat(index){
				console.log(index);
				this.$router.replace("/chatroom");
				this.$store.dispatch('set_text_friend',parseInt(index));
			},
			searchFrined(){
				this.$router.replace("/searchpass");
			}
		}
	}
</script>

<style>
	.name{
		line-height: 1rem;
		vertical-align: middle;
	}
</style>

