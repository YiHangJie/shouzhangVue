<!-- <template>
<div>
  <div id="map_z"></div>

  <div id="search1" class="search1"
  @touchstart.capture="touchStart"
  @touchend.capture="touchEnd"></div>

  <ul id="data1"> </div>


</div>
</template>

<script>
  export default{
    name:"Slide",
    mounted(){
      // 滑动开始

      touchStart(e){
      // 记录初始位置

      this.startY = e.touches[0].clientY;

      // console.log(this.startY);

      //禁止数据列表滚动

      // e.preventDefault();

      console.log(e)

      },



      // 滑动结束

      touchEnd(e) {
      // 当前滑动的父级元素

      // 记录结束位置

      this.endY = e.changedTouches[0].clientY;

      // console.log(e);

      var moveY = this.endY - this.startY;

      // 设置search1.marginTop顶部/中部/底部的值分别是0/48/90vh，高度为7vh

      var marginTop1 = 0;

      var marginTop2 = 48;

      var marginTop3 = 90;

      var search1Height = 7;

      search1Move(moveY, marginTop1, marginTop2, marginTop3, search1Height);

      },

      //滑动事件

      function search1Move(moveY, marginTop1, marginTop2, marginTop3, search1Height) {
      var map_z = document.getElementById("map_z").style;

      var search1 = document.getElementById("search1").style;

      var data1 = document.getElementById("data1").style;

      // var myLocation = document.getElementById("myLocation").style;

      // var myDistance = document.getElementById("myDistance").style;



      // 设置过渡效果

      map_z.transition = 'height 0.4s';

      search1.transition = 'margin-top 0.4s';

      data1.transition = 'margin-top 0.4s';

     // myLocation.transition = 'top 0.4s';

     // myDistance.transition = 'top 0.4s';



      //中部下滑

      if (moveY > 0 && (search1.marginTop == marginTop2 + 'vh')) {
      map_z.height = marginTop3 + 'vh';

      search1.marginTop = marginTop3 + 'vh';

      // data1.marginTop = '100vh';

      //不用data1.display = 'none'而用data1.marginTop = '100vh'会触发data1的滚动事件（列表项上移）

      data1.display = 'none';

      myLocation.top = marginTop3 - search1Height + 1 + 'vh';//字符串/数字?

      myDistance.top = marginTop3 - search1Height + 'vh';

      }

      //中部上滑

      else if (moveY < 0 && (search1.marginTop == marginTop2 + 'vh')) {
      map_z.height = marginTop1 + 'vh';

      // map_z.display = 'none';

      search1.marginTop = marginTop1 + 'vh';

      data1.display = 'block';

      data1.marginTop = search1Height + 'vh';

      myLocation.top = '-10vh';

      myDistance.top = '-10vh';

      }

      //顶部下滑

      else if (moveY > 0 && (search1.marginTop == marginTop1 + 'vh')) {
      // map_z.display = 'block';

      map_z.height = marginTop2 + 'vh';

      search1.marginTop = marginTop2 + 'vh';

      data1.marginTop = marginTop2 + search1Height + 'vh';

      myLocation.top = marginTop2 - search1Height + 1 + 'vh';

      myDistance.top = marginTop2 - search1Height + 'vh';

      }

      //底部上划

      else if (moveY < 0 && (search1.marginTop == marginTop3 + 'vh')) {
      map_z.height = marginTop2 + 'vh';

      search1.marginTop = marginTop2 + 'vh';

      data1.display = 'block';

      data1.marginTop = marginTop2 + search1Height + 'vh';

      myLocation.top = marginTop2 - search1Height + 1 + 'vh';

      myDistance.top = marginTop2 - search1Height + 'vh';

      } else {
      // console.log(search1.style.marginTop);

      }

      }

 touch-action: none;
    }
  }
</script>

<style>
  .slidebar{
    width: 100%;
    height: 20px;
    border: 2px #000000;

  }
</style>
 -->