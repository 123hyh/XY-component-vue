<template>
  <div class="xy-pagination">
    <XyPagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size.sync="currentPageSize"
      layout="prev, pager, next, sizes"
      :total="total"
    />
    <slot name="paginaAfter" />
  </div>
</template>

<script>
import { Pagination } from "element-ui";
export default {
  components: {
    XyPagination: Pagination
  },
  props: {
    /* 每页显示条数的集合 */
    pageSizes: {
      type: Array,
      default: () => [10, 30, 50, 100]
    },
    /* 条数 */
    total: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      currentPage: 1,
      currentPageSize: 10
    };
  },
  methods: {
    handleSizeChange() {
      // 重置为第一页
      this.currentPage = 1;
      this.emitEvent();
    },
    handleCurrentChange() {
      this.emitEvent();
    },
    emitEvent() {
      this.$emit("handlePagingChange", {
        pageIndex: this.currentPage,
        pageSize: this.currentPageSize
      });
    },
    // 重置分页
    resetPage() {
      this.currentPage = 1;
      this.currentPageSize = 10;
    }
  }
};
</script>

<style lang='scss'>
.xy-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
