<template>
  <SignIn/>
</template>

<script>
import SignIn from './pages/sign-in.vue';

export default {
  name: 'App',
  components: {
    SignIn,
  }
}
</script>

<style lang="scss">
  @import './styles/global.scss';

  body{
    margin: 0;
    font-family: 'Hammersmith One', sans-serif;
  }
  
</style>
