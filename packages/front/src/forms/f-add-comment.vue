<template>
  <BForm :schema="schema" @submit="onSubmit">
    <BInput label="Write a comment" color="gray-30" name="message" type="textarea"/>
  </BForm>
</template>

<script setup lang="ts">
import BInput from '@/components/b-input.vue';
import BForm from '@/components/b-form.vue';
import { taskSchemas } from '@briefly/apidef';
import { taskStore } from '@/stores';

const schema = taskSchemas.messageSchemaReq;
const task = taskStore();

const emit = defineEmits<{
  (event: 'comment', message: string): Promise<void>
}>();

async function onSubmit(data : { message: string }) {
  await task.comment(data.message);
  emit('comment', data.message);
}
</script>
