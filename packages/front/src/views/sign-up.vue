<template>
  <div class="sign-up">
    <BBrand />

    <BContainer color="gray-30">
      <Form
        class="sign-up__form"
        :validation-schema="schema"
        @submit="onSubmit"
        @invalid-submit="onInvalidSubmit"
      >
        <BInputField
          label="Name"
          name="name"
        >
          <BInput
            name="name"
            type="text"
            @input="updateName"
          />
        </BInputField>

        <BInputField
          label="E-mail"
          name="email"
        >
          <BInput
            name="email"
            type="email"
            @input="updateEmail"
          />
        </BInputField>

        <BInputField
          label="Password"
          name="password"
        >
          <BInput
            name="password"
            type="password"
            @input="updatePassword"
          />
        </BInputField>

        <BInputField
          label="Confirm password"
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
          {{ signUp.errorMessage }}
        </BText>

        <div class="sign-up__buttons-container">
          <BButton
            variant="transparent"
            value="return"
            @click="$router.push('signin')"
          />

          <BButton
            class="sign-up__create-button"
            type="submit"
            value="create"
            ref="submitButton"
          />
        </div>
      </Form>
    </BContainer>

    <BText
      class="sign-up__terms"
      size="small"
      tag="p"
    >
      By creating an account, you agree to the <a href="#">Terms of Service</a>.
    </BText>
  </div>
</template>

<script setup lang="ts">
import BBrand from '../components/b-brand.vue';
import BButton from '../components/b-button.vue';
import BContainer from '../components/b-container.vue';
import BInput from '../components/b-input.vue';
import BInputField from '../components/b-input-field.vue';
import BText from '../components/b-text.vue';
import { signUpStore } from '@/stores';
import { ref } from 'vue';

const submitButton = ref<HTMLButtonElement | null>(null);

const signUp = signUpStore();

function onSubmit() {
  signUp.register();
}

function onInvalidSubmit() {
  submitButton.value?.classList.add('invalid');
  setTimeout(() => {
    submitButton.value?.classList.remove('invalid');
  }, 1000);
}

function updateName({ target }: Event & { target: HTMLInputElement }) {
  signUp.name = target.value;
}

function updateEmail({ target }: Event & { target: HTMLInputElement }) {
  signUp.email = target.value;
}

function updatePassword({ target }: Event & { target: HTMLInputElement }) {
  signUp.password = target.value;
}

function updateConfirmPassword({ target }: Event & { target: HTMLInputElement }) {
  signUp.confirmPassword = target.value;
}

const schema = Yup.object().shape({
  name: Yup.string().max(55).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).trim().noWhitespace().required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'passwords do not match')
    .required(),
});
</script>

<style scoped lang="scss">
.sign-up {
  align-content: center;
  background-color: var(--color-black);
  display: grid;
  justify-items: center;
  min-height: 100vh;
  row-gap: var(--unit-1000);
}

.sign-up__form {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0200);
  width: 280px;
}

.sign-up__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}

.sign-up__terms {
  color: var(--color-white);
  margin-top: var(--unit-0200);
}
</style>
