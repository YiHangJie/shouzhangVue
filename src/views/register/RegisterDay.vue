<template>
	<div>
		<van-nav-bar
			title="注册"
			left-text="返回"
			left-arrow
			@click-left="goback"
			/>
		<div class="form-wrapper">
			<div class='black'>
				<svg-icon icon-class='山脉星空' class='s-icon'></svg-icon>
			</div>
			<div class="input-wrapper">
				<div class="border-wrapper">
					<input type="text" name="username" placeholder="username" class="border-item" v-model="username">
				</div>
					<div class="border-wrapper">
						<input type="text" name="username" placeholder="Email Address" class="border-item" v-model="Email_ad">
					</div>
				<div class="border-wrapper">
					<input type="password" name="password" placeholder="password" class="border-item" v-model="pwd1">
				</div>
				<div class="border-wrapper">
					<input type="password" name="password" placeholder="confirmPassword" class="border-item" v-model="pwd2">
				</div>
			</div>
			<div class="code">
				<input type="text" name="code" placeholder="confirmcode" class="code-input" v-model="confirmcode">
		    <div class="btn-code" @click="getcode">request</div>
			</div>
			<div class="action" @click="register">
				<div class="btn">register</div>
			</div>
		</div>
	</div>
</template>

<script>
	import 'icons/svg/山脉星空.svg'    //引入是icons里面的svg
	import SvgIcon from 'components/IconSvg'
	import {request} from "network/request.js"
	
	export default {
	  name:'RegisterPageDay',
	  components:{
		SvgIcon
	  },
	  data(){
		  return{
			  username:"",
			  Email_ad:"",
			  pwd1:"",
			  pwd2:"",
			  confirmcode:"",
			  coderes:0,
			  regres:0,
		  }
	  },
	  methods:{
		  register(){
			  if (this.check_format2()!=0){
				return -1;
			  }
			  request({
				url:'/TravelApp3/DoRegister',
				method: "post",
				// data : login_data,
				header:{
					"Content-Type" : 'text/plain',
				},
				params: {
					EmailCode:this.confirmcode,
					anEmail:this.Email_ad,
					uname:this.username,
					pwd:this.pwd1,
				}
				},
				res => {
					console.log("注册请求发送！");
					console.log(res);				
					this.regres = res['data']["State"];
					this.check_regres();
				},
				err => {
					console.log(err);
				}
			  );
		  },
		  getcode(){
			  if (this.check_format1()!=0){
				  return -1;
			  }
			  request({
					url:'/TravelApp3/DoEmail',
					method: "post",
					header:{
						"Content-Type" : 'text/plain',
					},
					params: {
						anEmail:this.Email_ad,
					}
				},
				res => {
					console.log("获取验证码请求发送！");
					console.log(res);
					this.coderes = res['data']["State"];
					this.check_coderes();
				},
				err => {
					console.log(err);
				}
			  );
		  },
		  check_format2(){
			  if (this.pwd1 != this.pwd2){
				  this.$toast.fail('请输入一致的密码');
				  return -1;
			  }
			  else if (this.username === "" || this.Email_ad === "" || this.pwd1 === "" || this.pwd2 === ""){
				  this.$toast.fail('请输入完整信息');
				  return -2;
			  }
			  return 0
		  },
		  check_format1(){
			  if (this.Email_ad === ""){
				  this.$toast.fail('请输入您的邮箱');
				  return -3;
			  }
			  return 0
		  },
		  check_regres(){
			  switch(this.regres){
				  case "1":
					this.$toast.success("注册成功");
					this.$router.replace('/loginday');
					break;
				  case "2":
					this.$toast.fail("邮箱验证码错误");
					break;
				  case "3":
					this.$toast.fail("用户名已存在");
					break;
			  }
		  },
		  check_coderes(){
			  switch(this.coderes){
				  case "1":this.$toast.success("验证码发送成功");break;
				  case "2":this.$toast.fail("验证码发送失败");break;
				  case "3":this.$toast.fail("邮箱已存在");break;
			  }
		  },
		  goback(){
			  this.$router.replace("/loginday");
		  }
	  }
	}
</script>

<style lang="stylus" scoped>
  .form-wrapper {
    width: 320px;
    height 812px;
    background-color:#FFFFFF;
    // rgb(41, 45, 62);
    color: #fff;
    border-radius: 2px;
    padding: 30px;
  }
  .form-wrapper .black{
    text-align: center;
    font-size: 45px;
    text-transform: uppercase;
	margin-bottom: 30px;
    // height: 300px;
  }
  .form-wrapper .black .s-icon {
    text-align: center;
    padding-top 60px;
  }

  .form-wrapper .input-wrapper input {
    // background-color: rgb(41, 45, 62);
    //background-image: linear-gradient(to right,#a6c1ee,#fbc2eb);
    border: 0;
    width: 100%;
    border-radius: 30px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    outline: none;
  }
  .form-wrapper .input-wrapper input::placeholder {
    text-transform: uppercase;
    color rgb(44,55,44);
  }

  .form-wrapper .input-wrapper .border-wrapper {
    background-image: linear-gradient(to right,#a6c1ee,#fbc2eb);
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-wrapper .input-wrapper .border-wrapper .border-item {
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    border-radius: 30px;
	color: #000000
  }
  .form-wrapper .code {
    display: flex;
    // justify-content: center;
    height: 50px;
    width: 100%;
  }
  .form-wrapper .code .code-input {
    // background-color: rgb(41, 45, 62);
    // background-image: linear-gradient(to right,#a6c1ee,#fbc2eb);
    border: 1px solid #0e92b3;

    text-align: center;
    width: 60%;
    line-height 50px;
    float: left;
    border-radius: 25px;
    font-size: 15px;
    outline: none;
	color:#000000;
  }
  .form-wrapper .code .btn-code {
    width: 34%;
    font-size 13px;
    color rgb(44,55,44);
    text-transform: uppercase;
    // border: 2px solid #0e92b3;
    background-image: linear-gradient(to right,#a6c1ee,#fbc2eb);
    text-align: center;
    float right;
    line-height: 50px;
    border-radius: 25px;
    cursor: pointer;
    transition: .2s;
  }
  .form-wrapper .action {
    display: flex;
    padding-top: 20px;
    justify-content: center;
  }
  .form-wrapper .action .btn {
    width: 60%;
    text-transform: uppercase;
    // border: 2px solid #0e92b3;
    background-image: linear-gradient(to right,#a6c1ee,#fbc2eb);
    text-align: center;
    color rgb(44,55,44);
    line-height: 50px;

    border-radius: 25px;
    cursor: pointer;
    transition: .2s;
  }

  .form-wrapper .action .btn:hover{
    background-color: #0e92b3;
  }

</style>
