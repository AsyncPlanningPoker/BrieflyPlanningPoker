<template>
  <div class="sign-in">

    <BContainer>
      <form class="sign-in__form" action="/" method="post">
        <BInput
          class="sign-in__label"
          id="form-email"
          label="E-mail"
          type="email"
        />

        <BInput
          class="sign-in__label"
          id="form-password"
          label="Password"
          link="/password_reset"
          link-label="forgot password?"
          type="password"
        />

        <div class="sign-in__label error">
          <span> {{ hasError }} </span>
        </div>

        <BButton 
          type="submit" 
          value="login"
        />

      </form>
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
import BButton from './../components/b-button.vue'
import BContainer from './../components/b-container.vue'
import BInput from './../components/b-input.vue';

export default {
  name: 'SignIn',
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

.error {
  color: var(--color-error);
  justify-self: center;
  min-height: var(--unit-0500);
}

.registry-button {
  margin-top: var(--unit-1000);
  width: 240px;
}
</style>
