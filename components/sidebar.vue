<template>
  <aside class="sidebar" :class="{'active': sidebarOpen}">
    <a href="#" class="sidebar-toggle" @click.prevent="sidebarToggle"><svg class="icon icon-arrow-left"><use href="#icon-arrow-left"></use></svg></a>
    <div class="sidebar-content">
      <div class="sidebar-logo">
        <a href="#" class="burger" :class="{open: sidebarOpen}" @click.prevent="sidebarToggle"><span></span> </a>
        <nuxt-link to="/" class="sidebar-logo-link">
          <svg class="icon icon-logo"><use href="#icon-logo"></use></svg>
        </nuxt-link>
      </div>
      <div class="sidebar-nav">
        <nuxt-link active-class="active" to="/profile" class="sidebar-nav-link">
          <svg class="icon icon-profile"><use href="#icon-profile"></use></svg>
          <span>Мой профиль</span>
        </nuxt-link>
        <nuxt-link active-class="active" to="/todos" class="sidebar-nav-link">
          <svg class="icon icon-product"><use href="#icon-product"></use></svg>
          <span>Список задач</span>
        </nuxt-link>
        <nuxt-link active-class="active" to="/stat" class="sidebar-nav-link">
          <svg class="icon icon-statistics"><use href="#icon-statistics"></use></svg>
          <span>Статистика</span>
        </nuxt-link>
        <a href="#" active-class="active" @click.prevent="logout"  class="sidebar-nav-link">
          <svg class="icon icon-exit"><use href="#icon-exit"></use></svg>
          <span>Выход</span>
        </a>
      </div>
    </div>
  </aside>
</template>

<script>
  export default {
    name: "sidebar",
    props: ['sidebarOpen'],
    methods: {
      sidebarToggle () {
        this.$emit('sidebartoggle', !this.sidebarOpen)
      },
      logout () {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }
    }
  }
</script>
