<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header"><div class="title">资料列表</div></div>
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
    <read-modify v-else @editClose="editClose" :editReadID="editReadID"></read-modify>
  </div>
</template>

<script>
import read from '@/model/read'
import LinTable from '@/component/base/table/lin-table'
import ReadModify from './read-modify'

export default {
  components: {
    LinTable,
    ReadModify,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'id', label: '序号' },
        { prop: 'name', label: '资料名称' },
        { prop: 'url', label: '资料链接' },
        { prop: 'vipName', label: '资料费用' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editReadID: 1,
      pagination: {
        pageSize: 10,
        pageTotal: null,
        currentPage: 1,
      },
    }
  },
  async created() {
      console.log(this.tableData)
    this.loading = true
    await this.getReads()
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除资料',
      },
    ]
    this.loading = false
  },
  methods: {
    async getReads() {
      try {
        const reads = await read.getReads()
        this.pagination.pageTotal = reads.count
        this.tableData = reads.rows
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      this.showEdit = true
      this.editReadID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await read.deleteRead(val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getReads()
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
      this.getReads()
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
