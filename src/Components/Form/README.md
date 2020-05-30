[TOC]

- # Form 表单组件;
      	- ### props:
  config(表单配置)
  _object{}_ - type 表单的类型：
  number | string | checkbox
  ```javascript
  config: {
  name: {
  /_ 表单类型 _/
  type: "string",
  /_ 多选选项配置 _/
  checkboxOptions: [
  {
  /* 选项的主键 */
  id: 1,
  /* 多选项 item 的 label */
  label: "广东",
  /* 是否禁用当前选项 */
  disabled: true,
  }
  ],
  /_ 数字保留小数位数 _/
  decimal: 0,
  /_ 表单 label _/
  label: "姓名",
  /_ 分组标识符 _/
  group: 1,
  /_ 当前组中的序号 _/
  order: 2,
  /_ 占位符 _/
  placeholder: "姓名",
  /_ 是否可清空 _/
  clearable: true,
  /_ 是否显示切换密码图标 _/
  showPassword: true,
  /_ 校验规则 _/
  rules: [
  {
  /_ 校验错误信息 _/
  message: "必填",
  /_ 触发校验的事件 _/
  trigger: ["blur","change"],
  /_ 是否必输 _/
  required: true,
  /_ 自定义校验方法 _/
  validator: (rule, value, callback) => {}
  },
  ],
  },
  },

````

# util(工具函数)

    editor.md/
            lib/
            css/
            scss/
            tests/
            fonts/
            images/
            plugins/
            examples/
            languages/
            editormd.js
            ...

```html
<!-- English -->
<script src="../dist/js/languages/en.js"></script>

<!-- 繁體中文 -->
<script src="../dist/js/languages/zh-tw.js"></script>
````
