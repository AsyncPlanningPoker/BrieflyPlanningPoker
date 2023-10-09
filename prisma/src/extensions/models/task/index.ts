import { Prisma } from "@prisma/client";
import getVoteExtension from "./vote";
import getCommentExtension from "./comment";

const taskExtensions = Prisma.defineExtension((client) => {

    const vote = getVoteExtension(client);
    const comment = getCommentExtension(client);

    return client.$extends({
        model:{
            task:{
                vote,
                comment
            }
        }
    });
});

export default taskExtensions;