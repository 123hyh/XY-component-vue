<template>
  <XyDialog
    :title="title"
    :width="width"
    :visible="visible"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :modal-append-to-body="false"
    @close="handlerClose"
    :custom-class='customClass'
  >
    <!-- 中间的内容 -->
    <slot name="content"></slot>
    <!-- 底部操作按钮 -->
    <div slot="footer">
      <slot name="footer"></slot>
    </div>
  </XyDialog>
</template>

<script>
import { Dialog } from "element-ui";
export default {
  components: {
    XyDialog: Dialog,
  },
  props: {
    width: {
      type: String,
      default: "40%",
    },
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    /* 自定义弹窗的类名 */
    customClass: {
      type: String,
      default: "",
    },
  },
  methods: {
    handlerClose() {
      this.$emit("update:visible", false);
      this.$emit("handleModalClose");
    },
  },
};
</script>

<style></style>
