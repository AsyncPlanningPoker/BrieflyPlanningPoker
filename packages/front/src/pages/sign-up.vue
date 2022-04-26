<template>
  <div class="sign-up">
    <BContainer>
      <form class="sign-up__form">
        <BInput
          class="sign-up__label"
          id="form-name"
          label="Name"
          type="text"
          @input="updateName"
        />
        <BInput
          class="sign-up__label"
          id="form-email"
          label="E-mail"
          type="email"
          @input="updateEmail"
        />
        <BInput
          class="sign-up__label"
          id="form-password"
          label="Password"
          type="password"
          @input="updatePassword"
        />
        <BInput
          class="sign-up__label"
          id="form-password-confirmation"
          label="Confirm password"
          type="password"
          @keyup.enter="registry"
        />
        <div class="sign-up__label error">
          <span> {{ this.$store.state.signUp.errorMessage }} </span>
        </div>
        <div class="sign-up__buttons-container">
          <a href="/signUp">
            <BButton
              value="return"
            />
          </a>
          <BButton 
            type="button" 
            value="create"
            @click="registry"
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

  methods: {
    updateName (e) {
      this.$store.commit('updateName', e.target.value)
      this.$store.commit('updateErrorMessage', '')
    },
    updateEmail (e) {
      this.$store.commit('updateEmail', e.target.value)
      this.$store.commit('updateErrorMessage', '')
    },
    updatePassword (e) {
      this.$store.commit('updatePassword', e.target.value)
      this.$store.commit('updateErrorMessage', '')
    },
    registry(e){
      const name = this.$store.state.signUp.name
      const email = this.$store.state.signUp.email
      const password = this.$store.state.signUp.password

      if(!name){
        this.$store.commit('updateErrorMessage', "name is required")
      }
      else if(!email){
        this.$store.commit('updateErrorMessage', "email is required")
      }
      else if(!new RegExp('[a-z0-9]+(([.]|[-]|[_])[a-z0-9]+)?@[a-z]+([.][a-z]{2,3})+').test(email)){
        this.$store.commit('updateErrorMessage', "email is invalid")
      }
      else if(!password){
        this.$store.commit('updateErrorMessage', "password is required")
      }
      else if(password.length < 6){
        this.$store.commit('updateErrorMessage', "password is too small")
      }
      else {
        this.$store.dispatch('registry')
      }
    },
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
