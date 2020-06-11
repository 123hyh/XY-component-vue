<template>
  <!-- 列表弹窗 -->
  <XyModal
    width="900px"
    customClass="xy-search-string-modal"
    :visible.sync="visible"
    :title="modalOptions.title"
  >
    <template v-slot:content>
      <div>
        <!-- 查询栏 -->
        <XySearchForm
          ref="XySearchForm"
          :config="modalOptions.searchConfig"
          @handleClickReset="handlerClickReset"
          @handleClickSearch="handlerModalClickSearch"
        />
        <!-- 表格 -->
        <XyTable
          v-if="resetTable"
          :list="modalData"
          customerClass="xy-search-string-table"
          @handleTableClickRow="handlerTableClickRow"
          @handlePagingChange="handlerPagingChange"
        >
          <template v-slot:right="{ currentData }">
            <i
              class="el-icon-success"
              v-if="currentData.key === currentRowData.key"
            />
          </template>
        </XyTable>
      </div>
    </template>
    <!-- 底部按钮 -->
    <template v-slot:footer>
      <div class="xy-search-string-dialog-footer">
        <XyButton type="primary" :size="size" @click.stop="handlerConfirm"
          >确定</XyButton
        >
        <XyButton :size="size" @click.stop="handlerClose">取消</XyButton>
      </div>
    </template>
  </XyModal>
</template>

<script>
import { Button, Message } from "element-ui";
import { isEmptyObject } from "@/utils";

export default {
  props: {
    currentFormItem: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    this.emit("handleListModalVisible", () => {
      this.visible = !this.visible;
    });
  },
  inject: {
    emit: {
      from: "emit",
      default: () => {},
    },
    size: ["size"],
    /* 列表数据 */
    modalData: ["modalData"],
  },
  computed: {
    /**
     * modal的表格配置
     */
    modalOptions() {
      const example = {
        title: "测试",
        tableConfig: [],
        searchConfig: {
          name: {
            type: "string",
            label: "查询1",
            group: 1,
            clearable: true,
          },
          password: {
            type: "string",
            label: "查询2",
            group: 1,
            clearable: true,
          },
          password1: {
            type: "string",
            label: "查询3",
            group: 1,
            clearable: true,
          },
        },
      };
      return this.currentFormItem.modalOptions ?? example;
    },
  },
  components: {
    XyButton: Button,
    XyModal: () => import("@/Components/Modal"),
    XyTable: () => import("@/Components/Table"),
    XySearchForm: () => import("@/Components/SearchForm"),
  },
  data() {
    return {
      visible: false,
      resetTable: true,
      currentRowData: {},
      searchFormData: {},
    };
  },
  methods: {
    /**
     * modal 查询栏点击 重置按钮
     */
    handlerClickReset() {
      this.searchFormData = {};
      this.emit("handleListModalClickReset", { pageIndex: 1, pageSize: 10 });
    },

    /**
     * modal 查询栏点击查询
     */
    handlerModalClickSearch(data = {}) {
      this.searchFormData = data;
      this.handlerEmitClickSearch({ data, pageIndex: 1, pageSize: 10 });
      this.handlerResetTable();
    },

    /**
     * 点击表格一行数据
     */
    handlerTableClickRow(currentRowData = {}) {
      this.currentRowData = { ...currentRowData };
    },

    /**
     * 点击分页事件
     */
    handlerPagingChange(pageData = { pageIndex: 1, pageSize: 10 }) {
      const data = this.$refs.XySearchForm.formModel.getFormData();
      this.handlerEmitClickSearch({ ...pageData, data });
    },

    /**
     * 点击确定按钮
     */
    handlerConfirm() {
      if (isEmptyObject(this.currentRowData)) {
        return Message({
          type: "warning",
          message: "请选择一条数据再继续操作",
        });
      }
      this.emit("handleModalConfirm", {
        data: { ...this.currentRowData },
        target: this.currentFormItem.modelBin,
      });
      this.currentRowData = {};
      this.visible = false;
    },

    /**
     * 关闭弹窗
     */
    handlerClose() {
      this.visible = false;
      this.currentRowData = {};
      this.$emit("handleCloseListModal");
    },

    /**
     * 重置table 分页bug
     */
    handlerResetTable() {
      this.resetTable = false;
      this.$nextTick(() => {
        this.resetTable = true;
      });
    },

    /**
     *
     */
    handlerEmitClickSearch(...args) {
      this.emit("handleListModalClickSearch", ...args);
    },
  },
};
</script>

<style></style>
