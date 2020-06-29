<!--
 * @Author: huangyuhui
 * @since: 2020-06-03 15:31:32
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-06-29 16:58:33
 * @message: 查询栏组件
 * @FilePath: \XY-component-vue\src\Components\SearchForm\index.vue
--> 

<template>
  <div class="xy-search-form">
    <XyForm ref="formModel" :config="newConfig">
      <template v-slot:form-after-slot-1>
        <div class="xy-search-form-after">
          <div>
            <XyButton
              type="primary"
              size="small"
              class="xy-search-form-btn"
              @click.stop="handlerClickSearch"
              >查询</XyButton
            >
            <XyButton
              size="small"
              class="xy-search-form-btn"
              @click.stop="handlerReset"
              >重置</XyButton
            >
            <XyButton
              size="small"
              type="text"
              @click.stop="handlerFlexible"
              :icon="direction.icon"
              >{{ direction.label }}</XyButton
            >
          </div>
        </div>
      </template>
    </XyForm>
  </div>
</template>

<script>
import { Button } from "element-ui";
import { forObject } from "@/utils/index.ts";
import { cloneData } from "@/utils/index.ts";
export default {
  mounted() {
    const result = Array.from({length: 35}).map((_,index)=>{
      return index +1
    });
    //  数组乱序
    function sort(result) {
      if (result.length <= 1) return result;
      let i = 0;
      const middle = Math.floor(result.length / 2);
      const first = middle / 2;
      const last = middle / 2 + middle;
      const sliceArr = result.splice(first, last + 1);
      const unshiftData = sliceArr.splice(1, sliceArr.length / 2);
      result.push(...sort(sliceArr));
      result.unshift(...sort(unshiftData));
      return result;
    }
    function sort1(time) {
      let i = 0;
      let res = []
      while (i++ < time) {
        res = sort(result);
      }
    }
    sort1(Math.floor(Math.random() * 100))
  },
  computed: {
    /* 图标的方向 */
    direction() {
      const toggle = this.toggle;
      return {
        label: toggle ? "展开" : "收起",
        icon: toggle ? "el-icon-arrow-down" : "el-icon-arrow-up",
      };
    },

    formModel() {
      return this.$refs.formModel;
    },
    /**
     * @description: 处理点击展开和收起的查询表单
     * @param {type}
     * @return:
     */
    newConfig() {
      return forObject(
        this.config,
        (key, value, previous) => {
          if (this.toggle) {
            const newConfItem = cloneData(value);
            delete newConfItem.visible;
            previous[key] = newConfItem;
          } else {
            if (value.visible !== false) {
              previous[key] = value;
            }
          }
          return previous;
        },
        {}
      );
    },
  },

  data() {
    return {
      /* 切换展开 */
      toggle: false,
    };
  },

  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    XyForm: () => import("@/Components/Form"),
    XyButton: Button,
  },

  methods: {
    handlerFlexible() {
      this.toggle = !this.toggle;
    },

    /**
     * 点击重置
     */
    handlerReset() {
      this.formModel.resetFields();
      this.$emit("handleClickReset");
    },

    /**
     * 点击查询
     */
    handlerClickSearch() {
      this.$emit("handleClickSearch", this.formModel.getFormData());
    },
  },
};
</script>

<style lang="scss">
.xy-search-form {
  .xy-search-form-btn {
    padding: 8px 15px;
  }
  .xy-form {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      .el-form-item {
        flex-basis: 32%;
        margin: 0 5px;
      }
      .xy-search-form-after {
        flex-grow: 1;
        text-align: right;
      }
  }
}
</style>
