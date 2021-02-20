<template>
  <div class="container">
    <div class="title">新建广告</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="广告封面" prop="image">
              <!-- <el-upload
                :action="actionUrl"
                list-type="avatar-uploader"
                :data="postData"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :auto-upload="true"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :file-list="fileList"
                :limit="1"
                :before-upload="beforeImgUpload">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog> -->
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
            <el-form-item label="广告链接" prop="url">
              <el-input size="medium" v-model="form.url" placeholder="请填写广告链接"></el-input>
            </el-form-item>
            <el-form-item label="广告排序" prop="order">
              <el-input size="medium" v-model="form.order" placeholder="请填写广告排序"></el-input>
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
import swipe from '@/model/swipe'
import qiniu from '@/model/qiniu'

export default {
  data() {
    return {
      actionUrl: 'https://upload-z2.qiniup.com',
      postData: {},
      imageUrl: '',
      form: {
        image: '',
        url: '',
        order: '',
      },
      types: [],
      loading: false,
      qiniuSite: 'http://une.sven-it.com/',
    }
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
    // 请求后台拿七牛云token
    async getQiniuToken() {
      const res = await qiniu.getToken()
      console.log('七牛云token')
      console.log(res.uptoken)
      this.postData = {
        token: res.uptoken,
      }
    },
    async submitForm(formName) {
      console.log('表单的值')
      console.log(this.form)
      try {
        this.loading = true
        const res = await swipe.createSwipe(this.form)
        this.loading = false
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.resetForm(formName)
        }
      } catch (error) {
        this.loading = false
        this.$message.error('广告添加失败，请检测填写信息')
        console.log(error)
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.imageUrl = ''
    },
  },
  async created() {
    await this.getQiniuToken()
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
