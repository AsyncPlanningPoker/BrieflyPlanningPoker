<template>
  <form
    v-if="!update"
    class="f-squad"
    @submit="onSubmit"
    @invalid-submit="onInvalidSubmit"
  >
    <BInputField
      label="Squad name"
      name="squadName"
    >
      <BInput
        name="squadName"
        placeholder="Name"
        type="text"
      />
    </BInputField>

    <BInputField
      label="Max rounds"
      name="maxRounds"
    >
      <BInput
        name="maxRounds"
        :min="1"
        placeholder="3"
        type="number"
      />
    </BInputField>

    <BInputField
      label="Percentual"
      name="percentual"
    >
      <BInput
        name="percentual"
        :max="1"
        :min="0"
        placeholder="0.25"
        :step="0.1"
        type="number"
      />
    </BInputField>

    <div class="f-squad__buttons-container">
      <BButton
        variant="transparent"
        value="cancel"
        @click="$emit('close')"
      />

      <BButton
        class="f-squad__button"
        type="submit"
        value="create"
      />
    </div>
  </Form>
  <Form
    v-else
    class="f-squad"
    @submit="onSubmit"
    @invalid-submit="onInvalidSubmit"
  >
    <BInputField
      label="Squad name"
      name="squadName"
      :initial="squad.squadActive?.name"
    >
      <BInput
        name="squadName"
        type="text"
        :value="squad.squadActive?.name"
      />
    </BInputField>

    <BInputField
      label="Max rounds"
      name="maxRounds"
      :initial="squad.squadActive?.maxRounds"
    >
      <BInput
        name="maxRounds"
        :min="1"
        type="number"
        :value="squad.squadActive?.maxRounds"
      />
    </BInputField>

    <BInputField
      label="Percentual"
      name="percentual"
      :initial="squad.squadActive?.percentual"
    >
      <BInput
        name="percentual"
        :max="1"
        :min="0"
        placeholder="0.25"
        :step="0.1"
        type="number"
        :value="squad.squadActive?.percentual"
      />
    </BInputField>

    <div class="f-squad__buttons-container">
      <BButton
        variant="transparent"
        value="cancel"
        @click="$emit('close')"
      />

      <BButton
        class="f-squad__button"
        type="submit"
        value="update"
        ref="submitButton"
      />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BButton from '../components/b-button.vue';
import BInput from '../components/b-input.vue';
import BInputField from '../components/b-input-field.vue';
import { squadStore } from '@/stores';

const props = withDefaults(defineProps<{ update: boolean }>(), { update: false });

const emit = defineEmits<{ (event: 'close'): void }>();

const squad = squadStore();

const submitButton = ref<HTMLButtonElement | null>(null);

function onSubmit(values: any) {
  const newSquad = {
    name: values.squadName,
    currentMaxRounds: values.maxRounds,
    currentPercentual: values.percentual,
  };

  if (!props.update) squad.addSquad(newSquad);
  else squad.updateSquad(newSquad);

  emit('close');
}

function onInvalidSubmit() {
  submitButton.value?.classList.add('invalid');
  setTimeout(() => {
    submitButton.value?.classList.remove('invalid');
  }, 1000);
}
</script>

<style lang="scss" scoped>
.f-squad {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0200);
  width: 280px;
}

.f-squad__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}
</style>
