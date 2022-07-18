<template>
  <div class="squad-render">
    <div class="squad-render__container">
      <div class="squad-render__name-wrapper">
        <BText
          color="white"
          size="giant"
        >
          {{ squad.squad || "Hey, welcome! Let's poker... (╯°□°)╯︵ ┻━┻" }}
        </BText>
      </div>

      <div v-show="squad.squad" class="squad-render__add-wrapper" @click="toggleAddUser">
        <font-awesome-icon icon="fa-solid fa-circle-plus" />
      </div>

      <div v-show="squad.squad" class="squad-render__config-wrapper" @click="toggleModal">
        <font-awesome-icon icon="fa-solid fa-gear" />
      </div>

      <BModal :open="showModal">
        <FCreateSquad :update=true @close="toggleModal" />
      </BModal>
    </div>

    <div v-if="addUser" class="squad-render__add-user-wrapper">
      <FAddUser />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import BInput from '../components/b-input.vue';
import BModal from '../components/b-modal.vue';
import BText from '../components/b-text.vue';
import FAddUser from '../forms/f-add-user.vue';
import FCreateSquad from '../forms/f-create-squad.vue';

export default {
  name: 'BSquadRender',

  components: {
    BInput,
    BText,
  },
}
</script>

<script setup>
const store = useStore();
const squad = computed(() => store.getters.getSquadActive);

const addUser = ref(false);
const toggleAddUser = () => { addUser.value = !addUser.value };

const showModal = ref(false);
const toggleModal = () => { showModal.value = !showModal.value };
</script>

<style lang="scss" scoped>
.squad-render {
  display: grid;
  justify-items: center;
}

.squad-render__container {
  align-items: center;
  background-color: var(--color-black);
  border: var(--unit-0050) solid var(--color-primary);
  border-radius: var(--unit-0500);
  display: grid;
  grid-template-areas: 'name add config';
  grid-template-columns: 1fr auto auto;
  height: var(--unit-1300);
  min-width: 228px;
  padding: var(--unit-0000) var(--unit-0400);
  width: 60vw;
}

.squad-render__name-wrapper {
  display: flex;
  grid-area: name;
  height: var(--unit-0600);
  overflow: hidden;
}

.squad-render__add-wrapper,
.squad-render__config-wrapper {
  align-items: center;
  color: var(--color-white);
  display: flex;
  height: var(--unit-0500);
  justify-content: center;
  margin-left: var(--unit-0800);
  width: var(--unit-0500);

  & > svg {
    cursor: pointer;
    height: 100%;
    width: 100%;
  }

  &:hover {
    color: var(--color-accent);
  }
}

.squad-render__add-wrapper {
  grid-area: add;
}

.squad-render__config-wrapper {
  grid-area: config;
}

.squad-render__add-user-wrapper {
  align-items: center;
  background-color: var(--color-black);
  border: var(--unit-0050) solid var(--color-primary);
  border-radius: var(--unit-0500);
  display: flex;
  height: var(--unit-3000);
  margin-top: var(--unit-0900);
  min-width: 228px;
  padding: var(--unit-0000) var(--unit-0400);
  width: 50vw;
}
</style>