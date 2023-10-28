<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="sign-up">
    <BBrand />
    <BContainer color="gray-30">
      <BForm class="sign-up__form" :schema=schema :onSubmit=onSubmit ref="signUpForm">
        <BInput name="name" label="Nome" type="text" />
        <BInput name="email" label="E-mail" type="email" />
        <BInput name="password" label="Password" type="password"/>
        <BInput name="confirmPassword" label="Confirm password" type="password"/>
        <BText class="error" size="small" tag="div">
        </BText>

        <div class="sign-up__buttons-container">
          <BButton variant="transparent" value="return" @click="$router.push('signin')"/>
          <BButton class="sign-up__create-button" :disabled="!signUpForm?.valid" type="submit"
          value="create" ref="submitButton" />
        </div>
      </BForm>
    </BContainer>

    <BText class="sign-up__terms" size="small" tag="p">
      By creating an account, you agree to the <a href="#">Terms of Service</a>.
    </BText>
  </div>
</template>

<script setup lang="ts">
import { ref, toValue } from 'vue';
import BBrand from '../components/b-brand.vue';
import BButton from '../components/b-button.vue';
import BContainer from '../components/b-container.vue';
import BInput from '../components/b-input.vue';
import BText from '../components/b-text.vue';
import BForm from '@/components/b-form.vue';
import { z } from 'zod';
import api from '@/services/api';
import { type ComponentExposed } from 'vue-component-type-helpers'
import { userStore } from '@/stores';
import { userSchemas } from '@briefly/apidef';

const user = userStore();

const signUpForm = ref<ComponentExposed<typeof BForm<typeof schema>> | undefined>();
  
async function onSubmit() {
  const data = toValue(toValue(signUpForm.value?.validatedData));
  console.warn(data);
  if(! data) return;
  try{
    const { token } = await api.createUser(data);
    user.updateUserToken(token);
  } catch(e: unknown){
    console.error(e);
  }
}

  const schema = userSchemas.createSchemaReq.omit({ enabled: true }).extend({
    confirmPassword: z.string()
  }).strict().refine(
    (val) => val.password == val.confirmPassword,
    { 
      message: "The passwords must match!",
      path: ["confirmPassword"]
    }).transform((val) => {
      const v: Partial<typeof val> = val;
      delete v.confirmPassword;
      return v as userSchemas.CreateSchemaReq
    });

// function onInvalidSubmit() {
//   submitButton.value?.classList.add('invalid');
//   setTimeout(() => {
//     submitButton.value?.classList.remove('invalid');
//   }, 1000);
// }
</script>

<style scoped lang="scss">
.sign-up {
  align-content: center;
  background-color: var(--color-black);
  display: grid;
  justify-items: center;
  min-height: 100vh;
  row-gap: var(--unit-1000);
}

.sign-up__form {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0200);
  width: 280px;
}

.sign-up__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}

.sign-up__terms {
  color: var(--color-white);
  margin-top: var(--unit-0200);
}
</style>
