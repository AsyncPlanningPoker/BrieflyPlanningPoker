interface IStoreUser {
  create(user: UserType): Promise<void>;
  deleteByEmail(email: string, user: UpdateUserType): Promise<void>
  findByEmail(email: string): Promise<UserType | undefined>;
  updatePassByEmail(email: string, user: UpdateUserType): Promise<void>; 
}

type UpdateUserType = {
  name?: string;
  oldPassword?:string;
  password?: string;
  updatedAt: Date;
};

type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export { IStoreUser };
export type { UpdateUserType, UserType };
