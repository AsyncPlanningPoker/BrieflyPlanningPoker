<template>
  <form
    class="f-task"
    @submit="onSubmit"
    @invalid-submit="onInvalidSubmit"
  >
    <BInputField
      label="Task title"
      name="taskTitle"
    >
      <BInput
        name="taskTitle"
        placeholder="Title"
        type="text"
      />
    </BInputField>

    <BInputField
      label="Task description"
      name="taskDescription"
    >
      <BTextArea
        name="taskDescription"
        placeholder="Description (optional)"
      />
    </BInputField>

    <div class="f-task__buttons-container">
      <BButton
        variant="transparent"
        value="cancel"
        @click="$emit('close')"
      />

      <BButton
        class="f-task__button"
        type="submit"
        value="create"
      />
    </div>
  </Form>
</template>

<script setup lang="ts">
import BButton from '../components/b-button.vue';
import BInput from '../components/b-input.vue';
import BInputField from '../components/b-input-field.vue';
import BTextArea from '../components/b-text-area.vue';
import { ref } from 'vue';
import { taskStore } from '@/stores';

const emit = defineEmits<{ (event: 'close'): void }>();

const task = taskStore();

function onSubmit(values: any) {
  const newTask = {
    name: values.taskTitle,
    description: values.taskDescription,
  };
  task.addTask(newTask)

  emit('close');
}

const submitButton = ref<HTMLButtonElement | null>(null);

function onInvalidSubmit() {
  submitButton.value?.classList.add('invalid');
  setTimeout(() => {
    submitButton.value?.classList.remove('invalid');
  }, 1000);
}
</script>

<style lang="scss" scoped>
.f-task {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0200);
  width: 280px;
}

.f-task__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}
</style>
