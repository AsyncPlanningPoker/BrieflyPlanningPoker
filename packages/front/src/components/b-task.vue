<template>
  <div 
    class="b-task"
    :class="active ?  'b-task--active' : 'b-task--archived'"
    @click="toggleModal"
  >
    <BText
      align="left"
      class="b-task__name"
      size="medium"
      tag="strong"
    >
      {{ name }}
    </BText>

    <div class="b-task__round">
      <font-awesome-icon class="b-task__round-icon" icon="fa-solid fa-arrow-rotate-right" />

      <BText
        align="right"
        size="medium"
        tag="span"
      >
        2/3
      </BText>
    </div>

    <font-awesome-icon class="b-task__archive-icon" icon="fa-solid fa-square-caret-down" />

    <font-awesome-icon class="b-task__delete-icon" icon="fa-solid fa-trash-can" />
  </div>

  <BModal color="gray-10" :open="showModal">
    <BTaskExpanded @close="toggleModal" />
  </BModal>
</template>

<script>
import { ref } from 'vue';

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
    name: {
      type: String,
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
const showModal = ref(false);
const toggleModal = () => { showModal.value = !showModal.value };
</script>

<style lang="scss" scoped>
.b-task {
  background-color: var(--color-white);
  border: none;
  border-radius: var(--unit-0100);
  display: grid;
  grid-template-areas: 'name round round' 'name archive delete';
  grid-template-columns: auto min-content min-content;
  grid-template-rows: min-content min-content;
  grid-column-gap: var(--unit-0300);
  grid-row-gap: 15px;
  height: var(--unit-1600);
  padding: var(--unit-0300);
}

.b-task__name {
  display: -webkit-box;
  grid-area: name;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.b-task__round {
  align-items: center;
  display: flex;
  grid-area: round;
  height: var(--unit-0600);
  justify-content: space-between;
  padding-left: var(--unit-0100);
}

.b-task__round-icon {
  height: 16px;
  width: 16px;
}

.b-task__archive-icon {
  grid-area: archive;
  height: 24px;
  width: 24px;
}

.b-task__delete-icon {
  grid-area: delete;
  height: 22px; //this is intentional, the fa trash icon is larger than archive icon.
  width: 24px;
}

.b-task--active {
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 0 var(--unit-0050) var(--color-accent);
  }
}

.b-task--archived {
  background-color: var(--color-gray-20);
  color: var(--color-gray-30);
  cursor: default;
}

.b-task__icon--large {
  height: var(--unit-0600);
  width: var(--unit-0600);
}
</style>
