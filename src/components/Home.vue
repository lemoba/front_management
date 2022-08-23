<template>
  <div class="basic-layout">
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <!-- logo -->
      <div class="logo">
        <img src="./../assets/logo.png">
        <span v-show="!isCollapse">freeAdmin</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu
        :default-active="activeMenu"
        class="nav-menu"
        router
        background-color="#001529"
        text-color="#FFF"
        :collapse="isCollapse"
        >
          <TreeMenu :userMenu="userMenu" />
      </el-menu>
    </div>
    <div :class="['content-right', isCollapse ? 'fold': 'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-flod" @click="toggle">
            <el-icon color="#409EFC" class="no-inherit"><Fold/></el-icon>
          </div>
          <div class="bread">
            <BreadCrumb />
          </div>
        </div>
        <div class="user-info">
          <el-badge :is-dot="noticeCount > 0 ? true : false" class="notice">
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

import TreeMenu from './TreeMenu.vue'
import BreadCrumb from './BreadCrumb.vue';

export default {
  name: 'Home',
  components: { TreeMenu, BreadCrumb },
  data() {
    return {
      isCollapse: false,
      noticeCount: 0,
      userInfo: {
          username: "",
          nickname: ""
      },
      activeMenu: location.hash.slice(1),
      userMenu: []
    };
  },
  mounted() {
    this.getNoticeCount();
    this.getUserInfo();
  },
  methods: {
    toggle() {
        this.isCollapse = !this.isCollapse;
        console.log(this.userMenu);
    },
    handleLogout(key) {
        if (key == "email")
            return;
        this.$store.commit("saveUserInfo", "");
        this.userInfo = "";
        this.$store.commit("saveAccessToken", "");
        this.$router.push("/login");
    },
    getNoticeCount() {
        this.noticeCount = 12;
    },
    async getUserInfo() {
        const res = await this.$api.me();
        this.userInfo = {
            username: res.username,
            nickname: res.nickname
        };
        this.userMenu = res.menu;
    }
  }
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
    // 侧边栏展开
    &.fold {
      width: 64px;
    }

    // 侧边栏合并
    &.unfold {
      width: 200px;
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
          margin-right: 15px;
        }
        .user-link {
           height: 40px;
           line-height: 40px;
           color: #409eff;
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
    // 侧边栏展开
    &.fold {
     margin-left: 64px
    }

    // 侧边栏合并
    &.unfold {
      margin-left: 200px;
    } 
  }
} 
</style>