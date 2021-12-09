<template>
  <el-dialog
    title="HTTPS安全证书管理"
    width="600px"
    :visible.sync="visible"
    :append-to-body="true"
    :modal-append-to-body="true"
    :before-close="handleClose"
    v-el-drag-dialog>
    <div>
      <dl class="tips">
        <dd class="be">
          <span>实现HTTPS认证后，会让网站更安全，更专业，更受人信赖，并利于SEO收录与排名</span>
        </dd>
      </dl>
      <dl class="process">
        <dt> HTTPS认证参考流程：</dt>
        <dd>1）购买证书</dd>
        <dd>2）至域名管理平台，添加证书的TXT记录</dd>
        <dd>3）至证书购买平台，获取并解压证书文件</dd>
        <dd>4）将解压后的证书文件，分别上传到下方对应位置</dd>
        <dd>5）点击确定，程序解析文件并安装，出现“已支持https”提示后，表示安装成功</dd>
      </dl>
      <dl class="uploader">
        <dd>
          <span>key文件：</span>
          <el-button class="btn">
            <span v-if="keyFile.title">点击更新</span>
            <span v-else>点击上传</span>
            <input
              type="file"
              accept=".key"
              @change="uploadFile($event, 'key')" />
          </el-button>
          <label>{{keyFile.title}}</label>
        </dd>
        <dd>
          <span>pem/crt文件：</span>
          <el-button class="btn">
            <span v-if="pemFile.title">点击更新</span>
            <span v-else>点击上传</span>
            <input
              type="file"
              accept=".pem"
              @change="uploadFile($event, 'pem')" />
          </el-button>
          <label>{{pemFile.title}}</label>
        </dd>
      </dl>
    </div>
    <div slot="footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button
        type="primary"
        @click="handleConfirm"
        :loading="loading"
        :disabled="loading">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import elDragDialog from '@/directives/el-drag-dialog'
const parsePem = require('@/utils/parse')

export default {
  name: 'HttpsDialog',
  directives: {
    elDragDialog
  },
  props: {},
  data () {
    return {
      visible: false,
      loading: false,
      keyFile: {
        title: '',
        content: ''
      },
      pemFile: {
        title: '',
        content: '',
        data: ''
      }
    }
  },
  created () {
    // nothing
  },
  methods: {
    handleClose () {
      if (this.loading) return false
      this.visible = false
    },
    handleConfirm () {
      this.loading = true
      setTimeout(() => {
        this.visible = false
        this.loading = false
        this.$emit('callback', {
          keyFile: this.keyFile,
          pemFile: this.pemFile
        })
      }, 1000)
    },
    uploadFile (event, type) {
      let that = this
      let file = event.target.files[0]
      let { name } = file
      const reader = new FileReader()
      reader.onload = (function () {
        return function () {
          const result = this.result
          if (type === 'key') {
            // key
            that.keyFile.title = name
            that.keyFile.content = result
          } else if (type === 'pem') {
            // pem
            let pem = parsePem.parsePem(result)
            pem = parsePem.interpreter.certInterpreter(pem)
            that.pemFile.title = name
            that.pemFile.content = result
            that.pemFile.data = pem
          }
        }
      })(file)
      reader.readAsText(file)
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/ .el-dialog__body {
    padding-top: 30px !important;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
  }
  .tips {
    position: relative;
    margin: -10px 0 20px 0;
    text-align: center;
    .cms-icon {
      vertical-align: middle;
      font-size: 24px;
      margin: 0 5px 0 0;
    }
    .be {
      color: #F59A23;
    }
    .overdue {
      color: #D9001B;
    }
    .success {
      color: #02830F;
      em {
        font-style: normal;
        color: #D9001B;
      }
    }
  }
  .process {
    position: relative;
    background: #f9f9f9;
    margin: 0 30px;
    padding: 10px;
    dt, dd {
      font-size: 12px;
      line-height: 1.8;
    }
    dd {
      margin-left: .5em;
    }
  }
  .uploader {
    padding: 10px 0;
    dd {
      position: relative;
      padding: 0 0 0 160px;
      margin: 15px 0;
      & > span {
        position: absolute;
        left: 0;
        top: 0;
        line-height: 32px;
        width: 160px;
        text-align: right;
        padding: 0 10px 0 0;
        &::before {
          content: '*';
          color: #D9001B;
          margin: 0 5px 0 0;
        }
      }
      & > label {
        display: inline-block;
        vertical-align: middle;
        line-height: 20px;
        margin: 0 0 0 10px;
        color: #02A7F0;
        max-width: 280px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btn {
        position: relative;
        overflow: hidden;
        input {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          opacity: 0;
          cursor: pointer;
        }
      }
    }
  }
</style>
