<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <e-mune/>
      </el-col>
      <el-col :span="19">
        <life/>
      </el-col>
    </el-row>
    <el-row>
      <artistic/>
    </el-row>
  </div>
</template>

<script>
import EMune from '@/components/index/menu.vue'
import Life from '@/components/index/life.vue'
import Artistic from '@/components/index/artistic.vue'
export default {
  components: {
    EMune,
    Life,
    Artistic
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/index/index.scss";
  @import "@/assets/css/index/life.scss";
  @import "@/assets/css/index/artistic.scss";
</style>
