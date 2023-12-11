/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { squadStore, taskStore } from '@/stores';
import { squadSchemas, taskSchemas } from '@briefly/apidef';

const API_URL = 'http://localhost:8000/api/';

export function initialize(){
    const token = localStorage.getItem('userToken');
    if(!token) throw new Error("Nao autorizado!");
    console.log(`Token: ${token}`);
    fetchEventSource(`${API_URL}users/events`, {
        headers: { 'Authorization': `Bearer ${JSON.parse(token)}` },
        onmessage(ev) {
            if(!ev.data) return;
            dispatchEvent(ev.event, JSON.parse(ev.data));
        },
        onerror(err) {
            console.error(err);
        },
    });

    const squad = squadStore();
    const task = taskStore();

    const dispatchEvent = (evtName: string, data: unknown) => {
        let valData: any;
        switch (evtName) {
            case "addedUser":
                valData = squadSchemas.addUsersSchemaRes.parse(data);
                onAddedUser(squad, valData);
                break;
            
            case "squadUpdated":
                valData = squadSchemas.updateSchemaRes.parse(data);
                onSquadUpdated(squad, valData);
                break;

            case "taskCreated":
                valData = squadSchemas.createTaskSchemaRes.parse(data);
                onTaskCreated(squad, task, valData);
                break;

            case "taskUpdated":
                valData = taskSchemas.findSchemaRes.parse(data);
                onTaskUpdated(squad, task, valData);
                break;
        
            default:
                console.error(`Event "${evtName}" is not set`);
                break;
        }
    }
}

/** Current user was added to a squad */
function onAddedUser(store: ReturnType<typeof squadStore>, data: squadSchemas.CreateSchemaRes){
    if(! store.squadList.some((squad) => squad.id == data.id))
        store.squadList = store.squadList.concat(data);
}

/** A squad that the user is a part of was updated */
function onSquadUpdated(store: ReturnType<typeof squadStore>, data: squadSchemas.UpdateSchemaRes){
    const toUpdate = store.squadList.find((squad) => squad.id == data.id);
    if(! toUpdate) throw new Error('Cant find squad');
    store.squadList = store.squadList.map(
        (squad) => (squad.id != toUpdate.id) ? squad : toUpdate
    )
}

/** A task was created in a squad that the user is a part of */
function onTaskCreated(squad: ReturnType<typeof squadStore>,task: ReturnType<typeof taskStore>, data: squadSchemas.CreateTaskSchemaRes){
    if(data.squadId == squad.activeId && ! task.tasks.some((task) => task.id == data.id))
        task.tasks = task.tasks.concat(data);
};

/** A task of a squad that the user is a part of was updated */
function onTaskUpdated(squad: ReturnType<typeof squadStore>, task: ReturnType<typeof taskStore>, data: taskSchemas.FindSchemaRes){
    if(data.squadId == squad.activeId){
        task.tasks = task.tasks.map((task) => (task.id != data.id) ? task : data);
        if(task.activeTask?.id == data.id){
            task.activeTask = data;
        }
    }
}
