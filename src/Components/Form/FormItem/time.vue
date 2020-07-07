<!--
 * @Author: huangyuhui
 * @since: 2020-07-07 10:23:23
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-07 11:06:24
 * @message: 时间选择组件
 * @FilePath: \XY-component-vue\src\Components\Form\FormItem\time.vue
-->
<template>
  <TimePicker
    :id="modelBin"
    :value-format="valueFormat"
    :format="valueFormat"
    v-model="formData[modelBin]"
    :disabled="options.disabled"
    :readonly="options.readonly"
    :title="formData[modelBin]"
    :size="size"
    :selectableRange="['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']"
    :placeholder="options.placeholder"
    @clear="() => hanldeEmit('handleClear')"
  />
</template>
<script>
import { TimePicker } from "element-ui";
import { valueChangeEventMixins } from "@/Components/Form/FormItem/mixin.js";
export default {
  mixins: [valueChangeEventMixins],
  computed: {
    valueFormat() {
      return this.options.valueFormat || "HH:mm:ss";
    },
  },

  components: {
    TimePicker,
  },
  inject: {
    emit: {
      from: "emit",
      default: () => {},
    },
    size: ["size"],
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
  methods: {
    handleClear() {
      debugger;
    },
  },
};
</script>
<style lang="scss" scoped>
 .el-date-editor {
  width: 100% !important;
}
</style>
