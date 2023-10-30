import { defineStore } from 'pinia';
import { squadSchemas } from '@briefly/apidef';

import api from '../services/api';
import { squadStore } from './squads';
import { ref } from 'vue';

const squad = squadStore();
const taskStore =  defineStore('taskStore', () => {
  
  const enabledTasks =  ref<squadSchemas.FindSchemaRes["tasks"]>([]);
  const disabledTasks = ref<squadSchemas.FindSchemaRes["tasks"]>([]);

  async function gatherTasks() {
    const tasks = squad.activeSquad?.tasks;
    enabledTasks.value = tasks?.filter((task) => task.active) ?? [];
    disabledTasks.value = tasks?.filter((task) => task.active) ?? [];
  }

  async function addTask(payload: squadSchemas.CreateTaskSchemaReq) {
    try{
      const squadId = squad.activeId;
      if(! squadId) throw new Error("No squad is active!");
      const newTask = await api.createTaskSquad(payload, { params: { squadId }});
      if(squad.activeSquad)
        squad.activeSquad.tasks = squad.activeSquad.tasks
          .concat([newTask]);

      await gatherTasks();
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }

  async function disableTask(taskId: string) {
    try{
      const disabledTask = await api.deactivateTask(undefined, { params: { taskId } });

      if(squad.activeSquad)
        squad.activeSquad.tasks = squad.activeSquad.tasks
          .filter(({ id }) => disabledTask.id != id)
          .concat([disabledTask]);

      await gatherTasks();
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }

  async function deleteTask(taskId: string) {
    try{
      const deletedTask = await api.deleteTask(undefined, { params: { taskId } });
      if(squad.activeSquad)
        squad.activeSquad.tasks = squad.activeSquad.tasks
          .filter(({ id }) => deletedTask.id != id);
      await gatherTasks();
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }
});

export { taskStore }