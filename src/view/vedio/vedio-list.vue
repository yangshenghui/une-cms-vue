<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header"><div class="title">视频列表</div></div>
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
    <vedio-modify v-else @editClose="editClose" :editVedioID="editVedioID"></vedio-modify>
  </div>
</template>

<script>
import vedio from '@/model/vedio'
import LinTable from '@/component/base/table/lin-table'
import VedioModify from './vedio-modify'

export default {
  components: {
    LinTable,
    VedioModify,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'typeName', label: '视频分类' },
        { prop: 'title', label: '视频名称' },
        { prop: 'author', label: '视频作者' },
        { prop: 'author', label: '视频封面' },
        { prop: 'url', label: '视频链接' },
        { prop: 'vipName', label: '视频费用' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editVedioID: 1,
      pagination: {
        pageSize: 10,
        pageTotal: null,
        currentPage: 1,
      },
    }
  },
  async created() {
    this.loading = true
    await this.getVedios()
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除视频',
      },
    ]
    this.loading = false
  },
  methods: {
    async getVedios() {
      try {
        const vedios = await vedio.getVedios()
        console.log(vedios)
        this.pagination.pageTotal = vedios.count
        this.tableData = vedios.rows
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editVedioID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该视频, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await vedio.deleteVedio(val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getVedios()
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
      this.getVedios()
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
