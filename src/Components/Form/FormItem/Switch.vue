<!--
 * @Author: huangyuhui
 * @since: 2020-05-30 14:20:02
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-06 17:49:47
 * @message: 
 * @FilePath: \XY-component-vue\src\Components\Form\FormItem\Switch.vue
-->
<template>
  <XySwitch
    :id="modelBin"
    :disabled="options.disabled"
    v-model="formData[modelBin]"
    @change="handlerChange"
  >
  </XySwitch>
</template>

<script>
import { Switch } from "element-ui";
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
    XySwitch: Switch,
  },
  get methods() {
    return {
      handlerChange: debounce(200, function(val) {
        this.$nextTick(() => {
          this.emit("handleChange", { target: this.modelBin, data: val });
        });
      }),
    };
  },
};
</script>

<style></style>
