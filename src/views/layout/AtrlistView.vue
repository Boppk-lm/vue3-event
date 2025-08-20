<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header ">
        <span>文章列表</span>
      </div>
    </template>
    <!-- 搜索 -->
    <el-form :model="listform" :inline="true" class="demo-form-inline" style="width: 100%">
      <el-form-item label="文章分类">
        <el-select v-model="listform.cate_id" placeholder="请选择分类" style="min-width: 180px">
          <el-option label="Zone one" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="listform.state" placeholder="请选择发布状态" style="min-width: 180px">
          <el-option label="已发布" value="0" />
          <el-option label="草稿" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="choseFn">筛选</el-button>
        <el-button type="info" @click="resetFn">重 置</el-button>
      </el-form-item>
      <el-form-item style="float: right;">
            <el-button type="primary" @click="showdialog" >发表文章</el-button>
      </el-form-item>
    </el-form>

    <!-- 文章分类 -->

    <!-- 发布状态 -->

    <!-- 操作 -->

    <!-- 列表 -->
    <el-table :data="article_list" style="width: 100%">
      <el-table-column label="文章标题" prop="title" />
      <el-table-column prop="cate_name" label="分类" />
      <el-table-column prop="pub_date" label="发表时间" />
      <el-table-column prop="state" label="状态" />
      <el-table-column label="操作">
        <!-- 作用域插槽 -->
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


    <!-- 分页 -->
    <el-pagination
    style="margin-top: 10px;"
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[5, 10, 20, 100]"
      size="small"
      layout="total, sizes, prev, pager, next, jumper"
      :total="10"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 富文本 -->

    <!-- 文章封面 -->

    <!-- 发布或暂存 -->

    <!-- 文章详情对话框 -->

    <!-- 分割线 -->

    <!-- 文章封面  -->

    <!-- 文章内容 -->

  </el-card>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';
// 文章列表
const article_list = reactive([])
const listform = reactive(
  {
    cate_id: null, // 文章分类
    state: null, // 文章标题
    pagenum: 1, // 当前页码数
    pagesize: 2// 当前页面需要的数据条数

  })
// 修改
function handleEdit(row:string) {
  console.log(row);
}
// 删除
function handleDelete(row:string) {
  console.log(row);
}
// 筛选
function choseFn() {

}
// 重置
function resetFn() {

}
// 发表
function showdialog () {

}

const currentPage4 = ref(1)
const pageSize4 = ref(5)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style></style>
