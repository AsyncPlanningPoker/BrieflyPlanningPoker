<template>
  <div class="b-squad">
    <div 
      v-if="!squad.squad" 
      class="b-squad__container"
    >
      <div class="b-squad__name">   
        <BText
          color="white"
          size="giant"
        >
          Hey, welcome! Let's poker... (╯°□°)╯︵ ┻━┻
        </BText>
      </div>
    </div>

    <div 
      v-else 
      class="b-squad__container"
    >
      <div class="b-squad__name">
        <BText
          class="b-squad__title"
          color="white"
          size="giant"
          @click="toggleUpdateModal"
        >
          {{ squad.squad }}
        </BText>
      </div>

      <BDivisor 
        class="b-squad__divisor"
        color="black"
      />
      
      <div class="b-squad__info">
        <div class="b-squad__max-rounds">
          <font-awesome-icon class="b-squad__icon" icon="fa-solid fa-arrow-rotate-right" />
        
          <BText
            color="white"
            size="giant"
          >
            {{ squad.currentMaxRounds }}
          </BText>
        </div>

        <div class="b-squad__percentual">
          <font-awesome-icon class="b-squad__icon" icon="fa-solid fa-user-check" />
        
          <BText
            color="white"
            size="giant"
          >
            {{ squad.currentPercentual }}
          </BText>
        </div>
      </div>
    </div>

    <div v-if="moreInfo">
      <FAddUser />

      <div class="b-squad__users-container">
        <BBadge 
          v-for="(user, index) in users"
          :key="index"
          @action="toggleLeaveModal"
        >
          {{ user.email }}
        </BBadge>
      </div>
    </div>

    <BDivisor
      v-if="squad.squad"
      :button="true"
      color="primary"
      @action="toggleInfo"
    />

    <BModal :open="updateModal">
      <FSquad :update="true" @close="toggleUpdateModal" />
    </BModal>

    <BModal :open="leaveModal">
      <FLeave @close="toggleLeaveModal" />
    </BModal>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import BBadge from '../components/b-badge.vue';
import BDivisor from '../components/b-divisor.vue';
import BInput from '../components/b-input.vue';
import BModal from '../components/b-modal.vue';
import BText from '../components/b-text.vue';

import FAddUser from '../forms/f-add-user.vue';
import FSquad from '../forms/f-squad.vue';
import FLeave from '../forms/f-leave.vue';

export default {
  name: 'BSquad',

  components: {
    BBadge,
    BDivisor,
    BInput,
    BText,
  },
}
</script>

<script setup>
const store = useStore();
const squad = computed(() => store.getters.getSquadActive);
const users = computed(() => store.getters.getUsers);

const moreInfo = ref(false);
const toggleInfo = () => { moreInfo.value = !moreInfo.value };

const updateModal = ref(false);
const toggleUpdateModal = () => { updateModal.value = !updateModal.value };

const leaveModal = ref(false);
const toggleLeaveModal = () => { leaveModal.value = !leaveModal.value };
</script>

<style lang="scss" scoped>
.b-squad {
  display: grid;
  padding: var(--unit-0400) var(--unit-1000);
  row-gap: var(--unit-0800);

  @media (max-width: 768px) {
    padding: var(--unit-0300);
    row-gap: var(--unit-0600);
  }  
}

.b-squad__container {
  align-items: center;
  display: grid;
  grid-template-areas: 'name info';
  grid-template-columns: 1fr min-content;

  @media (max-width: 768px) {
    grid-template-areas: 'name' 'divisor' 'info';
    row-gap: var(--unit-0600);
  }
}

.b-squad__name,
.b-squad__info,
.b-squad__max-rounds,
.b-squad__percentual {
  align-items: center;
  display: flex;
}

.b-squad__name {
  grid-area: name;
  height: 48px;

  @media (max-width: 768px) {
    height: 44px;
  }
}

.b-squad__divisor {
  grid-area: divisor;

  @media (min-width: 768px) {
    display: none;
  }
}

.b-squad__info {
  grid-area: info;
  height: 48px;
  column-gap: var(--unit-0800);

  @media (max-width: 768px) {
    height: 40px;
  }

}

.b-squad__title {
  cursor: pointer;

  &:hover {
    color: var(--color-accent);
  }
}

.b-squad__max-rounds,
.b-squad__percentual {
  column-gap: var(--unit-0200);
}

.b-squad__icon {
  color: var(--color-white);
  height: var(--unit-0500);
}

.b-squad__users-container {
  column-gap: var(--unit-0400);
  display: flex;
  flex-wrap: wrap;
  margin-top: var(--unit-0100);
  row-gap: var(--unit-0200);
}
</style>