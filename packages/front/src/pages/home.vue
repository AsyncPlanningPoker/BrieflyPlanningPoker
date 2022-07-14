<template>
  <div class="home">
    <BSidebar />
    <main>
      <h1 v-if="!squad"> Hello world!</h1>
      <h1 v-else> {{ squad }} </h1>
      <p>This is the home page!</p>
    </main>
  </div>
</template>

<script>
import BSidebar from '../components/b-sidebar.vue';

export default {
  name: 'Home',

  components: {
    BSidebar,
  },

  props: {
    squad: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;

  main {
    flex: 1 1 0;

    @media (max-width: 768px) {
      padding-left: var(--unit-2000);
    }
  }
}
</style>