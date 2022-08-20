<template>
  <div class="welcome">
     <h1>主页面-{{ msg }}</h1>
     <router-link to="/login">去登陆</router-link>
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

}
</style>
