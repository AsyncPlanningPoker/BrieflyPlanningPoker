import { IStoreVoting, MessageTaskType, VoteTaskType } from '../types/voting';
import { Knex } from 'knex';
import { randomUUID } from 'crypto';

class VotingDbStore implements IStoreVoting {
  #client: Knex<any, unknown[]>;

  constructor(client: Knex<any, unknown[]>) {
    this.#client = client;
  }

  async createMessage(message: MessageTaskType) {
    const user = (await this.#client.select('id').from('users').where({ email: message.email, enabled: true }))[0].id;
    const squadUsers = (await this.#client.select('user').where({ squad: message.squad, enabled: true }).from('squads-users')).map((u) => {
      return u.user;
    });
    const squad = (await this.#client('squads').select().where({ enabled: true, id: message.squad }))[0];
    const tasks = await this.findTasksPoints(message.squad, message.task);
    const currentRound = tasks[0]?.currentRound ?? 1;
    const task = (await this.#client('tasks').select().where({ enabled: true, id: message.task, active: true, finished: false }))[0];
    const validUsers = getValidUsers(tasks, squadUsers, currentRound);

    if (squad && task && squadUsers.length === validUsers.length) {
      await Promise.all([
        this.#client('tasks-messages').insert({ id: randomUUID(), user, task: message.task, currentRound: currentRound + 1, message: message.message }),
        this.#client('tasks').where({ id: message.task }).update({
          updatedAt: new Date(),
        }),
      ]);
    } else if (squadUsers.length !== validUsers.length) {
      await Promise.all([
        this.#client('tasks-messages').insert({ id: randomUUID(), user, task: message.task, currentRound, message: message.message }),
        this.#client('tasks').where({ id: message.task }).update({
          updatedAt: new Date(),
        }),
      ]);
    }
  }

  async vote(task: VoteTaskType): Promise<void> {
    const squad = (await this.#client('squads').select().where({ enabled: true, id: task.squad }))[0];
    const taskDb = (await this.#client('tasks').select().where({ enabled: true, id: task.task, active: true, finished: false }))[0];
    const user = (await this.#client.select('id').from('users').where({ email: task.email, enabled: true }))[0].id;
    const squadUsers = (await this.#client.select('user').where({ squad: task.squad, enabled: true }).from('squads-users')).map((u) => {
      return u.user;
    });

    let tasks = await this.findTasksPoints(task.squad, task.task);

    const currentRound = tasks[0]?.currentRound ?? 1;
    const maxRounds = tasks[0]?.maxRounds;
    let minPercentual = Number(tasks[0]?.minPercentual) * 100;
    const validVote = isVoteValid(tasks, user, currentRound);

    const validUsers = getValidUsers(tasks, squadUsers, currentRound);

    if (squad && taskDb) {
      //Current user didnt vote at the current round yet and isnt the last one who needed to vote
      if (squadUsers.length - validUsers.length > 1 && validVote) {
        await this.insertNewPoints({ points: task.points, currentRound, task: task.task, user });
      }
      //Current user didnt vote at the current round yet and is the last one who needed to vote
      else if (squadUsers.length - validUsers.length === 1 && validVote) {
        await this.insertNewPoints({ points: task.points, currentRound, task: task.task, user });
        tasks = await this.findTasksPoints(task.squad, task.task);
        minPercentual = Number(tasks[0]?.minPercentual) * 100;
        const percentual = getAllPercentual(tasks, currentRound, squadUsers.length);
        const { newPoint, maxPercentual } = getMaxPercentual(percentual);

        if (isDraw(percentual)) {
          if (currentRound === maxRounds) {
            await this.finishTask(task.task, getEstimative(tasks, currentRound, percentual));
          }
        } else {
          if (maxPercentual >= minPercentual) {
            await this.finishTask(task.task, Number(newPoint));
          } else {
            if (currentRound === maxRounds) {
              await this.finishTask(task.task, getEstimative(tasks, currentRound, percentual));
            }
          }
        }
      } else if (squadUsers.length - validUsers.length === 0) {
        await this.insertNewPoints({ points: task.points, currentRound: currentRound + 1, task: task.task, user });
      }
    }
  }

  async insertNewPoints(points: { points: number; currentRound: number; task: string; user: string }) {
    await Promise.all([
      this.#client('tasks-points').insert({
        id: randomUUID(),
        ...points,
      }),
      this.#client('tasks').where({ id: points.task }).update({
        updatedAt: new Date(),
      }),
    ]);
  }

  async finishTask(task: string, points: number) {
    await this.#client('tasks').where({ id: task, enabled: true, finished: false, active: true }).update({
      points,
      finished: true,
      updatedAt: new Date(),
    });
  }

  async findTasksPoints(squad: string, task: string) {
    return this.#client.select('tasks.id as tasks', 'tasks-points.user', 'tasks-points.currentRound', 'tasks.maxRounds', 'tasks.percentual as minPercentual', 'tasks-points.points').where({ squad, 'tasks.id': task, 'tasks.enabled': true, 'tasks.active': true, 'tasks.finished': false }).from('tasks').join('tasks-points', 'tasks-points.task', '=', 'tasks.id').orderBy('currentRound', 'desc');
  }
}

