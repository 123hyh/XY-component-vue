- # Form表单组件

***

  *  ## props:
     * ### config ( 配置 ) { key: { value } }
      ```javascript
      config = {
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

  > ## events:
    - **handleFocus**： 获取焦点时事件
    - **handleBlur**：失去焦点时事件
    - **handleClear**：点击输入框尾部清除事件
    - **handleChange**： 输入框值发生变化时触发的事件
    - **handleClickChekbox** 多选框点击时触发的事件

	  ```javascript
	   /**
	   * @param {string} target 触发事件的字段名
	   * @param { object } data 触发时的数据
	   */
	   ( { target, data } ) => {

      };
	  ```
