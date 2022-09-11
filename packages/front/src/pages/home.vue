<template>
  <div class="home">
    <aside>
      <BSidebar />
    </aside>
    
    <main>
      <div v-if="squad.squad">
        <div class="home__section">
          <BSquad :squad="squad" />
        </div>
        
        <div class="home__section">
          <BSection
            :active=true
            title="Active" 
          />
        </div>

        <div class="home__section">
          <BSection 
            :active=false
            title="Archived"
          />
        </div>
      </div>

      <div v-else>
        <div class="home__section">
          <BText
            color="white"
            size="giant"
          >
            Hey, welcome! Let's poker... (╯°□°)╯︵ ┻━┻
          </BText>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import BSection from '../components/b-section.vue';
import BSidebar from '../components/b-sidebar.vue';
import BSquad from '../components/b-squad.vue'
import BText from '../components/b-text.vue'

export default {
  name: 'Home',

  components: {
    BSection,
    BSidebar,
    BSquad,
    BText,
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
const squad = computed(() => store.getters.getSquadActive);
onMounted(store.dispatch('gatherSquadList'))
</script>

<style lang="scss" scoped>
.home {
  display: flex;

  aside {
    max-width: 68px;
    position: fixed;

    @media (min-width: 768px) {
      max-width: 120px;
    }
  }
  
  main {
    flex: 1 1 0;
    height: 100%;
    margin-left: 68px;
    
    @media (min-width: 768px) {
      margin-left: 120px;
    }
  }
}

.home__section {
  margin-top: var(--unit-0500);
  padding: var(--unit-0300);

  @media (min-width: 768px) {
    padding: var(--unit-0900);
  }

  &:first-child {
    margin-top: var(--unit-0000);
  }
}

// .home__section {
//   margin-top: var(--unit-0500);
//   padding: var(--unit-0400) var(--unit-1000);

//   @media (max-width: 768px) {
//     padding: var(--unit-0300);
//   }

//   &:first-child {
//     margin-top: var(--unit-0000);
//   }
// }
</style>