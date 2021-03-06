1. 表单配置通用属性

`import { XyForm } from xy-components-vue`

```javascript
<XyForm
      :inline="true"
      ref="xyForm"
      :groupOptions="groupOptions"
      :config="config"
      @handleFocus="handleFocus"
      @handleBlur="handleBlur"
      @handleClear="handleClear"
      @handleChange="handleChange"
      @handlerSearchSelectData="handlerSearchSelectData"
      @handleClickSearch="handleClickSearch"
      @handleModalConfirm="handleModalConfirm"
      @handleListModalClickSearch="handlerListModalClickSearch"
      @handleListModalClickReset="handlerListModalClickReset"
      @handleSearchStringData="handlerSearchStringData"
      @handleLazyTreeSelect="handlerLazyTreeSelect"
    />
```
 # XyForm 组件 props

| props属性  | 类型 | 描述  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| size | string | 输入框Item的尺寸模式 "medium" \| "small" \| "mini"  | 默认 small
| inline | boolean | 是否为行内模式 | 默认 false
| modalData | Array\<object\> | modal 表格数据 |
| config | object | 表单Item选项配置参考下面的 |
| groupOptions| object | 分组选项 | |

  ## 分组选项 groupOptions：
  ```javascript 
       groupOptions: {
        1: {
          // 分组标题
          title: "组1",
          // 启用卡片式分组
          card: true
        },
        2: {
          title: "组2",
        },
      }
  ```


# 表单操作方法 

`this.$refs.xyForm.formMethod[ methodName ]`

| 事件名称  | 参数类型 | 描述  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| getFormData | 无参数 | 获取表单的值 |
| validateAllField | 无参数 | 校验表单，通过则返回当前表单的所有数据 |
| clearValidate |  Array\<string\> \| string | 清空字段校验结果 |
| resetFields | 无参数 | 清空字段及移除所有校验结果 |
| validateField | Array\<string\> \| string | 对部分表单字段校验 |
| setFields | object | 设置表单字段的值 |



# 表单组件：config 配置选项

| 通用属性  | 数据类型 | 描述  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| type  | 表单类型  | string  | "lazyTreeSelect" \| "string" \| "number" \| "searchString" \| "select" \| "checkbox" \| "time" \| "date" |
| group  | 元素分组  |  number |
| order  | 元素排序  |  number  |
| label  | 元素的label文字  |  string |
| disabled| 禁用输入框  |  boolean  |
| readonly  | 是否可输入  |  boolean |
| rules  | 元素的验证规则  | Array<object> | 参考 Element组件验证规则  |
| clearable  | 显示清空内容按钮  | boolean  |
| visible  | 是否显示输入框  |  boolean  |
| placeholder  | 输入框占位文字  |  string  |





## 1. 远程树状下拉组件

| 属性  | 描述  | 事件名  | 事件描述  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| lazyLoad  | 远程api的回调  |  handleLazyTreeSelect | 选中最后一个下拉后触发的事件  |

### 表单配置：
```javascript
[ fieldName ]: {
  type: 'lazyTreeSelect',
  label: '树状下拉',
  group: 1,
  order: 0.1,
  clearable: true,
  /* 远程回调 */
  lazyLoad(node, resolve) {
    const { level } = node;
    setTimeout(() => {
      const nodes = Array.from({ length: level * 40 + 1 }).map((item) => ({
        value: ++id,
        label: `选项${id}`,
        leaf: level >= 2,
      }));
      // 通过调用resolve将子节点数据返回，通知组件数据加载完成
      resolve(nodes);
    }, 1000);
  },
};
```

***

## 2. 文字表单

| 属性  | 描述  | 事件名  | 事件描述  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
|  |  |  handleFocus | 输入框focus事件  |
|  |  |  handleBlur | 输入框blur事件  |
|  |  |  handleClear | 输入框点击清除事件  |
|  |  |  handleChange | 输入框值变化事件  |

