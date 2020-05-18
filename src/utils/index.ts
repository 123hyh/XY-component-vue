type ResizableElemParams = {
  element: HTMLElement;
  minwidth: number;
  minheight: number;
};
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
  constructor({ element, minwidth, minheight }: ResizableElemParams) {
    this.element = element;
    this.minheight = minheight;
    this.minwidth = minwidth;
    this.state = false;
  }

  /**
   * @returns {CSSStyleDeclaration}
   */
  get style() {
    return window.getComputedStyle(this.element);
  }

  /**
   * 调整大小
   */
  public resizable() {
    let nodese = this._createSe('resizable-se');
    let [mousedownX, mousedownY, width, height] = [0, 0, 0, 0];

    // 鼠标按下
    nodese.addEventListener('mousedown', (event) => {
      this.state = true; // 设置状态位
      [mousedownX, mousedownY, width, height] = [
        event.clientX, // 鼠标按下时X坐标
        event.clientY, // 鼠标按下时Y坐标
        Number.parseFloat(this.style.width), // 获取元素宽度
        Number.parseFloat(this.style.height), // 获取 元素高度
      ];

      // 鼠标拖动
      function handlerMousemove(this: Resizable, event: MouseEvent) {
        if (this.state) {
          let w = width + (event.clientX - mousedownX); // 调整后的宽度
          let h = height + (event.clientY - mousedownY); // 调整后的高度
          if (w > this.minwidth) {
            // 限制最小 宽度
            this.element.style.width = w + 'px';
          }
          if (h > this.minheight) {
            // 限制最小 高度
            this.element.style.height = h + 'px';
          }
        }
      }

      document.addEventListener('mousemove', handlerMousemove.bind(this));

      // 鼠标松开
      this.element.addEventListener('mouseup', () => {
        this.state = false; // 重置状态位
        document.removeEventListener('mousemove', handlerMousemove.bind(this)); // 销毁事件
      });
    });
  }
  private _createSe(className: string) {
    let node = document.createElement('div');
    node.className = className;
    this.element.appendChild(node);
    return node;
  }
}

/**
 * 注册缩放元素
 * @param {HTMLElement} element html元素
 * @param {number} minwidth 最小宽度
 * @param {number} minheight 最小高度
 */
export function registerResizable({
  element,
  minwidth,
  minheight,
}: ResizableElemParams) {
  const instance = new Resizable({ element, minwidth, minheight });
  instance.resizable();
  return instance;
}

/**
 * 获取数据的类型
 * @param {any} params
 */
export function getType(params: any) {
  return Object.prototype.toString
    .call(params)
    .slice(8, -1)
    .toLowerCase();
}

/**
 * 判断数据是否为 undefined
 * @param {any} data
 */
export function isUndef(data: any) {
  return data === undefined;
}

function forEach<T>(newData: T, handler: (key: any, newData: T) => any) {
  return function forEach(prevData: T) {
    const OBJ_TYPE = getType(prevData);
    if (OBJ_TYPE === 'object') {
      for (const key in prevData) {
        handler([key, prevData[key]], newData);
      }
    } else {
      for (const item of <any>prevData) {
        handler(item, newData);
      }
    }

    return newData;
  };
}

type CloneDataType = 'array' | 'object' | 'map' | 'set';

type cloneDataConf = {
  [key in CloneDataType]: typeof forEach;
};

const cloneDataConf = {
  array: forEach(Array.of<any>(), (item, newData) => {
    newData.push(cloneData(item));
  }),
  object: forEach(Object.assign({}), ([key, value], newData) => {
    newData[key] = cloneData(value);
  }),
  map: forEach(new Map(), ([key, value], newData) => {
    newData.set(key, cloneData(value));
  }),
  set: forEach(new Set(), (value, newData) => {
    newData.add(cloneData(value));
  }),
};

/**
 * 深克隆数据
 * @param {T} data 数据
 * @returns {T} data
 */
export function cloneData<T extends Object>(data: T): T {
  const DATA_TYPE = getType(data);
  // eslint-disable-next-line no-prototype-builtins
  if (cloneDataConf.hasOwnProperty(DATA_TYPE)) {
    data = (<any>cloneDataConf)[DATA_TYPE](data);
  }
  return data;
}
