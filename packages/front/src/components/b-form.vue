<template>
<form @submit.prevent="submit" @keyup.enter="submit">
    <slot />
</form>
</template>

<script setup lang="ts" generic="Schema extends z.ZodTypeAny">
import { ZodError, z } from 'zod';
import { computed, provide, ref, toRef, watch } from 'vue';
import { onMounted } from 'vue';

    const formRef = ref<HTMLFormElement | undefined>();

    const props = defineProps<{
        schema: Schema,
        onSubmit: (data: z.infer<Schema>) => void | Promise<void>
    }>();

    /** The keys of the data object */
    const keys = getZodObjectKeys(props.schema);

    async function submit(){
        if(validatedData.value) await props.onSubmit(validatedData.value);
        else console.error("No data!");
        if(data.value)
            for(const key in data.value)
                data.value[key] = "";
    }

    /** Data references to be provided to child inputs */
    const data = ref<Record<string, any>>({});

    /** Error references. Must be provided as readonly to child inputs */
    const errors = ref<Record<string, string>>({});

    const mainError = ref<string | undefined>();

    const validatedData = ref<z.infer<Schema> | undefined>();

    watch(data, () => {
        try{
            validatedData.value = props.schema.parse(data.value);
            for(const key in errors.value)
                errors.value[key] = "";
            mainError.value = undefined;
        } catch(e: unknown){
            if(isZodError(e)){
                mainError.value = e.message;
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
  