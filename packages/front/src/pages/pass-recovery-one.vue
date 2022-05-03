<template>
  <div class="pass-recovery-one">
    <BBrand/>
    <BContainer>
      <form class="pass-recovery-one__form">
        <BInput
          class="pass-recovery-one__label"
          label="Enter your e-mail address and we will send you a password reset link"
          type="email"
          @keyup.enter="recovery"
          @input="updateEmail"
        />
        <div class="pass-recovery-one__label error">
          {{ this.$store.state.passRecoveryOne.errorMessage }}
        </div>
        <div class="pass-recovery-one__buttons-container">
          <a href="/signin">
            <BButton
              value="return"
            />
          </a>
          <BButton 
            type="button" 
            value="send"
            @click="recovery"
          />
        </div>
      </form>
    </BContainer>
  </div>
</template>

<script>
import BBrand from './../components/b-brand.vue'
import BButton from './../components/b-button.vue'
import BContainer from './../components/b-container.vue'
import BInput from './../components/b-input.vue';

export default {
  name: 'PassRecoveryOne',
  components: {
    BButton,
    BBrand,
    BContainer,
    BInput,
  },
  methods: {
    updateEmail (e) {
      this.$store.commit('updateEmail', e.target.value)
      this.$store.commit('updateErrorMessage', '')
    },
    recovery(){

      const email = this.$store.state.passRecoveryOne.email
      
      if(!email){
        this.$store.commit('updateErrorMessage', "email is required")
      } 
      else if(!new RegExp('[a-z0-9]+(([.]|[-]|[_])[a-z0-9]+)?@[a-z]+([.][a-z]{2,3})+').test(email)){
        this.$store.commit('updateErrorMessage', "email is invalid")
      }
      else {
        this.$store.dispatch('recovery')
      } 
    }
  }
}
</script>

<style scoped lang="scss">
.pass-recovery-one {
  align-content: center;
  background-color: var(--color-black);
  display: grid;
  justify-items: center;
  height:100vh;
  row-gap: var(--unit-1000);
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

</style>
