<template>
	<div>
		<van-nav-bar title="请选则风格模版" left-text="返回" left-arrow right-text="生成手帐" @click-left="goback" @click-right="generateShouzhang" id="shouzhangPreviewNavbar">
		</van-nav-bar>
		<!-- <van-divider>预设模版</van-divider> -->
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
		 
		<van-divider>给手帐取个名字吧</van-divider>
		<div class="shouzhangName">
			<input class="shouzhangNameInput" type="text" :placeholder=shouzhangName onfocus="this.placeholder=''"/>
		</div>
		
		
		<div class="rawMap_div">
		   <img class="stylePic_img" :src=rawMap />
		</div>
		
		<van-overlay :show="overlayShow" @click="overlayShow = false" id="shouzhangPreviewOverlay">
			<div class="progressbar" id="progressBarWord">
				<van-loading type="spinner" color="#1989fa" />
				<div style="color: #99A9BF;">手帐生成中······</div>
			</div>
		</van-overlay>
	</div>
	
</template>

<script>
	import {sendRawMap, getStylizedMap} from "network/request.js"
	export default{
		name:'styleChoose',
		data(){
			return{
				styleIndex : 0,
				rawMap:"",
				userName: "",
				overlayShow: false,
				ifStylizationCompleted: false,
				picUrl: null,
				timer: null,
				shouzhangName: ""
			}
		},
		mounted() {
			this.rawMap = this.$store.state.rawMap;
			this.userName = this.$store.state.userName;
			this.shouzhangName = this.userName + "的手帐";
			console.log("styleChoose"+this.rawMap);
			console.log("styleChoose"+this.userName);
		},
		watch:{
			'$store.state.rawMap':{
				handler: function(newer, older) {
				  //解释一下为什么这里我放了判断，因为我的需求使然，我存在vuex中的是userID，一个用户只有一个id，但可能会提交多条数据，watch只在数据发生变动的时候才执行操作，所以上面我每次都将store里面的数据置空操作。
				  if (newer === older) {
					return
				  } else {
					this.rawMap = newer // methods中定义好的获取数据列表的方法
				  }
				},
				deep: true // 开启深度监听
			},
			'$store.state.userName':{
				handler: function(newer, older) {
				  //解释一下为什么这里我放了判断，因为我的需求使然，我存在vuex中的是userID，一个用户只有一个id，但可能会提交多条数据，watch只在数据发生变动的时候才执行操作，所以上面我每次都将store里面的数据置空操作。
				  if (newer === older) {
					return
				  } else {
					this.userName = newer // methods中定义好的获取数据列表的方法
				  }
				},
				deep: true // 开启深度监听
			}
		},
		methods:{
			goback(){
				this.$router.replace('/shouzhangpreview');
			},
			generateShouzhang(){
				// this.overlayShow = true;
				this.$toast.success('图片正在风格化中，请到我的界面查看详情');
				let that = this;
				let formData = new FormData();
				formData.append('rawMap', this.rawMap);
				sendRawMap({
						url:'/TravelApp3/imgTransfer',
						method: "post",
						header:{
							"Content-Type" : 'multipart/form-data',
						},
						params: {
							uname: that.userName,
							styleIndex: that.styleIndex,
							shouzhangName: that.shouzhangName
						},
						
					},
					{
						rawMap: that.rawMap,
					},
					res => {
						console.log("rawMap sent", res);
						that.picUrl = res["data"]["picUrl"];
						that.$store.state.stylizedMap = res["data"]["picUrl"];
					},
					err => {
						console.log(err);
					}
				);
				this.$router.replace("/realhome");
			},
			setProgress(){
				let that = this;
				this.timer = setInterval(this.getStylizedMap, 5000);
			},
			getStylizedMap(){
				getStylizedMap(
					{
						url:'/TravelApp3/getImgTransfered',
						method: "get",
						params: {
							picUrl: this.picUrl
						},
					},
					res => {
						console.log("getImgTransfered", res);
						if (res['data']['ifExist']==="1"){
							this.ifStylizationCompleted===true;
							this.$store.state.stylizedMap = "stylizedMap:image/png;base64,"+res['data']["picData"];
							this.overlayShow = false;
							this.picUrl = "";
							clearInterval(this.timer);
						}else if(res['data']['ifExist']==="0"){
							this.ifStylizationCompleted===false;
						}
					},
					err => {
						console.log(err);
					}
				);
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
		max-width: 90%;  
		max-height: 90%; 
		left: 45%;
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
	  
	input.shouzhangNameInput{
		text-align:center;
		padding:10px 20px;
		border: 1px solid #ccc;
		border-radius: 20px;
		font-size: 20px;
		font-family: "Microsoft soft";
	}
	div.shouzhangName{
		text-align:center;
	}
</style>
