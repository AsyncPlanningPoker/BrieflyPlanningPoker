interface IStoreTask {
  create(task: CreateTaskType): Promise<LoadedTaskType | void>;
  deactive(task: IdentifierTaskType): Promise<void>;
  delete(task: IdentifierTaskType): Promise<void>;
  findAll(squad: FindTaskType): Promise<LoadedAllTask>
}

type CreateTaskType = IdentifierTaskType & {
  name: string;
  description?: string
};

type FindTaskType = {
  squad: string;
};

type IdentifierTaskType = {
  id: string;
  squad: string;
}

type LoadedAllTask = {
  active: {
    id: string;
    name: string;
    maxRounds: number;
    currentRound: number;
    points: number;
    finished: boolean;
  }[],
  deactive: {
    id: string;
    name: string;
    maxRounds: number;
    currentRound: number;
    points: number;
    finished: boolean;
  }[]
};

type LoadedTaskType = {
  id: string;
};

export { IStoreTask };
export type { CreateTaskType, IdentifierTaskType, FindTaskType, LoadedAllTask, LoadedTaskType };
