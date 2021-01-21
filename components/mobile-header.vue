<template>
  <div class="sidebar-mobile-header">
    <a href="#" class="burger" :class="{open: sidebarOpen}" @click.prevent="sidebarToggle"><span></span> </a>
    <a href="/" class="sidebar-logo-link">
      <svg class="icon icon-logo"><use href="#icon-logo"></use></svg>
    </a>
  </div>
</template>

<script>
  export default {
    name: "mobile-header",
    props: ['sidebarOpen'],
    methods: {
      sidebarToggle () {
        this.$emit('sidebartoggle', !this.sidebarOpen)
      },
    }
  }
</script>
