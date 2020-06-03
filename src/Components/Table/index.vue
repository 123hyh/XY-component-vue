<template>
  <div :class="`xy-table ${customerClass}`">
    <XyTable
      highlight-current-row
      @row-click="handlerClickRow"
      :data="list"
      @sort-change="handlerClickSort"
    >
      <XyTableColumn type="expand">
        <template slot-scope="props">
          <XyForm label-position="left" inline class="demo-table-expand">
            <XyFormItem label="商品名称">
              <span>{{ props.row.name }}</span>
            </XyFormItem>
            <XyFormItem label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </XyFormItem>
            <XyFormItem label="商品 ID">
              <span>{{ props.row.id }}</span>
            </XyFormItem>
            <XyFormItem label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </XyFormItem>
            <XyFormItem label="商品分类">
              <span>{{ props.row.category }}</span>
            </XyFormItem>
            <XyFormItem label="店铺地址">
              <span>{{ props.row.address }}</span>
            </XyFormItem>
            <XyFormItem label="商品描述">
              <span>{{ props.row.desc }}</span>
            </XyFormItem>
          </XyForm>
        </template>
      </XyTableColumn>
      <XyTableColumn
        width="150"
        property="date"
        label="日期"
        sortable="custom"
      ></XyTableColumn>
      <XyTableColumn width="100" property="name" label="姓名"></XyTableColumn>
      <XyTableColumn
        width="300"
        property="address"
        label="地址"
      ></XyTableColumn>
      <!-- 右边的插槽 -->
      <XyTableColumn fixed="right" v-if="$scopedSlots.right">
        <template slot-scope="scope">
          <slot name="right" :currentData="scope.row" />
        </template>
      </XyTableColumn>
    </XyTable>
    <!-- 分页条 -->
    <div>
      <XyPagination @handlePagingChange="handlerPagingChange">
        <!-- 分页条后置slot -->
        <template v-slot:paginaAfter>
          <slot name="paginaAfter" />
        </template>
      </XyPagination>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn, Form, FormItem, Popover } from "element-ui";

export default {
  components: {
    XyForm: Form,
    XyFormItem: FormItem,
    XyTable: Table,
    XyTableColumn: TableColumn,
    XyPagination: () => import("@/Components/Pagination"),
    XyPopover: Popover,
  },
  props: {
    // 表格数据
    list: {
      type: Array,
      default: () => [],
    },
    // class
    customerClass: {
      type: String,
      default: "",
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false,
    },
    // 是否显示分页条
    paging: {
      type: Boolean,
      default: true,
    },
    /**
     * 表格配置
     */
    config: {
      name: {
        /* 列的类型 */
        type: "",
        /* label 字段 */
        label: "姓名",
        /* 排序 */
        order: 1,
        /* 是否固定 true | left | right	 */
        fixed: "",
        /* 可见的 默认为  false */
        visible: false,
      },
    },
  },
  methods: {
    /* 点击排序事件 */
    handlerClickSort() {
      console.log(arguments);
    },
    /* 点击一行数据 */
    handlerClickRow(currentData) {
      this.$emit("handleTableClickRow", currentData);
    },
    /**
     * 点击分页
     */
    handlerPagingChange(data) {
      this.$emit("handlePagingChange", data);
    },
  },
};
</script>

<style></style>
