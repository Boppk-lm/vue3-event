<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>更换头像</span>
      </div>
    </template>

    <div class="avatar-container">
      <!-- 左边：头像上传区域 -->
      <el-upload ref="uploadRef" class="avatar-uploader" :show-file-list="false" :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>

      <!-- 右边：按钮 -->
      <div class="avatar-actions">
        <el-button type="primary" @click="triggerUpload">选择图片</el-button>
        <el-button class="ml-3" type="success" :disabled="imageUrl === ''" @click="submitUpload">
          上传图片
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadInstance } from 'element-plus'
import { updateAvatar } from '@/api/user'

// 头像预览
const imageUrl = ref('')
// 上传组件引用
const uploadRef = ref<UploadInstance>()
// 待上传文件
const selectedFile = ref<File | null>(null)

/**
 * 选择文件前校验，只做校验和预览，不自动上传
 */
const beforeAvatarUpload: UploadProps['beforeUpload'] = (file) => {
  if (file.type !== 'image/jpeg') {
    ElMessage.error('只能上传 JPG 格式!')
    return false
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过 2MB!')
    return false
  }

  // 保存文件用于手动上传
  selectedFile.value = file
  // 显示预览
  imageUrl.value = URL.createObjectURL(file)
  return false // 阻止自动上传
}

/**
 * 手动触发选择文件
 */
const triggerUpload = () => {
  uploadRef.value?.$el.querySelector('input')?.click()
}

/**
 * 将 File 转成 Base64
 */
const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (err) => reject(err)
  })

/**
 * 点击上传按钮，真正上传图片
 */
const submitUpload = async () => {

  try {
    if (selectedFile.value) {
      const base64Str = await toBase64(selectedFile.value)
      const res = await updateAvatar(base64Str)
      ElMessage.success(res.data.message)
      // 上传成功后清空缓存文件
      selectedFile.value = null
    }
  } catch (err) {
    console.error(err)
    ElMessage.error('上传失败')
  }
}
</script>

<style scoped>
.avatar-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  width: 178px;
  height: 178px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.avatar {
  width: 178px;
  height: 178px;
  object-fit: cover;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}

.avatar-actions {
  display: flex;
  gap: 10px;
}
</style>
