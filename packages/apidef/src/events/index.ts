// import type { squadSchemas, taskSchemas } from '@briefly/apidef';

// enum Resources {
//     Squad,
//     Task,
//     Message,
//     Vote
// }

// interface IEvent{
//     resource: Resources,
//     mutation: 'create' | 'update' | 'delete',
//     data: Partial<squadSchemas.CreateSchemaRes> | Partial<squadSchemas.CreateTaskSchemaRes> | taskSchemas.Message | taskSchemas.Vote;
// };

// const a: IEvent = {
//     resource: Resources.Squad,
//     mutation: `create`,
//     data: {
//         message: "a",
//         round: 3,
//         userEmail: `a@b.co`,
//         task
//     }
// }


// interface Events {
//     addedUser?: (data: any) => any,
//     squadUpdated?: (data: any) => any,
//     taskCreated?: (data: any) => any,
// }

// export function initialize(token: string){
//     if(!token) throw new Error("Nao autorizado!");
//     console.log(`Token: ${token}`);
//     fetchEventSource('http://localhost:8000/api/users/events', {
//         headers: { 'Authorization': `Bearer ${JSON.parse(token)}` },
//         async onopen(response) {
//             console.log("Tentando!");
//             console.log(response);
//         },
//         onmessage(ev) {
//             if(!ev.data) return;
//             console.log(ev);
//             ev.data = JSON.parse(ev.data);
//             const eventDispatcher = events.get(ev.event);
//             if(eventDispatcher) eventDispatcher(ev.data);
//             else console.warn(ev);
//         },
//         onerror(err) {
//             console.error("ERRO!");
//             console.error(err);
//         },
//     });

//     const events = new Map<string, (data: any) => any>();
//     const squad = squadStore();
//     const task = taskStore();

//     events.set("addedUser", onAddedUser(squad));
//     events.set("squadUpdated", onSquadUpdated(squad));
//     events.set("taskCreated", onTaskCreated(squad, task));
//     events.set("taskUpdated", onTaskUpdated(squad, task));
// }

// /** Current user was added to a squad */
// const onAddedUser = (store: ReturnType<typeof squadStore>) => {
//     return (data: squadSchemas.CreateSchemaRes) => {
//         if(! store.squadList.some((squad) => squad.id == data.id))
//             store.squadList = store.squadList.concat(data);
//     };
// }

// /** A squad that the user is a part of was updated */
// const onSquadUpdated = (store: ReturnType<typeof squadStore>) => {
//     return (data: squadSchemas.UpdateSchemaRes) => {
//         const toUpdate = store.squadList.find((squad) => squad.id == data.id);
//         if(! toUpdate) throw new Error('Cant find squad');
//         store.squadList = store.squadList.map(
//             (squad) => (squad.id != toUpdate.id) ? squad : toUpdate
//         )
//     };
// }

// /** A task was created in a squad that the user is a part of */
// const onTaskCreated = (squad: ReturnType<typeof squadStore>,task: ReturnType<typeof taskStore>) => {
//     return (data: squadSchemas.CreateTaskSchemaRes) => {
//             if(data.squadId == squad.activeId && ! task.tasks.some((task) => task.id == data.id))
//                 task.tasks = task.tasks.concat(data);
//     };
// }

// /** A task of a squad that the user is a part of was updated */
// const onTaskUpdated = (squad: ReturnType<typeof squadStore>, task: ReturnType<typeof taskStore>) => {
//     return (data: taskSchemas.FindSchemaRes) => {
//         if(data.squadId == squad.activeId){
//             task.tasks = task.tasks.map((task) => (task.id != data.id) ? task : data);
//             if(task.activeTask?.id == data.id){
//                 task.activeTask = data;
//             }
//         }
//     };
// }
