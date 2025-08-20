<template>
  <el-container style="height: 100%">
    <!-- 头部 -->
    <el-header>
      <!-- logo -->
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
        background-color="#1f232a" text-color="#fff" router>
        <el-menu-item index="/">
          <img style="width: 100px" src="../assets/images/logo.png" alt="logo" />
        </el-menu-item>
        <el-sub-menu index="#">
          <template #title>
            <img :src="UserStore.userinfo.user_pic" alt="" v-if="UserStore.userinfo.user_pic" class="avatar">
            <img src="../assets/images/logo.png" alt="" v-else class="avatar">
            个人中心
          </template>
          <el-menu-item index="/user-info">基本资料</el-menu-item>
          <el-menu-item index="/user-avatar">更换头像</el-menu-item>
          <el-menu-item index="/user-pwd">重置密码</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="#" @click="quit">退出</el-menu-item>
      </el-menu>
    </el-header>
    <!-- 侧边栏 -->
    <el-container>
      <el-aside width="200px">
        <!-- 用户信息 -->
        <div class="user-box">
          <img :src="UserStore.userinfo.user_pic" alt="" v-if="UserStore.userinfo.user_pic">
          <img src="../../assets/images/logo.png" alt="" v-else>
          <span>欢迎<span>{{ UserStore.userinfo.username || UserStore.userinfo.nickname }}</span></span>
        </div>
        <!-- 侧边栏 -->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#1b1e25"
          text-color="#fff" active-text-color="#2b81d4" router>
          <template v-for="item in menus" :key="item.indexPath">
            <el-menu-item :index="item.indexPath" v-if="!item.children">
              <el-icon></el-icon>
              <span>{{ item.title }}</span>
            </el-menu-item>
            <el-sub-menu :index="item.indexPath" v-else>
              <template #title>
                <el-icon>
                </el-icon>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item v-for="obj in item.children" :index="obj.indexPath" :key="obj.indexPath">
                <el-icon></el-icon>
                <span>{{ obj.title }}</span>
              </el-menu-item>
            </el-sub-menu>
          </template>
        </el-menu>
        <!-- 侧边栏 -->
      </el-aside>
      <el-container>
        <!-- 主体 -->
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
        <!-- 底部 -->
        <el-footer><i class="el-icon-trophy"></i>www.3294578041@qq.com - lvdameng</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang='ts' name="layout">
import { getMenus } from '@/api/user';
import { onMounted, ref } from 'vue';
import { useUserStore, } from '@/stores/UserStore';
import router from '@/router';
import { ElMessageBox, ElMessage } from 'element-plus'
import { useTokenStore } from '@/stores/TokenStore';
const activeIndex = ref('0')
const UserStore = useUserStore()

const TokenStore = useTokenStore()
const menus = ref<MenuItem[]>([])
interface MenuItem {
  indexPath: string
  title: string
  icon: string
  children?: MenuItem[]
}
onMounted(async () => {
  try {
    // 获取用户信息
    await UserStore.getUserinfo()
    // 获取侧边栏信息
    const res = await getMenus()
    const { data: { data } } = res
    menus.value = data
  } catch (error) {
    console.log(error);
  }
})

function quit() {
  ElMessageBox.confirm(
    '你确定要退出吗?',
    '退出',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      TokenStore.clearToken()
      router.go(-1)
      ElMessage({
        type: 'success',
        message: '退出成功！',
      })

    })
    .catch(() => {

    })

}

</script>

<style lang="less" scoped>
.el-menu--horizontal>.el-menu-item:nth-child(1) {
  margin-right: auto;
}

.el-menu-item {
  padding: 0;
}

.el-header {
  align-items: center;
  color: #fff;
  background-color: #1f232a;
  height: 60px;
}


.el-menu-demo {
  background-color: #1f232a;
  color: #fff;
}

.el-menu-demo .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}


.el-footer {
  background-color: #ededed;
  color: #333;
  text-align: center;
  line-height: 60px;

  .el-icon-trophy {
    margin-right: 10px;
  }
}

.el-aside {
  background-color: #1f232a;
  color: #333;
}

.el-main {
  background-color: #f2f2f2;
  color: #333;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  user-select: none;
  box-sizing: border-box;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    object-fit: cover;
    margin-right: 10px;
  }

  span {
    margin-left: 5px;
    color: #fff;
    font-size: 12px;
  }
}
</style>
