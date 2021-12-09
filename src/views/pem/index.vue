<template>
  <div>
    <div style="padding: 20px;">
      <el-button
        type="primary"
        @click="showHttpsDialog">HTTPS安全证书管理</el-button>
      <dl class="code">
        <dd v-if="keyFile.title">
          <h3>{{keyFile.title}}</h3>
        </dd>
        <dd v-if="pemFile.title">
          <h3>{{pemFile.title}}</h3>
          <pre>{{pemFile.data}}</pre>
        </dd>
      </dl>
    </div>
    <https-dialog
      ref="httpsDialog"
      @callback="httpsDialogCallback">
    </https-dialog>
  </div>
</template>

<script>
import httpsDialog from '@/components/https-dialog/'

export default {
  components: {
    httpsDialog
  },
  data () {
    return {
      keyFile: {},
      pemFile: {}
    }
  },
  created () {},
  methods: {
    showHttpsDialog () {
      this.$refs.httpsDialog.visible = true
    },
    httpsDialogCallback (res) {
      const { keyFile, pemFile } = res
      this.keyFile = keyFile
      this.pemFile = pemFile
    }
  }
}
</script>

<style lang="less" scoped>
  .code {
    position: relative;
    padding: 20px 0 0;
    dd {
      margin: 0 0 50px;
      h3 {
        background: #666666;
        color: #ffffff;
        font-size: 16px;
        font-weight: normal;
        padding: 10px 15px;
      }
      pre {
        padding: 20px;
        background: #f9f9f9;
        font-size: 14px;
        line-height: 1.6;
      }
    }
  }
</style>
