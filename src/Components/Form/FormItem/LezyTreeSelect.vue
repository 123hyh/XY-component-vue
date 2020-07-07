<!--
 * @Author: huangyuhui
 * @since: 2020-07-02 09:07:42
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-07 11:19:15
 * @message: 懒加载树状下拉
 * @FilePath: \XY-component-vue\src\Components\Form\FormItem\LezyTreeSelect.vue
-->
<template>
  <Cascader
    popper-class="lazy-tree-select"
    v-model="formData[modelBin]"
    style="width: 100%"
    :size="size"
    :props="cascaderProps"
    :clearable="options.clearable"
  ></Cascader>
</template>
<script>
import { Cascader } from "element-ui";
import { valueChangeEventMixins } from "@/Components/Form/FormItem/mixin.js";

export default {
  mixins: [valueChangeEventMixins],
  components: {
    Cascader,
  },
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
  data() {
    return {
      cascaderProps: {
        lazy: true,
        lazyLoad: this.options.lazyLoad,
      },
    };
  },
};
</script>
<style lang="scss">
.lazy-tree-select {
  max-height: 500px;
  overflow: hidden;
}
</style>
