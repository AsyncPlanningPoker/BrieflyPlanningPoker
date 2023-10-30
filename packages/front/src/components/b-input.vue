<template>
  <div class="b-input-field">
    <div class="b-input-field__label">
      <BText :for="name" :color="color" tag="label">
        {{ label }}
      </BText>
      <BText v-if="link" color="link" tabindex="-1" tag="a" :href="link[0]">
        {{ link[1] }}
      </BText>
    </div>

    <div @blur="handleBlur">
      <div v-if="type === 'textarea'" class="b-text-area__wrapper">
        <textarea class="b-text-area" :id="name" :name="name" :placeholder="placeholder" :row="row" />
      </div>
      <div v-else class="b-input__wrapper">
        <input class="b-input" :id="name" :max="max" :min="min" :name="name"
          :placeholder="placeholder" :step="step" :type="type" v-model="value" />
      </div>
    </div>

    <BText class="error" color="error" size="small" tag="div">
      {{ errorMessage }}
    </BText>
  </div>
</template>

<script setup lang="ts">
import { inject, type Ref } from 'vue';
import BText from './b-text.vue';

 const props = withDefaults(defineProps<{
    name: string
    color?: 'primary' | 'accent' | 'white' | 'gray-10' | 'gray-20' | 'gray-30' | 'black' | 'link' | 'error' | 'success',
    initial?: string | number | { d: number[]; e: number; s: number; toFixed: () => string },
    label: string
    link?: [string, string],
    max?: number,
    min?: number,
    placeholder?: string,
    step?: number,
    type?: 'email' | 'number' | 'password' | 'text' | 'textarea',
    row?: number
  }>(), { color: 'white', type: 'text'});
  
  const value = inject<Ref<any>>(`Data: ${props.name}`);
  const errorMessage = inject<Readonly<Ref<string>>>(`Error: ${props.name}`);
  if(value?.value && props.initial) value.value = props.initial;

  function handleBlur(){
    return undefined;
  };
  
</script>

<style scoped lang="scss">
.b-input-field {
  display: grid;
  font-family: var(--font-family);
  font-size: var(--unit-0400);
  row-gap: var(--unit-0200);
}

.b-input-field__label {
  display: flex;
  justify-content: space-between;
}
.b-input {
  background-color: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  padding: var(--unit-0200);
  width: 100%;
}

.b-input__wrapper {
  align-items: center;
  background-color: var(--color-white);
  border-radius: var(--unit-0100);
  display: flex;
  height: var(--unit-1000);
  justify-content: start;
}

.b-text-area {
  background-color: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  padding: var(--unit-0200);
  resize: vertical;
  width: 100%;
}

.b-text-area__wrapper {
  background-color: var(--color-white);
  border-radius: var(--unit-0100);
  display: flex;
  justify-content: start;
}
</style>
