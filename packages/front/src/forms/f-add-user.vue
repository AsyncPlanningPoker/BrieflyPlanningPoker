<template>
  <BForm :schema="schema" class="f-add-user" @submit="onSubmit">
    <div>
      <BInput label="Partner's e-mail" name="email" placeholder="fellow-worker@briefly.com" type="email" />
    </div>
    <div>
      <BButton class="f-add-user__button" size="small" type="submit" value="send" ref="submitButton" />
    </div>
  </BForm>
</template>

<script setup lang="ts">
import BButton from '../components/b-button.vue';
import BInput from '../components/b-input.vue';
import { ref } from 'vue';
import { squadStore } from '@/stores';
import BForm from '@/components/b-form.vue';
import { squadSchemas } from '@briefly/apidef';
import type { ComponentExposed } from 'vue-component-type-helpers';

const submitButton = ref<HTMLButtonElement | null>(null);

const form = ref<ComponentExposed<typeof BForm<typeof schema>> | undefined>();

const squad = squadStore();

const schema = squadSchemas.addUsersSchemaReq.omit({ owner: true });

function onSubmit() {
  const data = form.value?.validatedData;
  if(data) squad.addUser(data);
}
</script>

<style lang="scss" scoped>
.f-add-user {
  align-items: center;
  color: var(--color-white);
  display: grid;
  grid-template-areas: 'email button';
  grid-template-columns: 1fr auto;
  margin-top: var(--unit-0300);
  width: 100%;
}

.f-add-user__button {
  align-items: flex-end;
  margin-left: var(--unit-0500);
  margin-top: var(--unit-0100);
  width: var(--unit-2000);
}
</style>
