<!--
 * @Author: huangyuhui
 * @since: 2020-05-30 14:20:02
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-07 11:14:43
 * @message: 
 * @FilePath: \XY-component-vue\src\Components\Form\FormItem\Switch.vue
-->
<template>
  <XySwitch
    :id="modelBin"
    :disabled="options.disabled"
    v-model="formData[modelBin]"
  >
  </XySwitch>
</template>

<script>
import { Switch } from "element-ui";
import { debounce } from "@/utils";
import { valueChangeEventMixins } from "@/Components/Form/FormItem/mixin.js";

export default {
  mixins: [valueChangeEventMixins],
  inject: {
    emit: {
      from: "emit",
      default: () => {},
    },
    size: ["size"],
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
    XySwitch: Switch,
  },
};
</script>

<style></style>
