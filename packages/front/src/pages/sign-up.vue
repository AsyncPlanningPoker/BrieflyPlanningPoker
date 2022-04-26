<template>
  <div class="sign-up">
    <BContainer>
      <form class="sign-up__form" action="/" method="post">
        <BInput
          class="sign-up__label"
          id="form-username"
          label="Username"
          type="text"
        />
        <BInput
          class="sign-up__label"
          id="form-email"
          label="E-mail"
          type="email"
        />
        <BInput
          class="sign-up__label"
          id="form-password"
          label="Password"
          type="password"
        />
        <BInput
          class="sign-up__label"
          id="form-password-confirmation"
          label="Confirm password"
          type="password"
        />
        <div class="sign-up__label error">
          <span> {{ hasError }} </span>
        </div>
        <div class="sign-up__buttons-container">
          <BButton 
            type="submit" 
            value="return"
          />
          <BButton 
            type="submit" 
            value="create"
          />
        </div>
      </form>
    </BContainer>
    <div class="sign-up__terms">
      By creating an account, you agree to the <a href="#">Terms of Service</a>.
    </div>
  </div>
</template>

<script>
import BButton from './../components/b-button.vue'
import BContainer from './../components/b-container.vue'
import BInput from './../components/b-input.vue';

export default {
  name: 'SignUp',
  components: {
    BButton,
    BContainer,
    BInput,
  },
  props: {
    error: {
      type: String,
    },
  },
  computed: {
    hasError() {
      return this.error;
    }
  },
}
</script>

<style scoped lang="scss">
.sign-up {
  align-content: center;
  background-color: var(--color-black);
  display: grid;
  justify-items: center;
  height:100vh;
}

.sign-up__form {
  width: 280px;
}

.sign-up__label {
  margin-top: var(--unit-0600);
}

.sign-up__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}

.sign-up__terms {
  color: var(--color-white);
  font-size: var(--unit-0300);
  margin-top: var(--unit-0200);
}

.error {
  color: var(--color-error);
  justify-self: center;
  min-height: var(--unit-0500);
}
</style>
