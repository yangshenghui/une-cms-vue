<template>
  <div class="container">
    <div class="title">
      <span>修改分类</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>
    <el-divider></el-divider>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" v-loading="loading" @submit.native.prevent>
            <el-form-item label="分类名称" prop="name">
              <el-input size="medium" v-model="form.name" placeholder="请填写分类名称"></el-input>
            </el-form-item>
            <el-form-item label="分类排序" prop="order">
              <el-input size="medium" v-model="form.order" placeholder="请填写分类排序"></el-input>
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
import type from '@/model/type'

export default {
  props: {
    editTypeID: {
      type: Number,
    },
  },
  data() {
    return {
      form: {
        name: '',
        order: '',
      },
      loading: false,
    }
  },
  async mounted() {
    this.loading = true
    this.form = await type.getType(this.editTypeID)
    this.loading = false
  },
  methods: {
    async submitForm() {
      const res = await type.editType(this.editTypeID, this.form)
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

  .submit {
    float: left;
  }
}
</style>
