<template>
  <div class="b-container" :class="`b-container--${color}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  color: 'primary' | 'white' | 'gray-10' | 'gray-20' | 'gray-30' | 'black'
}>(),{ color: 'black' });
</script>

<style scoped lang="scss">
.b-container {
  border-radius: var(--unit-0300);
  color: var(--color-white);
  display: grid;
  justify-content: center;
  padding: var(--unit-0400);

  @media (min-width: 768px) {
    padding: var(--unit-1000);
  }
}

@each $color in ('primary', 'white', 'gray-10', 'gray-20', 'gray-30', 'black') {
  .b-container--#{$color} {
    background-color: var(--color-#{$color});
  }
}

.b-container--white {
  color: var(--color-black);
}
</style>
