/*
 * @Author: huangyuhui
 * @since: 2020-06-01 08:48:25
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-06-19 17:37:36
 * @message: 
 * @FilePath: \XY-component-vue\src\directive\index.ts
 */ 

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
export const resizable = ( minwidth = 140, minheight = 140 ) => ( {
  inserted( el: any, binding: any ) {
    if ( !binding.arg ) {
      throw new Error( '请添加需要绑定的类名如 ： `v-resizable:<类名>`' );
    }
    registerResizable( {
      element: <HTMLElement>document.querySelector( '.' + binding.arg ),
      minwidth,
      minheight,
    } );
  },
  update() {},
  componentUpdated() {},
  unbind() {},
} );

// eslint-disable-next-line no-unused-vars
import { formatDecimal, formatDecimalParamsType } from '@/utils/index.ts';

/**
 * @description: 保留小数 及 比例指令
 * @param {number} decimal 保留小数位数
 * @param {number} value 原始数据
 * @param {number} ratio 比例
 * @return:
 */
export function decimal () {
  return  {
    update( 
      el: HTMLElement, 
      { value: values }: { value: formatDecimalParamsType } 
    ) {
      el.innerText =  formatDecimal( values );
    }
  }; 
}