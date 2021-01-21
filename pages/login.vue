<template>
  <section class="login-section container">
    <a href="/" class="login-logo-link"><svg class="icon icon-logo"><use href="#icon-logo"></use></svg></a>
    <form class="login-form" @submit.prevent="submitHandler">
      <div class="form-item" :class="{'validate-error': !validLogin}" >
        <input type="text"  placeholder="Логин" v-model.trim="login">
        <div class="form-item-error"> {{loginError}} </div>
      </div>
      <div class="form-item" :class="{'validate-error': validPassword }" >
        <input type="password" placeholder="Пароль" v-model="password">
        <div class="form-item-error" > {{passwordError}}</div>
      </div>
      <button type="submit" class="btn btn-primary">Войти</button>
    </form>
  </section>
</template>

<script>
  export default {
    name: 'Login',
    layout: 'empty',
    data: () => ({
      validPassword: false,
      minLogin: 3,
      minPassword: 3,
      login: '',
      password: '',
      lsLogin: '',
      lsPassword: ''
    }),
    mounted() {
      const isFirst = !!localStorage.getItem('isFirst')
      if (isFirst) {
        localStorage.setItem('isFirst', false)
        this.login = localStorage.getItem('login') || ''
        this.lsLogin = localStorage.getItem('login') || ''
        this.lsPassword = localStorage.getItem('password') || ''
        this.password = ''
      } else {
        this.$router.push('/register')
      }
    },
    methods: {
      submitHandler () {
        if (this.authState()) {
          this.$store.dispatch('login')
          this.$router.push('/profile')
          return
        }
        this.validPassword = true
      },
      authState() {
        return (this.login === this.lsLogin) && (this.password === this.lsPassword)
      },
    },
    computed: {
      loginError() {
        if (this.login.length < this.minLogin) {
          return `Логин должен содержать минимум ${this.minLogin} символов. Сейчас он ${this.login.length}`
        }
        if (this.login !== this.lsLogin) {
          return 'Не верный логин'
        }
        return ''
      },
      passwordError() {
        if (this.password.length < this.minPassword) {
          return `Пароль должен содержать минимум ${this.minPassword} символов. Сейчас он ${this.password.length}`
        }
        if (this.password !== this.lsPassword) {
          return 'Не верный пароль'
        }
        return ''
      },
      validLogin(){
        return this.login === this.lsLogin
      }
    },
    watch: {
      password: function () {
        this.validPassword = false
      }
    }
  }
</script>
