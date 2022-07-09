<template>
  <aside 
    class="b-sidebar"
    :class="`${isExpanded ? 'isExpanded' : ''}`"
  >
    <div class="b-sidebar__logo-wrapper">
      <img v-show="isExpanded" class="b-sidebar__image" src="../assets/rectangle-logo-80.png" alt="brand-logo">
      <img v-show="!isExpanded" class="b-sidebar__image" src="../assets/square-logo-80.png" alt="brand-logo">
    </div>

    <div class="b-sidebar__toggle-wrapper">
      <button class="b-sidebar__toggle" @click="toggleSideBar">
        {{ ">.<" }}
      </button>
    </div>

    <div class="b-sidebar__new-squad-wrapper">
      <BButton
        size="small"
        :value="`${isExpanded ? 'new squad' : '+'}`"
        @click="toggleModal"
      />
        <BModal :open="showModal">
          <BSidebarForm @close="toggleModal" />
        </BModal>
    </div>

    <div class="b-sidebar__squad-wrapper">
      <div
        v-for="(squad, index) in squads"
        :key="index"
        class="b-sidebar__squad"
      >
        <BButton
          size="small"
          :transparent="true"
          :value="`${ isExpanded ? squad.squad : (index+1) }`"
        />
      </div>
    </div>
  </aside>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {api} from '../services/api';
import BButton from './b-button.vue';
import BModal from './b-modal.vue';
import BSidebarForm from './b-sidebar-form.vue';

const isExpanded = ref(false);
const toggleSideBar = () => { isExpanded.value = !isExpanded.value };

const showModal = ref(false);
const toggleModal = () => { showModal.value = !showModal.value };

const squads = ref(null);
onMounted(async () => {
    squads.value = (await api.get('squad/7e13d8f9-159e-4bfb-b67f-1f9cd3084813')).data;
});
</script>

<style lang="scss" scoped>
.b-sidebar {
  align-items: center;
  background-color: var(--color-black);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  padding: var(--unit-0300);
  width: calc(80px - var(--unit-0600));

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}

.b-sidebar__toggle-wrapper {
  display: flex;
  margin-top: var(--unit-0300);
}

.b-sidebar__logo-wrapper {
  height: 56px;
  max-width: 156px;

  .b-sidebar__image {
    height: 100%;
    width: 100%;
  }
}

.b-sidebar__new-squad-wrapper,
.b-sidebar__squad-wrapper {
  margin-top: var(--unit-1000);
  width: var(--unit-1000);
}

.b-sidebar__squad-wrapper {
  display: grid;
  row-gap: var(--unit-0500);

  .b-sidebar__squad {
    width: 100%;
  }
}

.isExpanded {
  width: calc(180px - var(--unit-0600));

  .b-sidebar__toggle-wrapper {
    justify-content: flex-end;
    width: 100%;
  }

  .b-sidebar__new-squad-wrapper,
  .b-sidebar__squad-wrapper {
    width: var(--unit-3500);
  }
}
</style>