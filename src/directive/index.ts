import { registerResizable } from '@/utils/index';
interface derectiveHooksParams {
  el: HTMLElement;
  binding: {
    name: string;
    value: any;
    oldValue: any;
    expression: any;
    arg: any;
    modifiers: any;
  };
  vnode: any;
  oladVnode: any;
}
/**
 * 缩放指令
 * @param { number } minwidth 不允许小于的宽度
 * @param {number} minheight 不允许小于的高度
 */
export const resizable = (minwidth = 140, minheight = 140) => ({
  inserted(el: any, binding: any) {
    if (!binding.arg) {
      throw new Error('请添加需要绑定的类名如 ： `v-resizable:<类名>`');
    }
    registerResizable({
      element: <HTMLElement>document.querySelector('.' + binding.arg),
      minwidth,
      minheight,
    });
  },
  update() {},
  componentUpdated() {},
  unbind() {},
});