interface IStoreUser {
  create(user: CreateUserType): Promise<void>;
  find(ids: FindUserType[]): Promise<LoadedUserType[]>;
  findByCredentials(user: findByCredentialsType): Promise<LoadedUserType | undefined>;
  updateById(id: FindUserType, user: UpdateUserType): Promise<void>;
}

type CreateUserType = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type FindUserType = string;

type findByCredentialsType = {
  email: string;
  password: string;
};

type UpdateUserType = {
  name?: string;
  email?: string;
  password?: string;
  updatedAt: Date;
};

type LoadedUserType = {
  id: string;
  name: string;
  email: string;
};

export { IStoreUser };
export type { CreateUserType, FindUserType, findByCredentialsType, UpdateUserType, LoadedUserType };
