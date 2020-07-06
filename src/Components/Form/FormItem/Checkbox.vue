<template>
  <CheckboxGroup
    :disabled="options.disabled"
    :title="formData[modelBin]"
    v-model="formData[modelBin]"
    :placeholder="options.placeholder"
    :size="size"
  >
    <!-- 遍历 checkboxOptions -->
    <Checkbox
      v-for="item of options.checkboxOptions"
      :key="item.id"
      :label="item.id"
      :disabled="item.disabled"
      @click.native.stop="() => handlerClickCheckbox(item)"
    >
      {{ item.label }}
    </Checkbox>
  </CheckboxGroup>
</template>

<script>
import { debounce, traversalObject } from "@/utils/index";
import { CheckboxGroup, Checkbox } from "element-ui";

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
    CheckboxGroup,
    Checkbox,
  },
  get methods() {
    return {
      /**
       * 向上传递事件
       */
      hanldeEmit(emitName, ...args) {
        let data = [];

        for (const id of this.formData[this.modelBin]) {
          const checkedData = this.options.checkboxOptions.find(
            (item) => item.id === id
          );
          if (checkedData) {
            data.push({ sourceData: { ...checkedData }, checked: true });
          }
        }
        /**
         * emie 数据结构
         * {
         *    // 原选项数据
         *    sourceData：{ id, value, ...data},
         *    // 是否选中
         *    checked: Boolean
         * }
         */
        this.emit(emitName, {
          target: this.modelBin,
          data,
        });
      },

      /**
       * 点击选项时事件
       */
      handlerClickCheckbox: debounce(150, function(clickData) {
        const targetData = this.formData[this.modelBin];
        const { id } = clickData;
        if (id !== undefined) {
          const checked = targetData.includes(id);
          this.emit("handleClickChekbox", { checked, sourceData: clickData });
        }
      }),
    };
  },
};
</script>

<style></style>
