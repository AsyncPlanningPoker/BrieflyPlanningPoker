<template>
  <div class="b-input">

    <div class="b-input__label">
      <label :for="name">
        {{ label }}
      </label>

      <a v-if="hasLink" :href="link">
        {{ linkLabel }}
      </a>
    </div>

    <BInput
      :id="name"
      :name="name"
      :type="type"
      :value="inputValue"
      @input="handleChange"
      @blur="handleBlur"
    />

    <BText 
      class="b-input__error" 
      size="small"
      type="span"
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
    placeholder: {
      type: String,
      default: "",
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
  computed: {
    hasLink() {
      return this.link;
    }
  },
};
</script>

<style scoped lang="scss">
.b-input {
  font-family: 'Hammersmith One', sans-serif;
  font-size: var(--unit-0400);
}

.b-input__container {
  align-items: center;
  background-color: var(--color-white);
  border-radius: var(--unit-0100);
  display: flex;
  height: var(--unit-1000);
  justify-content: start;
  margin-top: var(--unit-0200);
}

.b-input__field {
  background-color: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  padding: var(--unit-0200);
  width: 100%;
}

.b-input__label {
  display: flex;
  justify-content: space-between;
}

.b-input__error {
  color: var(--color-error);
  margin-bottom: var(--unit-0200);
  min-height: var(--unit-0500);
}
</style>
