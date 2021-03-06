type ResizableElemParams = {
  element: HTMLElement;
  minwidth: number;
  minheight: number;
};
export * from './request';
export declare type AnyObject = {[propName: string]:any}
/**
 * 缩放元素类
 */
class Resizable {
  private element: HTMLElement;
  private minheight: number;
  private minwidth: number;
  private state: boolean;
  /**
   * 构造函数
   * @param {object} option
   * @param {HTMLElement} option.element
   * @param {number} option.minwidth
   * @param {number} option.minheight
   */
  constructor( { element, minwidth, minheight }: ResizableElemParams ) {
    this.element = element;
    this.minheight = minheight;
    this.minwidth = minwidth;
    this.state = false;
  }

  /**
   * @returns {CSSStyleDeclaration}
   */
  get style() {
    return window.getComputedStyle( this.element );
  }

  /**
   * 调整大小
   */
  public resizable() {
    let nodese = this._createSe( 'resizable-se' );
    let [ mousedownX, mousedownY, width, height ] = [ 0, 0, 0, 0 ];

    // 鼠标按下
    nodese.addEventListener( 'mousedown', ( event ) => {
      this.state = true; // 设置状态位
      [ mousedownX, mousedownY, width, height ] = [
        event.clientX, // 鼠标按下时X坐标
        event.clientY, // 鼠标按下时Y坐标
        Number.parseFloat( this.style.width ), // 获取元素宽度
        Number.parseFloat( this.style.height ), // 获取 元素高度
      ];

      // 鼠标拖动
      function handlerMousemove( this: Resizable, event: MouseEvent ) {
        if ( this.state ) {
          let w = width + ( event.clientX - mousedownX ); // 调整后的宽度
          let h = height + ( event.clientY - mousedownY ); // 调整后的高度
          if ( w > this.minwidth ) {
            // 限制最小 宽度
            this.element.style.width = w + 'px';
          }
          if ( h > this.minheight ) {
            // 限制最小 高度
            this.element.style.height = h + 'px';
          }
        }
      }

      document.addEventListener( 'mousemove', handlerMousemove.bind( this ) );

      // 鼠标松开
      this.element.addEventListener( 'mouseup', () => {
        this.state = false; // 重置状态位
        document.removeEventListener(
          'mousemove', handlerMousemove.bind( this )
        ); // 销毁事件
      } );
    } );
  }
  private _createSe( className: string ) {
    let node = document.createElement( 'div' );
    node.className = className;
    this.element.appendChild( node );
    return node;
  }
}

/**
 * 注册缩放元素
 * @param {HTMLElement} element html元素
 * @param {number} minwidth 最小宽度
 * @param {number} minheight 最小高度
 */
export function registerResizable( {
  element,
  minwidth,
  minheight,
}: ResizableElemParams ) {
  const instance = new Resizable( { element, minwidth, minheight } );
  instance.resizable();
  return instance;
}

/**
 * 获取数据的类型
 * @param {any} params
 */
export function getType( params: any ) {
  return Object.prototype.toString
    .call( params )
    .slice( 8, -1 )
    .toLowerCase();
}
/**
 * 校验是否为空对象
 * @param data 
 */
export function isEmptyObject( data: {[prop:string]: any} ) {
  if ( getType( data ) !== 'object' ) {
    console.warn( '参数必须是一个对象' );
    return false;
  } else {
    const keys = [];
    traversalObject( data, ( key )=>{
      keys.push( key );
    } );
    return keys.length === 0;
  }
  
}

/**
 * 判断数据是否为 undefined
 * @param {any} data
 */
export function isUndef( data: any ) {
  return data === undefined;
}

function forEach<T>( newData: T, handler: ( key: any, newData: T ) => any ) {
  return function forEach( prevData: T ) {
    const OBJ_TYPE = getType( prevData );
    if ( OBJ_TYPE === 'object' ) {
      for ( const key in prevData ) {
        // eslint-disable-next-line no-prototype-builtins
        if ( ( <any>prevData ).hasOwnProperty( key ) ) {
          handler( [ key, prevData[key] ], newData ); }
      }
    } else {
      for ( const item of <any>prevData ) {
        handler( item, newData );
      }
    }
    return newData;
  };
}

type CloneDataType = 'array' | 'object' | 'map' | 'set';

type cloneDataConf = {
  [key in CloneDataType]: typeof forEach;
};

const cloneDataConfFn = () => ( {
  array: forEach( Array.of<any>(), ( item, newData ) => {
    newData.push( cloneData( item ) );
  } ),
  object: forEach( Object.assign( {} ), ( [ key, value ], newData ) => {
    newData[key] = cloneData( value );
  } ),
  map: forEach( new Map(), ( [ key, value ], newData ) => {
    newData.set( key, cloneData( value ) );
  } ),
  set: forEach( new Set(), ( value, newData ) => {
    newData.add( cloneData( value ) );
  } ),
} );

/**
 * 深克隆数据
 * @param {T} data 数据
 * @returns {T} data
 */
export function cloneData<T extends Object>( data: T ): T {
  const DATA_TYPE = getType( data );
  const cloneDataConf = cloneDataConfFn();
  // eslint-disable-next-line no-prototype-builtins
  if ( cloneDataConf.hasOwnProperty( DATA_TYPE ) ) {
    data = ( <any>cloneDataConf )[DATA_TYPE]( data );
  }
  return data;
}

/**
 * 遍历对象（过滤原型链）
 * @param {object} object 需要遍历的数据 
 * @param {function} handler 遍历的回调 
 */
