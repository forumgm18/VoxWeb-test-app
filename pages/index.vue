<template>
  <div class="container"></div>
</template>

<script>
  export default {
    layout: 'empty',
    mounted () {
      if (localStorage.getItem('isFirst')) {
        localStorage.setItem('isFirst', false)
        this.$router.push('/login')
      } else {
        this.$router.push('/register')
      }
    }
  }
</script>
