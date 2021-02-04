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
    <vedio-modify v-else @editClose="editClose" :editSwipeID="editSwipeID"></vedio-modify>
  </div>
</template>

<script>
import vedio from '@/model/vedio'
import LinTable from '@/component/base/table/lin-table'
import SwipeModify from './swipe-modify'

export default {
  components: {
    LinTable,
    SwipeModify,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'id', label: '序号' },
        { prop: 'image', label: '广告封面' },
        { prop: 'url', label: '广告链接' },
        { prop: 'order', label: '广告排序' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editSwipeID: 1,
      pagination: {
        pageSize: 10,
        pageTotal: null,
        currentPage: 1,
      },
    }
  },
  async created() {
    this.loading = true
    await this.getSwipes()
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除广告',
      },
    ]
    this.loading = false
  },
  methods: {
    async getSwipes() {
      try {
        const vedios = await vedio.getSwipes()
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
      this.editSwipeID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await vedio.deleteSwipe(val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getSwipes()
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
      this.getSwipes()
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
