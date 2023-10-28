<template>
  <div
    class="b-divisor"
    :class="`b-divisor--${color}`"
  >
    <div
      v-if="button"
      class="b-divisor__button"
      :class="`b-divisor__button--${color}`"
      @click="toggle"
    >
      <font-awesome-icon
        v-show="!toggled"
        icon="fa-solid fa-circle-chevron-down"
      />
      <font-awesome-icon
        v-show="toggled"
        icon="fa-solid fa-circle-chevron-up"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue';

withDefaults(
  defineProps<{
    button: boolean,
    color: 'primary' | 'white' | 'gray-10' | 'gray-20' | 'gray-30' | 'black'
  }>(), { color: 'black', button: false }
);

const emit = defineEmits<{
  (event: 'action'): void
}>();

const toggled = ref(false);
const toggle = () => {
  toggled.value = !toggled.value;
  emit('action');
};
</script>

<style lang="scss" scoped>
.b-divisor {
  align-items: center;
  display: flex;
  height: var(--unit-0050);
  justify-content: center;
  width: 100%;
}

.b-divisor__button {
  margin-top: calc(var(--unit-0100) + var(--unit-0050));
}

@each $color in ('primary', 'white', 'gray-10', 'gray-20', 'gray-30', 'black') {
  .b-divisor--#{$color} {
    border-bottom: var(--unit-0050) solid var(--color-#{$color});
  }

  .b-divisor__button--#{$color} {
    & > svg {
      background-color: var(--color-gray-30);
      color: var(--color-#{$color});
      cursor: pointer;
    }
  }
}
</style>
