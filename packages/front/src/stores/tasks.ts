import { defineStore } from 'pinia';
import { squadSchemas, taskSchemas } from '@briefly/apidef';

import api from '../services/api';
import { squadStore } from './squads';
import { computed, ref } from 'vue';

const taskStore =  defineStore('taskStore', () => {
  
  const squad = squadStore();

  const tasks = ref<squadSchemas.ListTasksSchemaRes>([]);
  
  const enabledTasks = computed(() => tasks.value.filter((task) => task.active));
  const disabledTasks = computed(() => tasks.value.filter((task) => !task.active));
  const activeTask = ref<taskSchemas.FindSchemaRes | undefined>();
  
  async function gatherTask(taskId: string){
    try {
      activeTask.value = await api.findTask({ params: { taskId }});
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async function gatherTasks() {
    try {
      const squadId = squad.activeId;
      if(! squadId) throw new Error("No squad is active!");
      tasks.value = await api.listTasksSquad({params: { squadId }});
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async function addTask(payload: squadSchemas.CreateTaskSchemaReq) {
    try{
      const squadId = squad.activeId;
      if(! squadId) throw new Error("No squad is active!");
      const newTask = await api.createTaskSquad(payload, { params: { squadId }});
      tasks.value = tasks.value.concat(newTask);
      await gatherTasks();
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }

  async function disableTask(taskId: string) {
    try{
      const disabledTask = await api.deactivateTask(undefined, { params: { taskId } });
      tasks.value = enabledTasks.value.map((task) => (task.id == taskId) ? disabledTask : task);
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }

  async function deleteTask(taskId: string) {
    try{
      const deletedTask = await api.deleteTask(undefined, { params: { taskId } });
      tasks.value = tasks.value.filter((task) => task.id != taskId);
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }

  async function vote(points: number) {
    try{
      const taskId = activeTask.value?.id;
      if(! taskId) throw new Error("No task is active!");
      const votedTask = await api.voteTask({ points }, { params: { taskId } });
      activeTask.value = votedTask;
      
      if(! activeTask.value.active)
        tasks.value = tasks.value.map((task) => (task.id != taskId) ? task : votedTask);
      
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }

  async function comment(message: string) {
    try{
      const taskId = activeTask.value?.id;
      if(! taskId) throw new Error("No task is active!");
      activeTask.value = await api.messageTask({ message }, { params: { taskId } });
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }
  return { tasks, enabledTasks, disabledTasks, activeTask, gatherTask, gatherTasks, addTask, disableTask, deleteTask, vote, comment };
});

export { taskStore }
