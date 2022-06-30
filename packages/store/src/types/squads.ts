interface IStoreSquad {
  create(squad: CreateSquadType): Promise<CreatedSquadType | undefined>;
  list(userId: string): Promise<LoadedSquadsByUserIdType[]>;
  delete(squadId: string, squad: UpdateSquadType): Promise<void>;
  updateById(squadId: string, squad: UpdateSquadType): Promise<void>;
  createSquadsUsersById(squadId: string, users: UpdateSquadsUsersType[]): Promise<SquadMembers[]>;
  deleteSquadUsersById(squadId: string, users: UpdateSquadsUsersType[]): Promise<void>;
}

type CreateSquadType = {
  id: string;
  name: string;
  users: { squadsUsersId: string; id: string }[];
  currentMaxRounds: number;
  currentPercentual: number;
};

type SquadMembers = {
  id: string;
  name: string;
  email: string;
};

type CreatedSquadType = {
  id: string;
  users: SquadMembers[];
};

type LoadedSquadsByUserIdType = {
  id: string;
  squad: string;
  users: { id: string; name: string }[];
  currentMaxRounds: number;
  currentPercentual: number;
  updatedAt: Date;
};

type LoadedSquadsDb = {
  squadId: string;
  squad: string;
  currentMaxRounds: number;
  currentPercentual: number;
  userId: string;
  user: string;
  updatedAt: Date;
};

type UpdateSquadType = {
  name?: string;
  currentMaxRounds?: number;
  currentPercentual?: number;
  updatedAt: Date;
};

type UpdateSquadsUsersType = {
  userId: string;
  squadsUsersId?: string;
  updatedAt: Date;
};

export { IStoreSquad };
export type { CreateSquadType, CreatedSquadType, LoadedSquadsDb, LoadedSquadsByUserIdType, UpdateSquadType, UpdateSquadsUsersType, SquadMembers };
