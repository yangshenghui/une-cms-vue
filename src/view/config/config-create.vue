<template>
  <div class="container">
    <div class="title">新建配置</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="属性" prop="type">
              <el-input size="medium" v-model="form.type" placeholder="请填写配置属性"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input size="medium" v-model="form.name" placeholder="请填写配置名称"></el-input>
            </el-form-item>
            <el-form-item label="值" prop="value">
              <el-input size="medium" v-model="form.value" placeholder="请填写配置值"></el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')" :loading="loading">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import config from '@/model/config'

export default {
  data() {
    return {
      form: {
        type: '',
        name: '',
        value: '',
      },
    }
  },
  methods: {
    async submitForm(formName) {
      console.log('表单的值')
      console.log(this.form)
      try {
        this.loading = true
        const res = await config.createConfig(this.form)
        this.loading = false
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.resetForm(formName)
        }
      } catch (error) {
        this.loading = false
        this.$message.error('配置添加失败，请检测填写信息')
        console.log(error)
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }

  .wrap {
    padding: 20px;
  }

  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/ .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  /deep/ .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .submit {
    float: left;
  }
}
</style>
