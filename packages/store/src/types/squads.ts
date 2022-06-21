interface IStoreSquad {
  create(user: CreateSquadType): Promise<CreatedSquadType | undefined>;
  list(user: FindSquadByIdType[]): Promise<CreatedSquadType[]>;
  delete(id: FindSquadByIdType): Promise<void>;
  updateById(id: FindSquadByIdType, squad: UpdateSquadType): Promise<void>;
}

type CreateSquadType = {
  id: string;
  name: string;
  users: { id: string }[];
  currentMaxRounds: number;
  currentPercentual: number;
};

type CreatedSquadType = {
  id: string;
  name: string;
  users: { id: string; name: string }[];
};

type FindSquadByIdType = {
  id: string;
};

type UpdateSquadType = {
  name?: string;
  users?: { id: string }[];
  updatedAt: Date;
};

export { IStoreSquad };
export type { CreateSquadType, CreatedSquadType, FindSquadByIdType, UpdateSquadType };
