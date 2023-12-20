import { WithZodiosContext } from "@zodios/express";
import { Context } from "context";
import { NextFunction, Request, Response } from "express";

// export type Method = "options"| "head" | "get" | "post" | "put" | "patch" | "delete";
// export type Paths = ZodiosPathsByMethod<ApiDef, Method>
// export type ZodiosMiddleware = ZodiosRequestHandler<ApiDef, Context, Method, Paths>
export type ZodiosRequest = WithZodiosContext<Request, Context>
export type ZodiosResponse = Response;
export type ZodiosNextFunction = NextFunction;
