<template>
  NAO USE
</template>
<!-- <template>
  <div class="pass-recovery-one">
    <BBrand />

    <BContainer color="gray-30">
      <Form
        class="pass-recovery-one__form"
        :validation-schema="schema"
        @submit="onSubmit"
        @invalid-submit="onInvalidSubmit"
      >
        <BInputField
          label="Enter your e-mail address and we will send you a password reset link"
          name="email"
        >
          <BInput
            name="email"
            type="email"
            @input="updateEmail"
          />
        </BInputField>

        <BText
          class="error"
          size="small"
          tag="div"
        >
          {{ psOne.errorMessage }}
        </BText>

        <div class="pass-recovery-one__buttons-container">
          <BButton
            variant="transparent"
            value="return"
            @click="$router.push('signin')"
          />

          <BButton
            class="pass-recovery-one__send-button"
            type="submit"
            value="send"
            ref=""
          />
        </div>
      </Form>
    </BContainer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BBrand from './../components/b-brand.vue';
import BButton from './../components/b-button.vue';
import BContainer from './../components/b-container.vue';
import BInput from './../components/b-input.vue';
import BInputField from '../components/b-input-field.vue';
import BText from '../components/b-text.vue';
import { passRecoveryOneStore } from '@/stores';

const submitButton = ref<HTMLButtonElement | null>(null);
const psOne = passRecoveryOneStore();

function onSubmit(): void {
  psOne.recovery();
}

function onInvalidSubmit(): void {
  submitButton.value?.classList.add('invalid');
  setTimeout(() => {
    submitButton.value?.classList.remove('invalid');
  }, 1000);
}

function updateEmail(e: Event & { target: HTMLInputElement }): void {
  psOne.email = e.target.value
}

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
});
</script>

<style scoped lang="scss">
.pass-recovery-one {
  align-content: center;
  background-color: var(--color-black);
  display: grid;
  justify-items: center;
  min-height: 100vh;
  row-gap: var(--unit-1000);
}

.pass-recovery-one__form {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0200);
  width: 280px;
}

.pass-recovery-one__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}
</style> -->
