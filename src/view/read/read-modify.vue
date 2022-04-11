<template>
  <div class="container">
    <div class="title">
      <span>修改资料</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>
    <el-divider></el-divider>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" v-loading="loading" @submit.native.prevent>
            <el-form-item label="资料名称" prop="name">
              <el-input size="medium" v-model="form.name" placeholder="请填写资料名称"></el-input>
            </el-form-item>
            <el-form-item label="资料链接" prop="url">
              <el-input size="medium" v-model="form.url" placeholder="请填写资料链接"></el-input>
            </el-form-item>
            <el-form-item label="资料费用" prop="vip">
              <el-radio v-model="form.vip" label="1">免费</el-radio>
              <el-radio v-model="form.vip" label="2">会员专享</el-radio>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import read from '@/model/read'

export default {
  props: {
    editReadID: {
      type: Number,
    },
  },
  data() {
    return {
      form: {
        name: '',
        url: '',
        vip: ''
      },
      loading: false,
    }
  },
  async mounted() {
    this.loading = true
    this.form = await read.getRead(this.editReadID)
    this.loading = false
  },
  methods: {
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    back() {
      this.$emit('editClose')
    },
  },
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0;
}

.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;

    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
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