```javascript 
{
  /* 表单类型 */
  type: 'string',
  /* 数字保留小数位数 */
  decimal: 0,
  /* 表单 label */
  label: '姓名',
  /* 分组标识符 */
  group: 1,
  /* 当前组中的序号 */
  order: 2,
  /* 占位符 */
  placeholder: '姓名',
  /* 是否可清空 */
  clearable: true,
  /* 密码框 是否显示切换密码图标 */
  showPassword: true,
  /* 是否显示输入框 */
  visible: true,
  /* 校验规则 */
  rules: [
    {
      message: '必填',
      trigger: 'blur',
      required: true,
    },
  ],
};
```

***

## 3. 数字表单

| 属性  | 描述  | 事件名  | 事件描述  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
|  |  |  handleFocus | 输入框focus事件  |
|  |  |  handleBlur | 输入框blur事件  |
|  |  |  handleClear | 输入框点击清除事件  |
|  |  |  handleChange | 输入框值变化事件  |

```javascript 
{
  type: 'number',
  decimal: 2, // 保留两位小数
  label: '数字输入框',
  clearable: true,
  order: 1,
  group: 1,
};
```

***

## 4. 尾部带search按钮的表单

| 属性  | 描述  | 事件名  | 事件描述  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
|  |  |  handleSearchStringBtnClick | 点击输入框尾部按钮  |
|  |  |  handleSelect | 在输入框的下拉中选中事件  |
|  |  |  handleListModalClickReset | 模态窗查询栏点击重置事件  |
|  |  |  handleModalConfirm | 模态窗点击确定事件  |
|  |  |  handleListModalClickSearch | 模态窗查询栏点击查询事件  |

```javascript 
{
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
```


***

## 5. 下拉选择器

| 属性  | 描述  | 事件名  | 事件描述  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
|  |  |  handleClear | 点击清空内容按钮事件  |
|  |  |  handleChange | 选择器值变化事件  |

```javascript 
{
  type: 'select',
  label: '下拉选择器',
  /* 是否可搜索的下拉 */
  filterable: true,
  /* 启用多选下拉 */
  multiple: true,
  /* 下拉选项options */
  selectOptions: [
    {
      id: 2,
      label: '深圳',
      disabled: true,
    },
    {
      id: 3,
      label: '南山区',
    },
    {
      id: 4,
      label: '桃源街道',
    },
    {
      id: 5,
      label: '桂庙路',
    },
    {
      id: 6,
      label: '文体中心',
    },
    {
      id: 7,
      label: '二楼',
    },
  ],
  order: 1,
  group: 1,
};
```

***
## 6. 多选框

| 属性  | 描述  | 事件名  | 事件描述  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
|  |  |  handleChange | 值变化 时 触发事件  |

```javascript 
{
  type: 'checkbox',
  label: '选择地区',
  /* 多选选项配置 */
  checkboxOptions: [
    {
      /* 选项的标识符 */
      id: 1,
      /* 多选项的 label */
      label: '广东',
      /* 是否禁用当前选项 */
      disabled: true,
    },
    {
      id: 2,
      label: '深圳',
    },
    {
      id: 3,
      label: '南山区',
    },
  ],
};

```

***
## 6. 时间选择器

| 事件名  | 事件描述  | 备注  |
| ------------ | ------------ | ------------ |
|  handleChange| 值发生变化时触发事件  |

```javascript
{
  group: 1,
  order: 1,
  type: 'time',
  label: '时间选择器',
  clearable: true,
}
```

***
## 7. 日期时间选择器(可选范围)

| 事件名  | 事件描述  | 备注  |
| ------------ | ------------ | ------------ |
|  handleChange| 值发生变化时触发事件  |

```javascript
{
  group: 1,
  order: 1,
  type: "date",
  // 时间选择框的类型 
  dateType: "datetimerange", // datetimerange (日期时间范围选择器) | datetime(单个日期时间选择器) | 
  // 格式化时间值
  valueFormat: "yyyy-MM-dd", // yyyy-MM-dd HH:mm:ss | yyyy-MM-dd
  label: "时间选择器",
  clearable: true,
}
```
## config demo:

