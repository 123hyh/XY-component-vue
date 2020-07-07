/*
 * @Author: huangyuhui
 * @since: 2020-07-07 10:42:29
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-07 10:45:22
 * @message: 
 * @FilePath: \XY-component-vue\src\Components\Form\FormItem\mixin.js
 */

export const valueChangeEventMixins = {
  created() {
    this.$watch(
      `formData.${this.modelBin}`,
      ( newVal, oldVal ) => {
        this.emit( 'handleChange', { target: this.modelBin, data: newVal } );
      },
      { deep: true }
    );
  },
};
