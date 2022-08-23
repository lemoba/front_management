<template>
  <div class="basic-layout">
    <div class="nav-side">
      <!-- logo -->
      <div class="logo">
        <img src="./../assets/logo.png">
        <span>FreeAdmin</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu
        default-active="2"
        class="nav-menu"
        router
        background-color="#001529"
        text-color="#FFF"
        :collapse="false"
        >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><setting /></el-icon>
            <span>系统管理</span>
          </template>  
            <el-menu-item index="1-1">用户管理</el-menu-item>
            <el-menu-item index="1-2">菜单管理</el-menu-item>  
        </el-sub-menu>
    
        <el-sub-menu index="2">
          <template #title>
            <el-icon><MagicStick /></el-icon>
            <span>审批管理</span>
          </template>  
            <el-menu-item index="2-1">休假申请</el-menu-item>
            <el-menu-item index="2-2">带我审批</el-menu-item>    
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="content-right">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-flod">
            <el-icon color="#409EFC" class="no-inherit"><Fold /></el-icon>
          </div>
          <div class="bread">面包屑</div>
        </div>
        <div class="user-info">
          <el-badge :is-dot="true" class="notice">
            <el-icon :size="20">
              <Bell />
            </el-icon>
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{userInfo.nickname}}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email"> {{userInfo.username}}</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>  
      </div>
    </div>
  </div>   
</template>

<script>
import storage from './../utils/storage'

 export default {
    data() {
      return {
        userInfo: {
          username: 'lemoba@qq.com',
          nickname: 'lemoba'
        }
      }
    },
    mounted() {
      this.$api.me().then((res) => {
        this.$store.commit('saveUserInfo', res)
      })
    },
    methods: {
      handleLogout(key) {
        if (key == 'email') return;
        this.$store.commit('saveUserInfo', '');
      }
    },
 }
</script>

<style lang="scss">
.basic-layout{
  position: relative;
  .nav-side{
    position:fixed;
    width:200px;
    height:100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width .5s;
    .logo {
      cursor: pointer;
      display: flex;
      align-items: center;
      font-szie: 18px;
      height: 50px;
      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }
    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }
  }
  .content-right{
    margin-left: 200px;
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        cursor: pointer;
        display: flex;
        align-items: center;
        align-content:center;
        .bread {
          margin-left: 10px;
        }
      }
      .user-info {
        cursor: pointer;
        .notice {
          line-height: 30px;
        }
      }
    }
    .wrapper {
      background-color: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        background: #ffffff;
        height: 100%
      } 
    } 
  }
} 
</style>