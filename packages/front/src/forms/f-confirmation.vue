<template>
  <div class="f-confirmation">
    <BText
      align="left"
      type="p"
      size="large"
    >
      Are you sure you want to {{ variable }} this task? This action is IRREVERSIBLE
    </BText>
    <div class="f-confirmation__buttons-container">
      <BButton
        variant="transparent"
        value="cancel"
        @click="$emit('close')"
      />

      <BButton
        :value="variable"
        @click="$emit('confirm')"
      />
    </div>
  </div>
</template>

<script>
import BButton from '../components/b-button.vue';
import BText from '../components/b-text.vue';

export default {
  name: 'FConfirmation',

  components: {
    BButton,
    BText,
  },

  props: {
    variable: {
      type: String,
      default: undefined,
      required: true,
    },
  },

  emits: ['close', 'confirm'],
};
</script>

<style lang="scss" scoped>
.f-confirmation {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  min-width: 280px;
  row-gap: var(--unit-0500);
  width: min-content;
}

.f-confirmation__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}
</style>
