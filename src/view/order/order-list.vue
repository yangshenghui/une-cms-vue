<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header"><div class="title">订单列表</div></div>
      <!-- 表格 -->
      <lin-table :tableColumn="tableColumn" :tableData="tableData" :operate="operate" v-loading="loading"></lin-table>
    </div>
  </div>
</template>

<script>
import order from '@/model/order'
import LinTable from '@/component/base/table/lin-table'

export default {
  components: {
    LinTable,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'out_trade_no', label: '订单号' },
        { prop: 'total', label: '订单金额' },
        { prop: 'currency', label: '货币类型' },
        { prop: 'openid', label: '用户标识' },
        { prop: 'payer_client_ip	', label: '用户终端IP' },
        { prop: 'status', label: '订单状态' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editOrderID: 1,
    }
  },
  async created() {
    this.loading = true
    await this.getOrders()
    this.operate = []
    this.loading = false
  },
  methods: {
    async getOrders() {
      try {
        const orders = await order.getOrders()
        this.tableData = orders
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    rowClick() {},
  },
  watch: {
    status() {
      this.status = 'Waiting for you to stop typing...'
    },
  },
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
