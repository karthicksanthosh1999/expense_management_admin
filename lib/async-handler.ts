import { handleError } from "./error-handler";

export const asyncHandler =
    (fn: Function) =>
        async (req: Request) => {
            try {
                return await fn(req);
            } catch (error) {
                return handleError(error);
            }
        };
