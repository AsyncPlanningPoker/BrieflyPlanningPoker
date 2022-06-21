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
          class="sign-in__label"
          label="E-mail"
          name="email"
          type="email"
        />

        <BInputField
          class="sign-in__label"
          label="Password"
          name="password"
          link="/password_reset"
          link-label="forgot password?"
          type="password"
          @keyup.enter="login"
        />

        <BButton 
          type="submit" 
          value="login"
          @click="login"
        />

      </Form>
    </BContainer>
    
    <BContainer>
      <a class="registry-button" href="/signup">
        <BButton
          size="small"
          value="create an account"
        />
      </a>
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
      this.$store.dispatch('login');
    }

    function onInvalidSubmit() {      
      // const submitBtn = document.querySelector(".submit-btn");
      // submitBtn.classList.add("invalid");
      // setTimeout(() => {
      //   submitBtn.classList.remove("invalid");
      // }, 1000);
    }

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    return {
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
  width: 280px;
}

.sign-in__label {
  margin-top: var(--unit-0600);
}

.registry-button {
  margin-top: var(--unit-1000);
  width: 240px;
}
</style>
