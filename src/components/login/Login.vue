<template lang="html">
  <form class="form" action="index.html" method="get" @submit.prevent="login">
    <div class="form-group">
      <input type="email" class="form-control" v-model="username" name="username" id="username" placeholder="输入邮箱">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" v-model="password" name="password" id="password" placeholder="输入密码">
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-default btn-block submit">登录</button>
    </div>
  </form>
</template>

<script>
import '@/assets/css/login.less'

import router from '@/router'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        let headers = {};
        if (this.$store.state.token) {
          headers['x-token'] = this.$store.state.token;
        }
        let json = (await this.axios.get(`user/${this.username}/${this.password}`, { headers })).data;

        if(json.OK) {
          alert('登录成功');
          this.$store.dispatch('updateUser', this.username);
          router.replace('/');
        } else {
          alert('登陆失败 '+json.msg);
        }
      }catch(e) {
        console.log(e)
      }

    }
  }
}
</script>

<style lang="less">
</style>
