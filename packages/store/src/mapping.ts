import { LoadedSquadsByUserIdType, LoadedSquadsDb } from './types/squads';
import { LoadedUserType } from './types/users';

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
        return { id: res.userId, name: res.user };
      }),
      currentMaxRounds: resDb[0].currentMaxRounds,
      currentPercentual: resDb[0].currentPercentual,
      updatedAt: resDb[0].updatedAt,
    });
  }

  return loadedSquads;
}

function fromUserDb(res: LoadedUserType): LoadedUserType {
  return {
    id: res.id,
    name: res.name,
    email: res.email,
    password: res.password,
  };
}
export { fromSquadDb, fromUserDb };
