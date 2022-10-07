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
                    <el-button @click="handleReset('formRef')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="base-table">
            <div class="action">
                <el-button type="primary" @click="handleCreate">新增</el-button>
                <el-button type="danger" @click="handleMulDelete">批量删除</el-button>
            </div>
            <el-table
	            :data="userList"
	            @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection"/>
                <el-table-column 
                v-for="item in columns"
                :key="item.prop"
                :prop="item.prop" 
                :label="item.label"
				:formatter = "item.formatter"
                align="center"/>
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
            title="用户新增" 
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
			    <el-form-item label="用户名" prop="userName">
				    <el-input v-model="userForm.userName" placeholder="请输入用户名" :disabled="action == 'edit'"/>
			    </el-form-item>
			    <el-form-item label="邮箱" prop="userEmail">
				    <el-input v-model="userForm.userEmail" placeholder="请输入邮箱" :disabled="action == 'edit'"/>
			    </el-form-item>
			    <el-form-item label="手机号" prop="mobile">
				    <el-input v-model="userForm.mobile" placeholder="请输入手机号"/>
			    </el-form-item>
			    <el-form-item label="岗位" prop="job">
				    <el-input v-model="userForm.job" placeholder="请输入岗位"/>
			    </el-form-item>
			    <el-form-item label="状态" prop="state">
				    <el-select v-model="userForm.state" placeholder="请选择用户状态">
					    <el-option label="所有" :value="0"></el-option>
					    <el-option label="在职" :value="1"></el-option>
					    <el-option label="离职" :value="2"></el-option>
					    <el-option label="试用期" :value="3"></el-option>
				    </el-select>
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
                            :key="role._id" 
                            :label="role.roleName"
                            :value='role._id'
                            >
                        </el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="部门" prop="depId">
				    <el-cascader
					    v-model="userForm.depId"
					    placeholder="请选择所属部门"
					    :options="deptList"
                        style="width:100%"
					    :props="{
							 checkStrictly: true,
							 value: '_id',
							 label: 'deptName'
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
export default defineComponent ({
    name: 'user',
    setup() {
        const ctx = getCurrentInstance().appContext.config.globalProperties
        const formRef = ref(null);
        const dialogFormRef = ref(null);

		const userForm = reactive({
            state: 0
		})

        const user = reactive({
            state: 0
        })

	    // 表格字段
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
                prop: 'role',
	            formatter(row, column, value) {
					return {
						0: '管理员',
						1: '普通用户'
					}[value]
	            }
            },
            {
                label: '用户状态',
                prop: 'state',
	            formatter(row, column, value) {
		            return {
			            1: '在职',
			            2: '离职',
			            3: '试用期'
		            }[value]
	            }
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

	    // 用户列表
        const userList = ref([])

        // 表单验证
        const rules = reactive({
            userName: [
                {
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }
            ],
            userEmail: [
                {
                    required: true,
                    message: '请输入邮箱',
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
			await ctx.$api.userDelete({
				userIds: [row.userId]
			})
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
                    params.userEmail += "@ranen.com"
                    params.action = 'add'
                    let res = await ctx.$api.userSubmit(params)
                    if (res) {
                        showModel.value = false;
                        ElMessage.success('添加成功')
                        handleReset('dialogFormRef')
                        getUserList()
                    }
                }else {
                    return false
                }
            })
        }
        // 用户编辑
        const handleEdit = async (row) => {
            action.value = 'edit'
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
  