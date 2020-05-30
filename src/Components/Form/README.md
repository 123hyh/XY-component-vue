[TOC]

- # Form表单组件;
	- ### props:
     	config ( 配置 ) { key: { value } }
		```javascript
      config: {
        name: {
          /* 表单类型 */
          type: "string",
          /* 多选选项配置 */
          checkboxOptions: [
            {
              /* 选项的主键 */
              id: 1,
              /* 多选项item的 label */
              label: "广东",
              /* 是否禁用当前选项 */
              disabled: true,
            }
          ],
          /* 数字保留小数位数 */
          decimal: 0,
          /* 表单 label */
          label: "姓名",
          /* 分组标识符 */
          group: 1,
          /* 当前组中的序号 */
          order: 2,
          /* 占位符 */
          placeholder: "姓名",
          /* 是否可清空 */
          clearable: true,
          /* 是否显示切换密码图标 */
          showPassword: true,
          /* 校验规则 */
          rules: [
            {
			  /* 校验错误信息 */
              message: "必填",
			  /* 触发校验的事件 */
              trigger: ["blur","change"],
			  /* 是否必输 */
              required: true,
			  /* 自定义校验方法 */
			  validator: (rule, value, callback) => {}
            },
          ],
        },
      },
```

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
```
