<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header"><div class="title">客户列表</div></div>
      <!-- 表格 -->
      <lin-table
        :tableColumn="tableColumn"
        :tableData="tableData"
        :pagination="pagination"
        :operate="operate"
        @row-click="rowClick"
        v-loading="loading"
      ></lin-table>
    </div>
  </div>
</template>

<script>
import customer from '@/model/customer'
import LinTable from '@/component/base/table/lin-table'

export default {
  components: {
    LinTable,
  },
  data() {
    return {
      loading: false,
      tableColumn: [
        { prop: 'openid', label: '微信标识' },
        { prop: 'nickname', label: '微信昵称' },
        { prop: 'name', label: '姓名' },
        { prop: 'phone', label: '手机号码' },
        { prop: 'email', label: '邮箱' },
        { prop: 'company', label: '公司' },
        { prop: 'position', label: '公司职位' },
        { prop: 'issendemail', label: '是否发送邮件' },
        { prop: 'ismember', label: '是否是会员' },
      ],
      tableData: [],
      pagination: {
        pageSize: 10,
        pageTotal: null,
        currentPage: 1,
      },
    }
  },
  async created() {
    this.loading = true
    await this.getCustomer()
    this.operate = []
    this.loading = false
  },
  methods: {
    async getCustomer() {
      try {
        const customers = await customer.getCustomer()
        this.pagination.pageTotal = customers.count
        this.tableData = customers.rows
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    rowClick() {},
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
