1. 表单配置通用属性

| 通用属性  | 数据类型 | 描述  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| type  | 表单类型  | string  | |
| group  | 元素分组  |  number |
| order  | 元素排序  |  number  |
| label  | 元素的label文字  |  string |
| readonly  | 是否可输入  |  boolean |
| rules  | 元素的验证规则  | Array<object> | 参考 Element组件验证规则  |
| clearable  | 显示清空内容按钮  | boolean  |
| visible  | 是否显示输入框  |  boolean  |
| placeholder  | 输入框占位文字  |  string  |


***
# 表单组件：

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
|  |  |  handleClickChekbox | 点击选项item 时 触发事件  |

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