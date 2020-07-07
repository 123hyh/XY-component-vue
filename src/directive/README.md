<!--
 * @Author: huangyuhui
 * @since: 2020-07-07 09:17:08
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-07 09:29:31
 * @message: 
 * @文件相对于项目的路径: \XY-component-vue\src\directive\README.md
--> 
# 自定义指令

`import { resizable, decimal} from xy-components-vue/directive.js`

##  1. 缩放指令（元素可缩放）：

  |  指令名称   | 描述  | 备注  |
  | ------------ | ------------ | ------------ |
  | resizable|string | v-resizable:<绑定的class类名> | |

  `v-resizable:[ className ]`

***

## 2. 小数保留

  `v-decimal="{decimal: 2, value: 21.2121, ratio: [ 100 | 1000 | 1000 ] }"`

  |  指令参数   | 参数描述  | 备注  |
  | ------------ | ------------ | ------------ |
  | value| 原始数据 | 必填 |
  | decimal | 保留小数位数 | 可选 |
  | ratio| 比例 | 可选 |

