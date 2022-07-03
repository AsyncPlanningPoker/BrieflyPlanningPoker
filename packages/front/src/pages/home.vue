<template>
  <div class="home">
    <BSidebar />
    <main>
      <h1>Home</h1>
      <p>This is the home page!</p>
    </main>
  </div>
</template>

<script setup>
import BSidebar from '../components/b-sidebar.vue';
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