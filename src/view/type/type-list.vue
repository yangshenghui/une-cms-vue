<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header"><div class="title">视频分类列表</div></div>
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
    <type-modify v-else @editClose="editClose" :editTypeID="editTypeID"></type-modify>
  </div>
</template>

<script>
import type from '@/model/type'
import LinTable from '@/component/base/table/lin-table'
import TypeModify from './type-modify'

export default {
  components: {
    LinTable,
    TypeModify,
  },
  data() {
    return {
      tableColumn: [{ prop: 'name', label: '名称' }, { prop: 'order', label: '排序' }],
      tableData: [],
      operate: [],
      showEdit: false,
      editTypeID: 1,
      pagination: {
        pageSize: 10,
        pageTotal: null,
        currentPage: 1,
      },
      loading: false,
    }
  },
  async created() {
    this.loading = true
    await this.getTypes()
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除分类',
      },
    ]
    this.loading = false
  },
  methods: {
    async getTypes() {
      try {
        const types = await type.getTypes()
        this.pagination.pageTotal = types.count
        this.tableData = types.rows
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editTypeID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await type.deleteType(val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getTypes()
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
      this.getTypes()
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
