<template>
  <div class="form-wrapper">
    <div class="header">
      <svg-icon icon-class='_burglar' class='s-icon'></svg-icon>
    </div>
    <div class="input-wrapper">
      <div class="border-wrapper">
        <input type="text" name="username" placeholder="username" class="border-item" v-model="uname">
      </div>
      <div class="border-wrapper">
        <input type="password" name="password" placeholder="password" class="border-item" v-model="password">
      </div>
    </div>
    <div class="action">
      <div class="btn" @click="loginclick">login</div>
    </div>
    <div class="icon-wrapper">
      <i class="iconfont phs-weixin">&#xe601;</i>
      <i class="iconfont phs-weibo">&#xe665;</i>
      <i class="iconfont phs-github">&#xe600;</i>
    </div>
  	<div class='header-line' @click="toRegister">Don't have account? Sign up</div>
  </div>
</template>

<script>
	import {request} from "network/request.js"
	import 'icons/svg/_burglar.svg'    //引入是icons里面的svg
	import SvgIcon from 'components/IconSvg'
	export default {
	  name:'LoginPageDay',
	  data(){
		  return {
			  uname : "",
			  password : "",
			  sessionid: ""
		  }
	  },
	  components:{
		  SvgIcon
	  },
	  methods:{
		  toRegister(){
			  this.$router.replace('/registerday');
		  },
		  loginclick(){
			  this.$router.replace('/realhome');
			  // let login_data = {"uname":this.uname , "pwd":this.password};
			  request({
			  		url:'/TravelApp3/DoLogin',
			  		method: "post",
			  		// data : login_data,
			  		header:{
						"Content-Type" : 'text/plain',
					},
					params: {
						uname:this.uname,
						pwd:this.password,
					}
			  	},
				res => {
					console.log("登陆请求发送！");
					console.log(res);
					let allCookies = document.cookie;
					console.log(allCookies);
					this.sessionid = res['headers']["sessionid"];
					if(res['headers']['loginstate'] == 1){
						this.$router.replace('/realhome');
					}
				},
				err => {
					console.log(err);
				}
			  );
		  },
	  }
	}
</script>

<style lang="stylus" scoped>
  .form-wrapper {
    width: 320px;
    height 812px;
    background-color: #FFFFFF;
    // rgb(41, 45, 62);
    color: #fff;
    border-radius: 2px;
    padding: 30px;
  }

  .form-wrapper .header {
    text-align: center;
    font-size: 45px;
    text-transform: uppercase;
    height: 330px;
  }
  .form-wrapper .header .s-icon {
    text-align: center;
    padding-top 80px;
  }

  .form-wrapper .input-wrapper input {
    background-color: #fff;
    //background-image: linear-gradient(to right,#a6c1ee,#fbc2eb);
    //background-image: linear-gradient(to right,#e8198b,#0eb4dd);
    color: rgb(41, 45, 62);
    border: 0;
    width: 100%;
    text-align: center;
    font-size: 15px;
    outline: none;
  }
  .form-wrapper .input-wrapper input::placeholder {
    text-transform: uppercase;
    color rgb(44,55,44);
  }

  .form-wrapper .input-wrapper .border-wrapper {
    //background-image: linear-gradient(to right,#e8198b,#0eb4dd);
    width: 100%;
    background-image: linear-gradient(to right,#a6c1ee,#fbc2eb);
    height: 50px;
    margin-bottom: 20px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-wrapper .input-wrapper .border-wrapper .border-item {
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    border-radius: 25px;
	color: #000000
  }
  .form-wrapper .action {
    display: flex;
    justify-content: center;
  }
  .form-wrapper .action .btn {
    width: 60%;
    text-transform: uppercase;
    // border: 2px solid #0e92b3;
    text-align: center;
    line-height: 50px;
    border-radius: 25px;
    cursor: pointer;
    transition: .2s;
    color rgb(44,55,44);
    // box-shadow: 0 10px 50px 0px rgb(59,45,159);
    // background-color: rgb(195, 236, 245);
    background-image: linear-gradient(to right,#a6c1ee,#fbc2eb);
    //background-image: linear-gradient(to right,#e8198b,#0eb4dd);
}
  .form-wrapper .action .btn:hover{
    background-color: #0e92b3;
  }

  .form-wrapper .icon-wrapper {
    text-align: center;
    width: 75%;
    margin: 0 auto;
    margin-top: 20px;
    border-top: 1px dashed rgb(44, 55, 44);
    padding: 10px;
  }

  .form-wrapper .icon-wrapper  i{
    font-size: 40px;
    color:  rgb(44, 55, 44);
    cursor: pointer;
    border: 1px solid #fff;
    padding: 5px;
    border-radius: 20px;
  }

  .form-wrapper .header-line {

  	width: 100%;
  	text-align: center;
  	line-height: 20px;
  	background-color: #FFFFFF;
    // rgb(41, 45, 62);
  	padding: 3px;
  	color: #000000;

  }

</style>
