<template>
  <div class="m-menu">
    <dl class="nav">
      <dt>全部分类</dt>
      <div @mouseleave="handleLeave">
        <dd v-for="(item, index) in menu" :key="index" @mouseenter="handleEnter">
          <i :class="item.type"/>{{item.name}}<span class="arrow"/>
        </dd>
      </div>
    </dl>
    <div class="detail" v-if="kind" @mouseenter="handleDetailEnter" @mouseleave="handleDetailLeave">
      <template v-for="(item, index) in currentDetail.child">
        <h3 :key="index">{{item.title}}</h3>
        <span v-for="it in item.child" :key="it">{{it}}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: '',
      menu: [
        {type: 'food', name: '美食', child: [
          {title: '美食', child: ['代金券', '甜品饮料', '火锅']}
        ]},
        {type: 'takeout', name: '外卖', child: [
          {title: '外卖', child: ['美团外卖']}
        ]},
        {type: 'hotel', name: '酒店', child: [
          {title: '酒店星级', child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']}
        ]},
        {type: 'homestay', name: '民宿', child: [
          {title: '热门城市', child: ['上海', '成都', '北京']},
          {title: '热门房源', child: ['复式Loft', '别墅']},
        ]},
        {type: 'movie', name: '猫眼电影', child: [
          {title: '热门影院', child: ['SFC上海影城', '万达影城', '大地影院']}
        ]},
        {type: 'airport', name: '机票 / 火车票', child: [
          {title: '机票', child: ['国内机票', '国际/港澳台机票']},
          {title: '火车票', child: ['火车票']}
        ]},
        {type: 'ktv', name: '休闲娱乐 / KTV', child: [
          {title: '休闲娱乐', child: ['足疗按摩', '洗浴/汗蒸', '酒吧']},
          {title: 'KTV', child: ['KTV']}
        ]},
        {type: 'life', name: '生活服务', child: [
          {title: '生活服务', child: ['衣物/皮具洗护', '家政', '搬家运输', '送水']}
        ]},
        {type: 'hair', name: '丽人 / 美发 / 医学美容', child: [
          {title: '丽人', child: ['美发', '美甲美瞳', '美容美体']}
        ]},
        {type: 'marry', name: '结婚 / 婚纱摄影 / 婚宴', child: [
          {title: '结婚', child: ['婚纱摄影', '旅拍', '个性写真']}
        ]},
        {type: 'offspring', name: '亲子 / 儿童乐园 / 幼教', child: [
          {title: '儿童乐园', child: ['儿童游泳', '其他亲自活动']},
          {title: '幼儿教育', child: ['早教中心', '少儿英语']},
          {title: '亲子教育', child: ['儿童摄影', '孕妇写真']},
          {title: '孕妇护理', child: ['月子会所', '产后恢复']},
        ]},
        {type: 'sport', name: '运动健身 / 健身中心', child: [
          {title: '运动健身', child: ['健身中心', '无数场馆', '游泳馆']}
        ]},
        // {type: 'furniture', name: '假装 / 建材 / 家居', child: [
        //   {title: '美食', child: ['代金券', '甜品饮料', '火锅']}
        // ]},
        // {type: 'study', name: '学习培训 / 音乐培训', child: [
        //   {title: '美食', child: ['代金券', '甜品饮料', '火锅']}
        // ]},
        // {type: 'health', name: '医疗健康 / 宠物 / 爱车', child: [
        //   {title: '美食', child: ['代金券', '甜品饮料', '火锅']}
        // ]},
        // {type: 'bar', name: '酒吧 / 密室逃脱', child: [
        //   {title: '美食', child: ['代金券', '甜品饮料', '火锅']}
        // ]},
      ]
    }
  },
  computed: {
    currentDetail: function() {
      return this.menu.filter(item => {return item.type === this.kind})[0]
    }
  },
  methods: {
    handleLeave() {
      this._timer = setTimeout(() => {
        this.kind = ''
      }, 150)
    },
    handleEnter(e) {
      this.kind = e.target.querySelector('i').className
    },
    handleDetailEnter() {
      clearTimeout(this._timer)
    },
    handleDetailLeave() {
      this.kind = ''
    }
  }
}
</script>

<style>

</style>