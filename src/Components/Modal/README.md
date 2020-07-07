<!--
 * @Author: huangyuhui
 * @since: 2020-07-07 09:05:54
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-07 09:13:30
 * @message: 
 * @FilePath: \XY-component-vue\src\Components\Modal\README.md
--> 
# 模态窗组件

`import { XyModal } from xy-components-vue`

##  1. props 参数：

  | 通用属性  | 数据类型 | 描述  | 备注  |
  | ------------ | ------------ | ------------ | ------------ |
  | width |string | 模态窗宽度 | |
  | title|string | 模态窗标题 | |
  | visible|boolean(sync)| 控制模态窗显示 | |
  | customClass|string | 模态窗class自定义类名 | |

***

##  2. event 事件：

| 事件名  | 事件描述   | 备注  |
| ------------ | ------------ | ------------ |
| handleModalClose | 关闭模态窗事件 |