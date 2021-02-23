<template>
  <div class="container">
    <div class="title">
      <span>修改视频</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>
    <el-divider></el-divider>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" v-loading="loading" @submit.native.prevent>
            <el-form-item label="视频名称" prop="title">
              <el-input size="medium" v-model="form.title" placeholder="请填写视频名称"></el-input>
            </el-form-item>
            <el-form-item label="视频作者" prop="author">
              <el-input size="medium" v-model="form.author" placeholder="请填写视频作者"></el-input>
            </el-form-item>
            <el-form-item label="视频封面" prop="image">
              <el-upload
                class="avatar-uploader"
                :action="actionUrl"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :data="postData"
                :on-error="uploadError"
                :before-upload="beforeImgUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="视频链接" prop="url">
              <el-input size="medium" v-model="form.url" placeholder="请填写视频链接"></el-input>
            </el-form-item>
            <el-form-item label="文档链接" prop="pdfurl">
              <el-input size="medium" v-model="form.pdfurl" placeholder="请填写文档链接"></el-input>
            </el-form-item>
            <el-form-item label="视频简介" prop="summary">
              <div class="lin-wrap">
                <tinymce
                  @change="tinymceChange"
                  :defaultContent="defaultContent"
                  upload_url="http://localhost:5000/cms/file/"
                />
              </div>
            </el-form-item>
            <el-form-item label="视频单价" prop="price">
              <el-input size="medium" v-model="form.price" placeholder="请填写视频单价"></el-input>
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
import vedio from '@/model/vedio'
import Tinymce from '@/component/base/tinymce'

export default {
  components: {
    Tinymce,
  },
  props: {
    editVedioID: {
      type: Number,
    },
  },
  data() {
    return {
      actionUrl: 'https://upload-z2.qiniup.com',
      postData: {},
      imageUrl: '',
      form: {
        title: '',
        author: '',
        summary: '',
        image: '',
        url: '',
        pdfurl: '',
        price: '',
      },
      loading: false,
      qiniuSite: 'http://une.sven-it.com/',
      defaultContent: '',
    }
  },
  async mounted() {
    this.loading = true
    this.form = await vedio.getVedio(this.editVedioID)
    this.imageUrl = this.form.image
    this.defaultContent = this.form.summary
    this.loading = false
  },
  methods: {
    beforeImgUpload(file) {
      const isPNG = file.type === 'image/png'
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isPNG && !isJPEG && !isJPG) {
        this.$message.error('上传封面图片只能是 jpg、png、jpeg 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过 2MB!')
        return false
      }
    },
    uploadSuccess(response, file, fileList) {
      console.log('上传成功')
      console.log(fileList)
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.image = this.qiniuSite + response.key
      this.$message.success('视频封面上传成功!')
      console.log(this.form)
    },
    uploadError(err, file, fileList) {
      console.log('上传失败')
      console.log(err)
      this.$message({
        message: '上传出错，请重试！',
        type: 'error',
        center: true,
      })
    },
    tinymceChange(val) {
      console.log(val)
      this.form.summary = val
    },
    async submitForm() {
      const res = await vedio.editVedio(this.editVedioID, this.form)
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message.success(`${res.message}`)
        this.$emit('editClose')
      }
    },
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
