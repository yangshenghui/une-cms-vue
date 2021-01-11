<template>
  <div class="container">
    <div class="title">新建视频</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="视频分类" prop="typeId">
              <el-select size="medium" v-model="form.typeId" placeholder="请选择">
                <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="视频名称" prop="title">
              <el-input size="medium" v-model="form.title" placeholder="请填写书名"></el-input>
            </el-form-item>
            <el-form-item label="视频作者" prop="author">
              <el-input size="medium" v-model="form.author" placeholder="请填写作者"></el-input>
            </el-form-item>
            <el-form-item label="视频封面" prop="image">
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
            <el-form-item label="视频链接" prop="url">
              <el-input size="medium" v-model="form.url" placeholder="请填写视频链接"></el-input>
            </el-form-item>
            <el-form-item label="视频简介" prop="summary">
              <div class="lin-wrap">
                <tinymce @change="tinymceChange" upload_url="http://localhost:5000/cms/file/" />
              </div>
            </el-form-item>
            <el-form-item label="视频单价(元)" prop="price">
              <el-input size="medium" v-model="form.price" placeholder="请填写视频单价"></el-input>
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
import vedio from '@/model/vedio'
import type from '@/model/type'
import qiniu from '@/model/qiniu'
import Tinymce from '@/component/base/tinymce'

export default {
  components: {
    Tinymce,
  },
  data() {
    return {
      actionUrl: 'https://upload-z2.qiniup.com',
      postData: {},
      imageUrl: '',
      form: {
        typeId: '',
        title: '',
        author: '',
        summary: '',
        image: '',
        url: '',
        price: '',
      },
      types: [],
      loading: false,
      qiniuSite: 'http://qmmb7uflf.hn-bkt.clouddn.com/',
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
    // 请求后台拿七牛云token
    async getQiniuToken() {
      const res = await qiniu.getToken()
      console.log(`qiniutoken:${ res.uptoken}`)
      this.postData = {
        token: res.uptoken,
      }
    },
    tinymceChange(val) {
      console.log(val)
      this.form.summary = val
    },
    async submitForm(formName) {
      console.log(this.form)
      try {
        this.loading = true
        const res = await vedio.createVedio(this.form)
        this.loading = false
        console.log(res)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.resetForm(formName)
        }
      } catch (error) {
        this.loading = false
        this.$message.error('视频添加失败，请检测填写信息')
        console.log(error)
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.imageUrl = ''
    },
    async getTypes() {
      const types = await type.getTypes()
      console.log(types)
      this.types = types
    },
  },
  async created() {
    await this.getQiniuToken()
    await this.getTypes()
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
