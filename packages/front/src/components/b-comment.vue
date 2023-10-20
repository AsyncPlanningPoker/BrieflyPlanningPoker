<template>
  <div class="b-comment">
    <template v-if="type == 'vote'">
      <BText
        align="left"
        color="primary"
        size="medium"
      >
        {{ `[${date}] ` }}
        {{ author }}
      </BText>

      <BText
        v-if="!hidden"
        align="left"
        color="primary"
        size="medium"
      >
        {{ ` voted ${content}` }}
      </BText>

      <BText
        v-else
        align="left"
        color="primary"
        size="medium"
      >
        voted in the current round.
      </BText>
    </template>

    <template v-else>
      <BText
        align="left"
        color="primary"
        size="medium"
      >
        {{ `[${date}] ` }}
        {{ author }}:
      </BText>

      <BText
        v-if="!hidden"
        align="left"
        color="gray-20"
        size="medium"
      >
        {{ content }}
      </BText>

      <BText
        v-else
        align="left"
        color="primary"
        size="medium"
      >
        commented in the current round.
      </BText>
    </template>
  </div>
</template>

<script setup lang="ts">
import BText from '../components/b-text.vue';

const props = withDefaults(
  defineProps<{
    author: string,
    date: string,
    type: string,
    content: string | number,
    hidden: boolean
  }>(), { hidden: true });
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
