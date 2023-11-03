<template>
  <BForm class="f-task" @submit="onSubmit" :schema="schema" ref="form">
    <BInput label="Task title" name="name" placeholder="Title" type="text" />
    <BInput label="Task description" name="description" placeholder="Description (optional)" type="textarea"/>
    <BInput :initial="squad.activeSquad?.maxRounds" label="Max rounds" name="maxRounds" :min="1" type="number" />
    <BInput :initial="squad.activeSquad?.percentual" label="Percentual" name="percentual" :max="1" :min="0"
    placeholder="0.25" :step="0.1" type="number" />

    <div class="f-task__buttons-container">
      <BButton variant="transparent" value="cancel" @click="$emit('close')" />
      <BButton class="f-task__button" type="submit" value="create" />
    </div>
  </BForm>
</template>

<script setup lang="ts">
import type { z } from 'zod';
import { squadSchemas } from '@briefly/apidef';
import BButton from '@/components/b-button.vue';
import BInput from '@/components/b-input.vue';
import { squadStore, taskStore } from '@/stores';
import BForm from '@/components/b-form.vue';

const emit = defineEmits<{ (event: 'close'): void }>();

const squad = squadStore();
const task = taskStore();

const schema = squadSchemas.createTaskSchemaReq;

async function onSubmit(data: z.infer<typeof schema>){
    await task.addTask(data);
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
