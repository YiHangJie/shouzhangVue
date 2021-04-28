<template>
  <div class="header">
    <div class="border-wrapper">
      <div class="border-item">
        <span class="iconfont back-icon1">&#xe6a3;</span>
        <input type="text" name="username" placeholder="搜索" class="item" id="poiInput">
        <span class="iconfont back-icon2" >&#xe633;</span>
      </div>
    </div>
    <!-- <div is-link @click="showPopup" class="popupButton">
      <span class="iconfont back-icon3">&#xe621;</span>
    </div>
    <!-- <div is-link @click="showPopup">展示弹出层</div> -->
   <!-- <van-popup
      v-model="show"
      round
      position="right"
      get-container="body"
      :style="{ height: '40%', width: '60%'}"
     >
       <div class="content">
         定位信息
       </div>
     </van-popup> -->

  </div>
</template>
<!-- 注意<template>标签里最好只包裹一个外层标签 -->
<!-- <router-link>跳转页面 -->
<script>
export default {
   name:'HomeHeader',
    // data() {
    //    return {
    //      show: false,
    //    };
    //  },

    //  methods: {
    //    showPopup:function() {
    //      this.show = true;
    //    }
    //  }
}
</script>

<style lang="stylus" scoped>
  .header{
      position absolute
      width 100%
      height:100px;
     // text-align center
      //opacity 0
      z-index 500
      position fixed
      vertical-align middle
      margin-top 0%
    }
  
     // color rgb(44,55,44)
      //font-size 15px
  .border-wrapper {
     // position absolute
      z-index 600
      background:-webkit-linear-gradient(left,#ace,#f96);
      width: 320px;
      height: 46px;
      margin-top: 25px;
      margin-left auto;
      margin-right auto;
      // margin-left 10px
      // margin-right 10px
      border-radius: 25px;
      display: flex;
    //  padding 30px
      text-align center
      align-items: center;
      justify-content: center;
    }
    .border-item{
     // position absolute
      height: calc(100% - 4px);
      width: calc(100% - 4px);
      border-radius: 25px;
      background-color #FFFFFF
      text-align center
  
    }
    .item{
    //  position absolute
      margin-top 1px
      line-height 40px
      height 40px;
      vertical-align middle
      width 250px
  
    }
     .back-icon1{
       // height 30px
       // width 30px
      // position absolute
       text-align: center
       font-size 25px
       line-height 35px
       vertical-align middle
       margin-top 15px
       //overflow hidden
     } //  text-align center
      .back-icon2{
       // height 30px
       // width 30px
      // position absolute
       text-align center
       font-size 20px
       line-height 35px
       vertical-align middle
       margin-top 15px
       //overflow hidden
     } //  text-align center
     // .popupButton{
     //   margin-top 515px
     //   line-height 60px
     // }
     //  .back-icon3{
     //   text-align center
     //   font-size 50px
     //   line-height 55px
     //   vertical-align middle
     //  // margin-top 615px
     // } //  text-align center
</style>
