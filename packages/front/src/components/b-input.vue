<template>
  <div class="b-input__wrapper">
    <input
      class="b-input"
      :id="name"
      :max="max"
      :min="min"
      :name="name"
      :placeholder="placeholder"
      :step="step"
      :type="type"
      :value="value"
    >
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    max?: number,
    min?: number,
    name: string,
    placeholder?: string,
    step?: number,
    type: 'email' | 'number' | 'password' | 'text',
    value?: string | number
  }>(), { type: "text" });
</script>

<style scoped lang="scss">
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
</style>
