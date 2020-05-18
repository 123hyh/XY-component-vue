<template>
  <div>
    <ZoomComponent :visibled.sync='visibled' />
    <Test />
    <button @click="visibled = !visibled">{{visibled}}</button>
  </div>
</template>

<script>
import { ZoomComponent } from 'vue-component';
import Test from '@/Test'
import {cloneData} from '@/utils'
export default {
  data:_=>({
    visibled:false
  }),
  mounted(){
    const x = {x:new Map([[1,2]]),y(){}}
    const b  = cloneData(x)
    console.log(x.y === b.y)
  },
  components:{
    Test,
    ZoomComponent
  }
}
</script>

<style lang='scss'>

</style>