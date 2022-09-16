<template>
  <div 
    class="b-task"
    :class="active ?  'b-task--active' : 'b-task--archived'"
  >
    <div class="b-task__name-wrapper">
      <BText
        align="left"
        class="b-task__name"
        size="medium"
        tag="strong"
        @click="toggleModal"
      >
        {{ task.name }}
      </BText>
    </div>

    <div class="b-task__info-wrapper">
      <div class="b-task__round">
        <font-awesome-icon class="b-task__icon" icon="fa-solid fa-arrow-rotate-right" />

        <BText
          align="right"
          size="medium"
          tag="span"
        >
          ?/{{ task.maxRounds }}
        </BText>
      </div>

      <div class="b-task__buttons">
        <font-awesome-icon
          class="b-task__icon"
          icon="fa-solid fa-square-caret-down"
          @click="store.dispatch('disableTask', task.id)"
        />

        <font-awesome-icon
          class="b-task__icon"
          icon="fa-solid fa-trash-can"
          @click="store.dispatch('deleteTask', task.id)"
        />
      </div>

    </div>
  </div>

  <BModal color="gray-10" :open="showModal">
    <BTaskExpanded @close="toggleModal" />
  </BModal>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

import BModal from '../components/b-modal.vue';
import BTaskExpanded from '../components/b-task-expanded.vue';
import BText from '../components/b-text.vue';

export default {
  name: 'BTask',

  components: {
    BModal,
    BTaskExpanded,
    BText,
  },

  props: {
    task: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<script setup>
const store = useStore();

const showModal = ref(false);
const toggleModal = () => { showModal.value = !showModal.value };
</script>

<style lang="scss" scoped>
.b-task {
  background-color: var(--color-white);
  border: none;
  border-radius: var(--unit-0100);
  display: grid;
  grid-template-areas: 'name' 'info';
  grid-row-gap: var(--unit-0300);
  padding: var(--unit-0200);
}

.b-task__name-wrapper {
  cursor: pointer;
  grid-area: name;
  padding: var(--unit-0200);
}

.b-task__name {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.b-task__info-wrapper {
  grid-area: info;
}

.b-task__buttons, 
.b-task__info-wrapper,
.b-task__round {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.b-task__icon {
  border-radius: var(--unit-5000);
  color: var(--color-gray-30);
  height: var(--unit-0600);
  padding: var(--unit-0200);
  width: var(--unit-0600); 
}

.b-task__buttons > .b-task__icon {
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
}

// .b-task--active {
//   cursor: pointer;

//   &:hover {
//     box-shadow: 0 0 0 var(--unit-0050) var(--color-accent);
//   }
// }

.b-task--archived {
  background-color: var(--color-gray-20);
  color: var(--color-gray-30);

  &:hover {
    background-color: var(--color-gray-10);
  }
}
</style>