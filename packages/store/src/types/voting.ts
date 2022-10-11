interface IStoreVoting {
  createMessage(task: MessageTaskType): Promise<void>;
  vote(task: VoteTaskType): Promise<void>;
}

type IdentifierVotingType = {
  id: string;
  squad: string;
  task: string;
  email: string;
};

type MessageTaskType = IdentifierVotingType & {
  message: string;
};

type VoteTaskType = IdentifierVotingType & {
  points: number;
};

export { IStoreVoting };
export type { IdentifierVotingType, MessageTaskType, VoteTaskType };
