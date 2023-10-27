<template>
  <div
    class="b-modal__external"
    v-if="open"
  >
    <div class="b-modal">
      <BContainer :color="color">
        <slot />
      </BContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import BContainer from './b-container.vue';
defineProps<{
  open: boolean,
  color?: 'primary' | 'white' | 'gray-10' | 'gray-20' | 'gray-30' | 'black',
}>();
</script>

<style lang="scss" scoped>
.b-modal__external {
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

.b-modal {
  display: flex;
  justify-content: center;
  margin-top: 10vh;
}
</style>
