<template>
  <div class="sign-in">
    <BBrand />

    <BContainer color="gray-30">
      <Form class="sign-in__form" :validation-schema="schema" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
        <BInputField label="E-mail" name="email">
          <BInput name="email" type="email" @input="updateEmail" />
        </BInputField>

        <BInputField label="Password" link="/password_reset" link-label="forgot password?" name="password">
          <BInput name="password" type="password" @input="updatePassword" />
        </BInputField>

        <BText class="error" size="small" tag="div">
          {{ this.$store.state.signIn.errorMessage }}
        </BText>

        <BButton class="sign-in__login-button" type="submit" value="login" />
      </Form>
    </BContainer>

    <BContainer color="gray-30">
      <BButton class="sign-in__registry-button" size="small" value="create an account" @click="$router.push('signup')" />
    </BContainer>
  </div>
</template>

<script>
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import BBrand from '../components/b-brand.vue';
import BButton from '../components/b-button.vue';
import BContainer from '../components/b-container.vue';
import BInput from '../components/b-input.vue';
import BInputField from '../components/b-input-field.vue';
import BText from '../components/b-text.vue';
import SignIn from '../store';

export default {
  name: 'SignIn',

  components: {
    BBrand,
    BButton,
    BContainer,
    BInput,
    BInputField,
    BText,
    Form,
  },

  setup() {
    function onSubmit() {
      SignIn.dispatch('login');
    }

    function onInvalidSubmit() {
      const submitButton = document.querySelector('.sign-in__login-button');

      submitButton.classList.add('invalid');
      setTimeout(() => {
        submitButton.classList.remove('invalid');
      }, 1000);
    }

    function updateEmail(e) {
      SignIn.commit('updateEmail', e.target.value);
    }

    function updatePassword(e) {
      SignIn.commit('updatePassword', e.target.value);
    }

    function noWhitespace() {
      return this.transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value));
    }

    Yup.addMethod(Yup.string, 'noWhitespace', noWhitespace);

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).trim().noWhitespace().required(),
    });

    return { onSubmit, onInvalidSubmit, updateEmail, updatePassword, schema };
  },
};
</script>

<style scoped lang="scss">
.sign-in {
  align-content: center;
  background-color: var(--color-black);
  display: grid;
  justify-items: center;
  min-height: 100vh;
  row-gap: var(--unit-1000);
}

.sign-in__form {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0200);
  width: 280px;
}

.sign-in__registry-button {
  width: 240px;
}
</style>
