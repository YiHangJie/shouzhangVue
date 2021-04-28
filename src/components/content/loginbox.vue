<template>
	<div align="center">
		
		<h2>旅行手账</h2>
		<el-row>
		  <el-col :span="24">
			  <el-card class="box-card" >
				  
				<h3>登录</h3>
				
				<el-row :gutter="2">
				  <el-col :span="4">
				  	账号
				  </el-col>
				  <el-col :span="20">
					<el-input v-model="uname" placeholder="请输入用户名" size="mini" prefix-icon="el-icon-discount"></el-input>
				  </el-col>
				</el-row>
				
				<el-row :gutter="2">
				  <el-col :span="4">
				  	密码
				  </el-col>
				  <el-col :span="20">
					   <el-input v-model="password" placeholder="请输入密码" show-password size="mini" prefix-icon="el-icon-lock"></el-input>
				  </el-col>
				</el-row>
				
				<!-- <div align="right">
					<el-button type="primary" size="small" @click="lgbtnclick()">登陆</el-button>
					<el-button type="primary" size="small" @click="rgbtnclick()">注册</el-button>
				</div> -->
				
				<el-row>
				  
				    <el-button type="primary" size="small" round @click="lgbtnclick()">登录</el-button>

				</el-row>
				
			  </el-card>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	import {request} from "../../network/request.js"

	export default {
	  name: "loginbox",
	  data(){
		  return {
			  uname : "",
			  password : "",
		  }
	  },
	  methods:{
		  lgbtnclick(){
			  let login_data = {"uname":this.uname , "pwd":this.password};
			  request({
			  		url:'/TravelApp3/account/DoLogin',
					method: "post",
					data : login_data,
					header:{
						"Content-Type" : 'text/plain'
					},
					params: {
						uname:this.uname,
						pwd:this.password
					}
			  	},
				res => {
					console.log(res);
				},
				err => {
					console.log(err);
				}
			  );
			  console.log(login_data);
			  console.log(JSON.stringify(login_data));
		  },
		  rgbtnclick(){
			  console.log("前往注册页面");
		  }
	  }
	}
</script>

<style>
	.el-input{
		align:middle;
	}
	.el-row {
	    margin-bottom: 20px;
	    &:last-child {
	      margin-bottom: 0;
	    }
	  }
	  .el-col {
	    border-radius: 4px;
		font-size: 18px;
	  }
	  .bg-purple-dark {
	    background: #99a9bf;
	  }
	  .bg-purple {
	    background: #d3dce6;
	  }
	  .bg-purple-light {
	    background: #e5e9f2;
	  }
	  .grid-content {
	    border-radius: 4px;
	    min-height: 36px;
	  }
	  .row-bg {
	    padding: 10px 0;
	    background-color: #f9fafc;
	  }
	  .text {
	      font-size: 14px;
	    }
	  
	    .item {
	      margin-bottom: 18px;
	    }
	  
	    .clearfix:before,
	    .clearfix:after {
	      display: table;
	      content: "";
	    }
	    .clearfix:after {
	      clear: both
	    }
	  
	    .box-card {
	      width: 330px;
		  margin-top: 30px;
	    }
		.el-header, .el-footer {
		    background-color: #B3C0D1;
		    color: #333;
		    text-align: center;
		    line-height: 60px;
		  }
		.el-button{
			width: 280px;
			padding-top: 100px;
		}
</style>
