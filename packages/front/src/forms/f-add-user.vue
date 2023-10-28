<template>
  <form
    class="f-add-user"
    @submit="onSubmit"
    @invalid-submit="onInvalidSubmit"
  >
    <div>
      <BInputField
        label="Partner's e-mail"
        name="email"
      >
        <BInput
          name="email"
          placeholder="fellow-worker@briefly.com"
          type="email"
        />
      </BInputField>
    </div>

    <div>
      <BButton
        class="f-add-user__button"
        size="small"
        type="submit"
        value="send"
        ref="submitButton"
      />
    </div>
  </Form>
</template>

<script setup lang="ts">
import BButton from '../components/b-button.vue';
import BInput from '../components/b-input.vue';
import BInputField from '../components/b-input-field.vue';
import { ref } from 'vue';
import { squadStore } from '@/stores';

const submitButton = ref<HTMLButtonElement | null>(null);

const squad = squadStore();

function onSubmit(values: any) {
  squad.addUser(values.email);
  // email.value = null;
  submitButton.value?.classList.add('valid');
  setTimeout(() => {
    submitButton.value?.classList.remove('valid');
  }, 1000);
}

function onInvalidSubmit() {
  submitButton.value?.classList.add('invalid');
  setTimeout(() => {
    submitButton.value?.classList.remove('invalid');
  }, 1000);
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
