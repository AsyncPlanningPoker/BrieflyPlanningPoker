<template>
  <div class="b-input">
    <div class="b-input__label">
      <BText 
        :for="name"
        tag="label"
      >
        {{ label }}
      </BText>

      <a v-if="link" :href="link">
        {{ linkLabel }}
      </a>
    </div>

    <div
      :error="errorMessage"
      :value="inputValue"
      @input="handleChange"
      @blur="handleBlur"
    >
      <slot/>
    </div>

    <BText
      class="b-input__error"
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
import { shouldBeOneOf } from 'vue-prop-validation-helper';
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
    type: {
      type: String,
      default: 'text',
      validator: shouldBeOneOf(['text','email','password']),
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
      initialValue: props.value,
    });

    return {
      inputValue,
      errorMessage,
      handleBlur,
      handleChange,
    };
  },
};
</script>

<style scoped lang="scss">
.b-input {
  display: grid;
  font-family: 'Hammersmith One', sans-serif;
  font-size: var(--unit-0400);
  row-gap: var(--unit-0200);
}

.b-input__label {
  display: flex;
  justify-content: space-between;
}

.b-input__error {
  color: var(--color-error);
  min-height: var(--unit-0400);
}
</style>
