<template>
  <h1>主页面-{{ msg }}</h1>
  <router-link to="/login">去登陆</router-link>
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

<style scoped>
</style>
