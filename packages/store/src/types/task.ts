interface IStoreTask {
  create(task: CreateTaskType): Promise<LoadedTaskType | void>;
  deactive(task: IdentifierTaskType): Promise<void>;
  delete(task: IdentifierTaskType): Promise<void>;
  findAll(squad: FindTaskType): Promise<LoadedAllTask>;
  find(squad: IdentifierTaskType): Promise<LoadedTask | void>;
}

type CreateTaskType = IdentifierTaskType & {
  name: string;
  description?: string;
};

type FindTaskType = {
  squad: string;
};

type IdentifierTaskType = {
  id: string;
  squad: string;
};

type LoadedAllTask = {
  active: {
    id: string;
    name: string;
    maxRounds: number;
    currentRound: number;
    points: number;
    finished: boolean;
  }[];
  deactive: {
    id: string;
    name: string;
    maxRounds: number;
    currentRound: number;
    points: number;
    finished: boolean;
  }[];
};

type LoadedTask = {
  task: string;
  description: string;
  finished: string;
  actions: {
    type: string;
    content: string;
    user: string;
    email: string;
    date: Date;
    currentRound: boolean;
  }[];
};

type LoadedTaskType = {
  id: string;
};

export { IStoreTask };
export type { CreateTaskType, IdentifierTaskType, FindTaskType, LoadedAllTask, LoadedTaskType, LoadedTask };
