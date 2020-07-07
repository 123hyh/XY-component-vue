<template>
  <div>
    <XyForm
      :inline="true"
      ref="xyForm"
      :config="config"
      @handleFocus="handleFocus"
      @handleBlur="handleBlur"
      @handleClear="handleClear"
      @handleChange="handleChange"
      @handleClickChekbox="handleClickChekbox"
      @handlerSearchSelectData="handlerSearchSelectData"
      @handleClickSearch="handleClickSearch"
      @handleModalConfirm="handleModalConfirm"
      @handleListModalClickSearch="handlerListModalClickSearch"
      @handleListModalClickReset="handlerListModalClickReset"
      @handleSearchStringData="handlerSearchStringData"
      @handleLazyTreeSelect='handlerLazyTreeSelect'
    />
  </div>
</template>

<script>
let id = 0
import { XyForm } from '@/index';
import { createHttpReqest,condom } from '@/utils/index';

export default {
  data() {
    return {
      config: {
        time1:{
          group: 1,
          order: 1,
          type: 'time',
          label: '时间选择器',
          clearable: true,
        },
        treeSelect: {
          type: "lazyTreeSelect",
          label: "树状下拉",
          group: 1,
          order: 0.1,
          clearable: true,
          lazyLoad(node, resolve) {
            const { level } = node;
            setTimeout(() => {
              const nodes = Array.from({ length: level * 40+1 }).map((item) => ({
                value: ++id,
                label: `选项${id}`,
                leaf: level >= 2,
              }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }, 1000);
          },
        },
        name: {
          /* 表单类型 */
          type: "string",
          /* 数字保留小数位数 */
          decimal: 0,
          /* 表单 label */
          label: "姓名",
          /* 分组标识符 */
          group: 1,
          /* 当前组中的序号 */
          order: 2,
          /* 占位符 */
          placeholder: "姓名",
          /* 是否可清空 */
          clearable: true,
          /* 密码框 是否显示切换密码图标 */
          showPassword: true,
          /* 是否显示输入框 */
          visible: true,
          /* 校验规则 */
          rules: [
            {
              message: "必填",
              trigger: "blur",
              required: true,
            },
          ],
        },
        password: {
          type: "number",
          label: "密码",
          clearable: true,
          order: 1,
          group: 1,
        },
        currentPay: {
          type: "switch",
          label: "现付",
          order: 1,
          group: 1,
        },
        currentPay1: {
          type: "searchString",
          label: "表格选项",
          /* 不可输入 */
          readonly: true,
          rules: [
            {
              message: "必填",
              trigger: "change",
              required: true,
            },
          ],
          // 弹窗配置
          modalOptions: {
            // 标题
            title: "测试",
            // 表格配置
            tableConfig: [],
            // 查询栏表单配置
            searchConfig: {
              /* name: {
                type: "string",
                label: "查询1",
                group: 1,
                clearable: true,
              },
              password: {
                type: "string",
                label: "查询2",
                group: 1,
                clearable: true,
              },
              password1: {
                type: "string",
                label: "查询3",
                group: 1,
                clearable: true,
              },
              password2: {
                type: "string",
                label: "查询4",
                group: 1,
                clearable: true,
                visible: false
              },
              password3: {
                type: "string",
                label: "查询5",
                group: 1,
                clearable: true,
                visible: false
              }, */
            },
          },
          tableOption: [],
          order: 0.1,
          group: 1,
        },
        player: {
          type: "select",
          label: "多选下拉",
          /* 是否可搜索的下拉 */
          filterable: true,
          /* 多选下拉 */
          multiple: true,

          selectOptions: [
            {
              id: 2,
              label: "深圳",
              disabled: true,
            },
            {
              id: 3,
              label: "南山区",
            },
            {
              id: 4,
              label: "桃源街道",
            },
            {
              id: 5,
              label: "桂庙路",
            },
            {
              id: 6,
              label: "文体中心",
            },
            {
              id: 7,
              label: "二楼",
            },
          ],
          order: 1,
          group: 1,
        },

        player1: {
          type: "select",
          label: "单选下拉",
          /* 是否可搜索的下拉 */
          filterable: true,
          /* 多选下拉 */
          multiple: false,

          selectOptions: [
            {
              id: 2,
              label: "深圳",
              disabled: true,
            },
            {
              id: 3,
              label: "南山区",
            },
            {
              id: 4,
              label: "桃源街道",
            },
            {
              id: 5,
              label:
                "文体中心桃源街道文体中心桃源街道文体中心桃源街道文体中心桃源街道文体中心桃源街道",
            },
          ],
          order: 1,
          group: 1,
        },

        address: {
          type: "string",
          label: "省市区",
          group: 2,
        },
        checkBox: {
          type: "checkbox",
          label: "选择地区",
          /* 多选选项配置 */
          checkboxOptions: [
            {
              /* 选项的标识符 */
              id: 1,
              /* 多选项的 label */
              label: "广东",
              /* 是否禁用当前选项 */
              disabled: true,
            },
            {
              id: 2,
              label: "深圳",
            },
            {
              id: 3,
              label: "南山区",
            },
          ],
        },
      },
    };
  },
  methods: {
    handlerLazyTreeSelect(data){
      debugger
    },
    /**
     * @description: 带searchBtn按钮的下拉选中事件
     * @param {type}
     * @return:
     */
    handlerSearchStringData(data) {},
    /**
     * 列表弹窗点击search 事件
     */
    handlerListModalClickSearch(data) {
      debugger;
    },
    /**
     * 列表弹窗点击 reset 按钮事件
     */
    handlerListModalClickReset(data) {
      debugger;
    },
    /**
     * modal点击确定
     */
    handleModalConfirm(data) {
      debugger;
    },
    handleClickSearch(data) {
      debugger;
    },
    handleFocus() {
      // console.log(`foucs`, arguments);
    },

    handleBlur() {
      console.log(`blur`, arguments);
    },

    handleClear() {
      // console.log(`clear`, arguments);
    },

    handleChange() {
      console.log(`change`, arguments);
    },

    handleClickChekbox() {
      console.log(`clickCheckbox`, arguments);
    },

    async handlerSearchSelectData({ target, keyword, afterCallback }) {
      function getData() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: [
                { label: "南山区", id: 1 },
                { label: "罗湖区", id: 2 },
                { label: "福田区", id: 3 },
              ],
            });
          }, 1500);
        });
      }
      this.config.searchSelect.selectOptions = [];
      try {
        const { data } = await getData();
        this.config.searchSelect.selectOptions = [...data];
      } catch (error) {
        console.log(error);
      } finally {
        afterCallback();
      }
    },
  },
  components: {
    XyForm,
  },
  mounted() {
    const {request} = createHttpReqest({ baseUrl: 'http://47.106.230.157:8080/apis' });
    request({
      url: '/exchangerate/search/settting/',
      method: 'POST',
      data: {
        pageIndex: 1,
        pageSize: 10,
        source: "system",
      },
    })
      .then((res) => {
        debugger;
      })
      .catch((err) => {
        debugger;
      });
    setTimeout(() => {
      // this.config.player1.selectOptions.push({id:6,label: '115'})
      // this.$refs.xyForm.setFields({ checkBox: [1,2] });
      this.config.currentPay1.modalOptions.searchConfig = {
        name: {
          type: "string",
          label: "查询1",
          group: 1,
          clearable: true,
        },
        password: {
          type: "string",
          label: "查询2",
          group: 1,
          clearable: true,
        },
        password1: {
          type: "string",
          label: "查询3",
          group: 1,
          clearable: true,
        },
        password2: {
          type: "string",
          label: "查询4",
          group: 1,
          clearable: true,
          visible: false,
        },
        password3: {
          type: "string",
          label: "查询5",
          group: 1,
          clearable: true,
          visible: false,
        },
      };
    }, 2000);
  },
};
</script>

<style lang="scss"></style>
