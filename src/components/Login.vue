<template>
  <h1>Login</h1>
  <Welcome msg="ranen"/>
  <el-button type="primary" @click="goHome()">回首页</el-button>
</template>

<script>

import Welcome from './Welcome.vue'

export default {
  name: 'login',
  components: {Welcome},
  methods: {
    goHome() {
      this.$router.push('/welcome')
    }
  }
}
</script>

<style scoped>
</style>
