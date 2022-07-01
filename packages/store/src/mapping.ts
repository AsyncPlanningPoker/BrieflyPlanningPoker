import { LoadedSquadsByUserIdType, SquadUsersType } from './types/squad';
import { LoadedUserType } from './types/user';

type LoadedSquadsDb = {
  squadId: string;
  squad: string;
  currentMaxRounds: number;
  currentPercentual: number;
  userId: string;
  user: string;
  updatedAt: Date;
};

function fromSquadDb(squadsDb: LoadedSquadsDb[]): LoadedSquadsByUserIdType[] {
  const loadedSquads: LoadedSquadsByUserIdType[] = [];

  const squads = squadsDb.map((res) => {
    return res.squad;
  });

  for (const squad of squads) {
    const idx = loadedSquads.findIndex((res) => {
      return res.squad === squad;
    });

    if (idx !== -1) {
      continue;
    }

    const resDb = squadsDb.filter((res: LoadedSquadsDb) => {
      return res.squad === squad;
    });

    loadedSquads.push({
      id: resDb[0].squadId,
      squad: resDb[0].squad,
      users: resDb.map((res: any) => {
        return { id: res.userId, name: res.user, email: res.email };
      }),
      currentMaxRounds: resDb[0].currentMaxRounds,
      currentPercentual: resDb[0].currentPercentual,
      updatedAt: resDb[0].updatedAt,
    });
  }

  return loadedSquads;
}

function fromSquadUsersDb(squad: { id: string; name: string }, user: SquadUsersType[]): LoadedSquadsByUserIdType {
  return {
    id: squad.id,
    squad: squad.name,
    users: user.map((user) => {
      return { id: user.id, name: user.name, email: user.email };
    }),
  };
}

function fromUserDb(res: LoadedUserType): LoadedUserType {
  return {
    id: res.id,
    name: res.name,
    email: res.email,
    password: res.password,
  };
}
export { fromSquadDb, fromSquadUsersDb, fromUserDb };
