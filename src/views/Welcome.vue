<template>
  <div class="welcome">
     <div class="content">
      <div class="title">欢迎体验</div>
      <div class="sub-title">FreeAdmin通用管理后台系统</div>
      <div class="desc">- vue3 + ElementPlus2 + laravel8</div>  
     </div> 
     <div class="img"></div>
  </div>
</template>


<script>
// import { defineProps } from 'vue';

// defineProps({
//   msg: String
// })

export default {
  name: 'welcome',
  props: ['msg']
}

</script>

<style lang="scss">
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #FFF;
  .content {
      position: relative;
      bottom: 40px;
     .title {
      font-size: 30px;
      font-weight: 550;
      line-height: 42px;
      color: #333;
    }
    .sub-title {
      font-size: 40px;
      line-height: 62px;
      color: #409eff;
    }
    .desc {
      text-align: left;
      font-size: 14px;
      color: #999
    }
  }
  .img {
    margin-left:  105px;
    background-image: url('./../assets/images/welcome.png');
    width: 371px;
    height: 438px;
  }
}
</style>