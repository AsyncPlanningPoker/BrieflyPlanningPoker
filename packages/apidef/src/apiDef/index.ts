import { mergeApis } from "@zodios/core";
import usersAPI from "./users";
import squadsAPI from "./squads";
import tasksAPI from "./tasks";

const apiDef = mergeApis({
    "/users": usersAPI,
    "/squads": squadsAPI,
    "/tasks": tasksAPI,
});

export default apiDef;
export type ApiDef = typeof apiDef;