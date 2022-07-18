<template>
  <div 
    class="b-sidebar-render"
    :class="`${isExpanded ? 'isExpanded' : ''}`"
  >
    <div class="b-sidebar-render__logo-wrapper" >
      <a @click="store.dispatch('addSquadActive', {})">
        <img v-show="isExpanded" class="b-sidebar-render__image" src="../assets/rectangle-logo-80.png" alt="brand-logo">
        <img v-show="!isExpanded" class="b-sidebar-render__image" src="../assets/square-logo-80.png" alt="brand-logo">
      </a>
    </div>

    <div class="b-sidebar-render__toggle-wrapper" @click="toggleSideBar">
      <font-awesome-icon v-show="!isExpanded" icon="fa-solid fa-circle-chevron-right" />
      <font-awesome-icon v-show="isExpanded" icon="fa-solid fa-circle-chevron-left" />
    </div>

    <div class="b-sidebar-render__new-squad-wrapper">
      <BButton
        size="small"
        :value="`${isExpanded ? 'new squad' : '+'}`"
        @click="toggleModal"
      />

      <BModal :open="showModal">
        <FCreateSquad @close="toggleModal" />
      </BModal>
    </div>

    <div class="b-sidebar-render__squad-wrapper">
      <div
        v-for="(squad, index) in squads"
        :key="index"
        class="b-sidebar-render__squad"
      >
        <BButton
          size="small"
          :transparent="true"
          :value="`${ isExpanded ? squad.squad : (index+1) }`"
          @click="store.dispatch('addSquadActive', squad)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import BButton from '../components/b-button.vue';
import BModal from '../components/b-modal.vue';
import FCreateSquad from '../forms/f-create-squad.vue';

export default {
  name: 'BSidebarRender',

  components: {
    BButton,
    BModal,
    FCreateSquad,
  },
};
</script>

<script setup>
const store = useStore();
const squads = computed(() => store.getters.getSquadList);

const isExpanded = ref(false);
const toggleSideBar = () => { isExpanded.value = !isExpanded.value };

const showModal = ref(false);
const toggleModal = () => { showModal.value = !showModal.value };
</script>

<style lang="scss" scoped>
.b-sidebar-render {
  align-items: center;
  background-color: var(--color-black);
  border-right: var(--unit-0050) solid var(--color-primary);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: var(--unit-0300);
  width: calc(80px - var(--unit-0600));

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}

.b-sidebar-render__logo-wrapper {
  cursor: pointer;
  height: 56px;
  max-width: 156px;

  .b-sidebar-render__image {
    height: 100%;
    width: 100%;
  }
}

.b-sidebar-render__toggle-wrapper {
  color: var(--color-primary);
  height: var(--unit-0600);
  left: 62px;
  position: fixed;
  top: 92px;
  width: var(--unit-0600);

  & > svg {
    height: 100%;
    width: 100%;
  }
}

.b-sidebar-render__new-squad-wrapper {
  margin-top: var(--unit-2000);
  width: var(--unit-1000);
}

.b-sidebar-render__squad-wrapper {
  margin-top: var(--unit-1000);
  width: var(--unit-1000);
}

.b-sidebar-render__squad-wrapper {
  display: grid;
  row-gap: var(--unit-0500);

  .b-sidebar-render__squad {
    width: 100%;
  }
}

.isExpanded {
  width: calc(180px - var(--unit-0600));

  .b-sidebar-render__toggle-wrapper {
    left: 162px;
  }

  .b-sidebar-render__new-squad-wrapper,
  .b-sidebar-render__squad-wrapper {
    width: var(--unit-3500);
  }
}
</style>