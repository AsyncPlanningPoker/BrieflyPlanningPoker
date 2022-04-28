<template>
  <div class="sign-in">

    <BContainer>
      <form class="sign-in__form">
        <BInput
          class="sign-in__label"
          id="form-email"
          label="E-mail"
          type="email"
          @input="updateEmail"
        />

        <BInput
          class="sign-in__label"
          id="form-password"
          label="Password"
          link="/password_reset"
          link-label="forgot password?"
          type="password"
          @input="updatePassword"
          @keyup.enter="login"
        />

        <div class="sign-in__label error">
          <span> {{ this.$store.state.signIn.errorMessage }} </span>
        </div>

        <BButton 
          type="button" 
          value="login"
          @click="login"
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

  props: {},
  
  methods: {
    updateEmail (e) {
      this.$store.commit('updateEmail', e.target.value)
      this.$store.commit('updateErrorMessage', '')
    },
    updatePassword (e) {
      this.$store.commit('updatePassword', e.target.value)
      this.$store.commit('updateErrorMessage', '')
    },
    login(){

      const email = this.$store.state.signIn.email
      const password = this.$store.state.signIn.password
      
      if(!email){
        this.$store.commit('updateErrorMessage', "email is required")
      } 
      else if(!new RegExp('[a-z0-9]+(([.]|[-]|[_])[a-z0-9]+)?@[a-z]+([.][a-z]{2,3})+').test(email)){
        this.$store.commit('updateErrorMessage', "email is invalid")
      }
      else if(!password){
        this.$store.commit('updateErrorMessage', "password is required")
      } 
      else if(password.length < 6){
        this.$store.commit('updateErrorMessage', "password must have at least 6 characters")
      } 
      else {
        this.$store.dispatch('login')
      }
    },
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

.registry-button {
  margin-top: var(--unit-1000);
  width: 240px;
}
</style>
