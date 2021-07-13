<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header"><div class="title">配置列表</div></div>
      <!-- 表格 -->
      <lin-table
        :tableColumn="tableColumn"
        :tableData="tableData"
        :operate="operate"
        :pagination="pagination"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @row-click="rowClick"
        v-loading="loading"
      ></lin-table>
    </div>

    <!-- 编辑页面 -->
    <config-modify v-else @editClose="editClose" :editConfigID="editConfigID"></config-modify>
  </div>
</template>

<script>
import config from '@/model/config'
import LinTable from '@/component/base/table/lin-table'
import ConfigModify from './config-modify'

export default {
  components: {
    LinTable,
    ConfigModify,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'id', label: '序号' },
        { prop: 'type', label: '配置属性' },
        { prop: 'value', label: '配置值' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editConfigID: 1,
      pagination: {
        pageSize: 10,
        pageTotal: null,
        currentPage: 1,
      },
    }
  },
  async created() {
    this.loading = true
    await this.getConfigs()
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除配置',
      },
    ]
    this.loading = false
  },
  methods: {
    async getConfigs() {
      try {
        const configs = await config.getConfigs()
        console.log(configs)
        this.pagination.pageTotal = configs.count
        this.tableData = configs.rows
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editConfigID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该配置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await config.deleteConfig(val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getConfigs()
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
        }
      })
    },
    rowClick() {},
    editClose() {
      this.showEdit = false
      this.getConfigs()
    },
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