```javascript 
      config: {
        date1: {
          group: 1,
          order: 1,
          type: "date",
          dateType: "datetimerange", // datetimerange (日期时间范围选择器) | datetime(单个日期时间选择器) | 
          valueFormat: "yyyy-MM-dd", // yyyy-MM-dd HH:mm:ss | yyyy-MM-dd
          label: "时间选择器",
          clearable: true,
        },
        time1: {
          group: 1,
          order: 1,
          type: "time",
          label: "时间选择器",
          clearable: true,
        },
        treeSelect: {
          type: "lazyTreeSelect",
          label: "树状下拉",
          group: 1,
          order: 0.1,
          clearable: true,
          lazyLoad(node, resolve) {
            const { level } = node;
            setTimeout(() => {
              const nodes = Array.from({ length: level * 40 + 1 }).map(
                (item) => ({
                  value: ++id,
                  label: `选项${id}`,
                  leaf: level >= 2,
                })
              );
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }, 1000);
          },
        },
        name: {
          /* 表单类型 */
          type: "string",
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
          /* 密码框 是否显示切换密码图标 */
          showPassword: true,
          /* 是否显示输入框 */
          visible: true,
          /* 校验规则 */
          rules: [
            {
              message: "必填",
              trigger: "blur",
              required: true,
            },
          ],
        },
        password: {
          type: "number",
          label: "数字输入框",
          clearable: true,
          order: 1,
          group: 1,
        },
        currentPay: {
          type: "switch",
          label: "现付",
          order: 1,
          group: 1,
        },
        currentPay1: {
          type: "searchString",
          label: "表格选项",
          /* 不可输入 */
          readonly: true,
          rules: [
            {
              message: "必填",
              trigger: "change",
              required: true,
            },
          ],
          // 弹窗配置
          modalOptions: {
            // 标题
            title: "测试",
            // 表格配置
            tableConfig: [],
            // 查询栏表单配置
            searchConfig: {
              /* name: {
                type: "string",
                label: "查询1",
                group: 1,
                clearable: true,
              },
              password: {
                type: "string",
                label: "查询2",
                group: 1,
                clearable: true,
              },
              password1: {
                type: "string",
                label: "查询3",
                group: 1,
                clearable: true,
              },
              password2: {
                type: "string",
                label: "查询4",
                group: 1,
                clearable: true,
                visible: false
              },
              password3: {
                type: "string",
                label: "查询5",
                group: 1,
                clearable: true,
                visible: false
              }, */
            },
          },
          tableOption: [],
          order: 0.1,
          group: 1,
        },
        player: {
          type: "select",
          label: "多选下拉",
          /* 是否可搜索的下拉 */
          filterable: true,
          /* 多选下拉 */
          multiple: true,

          selectOptions: [
            {
              id: 2,
              label: "深圳",
              disabled: true,
            },
            {
              id: 3,
              label: "南山区",
            },
            {
              id: 4,
              label: "桃源街道",
            },
            {
              id: 5,
              label: "桂庙路",
            },
            {
              id: 6,
              label: "文体中心",
            },
            {
              id: 7,
              label: "二楼",
            },
          ],
          order: 1,
          group: 1,
        },

        player1: {
          type: "select",
          label: "单选下拉",
          /* 是否可搜索的下拉 */
          filterable: true,
          /* 多选下拉 */
          multiple: false,

          selectOptions: [
            {
              id: 2,
              label: "深圳",
              disabled: true,
            },
            {
              id: 3,
              label: "南山区",
            },
            {
              id: 4,
              label: "桃源街道",
            },
            {
              id: 5,
              label:
                "文体中心桃源街道文体中心桃源街道文体中心桃源街道文体中心桃源街道文体中心桃源街道",
            },
          ],
          order: 1,
          group: 1,
        },

        address: {
          type: "string",
          label: "省市区",
          group: 2,
        },
        checkBox: {
          type: "checkbox",
          label: "选择地区",
          /* 多选选项配置 */
          checkboxOptions: [
            {
              /* 选项的标识符 */
              id: 1,
              /* 多选项的 label */
              label: "广东",
              /* 是否禁用当前选项 */
              disabled: true,
            },
            {
              id: 2,
              label: "深圳",
            },
            {
              id: 3,
              label: "南山区",
            },
          ],
        },
      },
```