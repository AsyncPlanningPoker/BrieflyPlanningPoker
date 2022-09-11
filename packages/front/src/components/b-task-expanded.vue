<template>
  <div class="b-task-expanded">
    <div class="b-task-expanded__leave-wrapper">
      <BButton
        size="small"
        variant="inverted"
        value="x"
        @click="$emit('close')"
      />
    </div>

    <BText
      align="center"
      class="b-task-expanded__title"
      color="black"
      size="giant"
      tag="h1"
    >
      [DISCOVERY] Lorem ipsum dolor sit amet.
    </BText>

    <BText
      align="left"
      class="b-task-expanded__wrapper"
      color="gray-30"
      size="medium"
    >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a sagittis lacus. In pellentesque bibendum mattis. Fusce eu metus volutpat, convallis leo vel, lobortis lorem. Ut lacinia eget magna ut interdum.
    </BText>

    <div class="b-task-expanded__wrapper b-task-expanded__comments">
      <BComment 
        v-for="(comment, index) in comments"
        :author="comment.name"
        :comment="comment.comment"
      />
      <BComment 
        v-for="(comment, index) in comments"
        :author="comment.name"
        :comment="comment.comment"
        :hidden="true"
      />
    </div>

    <div class="b-task-expanded__wrapper"></div>
    <BInputField
      color="gray-30"
      label="Write a comment"
      name="taskDescription"
    >
      <BTextArea 
        name="taskDescription"
      />
    </BInputField>

    <div class="b-task-expanded__wrapper">
      <BCards />
    </div>
    
  </div>
</template>

<script>
import BButton from '../components/b-button.vue';
import BCards from '../components/b-cards.vue';
import BComment from '../components/b-comment.vue';
import BInputField from '../components/b-input-field.vue';
import BText from '../components/b-text.vue';
import BTextArea from '../components/b-text-area.vue';

import comments from '../mocks/task-comments.json';

export default {
  name: 'BTaskExpanded',

  components: {
    BButton,
    BCards,
    BComment,
    BInputField,
    BText,
    BTextArea,
},

  data() {
    return { comments };
  },
};
</script>

<style lang="scss" scoped>
.b-task-expanded {
  display: grid;
  position: relative;
  width: 100%;
  
  @media (min-width: 768px) {
    width: 880px;
  }
}

.b-task-expanded__title {
  display: -webkit-box;
  margin-top: var(--unit-0200);
  margin-left: auto;
  margin-right: auto;
  max-width: 75%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  @media (min-width: 768px) {
    -webkit-line-clamp: 2;
    max-width: 85%;
  }
}

.b-task-expanded__wrapper {
  margin-top: var(--unit-0400);

  @media (min-width: 768px) {
    margin-top: var(--unit-1000);
  }
}

.b-task-expanded__comments {
  max-height: 200px;
  overflow: scroll;
}

.b-task-expanded__leave-wrapper {
  height: var(--unit-1000);
  position: absolute;
  right: 0;
  top: 0;
  width: var(--unit-1000);
}

.teste {
  padding: 20px;
}
</style>