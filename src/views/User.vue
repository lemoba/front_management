<template>
    <div class="user-manager">
        <div class="query-form">
            <el-form ref="formRef" :inline="true" :model="user" >
                <el-form-item label="用户名称" prop="nickname">
                    <el-input v-model="user.nickname" placeholder="请输入用户名称"/>
                </el-form-item>
                <el-form-item label="用户邮箱" prop="email">
                    <el-input v-model="user.email" placeholder="请输入用户邮箱"/>
                </el-form-item>
             
                <el-form-item label="所在部门" prop="department_id">
                    <el-select v-model="user.department_id">
                        <el-option label="所有" :value="0"></el-option>
                        <el-option label="在职" :value="1"></el-option>
                        <el-option label="离职" :value="2"></el-option>
                        <el-option label="试用期" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleQuery">查询</el-button>
                    <el-button @click="handleReset('formRef')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="base-table">
            <div class="action">
                <el-button type="primary" @click="handleCreate">新增</el-button>
                <!-- <el-button type="danger" @click="handleMulDelete">批量删除</el-button> -->
            </div>
            <el-table
	            :data="userList"
	            @selection-change="handleSelectionChange"
            >
            <!-- <el-table-column type="selection"/> -->
                <!-- <el-table-column/> -->
                <el-table-column 
                v-for="item in columns"
                :key="item.prop"
                :prop="item.prop" 
                :label="item.label"
				:formatter = "item.formatter"
                align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)"
                        >编辑</el-button
                        >
                        <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row)"
                        >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pagination" background layout="prev, pager, next" :total="pager.total" />
        </div>
	    <el-dialog 
            :title="dialogTitle" 
            v-model="showModel" 
            width="40%"
            :show-close="false"
            >
		    <el-form 
                ref="dialogFormRef"
                :model="userForm" 
                label-width="90px" 
                status-icon
                :rules="rules" >
			    <el-form-item label="用户名" prop="nickname">
				    <el-input v-model="userForm.nickname" placeholder="请输入用户名" :disabled="action == 'edit'"/>
			    </el-form-item>
			    <el-form-item label="邮箱" prop="username">
				    <el-input v-model="userForm.username" placeholder="请输入邮箱" :disabled="action == 'edit'"/>
			    </el-form-item>
                <el-form-item label="密码" prop="password">
				    <el-input v-model="userForm.password" placeholder="请输入密码" :disabled="action == 'edit'"/>
			    </el-form-item>
			    <el-form-item label="系统角色" prop="roleList">
				    <el-select 
                    v-model="userForm.roleList" 
                    placeholder="请选择用户角色"
                    multiple
                    style="width:100%"
                    >
					    <el-option 
                            v-for="role in roleList" 
                            :key="role.id" 
                            :label="role.name"
                            :value='role.id'
                            >
                        </el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="部门" prop="department_id">
				    <el-cascader
					    v-model="userForm.department_id"
					    placeholder="请选择所属部门"
					    :options="deptList"
                        style="width:100%"
					    :props="{
							 checkStrictly: true,
							 value: 'id',
							 label: 'name'
					    }"
					    clearable
				    />
			    </el-form-item>
		    </el-form>
		    <template #footer>
				<span class="dialog-footer">
                    <el-button @click="handleClose()">取消</el-button>
					<el-button type="primary" @click="handleSubmit">确认</el-button>
				</span>
		    </template>
	    </el-dialog>
    </div>
</template>
  
<script>
import { getCurrentInstance, onMounted, reactive, ref, defineComponent, toRaw, nextTick} from 'vue';
import { ElMessage } from 'element-plus'
import formatDate from '@/utils/time'

