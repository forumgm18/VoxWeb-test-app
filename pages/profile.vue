<template>
  <article class="article">
    <h1>Мой профиль</h1>
    <div class="content">
      <form class="form-profile" @submit.prevent="submitHandler">
      <div class="form-line col-2">
        <div class="form-column">
          <label class="form-item"
                 :class="{'validate-error': ($v.firstName.$dirty && !$v.firstName.minLength)}"
          >
            <span class="form-label">Имя</span>
            <input type="text" v-model="firstName">
            <div class="form-item-error">Пожалуйста заполните поле</div>
          </label>
          <label class="form-item"
                 :class="{'validate-error': ($v.lastName.$dirty && !$v.lastName.minLength)}"
          >
            <span class="form-label">Фамилия</span>
            <input type="text" v-model="lastName" >
            <div class="form-item-error">Пожалуйста заполните поле</div>
          </label>
        </div>
        <div class="form-column">
          <label class="form-item"
                 :class="{'validate-error': ($v.password.$dirty && !$v.password.minLength)}"
          >
            <span class="form-label">Сменить пароль</span>
            <input type="password" v-model="password">
            <div class="form-item-error">
              Пароль должен содержать минимум {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}
            </div>
          </label>
          <label class="form-item"
                 :class="{'validate-error': ($v.login.$dirty && !$v.login.minLength)}"
          >
            <span class="form-label">Сменить логин</span>
            <input type="text"  v-model="login">
            <div class="form-item-error">
              Пароль должен содержать минимум {{$v.login.$params.minLength.min}} символов. Сейчас он {{login.length}}
            </div>
          </label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Сохранить</button>
    </form>
    </div>
  </article>
</template>

<script>
  import { minLength } from 'vuelidate/lib/validators'
  export default {
    name: "profile",
    middleware: ['auth'],
    data: () => ({
      firstName: '',
      lastName: '',
      login: '',
      password: ''
    }),
    validations: {
      firstName: { minLength: minLength(3) },
      lastName: { minLength: minLength(3) },
      login: { minLength: minLength(3) },
      password: { minLength: minLength(3) }
    },
    mounted () {
      this.firstName = localStorage.firstName || ''
      this.lastName = localStorage.lastName || ''
      this.login = localStorage.login || ''
      this.password = localStorage.password || ''
    },
    methods: {
      submitHandler () {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        try {
          localStorage.setItem('firstName', this.firstName)
          localStorage.setItem('lastName', this.lastName)
          localStorage.setItem('login', this.login)
          localStorage.setItem('password', this.password)
        } catch (e) {}
      }
    }
  }
</script>

<style scoped>

</style>
