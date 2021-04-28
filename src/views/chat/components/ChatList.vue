<template>
  <div class="body" >
     <ol>
        <li v-for="info in infos">
          <div class="item">
            <van-card
              class="card"
              desc="信息"
              title=info.title
              thumb="../../../assets/imgs/22.jpg"
            >
              <template #tags>
                <van-tag plain type="danger" size="large">杭州</van-tag>
                <van-tag plain type="danger" size="large">成都</van-tag>
              </template>
              <template #footer>
                <van-button size="normal" hairline=true color="#ace" round=true>简介</van-button>
                <van-button size="normal" hairline=true color="#f96" round=true>发消息</van-button>
              </template>
            </van-card>
           </div>
        </li>
      </ol>

  </div>
</template>

<script>
  export default {
    name:"Chatlist",
    data() {
      return {
        infos: [
          {title : "one"},
          {title : "two"},
          {title : "three"},
          {title : "four"},
          {title : "five"},
          {title : "six"},
          {title : "seven"},
          {title : "eight"},
        ]
      }
    },
  }
</script>

<style>
 .body{
 /*  position: absolute; */
   height: 100%;
   width: 100%;
   margin-top: 30%;
/*   z-index: 500; */
 }
.item{
  height: 140px;
  width: 100%;

}
.card{
  height: 100px;
  font-size: 14px;
  border-radius: 10px;
  margin-top: 5%;

}


</style>
