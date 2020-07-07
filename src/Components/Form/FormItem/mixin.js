/*
 * @Author: huangyuhui
 * @since: 2020-07-07 10:42:29
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-07 11:21:29
 * @message: 
 * @FilePath: \XY-component-vue\src\Components\Form\FormItem\mixin.js
 */
import { debounce } from '@/utils';
export const valueChangeEventMixins = {
  created() {
    this.$watch(
      `formData.${this.modelBin}`,
      debounce ( 200, ( newVal, oldVal ) => {
        if ( newVal === oldVal ) return;
        debugger;
        this.emit( 'handleChange', { target: this.modelBin, data: newVal } );
      },
      { deep: true, immediate: false }
      ),
    );
  },
};
