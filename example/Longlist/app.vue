<template>
  <div>
    <TestCom />
    <!-- <LongList :list='list'>
      <template v-slot='data'>
        <div>{{data.data}}</div>
      </template>
    </LongList> -->
  </div>
</template>

<script>
import LongList from '@/LongList'
import Test from './Test'
import TestCom from '@/LongListTest.tsx'
export default {
  data(){
    return {
      list: []
    }
  },
  mounted(){
    setTimeout(() => {
      this.list = Array.from({ length: 100000 }).map((_, i) => ({ data: i }));
    }, 0);
  },
  components:{
    TestCom,
    LongList
  }
}
</script>

<style lang='scss'>
.xy-long-list-box{
.xy-long-list-container{
  height: 900px;
  overflow: auto;
  .block{
    margin-top: 1000px;
    width: 100px;
    height: 100px;
    background: red;
  }
}
}
</style>