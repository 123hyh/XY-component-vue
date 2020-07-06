/*
 * @Author: your name
 * @Date: 2020-07-06 21:07:08
 * @LastEditTime: 2020-07-06 21:12:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /XY-component-vue/test.js
 */

password = {
  type: 'searchString',
  label: '表格选项',
  /* 不可输入 */
  readonly: true,
  rules: [
    {
      message: '必填',
      trigger: 'change',
      required: true,
    },
  ],
  // 弹窗配置
  modalOptions: {
    // 标题
    title: '测试',
    // 表格配置
    tableConfig: [],
    // 查询栏表单配置
    searchConfig: {
      name: {
        type: 'string',
        label: '查询1',
        group: 1,
        clearable: true,
      },
    },
  },
  tableData: [],
  order: 0.1,
  group: 1,
};
