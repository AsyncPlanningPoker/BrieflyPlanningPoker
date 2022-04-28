<template>
  <div class="pass-recovery-two">
    <BContainer>
      <form class="pass-recovery-two__form">
        <BInput
          class="pass-recovery-two__label"
          id="form-password"
          label="New password"
          type="password"
          @input="updateNewPassword"
        />
        <BInput
          class="pass-recovery-two__label"
          id="form-password-confirmation"
          label="Confirm new password"
          type="password"
          @keyup.enter="update"
          @input="updateConfirmPassword"
        />
        <div class="pass-recovery-two__label error">
          <span>  {{ this.$store.state.passRecoveryTwo.errorMessage }} </span>
        </div>
        <BButton 
          type="button" 
          value="update"
          @click="update"
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
    token:{
      type: String,
    }
  },
  computed: {},

  methods: {
    updateNewPassword (e) {
      this.$store.commit('updateNewPassword', e.target.value)
      this.$store.commit('updateErrorMessage', '')
    },
    updateConfirmPassword (e) {
      this.$store.commit('updateConfirmPassword', e.target.value)
      this.$store.commit('updateErrorMessage', '')
    },
    update(){

      const newPassword = this.$store.state.passRecoveryTwo.newPassword
      const confirmPassword = this.$store.state.passRecoveryTwo.confirmPassword

      if(!newPassword){
        this.$store.commit('updateErrorMessage', "password is required")
      } 
      else if(newPassword.length < 6){
        this.$store.commit('updateErrorMessage', "password must have at least 6 characters")
      } 
      else if(newPassword !== confirmPassword ){
        this.$store.commit('updateErrorMessage', "password not match")
      } 
      else {
        this.$store.dispatch('update', this.token)
      } 
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
