<template>
  <section class="m-istyle">
    <dl>
      <dt>有格调</dt>
      <dd :class="{active: kind === 'all'}" keyword="景点">全部</dd>
      <dd :class="{active: kind === 'part'}" keyword="美食">约会聚餐</dd>
      <dd :class="{active: kind === 'spa'}" keyword="丽人">丽人SPA</dd>
      <dd :class="{active: kind === 'movie'}" keyword="电影">电影演出</dd>
      <dd :class="{active: kind === 'travel'}" keyword="旅游">品质出游</dd>
    </dl>
  </section>
</template>

<script>
export default {
 data () {
   return {
     kind: 'all'
   }
 }
}
</script>

<style>
</style>