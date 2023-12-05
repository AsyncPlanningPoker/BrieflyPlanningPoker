const { createChannel, createSession } = await import('better-sse');
const { Session, Channel } = await import('better-sse');
type Session_T = InstanceType<typeof Session>;
type Channel_T = InstanceType<typeof Channel>;

/**
 * Comms channel of the squads
 */

const squadChannel = new Map<string, Channel_T>;
const sessions = new Map<string, Session_T>;

export function register(squadId: string, session: Session_T){
    let channel = squadChannel.get(squadId);
    if(! channel){
        channel = createChannel();
        squadChannel.set(squadId, channel);
    }
    console.error(`Registering in channel ${squadId}`);
    return channel.register(session);
}

export function deregister(squadId: string, session: Session_T){
    const channel = getChannel(squadId);
    if(! channel) throw new Error(`Channel \"${squadId}\" doesnt exist`);
    return channel.deregister(session);
}

export function getChannel(squadId: string) {
    const channel = squadChannel.get(squadId);
    return channel;
}

export function getSession(email: string) {
    return sessions.get(email);
}

export async function cSession(email: string, req: any, res: any){
    const session = await createSession(req, res);
    sessions.set(email, session);
    return session;
}