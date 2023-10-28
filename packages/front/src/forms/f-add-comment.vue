<template>
  <BForm ref="form" @submit="onSubmit">
    <BInput label="Write a comment" color="gray-30" name="comment" type="textarea" @keyup.enter="onKeyup" />
  </BForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BInput from '@/components/b-input.vue';
import BForm from '@/components/b-form.vue';

const form = ref<HTMLFormElement | null>(null);
  
function onKeyup() {
  form.value?.$el.dispatchEvent(new Event('submit', { cancelable: true }));
}

const emit = defineEmits<{
  (event: 'comment', message: string): Promise<void>
}>();

function onSubmit(event: any) {
  emit('comment', event.addComment);
}
</script>
