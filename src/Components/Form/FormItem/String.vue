<template>
  <Input
    :title="formData[modelBin]"
    v-model="formData[modelBin]"
    :placeholder="options.placeholder"
    :disabled="options.disabled"
    :size="size"
    :show-password="options.showPassword"
    :clearable="options.clearable"
    @focus="() => hanldeEmit('handleFocus')"
    @blur="() => hanldeEmit('handleBlur')"
    @clear="() => hanldeEmit('handleClear')"
    @change="() => hanldeEmit('handleChange')"
    @input="() => hanldeEmit('handleChange')"
  />
</template>

<script>
import { Input } from 'element-ui';
export default {
  inject: {
    emit: {
      from: 'emit',
      default: () => {},
    },
    size: ['size'],
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
  methods: {
    /**
     * 向上传递事件
     */
    hanldeEmit(emitName) {
      this.emit(emitName, {
        target: this.modelBin,
        data: this.formData[this.modelBin],
      });
    },
  },
};
</script>

<style></style>
