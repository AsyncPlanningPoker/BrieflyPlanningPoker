<template>
  <div class="sign-in">

    <BContainer>
      <form class="sign-in__form">
        <BInput
          :value="email" 
          class="sign-in__label"
          id="form-email"
          label="E-mail"
          type="email"
          @input="updateEmail"
        />

        <BInput
          :value="password" 
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

  props: {
    error: {
      type: String,
    },
  },
  
  methods: {
    updateEmail (e) {
      this.$store.commit('updateEmail', e.target.value)
    },
    updatePassword (e) {
      this.$store.commit('updatePassword', e.target.value)
    },
    login(e){
      if(!this.$store.state.signIn.email){
        this.$store.commit('updateErrorMessage', "Email empty")
      } 
      else if(!this.$store.state.signIn.password){
        this.$store.commit('updateErrorMessage', "Password empty")
      } 
      //mudar mensagens
      //validar tamanho max e min, formato?
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
