<template>
  <button
    class="b-button"
    :class="{
      'b-button--small': size === 'small',
      'b-button--transparent': transparent
    }"
    :type="type"
  >
    {{ this.value.toUpperCase() }}
  </button>
</template>

<script>
import { shouldBeOneOf } from 'vue-prop-validation-helper';

export default {
  name: 'BButton',

  props: {
    size: {
      type: String,
      default: 'medium',
      validator: shouldBeOneOf(['small', 'medium']),
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
      validator: shouldBeOneOf(['button', 'reset', 'submit']),
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.b-button {
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--unit-0100);
  color: var(--color-white);
  font-family: 'Hammersmith One', sans-serif;
  font-size: var(--unit-0500);
  height: var(--unit-1000);
  padding: var(--unit-0100);
  width: inherit;

  &:hover,
  &:focus {
    background-color: var(--color-accent);
    cursor: pointer;
  }
}

.b-button--small {
  font-size: var(--unit-0400);
}

.b-button--transparent {
  background-color: transparent;
  border: var(--unit-0050) solid var(--color-white);

  &:hover,
  &:focus {
    background-color: transparent;
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
}

.invalid {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px);
  }
  10% {
    transform: translate(-1px, -2px);
  }
  20% {
    transform: translate(-3px, 0px);
  }
  30% {
    transform: translate(3px, 2px);
  }
  40% {
    transform: translate(1px, -1px);
  }
  50% {
    transform: translate(-1px, 2px);
  }
  60% {
    transform: translate(-3px, 1px);
  }
  70% {
    transform: translate(3px, 1px);
  }
  80% {
    transform: translate(-1px, -1px);
  }
  90% {
    transform: translate(1px, 2px);
  }
  100% {
    transform: translate(1px, -2px);
  }
}
</style>
