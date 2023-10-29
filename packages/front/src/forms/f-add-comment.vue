<template>
  <BForm :schema="schema" ref="form" @submit="onSubmit">
    <BInput label="Write a comment" color="gray-30" name="message" type="textarea" />
  </BForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BInput from '@/components/b-input.vue';
import BForm from '@/components/b-form.vue';
import { taskSchemas } from '@briefly/apidef';
import type { ComponentExposed } from 'vue-component-type-helpers';

const form = ref<ComponentExposed<typeof BForm<typeof schema>> | null>(null);

const schema = taskSchemas.messageSchemaReq;

const emit = defineEmits<{
  (event: 'comment', message: string): Promise<void>
}>();

function onSubmit() {
  if(form.value?.validatedData)
    emit('comment', form.value?.validatedData?.message);
}
</script>
