<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="search" @focus="handleFocus" @blur="handleBlur" @input="handleInput" placeholder="搜索商家或地点" clearable/>
          <el-button type="primarty"><i class="el-icon-search"></i></el-button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, index) in hotPlaceList" :key="index">{{item}}</dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item, index) in searchList" :key="index">{{item}}</dd>
          </dl>
        </div>
        <p class="suggest">
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">美团酒店</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li><i class="refund"><p class="txt">随时退</p></i></li>
          <li><i class="single"><p class="txt">不满意免单</p></i></li>
          <li><i class="overdue"><p class="txt">过期退</p></i></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      isFocus: false,
      hotPlaceList: ['火锅', '火锅', '火锅'],
      searchList: ['烧烤', '烧烤', '烧烤']
      
    }
  },
  computed: {
    isHotPlace: function() {
      return this.isFocus && !this.search
    },
    isSearchList: function() {
      return this.isFocus && this.search
    }
  },
  methods: {
    handleFocus() {
      this.isFocus = true
    },
    handleBlur() {
      setTimeout(() => {
        this.isFocus = false
      }, 200) 
    },
    handleInput() {
      
    }
  }
}
</script>

<style>

</style>