<template>
  <Form class="f-add-user" :validation-schema="schema" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
    <div class="f-add-user__input-wrapper">
      <BInputField label="Partner's e-mail" name="email">
        <BInput name="email" placeholder="fellow-worker@briefly.com" type="email" />
      </BInputField>
    </div>

    <div class="f-add-user__button-wrapper">
      <BButton class="f-add-user__button" size="small" type="submit" value="send" />
    </div>
  </Form>
</template>

<script>
import { useStore } from 'vuex';
import { Form } from 'vee-validate';
import * as Yup from 'yup';

import BButton from '../components/b-button.vue';
import BInput from '../components/b-input.vue';
import BInputField from '../components/b-input-field.vue';

export default {
  name: 'FAddUser',

  components: {
    BButton,
    BInput,
    BInputField,
    Form,
  },
};
</script>

<script setup>
const store = useStore();

function onSubmit(values) {
  store.dispatch('addUser', values.email);
  const submitButton = document.querySelector('.f-add-user__button');
  submitButton.classList.add('valid');
  setTimeout(() => {
    submitButton.classList.remove('valid');
  }, 1000);
}

function onInvalidSubmit() {
  const submitButton = document.querySelector('.f-add-user__button');
  submitButton.classList.add('invalid');
  setTimeout(() => {
    submitButton.classList.remove('invalid');
  }, 1000);
}

const schema = Yup.object().shape({
  email: Yup.string().email('this e-mail does not seem valid').required(),
});
</script>

<style lang="scss" scoped>
.f-add-user {
  align-items: center;
  color: var(--color-white);
  display: grid;
  grid-template-areas: 'email button';
  grid-template-columns: 1fr auto;
  width: 100%;
}

.f-add-user__button {
  align-items: flex-end;
  margin-left: var(--unit-0500);
  width: var(--unit-2000);
}
</style>
