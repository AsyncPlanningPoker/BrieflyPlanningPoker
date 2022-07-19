interface IStoreSquad {
  create(squad: CreateSquadType): Promise<LoadedSquadsByUserIdType | void>;
  list(userId: string): Promise<LoadedSquadsByUserIdType[]>;
  delById(squadId: string): Promise<void>;
  updateById(squadId: string, squad: UpdateSquadType): Promise<void>;
  addSquadUsersByEmail(squadId: string, users: AddSquadUsersType[]): Promise<LoadedSquadsByUserIdType | void>;
  delSquadUserByEmail(squadId: string, email: string): Promise<void>;
}

type CreateSquadType = {
  id: string;
  name: string;
  users: AddSquadUsersType[];
  currentMaxRounds: number;
  currentPercentual: number;
};

type SquadUsersType = {
  id: string;
  name: string;
  email: string;
};

type LoadedSquadsByUserIdType = {
  id: string;
  squad: string;
  users: SquadUsersType[];
  currentMaxRounds?: number;
  currentPercentual?: number;
  updatedAt?: Date;
};

type UpdateSquadType = {
  name?: string;
  currentMaxRounds?: number;
  currentPercentual?: number;
};

type AddSquadUsersType = {
  email: string;
};

export { IStoreSquad };
export type { CreateSquadType, LoadedSquadsByUserIdType, UpdateSquadType, AddSquadUsersType, SquadUsersType };
