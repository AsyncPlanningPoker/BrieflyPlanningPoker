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
      {{ task.name }}
    </BText>

    <BText
      align="left"
      class="b-task-expanded__wrapper"
      color="gray-30"
      size="medium"
    >
      {{ task.description }}
    </BText>

    <div
      id="comment-box"
      class="b-task-expanded__wrapper b-task-expanded__comments"
    >
      <template
        v-for="[round, actions] in rounds"
        :key="round"
      >
        <BText
          align="center"
          color="gray-20"
          size="medium"
        >
          Round: {{ round }}
        </BText>

        <BDivisor color="gray-20" />

        <template
          v-for="action in actions"
          :key="action.date"
        >
          <BComment
            v-if="action.round === round"
            :author="action.user.email"
            :content="action.content"
            :date="formatDate(action.date)"
            :type="action.type"
            :hidden="action.round == task.currentRound"
          />
        </template>
      </template>
    </div>

    <div
      v-if="finished"
      class="b-task-expanded__wrapper"
    >
      <FAddComment @comment="comment" />
    </div>

    <div
      v-if="finished"
      class="b-task-expanded__wrapper"
    >
      <div class="b-task-expanded__card-container">
        <BCard
          v-for="fibo in fibonacci"
          :active="votable"
          :key="fibo"
          :value="fibo"
          @click="vote(fibo)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { api } from '@/services/api';
import FAddComment from '@/forms/f-add-comment.vue';
import type { Message, Task, Vote } from '@/interfaces';

import BButton from './b-button.vue';
import BCard from './b-card.vue';
import BComment from './b-comment.vue';
import BDivisor from './b-divisor.vue';
import BText from './b-text.vue';


const emit = defineEmits<{ (event: 'close'): void }>();

const props = defineProps<{
  taskId: string
  squadId: string
}>();

let task: Task;
let rounds = new Map<number, (Vote|Message)[]>();
let fibonacci = [1, 2, 3, 5, 8, 13];
let votable = true;
let finished = false;
let actualRound = 0;

const formatDate = computed(() => {
  return (date: string) => {
    return new Date(date)
      .toLocaleDateString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }
    );
  };
});

async function vote(points: number) {
  if (votable) {
    await api.post(`/tasks/${props.taskId}/vote`, { points })
      .catch((err: any) => {
        console.log(err.response.data.message);
      });
    load();
  }
}

async function comment(message: string) {
  await api.post(`/tasks/${props.taskId}/message`, { message })
    .catch((err: any) => {
      console.log(err.response.data.message);
    });
  load();
}

async function load() {
  await api
    .get(`/squad/${props.squadId}/task/${props.taskId}`)
    .then((res: any) => {
      task = res.data;
      rounds = [...new Set(task.actions.map((e) => e.round))];
      finished = !task.finished;
      task.actions.every((x) => (votable = eligible(x)));
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
  const box = document.getElementById('comment-box');
  box?.scroll({ top: box.scrollHeight, behavior: 'smooth' });
}

function eligible(person: any) {
  return !(person.type === 'vote' && person.currentRound === true && person.email === userEmail.value);
}

onMounted(() => {
  load();
});

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
  margin-top: var(--unit-0300);

  @media (min-width: 768px) {
    margin-top: var(--unit-0500);
  }
}

.b-task-expanded__comments {
  max-height: 40vh;
  overflow: auto;
}

.b-task-expanded__leave-wrapper {
  height: var(--unit-1000);
  position: absolute;
  right: 0;
  top: 0;
  width: var(--unit-1000);
}

.b-task-expanded__card-container {
  display: flex;
  justify-content: space-evenly;
}
</style>
