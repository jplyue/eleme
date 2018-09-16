<template lang="html">
  <form class="form" action="http://localhost:8090/api/user/" method="post" @submit.prevent="fnReg">
    <div class="form-group">
      <input type="email" class="form-control" name="username" v-model="username" id="username" placeholder="输入邮箱">
    </div>
    </div>
    <div class="form-group">
      <input type="password" class="form-control" name="password" v-model="password" id="password" placeholder="输入密码">
    </div>
    <div class="form-group">
      <input type="text" class="form-control verify" name="code" v-model="code" id="code" placeholder="输入验证码">
      <img :src="verifySrc" alt="" @click="refresh_code">
    </div>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-default btn-block submit" :disabled="btnDisabled">{{ regText }}</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'reg',
  data () {
    return {
      username: '',
      password: '',
      btnDisabled: false,
      regText: '注册',
      code: '',
      verifySrc: `http://localhost:8090/api/verifyCode?w=100&h=40&token=${this.$store.state.token}`
    }
  },
  methods: {
    async fnReg () {
      this.btnDisabled = true;
      this.regText = '注册中...';

      console.log({ username: this.username, password: this.password, code: this.code})

      try{
        let headers = {};
        if (this.$store.state.token) {
          headers['x-token'] = this.$store.state.token;
        }
        headers['Content-Type'] = 'application/x-www-form-urlencoded';

        let json = (await this.axios.post('user/', {
                      username: this.username,
                      password: this.password,
                      code: this.code
                    },{ headers })).data;

        if(json.OK) {
          alert('注册成功，请登录')
        } else {
          alert('注册失败'+json.msg)
          this.btnDisabled = false;
          this.regText = '注册'
        }

      }catch(e) {
        console.log(e);
        alert('网络错误，请稍后重试');

        this.btnDisabled = false;
        this.regText = '注册'
      }
    },
    refresh_code () {
      this.verifySrc = `http://localhost:8090/api/verifyCode?w=100&h=40&token=${this.$store.state.token}&t=${Math.random()}`
    }
  }
}
</script>

<style lang="css">
</style>
