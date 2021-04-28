<template>
  <div class="all">
    <div class="show">
      <div class="coms1">
        <img  src="../../../assets/imgs/22.jpg" class="s-icon"/>
        <div class="info">{{name}}</div>
        <div class="info1">{{msg}}</div>
      </div>
      <div class="coms2">
        <div class="data1">
          <div class="title1">里程数</div>
          <div class="content1">0</div>
        </div>
        <div class="data2">
          <div class="title2">城市</div>
          <div class="content2">杭州</div>
        </div>
        <div class="data3">
          <div class="title3">等级</div>
          <div class="content3">1</div>
        </div>
      </div>
    </div>


    <div class="show2">
      <div class="tit">我的</div>
      <div class="showbutton">
        <div class="cont1">
          <div class="iconfont b-icon1">&#xe60f;</div>
        </div>
        <div class="cont2">
          <div class="iconfont b-icon2">&#xe624;</div>
        </div>
        <div class="cont3">
          <div class="iconfont b-icon3">&#xe610;</div>
        </div>
        <div class="cont4">
          <div class="iconfont b-icon4">&#xe66d;</div>
        </div>
      </div>
    </div>


    <div class="show3">
      <div class="tit1">精选服务</div>
      <div class="cont-3">
        <div class="item1">
          <img src="../../../assets/imgs/daka.jpg" class="img1"/>
          <div class="contt1">
            <div class="item1_title">网红打卡点</div>
            <div class="item1_data">为下次出行寻找灵感</div>
          </div>
          <button class="button1">查看</button>
        </div>
        <div class="item2">
          <img src="../../../assets/imgs/chuxing.jpg" class="img2"/>
          <div class="contt2">
            <div class="item2_title">趣味出行</div>
            <div class="item2_data">自驾游</div>
          </div>
          <button class="button2">查看</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:"ShowPerson",
    data() {
      return {
        imageUrl:require('../../../assets/imgs/icons.jpg'),
        name:"昵称",
        msg:"个人简介"
      }
    },
  }
</script>

