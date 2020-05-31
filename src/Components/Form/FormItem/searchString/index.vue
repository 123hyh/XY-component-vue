<template>
  <div>
    <XyPopover
      v-model="showPopover"
      ref="popover"
      title="表格"
      :disabled="options.disabled"
      popper-class="xy-search-popover"
      placement='bottom-start'
      trigger="click"
      @show="handlerShowPopover"
      @hide="handlerHidePopover"



    >
      <XyTable v-if="visible" @handleTableClickRow="handleTableClickRow">
        <!-- 点击一行显示选中icon -->
        <template v-slot:right="{currentData}">
          <i
            class="el-icon-success el-primary-color"
            style="font-size: 20px"
            v-if="currentData.key === currentRowData.key"
          ></i>
        </template>
        <!-- 分页后置slot -->
        <template v-slot:paginaAfter>
          <div>
            <XyButton :size="size" type="primary" @click.stop="handlerConfirm">确定</XyButton>
            <XyButton :size="size" @click.stop="handlerCancel">取消</XyButton>
          </div>
        </template>
      </XyTable>
    </XyPopover>
    <XyInput
      :readonly="options.readonly"
      v-popover:popover
      :disabled="options.disabled"
      :size="size"
      slot="reference"
      :suffix-icon="icon"
      v-model="formData[modelBin]"
    ></XyInput>
  </div>
</template>

<script>
import { Input, Popover, Button, Message } from "element-ui";
import { isEmptyObject } from "@/utils";

export default {
  inject: {
    emit: {
      from: "emit",
      default: () => {}
    },
    size: ["size"]
  },
  props: {
    formData: {
      type: Object,
      required: true
    },
    modelBin: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },

  components: {
    XyPopover: Popover,
    XyInput: Input,
    XyButton: Button,
    XyTable: () => import("@/Components/Table")
  },

  computed: {
    // 输入框后面的icon
    icon() {
      return this.options.disabled ? "" : "el-icon-search";
    }
  },
  data() {
    return {
      showPopover: false,
      visible: false,
      currentRowData: {}
    };
  },
  methods: {
    handleTableClickRow(currentData) {
      this.currentRowData = { ...currentData };
    },
    handlerShowPopover() {
      this.visible = true;
    },
    handlerHidePopover() {
      setTimeout(() => {
        this.visible = false;
        this.currentRowData = {};
      }, 300);
    },
    /* 点击确定按钮 */
    handlerConfirm() {
      if (isEmptyObject(this.currentRowData)) {
        return Message({
          type: "warning",
          message: "请选中一条数据再点击确定！"
        });
      }
      this.emit("handlePopoverConfirm", { ...this.currentRowData });
      this.showPopover = false;
    },
    /* 点击取消按钮 */
    handlerCancel() {
      this.showPopover = false
      this.handlerHidePopover()
    }
  }
};
</script>

<style lang="scss">
.xy-search-popover {
  .xy-table {
    .el-table {
      max-height: calc(100vh - 150px);
      overflow: auto;
      .el-primary-color {
        color: #409eff;
      }
      .current-row {
        background: initial;
        color: #409eff;
        > td {
          background-color: initial;
        }
      }
    }
    .xy-pagination {
      padding-top: 10px;
      .el-pagination {
        width: max-content;
      }
    }
  }
}
</style>
