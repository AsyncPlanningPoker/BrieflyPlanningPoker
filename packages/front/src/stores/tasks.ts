import { defineStore } from 'pinia';
import { squadSchemas, taskSchemas } from '@briefly/apidef';

import api from '../services/api';
import { squadStore } from './squads';
import { ref } from 'vue';

const taskStore =  defineStore('taskStore', () => {
  
  const squad = squadStore();

  const enabledTasks =  ref<squadSchemas.ListTasksSchemaRes>([]);
  const disabledTasks = ref<squadSchemas.ListTasksSchemaRes>([]);
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
      enabledTasks.value = await api.listTasksSquad({params: { squadId }, queries: { active: true }});
      disabledTasks.value = await api.listTasksSquad({params: { squadId }, queries: { active: false }});
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async function addTask(payload: squadSchemas.CreateTaskSchemaReq) {
    try{
      const squadId = squad.activeId;
      if(! squadId) throw new Error("No squad is active!");
      const newTask = await api.createTaskSquad(payload, { params: { squadId }});
      enabledTasks.value = enabledTasks.value.concat(newTask);
      await gatherTasks();
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }

  async function disableTask(taskId: string) {
    try{
      const disabledTask = await api.deactivateTask(undefined, { params: { taskId } });
      enabledTasks.value = enabledTasks.value.filter((task) => task.id != taskId);
      disabledTasks.value = disabledTasks.value.concat(disabledTask);
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }

  async function deleteTask(taskId: string) {
    try{
      await api.deleteTask(undefined, { params: { taskId } });
      enabledTasks.value = enabledTasks.value.filter((task) => task.id != taskId);
      disabledTasks.value = disabledTasks.value.filter((task) => task.id != taskId);
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }

  async function vote(points: number) {
    try{
      const taskId = activeTask.value?.id;
      if(! taskId) throw new Error("No task is active!");
      activeTask.value = await api.voteTask({ points }, { params: { taskId } });
      
      if(! activeTask.value.active){
        enabledTasks.value = enabledTasks.value.filter((task) => task.id != activeTask.value?.id);
        disabledTasks.value = disabledTasks.value.concat(activeTask.value);
      }
      
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
  return { enabledTasks, disabledTasks, activeTask, gatherTask, gatherTasks, addTask, disableTask, deleteTask, vote, comment };
});

export { taskStore }
