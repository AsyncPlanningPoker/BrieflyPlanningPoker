import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// DECIMAL
//------------------------------------------------------

export const DecimalJSLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({ d: z.array(z.number()), e: z.number(), s: z.number(), toFixed: z.function().args().returns(z.string()), });

export const DecimalJSLikeListSchema: z.ZodType<Prisma.DecimalJsLike[]> = z.object({ d: z.array(z.number()), e: z.number(), s: z.number(), toFixed: z.function().args().returns(z.string()), }).array();

export const DECIMAL_STRING_REGEX = /^[0-9.,e+-bxffo_cp]+$|Infinity|NaN/;

export const isValidDecimalInput =
  (v?: null | string | number | Prisma.DecimalJsLike): v is string | number | Prisma.DecimalJsLike => {
    if (v === undefined || v === null) return false;
    return (
      (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) ||
      (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
      typeof v === 'number'
    )
  };

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const SquadScalarFieldEnumSchema = z.enum(['id','name','currentMaxRounds','currentPercentual','enabled','updatedAt','createdAt']);

export const UsersOnSquadsScalarFieldEnumSchema = z.enum(['userId','squadId','enabled','updatedAt','createdAt']);

export const TaskScalarFieldEnumSchema = z.enum(['id','squadId','name','description','maxRounds','percentual','points','finished','active','enabled','updatedAt','createdAt']);

export const MessagesOnTasksScalarFieldEnumSchema = z.enum(['taskId','userId','currentRound','message','enabled','updatedAt','createdAt']);

export const PointsOnTasksScalarFieldEnumSchema = z.enum(['taskId','userId','currentRound','points','enabled','updatedAt','createdAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','password','enabled','updatedAt','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// SQUAD SCHEMA
/////////////////////////////////////////

export const SquadSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  currentMaxRounds: z.number().int(),
  currentPercentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: "Field 'currentPercentual' must be a Decimal. Location: ['Models', 'Squad']",  }),
  enabled: z.boolean().nullable(),
  updatedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date().nullable(),
})

export type Squad = z.infer<typeof SquadSchema>

/////////////////////////////////////////
// USERS ON SQUADS SCHEMA
/////////////////////////////////////////

export const UsersOnSquadsSchema = z.object({
  userId: z.string(),
  squadId: z.string(),
  enabled: z.boolean().nullable(),
  updatedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date().nullable(),
})

export type UsersOnSquads = z.infer<typeof UsersOnSquadsSchema>

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

export const TaskSchema = z.object({
  id: z.string().uuid(),
  squadId: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  maxRounds: z.number().int(),
  percentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: "Field 'percentual' must be a Decimal. Location: ['Models', 'Task']",  }),
  points: z.number().int().nullable(),
  finished: z.boolean().nullable(),
  active: z.boolean().nullable(),
  enabled: z.boolean().nullable(),
  updatedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date().nullable(),
})

export type Task = z.infer<typeof TaskSchema>

/////////////////////////////////////////
// MESSAGES ON TASKS SCHEMA
/////////////////////////////////////////

export const MessagesOnTasksSchema = z.object({
  taskId: z.string(),
  userId: z.string(),
  currentRound: z.number().int(),
  message: z.string(),
  enabled: z.boolean().nullable(),
  updatedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date().nullable(),
})

export type MessagesOnTasks = z.infer<typeof MessagesOnTasksSchema>

/////////////////////////////////////////
// POINTS ON TASKS SCHEMA
/////////////////////////////////////////

export const PointsOnTasksSchema = z.object({
  taskId: z.string(),
  userId: z.string(),
  currentRound: z.number().int(),
  points: z.number().int(),
  enabled: z.boolean().nullable(),
  updatedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date().nullable(),
})

export type PointsOnTasks = z.infer<typeof PointsOnTasksSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  enabled: z.boolean().nullable(),
  updatedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// SQUAD
//------------------------------------------------------

export const SquadIncludeSchema: z.ZodType<Prisma.SquadInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UsersOnSquadsFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SquadCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SquadArgsSchema: z.ZodType<Prisma.SquadDefaultArgs> = z.object({
  select: z.lazy(() => SquadSelectSchema).optional(),
  include: z.lazy(() => SquadIncludeSchema).optional(),
}).strict();

export const SquadCountOutputTypeArgsSchema: z.ZodType<Prisma.SquadCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => SquadCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SquadCountOutputTypeSelectSchema: z.ZodType<Prisma.SquadCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
  tasks: z.boolean().optional(),
}).strict();

export const SquadSelectSchema: z.ZodType<Prisma.SquadSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  currentMaxRounds: z.boolean().optional(),
  currentPercentual: z.boolean().optional(),
  enabled: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UsersOnSquadsFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SquadCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USERS ON SQUADS
//------------------------------------------------------

