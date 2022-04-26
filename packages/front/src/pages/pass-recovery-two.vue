<template>
  <div class="pass-recovery-two">
    <BContainer>
      <form class="pass-recovery-two__form" action="/" method="post">
        <BInput
          class="pass-recovery-two__label"
          id="form-password"
          label="New password"
          type="password"
        />
        <BInput
          class="pass-recovery-two__label"
          id="form-password-confirmation"
          label="Confirm new password"
          type="password"
        />
        <div class="pass-recovery-two__label error">
          <span> {{ hasError }} </span>
        </div>
        <BButton 
          type="submit" 
          value="update"
        />
      </form>
    </BContainer>
  </div>
</template>

<script>
import BButton from './../components/b-button.vue'
import BContainer from './../components/b-container.vue'
import BInput from './../components/b-input.vue';

export default {
  name: 'PassRecoveryTwo',
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
.pass-recovery-two {
  align-content: center;
  background-color: var(--color-black);
  display: grid;
  justify-items: center;
  height:100vh;
}

.pass-recovery-two__form {
  width: 280px;
}

.pass-recovery-two__label {
  margin-top: var(--unit-0600);
}

.error {
  color: var(--color-error);
  justify-self: center;
  min-height: var(--unit-0500);
}
</style>