export function traversalObject(
  object: {[prop:string]:any},
  handler:( key:string, value:any ) => void 
) {
  for ( const key in object ) {
    // eslint-disable-next-line no-prototype-builtins
    if ( object.hasOwnProperty( key ) ) {
      const value = object[key];
      handler( key, value );
    }
  }
}
/**
 * 节流函数
 * @param date 节流的时间（毫秒）
 * @param callback 达到节流时间需要执行的回调函数
 */
export function throttle( date:number, callback:( ...args:any[] )=>any ) {

  // 上一个执行回调的时间
  let timer = Date.now();

  return function  handlerEvent( this: any ) {

    // 1 、先计算 当前时间 - 上一次执行完 Callback的时间
    const currentTime = Date.now();
    const differ = currentTime - ( timer || 0 );

    // 2、如果这个时间差 大于等于 传入的date时候 执行回调函数，并赋值当前时间给timer 以被下次 判断
    if ( differ >= date ) {
      setTimeout( () => {
        callback.call( this, ...arguments );
      } );
      
      timer = currentTime;
    }
  };
}
/**
 * 防抖函数
 * @param {number} time 防抖时间
 * @param {function} handler 需要执行的回调函数
 * @param {boolean} immediate 是否立即执行该回调
 */

export function debounce(
  time: number, 
  handler: ( ...args: any[] ) => any,
  immediate = false  ) {
  // eslint-disable-next-line no-unused-vars
  let prevHandler: any = null;
  let prevDateNow: number | null = null;
  if ( immediate ) {
    handler();
  }
  return function( this:any, ...args: any[] ) {
    const currentTime = Date.now();
    /**
     * 如果 上个触发的时间戳 - 当前的时间戳 < time 时
     * 清空上一个 定时器，重新赋值 time时间后触发的定时，
     * 执行完清空 上一个时间戳
     * 否则 把当前时间戳赋值，下一次执行时如此循环该条件，最终达成 > time
     */
    if ( 
      prevDateNow === null  || 
      currentTime - prevDateNow < time 
    ) {

      clearTimeout( prevHandler );
      prevHandler = null;
      prevDateNow = currentTime;

      prevHandler = setTimeout( () => {
        handler.call( this, ...args );
        prevDateNow = null;
      }, time );
      
    } else {
      prevDateNow = currentTime;
    }
  };
}
/**
 * 替换html文本标签
 * @param {string} val 需要替换的html文本
 */
export function replaceHtmlTag( val = '' ) {
  return val.replace( /<[^>]+>/g, '' ).trim();
}

/**
 * 邮箱正则表达式
 */
export const Email_REG =  /(.+)@{1}?(.+)\.{1}?\w+/;

/**
 * 大陆手机号正则表达式
 */
export const CHPhoneReg = new RegExp( '^1(3|4|5|6|7|8|9)(\\d){9}$' );

/**
 * @description: 遍历对象
 * @param {object} sourceObject 源对象 
 * @param {Function} handler 回调函数
 * @param {object} previous 新对象
 * @return: 
 */
export function forObject( 
  sourceObject: AnyObject, 
  handler: (
    key:string, 
    val: any,
    previous :AnyObject

  ) => AnyObject,
  _previous:AnyObject = {}
) {
  for ( const key of Object.keys( sourceObject ) ) {
    _previous = handler( key, sourceObject[key], _previous );
  }
  return _previous;
}


export declare type formatDecimalParamsType = {
  decimal?: number | undefined, 
  value: number, 
  ratio?:number
}

/**
 * @description: 保留小数及 比例指令
 * @param {number} option.decimal 保留小数位数
 * @param {number} option.value 原始数据
 * @param {number} option.ratio 比例 
 * @return { string }  如 0.00
 */
export const formatDecimal = ( ()=>{
  
  const ratioSymbol: {[prop: string]: string} = {
    100: '%',
    1000: '‰',
    10000: '‱'
  };

  function generateNumber( decimal:number = 0 ): number {
    return Number( 
      Array.from( { length: decimal } ).reduce( ( prev ) => {
        prev += '0';
        return prev;
      }, '1' ) 
    ); 
  }

  return function formatDecimal( values: formatDecimalParamsType ) {
    const { decimal = 0, ratio } = values;

    let { value } = values;
    if (
      process.env.NODE_ENV === 'development' &&
      ( value === undefined || isNaN( value ) )
    ) {
      console.warn( `请传入正确的 value, 当前value ：${value}` );
    }
    // NaN 转为 0, 或者为undefined时
    ( isNaN( value ) || value === undefined )  && ( value = 0 );

    const divisor = generateNumber( decimal );

    // 如果是整数，并且没有传入 decimals 时 默认保留2位小数
    let result: string | number = Math.round( value * divisor ) / divisor;

    // 处理传入比例
    if ( ratio !== undefined ) {
      result /= ratio;
    }
    
    result = Number.isInteger( result ) && decimal !== undefined ? 
      result.toFixed( decimal ) : 
      result;

    return `${result}${ratio !== undefined ? ratioSymbol[ratio] : ''}­`;
  };
} )();
type AnyFun = ( ...args: any[] ) => void
type CondomOptions = {
  success?: AnyFun,
  catch?: AnyFun,
  finally?: AnyFun
}
/**
 * 处理报错方法，
 * @param {Function} fun 主方法 
 * @description: 捕抓错误及处理
 * @return: 
 */
// eslint-disable-next-line consistent-return
export async  function condom( fun: () => any, options: CondomOptions = {} )
 : Promise<any> {
  const { success, catch: errorFun, finally: finallyFun } = options;
  try {
    const response = await fun();
    if ( success ) {
      success( response );
    }
    return response;
  } catch ( error  ) {
    const { message, stack } = error;
    if ( errorFun ) {
      errorFun( { message, stack } );
    }
  } finally {
    if ( finallyFun ) {
      finallyFun();
    }
  }
}
