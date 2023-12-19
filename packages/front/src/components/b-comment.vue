<template>
  <div class="b-comment">
    <template v-if="taskSchemas.isVote(action)">
      <BText align="left" color="primary" size="medium">
        {{ `[${action.createdAt.toUTCString()}] ` }}
        {{ action.user.email }}
      </BText>
      <BText v-if="!hidden" align="left" color="primary" size="medium">
        {{ ` voted ${action.points}` }}
      </BText>

      <BText v-else align="left" color="primary" size="medium">
        voted in the current round.
      </BText>
    </template>

    <template v-else>
      <BText align="left" color="primary" size="medium">
        {{ `[${action.createdAt.toUTCString()}] ` }}
        {{ action.user.email }}:
      </BText>
      <BText v-if="!hidden" align="left" color="gray-20" size="medium">
        {{ action.message }}
      </BText>
      <BText v-else align="left" color="primary" size="medium">
        commented in the current round.
      </BText>
    </template>
  </div>
</template>

<script setup lang="ts">
import { taskSchemas } from '@briefly/apidef';
import BText from '../components/b-text.vue';

withDefaults(defineProps<{ action: taskSchemas.Action, hidden?: boolean }>(), { hidden: true });
</script>

<style lang="scss" scoped>
.b-comment {
  background-color: var(--color-white);
  border: none;
  border-radius: var(--unit-0100);
  margin: var(--unit-0200) var(--unit-0000);
  padding: var(--unit-0200);
}

.blurred {
  color: transparent;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
