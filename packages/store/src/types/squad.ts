interface IStoreSquad {
  create(squad: CreateSquadType): Promise<LoadedSquadsType | void>;
  find(squadId: string): Promise<LoadedSquadsByUserIdType | void>;
  findAll(userId: string): Promise<LoadedSquadsType[]>;
  updateById(squadId: string, squad: UpdateSquadType): Promise<void>;
  addSquadUsersByEmail(squadId: string, users: string, owner: boolean): Promise<SquadUsersType | void>;
  delSquadUserByEmail(squadId: string, email: string): Promise<void>;
}

type CreateSquadType = {
  id: string;
  name: string;
  currentMaxRounds: number;
  currentPercentual: number;
};

type SquadUsersType = {
  id: string;
  name: string;
  email: string;
};

type LoadedSquadsType = {
  id: string;
};

type LoadedSquadsByUserIdType = {
  id: string;
  squad: string;
  users: SquadUsersType[];
  currentMaxRounds: number;
  currentPercentual: number;
  updatedAt: Date;
};

type UpdateSquadType = {
  name?: string;
  currentMaxRounds?: number;
  currentPercentual?: number;
};

export { IStoreSquad };
export type { CreateSquadType, LoadedSquadsByUserIdType, LoadedSquadsType, UpdateSquadType, SquadUsersType };
