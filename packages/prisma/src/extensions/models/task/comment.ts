import { type prismaClientType } from '../../utils';
import { voteIncludeSelect, messageIncludeSelect } from '../../../utils'

const getCommentExtension = (prismaClient: prismaClientType) => {
    return async function comment(id: string, email:string, message: string) {

        const { currentRound } = await prismaClient.task.findUniqueOrThrow({
            where: { id },
            select: {
                currentRound: true
            }
        });
    
        return await prismaClient.task.update({
            where: { id },
            data: {
                messages: {
                    create: {
                        user: {
                            connect: { email }
                        },
                        message,
                        round: currentRound
                    }
                }
            },
            include: {
                votes: {
                    select: voteIncludeSelect,
                    where: { round: { equals: currentRound } }
                },
                messages: {
                    select: messageIncludeSelect,
                }
            }
        });
    }
}

export default getCommentExtension;