<style>
  .all{
    width: 100%;
    height: 100%;
  }
  .show{
    position: absolute;
    width: 90%;
    height: 300px;
    margin-left: 5%;
    box-shadow: 0 0 10px rgba(114, 114, 114, 0.5);
   /* line-height: 40%; */
    /* background-image: linear-gradient(to right,#a6c1ee,#fbc2eb); */
    /* background-image: linear-gradient(45deg, #ec008c, #6739b6); */
    background:-webkit-linear-gradient(left,#ace,#f96);
    border-radius: 25px;
    z-index: 1;

  }
  .coms1{
    width: 100%;
    height: 30%;
  }
  .s-icon{
    position: absolute;
    width: 65px;
    height:65px;
    margin-top: 5%;
    margin-left: 5%;
    border-radius: 50px;
    /* background-image: linear-gradient(to right,#e8198b,#0eb4dd); */
    background-color: #FFFFFF;
    z-index: 3;
  }
  .info{
    position: absolute;
    width: 50%;
    height: 25px;
    margin-top: 7%;
    margin-left: 27%;
    font-size: 17px;
    vertical-align: middle;
    /* background-color: #FFFFFF; */
    z-index: 2;

  }
.info1{
    position: absolute;
    width: 50%;
    height: 25px;
    margin-top: 17%;
    margin-left: 27%;
    font-size: 17px;
    vertical-align: middle;
   /* background-color: #FFFFFF; */
    z-index: 2;

  }

  .coms2{
    width: 100%;
    height: 60%;
    margin-top: 5%;

  }
  .data1{
    width: 33.3%;
    height: 80%;
   /* background:-webkit-linear-gradient(left,#ace,#f96); */
    background-color: #ace;
    border-bottom-left-radius: 25px;
    border-top-left-radius: 25px;
    /* border-radius: 25px; */
    float:left;
  }
  .title1{
    width: 100%;
    height: 20%;
    text-align: center;
    margin-top: 20%;
    font-size: 18px;
  }
  .content1{
    width: 100%;
    height: 80%;
    font-size: 25px;
    color: #FFFFFF;
    text-align: center;
    margin-top: 20%;
  }
  .data2{
    width: 33.3%;
    height: 80%;
    background:-webkit-linear-gradient(left,#ace,#f96);
   /* border-radius: 25px; */

    float:left;
   /* margin: auto; */
  }
  .title2{
   width: 100%;
   height: 20%;
   text-align: center;
   margin-top: 20%;
   font-size: 18px;
  }
  .content2{
    width: 100%;
    height: 80%;
    font-size: 25px;
    color: #FFFFFF;
    text-align: center;
    margin-top: 20%;
  }
  .data3{
    width: 33.3%;
    height: 80%;
    /* background:-webkit-linear-gradient(left,#ace,#f96); */
    background-color: #f96;
    border-bottom-right-radius: 25px;
    border-top-right-radius: 25px;
   /* border-radius: 25px; */
    float:left;
  }
  .title3{
    width: 100%;
    height: 20%;
    text-align: center;
    margin-top: 20%;
    font-size: 18px;
  }
  .content3{
    width: 100%;
    height: 80%;
    font-size: 25px;
    color: #FFFFFF;
    text-align: center;
    margin-top: 20%;


   }

   .show2{
     position: absolute;
     width: 90%;
     height: 15%;


     margin-top: 90%;
     margin-left: 5%;
     z-index: 1;
   }
   .tit{
     width: 100%;
     height: 15%;
     font-size: 18px;
     margin-left: 5%;
   }
   .showbutton{
     width: 100%;
     height: 60%;
     margin-top: 3%;
     box-shadow: 0 0 10px rgba(114, 114, 114, 0.5);
     background:-webkit-linear-gradient(left,#ace,#f96);
     border-radius: 25px;

   }
   .cont1{
     width: 25%;
     height: 100%;
     position: relative;
     float: left;
   }
  .b-icon1{
    font-size: 40px;
    position: absolute;
    margin: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .cont2{
     width: 25%;
     height: 100%;
     position: relative;
     float: left;
   }
  .b-icon2{
    font-size: 40px;
    position: absolute;
    margin: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
 .cont3{
    width: 25%;
    height: 100%;
    position: relative;
    float: left;
  }
 .b-icon3{
   font-size: 40px;
   position: absolute;
   margin: auto;
   left: 50%;
   top: 50%;
   transform: translate(-50%,-50%);
 }
  .cont4{
     width: 25%;
     height: 100%;
     position: relative;
     float: left;
   }
  .b-icon4{
    font-size: 40px;
    position: absolute;
    margin: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  .show3{
    width: 90%;
    height: 28%;
    position: absolute;
    z-index: 1;
    margin-top: 120%;
    margin-left: 5%;

  }
  .tit1{
    width: 100%;
    height: 15%;
    font-size: 18px;
    margin-left: 5%;
    margin-top: 2%;

  }
  .cont-3{
    width: 100%;
    height: 85%;
    box-shadow: 0 0 5px rgba(114, 114, 114, 0.5);
    border-radius: 25px;
  }
  .item1{
    width: 100%;
    height: 47.5%;
   /* background-color: #0062CC; */
  }
  .item2{
    width: 100%;
    height: 47.5%;
    margin-top: 5%;
    /* background-color: #0062CC; */
  }
  .img1{
    width: 30%;
    height: 80%;
    margin-top: 5%;
    margin-left: 3%;
    border-radius: 10px;
    float: left;
  }
  .img2{
    width: 30%;
    height: 80%;
    margin-left: 3%;
    border-radius: 10px;
    float: left;
    /* margin-top: 50%; */
  }
  .contt1{
    width: 40%;
    height: 47.5%;
    float: left;
  }
  .item1_title{
    font-size: 18px;
    margin-top: 20%;
    margin-left: 6%;
  }
  .item1_data{
    font-size: 14px;
    color: rgba(114, 114, 114, 0.5);
    margin-top: 10%;
    margin-left: 6%;
  }
  .button1{
    float: left;
    background-color: #f96;
    width: 16%;
    height: 20%;
    margin-top: 12%;
    margin-left: 5%;
    font-size: 12px;
    border-radius: 25px;
  }
  .contt2{
    width: 40%;
    height: 47.5%;
    float: left;
  }
  .item2_title{
    font-size: 18px;
    margin-top: 10%;
    margin-left: 6%;
  }
  .item2_data{
    font-size: 14px;
    color: rgba(114, 114, 114, 0.5);
    margin-top: 10%;
    margin-left: 6%;
  }
  .button2{
    float: left;
    background-color: #f96;
    width: 16%;
    height: 20%;
    margin-top: 10%;
    margin-left: 5%;
    font-size: 12px;
    border-radius: 25px;
  }
</style>
