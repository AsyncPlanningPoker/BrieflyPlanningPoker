interface IStoreUser {
  create(user: CreateUserType): Promise<void>;
  findByEmail(email: string): Promise<LoadedUserType | undefined>;
  updatePassByEmail(email: string, user: UpdateUserPassType): Promise<void>;
  deleteByEmail(email: string, user: DeleteUserType): Promise<void>
}

//updateAvatarByEmail
//updateNameByEmail

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

type DeleteUserType = {
  updatedAt: Date;
};

type LoadedUserType = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export { IStoreUser };
export type { CreateUserType, DeleteUserType, UpdateUserPassType, LoadedUserType };