export const UsersOnSquadsIncludeSchema: z.ZodType<Prisma.UsersOnSquadsInclude> = z.object({
  squad: z.union([z.boolean(),z.lazy(() => SquadArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UsersOnSquadsArgsSchema: z.ZodType<Prisma.UsersOnSquadsDefaultArgs> = z.object({
  select: z.lazy(() => UsersOnSquadsSelectSchema).optional(),
  include: z.lazy(() => UsersOnSquadsIncludeSchema).optional(),
}).strict();

export const UsersOnSquadsSelectSchema: z.ZodType<Prisma.UsersOnSquadsSelect> = z.object({
  userId: z.boolean().optional(),
  squadId: z.boolean().optional(),
  enabled: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  squad: z.union([z.boolean(),z.lazy(() => SquadArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// TASK
//------------------------------------------------------

export const TaskIncludeSchema: z.ZodType<Prisma.TaskInclude> = z.object({
  squad: z.union([z.boolean(),z.lazy(() => SquadArgsSchema)]).optional(),
  messagesOnTasks: z.union([z.boolean(),z.lazy(() => MessagesOnTasksFindManyArgsSchema)]).optional(),
  pointsOnTasks: z.union([z.boolean(),z.lazy(() => PointsOnTasksFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TaskArgsSchema: z.ZodType<Prisma.TaskDefaultArgs> = z.object({
  select: z.lazy(() => TaskSelectSchema).optional(),
  include: z.lazy(() => TaskIncludeSchema).optional(),
}).strict();

export const TaskCountOutputTypeArgsSchema: z.ZodType<Prisma.TaskCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TaskCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TaskCountOutputTypeSelectSchema: z.ZodType<Prisma.TaskCountOutputTypeSelect> = z.object({
  messagesOnTasks: z.boolean().optional(),
  pointsOnTasks: z.boolean().optional(),
}).strict();

export const TaskSelectSchema: z.ZodType<Prisma.TaskSelect> = z.object({
  id: z.boolean().optional(),
  squadId: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  maxRounds: z.boolean().optional(),
  percentual: z.boolean().optional(),
  points: z.boolean().optional(),
  finished: z.boolean().optional(),
  active: z.boolean().optional(),
  enabled: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  squad: z.union([z.boolean(),z.lazy(() => SquadArgsSchema)]).optional(),
  messagesOnTasks: z.union([z.boolean(),z.lazy(() => MessagesOnTasksFindManyArgsSchema)]).optional(),
  pointsOnTasks: z.union([z.boolean(),z.lazy(() => PointsOnTasksFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MESSAGES ON TASKS
//------------------------------------------------------

export const MessagesOnTasksIncludeSchema: z.ZodType<Prisma.MessagesOnTasksInclude> = z.object({
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const MessagesOnTasksArgsSchema: z.ZodType<Prisma.MessagesOnTasksDefaultArgs> = z.object({
  select: z.lazy(() => MessagesOnTasksSelectSchema).optional(),
  include: z.lazy(() => MessagesOnTasksIncludeSchema).optional(),
}).strict();

export const MessagesOnTasksSelectSchema: z.ZodType<Prisma.MessagesOnTasksSelect> = z.object({
  taskId: z.boolean().optional(),
  userId: z.boolean().optional(),
  currentRound: z.boolean().optional(),
  message: z.boolean().optional(),
  enabled: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// POINTS ON TASKS
//------------------------------------------------------

export const PointsOnTasksIncludeSchema: z.ZodType<Prisma.PointsOnTasksInclude> = z.object({
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const PointsOnTasksArgsSchema: z.ZodType<Prisma.PointsOnTasksDefaultArgs> = z.object({
  select: z.lazy(() => PointsOnTasksSelectSchema).optional(),
  include: z.lazy(() => PointsOnTasksIncludeSchema).optional(),
}).strict();

export const PointsOnTasksSelectSchema: z.ZodType<Prisma.PointsOnTasksSelect> = z.object({
  taskId: z.boolean().optional(),
  userId: z.boolean().optional(),
  currentRound: z.boolean().optional(),
  points: z.boolean().optional(),
  enabled: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  UsersOnSquads: z.union([z.boolean(),z.lazy(() => UsersOnSquadsFindManyArgsSchema)]).optional(),
  MessagesOnTasks: z.union([z.boolean(),z.lazy(() => MessagesOnTasksFindManyArgsSchema)]).optional(),
  PointsOnTasks: z.union([z.boolean(),z.lazy(() => PointsOnTasksFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  UsersOnSquads: z.boolean().optional(),
  MessagesOnTasks: z.boolean().optional(),
  PointsOnTasks: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  enabled: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  UsersOnSquads: z.union([z.boolean(),z.lazy(() => UsersOnSquadsFindManyArgsSchema)]).optional(),
  MessagesOnTasks: z.union([z.boolean(),z.lazy(() => MessagesOnTasksFindManyArgsSchema)]).optional(),
  PointsOnTasks: z.union([z.boolean(),z.lazy(() => PointsOnTasksFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const SquadWhereInputSchema: z.ZodType<Prisma.SquadWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SquadWhereInputSchema),z.lazy(() => SquadWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SquadWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SquadWhereInputSchema),z.lazy(() => SquadWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  currentMaxRounds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  currentPercentual: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  users: z.lazy(() => UsersOnSquadsListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict();

export const SquadOrderByWithRelationInputSchema: z.ZodType<Prisma.SquadOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  currentMaxRounds: z.lazy(() => SortOrderSchema).optional(),
  currentPercentual: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users: z.lazy(() => UsersOnSquadsOrderByRelationAggregateInputSchema).optional(),
  tasks: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional()
}).strict();

export const SquadWhereUniqueInputSchema: z.ZodType<Prisma.SquadWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => SquadWhereInputSchema),z.lazy(() => SquadWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SquadWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SquadWhereInputSchema),z.lazy(() => SquadWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  currentMaxRounds: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  currentPercentual: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  users: z.lazy(() => UsersOnSquadsListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict());

export const SquadOrderByWithAggregationInputSchema: z.ZodType<Prisma.SquadOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  currentMaxRounds: z.lazy(() => SortOrderSchema).optional(),
  currentPercentual: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => SquadCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SquadAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SquadMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SquadMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SquadSumOrderByAggregateInputSchema).optional()
}).strict();

export const SquadScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SquadScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SquadScalarWhereWithAggregatesInputSchema),z.lazy(() => SquadScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SquadScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SquadScalarWhereWithAggregatesInputSchema),z.lazy(() => SquadScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  currentMaxRounds: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  currentPercentual: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const UsersOnSquadsWhereInputSchema: z.ZodType<Prisma.UsersOnSquadsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UsersOnSquadsWhereInputSchema),z.lazy(() => UsersOnSquadsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersOnSquadsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersOnSquadsWhereInputSchema),z.lazy(() => UsersOnSquadsWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  squadId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  squad: z.union([ z.lazy(() => SquadRelationFilterSchema),z.lazy(() => SquadWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const UsersOnSquadsOrderByWithRelationInputSchema: z.ZodType<Prisma.UsersOnSquadsOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  squadId: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  squad: z.lazy(() => SquadOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const UsersOnSquadsWhereUniqueInputSchema: z.ZodType<Prisma.UsersOnSquadsWhereUniqueInput> = z.object({
  userId_squadId: z.lazy(() => UsersOnSquadsUserIdSquadIdCompoundUniqueInputSchema)
})
.and(z.object({
  userId_squadId: z.lazy(() => UsersOnSquadsUserIdSquadIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UsersOnSquadsWhereInputSchema),z.lazy(() => UsersOnSquadsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersOnSquadsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersOnSquadsWhereInputSchema),z.lazy(() => UsersOnSquadsWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  squadId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  squad: z.union([ z.lazy(() => SquadRelationFilterSchema),z.lazy(() => SquadWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const UsersOnSquadsOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsersOnSquadsOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  squadId: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UsersOnSquadsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UsersOnSquadsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UsersOnSquadsMinOrderByAggregateInputSchema).optional()
}).strict();

export const UsersOnSquadsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UsersOnSquadsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UsersOnSquadsScalarWhereWithAggregatesInputSchema),z.lazy(() => UsersOnSquadsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersOnSquadsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersOnSquadsScalarWhereWithAggregatesInputSchema),z.lazy(() => UsersOnSquadsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  squadId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const TaskWhereInputSchema: z.ZodType<Prisma.TaskWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  squadId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  maxRounds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  percentual: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  points: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  finished: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  squad: z.union([ z.lazy(() => SquadRelationFilterSchema),z.lazy(() => SquadWhereInputSchema) ]).optional(),
  messagesOnTasks: z.lazy(() => MessagesOnTasksListRelationFilterSchema).optional(),
  pointsOnTasks: z.lazy(() => PointsOnTasksListRelationFilterSchema).optional()
}).strict();

export const TaskOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  squadId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  maxRounds: z.lazy(() => SortOrderSchema).optional(),
  percentual: z.lazy(() => SortOrderSchema).optional(),
  points: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  finished: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  active: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  enabled: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  squad: z.lazy(() => SquadOrderByWithRelationInputSchema).optional(),
  messagesOnTasks: z.lazy(() => MessagesOnTasksOrderByRelationAggregateInputSchema).optional(),
  pointsOnTasks: z.lazy(() => PointsOnTasksOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TaskWhereUniqueInputSchema: z.ZodType<Prisma.TaskWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  squadId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  maxRounds: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  percentual: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  points: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  finished: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  squad: z.union([ z.lazy(() => SquadRelationFilterSchema),z.lazy(() => SquadWhereInputSchema) ]).optional(),
  messagesOnTasks: z.lazy(() => MessagesOnTasksListRelationFilterSchema).optional(),
  pointsOnTasks: z.lazy(() => PointsOnTasksListRelationFilterSchema).optional()
}).strict());

export const TaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  squadId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  maxRounds: z.lazy(() => SortOrderSchema).optional(),
  percentual: z.lazy(() => SortOrderSchema).optional(),
  points: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  finished: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  active: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  enabled: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TaskCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TaskAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TaskSumOrderByAggregateInputSchema).optional()
}).strict();

export const TaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  squadId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  maxRounds: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  percentual: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  points: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  finished: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  enabled: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const MessagesOnTasksWhereInputSchema: z.ZodType<Prisma.MessagesOnTasksWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessagesOnTasksWhereInputSchema),z.lazy(() => MessagesOnTasksWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessagesOnTasksWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessagesOnTasksWhereInputSchema),z.lazy(() => MessagesOnTasksWhereInputSchema).array() ]).optional(),
  taskId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  currentRound: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  task: z.union([ z.lazy(() => TaskRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const MessagesOnTasksOrderByWithRelationInputSchema: z.ZodType<Prisma.MessagesOnTasksOrderByWithRelationInput> = z.object({
  taskId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  currentRound: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  task: z.lazy(() => TaskOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const MessagesOnTasksWhereUniqueInputSchema: z.ZodType<Prisma.MessagesOnTasksWhereUniqueInput> = z.object({
  taskId_userId: z.lazy(() => MessagesOnTasksTaskIdUserIdCompoundUniqueInputSchema)
})
.and(z.object({
  taskId_userId: z.lazy(() => MessagesOnTasksTaskIdUserIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => MessagesOnTasksWhereInputSchema),z.lazy(() => MessagesOnTasksWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessagesOnTasksWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessagesOnTasksWhereInputSchema),z.lazy(() => MessagesOnTasksWhereInputSchema).array() ]).optional(),
  taskId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  currentRound: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  task: z.union([ z.lazy(() => TaskRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const MessagesOnTasksOrderByWithAggregationInputSchema: z.ZodType<Prisma.MessagesOnTasksOrderByWithAggregationInput> = z.object({
  taskId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  currentRound: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => MessagesOnTasksCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MessagesOnTasksAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MessagesOnTasksMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MessagesOnTasksMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MessagesOnTasksSumOrderByAggregateInputSchema).optional()
}).strict();

export const MessagesOnTasksScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MessagesOnTasksScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MessagesOnTasksScalarWhereWithAggregatesInputSchema),z.lazy(() => MessagesOnTasksScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessagesOnTasksScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessagesOnTasksScalarWhereWithAggregatesInputSchema),z.lazy(() => MessagesOnTasksScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  taskId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  currentRound: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  message: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const PointsOnTasksWhereInputSchema: z.ZodType<Prisma.PointsOnTasksWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PointsOnTasksWhereInputSchema),z.lazy(() => PointsOnTasksWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PointsOnTasksWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PointsOnTasksWhereInputSchema),z.lazy(() => PointsOnTasksWhereInputSchema).array() ]).optional(),
  taskId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  currentRound: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  points: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  task: z.union([ z.lazy(() => TaskRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const PointsOnTasksOrderByWithRelationInputSchema: z.ZodType<Prisma.PointsOnTasksOrderByWithRelationInput> = z.object({
  taskId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  currentRound: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  task: z.lazy(() => TaskOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const PointsOnTasksWhereUniqueInputSchema: z.ZodType<Prisma.PointsOnTasksWhereUniqueInput> = z.object({
  taskId_userId: z.lazy(() => PointsOnTasksTaskIdUserIdCompoundUniqueInputSchema)
})
.and(z.object({
  taskId_userId: z.lazy(() => PointsOnTasksTaskIdUserIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PointsOnTasksWhereInputSchema),z.lazy(() => PointsOnTasksWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PointsOnTasksWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PointsOnTasksWhereInputSchema),z.lazy(() => PointsOnTasksWhereInputSchema).array() ]).optional(),
  taskId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  currentRound: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  points: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  task: z.union([ z.lazy(() => TaskRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const PointsOnTasksOrderByWithAggregationInputSchema: z.ZodType<Prisma.PointsOnTasksOrderByWithAggregationInput> = z.object({
  taskId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  currentRound: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PointsOnTasksCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PointsOnTasksAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PointsOnTasksMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PointsOnTasksMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PointsOnTasksSumOrderByAggregateInputSchema).optional()
}).strict();

export const PointsOnTasksScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PointsOnTasksScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PointsOnTasksScalarWhereWithAggregatesInputSchema),z.lazy(() => PointsOnTasksScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PointsOnTasksScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PointsOnTasksScalarWhereWithAggregatesInputSchema),z.lazy(() => PointsOnTasksScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  taskId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  currentRound: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  points: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  UsersOnSquads: z.lazy(() => UsersOnSquadsListRelationFilterSchema).optional(),
  MessagesOnTasks: z.lazy(() => MessagesOnTasksListRelationFilterSchema).optional(),
  PointsOnTasks: z.lazy(() => PointsOnTasksListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  UsersOnSquads: z.lazy(() => UsersOnSquadsOrderByRelationAggregateInputSchema).optional(),
  MessagesOnTasks: z.lazy(() => MessagesOnTasksOrderByRelationAggregateInputSchema).optional(),
  PointsOnTasks: z.lazy(() => PointsOnTasksOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    email: z.string().email()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    email: z.string().email(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  email: z.string().email().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  UsersOnSquads: z.lazy(() => UsersOnSquadsListRelationFilterSchema).optional(),
  MessagesOnTasks: z.lazy(() => MessagesOnTasksListRelationFilterSchema).optional(),
  PointsOnTasks: z.lazy(() => PointsOnTasksListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const SquadCreateInputSchema: z.ZodType<Prisma.SquadCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  currentMaxRounds: z.number().int(),
  currentPercentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  users: z.lazy(() => UsersOnSquadsCreateNestedManyWithoutSquadInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutSquadInputSchema).optional()
}).strict();

export const SquadUncheckedCreateInputSchema: z.ZodType<Prisma.SquadUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  currentMaxRounds: z.number().int(),
  currentPercentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  users: z.lazy(() => UsersOnSquadsUncheckedCreateNestedManyWithoutSquadInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutSquadInputSchema).optional()
}).strict();

export const SquadUpdateInputSchema: z.ZodType<Prisma.SquadUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentMaxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentPercentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UsersOnSquadsUpdateManyWithoutSquadNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutSquadNestedInputSchema).optional()
}).strict();

export const SquadUncheckedUpdateInputSchema: z.ZodType<Prisma.SquadUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentMaxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentPercentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UsersOnSquadsUncheckedUpdateManyWithoutSquadNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutSquadNestedInputSchema).optional()
}).strict();

export const SquadCreateManyInputSchema: z.ZodType<Prisma.SquadCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  currentMaxRounds: z.number().int(),
  currentPercentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const SquadUpdateManyMutationInputSchema: z.ZodType<Prisma.SquadUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentMaxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentPercentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SquadUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SquadUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentMaxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentPercentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsersOnSquadsCreateInputSchema: z.ZodType<Prisma.UsersOnSquadsCreateInput> = z.object({
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  squad: z.lazy(() => SquadCreateNestedOneWithoutUsersInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutUsersOnSquadsInputSchema)
}).strict();

export const UsersOnSquadsUncheckedCreateInputSchema: z.ZodType<Prisma.UsersOnSquadsUncheckedCreateInput> = z.object({
  userId: z.string(),
  squadId: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const UsersOnSquadsUpdateInputSchema: z.ZodType<Prisma.UsersOnSquadsUpdateInput> = z.object({
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  squad: z.lazy(() => SquadUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUsersOnSquadsNestedInputSchema).optional()
}).strict();

export const UsersOnSquadsUncheckedUpdateInputSchema: z.ZodType<Prisma.UsersOnSquadsUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  squadId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsersOnSquadsCreateManyInputSchema: z.ZodType<Prisma.UsersOnSquadsCreateManyInput> = z.object({
  userId: z.string(),
  squadId: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const UsersOnSquadsUpdateManyMutationInputSchema: z.ZodType<Prisma.UsersOnSquadsUpdateManyMutationInput> = z.object({
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsersOnSquadsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsersOnSquadsUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  squadId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TaskCreateInputSchema: z.ZodType<Prisma.TaskCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  maxRounds: z.number().int(),
  percentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  points: z.number().int().optional().nullable(),
  finished: z.boolean().optional().nullable(),
  active: z.boolean().optional().nullable(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  squad: z.lazy(() => SquadCreateNestedOneWithoutTasksInputSchema),
  messagesOnTasks: z.lazy(() => MessagesOnTasksCreateNestedManyWithoutTaskInputSchema).optional(),
  pointsOnTasks: z.lazy(() => PointsOnTasksCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateInputSchema: z.ZodType<Prisma.TaskUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  squadId: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  maxRounds: z.number().int(),
  percentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  points: z.number().int().optional().nullable(),
  finished: z.boolean().optional().nullable(),
  active: z.boolean().optional().nullable(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  messagesOnTasks: z.lazy(() => MessagesOnTasksUncheckedCreateNestedManyWithoutTaskInputSchema).optional(),
  pointsOnTasks: z.lazy(() => PointsOnTasksUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUpdateInputSchema: z.ZodType<Prisma.TaskUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  percentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  squad: z.lazy(() => SquadUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  messagesOnTasks: z.lazy(() => MessagesOnTasksUpdateManyWithoutTaskNestedInputSchema).optional(),
  pointsOnTasks: z.lazy(() => PointsOnTasksUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  squadId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  percentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  messagesOnTasks: z.lazy(() => MessagesOnTasksUncheckedUpdateManyWithoutTaskNestedInputSchema).optional(),
  pointsOnTasks: z.lazy(() => PointsOnTasksUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskCreateManyInputSchema: z.ZodType<Prisma.TaskCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  squadId: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  maxRounds: z.number().int(),
  percentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  points: z.number().int().optional().nullable(),
  finished: z.boolean().optional().nullable(),
  active: z.boolean().optional().nullable(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const TaskUpdateManyMutationInputSchema: z.ZodType<Prisma.TaskUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  percentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  squadId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  percentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MessagesOnTasksCreateInputSchema: z.ZodType<Prisma.MessagesOnTasksCreateInput> = z.object({
  currentRound: z.number().int(),
  message: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  task: z.lazy(() => TaskCreateNestedOneWithoutMessagesOnTasksInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutMessagesOnTasksInputSchema)
}).strict();

export const MessagesOnTasksUncheckedCreateInputSchema: z.ZodType<Prisma.MessagesOnTasksUncheckedCreateInput> = z.object({
  taskId: z.string(),
  userId: z.string(),
  currentRound: z.number().int(),
  message: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const MessagesOnTasksUpdateInputSchema: z.ZodType<Prisma.MessagesOnTasksUpdateInput> = z.object({
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutMessagesOnTasksNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMessagesOnTasksNestedInputSchema).optional()
}).strict();

export const MessagesOnTasksUncheckedUpdateInputSchema: z.ZodType<Prisma.MessagesOnTasksUncheckedUpdateInput> = z.object({
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MessagesOnTasksCreateManyInputSchema: z.ZodType<Prisma.MessagesOnTasksCreateManyInput> = z.object({
  taskId: z.string(),
  userId: z.string(),
  currentRound: z.number().int(),
  message: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const MessagesOnTasksUpdateManyMutationInputSchema: z.ZodType<Prisma.MessagesOnTasksUpdateManyMutationInput> = z.object({
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MessagesOnTasksUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MessagesOnTasksUncheckedUpdateManyInput> = z.object({
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PointsOnTasksCreateInputSchema: z.ZodType<Prisma.PointsOnTasksCreateInput> = z.object({
  currentRound: z.number().int(),
  points: z.number().int(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  task: z.lazy(() => TaskCreateNestedOneWithoutPointsOnTasksInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutPointsOnTasksInputSchema)
}).strict();

export const PointsOnTasksUncheckedCreateInputSchema: z.ZodType<Prisma.PointsOnTasksUncheckedCreateInput> = z.object({
  taskId: z.string(),
  userId: z.string(),
  currentRound: z.number().int(),
  points: z.number().int(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const PointsOnTasksUpdateInputSchema: z.ZodType<Prisma.PointsOnTasksUpdateInput> = z.object({
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutPointsOnTasksNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPointsOnTasksNestedInputSchema).optional()
}).strict();

export const PointsOnTasksUncheckedUpdateInputSchema: z.ZodType<Prisma.PointsOnTasksUncheckedUpdateInput> = z.object({
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PointsOnTasksCreateManyInputSchema: z.ZodType<Prisma.PointsOnTasksCreateManyInput> = z.object({
  taskId: z.string(),
  userId: z.string(),
  currentRound: z.number().int(),
  points: z.number().int(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const PointsOnTasksUpdateManyMutationInputSchema: z.ZodType<Prisma.PointsOnTasksUpdateManyMutationInput> = z.object({
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PointsOnTasksUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PointsOnTasksUncheckedUpdateManyInput> = z.object({
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  UsersOnSquads: z.lazy(() => UsersOnSquadsCreateNestedManyWithoutUserInputSchema).optional(),
  MessagesOnTasks: z.lazy(() => MessagesOnTasksCreateNestedManyWithoutUserInputSchema).optional(),
  PointsOnTasks: z.lazy(() => PointsOnTasksCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  UsersOnSquads: z.lazy(() => UsersOnSquadsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  MessagesOnTasks: z.lazy(() => MessagesOnTasksUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  PointsOnTasks: z.lazy(() => PointsOnTasksUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  UsersOnSquads: z.lazy(() => UsersOnSquadsUpdateManyWithoutUserNestedInputSchema).optional(),
  MessagesOnTasks: z.lazy(() => MessagesOnTasksUpdateManyWithoutUserNestedInputSchema).optional(),
  PointsOnTasks: z.lazy(() => PointsOnTasksUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  UsersOnSquads: z.lazy(() => UsersOnSquadsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  MessagesOnTasks: z.lazy(() => MessagesOnTasksUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  PointsOnTasks: z.lazy(() => PointsOnTasksUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DecimalFilterSchema: z.ZodType<Prisma.DecimalFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UsersOnSquadsListRelationFilterSchema: z.ZodType<Prisma.UsersOnSquadsListRelationFilter> = z.object({
  every: z.lazy(() => UsersOnSquadsWhereInputSchema).optional(),
  some: z.lazy(() => UsersOnSquadsWhereInputSchema).optional(),
  none: z.lazy(() => UsersOnSquadsWhereInputSchema).optional()
}).strict();

export const TaskListRelationFilterSchema: z.ZodType<Prisma.TaskListRelationFilter> = z.object({
  every: z.lazy(() => TaskWhereInputSchema).optional(),
  some: z.lazy(() => TaskWhereInputSchema).optional(),
  none: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UsersOnSquadsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UsersOnSquadsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TaskOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SquadCountOrderByAggregateInputSchema: z.ZodType<Prisma.SquadCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  currentMaxRounds: z.lazy(() => SortOrderSchema).optional(),
  currentPercentual: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SquadAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SquadAvgOrderByAggregateInput> = z.object({
  currentMaxRounds: z.lazy(() => SortOrderSchema).optional(),
  currentPercentual: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SquadMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SquadMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  currentMaxRounds: z.lazy(() => SortOrderSchema).optional(),
  currentPercentual: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SquadMinOrderByAggregateInputSchema: z.ZodType<Prisma.SquadMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  currentMaxRounds: z.lazy(() => SortOrderSchema).optional(),
  currentPercentual: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SquadSumOrderByAggregateInputSchema: z.ZodType<Prisma.SquadSumOrderByAggregateInput> = z.object({
  currentMaxRounds: z.lazy(() => SortOrderSchema).optional(),
  currentPercentual: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const DecimalWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const SquadRelationFilterSchema: z.ZodType<Prisma.SquadRelationFilter> = z.object({
  is: z.lazy(() => SquadWhereInputSchema).optional(),
  isNot: z.lazy(() => SquadWhereInputSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UsersOnSquadsUserIdSquadIdCompoundUniqueInputSchema: z.ZodType<Prisma.UsersOnSquadsUserIdSquadIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  squadId: z.string()
}).strict();

export const UsersOnSquadsCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsersOnSquadsCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  squadId: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersOnSquadsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsersOnSquadsMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  squadId: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersOnSquadsMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsersOnSquadsMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  squadId: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const MessagesOnTasksListRelationFilterSchema: z.ZodType<Prisma.MessagesOnTasksListRelationFilter> = z.object({
  every: z.lazy(() => MessagesOnTasksWhereInputSchema).optional(),
  some: z.lazy(() => MessagesOnTasksWhereInputSchema).optional(),
  none: z.lazy(() => MessagesOnTasksWhereInputSchema).optional()
}).strict();

export const PointsOnTasksListRelationFilterSchema: z.ZodType<Prisma.PointsOnTasksListRelationFilter> = z.object({
  every: z.lazy(() => PointsOnTasksWhereInputSchema).optional(),
  some: z.lazy(() => PointsOnTasksWhereInputSchema).optional(),
  none: z.lazy(() => PointsOnTasksWhereInputSchema).optional()
}).strict();

export const MessagesOnTasksOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MessagesOnTasksOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PointsOnTasksOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PointsOnTasksOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.TaskCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  squadId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  maxRounds: z.lazy(() => SortOrderSchema).optional(),
  percentual: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  finished: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TaskAvgOrderByAggregateInput> = z.object({
  maxRounds: z.lazy(() => SortOrderSchema).optional(),
  percentual: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  squadId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  maxRounds: z.lazy(() => SortOrderSchema).optional(),
  percentual: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  finished: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  squadId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  maxRounds: z.lazy(() => SortOrderSchema).optional(),
  percentual: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  finished: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskSumOrderByAggregateInputSchema: z.ZodType<Prisma.TaskSumOrderByAggregateInput> = z.object({
  maxRounds: z.lazy(() => SortOrderSchema).optional(),
  percentual: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const TaskRelationFilterSchema: z.ZodType<Prisma.TaskRelationFilter> = z.object({
  is: z.lazy(() => TaskWhereInputSchema).optional(),
  isNot: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const MessagesOnTasksTaskIdUserIdCompoundUniqueInputSchema: z.ZodType<Prisma.MessagesOnTasksTaskIdUserIdCompoundUniqueInput> = z.object({
  taskId: z.string(),
  userId: z.string()
}).strict();

export const MessagesOnTasksCountOrderByAggregateInputSchema: z.ZodType<Prisma.MessagesOnTasksCountOrderByAggregateInput> = z.object({
  taskId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  currentRound: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessagesOnTasksAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MessagesOnTasksAvgOrderByAggregateInput> = z.object({
  currentRound: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessagesOnTasksMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MessagesOnTasksMaxOrderByAggregateInput> = z.object({
  taskId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  currentRound: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessagesOnTasksMinOrderByAggregateInputSchema: z.ZodType<Prisma.MessagesOnTasksMinOrderByAggregateInput> = z.object({
  taskId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  currentRound: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessagesOnTasksSumOrderByAggregateInputSchema: z.ZodType<Prisma.MessagesOnTasksSumOrderByAggregateInput> = z.object({
  currentRound: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PointsOnTasksTaskIdUserIdCompoundUniqueInputSchema: z.ZodType<Prisma.PointsOnTasksTaskIdUserIdCompoundUniqueInput> = z.object({
  taskId: z.string(),
  userId: z.string()
}).strict();

export const PointsOnTasksCountOrderByAggregateInputSchema: z.ZodType<Prisma.PointsOnTasksCountOrderByAggregateInput> = z.object({
  taskId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  currentRound: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PointsOnTasksAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PointsOnTasksAvgOrderByAggregateInput> = z.object({
  currentRound: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PointsOnTasksMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PointsOnTasksMaxOrderByAggregateInput> = z.object({
  taskId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  currentRound: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PointsOnTasksMinOrderByAggregateInputSchema: z.ZodType<Prisma.PointsOnTasksMinOrderByAggregateInput> = z.object({
  taskId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  currentRound: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PointsOnTasksSumOrderByAggregateInputSchema: z.ZodType<Prisma.PointsOnTasksSumOrderByAggregateInput> = z.object({
  currentRound: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  enabled: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersOnSquadsCreateNestedManyWithoutSquadInputSchema: z.ZodType<Prisma.UsersOnSquadsCreateNestedManyWithoutSquadInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnSquadsCreateWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsCreateWithoutSquadInputSchema).array(),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutSquadInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnSquadsCreateOrConnectWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsCreateOrConnectWithoutSquadInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnSquadsCreateManySquadInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedManyWithoutSquadInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutSquadInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutSquadInputSchema),z.lazy(() => TaskCreateWithoutSquadInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutSquadInputSchema),z.lazy(() => TaskUncheckedCreateWithoutSquadInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutSquadInputSchema),z.lazy(() => TaskCreateOrConnectWithoutSquadInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManySquadInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsersOnSquadsUncheckedCreateNestedManyWithoutSquadInputSchema: z.ZodType<Prisma.UsersOnSquadsUncheckedCreateNestedManyWithoutSquadInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnSquadsCreateWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsCreateWithoutSquadInputSchema).array(),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutSquadInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnSquadsCreateOrConnectWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsCreateOrConnectWithoutSquadInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnSquadsCreateManySquadInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedCreateNestedManyWithoutSquadInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutSquadInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutSquadInputSchema),z.lazy(() => TaskCreateWithoutSquadInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutSquadInputSchema),z.lazy(() => TaskUncheckedCreateWithoutSquadInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutSquadInputSchema),z.lazy(() => TaskCreateOrConnectWithoutSquadInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManySquadInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DecimalFieldUpdateOperationsInput> = z.object({
  set: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  increment: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const UsersOnSquadsUpdateManyWithoutSquadNestedInputSchema: z.ZodType<Prisma.UsersOnSquadsUpdateManyWithoutSquadNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnSquadsCreateWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsCreateWithoutSquadInputSchema).array(),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutSquadInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnSquadsCreateOrConnectWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsCreateOrConnectWithoutSquadInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersOnSquadsUpsertWithWhereUniqueWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsUpsertWithWhereUniqueWithoutSquadInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnSquadsCreateManySquadInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersOnSquadsUpdateWithWhereUniqueWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsUpdateWithWhereUniqueWithoutSquadInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersOnSquadsUpdateManyWithWhereWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsUpdateManyWithWhereWithoutSquadInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersOnSquadsScalarWhereInputSchema),z.lazy(() => UsersOnSquadsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUpdateManyWithoutSquadNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutSquadNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutSquadInputSchema),z.lazy(() => TaskCreateWithoutSquadInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutSquadInputSchema),z.lazy(() => TaskUncheckedCreateWithoutSquadInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutSquadInputSchema),z.lazy(() => TaskCreateOrConnectWithoutSquadInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutSquadInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutSquadInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManySquadInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutSquadInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutSquadInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutSquadInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutSquadInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersOnSquadsUncheckedUpdateManyWithoutSquadNestedInputSchema: z.ZodType<Prisma.UsersOnSquadsUncheckedUpdateManyWithoutSquadNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnSquadsCreateWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsCreateWithoutSquadInputSchema).array(),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutSquadInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnSquadsCreateOrConnectWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsCreateOrConnectWithoutSquadInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersOnSquadsUpsertWithWhereUniqueWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsUpsertWithWhereUniqueWithoutSquadInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnSquadsCreateManySquadInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersOnSquadsUpdateWithWhereUniqueWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsUpdateWithWhereUniqueWithoutSquadInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersOnSquadsUpdateManyWithWhereWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsUpdateManyWithWhereWithoutSquadInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersOnSquadsScalarWhereInputSchema),z.lazy(() => UsersOnSquadsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutSquadNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutSquadNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutSquadInputSchema),z.lazy(() => TaskCreateWithoutSquadInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutSquadInputSchema),z.lazy(() => TaskUncheckedCreateWithoutSquadInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutSquadInputSchema),z.lazy(() => TaskCreateOrConnectWithoutSquadInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutSquadInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutSquadInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManySquadInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutSquadInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutSquadInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutSquadInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutSquadInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SquadCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.SquadCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => SquadCreateWithoutUsersInputSchema),z.lazy(() => SquadUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SquadCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => SquadWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutUsersOnSquadsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUsersOnSquadsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUsersOnSquadsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUsersOnSquadsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUsersOnSquadsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const SquadUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.SquadUpdateOneRequiredWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => SquadCreateWithoutUsersInputSchema),z.lazy(() => SquadUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SquadCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => SquadUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => SquadWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SquadUpdateToOneWithWhereWithoutUsersInputSchema),z.lazy(() => SquadUpdateWithoutUsersInputSchema),z.lazy(() => SquadUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutUsersOnSquadsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUsersOnSquadsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUsersOnSquadsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUsersOnSquadsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUsersOnSquadsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUsersOnSquadsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUsersOnSquadsInputSchema),z.lazy(() => UserUpdateWithoutUsersOnSquadsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUsersOnSquadsInputSchema) ]).optional(),
}).strict();

export const SquadCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.SquadCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => SquadCreateWithoutTasksInputSchema),z.lazy(() => SquadUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SquadCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => SquadWhereUniqueInputSchema).optional()
}).strict();

export const MessagesOnTasksCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.MessagesOnTasksCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => MessagesOnTasksCreateWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksCreateWithoutTaskInputSchema).array(),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessagesOnTasksCreateOrConnectWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessagesOnTasksCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PointsOnTasksCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.PointsOnTasksCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => PointsOnTasksCreateWithoutTaskInputSchema),z.lazy(() => PointsOnTasksCreateWithoutTaskInputSchema).array(),z.lazy(() => PointsOnTasksUncheckedCreateWithoutTaskInputSchema),z.lazy(() => PointsOnTasksUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PointsOnTasksCreateOrConnectWithoutTaskInputSchema),z.lazy(() => PointsOnTasksCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PointsOnTasksCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessagesOnTasksUncheckedCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.MessagesOnTasksUncheckedCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => MessagesOnTasksCreateWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksCreateWithoutTaskInputSchema).array(),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessagesOnTasksCreateOrConnectWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessagesOnTasksCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PointsOnTasksUncheckedCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.PointsOnTasksUncheckedCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => PointsOnTasksCreateWithoutTaskInputSchema),z.lazy(() => PointsOnTasksCreateWithoutTaskInputSchema).array(),z.lazy(() => PointsOnTasksUncheckedCreateWithoutTaskInputSchema),z.lazy(() => PointsOnTasksUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PointsOnTasksCreateOrConnectWithoutTaskInputSchema),z.lazy(() => PointsOnTasksCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PointsOnTasksCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const SquadUpdateOneRequiredWithoutTasksNestedInputSchema: z.ZodType<Prisma.SquadUpdateOneRequiredWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => SquadCreateWithoutTasksInputSchema),z.lazy(() => SquadUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SquadCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => SquadUpsertWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => SquadWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SquadUpdateToOneWithWhereWithoutTasksInputSchema),z.lazy(() => SquadUpdateWithoutTasksInputSchema),z.lazy(() => SquadUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict();

export const MessagesOnTasksUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.MessagesOnTasksUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessagesOnTasksCreateWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksCreateWithoutTaskInputSchema).array(),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessagesOnTasksCreateOrConnectWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessagesOnTasksUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessagesOnTasksCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessagesOnTasksUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessagesOnTasksUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessagesOnTasksScalarWhereInputSchema),z.lazy(() => MessagesOnTasksScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PointsOnTasksUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.PointsOnTasksUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => PointsOnTasksCreateWithoutTaskInputSchema),z.lazy(() => PointsOnTasksCreateWithoutTaskInputSchema).array(),z.lazy(() => PointsOnTasksUncheckedCreateWithoutTaskInputSchema),z.lazy(() => PointsOnTasksUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PointsOnTasksCreateOrConnectWithoutTaskInputSchema),z.lazy(() => PointsOnTasksCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PointsOnTasksUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => PointsOnTasksUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PointsOnTasksCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PointsOnTasksUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => PointsOnTasksUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PointsOnTasksUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => PointsOnTasksUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PointsOnTasksScalarWhereInputSchema),z.lazy(() => PointsOnTasksScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessagesOnTasksUncheckedUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.MessagesOnTasksUncheckedUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessagesOnTasksCreateWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksCreateWithoutTaskInputSchema).array(),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessagesOnTasksCreateOrConnectWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessagesOnTasksUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessagesOnTasksCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessagesOnTasksUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessagesOnTasksUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessagesOnTasksScalarWhereInputSchema),z.lazy(() => MessagesOnTasksScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PointsOnTasksUncheckedUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.PointsOnTasksUncheckedUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => PointsOnTasksCreateWithoutTaskInputSchema),z.lazy(() => PointsOnTasksCreateWithoutTaskInputSchema).array(),z.lazy(() => PointsOnTasksUncheckedCreateWithoutTaskInputSchema),z.lazy(() => PointsOnTasksUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PointsOnTasksCreateOrConnectWithoutTaskInputSchema),z.lazy(() => PointsOnTasksCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PointsOnTasksUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => PointsOnTasksUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PointsOnTasksCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PointsOnTasksUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => PointsOnTasksUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PointsOnTasksUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => PointsOnTasksUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PointsOnTasksScalarWhereInputSchema),z.lazy(() => PointsOnTasksScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedOneWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.TaskCreateNestedOneWithoutMessagesOnTasksInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutMessagesOnTasksInputSchema),z.lazy(() => TaskUncheckedCreateWithoutMessagesOnTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutMessagesOnTasksInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMessagesOnTasksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMessagesOnTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutMessagesOnTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMessagesOnTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TaskUpdateOneRequiredWithoutMessagesOnTasksNestedInputSchema: z.ZodType<Prisma.TaskUpdateOneRequiredWithoutMessagesOnTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutMessagesOnTasksInputSchema),z.lazy(() => TaskUncheckedCreateWithoutMessagesOnTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutMessagesOnTasksInputSchema).optional(),
  upsert: z.lazy(() => TaskUpsertWithoutMessagesOnTasksInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskUpdateToOneWithWhereWithoutMessagesOnTasksInputSchema),z.lazy(() => TaskUpdateWithoutMessagesOnTasksInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutMessagesOnTasksInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutMessagesOnTasksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMessagesOnTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMessagesOnTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutMessagesOnTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMessagesOnTasksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMessagesOnTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutMessagesOnTasksInputSchema),z.lazy(() => UserUpdateWithoutMessagesOnTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMessagesOnTasksInputSchema) ]).optional(),
}).strict();

export const TaskCreateNestedOneWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.TaskCreateNestedOneWithoutPointsOnTasksInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutPointsOnTasksInputSchema),z.lazy(() => TaskUncheckedCreateWithoutPointsOnTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutPointsOnTasksInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPointsOnTasksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPointsOnTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutPointsOnTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPointsOnTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TaskUpdateOneRequiredWithoutPointsOnTasksNestedInputSchema: z.ZodType<Prisma.TaskUpdateOneRequiredWithoutPointsOnTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutPointsOnTasksInputSchema),z.lazy(() => TaskUncheckedCreateWithoutPointsOnTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutPointsOnTasksInputSchema).optional(),
  upsert: z.lazy(() => TaskUpsertWithoutPointsOnTasksInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskUpdateToOneWithWhereWithoutPointsOnTasksInputSchema),z.lazy(() => TaskUpdateWithoutPointsOnTasksInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutPointsOnTasksInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutPointsOnTasksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPointsOnTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPointsOnTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutPointsOnTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPointsOnTasksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPointsOnTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPointsOnTasksInputSchema),z.lazy(() => UserUpdateWithoutPointsOnTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPointsOnTasksInputSchema) ]).optional(),
}).strict();

export const UsersOnSquadsCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UsersOnSquadsCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnSquadsCreateWithoutUserInputSchema),z.lazy(() => UsersOnSquadsCreateWithoutUserInputSchema).array(),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnSquadsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersOnSquadsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnSquadsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessagesOnTasksCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MessagesOnTasksCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MessagesOnTasksCreateWithoutUserInputSchema),z.lazy(() => MessagesOnTasksCreateWithoutUserInputSchema).array(),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutUserInputSchema),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessagesOnTasksCreateOrConnectWithoutUserInputSchema),z.lazy(() => MessagesOnTasksCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessagesOnTasksCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PointsOnTasksCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PointsOnTasksCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PointsOnTasksCreateWithoutUserInputSchema),z.lazy(() => PointsOnTasksCreateWithoutUserInputSchema).array(),z.lazy(() => PointsOnTasksUncheckedCreateWithoutUserInputSchema),z.lazy(() => PointsOnTasksUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PointsOnTasksCreateOrConnectWithoutUserInputSchema),z.lazy(() => PointsOnTasksCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PointsOnTasksCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsersOnSquadsUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UsersOnSquadsUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnSquadsCreateWithoutUserInputSchema),z.lazy(() => UsersOnSquadsCreateWithoutUserInputSchema).array(),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnSquadsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersOnSquadsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnSquadsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessagesOnTasksUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MessagesOnTasksUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MessagesOnTasksCreateWithoutUserInputSchema),z.lazy(() => MessagesOnTasksCreateWithoutUserInputSchema).array(),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutUserInputSchema),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessagesOnTasksCreateOrConnectWithoutUserInputSchema),z.lazy(() => MessagesOnTasksCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessagesOnTasksCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PointsOnTasksUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PointsOnTasksUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PointsOnTasksCreateWithoutUserInputSchema),z.lazy(() => PointsOnTasksCreateWithoutUserInputSchema).array(),z.lazy(() => PointsOnTasksUncheckedCreateWithoutUserInputSchema),z.lazy(() => PointsOnTasksUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PointsOnTasksCreateOrConnectWithoutUserInputSchema),z.lazy(() => PointsOnTasksCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PointsOnTasksCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsersOnSquadsUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UsersOnSquadsUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnSquadsCreateWithoutUserInputSchema),z.lazy(() => UsersOnSquadsCreateWithoutUserInputSchema).array(),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnSquadsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersOnSquadsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersOnSquadsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersOnSquadsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnSquadsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersOnSquadsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersOnSquadsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersOnSquadsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UsersOnSquadsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersOnSquadsScalarWhereInputSchema),z.lazy(() => UsersOnSquadsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessagesOnTasksUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MessagesOnTasksUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessagesOnTasksCreateWithoutUserInputSchema),z.lazy(() => MessagesOnTasksCreateWithoutUserInputSchema).array(),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutUserInputSchema),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessagesOnTasksCreateOrConnectWithoutUserInputSchema),z.lazy(() => MessagesOnTasksCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessagesOnTasksUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MessagesOnTasksUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessagesOnTasksCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessagesOnTasksUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MessagesOnTasksUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessagesOnTasksUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MessagesOnTasksUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessagesOnTasksScalarWhereInputSchema),z.lazy(() => MessagesOnTasksScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PointsOnTasksUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PointsOnTasksUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PointsOnTasksCreateWithoutUserInputSchema),z.lazy(() => PointsOnTasksCreateWithoutUserInputSchema).array(),z.lazy(() => PointsOnTasksUncheckedCreateWithoutUserInputSchema),z.lazy(() => PointsOnTasksUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PointsOnTasksCreateOrConnectWithoutUserInputSchema),z.lazy(() => PointsOnTasksCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PointsOnTasksUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PointsOnTasksUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PointsOnTasksCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PointsOnTasksUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PointsOnTasksUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PointsOnTasksUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PointsOnTasksUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PointsOnTasksScalarWhereInputSchema),z.lazy(() => PointsOnTasksScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersOnSquadsUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UsersOnSquadsUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersOnSquadsCreateWithoutUserInputSchema),z.lazy(() => UsersOnSquadsCreateWithoutUserInputSchema).array(),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersOnSquadsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersOnSquadsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersOnSquadsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersOnSquadsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersOnSquadsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),z.lazy(() => UsersOnSquadsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersOnSquadsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersOnSquadsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersOnSquadsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UsersOnSquadsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersOnSquadsScalarWhereInputSchema),z.lazy(() => UsersOnSquadsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessagesOnTasksUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MessagesOnTasksUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessagesOnTasksCreateWithoutUserInputSchema),z.lazy(() => MessagesOnTasksCreateWithoutUserInputSchema).array(),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutUserInputSchema),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessagesOnTasksCreateOrConnectWithoutUserInputSchema),z.lazy(() => MessagesOnTasksCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessagesOnTasksUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MessagesOnTasksUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessagesOnTasksCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),z.lazy(() => MessagesOnTasksWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessagesOnTasksUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MessagesOnTasksUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessagesOnTasksUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MessagesOnTasksUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessagesOnTasksScalarWhereInputSchema),z.lazy(() => MessagesOnTasksScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PointsOnTasksUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PointsOnTasksUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PointsOnTasksCreateWithoutUserInputSchema),z.lazy(() => PointsOnTasksCreateWithoutUserInputSchema).array(),z.lazy(() => PointsOnTasksUncheckedCreateWithoutUserInputSchema),z.lazy(() => PointsOnTasksUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PointsOnTasksCreateOrConnectWithoutUserInputSchema),z.lazy(() => PointsOnTasksCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PointsOnTasksUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PointsOnTasksUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PointsOnTasksCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PointsOnTasksWhereUniqueInputSchema),z.lazy(() => PointsOnTasksWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PointsOnTasksUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PointsOnTasksUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PointsOnTasksUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PointsOnTasksUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PointsOnTasksScalarWhereInputSchema),z.lazy(() => PointsOnTasksScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDecimalFilterSchema: z.ZodType<Prisma.NestedDecimalFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDecimalWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional()
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UsersOnSquadsCreateWithoutSquadInputSchema: z.ZodType<Prisma.UsersOnSquadsCreateWithoutSquadInput> = z.object({
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutUsersOnSquadsInputSchema)
}).strict();

export const UsersOnSquadsUncheckedCreateWithoutSquadInputSchema: z.ZodType<Prisma.UsersOnSquadsUncheckedCreateWithoutSquadInput> = z.object({
  userId: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const UsersOnSquadsCreateOrConnectWithoutSquadInputSchema: z.ZodType<Prisma.UsersOnSquadsCreateOrConnectWithoutSquadInput> = z.object({
  where: z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersOnSquadsCreateWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutSquadInputSchema) ]),
}).strict();

export const UsersOnSquadsCreateManySquadInputEnvelopeSchema: z.ZodType<Prisma.UsersOnSquadsCreateManySquadInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UsersOnSquadsCreateManySquadInputSchema),z.lazy(() => UsersOnSquadsCreateManySquadInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TaskCreateWithoutSquadInputSchema: z.ZodType<Prisma.TaskCreateWithoutSquadInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  maxRounds: z.number().int(),
  percentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  points: z.number().int().optional().nullable(),
  finished: z.boolean().optional().nullable(),
  active: z.boolean().optional().nullable(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  messagesOnTasks: z.lazy(() => MessagesOnTasksCreateNestedManyWithoutTaskInputSchema).optional(),
  pointsOnTasks: z.lazy(() => PointsOnTasksCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutSquadInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutSquadInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  maxRounds: z.number().int(),
  percentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  points: z.number().int().optional().nullable(),
  finished: z.boolean().optional().nullable(),
  active: z.boolean().optional().nullable(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  messagesOnTasks: z.lazy(() => MessagesOnTasksUncheckedCreateNestedManyWithoutTaskInputSchema).optional(),
  pointsOnTasks: z.lazy(() => PointsOnTasksUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutSquadInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutSquadInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutSquadInputSchema),z.lazy(() => TaskUncheckedCreateWithoutSquadInputSchema) ]),
}).strict();

export const TaskCreateManySquadInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManySquadInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManySquadInputSchema),z.lazy(() => TaskCreateManySquadInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UsersOnSquadsUpsertWithWhereUniqueWithoutSquadInputSchema: z.ZodType<Prisma.UsersOnSquadsUpsertWithWhereUniqueWithoutSquadInput> = z.object({
  where: z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UsersOnSquadsUpdateWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsUncheckedUpdateWithoutSquadInputSchema) ]),
  create: z.union([ z.lazy(() => UsersOnSquadsCreateWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutSquadInputSchema) ]),
}).strict();

export const UsersOnSquadsUpdateWithWhereUniqueWithoutSquadInputSchema: z.ZodType<Prisma.UsersOnSquadsUpdateWithWhereUniqueWithoutSquadInput> = z.object({
  where: z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UsersOnSquadsUpdateWithoutSquadInputSchema),z.lazy(() => UsersOnSquadsUncheckedUpdateWithoutSquadInputSchema) ]),
}).strict();

export const UsersOnSquadsUpdateManyWithWhereWithoutSquadInputSchema: z.ZodType<Prisma.UsersOnSquadsUpdateManyWithWhereWithoutSquadInput> = z.object({
  where: z.lazy(() => UsersOnSquadsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UsersOnSquadsUpdateManyMutationInputSchema),z.lazy(() => UsersOnSquadsUncheckedUpdateManyWithoutSquadInputSchema) ]),
}).strict();

export const UsersOnSquadsScalarWhereInputSchema: z.ZodType<Prisma.UsersOnSquadsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UsersOnSquadsScalarWhereInputSchema),z.lazy(() => UsersOnSquadsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersOnSquadsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersOnSquadsScalarWhereInputSchema),z.lazy(() => UsersOnSquadsScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  squadId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const TaskUpsertWithWhereUniqueWithoutSquadInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutSquadInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutSquadInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutSquadInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutSquadInputSchema),z.lazy(() => TaskUncheckedCreateWithoutSquadInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutSquadInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutSquadInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutSquadInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutSquadInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutSquadInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutSquadInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutSquadInputSchema) ]),
}).strict();

export const TaskScalarWhereInputSchema: z.ZodType<Prisma.TaskScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  squadId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  maxRounds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  percentual: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  points: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  finished: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const SquadCreateWithoutUsersInputSchema: z.ZodType<Prisma.SquadCreateWithoutUsersInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  currentMaxRounds: z.number().int(),
  currentPercentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutSquadInputSchema).optional()
}).strict();

export const SquadUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.SquadUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  currentMaxRounds: z.number().int(),
  currentPercentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutSquadInputSchema).optional()
}).strict();

export const SquadCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.SquadCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => SquadWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SquadCreateWithoutUsersInputSchema),z.lazy(() => SquadUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const UserCreateWithoutUsersOnSquadsInputSchema: z.ZodType<Prisma.UserCreateWithoutUsersOnSquadsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  MessagesOnTasks: z.lazy(() => MessagesOnTasksCreateNestedManyWithoutUserInputSchema).optional(),
  PointsOnTasks: z.lazy(() => PointsOnTasksCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutUsersOnSquadsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUsersOnSquadsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  MessagesOnTasks: z.lazy(() => MessagesOnTasksUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  PointsOnTasks: z.lazy(() => PointsOnTasksUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutUsersOnSquadsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUsersOnSquadsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUsersOnSquadsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUsersOnSquadsInputSchema) ]),
}).strict();

export const SquadUpsertWithoutUsersInputSchema: z.ZodType<Prisma.SquadUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => SquadUpdateWithoutUsersInputSchema),z.lazy(() => SquadUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => SquadCreateWithoutUsersInputSchema),z.lazy(() => SquadUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => SquadWhereInputSchema).optional()
}).strict();

export const SquadUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.SquadUpdateToOneWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => SquadWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SquadUpdateWithoutUsersInputSchema),z.lazy(() => SquadUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const SquadUpdateWithoutUsersInputSchema: z.ZodType<Prisma.SquadUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentMaxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentPercentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasks: z.lazy(() => TaskUpdateManyWithoutSquadNestedInputSchema).optional()
}).strict();

export const SquadUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.SquadUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentMaxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentPercentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutSquadNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutUsersOnSquadsInputSchema: z.ZodType<Prisma.UserUpsertWithoutUsersOnSquadsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUsersOnSquadsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUsersOnSquadsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUsersOnSquadsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUsersOnSquadsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutUsersOnSquadsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUsersOnSquadsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUsersOnSquadsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUsersOnSquadsInputSchema) ]),
}).strict();

export const UserUpdateWithoutUsersOnSquadsInputSchema: z.ZodType<Prisma.UserUpdateWithoutUsersOnSquadsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MessagesOnTasks: z.lazy(() => MessagesOnTasksUpdateManyWithoutUserNestedInputSchema).optional(),
  PointsOnTasks: z.lazy(() => PointsOnTasksUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutUsersOnSquadsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUsersOnSquadsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  MessagesOnTasks: z.lazy(() => MessagesOnTasksUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  PointsOnTasks: z.lazy(() => PointsOnTasksUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const SquadCreateWithoutTasksInputSchema: z.ZodType<Prisma.SquadCreateWithoutTasksInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  currentMaxRounds: z.number().int(),
  currentPercentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  users: z.lazy(() => UsersOnSquadsCreateNestedManyWithoutSquadInputSchema).optional()
}).strict();

export const SquadUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.SquadUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  currentMaxRounds: z.number().int(),
  currentPercentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  users: z.lazy(() => UsersOnSquadsUncheckedCreateNestedManyWithoutSquadInputSchema).optional()
}).strict();

export const SquadCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.SquadCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => SquadWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SquadCreateWithoutTasksInputSchema),z.lazy(() => SquadUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const MessagesOnTasksCreateWithoutTaskInputSchema: z.ZodType<Prisma.MessagesOnTasksCreateWithoutTaskInput> = z.object({
  currentRound: z.number().int(),
  message: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutMessagesOnTasksInputSchema)
}).strict();

export const MessagesOnTasksUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.MessagesOnTasksUncheckedCreateWithoutTaskInput> = z.object({
  userId: z.string(),
  currentRound: z.number().int(),
  message: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const MessagesOnTasksCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.MessagesOnTasksCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessagesOnTasksCreateWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const MessagesOnTasksCreateManyTaskInputEnvelopeSchema: z.ZodType<Prisma.MessagesOnTasksCreateManyTaskInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessagesOnTasksCreateManyTaskInputSchema),z.lazy(() => MessagesOnTasksCreateManyTaskInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PointsOnTasksCreateWithoutTaskInputSchema: z.ZodType<Prisma.PointsOnTasksCreateWithoutTaskInput> = z.object({
  currentRound: z.number().int(),
  points: z.number().int(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutPointsOnTasksInputSchema)
}).strict();

export const PointsOnTasksUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.PointsOnTasksUncheckedCreateWithoutTaskInput> = z.object({
  userId: z.string(),
  currentRound: z.number().int(),
  points: z.number().int(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const PointsOnTasksCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.PointsOnTasksCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => PointsOnTasksWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PointsOnTasksCreateWithoutTaskInputSchema),z.lazy(() => PointsOnTasksUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const PointsOnTasksCreateManyTaskInputEnvelopeSchema: z.ZodType<Prisma.PointsOnTasksCreateManyTaskInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PointsOnTasksCreateManyTaskInputSchema),z.lazy(() => PointsOnTasksCreateManyTaskInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SquadUpsertWithoutTasksInputSchema: z.ZodType<Prisma.SquadUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => SquadUpdateWithoutTasksInputSchema),z.lazy(() => SquadUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => SquadCreateWithoutTasksInputSchema),z.lazy(() => SquadUncheckedCreateWithoutTasksInputSchema) ]),
  where: z.lazy(() => SquadWhereInputSchema).optional()
}).strict();

export const SquadUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.SquadUpdateToOneWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => SquadWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SquadUpdateWithoutTasksInputSchema),z.lazy(() => SquadUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict();

export const SquadUpdateWithoutTasksInputSchema: z.ZodType<Prisma.SquadUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentMaxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentPercentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UsersOnSquadsUpdateManyWithoutSquadNestedInputSchema).optional()
}).strict();

export const SquadUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.SquadUncheckedUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentMaxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentPercentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UsersOnSquadsUncheckedUpdateManyWithoutSquadNestedInputSchema).optional()
}).strict();

export const MessagesOnTasksUpsertWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.MessagesOnTasksUpsertWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessagesOnTasksUpdateWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => MessagesOnTasksCreateWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const MessagesOnTasksUpdateWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.MessagesOnTasksUpdateWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessagesOnTasksUpdateWithoutTaskInputSchema),z.lazy(() => MessagesOnTasksUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict();

export const MessagesOnTasksUpdateManyWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.MessagesOnTasksUpdateManyWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => MessagesOnTasksScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessagesOnTasksUpdateManyMutationInputSchema),z.lazy(() => MessagesOnTasksUncheckedUpdateManyWithoutTaskInputSchema) ]),
}).strict();

export const MessagesOnTasksScalarWhereInputSchema: z.ZodType<Prisma.MessagesOnTasksScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessagesOnTasksScalarWhereInputSchema),z.lazy(() => MessagesOnTasksScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessagesOnTasksScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessagesOnTasksScalarWhereInputSchema),z.lazy(() => MessagesOnTasksScalarWhereInputSchema).array() ]).optional(),
  taskId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  currentRound: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const PointsOnTasksUpsertWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.PointsOnTasksUpsertWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => PointsOnTasksWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PointsOnTasksUpdateWithoutTaskInputSchema),z.lazy(() => PointsOnTasksUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => PointsOnTasksCreateWithoutTaskInputSchema),z.lazy(() => PointsOnTasksUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const PointsOnTasksUpdateWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.PointsOnTasksUpdateWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => PointsOnTasksWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PointsOnTasksUpdateWithoutTaskInputSchema),z.lazy(() => PointsOnTasksUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict();

export const PointsOnTasksUpdateManyWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.PointsOnTasksUpdateManyWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => PointsOnTasksScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PointsOnTasksUpdateManyMutationInputSchema),z.lazy(() => PointsOnTasksUncheckedUpdateManyWithoutTaskInputSchema) ]),
}).strict();

export const PointsOnTasksScalarWhereInputSchema: z.ZodType<Prisma.PointsOnTasksScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PointsOnTasksScalarWhereInputSchema),z.lazy(() => PointsOnTasksScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PointsOnTasksScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PointsOnTasksScalarWhereInputSchema),z.lazy(() => PointsOnTasksScalarWhereInputSchema).array() ]).optional(),
  taskId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  currentRound: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  points: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  enabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const TaskCreateWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.TaskCreateWithoutMessagesOnTasksInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  maxRounds: z.number().int(),
  percentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  points: z.number().int().optional().nullable(),
  finished: z.boolean().optional().nullable(),
  active: z.boolean().optional().nullable(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  squad: z.lazy(() => SquadCreateNestedOneWithoutTasksInputSchema),
  pointsOnTasks: z.lazy(() => PointsOnTasksCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutMessagesOnTasksInput> = z.object({
  id: z.string().uuid().optional(),
  squadId: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  maxRounds: z.number().int(),
  percentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  points: z.number().int().optional().nullable(),
  finished: z.boolean().optional().nullable(),
  active: z.boolean().optional().nullable(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  pointsOnTasks: z.lazy(() => PointsOnTasksUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutMessagesOnTasksInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutMessagesOnTasksInputSchema),z.lazy(() => TaskUncheckedCreateWithoutMessagesOnTasksInputSchema) ]),
}).strict();

export const UserCreateWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.UserCreateWithoutMessagesOnTasksInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  UsersOnSquads: z.lazy(() => UsersOnSquadsCreateNestedManyWithoutUserInputSchema).optional(),
  PointsOnTasks: z.lazy(() => PointsOnTasksCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMessagesOnTasksInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  UsersOnSquads: z.lazy(() => UsersOnSquadsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  PointsOnTasks: z.lazy(() => PointsOnTasksUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMessagesOnTasksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutMessagesOnTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutMessagesOnTasksInputSchema) ]),
}).strict();

export const TaskUpsertWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.TaskUpsertWithoutMessagesOnTasksInput> = z.object({
  update: z.union([ z.lazy(() => TaskUpdateWithoutMessagesOnTasksInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutMessagesOnTasksInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutMessagesOnTasksInputSchema),z.lazy(() => TaskUncheckedCreateWithoutMessagesOnTasksInputSchema) ]),
  where: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const TaskUpdateToOneWithWhereWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutMessagesOnTasksInput> = z.object({
  where: z.lazy(() => TaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskUpdateWithoutMessagesOnTasksInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutMessagesOnTasksInputSchema) ]),
}).strict();

export const TaskUpdateWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.TaskUpdateWithoutMessagesOnTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  percentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  squad: z.lazy(() => SquadUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  pointsOnTasks: z.lazy(() => PointsOnTasksUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutMessagesOnTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  squadId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  percentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pointsOnTasks: z.lazy(() => PointsOnTasksUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.UserUpsertWithoutMessagesOnTasksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutMessagesOnTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMessagesOnTasksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutMessagesOnTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutMessagesOnTasksInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMessagesOnTasksInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutMessagesOnTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMessagesOnTasksInputSchema) ]),
}).strict();

export const UserUpdateWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.UserUpdateWithoutMessagesOnTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  UsersOnSquads: z.lazy(() => UsersOnSquadsUpdateManyWithoutUserNestedInputSchema).optional(),
  PointsOnTasks: z.lazy(() => PointsOnTasksUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutMessagesOnTasksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMessagesOnTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  UsersOnSquads: z.lazy(() => UsersOnSquadsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  PointsOnTasks: z.lazy(() => PointsOnTasksUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const TaskCreateWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.TaskCreateWithoutPointsOnTasksInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  maxRounds: z.number().int(),
  percentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  points: z.number().int().optional().nullable(),
  finished: z.boolean().optional().nullable(),
  active: z.boolean().optional().nullable(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  squad: z.lazy(() => SquadCreateNestedOneWithoutTasksInputSchema),
  messagesOnTasks: z.lazy(() => MessagesOnTasksCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutPointsOnTasksInput> = z.object({
  id: z.string().uuid().optional(),
  squadId: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  maxRounds: z.number().int(),
  percentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  points: z.number().int().optional().nullable(),
  finished: z.boolean().optional().nullable(),
  active: z.boolean().optional().nullable(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  messagesOnTasks: z.lazy(() => MessagesOnTasksUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutPointsOnTasksInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutPointsOnTasksInputSchema),z.lazy(() => TaskUncheckedCreateWithoutPointsOnTasksInputSchema) ]),
}).strict();

export const UserCreateWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.UserCreateWithoutPointsOnTasksInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  UsersOnSquads: z.lazy(() => UsersOnSquadsCreateNestedManyWithoutUserInputSchema).optional(),
  MessagesOnTasks: z.lazy(() => MessagesOnTasksCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPointsOnTasksInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  UsersOnSquads: z.lazy(() => UsersOnSquadsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  MessagesOnTasks: z.lazy(() => MessagesOnTasksUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPointsOnTasksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPointsOnTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutPointsOnTasksInputSchema) ]),
}).strict();

export const TaskUpsertWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.TaskUpsertWithoutPointsOnTasksInput> = z.object({
  update: z.union([ z.lazy(() => TaskUpdateWithoutPointsOnTasksInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutPointsOnTasksInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutPointsOnTasksInputSchema),z.lazy(() => TaskUncheckedCreateWithoutPointsOnTasksInputSchema) ]),
  where: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const TaskUpdateToOneWithWhereWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutPointsOnTasksInput> = z.object({
  where: z.lazy(() => TaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskUpdateWithoutPointsOnTasksInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutPointsOnTasksInputSchema) ]),
}).strict();

export const TaskUpdateWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.TaskUpdateWithoutPointsOnTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  percentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  squad: z.lazy(() => SquadUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  messagesOnTasks: z.lazy(() => MessagesOnTasksUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutPointsOnTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  squadId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  percentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  messagesOnTasks: z.lazy(() => MessagesOnTasksUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.UserUpsertWithoutPointsOnTasksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPointsOnTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPointsOnTasksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPointsOnTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutPointsOnTasksInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPointsOnTasksInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPointsOnTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPointsOnTasksInputSchema) ]),
}).strict();

export const UserUpdateWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.UserUpdateWithoutPointsOnTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  UsersOnSquads: z.lazy(() => UsersOnSquadsUpdateManyWithoutUserNestedInputSchema).optional(),
  MessagesOnTasks: z.lazy(() => MessagesOnTasksUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPointsOnTasksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPointsOnTasksInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  UsersOnSquads: z.lazy(() => UsersOnSquadsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  MessagesOnTasks: z.lazy(() => MessagesOnTasksUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UsersOnSquadsCreateWithoutUserInputSchema: z.ZodType<Prisma.UsersOnSquadsCreateWithoutUserInput> = z.object({
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  squad: z.lazy(() => SquadCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const UsersOnSquadsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UsersOnSquadsUncheckedCreateWithoutUserInput> = z.object({
  squadId: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const UsersOnSquadsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UsersOnSquadsCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersOnSquadsCreateWithoutUserInputSchema),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UsersOnSquadsCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UsersOnSquadsCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UsersOnSquadsCreateManyUserInputSchema),z.lazy(() => UsersOnSquadsCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MessagesOnTasksCreateWithoutUserInputSchema: z.ZodType<Prisma.MessagesOnTasksCreateWithoutUserInput> = z.object({
  currentRound: z.number().int(),
  message: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  task: z.lazy(() => TaskCreateNestedOneWithoutMessagesOnTasksInputSchema)
}).strict();

export const MessagesOnTasksUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.MessagesOnTasksUncheckedCreateWithoutUserInput> = z.object({
  taskId: z.string(),
  currentRound: z.number().int(),
  message: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const MessagesOnTasksCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.MessagesOnTasksCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessagesOnTasksCreateWithoutUserInputSchema),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MessagesOnTasksCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.MessagesOnTasksCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessagesOnTasksCreateManyUserInputSchema),z.lazy(() => MessagesOnTasksCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PointsOnTasksCreateWithoutUserInputSchema: z.ZodType<Prisma.PointsOnTasksCreateWithoutUserInput> = z.object({
  currentRound: z.number().int(),
  points: z.number().int(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  task: z.lazy(() => TaskCreateNestedOneWithoutPointsOnTasksInputSchema)
}).strict();

export const PointsOnTasksUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PointsOnTasksUncheckedCreateWithoutUserInput> = z.object({
  taskId: z.string(),
  currentRound: z.number().int(),
  points: z.number().int(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const PointsOnTasksCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PointsOnTasksCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PointsOnTasksWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PointsOnTasksCreateWithoutUserInputSchema),z.lazy(() => PointsOnTasksUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PointsOnTasksCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.PointsOnTasksCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PointsOnTasksCreateManyUserInputSchema),z.lazy(() => PointsOnTasksCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UsersOnSquadsUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UsersOnSquadsUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UsersOnSquadsUpdateWithoutUserInputSchema),z.lazy(() => UsersOnSquadsUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UsersOnSquadsCreateWithoutUserInputSchema),z.lazy(() => UsersOnSquadsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UsersOnSquadsUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UsersOnSquadsUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UsersOnSquadsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UsersOnSquadsUpdateWithoutUserInputSchema),z.lazy(() => UsersOnSquadsUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UsersOnSquadsUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UsersOnSquadsUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UsersOnSquadsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UsersOnSquadsUpdateManyMutationInputSchema),z.lazy(() => UsersOnSquadsUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const MessagesOnTasksUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MessagesOnTasksUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessagesOnTasksUpdateWithoutUserInputSchema),z.lazy(() => MessagesOnTasksUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => MessagesOnTasksCreateWithoutUserInputSchema),z.lazy(() => MessagesOnTasksUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MessagesOnTasksUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MessagesOnTasksUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MessagesOnTasksWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessagesOnTasksUpdateWithoutUserInputSchema),z.lazy(() => MessagesOnTasksUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const MessagesOnTasksUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.MessagesOnTasksUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => MessagesOnTasksScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessagesOnTasksUpdateManyMutationInputSchema),z.lazy(() => MessagesOnTasksUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const PointsOnTasksUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PointsOnTasksUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PointsOnTasksWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PointsOnTasksUpdateWithoutUserInputSchema),z.lazy(() => PointsOnTasksUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PointsOnTasksCreateWithoutUserInputSchema),z.lazy(() => PointsOnTasksUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PointsOnTasksUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PointsOnTasksUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PointsOnTasksWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PointsOnTasksUpdateWithoutUserInputSchema),z.lazy(() => PointsOnTasksUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const PointsOnTasksUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PointsOnTasksUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => PointsOnTasksScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PointsOnTasksUpdateManyMutationInputSchema),z.lazy(() => PointsOnTasksUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UsersOnSquadsCreateManySquadInputSchema: z.ZodType<Prisma.UsersOnSquadsCreateManySquadInput> = z.object({
  userId: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const TaskCreateManySquadInputSchema: z.ZodType<Prisma.TaskCreateManySquadInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  maxRounds: z.number().int(),
  percentual: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  points: z.number().int().optional().nullable(),
  finished: z.boolean().optional().nullable(),
  active: z.boolean().optional().nullable(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const UsersOnSquadsUpdateWithoutSquadInputSchema: z.ZodType<Prisma.UsersOnSquadsUpdateWithoutSquadInput> = z.object({
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUsersOnSquadsNestedInputSchema).optional()
}).strict();

export const UsersOnSquadsUncheckedUpdateWithoutSquadInputSchema: z.ZodType<Prisma.UsersOnSquadsUncheckedUpdateWithoutSquadInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsersOnSquadsUncheckedUpdateManyWithoutSquadInputSchema: z.ZodType<Prisma.UsersOnSquadsUncheckedUpdateManyWithoutSquadInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TaskUpdateWithoutSquadInputSchema: z.ZodType<Prisma.TaskUpdateWithoutSquadInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  percentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  messagesOnTasks: z.lazy(() => MessagesOnTasksUpdateManyWithoutTaskNestedInputSchema).optional(),
  pointsOnTasks: z.lazy(() => PointsOnTasksUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutSquadInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutSquadInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  percentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  messagesOnTasks: z.lazy(() => MessagesOnTasksUncheckedUpdateManyWithoutTaskNestedInputSchema).optional(),
  pointsOnTasks: z.lazy(() => PointsOnTasksUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateManyWithoutSquadInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutSquadInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  percentual: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  finished: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MessagesOnTasksCreateManyTaskInputSchema: z.ZodType<Prisma.MessagesOnTasksCreateManyTaskInput> = z.object({
  userId: z.string(),
  currentRound: z.number().int(),
  message: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const PointsOnTasksCreateManyTaskInputSchema: z.ZodType<Prisma.PointsOnTasksCreateManyTaskInput> = z.object({
  userId: z.string(),
  currentRound: z.number().int(),
  points: z.number().int(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const MessagesOnTasksUpdateWithoutTaskInputSchema: z.ZodType<Prisma.MessagesOnTasksUpdateWithoutTaskInput> = z.object({
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMessagesOnTasksNestedInputSchema).optional()
}).strict();

export const MessagesOnTasksUncheckedUpdateWithoutTaskInputSchema: z.ZodType<Prisma.MessagesOnTasksUncheckedUpdateWithoutTaskInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MessagesOnTasksUncheckedUpdateManyWithoutTaskInputSchema: z.ZodType<Prisma.MessagesOnTasksUncheckedUpdateManyWithoutTaskInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PointsOnTasksUpdateWithoutTaskInputSchema: z.ZodType<Prisma.PointsOnTasksUpdateWithoutTaskInput> = z.object({
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPointsOnTasksNestedInputSchema).optional()
}).strict();

export const PointsOnTasksUncheckedUpdateWithoutTaskInputSchema: z.ZodType<Prisma.PointsOnTasksUncheckedUpdateWithoutTaskInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PointsOnTasksUncheckedUpdateManyWithoutTaskInputSchema: z.ZodType<Prisma.PointsOnTasksUncheckedUpdateManyWithoutTaskInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsersOnSquadsCreateManyUserInputSchema: z.ZodType<Prisma.UsersOnSquadsCreateManyUserInput> = z.object({
  squadId: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const MessagesOnTasksCreateManyUserInputSchema: z.ZodType<Prisma.MessagesOnTasksCreateManyUserInput> = z.object({
  taskId: z.string(),
  currentRound: z.number().int(),
  message: z.string(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const PointsOnTasksCreateManyUserInputSchema: z.ZodType<Prisma.PointsOnTasksCreateManyUserInput> = z.object({
  taskId: z.string(),
  currentRound: z.number().int(),
  points: z.number().int(),
  enabled: z.boolean().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const UsersOnSquadsUpdateWithoutUserInputSchema: z.ZodType<Prisma.UsersOnSquadsUpdateWithoutUserInput> = z.object({
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  squad: z.lazy(() => SquadUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const UsersOnSquadsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UsersOnSquadsUncheckedUpdateWithoutUserInput> = z.object({
  squadId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsersOnSquadsUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UsersOnSquadsUncheckedUpdateManyWithoutUserInput> = z.object({
  squadId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MessagesOnTasksUpdateWithoutUserInputSchema: z.ZodType<Prisma.MessagesOnTasksUpdateWithoutUserInput> = z.object({
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutMessagesOnTasksNestedInputSchema).optional()
}).strict();

export const MessagesOnTasksUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.MessagesOnTasksUncheckedUpdateWithoutUserInput> = z.object({
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MessagesOnTasksUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.MessagesOnTasksUncheckedUpdateManyWithoutUserInput> = z.object({
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PointsOnTasksUpdateWithoutUserInputSchema: z.ZodType<Prisma.PointsOnTasksUpdateWithoutUserInput> = z.object({
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutPointsOnTasksNestedInputSchema).optional()
}).strict();

export const PointsOnTasksUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PointsOnTasksUncheckedUpdateWithoutUserInput> = z.object({
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PointsOnTasksUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.PointsOnTasksUncheckedUpdateManyWithoutUserInput> = z.object({
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentRound: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const SquadFindFirstArgsSchema: z.ZodType<Prisma.SquadFindFirstArgs> = z.object({
  select: SquadSelectSchema.optional(),
  include: SquadIncludeSchema.optional(),
  where: SquadWhereInputSchema.optional(),
  orderBy: z.union([ SquadOrderByWithRelationInputSchema.array(),SquadOrderByWithRelationInputSchema ]).optional(),
  cursor: SquadWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SquadScalarFieldEnumSchema,SquadScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SquadFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SquadFindFirstOrThrowArgs> = z.object({
  select: SquadSelectSchema.optional(),
  include: SquadIncludeSchema.optional(),
  where: SquadWhereInputSchema.optional(),
  orderBy: z.union([ SquadOrderByWithRelationInputSchema.array(),SquadOrderByWithRelationInputSchema ]).optional(),
  cursor: SquadWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SquadScalarFieldEnumSchema,SquadScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SquadFindManyArgsSchema: z.ZodType<Prisma.SquadFindManyArgs> = z.object({
  select: SquadSelectSchema.optional(),
  include: SquadIncludeSchema.optional(),
  where: SquadWhereInputSchema.optional(),
  orderBy: z.union([ SquadOrderByWithRelationInputSchema.array(),SquadOrderByWithRelationInputSchema ]).optional(),
  cursor: SquadWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SquadScalarFieldEnumSchema,SquadScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SquadAggregateArgsSchema: z.ZodType<Prisma.SquadAggregateArgs> = z.object({
  where: SquadWhereInputSchema.optional(),
  orderBy: z.union([ SquadOrderByWithRelationInputSchema.array(),SquadOrderByWithRelationInputSchema ]).optional(),
  cursor: SquadWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SquadGroupByArgsSchema: z.ZodType<Prisma.SquadGroupByArgs> = z.object({
  where: SquadWhereInputSchema.optional(),
  orderBy: z.union([ SquadOrderByWithAggregationInputSchema.array(),SquadOrderByWithAggregationInputSchema ]).optional(),
  by: SquadScalarFieldEnumSchema.array(),
  having: SquadScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SquadFindUniqueArgsSchema: z.ZodType<Prisma.SquadFindUniqueArgs> = z.object({
  select: SquadSelectSchema.optional(),
  include: SquadIncludeSchema.optional(),
  where: SquadWhereUniqueInputSchema,
}).strict()

export const SquadFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SquadFindUniqueOrThrowArgs> = z.object({
  select: SquadSelectSchema.optional(),
  include: SquadIncludeSchema.optional(),
  where: SquadWhereUniqueInputSchema,
}).strict()

export const UsersOnSquadsFindFirstArgsSchema: z.ZodType<Prisma.UsersOnSquadsFindFirstArgs> = z.object({
  select: UsersOnSquadsSelectSchema.optional(),
  include: UsersOnSquadsIncludeSchema.optional(),
  where: UsersOnSquadsWhereInputSchema.optional(),
  orderBy: z.union([ UsersOnSquadsOrderByWithRelationInputSchema.array(),UsersOnSquadsOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersOnSquadsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersOnSquadsScalarFieldEnumSchema,UsersOnSquadsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UsersOnSquadsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UsersOnSquadsFindFirstOrThrowArgs> = z.object({
  select: UsersOnSquadsSelectSchema.optional(),
  include: UsersOnSquadsIncludeSchema.optional(),
  where: UsersOnSquadsWhereInputSchema.optional(),
  orderBy: z.union([ UsersOnSquadsOrderByWithRelationInputSchema.array(),UsersOnSquadsOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersOnSquadsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersOnSquadsScalarFieldEnumSchema,UsersOnSquadsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UsersOnSquadsFindManyArgsSchema: z.ZodType<Prisma.UsersOnSquadsFindManyArgs> = z.object({
  select: UsersOnSquadsSelectSchema.optional(),
  include: UsersOnSquadsIncludeSchema.optional(),
  where: UsersOnSquadsWhereInputSchema.optional(),
  orderBy: z.union([ UsersOnSquadsOrderByWithRelationInputSchema.array(),UsersOnSquadsOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersOnSquadsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersOnSquadsScalarFieldEnumSchema,UsersOnSquadsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UsersOnSquadsAggregateArgsSchema: z.ZodType<Prisma.UsersOnSquadsAggregateArgs> = z.object({
  where: UsersOnSquadsWhereInputSchema.optional(),
  orderBy: z.union([ UsersOnSquadsOrderByWithRelationInputSchema.array(),UsersOnSquadsOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersOnSquadsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UsersOnSquadsGroupByArgsSchema: z.ZodType<Prisma.UsersOnSquadsGroupByArgs> = z.object({
  where: UsersOnSquadsWhereInputSchema.optional(),
  orderBy: z.union([ UsersOnSquadsOrderByWithAggregationInputSchema.array(),UsersOnSquadsOrderByWithAggregationInputSchema ]).optional(),
  by: UsersOnSquadsScalarFieldEnumSchema.array(),
  having: UsersOnSquadsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UsersOnSquadsFindUniqueArgsSchema: z.ZodType<Prisma.UsersOnSquadsFindUniqueArgs> = z.object({
  select: UsersOnSquadsSelectSchema.optional(),
  include: UsersOnSquadsIncludeSchema.optional(),
  where: UsersOnSquadsWhereUniqueInputSchema,
}).strict()

export const UsersOnSquadsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UsersOnSquadsFindUniqueOrThrowArgs> = z.object({
  select: UsersOnSquadsSelectSchema.optional(),
  include: UsersOnSquadsIncludeSchema.optional(),
  where: UsersOnSquadsWhereUniqueInputSchema,
}).strict()

export const TaskFindFirstArgsSchema: z.ZodType<Prisma.TaskFindFirstArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TaskFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TaskFindFirstOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TaskFindManyArgsSchema: z.ZodType<Prisma.TaskFindManyArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TaskAggregateArgsSchema: z.ZodType<Prisma.TaskAggregateArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TaskGroupByArgsSchema: z.ZodType<Prisma.TaskGroupByArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithAggregationInputSchema.array(),TaskOrderByWithAggregationInputSchema ]).optional(),
  by: TaskScalarFieldEnumSchema.array(),
  having: TaskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TaskFindUniqueArgsSchema: z.ZodType<Prisma.TaskFindUniqueArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict()

export const TaskFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TaskFindUniqueOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict()

export const MessagesOnTasksFindFirstArgsSchema: z.ZodType<Prisma.MessagesOnTasksFindFirstArgs> = z.object({
  select: MessagesOnTasksSelectSchema.optional(),
  include: MessagesOnTasksIncludeSchema.optional(),
  where: MessagesOnTasksWhereInputSchema.optional(),
  orderBy: z.union([ MessagesOnTasksOrderByWithRelationInputSchema.array(),MessagesOnTasksOrderByWithRelationInputSchema ]).optional(),
  cursor: MessagesOnTasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessagesOnTasksScalarFieldEnumSchema,MessagesOnTasksScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MessagesOnTasksFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MessagesOnTasksFindFirstOrThrowArgs> = z.object({
  select: MessagesOnTasksSelectSchema.optional(),
  include: MessagesOnTasksIncludeSchema.optional(),
  where: MessagesOnTasksWhereInputSchema.optional(),
  orderBy: z.union([ MessagesOnTasksOrderByWithRelationInputSchema.array(),MessagesOnTasksOrderByWithRelationInputSchema ]).optional(),
  cursor: MessagesOnTasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessagesOnTasksScalarFieldEnumSchema,MessagesOnTasksScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MessagesOnTasksFindManyArgsSchema: z.ZodType<Prisma.MessagesOnTasksFindManyArgs> = z.object({
  select: MessagesOnTasksSelectSchema.optional(),
  include: MessagesOnTasksIncludeSchema.optional(),
  where: MessagesOnTasksWhereInputSchema.optional(),
  orderBy: z.union([ MessagesOnTasksOrderByWithRelationInputSchema.array(),MessagesOnTasksOrderByWithRelationInputSchema ]).optional(),
  cursor: MessagesOnTasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessagesOnTasksScalarFieldEnumSchema,MessagesOnTasksScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MessagesOnTasksAggregateArgsSchema: z.ZodType<Prisma.MessagesOnTasksAggregateArgs> = z.object({
  where: MessagesOnTasksWhereInputSchema.optional(),
  orderBy: z.union([ MessagesOnTasksOrderByWithRelationInputSchema.array(),MessagesOnTasksOrderByWithRelationInputSchema ]).optional(),
  cursor: MessagesOnTasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MessagesOnTasksGroupByArgsSchema: z.ZodType<Prisma.MessagesOnTasksGroupByArgs> = z.object({
  where: MessagesOnTasksWhereInputSchema.optional(),
  orderBy: z.union([ MessagesOnTasksOrderByWithAggregationInputSchema.array(),MessagesOnTasksOrderByWithAggregationInputSchema ]).optional(),
  by: MessagesOnTasksScalarFieldEnumSchema.array(),
  having: MessagesOnTasksScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MessagesOnTasksFindUniqueArgsSchema: z.ZodType<Prisma.MessagesOnTasksFindUniqueArgs> = z.object({
  select: MessagesOnTasksSelectSchema.optional(),
  include: MessagesOnTasksIncludeSchema.optional(),
  where: MessagesOnTasksWhereUniqueInputSchema,
}).strict()

export const MessagesOnTasksFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MessagesOnTasksFindUniqueOrThrowArgs> = z.object({
  select: MessagesOnTasksSelectSchema.optional(),
  include: MessagesOnTasksIncludeSchema.optional(),
  where: MessagesOnTasksWhereUniqueInputSchema,
}).strict()

export const PointsOnTasksFindFirstArgsSchema: z.ZodType<Prisma.PointsOnTasksFindFirstArgs> = z.object({
  select: PointsOnTasksSelectSchema.optional(),
  include: PointsOnTasksIncludeSchema.optional(),
  where: PointsOnTasksWhereInputSchema.optional(),
  orderBy: z.union([ PointsOnTasksOrderByWithRelationInputSchema.array(),PointsOnTasksOrderByWithRelationInputSchema ]).optional(),
  cursor: PointsOnTasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PointsOnTasksScalarFieldEnumSchema,PointsOnTasksScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PointsOnTasksFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PointsOnTasksFindFirstOrThrowArgs> = z.object({
  select: PointsOnTasksSelectSchema.optional(),
  include: PointsOnTasksIncludeSchema.optional(),
  where: PointsOnTasksWhereInputSchema.optional(),
  orderBy: z.union([ PointsOnTasksOrderByWithRelationInputSchema.array(),PointsOnTasksOrderByWithRelationInputSchema ]).optional(),
  cursor: PointsOnTasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PointsOnTasksScalarFieldEnumSchema,PointsOnTasksScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PointsOnTasksFindManyArgsSchema: z.ZodType<Prisma.PointsOnTasksFindManyArgs> = z.object({
  select: PointsOnTasksSelectSchema.optional(),
  include: PointsOnTasksIncludeSchema.optional(),
  where: PointsOnTasksWhereInputSchema.optional(),
  orderBy: z.union([ PointsOnTasksOrderByWithRelationInputSchema.array(),PointsOnTasksOrderByWithRelationInputSchema ]).optional(),
  cursor: PointsOnTasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PointsOnTasksScalarFieldEnumSchema,PointsOnTasksScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PointsOnTasksAggregateArgsSchema: z.ZodType<Prisma.PointsOnTasksAggregateArgs> = z.object({
  where: PointsOnTasksWhereInputSchema.optional(),
  orderBy: z.union([ PointsOnTasksOrderByWithRelationInputSchema.array(),PointsOnTasksOrderByWithRelationInputSchema ]).optional(),
  cursor: PointsOnTasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PointsOnTasksGroupByArgsSchema: z.ZodType<Prisma.PointsOnTasksGroupByArgs> = z.object({
  where: PointsOnTasksWhereInputSchema.optional(),
  orderBy: z.union([ PointsOnTasksOrderByWithAggregationInputSchema.array(),PointsOnTasksOrderByWithAggregationInputSchema ]).optional(),
  by: PointsOnTasksScalarFieldEnumSchema.array(),
  having: PointsOnTasksScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PointsOnTasksFindUniqueArgsSchema: z.ZodType<Prisma.PointsOnTasksFindUniqueArgs> = z.object({
  select: PointsOnTasksSelectSchema.optional(),
  include: PointsOnTasksIncludeSchema.optional(),
  where: PointsOnTasksWhereUniqueInputSchema,
}).strict()

export const PointsOnTasksFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PointsOnTasksFindUniqueOrThrowArgs> = z.object({
  select: PointsOnTasksSelectSchema.optional(),
  include: PointsOnTasksIncludeSchema.optional(),
  where: PointsOnTasksWhereUniqueInputSchema,
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const SquadCreateArgsSchema: z.ZodType<Prisma.SquadCreateArgs> = z.object({
  select: SquadSelectSchema.optional(),
  include: SquadIncludeSchema.optional(),
  data: z.union([ SquadCreateInputSchema,SquadUncheckedCreateInputSchema ]),
}).strict()

export const SquadUpsertArgsSchema: z.ZodType<Prisma.SquadUpsertArgs> = z.object({
  select: SquadSelectSchema.optional(),
  include: SquadIncludeSchema.optional(),
  where: SquadWhereUniqueInputSchema,
  create: z.union([ SquadCreateInputSchema,SquadUncheckedCreateInputSchema ]),
  update: z.union([ SquadUpdateInputSchema,SquadUncheckedUpdateInputSchema ]),
}).strict()

export const SquadCreateManyArgsSchema: z.ZodType<Prisma.SquadCreateManyArgs> = z.object({
  data: z.union([ SquadCreateManyInputSchema,SquadCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SquadDeleteArgsSchema: z.ZodType<Prisma.SquadDeleteArgs> = z.object({
  select: SquadSelectSchema.optional(),
  include: SquadIncludeSchema.optional(),
  where: SquadWhereUniqueInputSchema,
}).strict()

export const SquadUpdateArgsSchema: z.ZodType<Prisma.SquadUpdateArgs> = z.object({
  select: SquadSelectSchema.optional(),
  include: SquadIncludeSchema.optional(),
  data: z.union([ SquadUpdateInputSchema,SquadUncheckedUpdateInputSchema ]),
  where: SquadWhereUniqueInputSchema,
}).strict()

export const SquadUpdateManyArgsSchema: z.ZodType<Prisma.SquadUpdateManyArgs> = z.object({
  data: z.union([ SquadUpdateManyMutationInputSchema,SquadUncheckedUpdateManyInputSchema ]),
  where: SquadWhereInputSchema.optional(),
}).strict()

export const SquadDeleteManyArgsSchema: z.ZodType<Prisma.SquadDeleteManyArgs> = z.object({
  where: SquadWhereInputSchema.optional(),
}).strict()

export const UsersOnSquadsCreateArgsSchema: z.ZodType<Prisma.UsersOnSquadsCreateArgs> = z.object({
  select: UsersOnSquadsSelectSchema.optional(),
  include: UsersOnSquadsIncludeSchema.optional(),
  data: z.union([ UsersOnSquadsCreateInputSchema,UsersOnSquadsUncheckedCreateInputSchema ]),
}).strict()

export const UsersOnSquadsUpsertArgsSchema: z.ZodType<Prisma.UsersOnSquadsUpsertArgs> = z.object({
  select: UsersOnSquadsSelectSchema.optional(),
  include: UsersOnSquadsIncludeSchema.optional(),
  where: UsersOnSquadsWhereUniqueInputSchema,
  create: z.union([ UsersOnSquadsCreateInputSchema,UsersOnSquadsUncheckedCreateInputSchema ]),
  update: z.union([ UsersOnSquadsUpdateInputSchema,UsersOnSquadsUncheckedUpdateInputSchema ]),
}).strict()

export const UsersOnSquadsCreateManyArgsSchema: z.ZodType<Prisma.UsersOnSquadsCreateManyArgs> = z.object({
  data: z.union([ UsersOnSquadsCreateManyInputSchema,UsersOnSquadsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UsersOnSquadsDeleteArgsSchema: z.ZodType<Prisma.UsersOnSquadsDeleteArgs> = z.object({
  select: UsersOnSquadsSelectSchema.optional(),
  include: UsersOnSquadsIncludeSchema.optional(),
  where: UsersOnSquadsWhereUniqueInputSchema,
}).strict()

export const UsersOnSquadsUpdateArgsSchema: z.ZodType<Prisma.UsersOnSquadsUpdateArgs> = z.object({
  select: UsersOnSquadsSelectSchema.optional(),
  include: UsersOnSquadsIncludeSchema.optional(),
  data: z.union([ UsersOnSquadsUpdateInputSchema,UsersOnSquadsUncheckedUpdateInputSchema ]),
  where: UsersOnSquadsWhereUniqueInputSchema,
}).strict()

export const UsersOnSquadsUpdateManyArgsSchema: z.ZodType<Prisma.UsersOnSquadsUpdateManyArgs> = z.object({
  data: z.union([ UsersOnSquadsUpdateManyMutationInputSchema,UsersOnSquadsUncheckedUpdateManyInputSchema ]),
  where: UsersOnSquadsWhereInputSchema.optional(),
}).strict()

export const UsersOnSquadsDeleteManyArgsSchema: z.ZodType<Prisma.UsersOnSquadsDeleteManyArgs> = z.object({
  where: UsersOnSquadsWhereInputSchema.optional(),
}).strict()

export const TaskCreateArgsSchema: z.ZodType<Prisma.TaskCreateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
}).strict()

export const TaskUpsertArgsSchema: z.ZodType<Prisma.TaskUpsertArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
  create: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
  update: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
}).strict()

export const TaskCreateManyArgsSchema: z.ZodType<Prisma.TaskCreateManyArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema,TaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const TaskDeleteArgsSchema: z.ZodType<Prisma.TaskDeleteArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict()

export const TaskUpdateArgsSchema: z.ZodType<Prisma.TaskUpdateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
  where: TaskWhereUniqueInputSchema,
}).strict()

export const TaskUpdateManyArgsSchema: z.ZodType<Prisma.TaskUpdateManyArgs> = z.object({
  data: z.union([ TaskUpdateManyMutationInputSchema,TaskUncheckedUpdateManyInputSchema ]),
  where: TaskWhereInputSchema.optional(),
}).strict()

export const TaskDeleteManyArgsSchema: z.ZodType<Prisma.TaskDeleteManyArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
}).strict()

export const MessagesOnTasksCreateArgsSchema: z.ZodType<Prisma.MessagesOnTasksCreateArgs> = z.object({
  select: MessagesOnTasksSelectSchema.optional(),
  include: MessagesOnTasksIncludeSchema.optional(),
  data: z.union([ MessagesOnTasksCreateInputSchema,MessagesOnTasksUncheckedCreateInputSchema ]),
}).strict()

export const MessagesOnTasksUpsertArgsSchema: z.ZodType<Prisma.MessagesOnTasksUpsertArgs> = z.object({
  select: MessagesOnTasksSelectSchema.optional(),
  include: MessagesOnTasksIncludeSchema.optional(),
  where: MessagesOnTasksWhereUniqueInputSchema,
  create: z.union([ MessagesOnTasksCreateInputSchema,MessagesOnTasksUncheckedCreateInputSchema ]),
  update: z.union([ MessagesOnTasksUpdateInputSchema,MessagesOnTasksUncheckedUpdateInputSchema ]),
}).strict()

export const MessagesOnTasksCreateManyArgsSchema: z.ZodType<Prisma.MessagesOnTasksCreateManyArgs> = z.object({
  data: z.union([ MessagesOnTasksCreateManyInputSchema,MessagesOnTasksCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const MessagesOnTasksDeleteArgsSchema: z.ZodType<Prisma.MessagesOnTasksDeleteArgs> = z.object({
  select: MessagesOnTasksSelectSchema.optional(),
  include: MessagesOnTasksIncludeSchema.optional(),
  where: MessagesOnTasksWhereUniqueInputSchema,
}).strict()

export const MessagesOnTasksUpdateArgsSchema: z.ZodType<Prisma.MessagesOnTasksUpdateArgs> = z.object({
  select: MessagesOnTasksSelectSchema.optional(),
  include: MessagesOnTasksIncludeSchema.optional(),
  data: z.union([ MessagesOnTasksUpdateInputSchema,MessagesOnTasksUncheckedUpdateInputSchema ]),
  where: MessagesOnTasksWhereUniqueInputSchema,
}).strict()

export const MessagesOnTasksUpdateManyArgsSchema: z.ZodType<Prisma.MessagesOnTasksUpdateManyArgs> = z.object({
  data: z.union([ MessagesOnTasksUpdateManyMutationInputSchema,MessagesOnTasksUncheckedUpdateManyInputSchema ]),
  where: MessagesOnTasksWhereInputSchema.optional(),
}).strict()

export const MessagesOnTasksDeleteManyArgsSchema: z.ZodType<Prisma.MessagesOnTasksDeleteManyArgs> = z.object({
  where: MessagesOnTasksWhereInputSchema.optional(),
}).strict()

export const PointsOnTasksCreateArgsSchema: z.ZodType<Prisma.PointsOnTasksCreateArgs> = z.object({
  select: PointsOnTasksSelectSchema.optional(),
  include: PointsOnTasksIncludeSchema.optional(),
  data: z.union([ PointsOnTasksCreateInputSchema,PointsOnTasksUncheckedCreateInputSchema ]),
}).strict()

export const PointsOnTasksUpsertArgsSchema: z.ZodType<Prisma.PointsOnTasksUpsertArgs> = z.object({
  select: PointsOnTasksSelectSchema.optional(),
  include: PointsOnTasksIncludeSchema.optional(),
  where: PointsOnTasksWhereUniqueInputSchema,
  create: z.union([ PointsOnTasksCreateInputSchema,PointsOnTasksUncheckedCreateInputSchema ]),
  update: z.union([ PointsOnTasksUpdateInputSchema,PointsOnTasksUncheckedUpdateInputSchema ]),
}).strict()

export const PointsOnTasksCreateManyArgsSchema: z.ZodType<Prisma.PointsOnTasksCreateManyArgs> = z.object({
  data: z.union([ PointsOnTasksCreateManyInputSchema,PointsOnTasksCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const PointsOnTasksDeleteArgsSchema: z.ZodType<Prisma.PointsOnTasksDeleteArgs> = z.object({
  select: PointsOnTasksSelectSchema.optional(),
  include: PointsOnTasksIncludeSchema.optional(),
  where: PointsOnTasksWhereUniqueInputSchema,
}).strict()

export const PointsOnTasksUpdateArgsSchema: z.ZodType<Prisma.PointsOnTasksUpdateArgs> = z.object({
  select: PointsOnTasksSelectSchema.optional(),
  include: PointsOnTasksIncludeSchema.optional(),
  data: z.union([ PointsOnTasksUpdateInputSchema,PointsOnTasksUncheckedUpdateInputSchema ]),
  where: PointsOnTasksWhereUniqueInputSchema,
}).strict()

export const PointsOnTasksUpdateManyArgsSchema: z.ZodType<Prisma.PointsOnTasksUpdateManyArgs> = z.object({
  data: z.union([ PointsOnTasksUpdateManyMutationInputSchema,PointsOnTasksUncheckedUpdateManyInputSchema ]),
  where: PointsOnTasksWhereInputSchema.optional(),
}).strict()

export const PointsOnTasksDeleteManyArgsSchema: z.ZodType<Prisma.PointsOnTasksDeleteManyArgs> = z.object({
  where: PointsOnTasksWhereInputSchema.optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()