interface Squad{
    id: string
    name: string
    percentual?: number
    maxRounds?: number
    tasks: Task[]
    users: User[]
};

interface Task{
    id: string
    squad?: Squad
    name: string
    description: string
    finished: boolean
    points?: number
    percentual: number
    maxRounds: number
    currentRound: number
    actions: (Vote | Message)[]
}

interface Action {
    user: User
    task: Task
    date: string
    round: number
    type: 'vote' | 'comment'
    content: number | string
}

interface Vote extends Action{
    points: number
}

interface Message extends Action{
    message: string
}

interface User{
    id: string
    email: string
    squads: Squad[]
}

export type { Squad, Task, User, Vote, Message }