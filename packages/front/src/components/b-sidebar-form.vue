<template>
  <Form
    class="b-sidebar-modal__form"
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
      />
    </BInputField>

    <BInputField
      label="Max rounds"
      name="maxRounds"
    >
      <BInput
        name="maxRounds"
        type="number"
      />
    </BInputField>

    <BInputField
      label="Percentual"
      name="percentual"
    >
      <BInput
        name="percentual"
        type="number"
      />
    </BInputField>

    <div class="b-sidebar-modal__buttons-container">
      <BButton
        :transparent="true"
        value="cancel"
        @click="$emit('close')"
      />
      
      <BButton
        class="b-sidebar-modal__create-button"
        type="submit"
        value="create"
      />
    </div>
  </Form>
</template>

<script>
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import {api} from '../services/api';

import BButton from './b-button.vue'
import BInput from './b-input.vue';
import BInputField from './b-input-field.vue';

export default {
  name: 'BSidebarForm',

  components: {
    BButton,
    BInput,
    BInputField,
    Form,
  },

  setup() {
    function onSubmit(values) {
      const newSquad = {
        name: values.squadName,
        users: [{email: "lucca.jacomassi@hotmail.com"}],
        currentMaxRounds: values.maxRounds,
        currentPercentual: values.percentual
      }
      api
        .post('squad/', newSquad)
        .then((res) => console.log('sucesso: ' + res.id))
        .catch((error) => {error = error.data.message})
    };

    function onInvalidSubmit() {
      const submitButton = document.querySelector(".b-sidebar-modal__create-button");
      submitButton.classList.add("invalid");
      setTimeout(() => { submitButton.classList.remove("invalid"); }, 1000);
    };

    const schema = Yup.object().shape({
      squadName: Yup.string().required(),
      maxRounds: Yup.number().required().positive().integer(),
      percentual: Yup.number().required().positive().integer(),
    });

    return { onSubmit, onInvalidSubmit, schema };
  },
};
</script>

<style lang="scss" scoped>
.b-sidebar-modal__form {
  display: grid;
  margin-top: calc(var(--unit-0200) * -1);
  row-gap: var(--unit-0200);
  width: 280px;
}

.b-sidebar-modal__buttons-container {
  display: flex;
  gap: var(--unit-1000);
  width: 100%;
}
</style>