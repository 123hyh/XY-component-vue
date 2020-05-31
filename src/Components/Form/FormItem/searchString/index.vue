<template>
  <div>
    <XyPopover
      ref="popover"
      title="表格"
      :disabled="options.disabled"
      popper-class="xy-search-popover"
      trigger="click"
    >
      <XyTable />
    </XyPopover>
    <XyInput
      :readonly="options.readonly"
      v-popover:popover
      :disabled="options.disabled"
      :size="size"
      slot="reference"
      :suffix-icon="icon"
      v-model="formData[modelBin]"
    ></XyInput>
  </div>
</template>

<script>
import { Input, Popover } from 'element-ui';

export default {
  inject: {
    emit: {
      from: 'emit',
      default: () => {},
    },
    size: ['size'],
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
    XyPopover: Popover,
    XyInput: Input,
    XyTable: () => import('@/Components/Table'),
  },

  computed: {
    // 输入框后面的icon
    icon() {
      return this.options.disabled ? '' : 'el-icon-search';
    },
  },
};
</script>

<style lang="scss">
.xy-search-popover {
  .xy-table {
    .el-table {
      max-height: calc(100vh - 150px);
      overflow: auto;
    }
    .xy-pagination {
      padding-top: 10px;
      .el-pagination {
        width: max-content;
      }
    }
  }
}
</style>
