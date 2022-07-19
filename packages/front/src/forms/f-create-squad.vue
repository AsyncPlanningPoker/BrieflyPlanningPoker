<template>
  <Form
    class="f-create-squad"
    :validation-schema="schema"
    @submit="onSubmit"
    @invalid-submit="onInvalidSubmit"
  >
    <BInputField
      label="Squad name"
      name="squadName"
    >
      <BInput
        name="squadName"
        type="text"
        :value="update ? squad.squad : ''"
      />
    </BInputField>

    <BInputField
      label="Max rounds"
      name="maxRounds"
    >
      <BInput
        name="maxRounds"
        type="number"
        :value="props.update ? squad.currentMaxRounds : ''"
      />
    </BInputField>

    <BInputField
      label="Percentual"
      name="percentual"
    >
      <BInput
        name="percentual"
        :max=1
        :min=0
        placeholder="0.25"
        :step=0.10
        type="number"
        :value="props.update ? squad.currentPercentual : ''"
      />
    </BInputField>

    <div class="f-create-squad__buttons-container">
      <BButton
        :transparent="true"
        value="cancel"
        @click="$emit('close')"
      />
      
      <BButton
        class="f-create-squad__create-button"
        type="submit"
        value="create"
      />
    </div>
  </Form>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Form } from 'vee-validate';
import * as Yup from 'yup';

import BButton from '../components/b-button.vue'
import BInput from '../components/b-input.vue';
import BInputField from '../components/b-input-field.vue';

export default {
  name: 'FCreateSquad',

  components: {
    BButton,
    BInput,
    BInputField,
    Form,
  },
};
</script>

<script setup>
const props = defineProps({
  update: {
      type: Boolean,
      default: false,
    },
})

const emit = defineEmits(['close'])
const store = useStore();
const squad = computed(() => store.getters.getSquadActive);

function onSubmit(values) {
  const newSquad = {
    name: values.squadName,
    currentMaxRounds: values.maxRounds,
    currentPercentual: values.percentual
  }

  if(!props.update) {
    store.dispatch('addSquad', newSquad);
  }
  else {
    store.dispatch('updateSquad', newSquad);
  }
  emit('close');
};

function onInvalidSubmit() {
  const submitButton = document.querySelector(".f-create-squad__create-button");
  submitButton.classList.add("invalid");
  setTimeout(() => { submitButton.classList.remove("invalid"); }, 1000);
};

const schema = Yup.object().shape({
  squadName: Yup.string().required(),
  maxRounds: Yup.number().typeError('maxRounds must be a number').required().integer().min(1),
  percentual: Yup.number().typeError('percentual must be a number').required().positive().min(0).max(1).test((number) => Number.isInteger(number * (10 ** 2))),
});
</script>

<style lang="scss" scoped>
.f-create-squad {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0200);
  width: 280px;
}

.f-create-squad__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}
</style>