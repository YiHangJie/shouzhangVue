import axios from "axios"

export function request(config , success, failure){
	// 1.创建一个实例
	const instance = axios.create({
		// baseURL:"/api",
		baseURL:"https://47.103.66.24:8443",
		timeout : 5000,
		withCredentials : true
	})
	
	// 2.发送真正的网络请求
	instance(config)
		.then(res=>{
			// console.log(res);
			success(res);
		})
		.catch(err => {
			// console.log(err);
			failure(err);
		})
}

export function getUserInfo(success, failure){
	// 1.创建一个实例
	const instance = axios.create({
		// baseURL:"/api",
		baseURL:"https://47.103.66.24:8443",
		timeout : 5000,
		withCredentials : true
	})
	const config = {
		url:'/TravelApp3/UserInfo',
		method: "post",
		header:{
			"Content-Type" : 'text/plain'
		}
	}
	// 2.发送真正的网络请求
	instance(config)
		.then(res=>{
			// console.log(res);
			success(res);
		})
		.catch(err => {
			// console.log(err);
			failure(err);
		})
}

export function sendRawMap(config, success, failure){
	// 1.创建一个实例
	const instance = axios.create({
		// baseURL:"/api",
		baseURL:"https://121.196.150.158:8080",
		timeout : 5000,
		withCredentials : true
	})
	// 2.发送真正的网络请求
	instance(config)
		.then(res=>{
			console.log(res);
			success(res);
		})
		.catch(err => {
			console.log(err);
			failure(err);
		})
}