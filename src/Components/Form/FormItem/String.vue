<!--
 * @Author: huangyuhui
 * @since: 2020-05-30 09:02:47
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-02 09:00:02
 * @message: 
 * @文件相对于项目的路径: \XY-component-vue\src\Components\Form\FormItem\String.vue
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
    @input="() => handleInput('handleChange')"
  />
</template>

<script>
import { Input } from "element-ui";
import { debounce } from "@/utils";

export default {
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

      handleInput: debounce(200, function() {
        this.hanldeEmit("handleChange");
      }),
    };
  },
};
</script>

<style></style>
