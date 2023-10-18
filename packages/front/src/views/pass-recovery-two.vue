<template>
  <div class="pass-recovery-two">
    <BBrand />

    <BContainer color="gray-30">
      <Form
        class="pass-recovery-two__form"
        :validation-schema="schema"
        @submit="onSubmit"
        @invalid-submit="onInvalidSubmit"
      >
        <BInputField
          label="New password"
          name="password"
        >
          <BInput
            name="password"
            type="password"
            @input="updateNewPassword"
          />
        </BInputField>

        <BInputField
          label="Confirm new password"
          name="confirmPassword"
        >
          <BInput
            name="confirmPassword"
            type="password"
            @input="updateConfirmPassword"
          />
        </BInputField>

        <BText
          class="error"
          size="small"
          tag="div"
        >
          {{ this.$store.state.passRecoveryTwo.errorMessage }}
        </BText>

        <BButton
          class="pass-recovery-two__submit-button"
          type="submit"
          value="update"
          ref="submitButton"
        />
      </Form>
    </BContainer>
  </div>
</template>

<script setup lang="ts">
import BBrand from './../components/b-brand.vue';
import BButton from './../components/b-button.vue';
import BContainer from './../components/b-container.vue';
import BInput from './../components/b-input.vue';
import BInputField from '../components/b-input-field.vue';
import BText from '../components/b-text.vue';
import { passRecoveryTwoStore } from '@/stores';
import { ref } from 'vue';

const submitButton = ref<HTMLButtonElement | null>(null);

const psTwo = passRecoveryTwoStore();
const props = defineProps<{ token: string }>();

function onSubmit() {
  psTwo.update(props.token);
}

function onInvalidSubmit() {

  submitButton.value?.classList.add('invalid');
  setTimeout(() => {
    submitButton.value?.classList.remove('invalid');
  }, 1000);
}

function updateNewPassword(e: Event & { target: HTMLInputElement }) {
  psTwo.newPassword = e.target.value;
}

function updateConfirmPassword(e: Event & { target: HTMLInputElement }) {
  psTwo.confirmPassword = e.target.value;
}

const schema = Yup.object().shape({
  password: Yup.string().min(6).trim().noWhitespace().required(),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'passwords do not match'),
});
</script>

<style scoped lang="scss">
.pass-recovery-two {
  align-content: center;
  background-color: var(--color-black);
  display: grid;
  justify-items: center;
  min-height: 100vh;
  row-gap: var(--unit-1000);
}

.pass-recovery-two__form {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0200);
  width: 280px;
}
</style>
