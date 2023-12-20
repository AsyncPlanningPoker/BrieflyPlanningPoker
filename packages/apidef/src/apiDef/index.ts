import { mergeApis } from "@zodios/core";
import usersAPI from "./users";
import squadsAPI from "./squads";
import tasksAPI from "./tasks";
import healthApi from "./health";

const apiDef = mergeApis({
    "/users": usersAPI,
    "/squads": squadsAPI,
    "/tasks": tasksAPI,
    "/health": healthApi
});

export default apiDef;
export type ApiDef = typeof apiDef;