//Check if the vote is valid, it means that there's no vote in the current round yet
function isVoteValid(tasks: any, user: string, currentRound: number) {
  let validVote = true;
  tasks.every((t: any) => {
    if (t.user === user && t.currentRound === currentRound) {
      validVote = false;
    }
    return validVote;
  });
  return validVote;
}

//Return all users that voted at current round and still are enabled at squad
function getValidUsers(tasks: any, usersSquad: string[], currentRound: number) {
  return tasks
    .map((t: any) => {
      if (usersSquad.includes(t.user) && t.currentRound === currentRound) {
        return t.user;
      }
    })
    .filter((f: string) => f !== undefined);
}

function getAllPercentual(tasks: any, currentRound: number, allUsers: number) {
  const pointsCurrentRound = tasks
    .map((t: any) => {
      if (t.currentRound === currentRound) {
        return t.points;
      }
    })
    .filter((f: number) => {
      return f !== undefined;
    });

  const percentual = pointsCurrentRound.reduce((acc: any, a: any) => {
    return { ...acc, [a]: Number(((acc[a] || 0) + 100 / allUsers).toFixed(2)) };
  }, {});

  return percentual;
}

function getMaxPercentual(frequency: Record<string, number>) {
  const sorted = Object.values(frequency).sort(function (a: any, b: any) {
    return b - a;
  });
  const maxPercentual = sorted[0];
  const newPoint = Object.keys(frequency).find((k) => {
    return frequency[k] === maxPercentual;
  });
  return { newPoint, maxPercentual };
}

function isDraw(frequency: any) {
  const values = Object.values(frequency);
  return values.length > 1 && Array.from(new Set(values)).length === 1;
}

function getEstimative(tasks: any, currentRound: number, frequencyArray: Record<string, number>): number {
  const fibonacci = [1, 2, 3, 5, 8, 13];

  const pointsCurrentRound = tasks
    .map((t: any) => {
      if (t.currentRound === currentRound) {
        return t.points;
      }
    })
    .filter((f: number) => {
      return f !== undefined;
    });

  const points = Object.keys(frequencyArray).map((k) => {
    return Number(k);
  });
  const total = pointsCurrentRound.length;

  const frequencyValue = Object.values(frequencyArray);
  let maxPoint = 0;
  let maxFrequencyValue = 100 / total;
  let newFibonacci = 0;

  frequencyValue.forEach((r: number, idx) => {
    if (r >= maxFrequencyValue) {
      maxPoint = points[idx];
      maxFrequencyValue = frequencyValue[idx];
    }
  });

  const sum = pointsCurrentRound.reduce((acm: any, s: any) => {
    return s + acm;
  });
  const media = maxPoint > 0 ? Math.ceil((maxPoint + sum / total) / 2) : Math.ceil(sum / total);

  if (fibonacci.includes(media)) {
    newFibonacci =
      fibonacci.find((f) => {
        return f === media;
      }) ?? newFibonacci;
  } else {
    const idx =
      fibonacci.findIndex((f, idx) => {
        return media > f && media < fibonacci[idx + 1];
      }) + 1;
    newFibonacci = fibonacci[idx];
  }
  return newFibonacci;
}

export { VotingDbStore };
