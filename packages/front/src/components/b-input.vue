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

<script>
import { shouldBeOneOf } from 'vue-prop-validation-helper';

export default {
  name: 'BInput',

  props: {
    max: {
      type: Number,
    },
    min: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    step: {
      type: Number,
    },
    type: {
      type: String,
      default: 'text',
      validator: shouldBeOneOf(['email','number','password','text']),
    },
    value: {},
  },
};
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
