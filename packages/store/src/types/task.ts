interface IStoreTask {
  create(task: CreateTaskType): Promise<LoadedTaskType | void>;
}

type CreateTaskType = {
  id: string;
  squad: string;
  name: string;
  description?: string
};

type deactiveTaskType = {
  id: string;
  squad: string;
};

type deleteTaskType = {
  id: string;
  squad: string;
};

type findTaskType = {
  squad: string;
};

type LoadedTaskType = {
  id: string;
};

type LoadedAllTask = {
  id: string;
  name: string;
  maxRounds: number;
  active: boolean;
  finished: boolean;
};


export { IStoreTask };
export type { CreateTaskType, LoadedTaskType, deactiveTaskType, deleteTaskType, findTaskType, LoadedAllTask };
