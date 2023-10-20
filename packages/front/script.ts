interface obj{
    id: number
    round: number
}

const arr: obj[] = [
    { id: 1,round: 1 },
    { id: 2,round: 1 },
    { id: 3,round: 2 },
    { id: 4,round: 2 },
    { id: 5,round: 3 },
];

const o = arr.reduce((acc, curr) => {
    acc.set(curr.round, (acc.get(curr.round) ?? []).concat(curr));
    return acc;
}, new Map<number, obj[]>());

console.log(o);