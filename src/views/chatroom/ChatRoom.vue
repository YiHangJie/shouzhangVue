<template>
  <div class="body">
    <div class="head">
      <van-nav-bar title="昵称" left-text="返回" left-arrow class="bar">
        <template #right>
          <van-icon name="search" size="20" />
        </template>
      </van-nav-bar>
    </div>
   <div class="record-wrapper">
       <!-- <div class="time">
         13:23
       </div> -->
       <div class="left">
         <div class="img-left">
           <img class="img1" :src="from1" />
         </div>
         <div class="message-left">你好</div>
       </div>

      <div class="right">
         <div class="img-right">
           <img class="img2" :src="from2" />
         </div>
         <div class="message-right">
           你好
         </div>
       </div>


     </div>


     <div class="input">
       <input class="input-content" type="text"/>
       <button class="button">发送</button>

       <!-- <div class="icons"> -->
          <van-icon name="phone-o" size="35" class="icon1"/>
          <van-icon name="photo-o" size="35" class="icon2"/>
          <van-icon name="balance-o" size="35" class="icon3"/>
          <van-icon name="video-o" size="35" class="icon4"/>
          <van-icon name="notes-o" size="35" class="icon5"/>
      <!-- </div> -->

     </div>
  </div>
</template>

<script>
 export default {
   name:"ChatRoom",
     data() {
       return {
         from1: require("../../assets/imgs/401402(1).jpg"),
         from2: require("../../assets/imgs/22.jpg"),
       };
     },
 }
</script>

<style>
.body{
  width: 100%;
  height: 100%;
}
.head{
  width: 100%;
  height: 20%;
}
.bar{
  height: 15%;
  font-size: 20px;
}

.record-wrapper {
  margin-top: 10px;
  margin-left: 5%;
  height: 100%;
  width: 90%;
}
.left{
  width: 100%;
  height: 60px;
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

}
.right{
  width: 100%;
  height: 60px;
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


}
.input{
  height: 100px;
  width: 100%;
  margin-top: 143%;
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
</style>
