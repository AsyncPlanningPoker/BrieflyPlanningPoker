import { z, ZodTypeAny, ZodObject, ZodRawShape, ZodError, ZodIssueCode, ZodIssue } from 'zod';

type myt<T extends ZodObject<ZodRawShape>> = {
    [Property in keyof T["shape"]]: z.input<T["shape"][Property]>
};

export function schemaAndExtraArgs(dataSchema: ZodTypeAny, extraArgsSchema: ZodTypeAny): z.ZodEffects<any>{
    const o = z.object({
        data: dataSchema,
        extraargs: extraArgsSchema
    });
    const unrecognizedKeys: string[] = [];
    const a = z.preprocess((val: any) => {
        const ret: myt<typeof o> = {} as myt<typeof o>;
        for (const key in Object.keys(val)){
            if(key in ret.data){
                ret.data[key as keyof typeof ret.data] = val[key];
                continue;
            }
            if(key in ret.extraargs){
                ret.extraargs[key as keyof typeof ret.extraargs] = val[key];
                continue;
            }
            unrecognizedKeys.push(key);
        }
        if (unrecognizedKeys.length > 0) {
            const zIssue: ZodIssue = {
                code: ZodIssueCode.unrecognized_keys,
                path: [],
                keys: unrecognizedKeys,
                message: "Unrecognized keys"
            };
            throw new ZodError([zIssue]);
        }
        return ret;
    }, o);
    return a;
}

export * from './prisma-client'; 
export * from './generated/zod';