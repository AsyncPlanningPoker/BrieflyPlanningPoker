<template>
  <div class="f-leave">
    <BText
      align="left"
      type="p"
      size="large"
    >
      Are you sure you want to leave this squad?
    </BText>
    <div class="f-leave__buttons-container">
      <BButton
        :transparent="true"
        value="no"
        @click="$emit('close')"
      />
      
      <BButton
        value="yes"
        @click="yes"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import BButton from '../components/b-button.vue'
import BText from '../components/b-text.vue';

export default {
  name: 'FLeave',

  components: {
    BButton,
    BText,
  },
};
</script>

<script setup>
const emit = defineEmits(['close'])
const store = useStore();
// const userEmail = computed(() => store.getters.getUserEmail);

function yes() {
  const user = {"email":"lulcca@briefly.com"}
  store.dispatch('leaveSquad', user);
  emit('close');
};
</script>

<style lang="scss" scoped>
.f-leave {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0500);
  width: 280px;
}

.f-leave__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}
</style>