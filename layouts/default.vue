<template>
  <div class="container layout">
    <mobile-header :sidebarOpen="sidebarOpen" @sidebartoggle="sidebarToggle"/>
    <sidebar :sidebarOpen="sidebarOpen" @sidebartoggle="sidebarToggle"/>
    <Nuxt />
  </div>
</template>
<script>
import sidebar from "@/components/sidebar"
import mobileHeader from "@/components/mobile-header"
export default {
  components: {sidebar, mobileHeader},
  data: () => ({
    sidebarOpen: false
  }),
  mounted(){
    this.sidebarOpen = window.innerWidth > 768
  },
  methods: {
    sidebarToggle (sidebarState) {
      this.sidebarOpen = sidebarState
    },
  }
}
</script>
