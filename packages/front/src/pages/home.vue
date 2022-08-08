<template>
  <div class="home">
    <aside>
      <BSidebar />
    </aside>
    
    <main>
      <BSquad />
    </main>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

import BSidebar from '../components/b-sidebar.vue';
import BSquad from '../components/b-squad.vue'

export default {
  name: 'Home',

  components: {
    BSidebar,
    BSquad,
  },
};
</script>

<script setup>
// THOSE FUNCTIONS ARE NEEDED AND ARE BEIGN USED
//
// THEY MIGHT BE GRAY FOR YOU BECAUSE VECTUR STILL
// DOES NOT WORK PROPERLY WITH VUE3 SCRIPT SETUP
//
// PLEASE, INSTALL VOLAR IF THAT IS THE CASE

const store = useStore();
onMounted(store.dispatch('addSquadList'))
</script>

<style lang="scss" scoped>
.home {
  background-color: var(--color-gray);
  display: flex;
  height: 100vh;
  
  main {
    flex: 1 1 0;
  }
}
</style>