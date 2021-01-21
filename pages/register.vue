<template>
  <section class="login-section container">
    <a href="/" class="login-logo-link"><svg class="icon icon-logo"><use href="#icon-logo"></use></svg></a>
    <form class="login-form" @submit.prevent="submitHandler">
      <div class="form-item"
           :class="{'validate-error': ($v.login.$dirty && !$v.login.required) || ($v.login.$dirty && !$v.login.minLength)}"
      >
        <input
          type="text"
          placeholder="Логин"
          v-model.trim="login"
        >
        <div class="form-item-error">
          Логин должен содержать минимум {{$v.login.$params.minLength.min}} символов. Сейчас он {{login.length}}
        </div>
      </div>
      <div
        class="form-item"
        :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
      >
        <input
          type="password"
          placeholder="Пароль"
          v-model="password"
        >
        <div class="form-item-error">
          Пароль должен содержать минимум {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
    </form>
  </section>
</template>

<script>
  import { required, minLength } from 'vuelidate/lib/validators'
  export default {
    name: 'Login',
    layout: 'empty',
    data: () => ({
      login: '',
      password: ''
    }),
    validations: {
      login: { required, minLength: minLength(3) },
      password: { required, minLength: minLength(3) }
    },
    methods: {
      submitHandler () {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        try {
          localStorage.setItem('login', this.login)
          localStorage.setItem('password', this.password)
          localStorage.setItem('isFirst', true)
          this.$store.dispatch('login')
          this.$router.push('/profile')
        } catch (e) {}

      }
    }
  }
</script>
