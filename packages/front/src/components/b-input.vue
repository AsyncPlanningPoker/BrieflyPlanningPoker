<template>
  <div class="b-input">
    <div class="b-input__label">
      <label :for="id"> 
        {{ this.label }} 
      </label>
      <a v-if="hasLink" :href="this.link">
        {{ this.linkLabel }}
      </a>
    </div>
    
    <div class="b-input__container">
      <input
        class="b-input__field"
        :id="id"
        :placeholder="placeholder"
        :type="type"
      >
    </div>
  </div>
</template>

<script>
import { shouldBeOneOf } from 'vue-prop-validation-helper';

export default {
  name: 'BInput',
  props: {
    id: {
      type: String,
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
    },
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
  font-family: inherit;
  font-size: inherit;
  justify-content: space-between;
}
</style>
