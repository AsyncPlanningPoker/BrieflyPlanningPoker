interface IStoreSquad {
  create(squad: CreateSquadType): Promise<LoadedSquadsByUserIdType | void>;
  list(userId: string): Promise<LoadedSquadsByUserIdType[]>;
  listUsers(squadId: string): Promise<LoadedUsersBySquadIdType[]>;
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

type LoadedSquadsByUserIdType = {
  id: string;
  squad: string;
  currentMaxRounds?: number;
  currentPercentual?: number;
  updatedAt?: Date;
};

type LoadedUsersBySquadIdType = {
  users: SquadUsersType[];
};

type UpdateSquadType = {
  name?: string;
  currentMaxRounds?: number;
  currentPercentual?: number;
};

export { IStoreSquad };
export type { CreateSquadType, LoadedSquadsByUserIdType, LoadedUsersBySquadIdType, UpdateSquadType, SquadUsersType };
