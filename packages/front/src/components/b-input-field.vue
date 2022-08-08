<template>
  <div class="b-input-field">
    <div class="b-input-field__label">
      <BText 
        :for="name"
        tag="label"
      >
        {{ label }}
      </BText>

      <BText
        :href="link"
        tabindex="-1"
        tag="a"
        v-if="link"
      >
        {{ linkLabel }}
      </BText>
    </div>

    <div
      :error="errorMessage"
      :value="inputValue"
      @input="handleChange"
      @blur="handleBlur"
    >
      <slot />
    </div>

    <BText
      class="error"
      size="small"
      tag="div"
    >
      {{ errorMessage }}
    </BText>
  </div>
</template>

<script>
import { toRef } from "vue";
import { useField } from "vee-validate";
import BText from './b-text.vue';
import BInput from './b-input.vue';

export default {
  name: 'BInputField',

  components: {
    BText,
    BInput,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
    initial: {},
    label: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    linkLabel: {
      type: String,
    },
  },
  
  setup(props) {
    const name = toRef(props, "name");

    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
    } = useField(name, undefined, {
      initialValue: props.initial,
    });

    return { inputValue, errorMessage, handleBlur, handleChange };
  },
};
</script>

<style scoped lang="scss">
.b-input-field {
  display: grid;
  font-family: 'Hammersmith One', sans-serif;
  font-size: var(--unit-0400);
  row-gap: var(--unit-0200);
}

.b-input-field__label {
  display: flex;
  justify-content: space-between;
}
</style>
