<template>
  <div class="box">
    <div class="register">
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
            <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input v-model="form.repassword" type="password" placeholder="请再次输入密码" show-password />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)" class="reg-bth">
              注册
            </el-button>
            <el-link type="info" underline="never" @click="$router.push('/login')">去登录</el-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts' name="register">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router'
import { register } from '@/api/register'
import { ElMessage } from 'element-plus'
interface RuleForm {
  username: string
  password: string
  repassword: string
}
const ruleFormRef = ref<FormInstance>()
const form = reactive<RuleForm>({
  username: '',
  password: '',
  repassword: ''
})
const samePwdFn = (rule: unknown, value: string, callback: (error?: string | Error) => void) => {
  if (value !== form.password) {
    callback(new Error('两次输入的密码不一致！'))
  } else {
    callback()
  }
}
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
  ],
  // 再次密码验证
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: samePwdFn, trigger: 'change' }
  ]
})


// 表单验证
const submitForm = async (formEl?: FormInstance): Promise<boolean> => {
  if (!formEl) return false
  try {
    await formEl.validate() // 校验通过则继续
    const res = await register(form)
    // 在这里真正提交数据
    if (res.data.code === 0) {
      ElMessage({
        message: res.data.message || '注册成功',
        type: 'success',
        duration: 1000
      })
      formEl.resetFields() // 提交成功后再重置
      router.push('/login')
    } else {
      ElMessage.error(res.data.message || '注册失败')
    }
    return true
  } catch (err) {
    console.error('error submit!', err)
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

  .register {
    width: 470px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    padding: 0 30px;
    box-sizing: border-box;

    .title {
      height: 60px;
      background: url('../assets/images/login_title.png') no-repeat center;
    }

    .reg-bth {
      width: 100%;
    }
  }
}
</style>
