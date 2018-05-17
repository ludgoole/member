<template>
  <div class="vui-book-tree">
    <Row>
      <Col span="6">
        <div class="add-btn mb5">
          <Button type="text" icon="plus-round" @click="handleAdd">新章节</Button>
        </div>
        <vui-tree :updated="isEdit" :data="data" :index="index" @on-select="handleSelected"></vui-tree>
      </Col>
      <Col span="18">
        <div class="pl20" :class="{'vui-edit-box': disabled}">
          <Input v-model="title" class="mb5" placeholder="请输入小节名称，最多15个字" :maxlength="15" @on-change="handleChangeTitle"></Input>
          <quill-editor v-model="content" :options="editorOption" @change="handleEditorChange($event)"></quill-editor>
          <Upload
          ref="upload"
          name="file"
          :default-file-list="defaultFileList"
          action="http://192.168.7.42:8085/pdf/upload/file"
          :format="['doc', 'docx', 'pdf', 'jpg', 'png']"
          :max-size="2048"
          :on-success="handleUploadSuccess"
          :on-format-error="handleUploadFormatError"
          :before-upload="handleUploadBeforeUpload"
          :on-remove="handleRemoveFile"
          :on-exceeded-size="handleMaxSize"
          class="mt5">
            <Button type="ghost" icon="ios-cloud-upload-outline">添加附件</Button>
            <span class="ml5 t-grey" style="font-size:12px">支持扩展名：.doc .docx .pdf</span>
          </Upload>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import vuiTree from './tree'
import {CancelNode} from './treeMixins'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    vuiTree,
    quillEditor
  },
  data () {
    return {
      isEdit: false,
      disabled: true,
      index: 0,
      selNode: {
        pIndex: 0,
        sIndex: 0,
        edit: false,
        data: []
      },
      data: [{
        title: '章节1',
        edit: false,
        expand: false,
        checked: true,
        children: []
      }],
      title: '',
      content: '',
      editorOption: {
        placeholder: '请输入图书内容',
        modules: {
          toolbar: [
            [{'size': ['small', false, 'large']}],
            ['bold', 'italic'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['link', 'image']
          ]
        }
      },
      uploadList: [],
      defaultFileList: []
    }
  },
  methods: {
    // 添加根节点
    handleAdd () {
      CancelNode(this.data)
      this.isEdit = true
      this.data.push({
        title: `章节${this.data.length + 1}`,
        edit: true,
        checked: true,
        expand: false,
        children: []
      })
      this.disabled = true
      this.index = this.data.length - 1
    },
    // 选中节点
    handleSelected (node) {
      this.title = node.data.title
      this.content = node.data.content
      this.selNode = node
      if (node.edit) {
        this.disabled = false
      } else {
        this.disabled = true
      }
      this.uploadList = node.data.file
      this.defaultFileList = node.data.file
      this.data.forEach((item, index) => {
        if (item.checked) {
          this.index = index
        }
      })
    },
    // 绑定编辑器内容
    handleEditorChange ({editor, html, text}) {
      this.content = html
      if (this.selNode.edit) {
        this.data[this.selNode.pIndex].children[this.selNode.sIndex].content = this.content
      }
    },
    // 修改小节名
    handleChangeTitle () {
      if (this.selNode.edit) {
        this.data[this.selNode.pIndex].children[this.selNode.sIndex].title = this.title
      }
    },
    // 上传成功
    handleUploadSuccess (res, file) {
      if (this.selNode.edit) {
        this.data[this.selNode.pIndex].children[this.selNode.sIndex].file.push(res.data)
      }
    },
    // 格式错误
    handleUploadFormatError (file) {
      this.$Message.warning('文件类型不支持')
    },
    // 限制上传个数
    handleUploadBeforeUpload () {
      const check = this.uploadList.length < 1
      if (!check) {
        this.$Message.warning('最多上传1个文件')
      }
      return check
    },
    // 删除文件
    handleRemoveFile (file, fileList) {
      this.uploadList = []
      this.defaultFileList = []
      this.data[this.selNode.pIndex].children[this.selNode.sIndex].file = []
    },
      //文件大小
    handleMaxSize (file) {
        this.$Message.warning('请上传不超过2M的文件!')
      },
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        this.$emit('on-get-book', newVal)
      },
      deep: true
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  }
}
</script>
<style lang="scss">
.quill-editor:not(.bubble) .ql-container,
.quill-editor:not(.bubble) .ql-container .ql-editor {
  height: 200px;
  padding-bottom: 1rem;
}
.vui-book-tree{
  .add-btn{
    border-bottom: 1px solid #ddd;
    margin-bottom: 5px;
    font-size: 14px;
  }
  .item{
    overflow: hidden;
    &:hover{
      .oper-btn-wrap{
        .ivu-icon{
          transition: transform .3s;
          transform: translateY(0);
        }
      }
    }
    &.active,
    &:hover{
      background: #eee;
    }
  }
  &-title {
    cursor: pointer;
    p {
      line-height: 24px
    }
  }
  .oper-btn-wrap{
    .ivu-icon{
      transform: translateY(-200%);
    }
  }
  .vui-edit-box {
    position: relative;
    &:before{
      content: '';
      position: absolute;
      z-index: 99;
      top:0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(255,255,255,.6)
    }
  }
}
</style>
