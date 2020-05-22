<template>
  <div class="long">
    <div class="box">
      <div class="block"  ref="block"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
      const ob = new IntersectionObserver(([entris])=>{
        console.log(entris.isIntersecting,entris.intersectionRatio)
      },{
      threshold: [0.3, 0.8]
    })
    ob.observe(this.$refs.block)
  },
}
</script>

<style lang='scss'>
.xy-long-list-box{
.long-list{
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