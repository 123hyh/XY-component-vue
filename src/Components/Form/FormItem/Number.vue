<template>
  <Input
    :title="formData[modelBin]"
    :value="value"
    :placeholder="options.placeholder"
    :disabled="options.disabled"
    :size="size"
    :show-password="options.showPassword"
    :clearable="options.clearable"
    @focus="() => hanldeEmit('handleFocus')"
    @blur="() => hanldeEmit('handleBlur')"
    @clear="() => hanldeEmit('handleClear')"
    @change="() => hanldeEmit('handleChange')"
    @input="(...args) => hanldeEmit('handleChange', ...args)"
  />
</template>

<script>
import { Input } from 'element-ui';
import { debounce } from '@/utils/index';

export default {
  name: 'XyInputNumber',
  data() {
    return {
      isNumber: true,
      value: '',
    };
  },
  inject: {
    emit: {
      from: 'emit',
      default: () => {},
    },
    size: ['size'],
  },

  watch: {
    formData: {
      handler: debounce(300, function(val, old) {}),
      deep: true,
    },
  },

  created() {
    this.$emit('handleRule', {
      target: this.modelBin,
      rule: [
        {
          validator: (rule, value, callback) => {
            if (this.isNumber) {
              callback();
            } else {
              callback(Error('请输入数字'));
            }
          },
        },
      ],
    });
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
    hanldeEmit(emitName, ...args) {
      if (emitName === 'handleChange' && args.length) {
        this.handlerInput(...args);
      }
      if (emitName === 'handleBlur') {
        this.handleBlur();
      }
      this.emit(emitName, {
        target: this.modelBin,
        data: this.formData[this.modelBin],
      });
    },

    /**
     * 输入框输入事件
     */
    handlerInput(inputData) {
      const reg = /^d+\.$/;

      // 处理输入小数
      if (reg.test(inputData)) {
        inputData = inputData.replace(/\.$/, '.0');
      }

      // 设置标识符
      this.isNumber = isNaN(Number(inputData)) ? false : true;

      // 触发校验数字类型
      this.$emit('checkingInput', this.modelBin);
      this.value = inputData;
      this.setFormData(inputData);
    },

    /**
     * 设置 formdata的数据 为number 类型
     */
    setFormData: debounce(300, function(inputData) {
      const transformData = Number(inputData) || '';
      this.formData[this.modelBin] = transformData || 0;
    }),

    /**
     * 失去焦点时处理输入框的显示
     */
    handleBlur() {
      let value = this.value.replace(/\.$/, '.0');

      this.value = String(Number(value) || '');
    },
  },
};
</script>

<style></style>
