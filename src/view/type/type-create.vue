<template>
  <div class="container">
    <div class="title">视频分类</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="分类名称" prop="name">
              <el-input size="medium" v-model="form.name" placeholder="请填写分类名称"></el-input>
            </el-form-item>
            <el-form-item label="分类排序" prop="order">
              <el-input size="medium" v-model="form.order" placeholder="请填写分类排序"></el-input>
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
import type from '@/model/type'

export default {
  data() {
    return {
      form: {
        name: '',
        order: '',
      },
      loading: false,
    }
  },
  methods: {
    async submitForm(formName) {
      console.log(this.form)
      try {
        this.loading = true
        const res = await type.createType(this.form)
        this.loading = false
        console.log(res)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.resetForm(formName)
        }
      } catch (error) {
        this.loading = false
        this.$message.error('视频分类添加失败，请检测填写信息')
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

  .submit {
    float: left;
  }
}
</style>
