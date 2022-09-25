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
      {{ task.task }}
    </BText>

    <BText
      align="left"
      class="b-task-expanded__wrapper"
      color="gray-30"
      size="medium"
    >
      {{ task.description }}
    </BText>

    <div class="b-task-expanded__wrapper b-task-expanded__comments">
      <BComment 
        v-for="(action, index) in task.actions"
        :author="action.user"
        :content="action.content"
        :date=formatDate(action.date)
        :type="action.type"
        :hidden="action.currentRound"
      />
    </div>

    <div class="b-task-expanded__wrapper" v-if="finished">
      <BInputField
        color="gray-30"
        label="Write a comment"
        name="newMessage"
      >
        <BTextArea 
          name="newMessage"
          @keyup.enter="comment"
        />
      </BInputField>
    </div>

    <div class="b-task-expanded__wrapper" v-if="finished">
      <div class="b-task-expanded__card-container">
        <BCard 
          v-for="fibo in fibonacci"
          :active="votable"
          :value="fibo"
          @click="vote(fibo)"
        />
      </div>
    </div>
    
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { api } from '../services/api';

import BButton from '../components/b-button.vue';
import BCard from '../components/b-card.vue';
import BComment from '../components/b-comment.vue';
import BInputField from '../components/b-input-field.vue';
import BText from '../components/b-text.vue';
import BTextArea from '../components/b-text-area.vue';

export default {
  name: 'BTaskExpanded',

  components: {
    BButton,
    BCard,
    BComment,
    BInputField,
    BText,
    BTextArea,
},

  props: {
    taskId: {
      type: String,
      required: true,
    },
    squadId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      task: {},
      fibonacci: [1, 2, 3, 5, 8, 13],
      votable: true,
      finished: false,
    }
  },

  computed: {
    userEmail() {
      return useStore().getters.getUserEmail;
    },
    formatDate(){
      return date => new Date(date).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'});
    }
  },

  methods: {
    async vote(point) {
      if(this.votable){
        await api.post(`/squad/${this.squadId}/task/${this.taskId}/vote`, { points: point })
          .then(console.log('success!'))
          .catch((err) => {
            console.log(err.response.data.message);
          });
        this.load();
      }
    },
    async comment() {
      await api.post(`/squad/${this.squadId}/task/${this.taskId}/message`, { message: `${newMessage.value}` })
        .then(console.log('success!'))
        .catch((err) => {
          console.log(err.response.data.message);
        });
      this.load();
    },
    async load() {
      await api.get(`/squad/${this.squadId}/task/${this.taskId}`)
        .then((res) => {
          this.task = res.data;
          this.finished = !(this.task.finished);
          this.task.actions.every(x => this.votable = this.eligible(x));
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
      
    },
    eligible(x) {
      if(x.type == "vote" && x.currentRound==true && x.email==this.userEmail){
        return false;
      }
      return true;
    },
  },

  mounted() {
    this.userEmail;
    this.load();
  },
};
</script>

<!-- <script setup>
let userEmail = ref(null);

function getUserEmail() {
  const store = useStore();
  userEmail = computed(() => store.getters.getUserEmail);
}
</script> -->

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

.teste {
  padding: 20px;
}
</style>