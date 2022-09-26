<template>
    <div class="user-manager">
        <div class="query-form">
            <el-form :inline="true" :model="user">
                <el-form-item>
                    <el-input v-model="user.userId" placeholder="请输入用户ID"/>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="user.userName" placeholder="请输入用户名称"/>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="user.state">
                        <el-option label="所有" :value="0"></el-option>
                        <el-option label="在职" :value="1"></el-option>
                        <el-option label="离职" :value="2"></el-option>
                        <el-option label="试用期" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="base-table">
            <div class="action">
                <el-button type="primary">新增</el-button>
                <el-button type="danger">批量删除</el-button>
            </div>
            <el-table :data="userList">
                <el-table-column type="selection"/>
                <el-table-column 
                v-for="(item, index) in columns"
                :key="index"
                :prop="item.prop" 
                :label="item.label" 
             
                align="center"/>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                        >
                        <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
  
<script>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
export default {
    name: 'user',
    setup() {
        const ctx = getCurrentInstance().appContext.config.globalProperties
        const user = reactive({})
        const columns = reactive([
            {
                label: '用户ID',
                prop: 'userId'
            },
            {
                label: '用户名称',
                prop: 'userName'
            },
            {
                label: '用户邮箱',
                prop: 'userEmail'
            },
            {
                label: '用户角色',
                prop: 'role'
            },
            {
                label: '用户状态',
                prop: 'state'
            },
            {
                label: '注册时间',
                prop: 'createTime'
            },
            {
                label: '最后登录时间',
                prop: 'lastLoginTime'
            },
        ])
        const userList = reactive([])
        const pager = reactive({
            pageNum: 1,
            pageSize: 10
        })
        onMounted(() => {
            getUserList()
        })

        const getUserList = async() => {
            try {
                const { list, page} = await ctx.$api.getUserList()
                userList.value = list
                pager.total = page.total
            }catch (e) {
                    //
            }     
        }
        return {
            user,
            userList,
            columns,
            getUserList,
            pager
        }
    }
}
</script>

<style lang="scss">

</style>
  