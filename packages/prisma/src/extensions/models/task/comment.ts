import { type PrismaClient } from '../../utils';
import { voteIncludeSelect, messageIncludeSelect } from '../../../utils'

const getCommentExtension = (prismaClient: PrismaClient) => {
    return async function comment(id: string, email:string, message: string) {

        return await prismaClient.$transaction(async (tx) => {
            const { currentRound } = await tx.task.findUniqueOrThrow({
                where: { id },
                select: { currentRound: true }
            });
        
            return await tx.task.update({
                where: { id },
                data: { messages: { create: {
                    user: { connect: { email }},
                    message,
                    round: currentRound
                }}},
                include: {
                    votes: {
                        select: voteIncludeSelect,
                        where: { round: { equals: currentRound } }
                    },
                    messages: { select: messageIncludeSelect }
                }
            });
        });
    }
}

export default getCommentExtension;