<template>
  <div>
    <XyForm  :config='config'/>
  </div>
</template>

<script>
import { XyForm } from "@/index";
export default {
  data() {
    return {
      config: {
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
          /* 是否显示切换密码图标 */
          showPassword: true,
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
          label: "密码",
          clearable: true,
          order: 1,
          group: 1,
        },
        address: {
          type: "string",
          label: "省市区",
          group: 2,
        },
      },
    };
  },
  components: {
    XyForm,
  },
};
</script>

<style lang="scss"></style>
