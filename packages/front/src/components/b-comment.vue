<template>
  <div class="b-comment">
    <BText
      align="left"
      color="primary"
      size="medium"
    >
      {{ author }}:
    </BText>

    <BText v-if="!hidden"
      align="left"
      color="gray-20"
      size="medium"
    >
      {{ comment }}
    </BText>

    <BText v-else
      align="left"
      class="blurred"
      color="gray-20"
      size="medium"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </BText>
  </div>
</template>

<script>
import BText from '../components/b-text.vue';

export default {
  name: 'BComment',

  components: {
    BText,
  },

  props: {
    author: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    }
  },
};
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
  text-shadow: 0 0 5px rgba(0,0,0,0.5);
}
</style>