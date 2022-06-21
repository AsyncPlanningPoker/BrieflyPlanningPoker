<template>
  <div class="sign-in">
    <BBrand/>
    <BContainer>
      <Form
        class="sign-in__form"
        :validation-schema="schema"
        @submit="onSubmit"
        @invalid-submit="onInvalidSubmit"
      >
        <BInputField
          label="E-mail"
          name="email"
          type="email"
        />

        <BInputField
          label="Password"
          link="/password_reset"
          link-label="forgot password?"
          name="password"
          type="password"
          @keyup.enter="login"
        />

        <BButton
          class="sign-in__login-button"
          type="submit"
          text="login"
          value="login"
          @click="login"
        />
      </Form>
    </BContainer>
    
    <BContainer>
      <BButton
        class="sign-in__registry-button" 
        size="small"
        value="create an account"
        @click="$router.push('signup')"
      />
    </BContainer>
  
  </div>
</template>

<script>
import { Form } from "vee-validate";
import * as Yup from "yup";
import BBrand from '../components/b-brand.vue'
import BButton from '../components/b-button.vue'
import BContainer from '../components/b-container.vue'
import BInputField from '../components/b-input-field.vue';

export default {
  name: 'SignIn',
  components: {
    BBrand,
    BButton,
    BContainer,
    BInputField,
    Form,
  },
  setup() {
    function onSubmit() {
      this.$store.dispatch("login");
    };

    function onInvalidSubmit() {};

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const login = 'login'

    return {
      login,
      onSubmit,
      schema,
      onInvalidSubmit,
    };
  },
};
</script>

<style scoped lang="scss">
.sign-in {
  align-content: center;
  background-color: var(--color-black);
  display: grid;
  justify-items: center;
  height:100vh;
  row-gap: var(--unit-1000);
}

.sign-in__form {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0200);
  width: 280px;
}

.sign-in__login-button {
  margin-top: var(--unit-0500);
}

.sign-in__registry-button {
  width: 240px;
}
</style>
