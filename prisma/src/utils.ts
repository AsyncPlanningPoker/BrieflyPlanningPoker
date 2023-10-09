type messageOrVote = {
    user: { email: string },
    round: number,
    createdAt: Date,
};

export type Vote = messageOrVote & { points: number }
export type Message = messageOrVote & { message: string }

const messageOrVoteIncludeSelect = {
    user: { 
        select: { email: true },
    },
    round: true,
    createdAt: true,
};

export const messageIncludeSelect = {
    ...messageOrVoteIncludeSelect,
    message: true
}

export const voteIncludeSelect = {
    ...messageOrVoteIncludeSelect,
    points: true
}