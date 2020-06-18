<template>
  <div class="xy-search-form">
    <XyForm ref="formModel" :config="config">
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
export default {
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
    newConfig() {
      /* forObject(this.config, (key, value) => {
        if(this.toggle){
          value.visible = !!this.toggle
        }else{
          this.rawVisibleItem
        }
      }); */
    },
  },

  data() {
    return {
      /* 切换展开 */
      toggle: false,
      // 原查询显示
      rawVisibleItem: [],
    };
  },

  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    config: {
      handler(val) {
        if (Object.keys(val).length === 0) {
          return;
        } else {
          forObject(val, (key, value) => {
            if (value.visible === false) {
              this.rawVisibleItem.push(key);
            }
          });
        }
      },
      immediate: true,
      deep: true,
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
    .xy-form-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .el-form-item {
        flex-basis: 32%;
      }
      .xy-search-form-after {
        flex-grow: 1;
        text-align: right;
      }
    }
  }
}
</style>
