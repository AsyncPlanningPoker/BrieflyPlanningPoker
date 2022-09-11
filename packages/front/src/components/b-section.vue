<template>
  <BText
    align="left"
    color="white"
    size="giant"
    tag="h1"
  >
    {{ title }}
  </BText>

  <BText
    v-if="active"
    align="left"
    class="b-section__link"
    color="link"
    size="medium"
    tag="span"
    @click="toggleModal"
  >
    create new task
  </BText>

  <div class="b-section__wrapper">
    <BTask
      v-for="(task, index) in tasks"
      :name="task.name"
      :active=active
    />
    <BTask
      v-if="!active"
      v-for="(task, index) in tasks"
      :name="task.name"
      :active=active
    />
    <BTask
      v-if="!active"
      v-for="(task, index) in tasks"
      :name="task.name"
      :active=active
    />
  </div>

  <BModal color="gray-20" :open="showModal">
    <FTask @close="toggleModal" />
  </BModal>
</template>

<script>

import { ref } from 'vue';

import BModal from '../components/b-modal.vue';
import BTask from '../components/b-task.vue';
import BText from '../components/b-text.vue';
import FTask from '../forms/f-task.vue';

import tasks from '../mocks/tasks-active.json';

export default {
  name: 'BSection',

  components: {
    BModal,
    BTask,
    BText,
    FTask,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return { tasks };
  },
};
</script>

<script setup>
const showModal = ref(false);
const toggleModal = () => { showModal.value = !showModal.value };
</script>

<style lang="scss" scoped>
.b-section__wrapper {
  display: grid;
  margin-top: var(--unit-0800);
  row-gap: var(--unit-0200);

  @media (min-width: 768px) {
    // column-gap: var(--unit-0400);
    column-gap: 4vw;
    grid-template-columns: repeat(3, 1fr);
    row-gap: var(--unit-0400);
  }
}

.b-section__link {
  cursor: pointer;
}
</style>
