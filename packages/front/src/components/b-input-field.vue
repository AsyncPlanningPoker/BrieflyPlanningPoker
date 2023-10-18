<template>
  <div class="b-input-field">
    <div class="b-input-field__label">
      <BText
        :for="name"
        :color="color"
        tag="label"
      >
        {{ label }}
      </BText>

      <BText
        v-if="link"
        color="link"
        tabindex="-1"
        tag="a"
        :href="link[0]"
      >
        {{ link[1] }}
      </BText>
    </div>

    <div
      :error="errorMessage"
      :value="inputValue"
      @input="handleChange"
      @blur="handleBlur"
    >
      <slot />
    </div>

    <BText
      class="error"
      color="error"
      size="small"
      tag="div"
    >
      {{ errorMessage }}
    </BText>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import BText from './b-text.vue';

 const props = withDefaults(defineProps<{
    name: string,
    color: 'primary' | 'accent' | 'white' | 'gray-10' | 'gray-20' | 'gray-30' | 'black' | 'link' | 'error' | 'success',
    initial?: [string, number],
    label: string
    link?: [string, []]
  }>(), { color: 'white' });

  const name = toRef(props, 'name');

  const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
  } = useField(name, undefined, {
    initialValue: props.initial,
  });
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
</style>
