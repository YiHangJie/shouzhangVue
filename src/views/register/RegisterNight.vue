<template>
  <div class="form-wrapper">
    <div class='black'>
      <svg-icon icon-class='山脉星空'class='s-icon'></svg-icon>
    </div>
    <div class="input-wrapper">
      <div class="border-wrapper">
        <input type="text" name="username" placeholder="username" class="border-item">
      </div>
      <div class="border-wrapper">
        <input type="password" name="password" placeholder="password" class="border-item">
      </div>
      <div class="border-wrapper">
        <input type="password" name="password" placeholder="confirmPassword" class="border-item">
      </div>
    </div>
    <div class="code">
      <<input type="text" name="code" placeholder="" class="code-input">
      <div class="btn-code">request</div>
    </div>
    <div class="action">
      <div class="btn">register</div>
    </div>
  </div>
</template>

<script>
	import 'icons/svg/山脉星空.svg'    //引入是icons里面的svg
	import SvgIcon from 'components/IconSvg'
	export default {
	  name:'RegisterPageNight',
	  components:{
	  		  SvgIcon
	  }
	}
</script>

<style lang="stylus" scoped>
  .form-wrapper {
    width: 320px;
    height 812px;
    background-color:rgb(41, 45, 62);
    color: #fff;
    border-radius: 2px;
    padding: 30px;
  }
  .form-wrapper .black{
    text-align: center;
    font-size: 45px;
    text-transform: uppercase;
    height: 300px;
  }
  .form-wrapper .black .s-icon {
    text-align: center;
    padding-top 60px;
  }

  .form-wrapper .input-wrapper input {
    background-color: rgb(41, 45, 62);
    border: 0;
    width: 100%;

    text-align: center;
    font-size: 15px;
    color: #fff;
    outline: none;
  }
  .form-wrapper .input-wrapper input::placeholder {
    text-transform: uppercase;
  }

  .form-wrapper .input-wrapper .border-wrapper {
    background-image: linear-gradient(to right,#e8198b,#0eb4dd);
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
  }
  .form-wrapper .code {
    display: flex;
    // justify-content: center;
    height: 50px;
    width: 100%;
  }
  .form-wrapper .code .code-input {
     background-color: rgb(41, 45, 62);
    // background-image: linear-gradient(to right,#a6c1ee,#fbc2eb);
    border: 1px solid #0e92b3;
    text-align: center;
    width: 60%;
    line-height 50px;
    float: left;
    border-radius: 25px;
    font-size: 15px;
    outline: none;
  }
  .form-wrapper .code .btn-code {
    width: 34%;
    color #FFFFFF;
    font-size: 13px;
    text-transform: uppercase;
    border: 2px solid #0e92b3;
    //background-image: linear-gradient(to right,#a6c1ee,#fbc2eb);
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
    border: 2px solid #0e92b3;
    text-align: center;

    line-height: 50px;

    border-radius: 30px;
    cursor: pointer;
    transition: .2s;
  }

  .form-wrapper .action .btn:hover{
    background-color: #0e92b3;
  }

</style>
