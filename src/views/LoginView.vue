<template>
  <div class="box">
    <div class="login">
      <!-- 标题 -->
      <div class="title"></div>
      <!-- 注册组件 -->
      <div class="form">
        <el-form :model="form" label-width="auto" style="max-width: 600px" :rules="rules" ref="ruleFormRef"
          size="large">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)" class="log-bth">
              登录
            </el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script setup lang='ts' name="login">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router'
import {login} from '@/api/login'
import { useTokenStore } from '@/stores/TokenStore'
interface RuleForm {
  username: string
  password: string

}
const ruleFormRef = ref<FormInstance>()
const form = reactive<RuleForm>({
  username: '',
  password: '',
})
const rules = reactive<FormRules<RuleForm>>({
  // 用户名验证
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的大小写字母或数字', trigger: 'blur' }
  ],
  // 密码验证
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码必须是6-15位', trigger: 'blur' }
  ]
})
// 表单验证
const submitForm = async (formEl?: FormInstance): Promise<boolean> => {
  if (!formEl) return false
  try {
    await formEl.validate() // 校验通过则继续
    const res = await login(form)
    // 在这里真正提交数据
    if(res.data.code===0) {
      const TOkenStore = useTokenStore()
      TOkenStore.setToken(res.data.token)
      console.log(res.data.token);
      formEl.resetFields() // 提交成功后再重置（通常建议等后端返回成功再 reset）
      router.push('/')
    }
    return true
  } catch (err) {
    console.log('error submit!', err)
    return false
  }
}

</script>

<style lang="less" scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // 加载背景图
  background-image: url('../assets/images/login_bg.jpg');
  /* 背景图垂直、水平均居中 */
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  /* 设置背景颜色，背景图加载过程中会显示背景色 */
  background-color: #478fca;

  .login {
    width: 470px;
    height: 275px;
    background-color: #fff;
    border-radius: 3px;
    padding: 0 30px;
    box-sizing: border-box;

    .title {
      height: 60px;
      background: url('../assets/images/login_title.png') no-repeat center;
    }

    .log-bth {
      width: 100%;
    }
  }
}
</style>
