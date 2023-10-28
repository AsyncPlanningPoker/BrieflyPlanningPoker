<template>
<form @submit.prevent="onSubmit">
    <slot />
</form>
</template>

<script setup lang="ts" generic="Schema extends z.ZodTypeAny">
import { ZodError, z } from 'zod';
import { computed, provide, ref, toRef, watch} from 'vue';

    const props = defineProps<{
        schema: Schema,
        onSubmit(): any
    }>();

    /** The keys of the data object */
    const keys = getZodObjectKeys(props.schema);

    /** Data references to be provided to child inputs */
    const data = ref<Record<string, any>>({});

    /** Error references. Must be provided as readonly to child inputs */
    const errors = ref<Record<string, string>>({});
    
    const validatedData = ref<z.infer<Schema> | undefined>();
    watch(data, () => {
        const issues: z.ZodIssue[] = [];
        for(const key of keys){
            if(typeof data.value[key] === 'string' && data.value[key] == '')
                issues.push({ code: "too_small", path: [key], inclusive: true,
                type: 'string', minimum: 1, message: "Required" });
        }
        try{
            validatedData.value = props.schema.parse(data.value);
            for(const key in errors.value)
                errors.value[key] = "";
            if(issues.length > 0) throw new ZodError([]);
        } catch(e: unknown){
            if(isZodError(e)){
                e.issues = e.issues.concat(issues);
                for(const key in errors.value){
                    const issue = e.issues
                        .find((issue) => issue.path
                            .find((path) => path == key));
                    errors.value[key] = issue?.message ?? '';
                }
            } else console.error(e);
            validatedData.value = undefined;
        }
    }, {deep: true});

    const valid = computed(() => !!validatedData.value);

    defineExpose({ valid, validatedData });

    for(const field of keys) {
        data.value[field] = "";
        errors.value[field] = "";
        provide(`Data: ${field}`, toRef(data.value, field));
        provide(`Error: ${field}`, toRef(() => errors.value[field]));
    }
</script>

<script lang="ts">
function isZodObject(obj: any): obj is z.AnyZodObject{
    return ("shape" in obj);
}

function getZodObjectKeys<T extends z.ZodTypeAny>(obj: T): string[]{
    if(isZodObject(obj))
        return obj.keyof().options; 
    return getZodObjectKeys(obj._def.schema);
}
function isZodError(e: unknown): e is ZodError{
    return (!!e) && (typeof e === 'object') && ('name' in e) && (e.name === 'ZodError');
}
</script>
  
<style lang="scss" scoped>
</style>
  