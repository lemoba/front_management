<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item in breadList" :key="item.path"> {{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default{
    name: 'BreadCrumb',
    computed: {
        breadList() {
            return this.$router.matched
        }
    },
    mounted() {
        console.log("router=>", this.$route)
    }
}
</script>


