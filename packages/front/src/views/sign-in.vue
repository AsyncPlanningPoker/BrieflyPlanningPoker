<template>
  <div class="sign-in">
    <BBrand />
    <BContainer color="gray-30">
      <BForm class="sign-in__form" @submit="onSubmit" :schema="schema" ref="form">
        <BInput label="E-mail" name="email" type="email" />
        <BInput label="Password" :link="['/password_reset', 'forgot password?']" name="password" type="password" />
        <BText class="error" size="small" tag="div">
          {{ errorMessage }}
        </BText>
        <BButton class="sign-in__login-button" type="submit" value="login" />
      </BForm>
    </BContainer>

    <BContainer color="gray-30">
      <BButton class="sign-in__registry-button" size="small" value="create an account" @click="$router.push('signup')" />
    </BContainer>
  </div>
</template>

<script setup lang="ts">
import BBrand from '../components/b-brand.vue';
import BButton from '../components/b-button.vue';
import BContainer from '../components/b-container.vue';
import BInput from '../components/b-input.vue';
import BText from '../components/b-text.vue';
import { ref } from 'vue';
import { userStore } from '@/stores';
import { userSchemas } from '@briefly/apidef';
import BForm from '@/components/b-form.vue';
import type { ComponentExposed } from 'vue-component-type-helpers';
import router from '@/router';

const schema = userSchemas.loginSchemaReq;
const form = ref<ComponentExposed<typeof BForm<typeof schema>> | undefined>();
const user = userStore();
const errorMessage = user.errorMessage;

async function onSubmit() {
  const data = form.value?.validatedData;
  if(data) {
    user.login(data);
    router.push("/");
  }
  else console.error("No data!");
}
</script>

<style scoped lang="scss">
.sign-in {
  align-content: center;
  background-color: var(--color-black);
  display: grid;
  justify-items: center;
  min-height: 100vh;
  row-gap: var(--unit-1000);
}

.sign-in__form {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0200);
  width: 280px;
}

.sign-in__registry-button {
  width: 240px;
}
</style>
