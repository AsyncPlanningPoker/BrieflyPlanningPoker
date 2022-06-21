<template>
  <div class="b-input__wrapper">
    <input class="b-input"
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
    >
  </div>
</template>

<script>
import { shouldBeOneOf } from 'vue-prop-validation-helper';

export default {
  name: 'BInput',
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
      validator: shouldBeOneOf(['text','email','password']),
    },
    placeholder: {
      type: String,
      default: "",
    },
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
  margin-top: var(--unit-0200);
}
</style>
