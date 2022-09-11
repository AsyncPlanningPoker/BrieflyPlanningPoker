<template>
  <div class="b-card__wrapper">
    <button
      v-for="fibo in fibonacci"
      class="b-card"
      :class="disabled ? 'b-card--disabled' : 'b-card--active'"
      @click="disable"
    >
      <BText
        align="center"
        size="giant"
      >
        {{ fibo }}
      </BText>
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';

import BText from '../components/b-text.vue';

import fibonacci from '../mocks/fibonacci.json';

export default {
  name: 'BCards',

  components: {
    BText,
  },

  data() {
    return { fibonacci };
  },
};
</script>

<script setup>
const disabled = ref(false);
const disable = () => { disabled.value = true };
</script>

<style lang="scss" scoped>
.b-card__wrapper {
  display: flex;
  justify-content: space-evenly;
}

.b-card {
  align-items: center;
  background-color: var(--color-white);
  border: var(--unit-0050) solid var(--color-primary);
  border-radius: var(--unit-0100);
  color: var(--color-primary);
  display: flex;
  height: var(--unit-2000);
  justify-content: center;
  width: var(--unit-1300);
}

.b-card--active {
  cursor: pointer;

  &:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
}

.b-card--disabled {
  background-color: transparent;
  border: none;
  color: var(--color-gray-20);
  cursor: default;
}
</style>