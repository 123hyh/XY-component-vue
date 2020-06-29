<!--
 * @Author: huangyuhui
 * @since: 2020-05-30 16:52:44
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-06-29 17:20:41
 * @message: 
 * @FilePath: \XY-component-vue\src\Components\Form\FormItem\SearchSelect.vue
-->
<template>
  <!-- @click.native.stop="handlerFocus" -->

  <XySelect
    :clearable="true"
    :size="size"
    v-model="formData[modelBin]"
    :multiple="options.multiple"
    filterable
    remote
    reserve-keyword
    :placeholder="options.placeholder"
    :remote-method="remoteMethod"
    :loading="loading"
  >
    <XyOption
      v-for="item in options.selectOptions || []"
      :key="item.id"
      :label="item.label"
      :value="item.id"
    >
    </XyOption>
  </XySelect>
</template>

<script>
import { Select, Option } from "element-ui";
import { debounce } from "@/utils";

export default {
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
    XySelect: Select,
    XyOption: Option,
  },
  data() {
    return {
      loading: false,
    };
  },

  methods: {
    handlerFocus: debounce(200, function(e) {
      this.remoteMethod();
    }),
    remoteMethod: debounce(200, function(keyword = "") {
      console.log(keyword);
      const { selectOptions = [] } = this.options;

      /* 是否可触发条件 */
      const isNotTigger = keyword === "" && selectOptions.length !== 0;
      if (isNotTigger) {
        return;
      }
      this.loading = true;
      this.emit("handlerSearchSelectData", {
        target: this.modelBin,
        keyword,
        /* 搜索完需要手动执行该回调，关闭lodind */
        afterCallback: () => {
          this.loading = false;
        },
      });
    }),
  },
};
</script>

<style></style>
