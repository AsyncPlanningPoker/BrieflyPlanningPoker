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
      {{ task?.name }}
    </BText>

    <BText
      align="left"
      class="b-task-expanded__wrapper"
      color="gray-30"
      size="medium"
    >
      {{ task?.description }}
    </BText>

    <div
      id="comment-box"
      class="b-task-expanded__wrapper b-task-expanded__comments"
    >
      <template
        v-for="(actions, round) in rounds"
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
            :action="action"
            :hidden="!!task && action.round == task.currentRound"
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
import { computed, onMounted, ref, type Ref } from 'vue';

import api  from '@/services/api';
import FAddComment from '@/forms/f-add-comment.vue';

import BButton from './b-button.vue';
import BCard from './b-card.vue';
import BComment from './b-comment.vue';
import BDivisor from './b-divisor.vue';
import BText from './b-text.vue';
import { tasks } from '@briefly/prisma/src/apiSchemas';
import { userStore } from '@/stores';

const user = userStore();

defineEmits<{ (event: 'close'): void }>();

const props = defineProps<{
  taskId: string
  squadId: string
}>();

const task: Ref<tasks.FindSchemaRes | null> = ref(null);
const fibonacci = [1, 2, 3, 5, 8, 13];
const rounds = computed(() => {
  if(! task.value) return [];
  const ret = new Array<
    tasks.Action[]
  >(task.value.currentRound - 1);
  for(let i = 0; i < task.value.currentRound; i++){
    ret[i] = [...task.value.votes, ...task.value.messages]
      .filter((action) => action.round == i - 1)
      .sort((i1, i2) => i1.createdAt.getUTCMilliseconds() - i2.createdAt.getUTCMilliseconds());
  }
  return ret;
});

const votable = ref<boolean>(
  !!task.value && task.value.active &&
  rounds.value[task.value.currentRound]
    .some((action) => tasks.isVote(action) && action.userEmail == user.userEmail));

const finished = ref<boolean>(!!task.value && task.value.finished);

async function vote(points: number) {
  if (task.value) {
    const taskId = task.value.id;
    await api.voteTask( { points }, { params: { taskId }})
      .catch((err: any) => {
        console.log(err.response.data.message);
      });
    load();
  }
}

async function comment(message: string) {
  if(task.value){
    const taskId = task.value.id;
    await api.messageTask({ message }, { params: { taskId }})
      .catch((err: any) => {
        console.log(err.response.data.message);
      });
    load();
  }
}

async function load() {
  try {
    const data = await api.findTask({ params: { taskId: props.taskId } });
    task.value = data;
  } catch (error: unknown){
    console.log(error)
  }
  const box = document.getElementById('comment-box');
  box?.scroll({ top: box.scrollHeight, behavior: 'smooth' });
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
