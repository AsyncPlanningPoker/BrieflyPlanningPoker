<template>
  <component
    :is="tag"
    class="b-text"
    :class="{
      [`b-text--${align}`]: align,
      [`b-text--${size}`]: size,
    }"
  >
    <slot />
  </component>
</template>

<script>
import { shouldBeOneOf } from 'vue-prop-validation-helper';

export default {
  name: 'BText',
  props: {
    tag: {
      type: String,
      default: 'span',
    },
    align: {
      type: String,
      default: '',
      validator: shouldBeOneOf(['','left','center','right']),
    },
    size: {
      type: String,
      default: 'medium',
      validator: shouldBeOneOf(['small','medium','large']),
    },
  }
}
</script>

<style scoped lang="scss">
.b-text {
  font-family: var(--font-family);
  letter-spacing: normal;
  text-align: inherit;
  text-decoration: none;
  text-transform: none;
}

@each $align in ('left','center','right') {
  .b-text--#{$align} {
    text-align: #{$align}
  }
}

@each $size in ('small','medium','large') {
  .b-text--#{$size} {
    font-size: var(--font-size-#{$size});
    line-height: var(--line-height-#{$size});
  }
}
</style>
