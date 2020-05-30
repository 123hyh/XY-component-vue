<template>
  <XySelect
    :popper-append-to-body="false"
    class="xy-select"
    :title="title"
    :filterable="filterable"
    :popper-class="`xy-select-popper-${modelBin}`"
    :size="size"
    :multiple="options.multiple"
    :disabled="options.disabled"
    :clearable="true"
    v-model="formData[modelBin]"
    :placeholder="options.placeholder"
    @clear="() => hanldeEmit('handleClear')"
    @change="() => handlerChange('handleChange')"
  >
    <XyOption
      v-for="item of options.selectOptions"
      :key="item.id"
      :disabled="item.disabled"
      :label="item.label"
      :value="item.id"
    >
    </XyOption>
  </XySelect>
</template>

<script>
import { Select, Option } from "element-ui";
import { debounce, getType } from "@/utils";
export default {
  computed: {
    filterable() {
      return this.options.filterable ?? true;
    },

    /* 输入框hover时显示 */
    title() {
      return this.generatorTitle(this.formData[this.modelBin]);
    },

    selectOptions() {
      return this.options.selectOptions.reduce((prev, cur) => {
        prev[cur.id] = cur.label;
        return prev;
      }, {});
    },
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
  components: {
    XySelect: Select,
    XyOption: Option,
  },
  methods: {
    /**
     * 向上传递事件
     */
    hanldeEmit(emitName) {
      this.emit(emitName, {
        target: this.modelBin,
        data: this.formData[this.modelBin],
      });
    },
    /**
     * 节流控制阀
     */
    handlerChange: debounce(300, function() {
      this.hanldeEmit("handleChange");
    }),

    /**
     * 处理title显示
     */
    generatorTitle(data) {
      let str = "";
      if (getType(data) === "array") {
        str = data.reduce((prev, cur, index) => {
          const label = this.selectOptions[cur];
          prev += `${index === 0 ? "" : " , "}${label}`;
          return prev;
        }, "");
      } else {
        str = this.selectOptions[data];
      }
      return str;
    },
  },
};
</script>

<style lang="scss">
.xy-select {
}
</style>
