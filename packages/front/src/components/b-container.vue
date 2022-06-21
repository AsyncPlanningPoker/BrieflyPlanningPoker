<template>
  <div class='container'>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BContainer',
};
</script>

<style scoped lang="scss">
.container {
  background-color: var(--color-gray);
  border-radius: var(--unit-0300);
  color: var(--color-white);
  display: grid;
  justify-content: center;
  padding: var(--unit-1000);
}
</style>
