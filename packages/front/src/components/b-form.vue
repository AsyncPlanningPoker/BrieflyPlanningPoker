<template>
<form @submit="onSubmit">
    <slot />
</form>
</template>

<script setup lang="ts" generic="Schema extends z.AnyZodObject | z.ZodEffects<z.AnyZodObject>">
import { ZodError, z } from 'zod';
import { computed, provide, ref, toRef, watch} from 'vue';

    const props = defineProps<{
        schema: Schema,
        onSubmit(): any
    }>();

    /** Data references to be provided to child inputs */
    const data = ref<Record<string, any>>({});

    /** Error references. Must be provided as readonly to child inputs */
    const errors = ref<Record<string, string>>({});
    
    const validatedData = ref<z.infer<Schema> | undefined>();
    watch(data, () => {
        try{
            validatedData.value = props.schema.parse(data.value);
            for(const key in errors.value)
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                errors.value[key] = "";
        } catch(e: unknown){
            if(e instanceof ZodError){
                for(const key in errors.value){
                    const issue = e.issues
                        .find((issue) => issue.path
                            .find((path) => path == key));
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    errors.value[key] = issue?.message ?? '';
                }
            } else console.error(e);
            validatedData.value = undefined;
        }
    }, {deep: true});

    const valid = computed(() => !!validatedData.value);

    defineExpose({ valid, validatedData });
    
    const sc = getZodObject(props.schema);

    for(const field in sc.shape) {
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

function getZodObject<T extends z.AnyZodObject | z.ZodEffects<z.AnyZodObject>>(obj: T): z.AnyZodObject{
    if(isZodObject(obj)) return obj;
    return getZodObject(obj._def.schema);
}
</script>
  
<style lang="scss" scoped>
</style>
  