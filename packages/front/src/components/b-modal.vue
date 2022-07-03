<template>
  <div class="b-modal__external" v-if="open">
    <div class="b-modal">
      <BContainer>
        <slot />
      </BContainer>
    </div>
  </div>
</template>

<script>
import BContainer from './b-container.vue'

export default {
  name: 'BModal',

  components: {
    BContainer,
  },

  props: {
    open: {
      type: Boolean,
      required: true,
    }
  },
};
</script>

<style lang="scss" scoped>
.b-modal__external {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0,0,0,0.5);
  z-index: 1;
}

.b-modal {
  display: flex;
  justify-content: center;
  margin: 10%;
}
</style>
