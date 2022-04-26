<template>
  <div class="pass-recovery-one">
    <BContainer>
      <form class="pass-recovery-one__form" action="/" method="post">
        <BInput
          class="pass-recovery-one__label"
          id="form-email"
          label="Enter your e-mail address and we will send you a password reset link"
          type="email"
        />
        <div class="pass-recovery-one__label error">
          <span> {{ hasError }} </span>
        </div>
        <div class="pass-recovery-one__buttons-container">
          <a href="/signin">
            <BButton
              value="return"
            />
          </a>
          <BButton 
            type="submit" 
            value="send"
          />
        </div>
      </form>
    </BContainer>
  </div>
</template>

<script>
import BButton from './../components/b-button.vue'
import BContainer from './../components/b-container.vue'
import BInput from './../components/b-input.vue';

export default {
  name: 'PassRecoveryOne',
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
.pass-recovery-one {
  align-content: center;
  background-color: var(--color-black);
  display: grid;
  justify-items: center;
  height:100vh;
}

.pass-recovery-one__form {
  width: 280px;
}

.pass-recovery-one__label {
  margin-top: var(--unit-0600);
}

.pass-recovery-one__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}

.error {
  color: var(--color-error);
  justify-self: center;
  min-height: var(--unit-0500);
}
</style>
