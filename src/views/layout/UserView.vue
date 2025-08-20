<template>
  <div>
    <div ref="editor" style="height: 300px;"></div>
    <!-- 预览内容 -->
    <!-- <h3>编辑器输出：</h3> -->
    <!-- <div v-html="content"></div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css' // 样式


const editor = ref<HTMLDivElement | null>(null)
// const content = ref('') 富文本内容

let quill: Quill

onMounted(() => {
  quill = new Quill(editor.value as HTMLDivElement, {
    theme: 'snow', // 主题风格
    placeholder: '写点什么吧...',
    readOnly: false, // 是否只读模式
    modules: {
      // 工具栏配置
      toolbar: [
        ['bold', 'italic', 'underline'], // 加粗 斜体 下划线
        [{ 'header': [1, 2, 3, false] }], // 标题
        [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 列表
        ['link', 'image'], // 链接 图片
        ['clean'] // 清除格式
      ]
    }
  }
  )

  // 监听编辑器内容变化
  quill.on('text-change', () => {
    // content.value = quill.root.innerHTML
  })
})
</script>
