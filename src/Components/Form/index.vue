<template>
  <div>
    <Form
      class="xy-form"
      :inline="inline"
      :model="formData"
      :rules="rulesData"
      ref="formModel"
      :validate-on-rule-change="false"
    >
      <div
        v-for="(value, key) of groupFormConfig"
        :key="`xy_group_${key}`"
        :class="`xy-form-group xy-form-group-${key}`"
      >
        <FormItem
          v-for="(cvalue, cindex) of value"
          :formData="formData"
          :options="cvalue"
          :modelBin="cvalue.modelBin"
          @handleRule="handleRule"
          @checkingInput="checkingInput"
          :key="`xy_form_group_item_${cindex}`"
        />
        <slot :name="`form-after-slot-${key}`"></slot>
      </div>
      <!-- <button @click.prevent="validateAllField">校验</button>
      <button @click.prevent="() => resetFields()">清空</button> -->
    </Form>
  </div>
</template>

<script>
import { Form } from "element-ui";
import FormItem from "@/Components/Form/FormItem/index.vue";
import {
  cloneData,
  traversalObject,
  getType,
  isEmptyObject,
} from "@/utils/index";

export default {
  /* 以下数据穿透到子组件 */
  provide() {
    return {
      emit: this.emit,
      size: this.size,
      modalData: this.modalData,
    };
  },
  name: "XyForm",
  props: {
    /* 输入框的尺寸 */
    size: {
      type: String,
      default: "small" /* medium / small / mini */,
    },

    /* 表单输入框的配置 */
    config: {
      type: Object,
      default: () => {},
    },

    /* 是否为行内表单 */
    inline: {
      type: Boolean,
      default: false,
    },

    /* modal 表格数据 */
    modalData: {
      type: Array,
      default: () => [
        {
          key: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          key: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          key: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          key: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    },
  },
  computed: {
    /**
     * 处理分组数据
     */
    groupFormConfig() {
      return this.handlerGroupFormConfig();
    },

    /**
     * 表单校验规则
     */
    rules() {
      return this.handlerGeneratorRules();
    },
    rulesData() {
      return { ...this.rules, ...this.initalRules };
    },
  },
  components: {
    Form,
    FormItem,
  },

  data() {
    return {
      formData: this.handlerReactData(),
      initalRules: {},
    };
  },
  methods: {
    /**
     * 初始化响应数据
     */
    handlerReactData(initalData = {}) {
      const data = {};
      for (const key in this.config) {
        if (this.config.hasOwnProperty(key)) {
          const { type, checkboxOptions, multiple } = this.config[key];

          // 初始值类型
          const value = (() => {
            const obj = {
              checkbox: [],
              switch: false,
              select: multiple ? [] : "",
            };
            return obj[type] ?? "";
          })();

          this.$set(data, key, initalData[key] || value);
        }
      }
      return data;
    },

    /**
     * 向上emit
     */
    emit(methodName, data) {
      this.$emit(methodName, data);
    },

    /**
     * 重新生成分组数据
     */
    handlerGroupFormConfig() {
      const oldConf = this.config; // 深克隆方法暂时有bug
      const groupData = {};
      for (const key in oldConf) {
        if (oldConf.hasOwnProperty(key)) {
          const { group = 1, ...options } = oldConf[key];
          options.modelBin = key;
          if (groupData[group] === undefined) {
            groupData[group] = [];
          }
          groupData[group].push(options);
        }
      }
      // 排序
      for (const key in groupData) {
        if (groupData.hasOwnProperty(key)) {
          const value = groupData[key];
          value.sort(({ order: lOrder }, { order: rOrder }) => {
            if (lOrder > rOrder) {
              return 1;
            } else if (lOrder < rOrder) {
              return -1;
            } else {
              return 0;
            }
          });
        }
      }
      return groupData;
    },

    /**
     * 根据表单配置生成校验规则
     */
    handlerGeneratorRules() {
      const generateRules = {};
      traversalObject(this.config, (key, { rules }) => {
        if (rules) {
          generateRules[key] = rules;
        }
      });
      return generateRules;
    },

    /**
     * 收集下面组件传来的自定义rule
     * rule 必须数个数组
     */
    handleRule({ target, rule = [] } = {}) {
      if (target && rule.length) {
        const targetRule = this.initalRules[target];
        if (targetRule) {
          targetRule.push(...rule);
        } else if (target) {
          this.$set(this.initalRules, target, rule);
        }
      }
    },
    /**
     * 组件下触发的校验输入值
     */
    checkingInput(target) {
      if (target) {
        this.$refs.formModel.validateField(target);
      }
    },
    /**
     * 获取表单数据
     */
    getFormData() {
      return { ...this.formData };
    },

    /**
     * 校验所有表单
     */
    validateAllField() {
      return new Promise((resolve) => {
        this.$refs.formModel.validate((isPass = false) => {
          const result = { isPass };
          if (isPass) {
            result.data = this.getFormData();
          }
          resolve(result);
        });
      });
    },

    /**
     * 清空字段校验结果
     */
    clearValidate(props) {
      this.$refs.formModel.clearValidate(props);
    },

    /**
     * 清空字段及移除所有校验结果
     */
    resetFields() {
      return this.$refs.formModel.resetFields();
    },

    /**
     * 对部分表单字段校验
     */
    validateField(props) {
      this.$refs.formModel.validateField(props);
    },

    /**
     * 设置表单字段的值
     */
    setFields(data = {}) {
      if (getType(data) === "object") {
        traversalObject(data, (key, value) => {
          this.$set(this.formData, key, value);
          // 设置值是触发
          this.$emit("handleChange", { target: key, data: value });
        });
      } else {
        console.error("参数必须是一个对象 { key: value }");
      }
    },
  },
};
</script>
<style lang="scss">
.xy-form {
  input {
    border-radius: 2px;
    &:focus {
      border-color: #01b1f6;
    }
  }
  .el-select {
    width: 100%;
  }
  .el-form-item__error {
    padding-top: 0;
  }
  .el-button {
    border-radius: 1px;
  }
}
</style>
