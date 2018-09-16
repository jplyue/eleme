<template lang="html">
  <div class="restaurant-page">
    <div class="">
      <nav>
        <router-link class="router-back" :to="{ name: 'listRestaurant' }"></router-link>
      </nav>
      <!--  -->
      <div class="res-info" v-if="restData">
        <div class="res-logo">
          <img :src="imgUrl(restData.image_path)">
        </div>
        <div class="title">
          <h2>
            <span>{{ restData.name }}</span>
            <i class="arrow-right"></i>
          </h2>

        </div>
        <div class="delivery">
          <span>评价{{ restData.rating }}</span>
          <span>月售{{ restData.recent_order_num }}单</span>
          <span>商家配送约{{ restData.distance | filDistance }}</span>
        </div>
        <div class="activity">
          <span class="tag"><em>满减</em>满减</span>
          <span>满40减23，满80减34，满120减45</span>
          <span>7个优惠</span>
        </div>
        <div class="broadcast">
          公告：我们致力于为广大吃货提供最优质的夜宵产品，有颜值有担当，欢迎一路同行！
        </div>
      </div>
    </div>

    <!--  tab-->
    <div class="shop-tab">
    	<div :class="activeIndex==menu.type?'shop-tab-item active':'shop-tab-item'" v-for="menu in menuList" @click="activeTab(menu.type)">
    		<span>{{ menu.title }}</span>
    	</div>
    </div>

    <!--  content -->
    <transition name="{in:'slide',out:'fade'}">
      <RestaurantView v-if="activeIndex=='menu'" :rest_id="restaurant_id"/>
    </transition>

    <transition name="{in:'slide',out:'fade'}">
      <RateView v-if="activeIndex=='rate'"/>
    </transition>
    <transition name="{in:'slide',out:'fade'}">
      <InfoView v-if="activeIndex=='info'"/>
    </transition>

  </div>
</template>

<script>
import '@/assets/css/restaurant.less'

import RestaurantView from './RestaurantView'
import RateView from './RateView'
import InfoView from './InfoView'
import router from '@/router'

export default {
  data(){
    return{
      activeIndex: 'menu',
      restData: null,
      restaurant_id: this.$route.params.id,
      menuList: [{
        title: '点餐',
        type: 'menu'
      },{
        title: '评价',
        type: 'rate'
      },{
        title: '商家',
        type: 'info'
      }],
    }
  },
  methods:{
    activeTab(type){
      this.activeIndex = type;
      let {id} = this.$route.params;
      router.replace(`/restaurant/${id}/${type}`);
    }
  },
  filters: {
    filDistance (distance) {
      return distance>=1000?`${(distance/1000).toFixed(2)}km`:`${distance}m`
    },
    filTime (time) {
      time = parseInt(time);
      return time<60?`${time}分钟`:`${Math.round(time/60)}小时${time%60}分钟`
    }
  },
  async mounted(){
    let {id, menu} = this.$route.params;

    try{
      this.restData = (await this.axios.get(`restaurant/${id}`)).data[0];
      this.activeIndex = menu=='menu'?'menu':(menu=='rate'?'rate':'info');
    }catch(e){
      console.log(e)
    }

  },
  components: { RestaurantView, RateView, InfoView }
}
</script>

<style lang="css">
</style>
