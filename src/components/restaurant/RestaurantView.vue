<template lang="html">
  <div class="">
    <div class="recommend" v-if="recommendList">
      <h3>商家推荐</h3>
      <div class="recommend-list">
        <div class="recommend-item" v-for="item in recommendList">
          <img alt="" src="//fuss10.elemecdn.com/1/5d/9d714967f453bd3265ed3963b1c7ejpeg.jpeg?imageMogr/format/webp/thumbnail/240x/">
          <div>
            <div class="title">{{ item.rate_name }}</div>
            <div class="sales">月售{{ item.month_sales }} 好评率{{ item.satisfy_rate }}%</div>
            <div class="add-cart">
              <span><small>¥</small>{{ item.price }}</span>
              <span>
                <a href="javascript:" role="button" aria-label="添加商品">
                  <svg viewBox="0 0 44 44" id="cart-minus" width="100%" height="100%" style="fill: rgb(35, 149, 255);">
                    <path fill="none" d="M0 0h44v44H0z"></path>
                    <path fill-rule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clip-rule="evenodd"></path>
                  </svg>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-view" style="height: 1252px;">
      <aside>
        <ul class="menu-view-list">
          <li :class="activeIndex==index?'active':''" v-for="list,index in menuList" :key="list.ID" @click="showTab(index)">
            <img v-if="list.icon_url!=''" :src="imgUrl(list.icon_url)">
            <span>{{ list.name }}</span>
          </li>
        </ul>
      </aside>
      <section class="menu-content-list" v-if="menuList">
        <div class="scroller">
          <dl class="" v-for="menu_item in menuList" :key="menu_item.menu_id">
            <dt class="category-title" role="heading" :aria-label="menu_item.description">
              <strong class="category-name">{{ menu_item.name }}</strong>
              <span>{{ menu_item.description }}</span>
            </dt>
            <dd v-for="food in menu_item.foods" :key="food.item_id" >
              <span class="food-detail">
                <img :alt="food.name" :title="food.name" :src="imgUrl(food.image_path)" />
              </span>
              <section class="food-detail-info">
                <p class="food-detail-name">{{ food.name }}</p>
                <p class="food-detail-desc">{{ food.tips }}</p>
                <p class="food-detail-sales">
                  <span>月售814份</span>
                  <span>好评率100%</span>
                </p>
                <div class="food-detail-btn">
                  <span class="price">4.8</span>
                  <a class="btn" href="javascript:" role="button" aria-label="添加商品" @click="addCart(food.item_id, 1, food.price)">
      							<svg viewBox="0 0 44 44" id="cart-minus" width="100%" height="100%" style="fill: rgb(35, 149, 255);">
                      <path fill="none" d="M0 0h44v44H0z"></path>
                      <path fill-rule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clip-rule="evenodd"></path>
                    </svg>
      						</a>
                </div>
              </section>
            </dd>
          </dl>
        </div>
      </section>
    </div>

    <!--  footer cart -->
    <footer class="cartview">
      <div class="cartview-cartbody">
        <div class="cartview-cartheader">
          <div class="cartview-headerText">
            <span>已选商品</span>
          </div>
          <a href="javascript:" class="cartview-cartheaderRemove">
            <svg><use xlink:href="#cart-remove"></use></svg>
            <span>清空</span>
          </a>
        </div>
      </div>
      <div class="cart-footer">
        <span class="cart-icon" role="button" aria-label="购物车" :attr-quantity="totalCount"><span>{{ totalCount }}</span></span>
        <div class="btn" role="button">
          <p class="cart-total">
            <span class="">¥92</span>
          </p>
          <p>另需配送费9元</p>
        </div>
        <a role="button" href="javascript:;" class="submit-btn" @click="calculate()"><span>去结算</span></a>
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'restaurantView',
  props: ['rest_id'],
  data(){
    return {
      recommendList: null,
      menuList: null,
      activeIndex: 0,
      totalCount: 0,
      cartList: []
    }
  },
  methods:{
    showTab(index){
      this.activeIndex = index;
      console.log(document.querySelectorAll('.scroller dl')[index].offsetTop)
      document.querySelector('.scroller').scrollTop = document.querySelectorAll('.scroller dl')[index].offsetTop;
    },
    async addCart (id, count, price) {
      let headers = {};
      if(this.$store.state.token){
        headers['x-token'] = this.$store.state.token;
      }
      try{
        let json = (await this.axios.post(`cart/${id}/${count}`,{}, { headers})).data;

        if(json.OK) {
          this.totalCount += 1;
          this.cartList.push({ id: id, count: count, price: price});
        }else{
          alert('添加失败'+json.msg);
        }
      }catch(e){
        alert('网络连接失败')
      }
    }
  },
  async mounted () {
    try{
      let menuList = (await this.axios.get(`menu/${this.rest_id}`)).data;
      let arr = [];
      for(let m in menuList){
        arr.push(menuList[m]);
      }
      arr.sort((obj1, obj2) => {
        return Number(obj1.menu_id) - Number(obj2.menu_id);
      });
      this.menuList = arr;
    }catch(e){
      console.log(e)
    }
  },
}
</script>

<style lang="css">
</style>
