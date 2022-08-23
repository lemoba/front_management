<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form :inline="true" :model="user">
        <el-form-item>
          <el-input v-model="user.id" placeholder="用户ID"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.username" placeholder="用户名"/>
        </el-form-item>
         <el-form-item>
          <el-select v-model="user.department">
            <el-option :value="0" label="所有">1</el-option>
            <el-option :value="1" label="所有">2</el-option>
            <el-option :value="2" label="所有">3</el-option>
            <el-option :value="3" label="所有">4</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button type="">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
         <el-button type="primary">新增</el-button>
          <el-button type="danger">批量删除</el-button>
      </div>
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="selection" width="50"/>
        <el-table-column 
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop" 
          :label="item.label" 
          :width="item.width" />
          <el-table-column label="操作">
          <template #default="scope">
            <el-button 
            size="small" 
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import { getCurrentInstance, onMounted, reactive , ref } from 'vue'

export default {
  name: 'user',
  setup() {
    const ctx = getCurrentInstance().appContext.config.globalProperties; // 获取全局挂载
    const http = ctx.$api;

    const user = reactive({});
    const userList = ref([]);
    const pager = reactive({
      pageNum: 1,
      pageSize: 10
    });
    const columns = reactive([
      {
        label: "用户ID",
        prop: "id",
      },
      {
        label: "账户",
        prop: "username",
      },
      {
        label: "用户名",
        prop: "nickname",
      },
      {
        label: "最后登录时间",
        prop: "last_login_time",
      },
      {
        label: "最后登录IP",
        prop: "last_login_ip",
      },
    ]);
    onMounted(() => {
      getUserList()
    })
    const getUserList = async () => {
      const res = await http.getUserList()
      userList.value = res.list
      pager.total = res.total
    }
    return { 
      user, 
      userList, 
      columns,
      pager,
      getUserList,
    }
  }
}
</script>

<style lang="scss">

</style>