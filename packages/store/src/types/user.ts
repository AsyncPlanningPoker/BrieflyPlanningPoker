interface IStoreUser {
  create(user: CreateUserType): Promise<void>;
  findByEmail(email: string): Promise<LoadedUserType | undefined>;
  updatePassByEmail(email: string, user: UpdateUserPassType): Promise<void>;
}

//updateAvatarByEmail
//updateNameByEmail
//delete

type CreateUserType = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type UpdateUserPassType = {
  password: string;
  updatedAt: Date;
};

type LoadedUserType = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export { IStoreUser };
export type { CreateUserType, UpdateUserPassType, LoadedUserType };
