<template>
  <!-- 文章分类 -->
  <div>
    <el-card class="box-card" shadow="always">
      <template #header>
        <div class="card-header ">
          <span>文章分类</span>
          <el-button style="float: right" type="primary" @click="dialogFormVisible = true">添加分类</el-button>
        </div>
      </template>
      <!-- 文章列表 -->
      <el-table :data="artList" style="width: 100%">
        <el-table-column type="index" label="序号" width="350" />
        <el-table-column prop="cate_name" label="分类名称" />
        <el-table-column prop="cate_alias" label="分类别名" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">
              修改
            </el-button>
            <el-button type="danger" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>

        </el-table-column>
      </el-table>
      <!-- 添加文章 -->
      <el-dialog v-model="dialogFormVisible" title="文章分类" width="500" @close="cancelFn">
        <el-form :model="addForm" :rules="rules" ref="ruleFormRef">
          <el-form-item label="文章分类" prop="cate_name">
            <el-input v-model="addForm.cate_name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="分类别名" prop="cate_alias">
            <el-input v-model="addForm.cate_alias" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="cancelFn">取消</el-button>
            <el-button type="primary" @click="confirmFn(ruleFormRef)">
              确认
            </el-button>
          </div>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue'
import { addarticle, getarticle, updatearticle, deletearticle, type article } from '@/api/article'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
const dialogFormVisible = ref(false)
const isEdit = ref(false) // true为编辑 false为新增
// 获取文章分类
const artList = ref<article[]>([])
async function getArtList() {
  const res = await getarticle()
  artList.value = res.data.data
}
onMounted(async () => {
  try {
    getArtList()
  } catch (error) {
    console.log(error);
  }

})
const ruleFormRef = ref<FormInstance>()
const addForm = reactive<article>({
  id: 0,
  cate_name: '',
  cate_alias: ''
})
const rules = reactive<FormRules<article>>({
  // 分类名称验证
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '分类名称必须是1-10的非空字符串', trigger: 'blur' }
  ],
  // 分类别名验证
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
  ]
})
// 新增或修改文章分类
// 表单验证
const confirmFn = async (formEl?: FormInstance): Promise<boolean> => {

  if (!formEl) return false
  try {
    await formEl.validate() // 校验通过则继续
    dialogFormVisible.value = false
    // 新增
    if (isEdit.value === false) {
      const res = await addarticle(addForm)
      ElMessage({
        type: 'success',
        message: res.data.message,
      })
      formEl.resetFields() // 提交成功后再重置
    }
    // 修改
    else {
      const res = await updatearticle(addForm)
      ElMessage({
        type: 'success',
        message: res.data.message,
      })
    }
    getArtList()
    return true
  } catch (err) {
    console.error('error submit!', err)
    return false
  }
}
// 取消
function cancelFn() {
  dialogFormVisible.value = false
  addForm.cate_alias = ''
  addForm.cate_name = ''
}

// 点击修改
function handleEdit(row: article) {
  dialogFormVisible.value = true
  isEdit.value = true
  addForm.id = row.id
  addForm.cate_alias = row.cate_alias
  addForm.cate_name = row.cate_name
}
// 点击删除
function handleDelete(row: article) {
  try {
    ElMessageBox.confirm(
      '你确定要删除这条记录吗?',
      '文章分类',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(async () => {
        const res = await deletearticle(row.id as number)
        ElMessage({
          type: 'success',
          message: res.data.message,
        })
        getArtList()
      })
      .catch(() => {
      })

  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
}
</style>
