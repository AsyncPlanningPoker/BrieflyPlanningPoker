<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <aside>
      <BSidebar />
    </aside>

    <main v-if="squad">
      <div class="home__section">
        <BSquad :squad="squad" />
      </div>

      <div class="home__section">
        <BTaskContainer title="Active" :active="true" :tasks="tasksS.enabledTasks" />
      </div>
      <div class="home__section">
        <BTaskContainer title="Archived" :active="false" :tasks="tasksS.disabledTasks" />
      </div>
    </main>

    <main v-else class="home__blank">
      <BText color="gray-30" size="giant" >
        Hey, welcome! Let's poker... (╯°□°)╯︵ ┻━┻
      </BText>
    </main>
  </div>
  <BModal v-if="tasksS.activeTask" color="gray-10" :open="true">
    <BTaskExpanded :task=tasksS.activeTask @close="tasksS.activeTask = undefined" />
  </BModal>
</template>

<script setup lang="ts">

import { computed, onMounted } from 'vue';

import BSidebar from '@/components/b-sidebar.vue';
import BSquad from '@/components/b-squad.vue';
import BTaskContainer from '@/components/b-task-container.vue';
import BTaskExpanded from '@/components/b-task-expanded.vue';
import BText from '@/components/b-text.vue';
import BModal from '@/components/b-modal.vue';
import { squadStore, taskStore } from '@/stores';
import { initialize } from '@/services/events';

const squadS = squadStore();
const tasksS = taskStore();

squadS.$subscribe((mutation, state) => {
  if(state.activeSquad) tasksS.gatherTasks();
});

const squad = computed(() => squadS.activeSquad);

onMounted(() => {
  squadS.gatherSquadList();
  initialize();
});
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

.home__blank {
  align-items: center;
  border-left: var(--unit-0050) solid var(--color-gray-30);
  background-color: var(--color-black);
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
}
</style>