export default defineComponent ({
    name: 'user',
    setup() {
        const ctx = getCurrentInstance().appContext.config.globalProperties
        const formRef = ref(null);
        const dialogFormRef = ref(null);

        const dialogTitle = ref(null);

		const userForm = reactive({
           
		})

        const user = reactive({
        
        })

	    // 表格字段
        const columns = reactive([
            {
                label: '用户名称',
                prop: 'nickname'
            },
            {
                label: '用户邮箱',
                prop: 'username'
            },
            {
                label: '用户角色',
                prop: 'roles',
                formatter: (row, column, value) => {
                    var count = value.length
                    if (count === 0) {
                        return '/'
                    }
                    return count > 1 ? value[0]?.name + '等' + count + '个角色' : value[0]?.name
                }
            },
            {
                label: '所属部门',
                prop: 'department'
            },
            {
                label: '注册时间',
                prop: 'created_at',
                formatter: (row, column, value) => {
                    return formatDate(value)
                }
            },
            {
                label: '最后登录IP',
                prop: 'last_login_ip'
            },        
            {
                label: '最后登录时间',
                prop: 'last_login_time',
            },
        ])

	    // 用户列表
        const userList = ref([])

        // 表单验证
        const rules = reactive({
            username: [
                {
                    required: true,
                    message: '请输入邮箱',
                    trigger: 'blur'
                }
            ],
            nickname: [
                {
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }
            ],
            password: [
                {
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }
            ],
            roleList: [
                {
                    required: true,
                    message: '请选择用户角色',
                    trigger: 'blur'
                }
            ],
            depId: [
                {
                    required: true,
                    message: '请选择所在部门',
                    trigger: 'blur'
                }
            ]
        })

        const action = ref('add')

	    // 分页
        const pager = reactive({
            pageNum: 1,
            pageSize: 10
        })

	    // 模态框
	    const showModel = ref(false)

	    // 选择用户列表对象
	    const checkedUserIds = ref([])
        
        // 角色列表
        const roleList = ref([])

        // 部门列表
        const deptList = ref([])
 
        onMounted(() => {
            getUserList()
            getDeptList()
            getRoleList()
        })

        const getUserList = async() => {
            let params = { ...user, ...pager }
            try {
                const {page, list} = await ctx.$api.getUserList(params)
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
        const handleReset = (formType) => {
            if (formType == 'formRef') {
                formRef.value.resetFields()
            }else { 
                dialogFormRef.value.resetFields()
            }
        }

        // 用户删除
        const handleDelete = async (row) => {
			await ctx.$api.userDelete(row.id)
	        ElMessage.success('删除成功')
	        getUserList()
        }

		// 表格多选
		const handleSelectionChange = (list) => {
			let arr = [];
			list.map(item => {
				arr.push(item.userId)
			})
			checkedUserIds.value = arr;
		}

		// 批量删除
	    const handleMulDelete = async () => {
			if (checkedUserIds.value.length == 0) {
			    ElMessage.error('请选择要删除的用户')
				return
		    }
		    const res = await ctx.$api.userDelete({
			    userIds: checkedUserIds.value
		    })
		    if (res.nModified > 0) {
			    ElMessage.success('删除成功')
			    getUserList()
		    }else {
			    ElMessage.success('删除失败')
		    }
	    }

		// 用户新增
	    const handleCreate = () => {
            action.value = 'add'
            dialogTitle.value = '新增用户'
		    showModel.value = true
	    }

        const getDeptList = async () => {
            let list = await ctx.$api.getDeptList()
            deptList.value = list
        }

        // 角色列表
        const getRoleList = async () => {
            let list = await ctx.$api.getRoleList()
            roleList.value = list
        }
        
        // 用户弹出关闭
        const handleClose = () => {
            handleReset('dialogFormRef');
            showModel.value = false;
        }

        const handleSubmit = async () => {
            if (!dialogFormRef) return;
            dialogFormRef.value.validate(async (valid) => {
                if (valid) {
                    let params = toRaw(userForm);
                    params.department_id = params.department_id[params.department_id.length - 1]
                    params.action = 'add'
                    await ctx.$api.userSubmit(params)              
                    showModel.value = false;
                    ElMessage.success('添加成功')
                    handleReset('dialogFormRef')
                    getUserList()                 
                }else {
                    return false
                }
            })
        }
        // 用户编辑
        const handleEdit = async (row) => {
            action.value = 'edit'
            dialogTitle.value = '编辑用户'
            showModel.value = true
            await nextTick()
            Object.assign(userForm, row)
        }
        return {
            user,
	        userForm,
            rules,
            userList,
            roleList,
            deptList,
            columns,
            pager,
            formRef,
            action,
            dialogFormRef,
            dialogTitle,
	        showModel,
	        getUserList,
            getDeptList,
            getRoleList,
            handleQuery,
            handleReset,
            handleEdit,
	        handleDelete,
	        handleMulDelete,
	        handleSelectionChange,
	        handleCreate,
            handleClose,
            handleSubmit
        }
    }
})
</script>

<style lang="scss">

</style>
  