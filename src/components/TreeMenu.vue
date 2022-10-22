<template>
    <template v-for="menu in userMenu">
        <el-sub-menu v-if="menu.children" index="1" :key="menu.id">
        <template #title>
        <el-icon>
            <component :is="menu.icon"></component>
        </el-icon>
        <span>{{ menu.title }}</span>    
        </template>  
         <el-menu-item v-for="sub_menu in menu.children" :index="sub_menu.path" :key="sub_menu.id">
            <el-icon>
                <component :is="sub_menu.icon"></component>
            </el-icon>
        {{ sub_menu.title }}
        </el-menu-item>
    </el-sub-menu>
    </template>
</template>

<script>
export default{
    name: 'TreeMenu',
    props: {
        userMenu: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>


