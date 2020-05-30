<template>
  <XySwitch
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
  methods: {
    handlerChange: debounce(200, function(val) {
      this.$nextTick(() => {
        this.emit("handleChange", { target: this.modelBin, data: val });
      });
    }),
  },
};
</script>

<style></style>
