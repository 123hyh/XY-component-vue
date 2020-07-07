# 工具函数文档

## 1. 获取数据的类型 

```javascript
 import { getType } from 'xy-components-vue/utils'

 getType(1)
```

## 2. 校验是否为空对象

```javascript
 import { isEmptyObject} from 'xy-components-vue/utils'

 isEmptyObject(params: object)
```

## 3. 判断数据是否为 undefined

```javascript
 import { isUndef } from 'xy-components-vue/utils'

 isUndef(params: any)
```
## 4. 深克隆数据

```javascript
 import { cloneData } from 'xy-components-vue/utils'

 cloneData(params: any)
```

## 5. 遍历对象（过滤原型链）

```javascript
 import { traversalObject } from 'xy-components-vue/utils'

 traversalObject(params: object)
```

## 6. 节流函数
 
```javascript
 import { throttle } from 'xy-components-vue/utils'

 throttle( date: number, callback: ( ...args: any[] ) => any )
```

## 7. 防抖函数

```javascript
 import { debounce} from 'xy-components-vue/utils'

 debounce(
  time: number, 
  handler: ( ...args: any[] ) => any,
  immediate = false  
 )
```
## 8. 替换html文本标签
 
```javascript
 import { replaceHtmlTag } from 'xy-components-vue/utils'

 replaceHtmlTag( val = '' )
```

## 9. 邮箱正则表达式 

```javascript
 import { Email_REG } from 'xy-components-vue/utils'

```
## 10. 遍历对象
 
```javascript
 import { forObject} from 'xy-components-vue/utils'

 forObject( 
  // 源数据
  sourceObject: AnyObject, 
  // 遍历回调
  handler: (
    key:string, 
    val: any,
    previous :AnyObject

  ) => AnyObject,
  _previous:AnyObject = {}
) 
```

## 11.  保留小数
```javascript
 import { formatDecimal } from 'xy-components-vue/utils'

 formatDecimal( values: {
  decimal?: number | undefined,  // 保留位数
  value: number, // 源数据
  ratio?:number // 生成比例数基数
})
```
## 12.  处理报错方法
```javascript
 import { condom } from 'xy-components-vue/utils'

 condom( fun: () => any, options?: {
  success?: AnyFun,
  catch?: AnyFun,
  finally?: AnyFun
})
```

