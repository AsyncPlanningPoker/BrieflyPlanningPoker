interface IStoreSquad {
  create(squad: CreateSquadType): Promise<void>;
  list(userId: string): Promise<LoadedSquadsByUserIdType[]>;
  del(squadId: string): Promise<void>;
  updateById(squadId: string, squad: UpdateSquadType): Promise<void>;
  addSquadMembersById(squadId: string, users: AddSquadMembersType[]): Promise<void>;
  delSquadMembersById(squadId: string, users: DelSquadMembersType[]): Promise<void>;
}

type CreateSquadType = {
  id: string;
  name: string;
  members: AddSquadMembersType[];
  currentMaxRounds: number;
  currentPercentual: number;
};

type SquadMembers = {
  id: string;
  name: string;
  email: string;
};

type LoadedSquadsByUserIdType = {
  id: string;
  squad: string;
  members: SquadMembers[];
  currentMaxRounds: number;
  currentPercentual: number;
  updatedAt: Date;
};

type UpdateSquadType = {
  name?: string;
  currentMaxRounds?: number;
  currentPercentual?: number;
};

type AddSquadMembersType = {
  id: string;
  name?: string;
  email?: string;
  squadsUsersId: string;
};

type DelSquadMembersType = {
  userId: string;
};

export { IStoreSquad };
export type { CreateSquadType, LoadedSquadsByUserIdType, UpdateSquadType, DelSquadMembersType, AddSquadMembersType, SquadMembers };
