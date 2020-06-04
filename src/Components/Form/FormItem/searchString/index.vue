<template>
  <div>
    <XyInput
      :title="formData[modelBin]"
      class="xy-search-string"
      :readonly="options.readonly"
      :size="size"
      v-model="formData[modelBin]"
    >
      <XyButton
        v-if="!options.disabled"
        @click.stop="() => handlerClickSearch(modelBin)"
        title="点击查看列表"
        slot="append"
        icon="el-icon-search"
      ></XyButton>
    </XyInput>
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
          <XyButton type="primary" size="small" @click.stop="handlerConfirm"
            >确定</XyButton
          >
          <XyButton size="small" @click.stop="handlerClose">取消</XyButton>
        </div>
      </template>
    </XyModal>
  </div>
</template>

<script>
import { Input, Button, Message } from "element-ui";
import { isEmptyObject } from "@/utils";
export default {

  inject: {
    emit: {
      from: "emit",
      default: () => {},
    },
    size: ["size"],
    /* 列表数据 */
    modalData: ["modalData"],
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
    modelBin: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },

  components: {
    XyInput: Input,
    XyButton: Button,
    XyModal: () => import("@/Components/Modal"),
    XyTable: () => import("@/Components/Table"),
    XySearchForm: () => import("@/Components/SearchForm"),
  },

  computed: {
    // 输入框后面的icon
    icon() {
      return this.options.disabled ? "" : "el-icon-search";
    },

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
      return this.options.modalOptions ?? example;
    },
  },
  data() {
    return {
      visible: false,
      currentRowData: {},
      resetTable: true,
      searchFormData: {},
    };
  },
  methods: {
    /**
     * 点击输入框尾部按钮
     */
    handlerClickSearch() {
      this.visible = true;
      this.handlerEmitClickSearch();
    },
    /**
     * 向上传递 search 事件
     */
    handlerEmitClickSearch(data = {}) {
      debugger
      this.emit("handleClickSearch", {
        target: this.modelBin,
        data: { ...this.searchFormData, ...data },
      });
    },

    /**
     * 关闭弹窗
     */
    handlerClose() {
      this.visible = false;
      this.currentRowData = {};
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
      this.emit("handleModalConfirm", { ...this.currentRowData });
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
      debugger
      this.handlerEmitClickSearch({ ...pageData });
    },
    /**
     * modal 查询栏点击 重置按钮
     */
    handlerClickReset() {
      this.searchFormData = {};
      this.handlerPagingChange();
      this.handlerResetTable();
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
     * modal 查询栏点击查询
     */
    handlerModalClickSearch(data = {}) {
      this.searchFormData = data;
      this.handlerEmitClickSearch();
      this.handlerResetTable();
    },
  },
};
</script>

<style lang="scss">
$xy-primary: #409eff;
.xy-search-string {
  .el-input-group__append {
    cursor: pointer;
  }
  .el-dialog__header {
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
  }
}
.xy-search-string-modal {
  .el-input__inner {
    border-color: #f0f0f0;
  }
  .xy-search-string-table {
    .el-icon-success {
      color: $xy-primary;
      font-size: 20px;
    }
    .el-table__body-wrapper {
      max-height: 500px;
      overflow: auto;
    }
  }
}
</style>
