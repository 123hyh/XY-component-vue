<!--
 * @Author: huangyuhui
 * @since: 2020-05-30 09:02:47
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-07 11:25:10
 * @message: 
 * @FilePath: \XY-component-vue\src\Components\Form\FormItem\String.vue
-->
<template>
  <Input
  :id='modelBin'
    :title="title"
    v-model="formData[modelBin]"
    :placeholder="options.placeholder"
    :disabled="options.disabled"
    :size="size"
    :show-password="options.showPassword"
    :clearable="options.clearable"
    @focus="() => hanldeEmit('handleFocus')"
    @blur="() => hanldeEmit('handleBlur')"
    @clear="() => hanldeEmit('handleClear')"
  />
</template>

<script>
import { Input } from "element-ui";
import { debounce } from "@/utils";
import { valueChangeEventMixins } from "@/Components/Form/FormItem/mixin.js";

export default {
  mixins: [valueChangeEventMixins],
  computed: {
    title() {
      return this.options.showPassword ? "" : this.formData[this.modelBin];
    },
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
  components: {
    Input,
  },
  get methods() {
    return {
      /**
       * 向上传递事件
       */
      hanldeEmit(emitName) {
        this.emit(emitName, {
          target: this.modelBin,
          data: this.formData[this.modelBin],
        });
      },
    };
  },
};
</script>

<style></style>
