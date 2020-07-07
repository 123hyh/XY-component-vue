<!--
 * @Author: huangyuhui
 * @since: 2020-05-30 09:02:47
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-07 14:08:30
 * @message: 表单组件
 * @FilePath: \XY-component-vue\src\Components\Form\index.vue
-->

<template>
  <div>
    <!-- 表单 -->
    <Form
      class="xy-form"
      :inline="inline"
      :model="formData"
      :rules="rulesData"
      ref="formModel"
      :validate-on-rule-change="false"
    >
      <!-- 不分组 FormItem -->
      <template v-if="_FormLen === 1">
        <template v-for="(cvalue, key) of config">
          <FormItem
            v-if="cvalue.visible !== false"
            :formData="formData"
            :options="cvalue"
            :modelBin="key"
            @handleRule="handleRule"
            @checkingInput="checkingInput"
            :key="`xy_form_item_${key}`"
          />
        </template>
        <slot :name="`form-after-slot-1`"></slot>
      </template>
      <!-- 分组 FormItem -->
      <template v-else>
        <template v-for="(value, key) of groupFormConfig">
          <div
            :key="`xy_group_${key}`"
            :class="`xy-form-group xy-form-group-${key}`"
          >
            <!-- 分组标题 -->
            <h3 class="group-title" v-if='groupOptions[key]'>{{(groupOptions[key] && groupOptions[key].title) || ''}}</h3>
            <!-- 分组表单内容 -->
            <div class="xy-form-group-content">
              <div
                :key="`xy_form_group_item_${cindex}`"
                v-for="(cvalue, cindex) of value"
                :data-fields="cvalue.modelBin"
              >
                <FormItem
                  v-if="cvalue.visible !== false"
                  :formData="formData"
                  :options="cvalue"
                  :modelBin="cvalue.modelBin"
                  @handleRule="handleRule"
                  @checkingInput="checkingInput"
                />
              </div>
              <!-- 分组尾部插槽 -->
              <slot :name="`form-after-slot-${key}`"></slot>
            </div>
          </div>
        </template>
      </template>
    </Form>
    <!-- 表格选项弹窗 -->
    <ListModal
      :currentFormItem="currentListModalTarget"
      @handleCloseListModal="handlerCloseListModal"
    />
  </div>
</template>

<script>
import { Form } from "element-ui";
import FormItem from "@/Components/Form/FormItem/index.vue";
import { forObject } from "@/utils/index.ts";

import {
  cloneData,
  traversalObject,
  getType,
  isEmptyObject,
} from "@/utils/index";
export default {
  created() {
    // 点击尾部按钮
    this.$on("handleSearchStringBtnClick", function({ options } = {}) {
      this.currentListModalTarget = options;
      this.ListModalHandlerFn && this.ListModalHandlerFn();
    });
    // 保存弹窗的控制显示的回调
    this.$on("handleListModalVisible", (handlerFn) => {
      this.ListModalHandlerFn = handlerFn;
    });
  },

  props: {
    /* 输入框的尺寸 */
    size: {
      type: String,
      default: "small" /* medium / small / mini */,
    },
    // 表单分组选项
    groupOptions: {
      type: Object,
      default: () => ({}),
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
    _FormLen() {
      return Object.keys(this.groupFormConfig).length;
    },
    /**
     * 表单操作方法集合
     * @description:
     * @param {type}
     * @return:
     */
    formMethod() {
      return {
        getFormData: this.getFormData,
        validateAllField: this.validateAllField,
        clearValidate: this.clearValidate,
        resetFields: this.resetFields,
        validateField: this.validateField,
        setFields: this.setFields,
      };
    },
  },
  components: {
    Form,
    FormItem,
    ListModal: () => import("@/Components/Form/ListModal.vue"),
  },

  data() {
    return {
      formData: this.handlerReactData(),
      initalRules: {},
      // 列表弹窗显示回调
      ListModalHandlerFn: null,
      currentListModalTarget: {},
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
              lazyTreeSelect: [],
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
      this.$refs.formModel.resetFields();
      //  避免隐藏字段不清除
      {
        const formData = this.formData;
        forObject(formData, (key, value, sourceData) => {
          if (value !== undefined) {
            formData[key] = undefined;
          }
        });
      }
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
    /**
     * 列表弹窗关闭做清空动作
     */
    handlerCloseListModal() {
      this.currentListModalTarget = {};
    },
  },

  /* 以下数据穿透到子组件 */

  provide() {
    return {
      emit: this.emit,
      size: this.size,
      modalData: this.modalData,
    };
  },
  name: "XyForm",
};
</script>
<style lang="scss">
.xy-form {
  .xy-form-group {
    padding: 10px;
    &:not(:last-child) {
      border-bottom: 1px solid #a9a9a9;
    }
    .group-title {
      margin: 10px;
      text-indent: 10px;
      border-left: 5px transparent solid;
      border-image: linear-gradient(to bottom, #7597eb, #23b7cb) 1 10;
    }
    > .xy-form-group-content {
      display: flex;
      flex-wrap: wrap;
      > [data-fields] {
        flex-basis: 24%;
      }
      .el-form-item {
        height: 50px;
        display: flex;
        .el-form-item__label {
          min-width: 8em;
        }
        .el-form-item__content {
          flex-grow: 1;
        }
      }
      .el-form--inline,
      .el-form-item {
        margin: 0;
      }
      .el-checkbox-group {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        > .el-checkbox {
          margin-right: 0;
        }
      }
    }
  }
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
    top: initial;
  }
  .el-button {
    border-radius: 1px;
  }
}
</style>
