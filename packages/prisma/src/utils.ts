// import {
//     z, ZodObject, ZodRawShape,
//     ZodError, ZodIssueCode, ZodIssue,
//     ZodType, ZodTypeDef, UnknownKeysParam, ZodTypeAny
// } from 'zod';

type messageOrVote = {
    user: { email: string },
    round: number,
    createdAt: Date,
};

export type Vote = messageOrVote & { points: number }
export type Message = messageOrVote & { message: string }

const messageOrVoteIncludeSelect = {
    userEmail: true,
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

// type myt<T extends ZodObject<ZodRawShape>> = {
//     [Property in keyof T["shape"]]: z.input<T["shape"][Property]>
// };

// export function schemaAndExtraArgs<T1, T2>(
//     dataSchema: ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, T1, T1>,
//     extraArgsSchema: ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, T2, T2>
// ){
//     const o = z.object({
//         data: dataSchema,
//         extraArgs: extraArgsSchema
//     });
//     const unrecognizedKeys: string[] = [];
//     const a = z.preprocess((val: any) => {
//         const ret: myt<typeof o> = {
//             data: {},
//             extraArgs: {}
//         } as myt<typeof o>;
//         for (const key in val){
//             if(key in dataSchema.shape){
//                 ret.data[key as keyof typeof ret["data"]] = val[key];
//                 continue;
//             }
//             if(key in extraArgsSchema.shape){
//                 ret.extraArgs[key as keyof typeof ret["extraArgs"]] = val[key];
//                 continue;
//             }
//             unrecognizedKeys.push(key);
//         }
//         if (unrecognizedKeys.length > 0) {
//             const zIssue: ZodIssue = {
//                 code: ZodIssueCode.unrecognized_keys,
//                 path: [],
//                 keys: unrecognizedKeys,
//                 message: "Unrecognized key(s)"
//             };
//             throw new ZodError([zIssue]);
//         }
//         return ret;
//     }, o);
//     return a;
// }