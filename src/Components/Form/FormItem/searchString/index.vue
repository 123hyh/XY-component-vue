<template>
  <div class="xy-search-string-box">
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
        :size="size"
        icon="el-icon-search"
      ></XyButton>
    </XyInput>
    <!-- 列表弹窗 -->
  </div>
</template>

<script>
import { Input, Button } from "element-ui";
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
  },

  computed: {
    // 输入框后面的icon
    icon() {
      return this.options.disabled ? "" : "el-icon-search";
    },
  },
  methods: {
    /**
     * 点击输入框尾部按钮
     */
    handlerClickSearch() {
      this.emit("handleSearchStringBtnClick", {
        target: this.modelBin,
        data: { ...this.formData },
        options: this.options,
      });
    },
  },
};
</script>

<style lang="scss">
$xy-primary: #409eff;
.xy-search-string-box {
  .el-input-group{
    vertical-align: middle;
  }
  .xy-search-string {
    .el-input-group__append {
      cursor: pointer;
    }
    .el-dialog__header {
      text-align: center;
      border-bottom: 1px solid #f0f0f0;
    }
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
