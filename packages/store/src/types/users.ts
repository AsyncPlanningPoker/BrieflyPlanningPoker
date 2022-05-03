interface IStoreUser {
  create(user: CreateUserType): Promise<void>;
  findByEmail(user: FindByEmailType): Promise<LoadedUserType | undefined>;
  updatePassByEmail(email: FindByEmailType, user: UpdateUserType): Promise<void>;
}

type CreateUserType = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type FindByEmailType = string;

type UpdateUserType = {
  name?: string;
  password?: string;
  updatedAt: Date;
};

type LoadedUserType = {
  id: string;
  name: string;
  email: string;
  password?: string;
};

export { IStoreUser };
export type { CreateUserType, FindByEmailType, UpdateUserType, LoadedUserType };
