<template>
  <div class="home">
    <aside>
      <BSidebarRender />
    </aside>
    
    <main>
      <BSquadRender />
    </main>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

import BSidebarRender from '../renders/b-sidebar-render.vue';
import BSquadRender from '../renders/b-squad-render.vue'

export default {
  name: 'Home',

  components: {
    BSidebarRender,
    BSquadRender,
  },
};
</script>

<script setup>
// THOSE FUNCTIONS ARE NEEDED AND ARE BEIGN USED
//
// THEY MIGHT BE GRAY FOR YOU BECAUSE VECTUR STILL
// DOES NOT WORK PROPERLY WITH VUE3 SCRIPT SETUP

const store = useStore();
onMounted(store.dispatch('addSquadList'))
</script>

<style lang="scss" scoped>
.home {
  background-color: var(--color-gray);
  display: flex;
  height: 100vh;

  aside {
    height: calc(100vh - 24px);
  }
  
  main {
    flex: 1 1 0;
    padding: var(--unit-0300);
    padding-left: var(--unit-0350);

    @media (max-width: 768px) {
      padding-left: calc(var(--unit-2000) + var(--unit-0350));
    }
  }
}
</style>