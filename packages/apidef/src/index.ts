import apiDef, { type ApiDef } from "./apiDef";
import usersAPI, { type UsersAPI } from "./apiDef/users";
import squadsAPI, { type SquadsAPI } from "./apiDef/squads";
import tasksAPI, { type TasksAPI } from "./apiDef/tasks";

export { squads as squadSchemas, tasks as taskSchemas, users as userSchemas } from "./apiSchemas";
export { apiDef, usersAPI, squadsAPI, tasksAPI };
export type { ApiDef, UsersAPI, SquadsAPI, TasksAPI };
export * as zod_generated from './generated/zod'