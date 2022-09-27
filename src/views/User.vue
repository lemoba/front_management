<template>
    <div class="user-manager">
        <div class="query-form">
            <el-form ref="formRef" :inline="true" :model="user" >
                <el-form-item label="用户ID" prop="userId">
                    <el-input v-model="user.userId" placeholder="请输入用户ID"/>
                </el-form-item>
                <el-form-item label="用户名称" prop="userName">
                    <el-input v-model="user.userName" placeholder="请输入用户名称"/>
                </el-form-item>
                <el-form-item label="在职状态" prop="state">
                    <el-select v-model="user.state">
                        <el-option label="所有" :value="0"></el-option>
                        <el-option label="在职" :value="1"></el-option>
                        <el-option label="离职" :value="2"></el-option>
                        <el-option label="试用期" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleQuery">查询</el-button>
                    <el-button @click="handleReset">重置</el-button>
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
            <el-pagination class="pagination" background layout="prev, pager, next" :total="pager.total" />
        </div>
    </div>
</template>
  
<script>
import { getCurrentInstance, onMounted, reactive, ref, defineComponent} from 'vue';
export default defineComponent ({
    name: 'user',
    setup() {
        const ctx = getCurrentInstance().appContext.config.globalProperties.$api
        const formRef = ref(null);
        const user = reactive({
            state: 0
        })
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
        const userList = ref([])
        const pager = reactive({
            pageNum: 1,
            pageSize: 10
        })
        onMounted(() => {
            getUserList()
        })

        const getUserList = async() => {
            let params = { ...user, ...pager }
            try {
                const {page, list} = await ctx.getUserList(params)
                userList.value = list
                pager.total = page.total
            }catch (e) {
                    //
            }     
        }

        // 搜索
        const handleQuery = () => {
            getUserList()
        }

        // 重置
        const handleReset = () => {
            formRef.value.resetFields()
        }

        return {
            user,
            userList,
            columns,
            getUserList,
            pager,
            formRef,
            handleQuery,
            handleReset
        }
    }
})
</script>

<style lang="scss">

</style>
  