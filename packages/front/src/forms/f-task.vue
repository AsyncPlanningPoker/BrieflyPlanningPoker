<template>
  <BForm class="f-task" @submit="onSubmit" :schema="schema">
    <BInput label="Task title" name="taskTitle" placeholder="Title" type="text" />
    <BTextArea label="Task description" name="taskDescription" placeholder="Description (optional)" />

    <div class="f-task__buttons-container">
      <BButton variant="transparent" value="cancel" @click="$emit('close')" />
      <BButton class="f-task__button" type="submit" value="create" />
    </div>
  </BForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BButton from '../components/b-button.vue';
import BInput from '../components/b-input.vue';
import { taskStore } from '@/stores';
import BForm from '@/components/b-form.vue';
import type { ComponentExposed } from 'vue-component-type-helpers';
import { squadSchemas } from '@briefly/apidef';

const emit = defineEmits<{ (event: 'close'): void }>();

const task = taskStore();

const schema = squadSchemas.createTaskSchemaReq;

const form = ref<ComponentExposed<typeof BForm<typeof schema>> | undefined>();

function onSubmit() {
  const newTask = form.value?.validatedData;
  if(newTask) task.addTask(newTask);
  emit('close');
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
